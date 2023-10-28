"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetAllProjects } from "@/hooks/apolloHooks";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

function ProjectSearch() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // We'll use the `inputValue` state to pass as the search query for the hook
  const { projects, loading } = useGetAllProjects({ page: 0, pageSize: 5, search: inputValue });

  function getProjectIdAncestorArray(parentProject: any) {
    const parentChain = parentProject?.parentChain ?? [];
    return parentChain
      .concat(parentProject)
      ?.filter(Boolean)
      ?.map((p: any) => p?.id);
  }

  return (
    <Autocomplete
      loading={loading}
      options={projects || []} // make sure it defaults to an empty array if null or undefined
      isOptionEqualToValue={(option: any, value) => option.id === value.id} // Assuming each project has an id
      getOptionLabel={(option) => option.title || ""}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        const a = getProjectIdAncestorArray(newValue); // This will give you the selected option object
        router.push("/project/" + a?.join("/"));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a project"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default ProjectSearch;
