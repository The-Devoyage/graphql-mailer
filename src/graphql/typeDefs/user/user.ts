import { gql } from "apollo-server-express";

export const User = gql`
  type User @key(fields: "_id", resolvable: false) {
    _id: ObjectID!
  }
`;
