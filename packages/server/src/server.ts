import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import sharedTypeDefs from "./shared/typeDefs";
import fileTypeDefs from "./usingFileStorage/typeDefs";
import fileDataLoaders from "./usingFileStorage/dataloaders";
import fileResolvers from "./usingFileStorage/resolvers";
import fileDb from "./usingFileStorage/db";
interface ApolloServerContext {
  token?: string;
  fileDb: any;
  fileDataLoaders: any;
}

const server = new ApolloServer<ApolloServerContext>({
  resolvers: mergeResolvers([fileResolvers]),
  typeDefs: mergeTypeDefs([fileTypeDefs, sharedTypeDefs]),
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ fileDb, fileDataLoaders }),
    listen: { port: 4000 },
  });
  console.log(`🛜 Server ready at ${url}`);
};

startServer();
