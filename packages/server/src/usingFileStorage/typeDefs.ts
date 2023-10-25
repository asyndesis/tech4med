import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    projects: [Project!]!
  }
  type Mutation {
    editProject(id: Int!, input: EditProjectInput!): Project
    deleteProject(id: Int!): Boolean!
  }
`;

export default typeDefs;
