import * as React from 'react';
// Leave Button
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { setData } from "../utilities/firebase";
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

export const LeaveButton = ({ event, userId, setJoined }) => {
  function updatePeopleData(event, userId) {
    // remove user from the array of users
    let newUserArray = Object.values(event.people).filter((user) => {
      console.log("user in LeaveButton filter:", user);
      console.log("userId in LeaveButton filter:", userId);
      return user != userId
    });
    console.log("newUserArray", newUserArray);
    console.log(event);
    console.log(event.people);
    console.log("leaving event, filtered array: ", userId);
    setData("events/" + event.id + "/people", newUserArray);
    setJoined(false);
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
          // onClick={() => updatePeopleData(event, userId)}
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
        >
          Leave Event
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Would you like to leave the event?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button onClick={handleClose} onClick={() => updatePeopleData(event, userId)} variant="contained" color="success" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </ThemeProvider>
    </>
  );
};
