"use client";
import useQueryParams from "@/hooks/useQueryParams";
import CellLink from "@/components/CellLink";
import DialogueDeleteProject from "@/components/DialogueDeleteProject";
import DialogueEditProject from "@/components/DialogueEditProject";
import TopBar from "@/components/TopBar";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useProjectPageContext } from "@/components/ProjectsPageProvider";
import useGetProjects from "@/hooks/useGetProjects";

const URL_ACTIONS = {
  EDIT: "EDIT",
  DELETE: "DELETE",
};

// gets the final [id] in our pathname:
// I.E: project/1/2/3 -> 3
const useGetCurrentProjectId = (params: any) => {
  const parentIds = params?.projectId;
  const [parentId] = parentIds?.slice?.(-1) ?? [];
  return parentId;
};

export default function Page({ params }: any) {
  const pathname = usePathname();
  const parentId = useGetCurrentProjectId(params);
  const { setQueryParams, queryParams } = useQueryParams();
  const { paginationModel, setPaginationModel } = useProjectPageContext();

  // hit the API and get the projects with pagination
  const {
    parentProject,
    projects,
    loading: loadingProjects,
    rowCount,
  } = useGetProjects({
    parentId,
    ...paginationModel,
  });

  const rows = projects.map((project: any) => ({
    id: project.id,
    title: project.title,
    userIds: project.userIds.length,
    deviceIds: project.deviceIds.length,
    projectIds: project.projectIds.length,
  }));

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
            {parentProject?.title}
          </Typography>
        </Box>
      </TopBar>
      <Box sx={{ height: "100%", width: "100%", overflow: "hidden", padding: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loadingProjects}
          rowCount={rowCount}
          pageSizeOptions={[1, 5, 10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
      {queryParams.action === URL_ACTIONS.EDIT ? (
        <DialogueEditProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
      {queryParams.action === URL_ACTIONS.DELETE ? (
        <DialogueDeleteProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
    </>
  );
}
