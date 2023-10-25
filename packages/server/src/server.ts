import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import sharedTypeDefs from "./shared/typeDefs";
import fileTypeDefs from "./usingFileStorage/typeDefs";
import fileDataLoaders from "./usingFileStorage/dataloaders";
import fileResolvers from "./usingFileStorage/resolvers";
import fileDb from "./usingFileStorage/db";

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({
  typeDefs: mergeTypeDefs([fileTypeDefs, sharedTypeDefs]),
  resolvers: mergeResolvers([fileResolvers]),
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ fileDb, fileDataLoaders }),
    listen: { port: 4000 },
  });
  console.log(`🛜 Server ready at ${url}`);
};

startServer();
