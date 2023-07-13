import { type IncomingMessage } from 'http';
import { sign, verify } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Prisma, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { tryCatch } from '@waveditors/utils';
import { EnvConst } from '../../common/constants';
import { AuthSuccess } from '../../common/types/gql.g';

type UserFromToken = User & { exp: number };

export class AuthService {
  client: OAuth2Client;

  constructor(private secret: string) {
    this.client = new OAuth2Client(EnvConst.GOOGLE_OAUTH_CLIENT);
  }

  async verifyGoogleCredentials(
    idToken: string
  ): Promise<Prisma.UserCreateInput> {
    const ticket = await this.client.verifyIdToken({ idToken });
    const payload = ticket.getPayload();
    if (!payload || !payload.email)
      throw new GraphQLError('Google token is invalid', {
        extensions: { code: 'BAD_REQUEST' },
      });
    return {
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
    };
  }

  generateJWT(user: User): AuthSuccess {
    const accessToken = sign(user, this.secret, { expiresIn: '8h' });
    const { exp: expires } = this.verifyJWT(accessToken) as UserFromToken;
    return { expires, accessToken };
  }

  validateRequest(request: IncomingMessage): User | null {
    const token = this.extractTokenFromHeader(request);
    return token ? this.verifyJWT(token) : null;
  }

  private verifyJWT(token: string) {
    const [err, data] = tryCatch(verify)(token, this.secret);
    if (err) return null;
    return data as unknown as UserFromToken;
  }

  private extractTokenFromHeader(request: IncomingMessage): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
