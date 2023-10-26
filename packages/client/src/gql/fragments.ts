import { gql } from "@apollo/client";

export const ProjectFieldsFragment = gql`
  fragment ProjectFields on Project {
    id
    title
    userIds
    deviceIds
    projectIds
  }
`;
