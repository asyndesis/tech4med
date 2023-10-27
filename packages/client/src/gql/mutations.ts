import { gql } from "@apollo/client";
import { ProjectFieldsFragment } from "./fragments";

export const EDIT_PROJECT = gql`
  mutation editProject($id: IntID!, $input: EditProjectInput!) {
    editProject(id: $id, input: $input) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragment}
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: IntID!) {
    deleteProject(id: $id)
  }
`;
