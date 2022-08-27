import { Content, Layout } from "@src/models";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import {
  MutationResolvers,
  Content as IContent,
  Layout as ILayout,
} from "types/generated";

export const Mutation: MutationResolvers = {
  createContent: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
      });

      const newContent = new Content({
        ...args.createContentInput.payload,
        created_by: context.auth.payload.user?._id,
      });

      await newContent.save();

      const content = await Content.findOne<IContent>({ _id: newContent._id });

      if (!content) {
        throw new Error("Could not find newly saved content.");
      }

      return content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createLayout: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
      });

      const containsContentVariable =
        args.createLayoutInput.payload.html.includes("{{content}}");

      const containsMultipleVariables =
        args.createLayoutInput.payload.html.split("{{").length - 1 > 1;

      if (!containsContentVariable || containsMultipleVariables) {
        throw new Error("Layouts must only contain one variable, {{content}}.");
      }

      const newLayout = new Layout({
        ...args.createLayoutInput.payload,
        created_by: context.auth.payload.user?._id,
      });

      await newLayout.save();

      const layout = await Layout.findOne<ILayout>({ _id: newLayout._id });

      if (!layout) {
        throw new Error("Could not find newly saved layout.");
      }

      return layout;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateLayout: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo({
        fieldFilters: args.updateLayoutInput.query,
      });

      const layout = await Layout.findOne<ILayout>(filter);

      if (!layout) {
        throw new Error("Layout does not exist.");
      }

      if (layout.created_by._id !== context.auth.payload.user?._id) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
        });
      }

      const updated = await Layout.findOneAndUpdate<ILayout>(
        { _id: layout._id },
        args.updateLayoutInput.payload,
        { new: true }
      );

      if (!updated) {
        throw new Error("Could not find and update layout.");
      }

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateContent: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo({
        fieldFilters: args.updateContentInput.query,
      });

      const content = await Content.findOne<IContent>(filter);

      if (!content) {
        throw new Error("Content does not exist.");
      }

      if (content.created_by._id !== context.auth.payload.user?._id) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
        });
      }

      const updated = await Content.findOneAndUpdate<IContent>(
        { _id: content._id },
        args.updateContentInput.payload,
        { new: true }
      );

      if (!updated) {
        throw new Error("Something went wrong when updating content.");
      }

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteLayouts: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo<ILayout>({
        fieldFilters: args.deleteLayoutsInput.query,
      });

      const layouts = await Layout.find<ILayout>(filter);

      if (layouts.some((l) => l?._id !== context.auth.payload.user?._id)) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
          errorMessage: "Only admin may delete layouts owned by others.",
        });
      }

      const deleted = await Layout.deleteMany(filter);

      if (deleted.deletedCount === 0) {
        throw new Error("Something went wrong when deleting the layouts.");
      }

      return { deletedCount: deleted.deletedCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteContents: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo<IContent>({
        fieldFilters: args.deleteContentsInput.query,
      });

      const contents = await Content.find<IContent>(filter);

      if (contents.some((c) => c?._id !== context.auth.payload.user?._id)) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload?.user?.role,
          roleLimit: 1,
          errorMessage: "Only admin may delete contents owned by others.",
        });
      }

      const deleted = await Content.deleteMany(filter);

      if (deleted.deletedCount === 0) {
        throw new Error("Something went wrong when deleting the contents.");
      }

      return { deletedCount: deleted.deletedCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
