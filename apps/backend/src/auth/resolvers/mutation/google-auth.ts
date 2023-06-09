import { MutationResolvers } from '../../../common/types/gql.g';

export const googleAuth: MutationResolvers['googleAuth'] = async (
  parent,
  { auth },
  { services }
) => {
  const userInput = await services.auth.verifyGoogleCredentials(
    auth.credentials
  );
  const user = await services.user.getOrCreateUser(userInput);
  return services.auth.generateJWT(user);
};
