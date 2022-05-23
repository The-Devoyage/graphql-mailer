import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";
import { gql } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const federation2 = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key", "@shareable"])
`;

export const schema = buildSubgraphSchema([
  { typeDefs: federation2 },
  {
    typeDefs: typeDefs.Mailer,
    resolvers: resolvers.Mailer,
  },
  {
    typeDefs: typeDefs.Query,
    resolvers: resolvers.Query,
  },
  { typeDefs: typeDefs.Mutation, resolvers: resolvers.Mutation },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
  { typeDefs: typeDefs.User },
]);
