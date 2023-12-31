import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { GET_PROJECT_BY_ID } from "@/gql/queries";
import { useMutation, useQuery } from "@apollo/client";
import useQueryParams from "@/hooks/useQueryParams";
import { EDIT_PROJECT } from "@/gql/mutations";
import { Controller, useForm } from "react-hook-form";
import { IconButton, Stack } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
import { useEditProject, useGetProject } from "@/hooks/apolloHooks";

export default function DialogueEditProject({ onClose }: DialogueEditProjectProps) {
  const { queryParams } = useQueryParams();
  const id = queryParams?.projectId;
  const { project } = useGetProject({ id });
  const { editProject } = useEditProject();

  const { register, handleSubmit, control, formState } = useForm();

  const onSubmit = (input: any) => {
    editProject({ id, input });
    onClose({});
  };

  return project ? (
    // disableRestoreFocus - fixes autoFocus to work (strictmode breaks it)
    // https://stackoverflow.com/questions/75947917/how-to-focus-react-mui-textfield-when-dialog-opens
    <Dialog open={true} onClose={onClose} disableRestoreFocus>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Editing: {project?.title}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ minWidth: 400 }}>
          <Stack sx={{ gap: 3 }}>
            <TextField
              {...register("title", {
                required: "Type project name to confirm",
              })}
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={project?.title}
              error={Boolean(formState.errors.title)}
              helperText={formState.errors.title?.message as string}
            />
            <Controller
              name="beginDate"
              control={control}
              defaultValue={project?.beginDate}
              render={({ field: { onChange, value } }) => (
                <DesktopDateTimePicker
                  label="Begin Date & Time"
                  value={dayjs(value)}
                  onChange={(date: any) => onChange(date.toISOString())}
                />
              )}
            />
            {/* Field for expirationDate */}
            <Controller
              name="expirationDate"
              control={control}
              defaultValue={project?.expirationDate}
              render={({ field: { onChange, value } }) => (
                <DesktopDateTimePicker
                  label="Expiration Date & Time"
                  value={dayjs(value)}
                  onChange={(date: any) => onChange(date.toISOString())}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  ) : null;
}
