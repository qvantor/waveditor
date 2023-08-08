import { Resolvers } from '../../common/types/gql.g';
import { prismaToGql } from '../../common/services';

export const Provider: Resolvers['Provider'] = {
  creator: async (parent, args, { services: { user } }) =>
    prismaToGql(await user.getUserById(parent.userId)),
};
