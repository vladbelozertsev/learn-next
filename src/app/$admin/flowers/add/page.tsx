"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { Create } from "@refinedev/mui";
import { LoadingAdmin } from "../../_libs_/components/loading";
import { useApiUrl } from "@refinedev/core";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";

export default function PostCreate() {
  const [varieties, setVariesties] = useState<any[]>();
  const form = useForm();
  const apiUrl = useApiUrl();
  const authFetch = useAuthFetch();

  useEffect(() => {
    (async function () {
      const res = await authFetch(`${apiUrl}/flowers/varieties?nopages=1`);
      setVariesties((res.data as any[]).map((v) => ({ id: v.id, label: v.title })));
    })();
  }, [setVariesties, authFetch, apiUrl]);

  const imageInput = form.watch();
  console.log(imageInput);

  if (!varieties) return <LoadingAdmin />;

  return (
    <Create saveButtonProps={{ ...form.saveButtonProps }}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...form.register("title", { required: "This field is required" })}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message as string}
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
              options={varieties}
              onChange={(_, value) => field.onChange(value?.id)}
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
