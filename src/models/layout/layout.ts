import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
import { Layout } from "types/generated";
const Schema = mongoose.Schema;

const LayoutSchema = new Schema<Layout, FindAndPaginateModel>(
  {
    name: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Layout = mongoose.model<any, FindAndPaginateModel>(
  "Layout",
  LayoutSchema
);

export { Layout };
