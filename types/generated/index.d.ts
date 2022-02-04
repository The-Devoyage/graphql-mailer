import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  ObjectID: any;
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

export type BooleanArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type CompositionDetail = {
  __typename?: 'CompositionDetail';
  trigger: Scalars['String'];
  variables?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Content = {
  __typename?: 'Content';
  _id: Scalars['ObjectID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  created_by: Scalars['ObjectID'];
  html: Scalars['String'];
  layout?: Maybe<Layout>;
  name: Scalars['String'];
  plainText: Scalars['String'];
  subject: Scalars['String'];
  trigger: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  variables?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateContentInput = {
  active: Scalars['Boolean'];
  html: Scalars['String'];
  name: Scalars['String'];
  plainText: Scalars['String'];
  subject: Scalars['String'];
  trigger: Scalars['String'];
};

export type CreateLayoutInput = {
  html: Scalars['String'];
  name: Scalars['String'];
};

export type DeleteContentInput = {
  _id: Scalars['ObjectID'];
};

export type DeleteLayoutInput = {
  _id: Scalars['ObjectID'];
};

export type FilterConfig = {
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  pagination?: InputMaybe<Pagination>;
};

export type GetContentsInput = {
  _id?: InputMaybe<StringFieldFilter>;
  active?: InputMaybe<BooleanFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  html?: InputMaybe<StringFieldFilter>;
  name?: InputMaybe<StringFieldFilter>;
  plainText?: InputMaybe<StringFieldFilter>;
  subject?: InputMaybe<StringFieldFilter>;
  trigger?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetContentsResponse = {
  __typename?: 'GetContentsResponse';
  data?: Maybe<Array<Maybe<Content>>>;
  stats?: Maybe<Stats>;
};

export type GetLayoutsInput = {
  _id?: InputMaybe<StringFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  html?: InputMaybe<StringFieldFilter>;
  name?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetLayoutsResponse = {
  __typename?: 'GetLayoutsResponse';
  data?: Maybe<Array<Maybe<Layout>>>;
  stats?: Maybe<Stats>;
};

export type IntArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type Layout = {
  __typename?: 'Layout';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: Scalars['ObjectID'];
  html: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent: Content;
  createLayout: Layout;
  deleteContent: Content;
  deleteLayout: Layout;
  updateContent: Content;
  updateLayout: Layout;
};


export type MutationCreateContentArgs = {
  createContentInput: CreateContentInput;
};


export type MutationCreateLayoutArgs = {
  createLayoutInput: CreateLayoutInput;
};


export type MutationDeleteContentArgs = {
  deleteContentInput: DeleteContentInput;
};


export type MutationDeleteLayoutArgs = {
  deleteLayoutInput: DeleteLayoutInput;
};


export type MutationUpdateContentArgs = {
  updateContentInput: UpdateContentInput;
};


export type MutationUpdateLayoutArgs = {
  updateLayoutInput: UpdateLayoutInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getCompositionDetails: Array<Maybe<CompositionDetail>>;
  getContents: GetContentsResponse;
  getLayouts: GetLayoutsResponse;
};


export type QueryGetContentsArgs = {
  getContentsInput: GetContentsInput;
};


export type QueryGetLayoutsArgs = {
  getLayoutsInput: GetLayoutsInput;
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type StringArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  string: Array<Scalars['String']>;
};

export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type UpdateContentInput = {
  _id: Scalars['ObjectID'];
  active?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<Scalars['ObjectID']>;
  name?: InputMaybe<Scalars['String']>;
  plainText?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  trigger?: InputMaybe<Scalars['String']>;
  variables?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateLayoutInput = {
  _id: Scalars['ObjectID'];
  html?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  CompositionDetail: ResolverTypeWrapper<CompositionDetail>;
  Content: ResolverTypeWrapper<Content>;
  CreateContentInput: CreateContentInput;
  CreateLayoutInput: CreateLayoutInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteContentInput: DeleteContentInput;
  DeleteLayoutInput: DeleteLayoutInput;
  FilterConfig: FilterConfig;
  GetContentsInput: GetContentsInput;
  GetContentsResponse: ResolverTypeWrapper<GetContentsResponse>;
  GetLayoutsInput: GetLayoutsInput;
  GetLayoutsResponse: ResolverTypeWrapper<GetLayoutsResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  Layout: ResolverTypeWrapper<Layout>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  UpdateContentInput: UpdateContentInput;
  UpdateLayoutInput: UpdateLayoutInput;
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  CompositionDetail: CompositionDetail;
  Content: Content;
  CreateContentInput: CreateContentInput;
  CreateLayoutInput: CreateLayoutInput;
  DateTime: Scalars['DateTime'];
  DeleteContentInput: DeleteContentInput;
  DeleteLayoutInput: DeleteLayoutInput;
  FilterConfig: FilterConfig;
  GetContentsInput: GetContentsInput;
  GetContentsResponse: GetContentsResponse;
  GetLayoutsInput: GetLayoutsInput;
  GetLayoutsResponse: GetLayoutsResponse;
  Int: Scalars['Int'];
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  Layout: Layout;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Query: {};
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  UpdateContentInput: UpdateContentInput;
  UpdateLayoutInput: UpdateLayoutInput;
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CompositionDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CompositionDetail'] = ResolversParentTypes['CompositionDetail']> = ResolversObject<{
  trigger?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variables?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  html?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  layout?: Resolver<Maybe<ResolversTypes['Layout']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plainText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trigger?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variables?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetContentsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetContentsResponse'] = ResolversParentTypes['GetContentsResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Content']>>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetLayoutsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetLayoutsResponse'] = ResolversParentTypes['GetLayoutsResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Layout']>>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LayoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Layout'] = ResolversParentTypes['Layout']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  html?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createContent?: Resolver<ResolversTypes['Content'], ParentType, ContextType, RequireFields<MutationCreateContentArgs, 'createContentInput'>>;
  createLayout?: Resolver<ResolversTypes['Layout'], ParentType, ContextType, RequireFields<MutationCreateLayoutArgs, 'createLayoutInput'>>;
  deleteContent?: Resolver<ResolversTypes['Content'], ParentType, ContextType, RequireFields<MutationDeleteContentArgs, 'deleteContentInput'>>;
  deleteLayout?: Resolver<ResolversTypes['Layout'], ParentType, ContextType, RequireFields<MutationDeleteLayoutArgs, 'deleteLayoutInput'>>;
  updateContent?: Resolver<ResolversTypes['Content'], ParentType, ContextType, RequireFields<MutationUpdateContentArgs, 'updateContentInput'>>;
  updateLayout?: Resolver<ResolversTypes['Layout'], ParentType, ContextType, RequireFields<MutationUpdateLayoutArgs, 'updateLayoutInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getCompositionDetails?: Resolver<Array<Maybe<ResolversTypes['CompositionDetail']>>, ParentType, ContextType>;
  getContents?: Resolver<ResolversTypes['GetContentsResponse'], ParentType, ContextType, RequireFields<QueryGetContentsArgs, 'getContentsInput'>>;
  getLayouts?: Resolver<ResolversTypes['GetLayoutsResponse'], ParentType, ContextType, RequireFields<QueryGetLayoutsArgs, 'getLayoutsInput'>>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  CompositionDetail?: CompositionDetailResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetContentsResponse?: GetContentsResponseResolvers<ContextType>;
  GetLayoutsResponse?: GetLayoutsResponseResolvers<ContextType>;
  Layout?: LayoutResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
