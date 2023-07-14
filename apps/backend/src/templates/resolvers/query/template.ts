import { QueryResolvers } from '../../../common/types/gql.g';
import { checkUserTemplateBasePermission } from '../../services';

export const template: QueryResolvers['template'] = async (
  parent,
  { id },
  { user }
) => checkUserTemplateBasePermission(user.id, id);
