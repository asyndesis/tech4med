import { GraphQLScalarType, Kind } from "graphql";

const IntID = new GraphQLScalarType({
  name: "IntID",
  description: "ID type that parses string or integer IDs into integers",
  serialize(value: any) {
    // Convert value to integer for the client
    return parseInt(value, 10);
  },
  parseValue(value: any) {
    // Convert value to integer for server-side operations
    return parseInt(value, 10);
  },
  parseLiteral(ast) {
    // Handle AST input (e.g., when the value is passed directly in a GraphQL query string)
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

export { IntID };
