import { MutationResolvers } from '../../../common/types/gql.g';
import { ADMIN_EMAILS } from '../../../common/constants/env-const';
import { prisma } from '../../../app';

const admins = ADMIN_EMAILS.split(',');

export const googleAuth: MutationResolvers['googleAuth'] = async (
  parent,
  { auth },
  { services }
) => {
  const userInput = await services.auth.verifyGoogleCredentials(
    auth.credentials
  );
  const role = admins.includes(userInput.email) ? 'ADMIN' : 'USER';
  const user = await prisma.user.upsert({
    where: { email: userInput.email },
    update: {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
    },
    create: {
      ...userInput,
      role,
    },
  });
  await services.demo.demoTemplatesForUser(user);
  return services.auth.generateJWT(user);
};
