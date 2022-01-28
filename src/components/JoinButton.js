import * as React from 'react';
// Join Button
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";
import Button from "@mui/material/Button";

// Alert Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

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

export const JoinButton = ({ event, userId, setJoined }) => {
  function updatePeopleData(event, userId) {
    // console.log(userId);
    pushData("events/" + event.id + "/people", userId);
    setJoined(true);
  }

  //for dialog
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
          color="secondary"
        >
          Join Event
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Would you like to join the event?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="error" >Cancel</Button>
            <Button onClick={handleClose} onClick={() => updatePeopleData(event, userId)} variant="contained" color="success" autoFocus>
              Yes!
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
