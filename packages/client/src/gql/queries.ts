import { gql } from "@apollo/client";
import { ProjectFieldsFragment } from "./fragments";

export const GET_PROJECTS_BY_PARENT_ID = gql`
  query getProjectsByParentId($filters: ProjectFilters, $pagination: PaginationInput) {
    projectsByParentId(filters: $filters, pagination: $pagination) {
      parentProject {
        id
        title
        parentChain {
          id
          title
        }
      }
      projects {
        ...ProjectFields
      }
      rowCount
    }
  }
  ${ProjectFieldsFragment}
`;

export const GET_ALL_PROJECTS = gql`
  query getAllProjects($filters: ProjectFilters, $pagination: PaginationInput) {
    allProjects(filters: $filters, pagination: $pagination) {
      projects {
        ...ProjectFields
        parentChain {
          id
          title
        }
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
        _id
        appuserId
        firstName
        projectId
        lastName
        disabled
      }
      devices {
        _id
        deviceId
        projectId
        serialNumber
      }
      projectIds
    }
  }
  ${ProjectFieldsFragment}
`;
