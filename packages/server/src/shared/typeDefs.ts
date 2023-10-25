import { gql } from "graphql-tag";

const typeDefs = gql`
  input EditProjectInput {
    title: String
  }
  type Project {
    id: Int!
    title: String!
    parentId: Int
    beginDate: String!
    expirationDate: String!
    deleted: Boolean!
    users: [User!]!
    devices: [Device!]!
  }

  type User {
    appuserId: Int!
    projectId: Int!
    firstName: String!
    lastName: String!
    disabled: Boolean!
  }

  type Device {
    deviceId: Int!
    projectId: Int!
    serialNumber: String!
  }
`;

export default typeDefs;
