/* eslint-disable */
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

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: Template;
  googleAuth: AuthSuccess;
  updateVersion: TemplateVersion;
};

export type MutationCreateTemplateArgs = {
  data: CreateTemplate;
};

export type MutationGoogleAuthArgs = {
  auth: GoogleAuth;
};

export type MutationUpdateVersionArgs = {
  json: Scalars['JSON']['input'];
  templateId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  template: Template;
  templates: Array<Template>;
};

export type QueryTemplateArgs = {
  id: Scalars['Int']['input'];
};

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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
};
