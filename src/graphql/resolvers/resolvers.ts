import {
  DateTimeScalar,
  GraphQLObjectID,
} from "@the-devoyage/mongo-filter-generator";
import { Query } from "./query";
import { Resolvers as IResolvers } from "types/generated";
import { Mutation } from "./mutation";

export const Resolvers: IResolvers = {
  DateTime: DateTimeScalar,
  ObjectId: GraphQLObjectID,
  Query,
  Mutation,
};
