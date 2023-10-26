import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    projects(filters: ProjectFilters): [Project!]!
    projectById(id: ID!): Project!
  }
  type Mutation {
    editProject(id: ID!, input: EditProjectInput!): Project
    deleteProject(id: ID!): Boolean!
  }

  input ProjectFilters {
    parentId: ID
  }

  input EditProjectInput {
    title: String
  }
  type Project {
    id: ID!
    title: String!
    parentId: ID
    beginDate: String!
    expirationDate: String!
    deleted: Boolean!
    # resolved fields
    parentTitle: String
    userIds: [ID]!
    deviceIds: [ID]!
    projectIds: [ID]!
    # heavy resolved fields
    users: [User!]!
    devices: [Device!]!
  }

  type User {
    appuserId: ID!
    projectId: ID!
    firstName: String!
    lastName: String!
    disabled: Boolean!
  }

  type Device {
    deviceId: ID!
    projectId: ID!
    serialNumber: String!
  }
`;

export default typeDefs;
