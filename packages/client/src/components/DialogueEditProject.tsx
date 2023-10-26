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
import { useForm } from "react-hook-form";

const useGetProject = ({ id }: any) => {
  const { data, loading } = useQuery(GET_PROJECT_BY_ID, {
    skip: !id,
    variables: { id },
  });

  return { project: data?.projectById, loading };
};

const useEditProject = () => {
  const [mutate, { loading }] = useMutation(EDIT_PROJECT);

  const editProject = async ({ id, input }: any) => {
    return mutate({
      variables: {
        id,
        input,
      },
    });
  };

  return { editProject, loading };
};

export default function DialogueEditProject({ onClose }: any) {
  const { queryParams } = useQueryParams();
  const id = queryParams?.projectId;
  const { project } = useGetProject({ id });
  const { editProject } = useEditProject();

  const { register, handleSubmit } = useForm();

  const onSubmit = (input: any) => {
    editProject({ id, input });
    onClose();
  };

  return project ? (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        Editing: {project?.title}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            {...register("title")}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={project?.title}
          />
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