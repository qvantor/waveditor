import { MutationResolvers } from '../../../common/types/gql.g';
import { ADMIN_EMAILS } from '../../../common/constants/env-const';

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
  const user = await services.user.getOrCreateUser({
    ...userInput,
    role,
  });
  return services.auth.generateJWT(user);
};
