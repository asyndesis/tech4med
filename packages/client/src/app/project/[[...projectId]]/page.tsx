"use client";
import CellLink from "@/components/CellLink";
import TopBar from "@/components/TopBar";
import { GET_PROJECTS, GET_PROJECT_BY_ID } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";

const CurrentProjectTitle = ({ parentId }: any) => {
  const { data: currentProjectData, loading } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: parentId },
  });
  let title = currentProjectData?.projectById?.title ?? "(Root)";
  if (loading) {
    title = "";
  }
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Typography sx={{ color: (t) => t.palette.text.disabled }}>Project:</Typography>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
    </Box>
  );
};

export default function Page(props: any) {
  const pathname = usePathname();
  const projectId = props?.params?.projectId;
  const [parentId] = projectId?.slice?.(-1) ?? [];

  const { data: projectsData } = useQuery(GET_PROJECTS, {
    variables: { filters: { parentId } },
  });
  const projects = projectsData?.projects ?? [];

  // Transform your data into rows for DataGrid
  const rows = projects.map((project: any) => ({
    id: project.id,
    title: project.title,
    users: project.users.length,
    devices: project.devices.length,
    projectsCount: project.projectsCount,
  }));

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 60, sortable: true },
    { field: "title", headerName: "Title", width: 120, sortable: true },
    { field: "users", headerName: "Users", width: 120, sortable: true },
    { field: "devices", headerName: "Devices", width: 120, sortable: true },
    {
      field: "projectsCount",
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
            onClick={() => {}}
            color="primary"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<Delete />}
            label="Delete"
            onClick={() => {}}
            color="primary"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <TopBar>
        <CurrentProjectTitle parentId={parentId} />
      </TopBar>
      <Box sx={{ height: "100%", width: "100%", overflow: "hidden", padding: 3 }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}
