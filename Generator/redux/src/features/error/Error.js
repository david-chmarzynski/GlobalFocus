import React from "react";

//REDUX
import { changeError } from "./errorSlice";
import { useSelector, useDispatch } from "react-redux";

// MUI
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";

export default function DescriptionAlerts() {
  const error = useSelector((state) => state.error.error);
  const errorMessage = useSelector((state) => state.error.message);
  const dispatch = useDispatch();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={error}
      onClick={() => dispatch(changeError(false))}
    >
      <Stack
        sx={{
          width: "60%",
          margin: "auto",
          transform: "translate(0%, 200%)",
        }}
        spacing={2}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Une erreur s'est produite — <strong>{errorMessage}</strong>
        </Alert>
      </Stack>
    </Backdrop>
  );
}
