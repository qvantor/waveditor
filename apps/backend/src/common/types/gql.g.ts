/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { PRole } from '@prisma/client';
import { Context } from '../../app';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type AuthSuccess = {
  __typename?: 'AuthSuccess';
  accessToken: Scalars['String']['output'];
  expires: Scalars['Int']['output'];
};

export type CreateTemplate = {
  json: Scalars['JSON']['input'];
};

export type GoogleAuth = {
  credentials: Scalars['String']['input'];
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['String']['output'];
  creator?: Maybe<User>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  templates?: Maybe<Array<Template>>;
  templatesCount?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['Int']['output'];
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToGroup: Scalars['Boolean']['output'];
  createGroup: Group;
  createTemplate: Template;
  deleteGroup: Scalars['Boolean']['output'];
  deleteTemplate: Scalars['Boolean']['output'];
  googleAuth: AuthSuccess;
  removeUserFromGroup: Scalars['Boolean']['output'];
  setGroupName: Group;
  updateTemplate: Template;
  updateTemplateGroups: Scalars['Boolean']['output'];
  updateVersion: TemplateVersion;
};

export type MutationAddUsersToGroupArgs = {
  groupId: Scalars['Int']['input'];
  users: Array<Scalars['Int']['input']>;
};

export type MutationCreateGroupArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateTemplateArgs = {
  data: CreateTemplate;
};

export type MutationDeleteGroupArgs = {
  groupId: Scalars['Int']['input'];
};

export type MutationDeleteTemplateArgs = {
  templateId: Scalars['Int']['input'];
};

export type MutationGoogleAuthArgs = {
  auth: GoogleAuth;
};

export type MutationRemoveUserFromGroupArgs = {
  groupId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationSetGroupNameArgs = {
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdateTemplateArgs = {
  data: UpdateTemplate;
  templateId: Scalars['Int']['input'];
};

export type MutationUpdateTemplateGroupsArgs = {
  addTo: Array<Scalars['Int']['input']>;
  removeFrom: Array<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
};

export type MutationUpdateVersionArgs = {
  json: Scalars['JSON']['input'];
  templateId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  group: Group;
  groups: Array<Group>;
  me: User;
  template: Template;
  templates: Array<Template>;
  users: Array<User>;
};

export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGroupsArgs = {
  templateId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTemplateArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilter>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type Template = {
  __typename?: 'Template';
  creator?: Maybe<User>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
  versions?: Maybe<Array<TemplateVersion>>;
};

export type TemplateVersionsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type TemplateVersion = {
  __typename?: 'TemplateVersion';
  createdAt: Scalars['String']['output'];
  creator?: Maybe<User>;
  id: Scalars['Int']['output'];
  json: Scalars['JSON']['output'];
  name?: Maybe<Scalars['String']['output']>;
  templateId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UpdateTemplate = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type UsersFilter = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthSuccess: ResolverTypeWrapper<AuthSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTemplate: CreateTemplate;
  GoogleAuth: GoogleAuth;
  Group: ResolverTypeWrapper<
    Omit<Group, 'creator' | 'templates' | 'users'> & {
      creator?: Maybe<ResolversTypes['User']>;
      templates?: Maybe<Array<ResolversTypes['Template']>>;
      users?: Maybe<Array<ResolversTypes['User']>>;
    }
  >;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<PRole>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Template: ResolverTypeWrapper<
    Omit<Template, 'creator' | 'versions'> & {
      creator?: Maybe<ResolversTypes['User']>;
      versions?: Maybe<Array<ResolversTypes['TemplateVersion']>>;
    }
  >;
  TemplateVersion: ResolverTypeWrapper<
    Omit<TemplateVersion, 'creator'> & {
      creator?: Maybe<ResolversTypes['User']>;
    }
  >;
  UpdateTemplate: UpdateTemplate;
  User: ResolverTypeWrapper<
    Omit<User, 'role'> & { role: ResolversTypes['Role'] }
  >;
  UsersFilter: UsersFilter;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthSuccess: AuthSuccess;
  Boolean: Scalars['Boolean']['output'];
  CreateTemplate: CreateTemplate;
  GoogleAuth: GoogleAuth;
  Group: Omit<Group, 'creator' | 'templates' | 'users'> & {
    creator?: Maybe<ResolversParentTypes['User']>;
    templates?: Maybe<Array<ResolversParentTypes['Template']>>;
    users?: Maybe<Array<ResolversParentTypes['User']>>;
  };
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Template: Omit<Template, 'creator' | 'versions'> & {
    creator?: Maybe<ResolversParentTypes['User']>;
    versions?: Maybe<Array<ResolversParentTypes['TemplateVersion']>>;
  };
  TemplateVersion: Omit<TemplateVersion, 'creator'> & {
    creator?: Maybe<ResolversParentTypes['User']>;
  };
  UpdateTemplate: UpdateTemplate;
  User: User;
  UsersFilter: UsersFilter;
}>;

export type AuthDirectiveArgs = {
  role?: Maybe<Role>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthSuccessResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthSuccess'] = ResolversParentTypes['AuthSuccess']
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  templates?: Resolver<
    Maybe<Array<ResolversTypes['Template']>>,
    ParentType,
    ContextType
  >;
  templatesCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  usersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  addUsersToGroup?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddUsersToGroupArgs, 'groupId' | 'users'>
  >;
  createGroup?: Resolver<
    ResolversTypes['Group'],
    ParentType,
    ContextType,
    Partial<MutationCreateGroupArgs>
  >;
  createTemplate?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTemplateArgs, 'data'>
  >;
  deleteGroup?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGroupArgs, 'groupId'>
  >;
  deleteTemplate?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTemplateArgs, 'templateId'>
  >;
  googleAuth?: Resolver<
    ResolversTypes['AuthSuccess'],
    ParentType,
    ContextType,
    RequireFields<MutationGoogleAuthArgs, 'auth'>
  >;
  removeUserFromGroup?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserFromGroupArgs, 'groupId' | 'userId'>
  >;
  setGroupName?: Resolver<
    ResolversTypes['Group'],
    ParentType,
    ContextType,
    RequireFields<MutationSetGroupNameArgs, 'groupId' | 'name'>
  >;
  updateTemplate?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTemplateArgs, 'data' | 'templateId'>
  >;
  updateTemplateGroups?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateTemplateGroupsArgs,
      'addTo' | 'removeFrom' | 'templateId'
    >
  >;
  updateVersion?: Resolver<
    ResolversTypes['TemplateVersion'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVersionArgs, 'json' | 'templateId'>
  >;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  group?: Resolver<
    ResolversTypes['Group'],
    ParentType,
    ContextType,
    RequireFields<QueryGroupArgs, 'id'>
  >;
  groups?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    Partial<QueryGroupsArgs>
  >;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  template?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<QueryTemplateArgs, 'id'>
  >;
  templates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<QueryUsersArgs>
  >;
}>;

export type RoleResolvers = EnumResolverSignature<
  { ADMIN?: any; USER?: any },
  ResolversTypes['Role']
>;

export type TemplateResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']
> = ResolversObject<{
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  versions?: Resolver<
    Maybe<Array<ResolversTypes['TemplateVersion']>>,
    ParentType,
    ContextType,
    Partial<TemplateVersionsArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TemplateVersionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['TemplateVersion'] = ResolversParentTypes['TemplateVersion']
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  json?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  templateId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthSuccess?: AuthSuccessResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers;
  Template?: TemplateResolvers<ContextType>;
  TemplateVersion?: TemplateVersionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
