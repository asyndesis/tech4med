import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import mainTypeDefs from "./typeDefs";
import mainResolvers from "./resolvers";
import dataLoaders from "./dataloaders";
import db from "./db";
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
    listen: { port: 4000 },
  });
  console.log(`🛜 Server ready at ${url}`);
};

startServer();
