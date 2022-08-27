import { gql } from "apollo-server-express";

export const Mutation = gql`
  input CreateLayoutInput {
    payload: LayoutInput!
  }

  input CreateContentInput {
    payload: ContentInput!
  }

  input UpdateContentInput {
    query: ContentFieldFiltersInput!
    payload: ContentInput!
  }

  input UpdateLayoutInput {
    query: LayoutFieldFiltersInput!
    payload: LayoutInput!
  }

  input LayoutInput {
    name: String!
    html: String!
  }

  input ContentInput {
    name: String!
    subject: String!
    plainText: String!
    html: String!
    trigger: String!
    active: Boolean!
    layout: ObjectID
    variables: [String]
  }

  input DeleteContentsInput {
    query: ContentFieldFiltersInput!
  }

  input DeleteLayoutsInput {
    query: LayoutFieldFiltersInput!
  }

  type DeleteResponse @shareable {
    deletedCount: Int!
  }

  extend type Mutation {
    createLayout(createLayoutInput: CreateLayoutInput!): Layout!
    createContent(createContentInput: CreateContentInput!): Content!

    updateContent(updateContentInput: UpdateContentInput!): Content!
    updateLayout(updateLayoutInput: UpdateLayoutInput!): Layout!

    deleteContents(deleteContentsInput: DeleteContentsInput!): DeleteResponse!
    deleteLayouts(deleteLayoutsInput: DeleteLayoutsInput!): DeleteResponse!
  }
`;
