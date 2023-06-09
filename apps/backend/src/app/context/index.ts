import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { User } from '@prisma/client';
import { AuthService } from '../../auth';
import { UserService } from '../../user';
import { EnvConst } from '../../common/constants';

export const context = ({ req }: StandaloneServerContextFunctionArgument) => {
  const auth = new AuthService(EnvConst.JWT_SECRET);
  const user = auth.validateRequest(req) as User;
  return {
    user,
    services: {
      auth,
      user: new UserService(),
    },
  };
};

export type Context = ReturnType<typeof context>;
