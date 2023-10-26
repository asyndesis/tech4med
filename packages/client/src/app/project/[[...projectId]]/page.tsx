"use client";
import useQueryParams from "@/hooks/useQueryParams";
import CellLink from "@/components/CellLink";
import DialogueDeleteProject from "@/components/DialogueDeleteProject";
import DialogueEditProject from "@/components/DialogueEditProject";
import TopBar from "@/components/TopBar";
import { GET_PROJECTS, GET_PROJECT_TITLE_BY_ID } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";

const useGetProjects = ({ parentId: pId }: any) => {
  const [parentId] = pId?.slice?.(-1) ?? [];

  const { data: projectsData } = useQuery(GET_PROJECTS, {
    variables: { filters: { parentId } },
  });

  return projectsData?.projects ?? [];
};

const useGetProjectTitle = ({ parentId }: any) => {
  const { data, loading } = useQuery(GET_PROJECT_TITLE_BY_ID, {
    variables: { id: parentId },
  });

  let title = data?.projectById?.title ?? "(Root)";
  if (loading) {
    title = "";
  }

  return title;
};

const URL_ACTIONS = {
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export default function Page(props: any) {
  const pathname = usePathname();
  const parentId = props?.params?.projectId;
  const projectTitle = useGetProjectTitle({ parentId });
  const projects: any = useGetProjects({ parentId });
  const { setQueryParams, queryParams } = useQueryParams();

  const isEditModalOpen = queryParams.action === URL_ACTIONS.EDIT;
  const isDeleteModalOpen = queryParams.action === URL_ACTIONS.DELETE;

  // Transform your data into rows for DataGrid
  const rows = projects.map((project: any) => ({
    id: project.id,
    title: project.title,
    userIds: project.userIds.length,
    deviceIds: project.deviceIds.length,
    projectIds: project.projectIds.length,
  }));

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 60, sortable: true },
    { field: "title", headerName: "Title", width: 120, sortable: true },
    { field: "userIds", headerName: "Users", width: 120, sortable: true },
    { field: "deviceIds", headerName: "Devices", width: 120, sortable: true },
    {
      field: "projectIds",
      headerName: "Projects",
      width: 120,
      sortable: true,
      renderCell: (params: any) => {
        const url = `${pathname}/${params.id}`;
        return <CellLink href={url}>{params?.value}</CellLink>;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }: any) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<Edit />}
            label="Edit"
            onClick={() => {
              setQueryParams({ projectId: id, action: URL_ACTIONS.EDIT });
            }}
            color="primary"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<Delete />}
            label="Delete"
            onClick={() => {
              setQueryParams({ projectId: id, action: URL_ACTIONS.DELETE });
            }}
            color="primary"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <TopBar>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ color: (t) => t.palette.text.disabled }}>Project:</Typography>
          <Typography color="textPrimary" sx={{ fontWeight: "bold" }}>
            {projectTitle}
          </Typography>
        </Box>
      </TopBar>
      <Box sx={{ height: "100%", width: "100%", overflow: "hidden", padding: 3 }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      {isEditModalOpen ? (
        <DialogueEditProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
      {isDeleteModalOpen ? (
        <DialogueDeleteProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
    </>
  );
}
