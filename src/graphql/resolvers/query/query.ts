import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { Content, Layout } from "@src/models";
import {
  QueryResolvers,
  Layout as ILayout,
  Content as IContent,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  generate: async () => {
    try {
      const contents: IContent[] = await Content.find();
      const generated = contents.map((content) => ({
        trigger: content?.trigger,
        variables: content?.variables,
      }));
      return generated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getLayouts: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo({
        fieldFilters: args.getLayoutsInput,
        config: args.getLayoutsInput.config,
      });

      const layouts = await Layout.findAndPaginate<ILayout>(filter, options);

      return layouts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getContents: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo({
        fieldFilters: args.getContentsInput,
        config: args.getContentsInput.config,
      });

      const contents = await Content.findAndPaginate<IContent>(filter, options);

      return contents;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
