// For use with react-server components (RSC)
// Read: https://github.com/apollographql/apollo-client-nextjs
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const APOLLO_PORT = process.env.APOLLO_PORT;
const APOLLO_SERVER_URL = process.env.APOLLO_SERVER_URL;

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${APOLLO_SERVER_URL}:${APOLLO_PORT}/graphql`,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
