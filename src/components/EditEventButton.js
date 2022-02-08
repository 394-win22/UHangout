import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import EditEventModal from "./EditEventModal";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const EditEventButton = ({ event }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          style={{ marginTop: "10px" }}
        >
          Edit Event
        </Button>
        <EditEventModal
          event={event}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      </ThemeProvider>
    </>
  );
};
