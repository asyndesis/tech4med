import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects($filters: ProjectFilters) {
    projects(filters: $filters) {
      id
      title
      users {
        appuserId
        firstName
        lastName
      }
      devices {
        deviceId
        projectId
        serialNumber
      }
      projectsCount
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query getProject($id: ID!) {
    projectById(id: $id) {
      id
      title
      users {
        appuserId
        firstName
        lastName
      }
      devices {
        deviceId
        projectId
        serialNumber
      }
      projectsCount
    }
  }
`;
