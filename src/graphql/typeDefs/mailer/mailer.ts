import { gql } from "apollo-server-express";

export const Mailer = gql`
  type Content {
    _id: ObjectID!
    name: String!
    subject: String!
    plainText: String!
    html: String!
    created_by: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    trigger: String!
    active: Boolean!
    layout: Layout
    variables: [String]
  }

  type Layout {
    _id: ObjectID!
    name: String!
    html: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    created_by: ObjectID!
  }

  type GetLayoutsResponse {
    data: [Layout]
    stats: Stats
  }

  type GetContentsResponse {
    data: [Content]
    stats: Stats
  }

  type CompositionDetail {
    trigger: String!
    variables: [String]
  }

  input GetLayoutsInput {
    _id: StringFieldFilter
    name: StringFieldFilter
    html: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    created_by: StringFieldFilter
    config: FilterConfig
  }

  input GetContentsInput {
    _id: StringFieldFilter
    name: StringFieldFilter
    subject: StringFieldFilter
    plainText: StringFieldFilter
    html: StringFieldFilter
    created_by: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    trigger: StringFieldFilter
    active: BooleanFieldFilter
    config: FilterConfig
  }

  input CreateLayoutInput {
    name: String!
    html: String!
  }

  input CreateContentInput {
    name: String!
    subject: String!
    plainText: String!
    html: String!
    trigger: String!
    active: Boolean!
  }

  input UpdateContentInput {
    _id: ObjectID!
    name: String
    subject: String
    plainText: String
    html: String
    trigger: String
    active: Boolean
    layout: ObjectID
    variables: [String]
  }

  input UpdateLayoutInput {
    _id: ObjectID!
    name: String
    html: String
  }

  input DeleteContentInput {
    _id: ObjectID!
  }

  input DeleteLayoutInput {
    _id: ObjectID!
  }

  extend type Query {
    getLayouts(getLayoutsInput: GetLayoutsInput!): GetLayoutsResponse!
    getContents(getContentsInput: GetContentsInput!): GetContentsResponse!
    getCompositionDetails: [CompositionDetail]!
  }

  extend type Mutation {
    createLayout(createLayoutInput: CreateLayoutInput!): Layout!
    createContent(createContentInput: CreateContentInput!): Content!
    updateContent(updateContentInput: UpdateContentInput!): Content!
    updateLayout(updateLayoutInput: UpdateLayoutInput!): Layout!
    deleteContent(deleteContentInput: DeleteContentInput!): Content!
    deleteLayout(deleteLayoutInput: DeleteLayoutInput!): Layout!
  }
`;
