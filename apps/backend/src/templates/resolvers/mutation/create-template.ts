import { MutationResolvers } from '../../../common/types/gql.g';

export const createTemplate: MutationResolvers['createTemplate'] = async (
  parent,
  args,
  { services, user }
) => services.templates.createTemplate(user, args.data.json);
