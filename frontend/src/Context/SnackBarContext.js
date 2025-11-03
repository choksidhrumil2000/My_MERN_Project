import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "",type:"" });

  const showMessage = (message,type) => {
    setSnackbar({ open: true, message,type });
  };

  const handleClose = () => {
    setSnackbar({ open: false, message: "",type:"" });
  };
return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbar.message}
      /> */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);

