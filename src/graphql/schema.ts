import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs } from "@the-devoyage/mongo-filter-generator";
import { Resolvers } from "./resolvers";
import * as TypeDefs from "./typeDefs";

export const schema = buildSubgraphSchema([
  {
    typeDefs: TypeDefs.Mailer,
    resolvers: Resolvers,
  },
  { typeDefs: typeDefs },
]);
