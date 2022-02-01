import * as React from 'react';
import moment from "moment"; // date & time
// Join Button
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";
import Button from "@mui/material/Button";

// Alert Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Tooltip } from '@mui/material';

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
  const updatePeopleData = (event, userId) => {
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

  let eventTime = moment(event.eventTime).format("MMMM Do YYYY, h:mm a");

  if (!userId) {
    return (
      <>
      <ThemeProvider theme={theme}>
      <Tooltip title="Please Log In">
        <span>
          <Button
            disabled
            variant="contained"
            color="secondary"
          >
            Join Event
          </Button>
          </span>
      </Tooltip>
        
      </ThemeProvider>
    </>
    )
  }

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
            {"Would you like to join this event?"}
          </DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Event: {event.name}
            <br/>
            Time: {eventTime}
          </DialogContentText>
          </DialogContent>
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
