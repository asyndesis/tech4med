import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useQueryParams from "@/hooks/useQueryParams";
import { useForm } from "react-hook-form";
import { useDeleteProject, useGetProject } from "@/hooks/apolloHooks";

export default function DialogueDeleteProject({ onClose }: any) {
  const { queryParams } = useQueryParams();
  const id = queryParams?.projectId;
  const { project } = useGetProject({ id });
  const { deleteProject } = useDeleteProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (input: any) => {
    if (input.title === project?.title) {
      deleteProject({ id, input });
      onClose();
    }
  };

  return project ? (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        Deleting: {project?.title}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            {...register("title", {
              required: "Type project name to confirm", // Display this message if title is not provided
              validate: (value) => value === project?.title || "Type project name to confirm",
            })}
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="text"
            fullWidth
            variant="outlined"
            placeholder={project?.title}
            error={Boolean(errors.title)} // Show error state if there's an error for title
            helperText={errors.title?.message as string} // Display error message
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  ) : null;
}
