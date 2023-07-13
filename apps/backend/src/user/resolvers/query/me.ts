import { QueryResolvers } from '../../../common/types/gql.g';
import { prismaToGql } from '../../../common/services';

export const me: QueryResolvers['me'] = async (parent, args, context) =>
  prismaToGql(context.user);
