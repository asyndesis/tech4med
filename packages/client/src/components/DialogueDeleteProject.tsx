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
import { DELETE_PROJECT } from "@/gql/mutations";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";

const useGetProject = ({ id }: any) => {
  const { data, loading } = useQuery(GET_PROJECT_BY_ID, {
    skip: !id,
    variables: { id },
  });

  return { project: data?.projectById, loading };
};

const useDeleteProject = () => {
  const [mutate, { loading }] = useMutation(DELETE_PROJECT);

  const deleteProject = async ({ id, input }: any) => {
    return mutate({
      variables: {
        id,
      },
      update: (cache) => {
        // Assuming your cache object for the project has a typename of "Project"
        // and you're using the id directly as the cache ID (default behavior for Apollo Client)
        cache.evict({ id: `Project:${id}` }); // Adjust this to match your cache setup
        cache.gc(); // garbage collection to remove any unreferenced data
      },
    });
  };

  return { deleteProject, loading };
};

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
            placeholder="Project name"
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
