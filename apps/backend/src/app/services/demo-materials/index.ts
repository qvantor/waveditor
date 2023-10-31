import { User } from '@prisma/client';
import { DEMO_MATERIALS } from '../../../common/constants/env-const';
import { TemplatesService } from '../../../templates';
import { logger } from '../logger';
import { prisma } from '../../prisma';
import { Templates } from './templates';

export class DemoMaterials {
  constructor(private templates: TemplatesService) {}

  async demoTemplatesForUser(user: User) {
    if (!DEMO_MATERIALS) return;
    const count = await prisma.template.count({ where: { userId: user.id } });
    // if user created today, and don't have templates - it's a new user
    // https://github.com/prisma/prisma/issues/11745
    if (count === 0 && new Date().getTime() - user.createdAt.getTime() < 86400000) {
      for (const template of Templates) {
        await this.templates.createTemplate(
          user,
          template.version,
          template.name
        );
        logger.debug(
          `Added demo template ${template.name} to user(${user.id})`
        );
      }
    }
  }
}
