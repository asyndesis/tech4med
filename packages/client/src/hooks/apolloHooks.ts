// hooks that are re-used across the app can go here for querying the apollo server

import { DELETE_PROJECT, RESTORE_PROJECT } from "@/gql/mutations";
import { GET_PROJECTS_BY_PARENT_ID, GET_PROJECT_BY_ID, GET_ALL_PROJECTS } from "@/gql/queries";
import { useMutation, useQuery } from "@apollo/client";

export function useGetProjectsByParentId({ parentId, page, pageSize }: any) {
  const { loading, data } = useQuery(GET_PROJECTS_BY_PARENT_ID, {
    variables: {
      filters: { parentId },
      pagination: { page, pageSize },
    },
  });
  const { rowCount = 0, parentProject, projects = [] } = data?.projectsByParentId ?? {};
  return {
    parentProject,
    projects,
    loading,
    rowCount,
  };
}

export function useGetAllProjects({ parentId, page, pageSize, search }: any) {
  const { loading, data } = useQuery(GET_ALL_PROJECTS, {
    variables: {
      filters: { parentId, search },
      pagination: { page, pageSize },
    },
  });
  return { projects: data?.allProjects?.projects, loading, rowCount: data?.rowCount };
}

export const useGetProject = ({ id }: any) => {
  const { data, loading } = useQuery(GET_PROJECT_BY_ID, {
    skip: !id,
    variables: { id },
  });
  return { project: data?.projectById, loading };
};

export const useDeleteProject = () => {
  const [mutate, { loading }] = useMutation(DELETE_PROJECT);
  const deleteProject = async ({ id }: any) => {
    return mutate({
      variables: {
        id,
      },
      // if we ever decide we want to not let the API return deleted projects, we can
      // force them out of the local apollo cache like this
      // update: (cache) => {
      //   cache.evict({ id: `Project:${id}` });
      //   cache.gc();
      // },
    });
  };
  return { deleteProject, loading };
};

export const useRestoreProject = () => {
  const [mutate, { loading }] = useMutation(RESTORE_PROJECT);
  const restoreProject = async ({ id }: any) => {
    return mutate({
      variables: {
        id,
      },
    });
  };
  return { restoreProject, loading };
};
