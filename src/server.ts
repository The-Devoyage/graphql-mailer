import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { schema } from "./graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { MailerRouter } from "@src/routes";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/send", MailerRouter);

let apolloServer;
const startServer = async () => {
  apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req }) => Helpers.Subgraph.GenerateContext({ req }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
startServer();

const DB = process.env.MONGO_URI;
if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("Mailer DB Connected to Mailer Service!"))
    .catch((err) => console.log(err));
} else {
  console.log("Mongo DB Not Connected -- MONGO URI NOT PROVIDED");
}

const port = process.env.PORT || 5008;

app.listen(port, () => console.log(`Mailer service started at port ${port}`));
