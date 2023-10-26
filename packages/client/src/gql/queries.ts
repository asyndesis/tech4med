import { gql } from "@apollo/client";
import { ProjectFieldsFragment } from "./fragments";

export const GET_PROJECTS = gql`
  query getProjects($filters: ProjectFilters) {
    projects(filters: $filters) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragment}
`;

export const GET_PROJECT_BY_ID = gql`
  query getProject($id: ID!) {
    projectById(id: $id) {
      ...ProjectFields
      users {
        _id: appuserId
        appuserId
        firstName
        projectId
        lastName
        disabled
      }
      devices {
        _id: deviceId
        deviceId
        projectId
        serialNumber
      }
      projectIds
    }
  }
  ${ProjectFieldsFragment}
`;

export const GET_PROJECT_TITLE_BY_ID = gql`
  query getProject($id: ID!) {
    projectById(id: $id) {
      id
      title
    }
  }
`;
