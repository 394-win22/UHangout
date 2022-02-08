import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { deleteData } from "../utilities/firebase";
import Button from "@mui/material/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const DeleteButton = ({ event, userId }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteEvent(event) {
    // remove user from the array of users
    deleteData(`/events/${event.id}`);
    handleClose();
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClickOpen /*deleteEvent(event, userId)*/}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Delete Event
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the selected Event?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => deleteEvent(event, userId)}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
