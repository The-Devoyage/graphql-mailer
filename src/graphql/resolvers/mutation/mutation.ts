import { Content, Layout } from "@src/models";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { MutationResolvers } from "types/generated";

export const Mutation: MutationResolvers = {
  createContent: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
      });

      const content = new Content({
        ...args.createContentInput,
        created_by: context.auth.payload.user?._id,
      });

      await content.save();

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

      const containsContentVariable = args.createLayoutInput.html.includes(
        "{{content}}"
      );

      const containsMultipleVariables =
        args.createLayoutInput.html.split("{{").length - 1 > 1;

      if (!containsContentVariable || containsMultipleVariables) {
        throw new Error("Layouts must only contain one variable, {{content}}.");
      }

      const layout = new Layout({
        ...args.createLayoutInput,
        created_by: context.auth.payload.user?._id,
      });

      await layout.save();

      return layout;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateLayout: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const layout = await Layout.findOne({
        _id: args.updateLayoutInput._id,
      });

      if (!layout) {
        throw new Error("Layout does not exist.");
      }

      if (layout.created_by !== context.auth.payload.user?._id) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
        });
      }

      const updated = await Layout.findOneAndUpdate(
        { _id: layout._id },
        args.updateLayoutInput
      );

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateContent: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const content = await Content.findOne({
        _id: args.updateContentInput._id,
      });

      if (!content) {
        throw new Error("Content does not exist.");
      }

      if (content.created_by !== context.auth.payload.user?._id) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
        });
      }

      const updated = await Content.findOneAndUpdate(
        { _id: content._id },
        args.updateContentInput,
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
};
