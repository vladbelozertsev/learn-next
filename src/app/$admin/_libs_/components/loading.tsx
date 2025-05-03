import { Box, CircularProgress } from "@mui/material";

export const LoadingAdmin = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        display: "flex",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
