import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useQueryParams from "@/hooks/useQueryParams";
import { useGetProject } from "@/hooks/apolloHooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function DialogueViewUsers({ onClose }: DialogueEditProjectProps) {
  const { queryParams } = useQueryParams();
  const id = queryParams?.projectId;
  const { project } = useGetProject({ id });

  return project ? (
    <Dialog open={true} onClose={onClose} disableRestoreFocus>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Users: {project?.title}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project?.users?.map((user: any) => (
                <TableRow key={user?.appuserId}>
                  <TableCell>{user?.appuserId}</TableCell>
                  <TableCell>
                    {user?.firstName} {user?.lastName}
                  </TableCell>
                  <TableCell>
                    {user?.disabled === 0 ? (
                      <Chip
                        label="Enabled"
                        color="success"
                        variant="outlined"
                        sx={{ flex: 1, lineHeight: 1 }}
                      />
                    ) : (
                      <Chip
                        label="Disabled"
                        color="error"
                        variant="outlined"
                        sx={{ flex: 1, lineHeight: 1 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
