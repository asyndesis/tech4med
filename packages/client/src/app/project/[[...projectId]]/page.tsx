"use client";
import useQueryParams from "@/hooks/useQueryParams";

import DialogueDeleteProject from "@/components/DialogueDeleteProject";
import DialogueEditProject from "@/components/DialogueEditProject";
import TopBar from "@/components/TopBar";
import { Box, Breadcrumbs, Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useGetProjectsByParentId, useRestoreProject } from "@/hooks/apolloHooks";
import { Delete, Edit, Restore } from "@mui/icons-material";
import Link from "@/components/Link";
import ProjectSearch from "@/components/ProjectSearch";
import dayjs from "dayjs";

import DialogueViewDevices from "@/components/DialogueViewDevices";
import DialogueViewUsers from "@/components/DialogueViewUsers";

// for use with ?action= in url
// to open up modals
const MODAL_ACTIONS = {
  EDIT: "EDIT",
  DELETE: "DELETE",
  VIEW_DEVICES: "VIEW_DEVICES",
  VIEW_USERS: "VIEW_USERS",
};

// get the current (last) [projectId] from the array of ids in the URL
// I.E: project/1/2/3 -> 3
const useGetCurrentProjectId = (params: { projectId: Array<string> | null | undefined }) => {
  const parentIds = params?.projectId;
  const [parentId] = parentIds?.slice?.(-1) ?? [];
  return parentId;
};

export default function Page({ params }: any) {
  const pathname = usePathname();
  const parentId = useGetCurrentProjectId(params);
  const { setQueryParams, queryParams, queryString } = useQueryParams();
  const { restoreProject } = useRestoreProject();

  const paginationModel = {
    pageSize: Number(queryParams?.pageSize ?? 5),
    page: Number(queryParams?.page ?? 0),
  };

  const setPaginationModel = (props: any) => {
    setQueryParams(props);
  };

  // hit the API and get the projects with pagination
  const {
    parentProject,
    projects,
    loading: loadingProjects,
    rowCount,
  } = useGetProjectsByParentId({
    parentId,
    ...paginationModel,
  });

  const rows = projects.map((project: any) => ({
    id: project.id,
    title: project.title,
    beginDate: project.beginDate,
    expirationDate: project.expirationDate,
    userIds: project.userIds.length,
    deviceIds: project.deviceIds.length,
    projectIds: project.projectIds.length,
    deleted: project.deleted,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 60, sortable: true },
    { field: "title", headerName: "Title", minWidth: 120, sortable: true, flex: 1 },
    {
      field: "beginDate",
      headerName: "Begin date",
      minWidth: 120,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        return params.value ? dayjs(params.value).format("MM/DD/YYYY") : null;
      },
    },
    {
      field: "expirationDate",
      headerName: "Expiration",
      minWidth: 120,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        return params.value ? dayjs(params.value).format("MM/DD/YYYY") : null;
      },
    },
    {
      field: "userIds",
      headerName: "Users",
      minWidth: 100,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        return (
          <Tooltip title="View users" arrow>
            <Button
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                setQueryParams({ projectId: params?.id, action: MODAL_ACTIONS.VIEW_USERS });
              }}
            >
              {params?.value}
            </Button>
          </Tooltip>
        );
      },
    },
    {
      field: "deviceIds",
      headerName: "Devices",
      minWidth: 100,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        return (
          <Tooltip title="View devices" arrow>
            <Button
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                setQueryParams({ projectId: params?.id, action: MODAL_ACTIONS.VIEW_DEVICES });
              }}
            >
              {params?.value}
            </Button>
          </Tooltip>
        );
      },
    },
    {
      field: "projectIds",
      headerName: "Projects",
      minWidth: 100,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        // preserve the query string
        const url = `${pathname}/${params.id}?${queryString}`;
        return (
          <Link href={url}>
            <Tooltip title="View child projects" arrow>
              <Button sx={{ fontWeight: "bold" }}>{params?.value}</Button>
            </Tooltip>
          </Link>
        );
      },
    },
    {
      field: "deleted",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      sortable: true,
      renderCell: (params: any) => {
        return params.row.deleted === 0 ? (
          <Chip label="Active" color="success" variant="outlined" sx={{ flex: 1, lineHeight: 1 }} />
        ) : (
          <Chip label="Deleted" color="error" variant="outlined" sx={{ flex: 1, lineHeight: 1 }} />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id, row }: any) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={
              <Tooltip title="Edit project" arrow>
                <Edit />
              </Tooltip>
            }
            label="Edit"
            onClick={() => {
              setQueryParams({ projectId: id, action: MODAL_ACTIONS.EDIT });
            }}
            color="primary"
          />,
          <GridActionsCellItem
            key="delete"
            icon={
              row?.deleted ? (
                <Tooltip title="Restore project" arrow>
                  <Restore />
                </Tooltip>
              ) : (
                <Tooltip title="Delete project" arrow>
                  <Delete />
                </Tooltip>
              )
            }
            label="Delete"
            onClick={() => {
              row?.deleted
                ? restoreProject({ id })
                : setQueryParams({ projectId: id, action: MODAL_ACTIONS.DELETE });
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
          <TopBreadcrumbs parentProject={parentProject} />
        </Box>
      </TopBar>
      <Stack sx={{ height: "100%", width: "100%", overflow: "hidden", padding: 3, gap: 3 }}>
        <ProjectSearch />
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loadingProjects}
          rowCount={rowCount}
          pageSizeOptions={[1, 5, 10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          sx={{ width: ["auto", `calc(100vw - 290px)`] }}
        />
      </Stack>
      {queryParams.action === MODAL_ACTIONS.EDIT ? (
        <DialogueEditProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
      {queryParams.action === MODAL_ACTIONS.DELETE ? (
        <DialogueDeleteProject
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
      {queryParams.action === MODAL_ACTIONS.VIEW_DEVICES ? (
        <DialogueViewDevices
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
      {queryParams.action === MODAL_ACTIONS.VIEW_USERS ? (
        <DialogueViewUsers
          onClose={() => {
            setQueryParams({ projectId: null, action: null });
          }}
        />
      ) : null}
    </>
  );
}

function TopBreadcrumbs({ parentProject = {} }: any) {
  const parentChain = parentProject?.parentChain ?? [];
  const breadcrumbData = parentChain.concat(parentProject)?.filter(Boolean);
  const breadcrumbElements = breadcrumbData.reduce(
    (acc: any, item: any, idx: number, arr: any) => {
      const newPath = `${acc.prevPath}/${item.id}`;
      const isLastItem = idx === arr.length - 1;

      const element = (
        <Link key={item.id + idx} color="inherit" href={newPath} sx={{ textDecoration: "none" }}>
          <Typography fontWeight={isLastItem ? "bold" : "normal"}>{item.title}</Typography>
        </Link>
      );
      return {
        prevPath: newPath,
        elements: [...acc.elements, element],
      };
    },
    {
      prevPath: "/project",
      elements: [],
    }
  ).elements;

  return breadcrumbElements.length > 0 ? (
    <Breadcrumbs separator="/">{breadcrumbElements}</Breadcrumbs>
  ) : (
    <Typography color="textPrimary">/</Typography>
  );
}
