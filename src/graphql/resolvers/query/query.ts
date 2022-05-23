import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { Content, Layout } from "@src/models";
import {
  QueryResolvers,
  Layout as ILayout,
  Content as IContent,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  getLayouts: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<ILayout>({
        fieldFilters: args.getLayoutsInput.query,
        config: args.getLayoutsInput.config,
      });

      const layouts = await Layout.findAndPaginate<ILayout>(filter, options, {
        history: {
          filter: {
            interval: args.getLayoutsInput.config?.history?.interval ?? [],
          },
        },
      });

      return layouts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getContents: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IContent>({
        fieldFilters: args.getContentsInput.query,
        config: args.getContentsInput.config,
      });

      const contents = await Content.findAndPaginate<IContent>(
        filter,
        options,
        {
          history: {
            filter: {
              interval: args.getContentsInput.config?.history?.interval ?? [],
            },
          },
        }
      );

      return contents;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
