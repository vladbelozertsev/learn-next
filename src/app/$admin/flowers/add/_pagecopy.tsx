"use client";

import type { ICategory, IPost, IStatus, Nullable } from "../../interfaces";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Input from "@mui/material/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import { Create, useAutocomplete } from "@refinedev/mui";
import { type HttpError, useApiUrl } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useState } from "react";

export default function PostCreate() {
  console.log("PostCreate");
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const apiUrl = useApiUrl();
  const {
    handleSubmit,
    saveButtonProps,
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<IPost, HttpError, Nullable<IPost>>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
  });

  const imageInput = watch("images");

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadLoading(true);

      const formData = new FormData();

      const target = event.target;
      const file: File = (target.files as FileList)[0];

      formData.append("file", file);

      const res = await fetch(`${apiUrl}/media/upload`);

      const { name, size, type, lastModified } = file;

      const imagePaylod = [
        {
          name,
          size,
          type,
          lastModified,
          // url: res.data.url,
        },
      ];

      setValue("images", imagePaylod, { shouldValidate: true });

      setIsUploadLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setError("images", { message: "Upload failed. Please try again." });
      setIsUploadLoading(false);
    }
  };

  const oasd = (e) => {
    console.log("e asdasd", e);
    // saveButtonProps.onClick(e);
  };

  return (
    <Create saveButtonProps={{ ...saveButtonProps, onClick: oasd }}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          autoFocus
        />
        <Controller
          control={control}
          name="status"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete<IStatus>
              options={["published", "draft", "rejected"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return autocompleteProps?.options?.find((p) => p?.id?.toString() === item?.id?.toString())?.title ?? "";
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("content", {
            required: "This field is required",
          })}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
          label="Content"
          multiline
          rows={4}
        />
        <Stack direction="row" gap={4} flexWrap="wrap" sx={{ marginTop: "16px" }}>
          <label htmlFor="images-input">
            <Input id="images-input" type="file" sx={{ display: "none" }} onChange={onChangeHandler} />
            <input
              id="file"
              {...register("images", {
                required: "This field is required",
              })}
              type="hidden"
            />
            <LoadingButton
              loading={isUploadLoading}
              loadingPosition="end"
              endIcon={<FileUploadIcon />}
              variant="contained"
              component="span"
            >
              Upload
            </LoadingButton>
            <br />
            {errors.images && (
              <Typography variant="caption" color="#fa541c">
                {errors.images?.message?.toString()}
              </Typography>
            )}
          </label>
          {imageInput && (
            <Box
              component="img"
              sx={{
                maxWidth: 250,
                maxHeight: 250,
              }}
              src={imageInput[0].url}
              alt="Post image"
            />
          )}
        </Stack>
      </Box>
    </Create>
  );
}

// export default function Asd() {
//   return <h1>Create</h1>;
// }
