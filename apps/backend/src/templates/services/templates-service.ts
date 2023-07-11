import { User } from '@prisma/client';
import { prisma } from '../../app';

export class TemplatesService {
  async generateTemplateName(user: User) {
    const count = await prisma.template.count({
      where: { userId: user.id },
    });
    return `${user.firstName ?? ''} ${user.lastName ?? ''} template ${
      count + 1
    }`;
  }

  async createTemplate(user: User, json: any, templateName?: string) {
    const name = templateName
      ? templateName
      : await this.generateTemplateName(user);
    return prisma.template.create({
      data: {
        creator: {
          connect: { id: user.id },
        },
        name: name,
        versions: {
          create: [{ json: json, userId: user.id, name: 'Version 1' }],
        },
      },
    });
  }
}
