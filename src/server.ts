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
import { Context, TokenContext } from "types/context";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/send", MailerRouter);

let apolloServer;
const startServer = async () => {
  apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req }): Context => {
      const { token, isauth } = req.headers;
      let parsedToken: TokenContext = {};
      let parsedAuthStatus: boolean = false;
      if (token !== "undefined" && typeof token === "string") {
        parsedToken = JSON.parse(token);
      }
      if (isauth !== "undefined" && typeof isauth === "string") {
        parsedAuthStatus = JSON.parse(isauth);
      }

      return { token: parsedToken, isAuth: parsedAuthStatus };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
startServer();

let DB = process.env.MONGO_URI!;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mailer DB Connected to Mailer Service!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5008;

app.listen(port, () => console.log(`Mailer service started at port ${port}`));
