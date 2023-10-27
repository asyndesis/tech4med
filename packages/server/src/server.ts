import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import mainTypeDefs from "./typeDefs";
import mainResolvers from "./resolvers";
import dataLoaders from "./dataloaders";
import db from "./db";
import dotenv from "dotenv";

dotenv.config();

const APOLLO_PORT = parseInt(process.env.APOLLO_PORT || "") || 4000;

interface ApolloServerContext {
  token?: string;
  db: any;
  dataLoaders: any;
}

const server = new ApolloServer<ApolloServerContext>({
  resolvers: mergeResolvers([mainResolvers]),
  typeDefs: mergeTypeDefs([mainTypeDefs]),
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ db, dataLoaders }),
    listen: { port: APOLLO_PORT },
  });
  console.log(`🛜 Server ready at ${url}`);
};

startServer();
