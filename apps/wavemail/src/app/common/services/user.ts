import { User as UserType } from '../types/gql.g';

export const userToUserName = (
  user: Pick<UserType, 'firstName' | 'lastName'> | null | undefined
) => `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
