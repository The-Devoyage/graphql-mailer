import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
import { Content } from "types/generated";
const Schema = mongoose.Schema;

const ContentSchema = new Schema<Content, FindAndPaginateModel>(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    plainText: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    trigger: {
      type: String,
      required: true,
      unique: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    layout: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Layout",
    },
    variables: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const Content = mongoose.model<any, FindAndPaginateModel>(
  "Content",
  ContentSchema
);

export { Content };
