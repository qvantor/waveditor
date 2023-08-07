import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { User } from '@prisma/client';
import { AuthService } from '../../auth';
import { UserService } from '../../user';
import { EnvConst } from '../../common/constants';
import { DemoMaterials } from '../services';
import { TemplatesService } from '../../templates';
import { providers } from '../../common/services';

export const context = ({ req }: StandaloneServerContextFunctionArgument) => {
  const auth = new AuthService(EnvConst.JWT_SECRET);
  const user = auth.validateRequest(req) as User;
  const templates = new TemplatesService();
  return {
    user,
    services: {
      auth,
      templates,
      user: new UserService(),
      demo: new DemoMaterials(templates),
      providers,
    },
  };
};

export type Context = ReturnType<typeof context>;
