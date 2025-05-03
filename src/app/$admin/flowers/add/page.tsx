"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { Create } from "@refinedev/mui";
import { LoadingAdmin } from "../../_libs_/components/loading";
import { useApiUrl } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export default function PostCreate() {
  const form = useForm();
  const apiUrl = useApiUrl();

  // return <LoadingAdmin />;

  return (
    <Create saveButtonProps={{ ...form.saveButtonProps }}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...form.register("title", { required: "This field is required" })}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message as any}
          margin="normal"
          label="Title"
          name="title"
          fullWidth
          autoFocus
        />
        <Controller
          control={form.control}
          name="status"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={["published", "draft", "rejected"]}
              onChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!form.formState.errors.status}
                  helperText={form.formState.errors.status?.message as any}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
}
