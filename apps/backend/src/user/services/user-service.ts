import { Prisma, User } from '@prisma/client';
import { User as GqlUser } from '../../common/types/gql.g';
import { prisma } from '../../app';

export class UserService {
  async getOrCreateUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: data,
    });
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error(`User with id ${id} does not exists`);
    return user;
  }

  prismaUserToGqlUser(user: User): GqlUser {
    return {
      ...user,
      createdAt: String(user.createdAt),
    };
  }
}
