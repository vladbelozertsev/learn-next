"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Create } from "@refinedev/mui";
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
      </Box>
    </Create>
  );
}
