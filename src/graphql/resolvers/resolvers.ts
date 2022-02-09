import { Query } from "./query";
import { Resolvers } from "types/generated";
import { Mutation } from "./mutation";

export const resolvers: Resolvers = {
  Mailer: {
    Query,
    Mutation,
  },
};
