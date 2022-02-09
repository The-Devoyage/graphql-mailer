import { buildSubgraphSchema } from "@apollo/federation";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const schema = buildSubgraphSchema([
  {
    typeDefs: typeDefs.Mailer,
    resolvers: resolvers.Mailer,
  },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
]);
