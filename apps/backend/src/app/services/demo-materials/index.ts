import { User } from '@prisma/client';
import { DEMO_MATERIALS } from '../../../common/constants/env-const';
import { TemplatesService } from '../../../templates';
import { logger } from '../logger';
import { Templates } from './templates';

export class DemoMaterials {
  constructor(private templates: TemplatesService) {}

  async demoTemplatesForUser(user: User) {
    if (!DEMO_MATERIALS) return;
    // if user created less than 2 sec ago - it's a new user
    // https://github.com/prisma/prisma/issues/11745
    if (new Date().getTime() - user.createdAt.getTime() < 2000) {
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
