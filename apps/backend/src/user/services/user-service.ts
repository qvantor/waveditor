import { prisma } from '../../app';

export class UserService {
  async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error(`User with id ${id} does not exists`);
    return user;
  }
}
