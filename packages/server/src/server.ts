import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import mainTypeDefs from "./typeDefs";
import mainResolvers from "./resolvers";
import {
  createDeviceLoader,
  createProjectLoader,
  createUserLoader,
  createProjectParentLoader,
} from "./dataloaders";
import connectToDb from "./db";
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
  const database = await connectToDb();
  // init collections
  const db = {
    projects: database.collection("projects"),
    devices: database.collection("devices"),
    users: database.collection("users"),
  };
  // init dataloaders
  const dataLoaders = {
    userLoader: createUserLoader(db),
    deviceLoader: createDeviceLoader(db),
    projectLoader: createProjectLoader(db),
    projectParentLoader: createProjectParentLoader(db),
  };
  // spawn server with context
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      db,
      dataLoaders,
    }),
    listen: { port: APOLLO_PORT },
  });
  console.log(`🛜 Server ready at ${url}`);
};

startServer();
