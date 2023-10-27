import { GET_PROJECTS } from "@/gql/queries";
import { useQuery } from "@apollo/client";

export default function useGetProjects({ parentId, page, pageSize }: any) {
  const { loading, data: projectsData } = useQuery(GET_PROJECTS, {
    variables: {
      filters: { parentId },
      pagination: { page, pageSize },
    },
  });

  const { rowCount = 0, parentProject, projects = [] } = projectsData?.projects ?? {};

  return {
    parentProject,
    projects,
    loading,
    rowCount,
  };
}
