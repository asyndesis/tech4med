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
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function DialogueViewDevices({ onClose }: any) {
  const { queryParams } = useQueryParams();
  const id = queryParams?.projectId;
  const { project } = useGetProject({ id });

  return project ? (
    <Dialog open={true} onClose={onClose} disableRestoreFocus>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Devices: {project?.title}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device ID</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Serial Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project?.devices?.map((device: any) => (
                <TableRow key={device?.deviceId}>
                  <TableCell>{device?.deviceId}</TableCell>
                  <TableCell>{device?.projectId}</TableCell>
                  <TableCell>{device?.serialNumber}</TableCell>
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
