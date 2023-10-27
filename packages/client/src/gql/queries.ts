import { gql } from "@apollo/client";
import { ProjectFieldsFragment } from "./fragments";

export const GET_PROJECTS = gql`
  query getProjects($filters: ProjectFilters, $pagination: PaginationInput) {
    projects(filters: $filters, pagination: $pagination) {
      parentProject {
        ...ProjectFields
      }
      projects {
        ...ProjectFields
      }
      rowCount
    }
  }
  ${ProjectFieldsFragment}
`;

export const GET_PROJECT_BY_ID = gql`
  query getProject($id: IntID) {
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
