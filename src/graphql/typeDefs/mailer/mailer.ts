import { gql } from "apollo-server-express";

export const Mailer = gql`
  type Content {
    _id: ObjectID!
    name: String!
    subject: String!
    plainText: String!
    html: String!
    created_by: User!
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
    created_by: User!
  }
`;
