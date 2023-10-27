import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar IntID
  type Query {
    projects(filters: ProjectFilters, pagination: PaginationInput): PaginatedProjects!
    projectById(id: IntID): Project
  }
  type Mutation {
    editProject(id: IntID!, input: EditProjectInput!): Project
    deleteProject(id: IntID!): Boolean!
  }

  type PaginatedProjects {
    parentProject: Project
    projects: [Project!]!
    rowCount: Int!
  }

  input PaginationInput {
    page: Int!
    pageSize: Int!
  }

  input ProjectFilters {
    parentId: IntID
  }

  input EditProjectInput {
    title: String
  }
  type Project {
    id: IntID!
    title: String!
    parentId: IntID
    beginDate: String!
    expirationDate: String!
    deleted: Boolean!
    # resolved fields
    parentTitle: String
    userIds: [IntID]!
    deviceIds: [IntID]!
    projectIds: [IntID]!
    # heavy resolved fields
    users: [User!]!
    devices: [Device!]!
  }

  type User {
    appuserId: IntID!
    projectId: IntID!
    firstName: String!
    lastName: String!
    disabled: Boolean!
  }

  type Device {
    deviceId: IntID!
    projectId: IntID!
    serialNumber: String!
  }
`;

export default typeDefs;
