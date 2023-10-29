import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar IntID
  type Query {
    projectsByParentId(filters: ProjectFilters, pagination: PaginationInput): PaginatedProjects!
    allProjects(filters: ProjectFilters, pagination: PaginationInput): PaginatedProjects!
    projectById(id: IntID): Project
  }
  type Mutation {
    editProject(id: IntID!, input: EditProjectInput!): Project
    deleteProject(id: IntID!): Project
    restoreProject(id: IntID!): Project
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
    search: String
  }

  input EditProjectInput {
    title: String
    beginDate: String
    expirationDate: String
  }
  type Project {
    id: IntID!
    title: String!
    parentId: IntID
    beginDate: String
    expirationDate: String
    deleted: Int!
    # resolved fields
    parentTitle: String
    userIds: [IntID]!
    deviceIds: [IntID]!
    projectIds: [IntID]!
    # heavy resolved fields
    users: [User!]!
    devices: [Device!]!
    parentChain: [Project]
  }

  type User {
    _id: ID!
    appuserId: IntID!
    projectId: IntID!
    firstName: String!
    lastName: String!
    disabled: Int!
  }

  type Device {
    _id: ID!
    deviceId: IntID!
    projectId: IntID!
    serialNumber: String!
  }
`;

export default typeDefs;
