import * as React from "react";
import Moment from "moment"; // date & time
import { extendMoment } from "moment-range";

// Join Button
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";
import Button from "@mui/material/Button";

// Alert Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Tooltip } from "@mui/material";

const moment = extendMoment(Moment);

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

function joinEvent(eventList, userId, eventToJoin, setJoined) {
  const startTime = moment(eventToJoin.eventTime);
  const endTime = moment(
    eventToJoin.eventTime + eventToJoin.duration * 60 * 60 * 1000
  );
  const range1 = moment.range(startTime, endTime);
  var canJoin = 1;
  {
    eventList.map((event) => {
      if (Object.values(event.people).includes(userId)) {
        const newStart = moment(event.eventTime);
        const newEnd = moment(
          event.eventTime + event.duration * 60 * 60 * 1000
        );
        const range2 = moment.range(newStart, newEnd);

        if (range1.overlaps(range2)) {
          if (
            window.confirm(
              `You have time conflict with event: ${event.name}.\n Are you sure you want to join this event?`
            )
          ) {
            canJoin = 1;
          } else {
            canJoin = 0;
          }
        }
      }
    });
  }
  if (canJoin === 1) {
    pushData("events/" + eventToJoin.id + "/people", userId);
    setJoined(true);
  }
}

export const JoinButton = ({ eventList, event, user, setJoined }) => {
  const updatePeopleData = (event, userId) => {
    joinEvent(eventList, userId, event, setJoined);
  };

  //for dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let eventTime = moment(event.eventTime).format("MMMM Do YYYY, h:mm a");

  console.log(user);
  if (!user) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Tooltip title="Please Log In">
            <span>
              <Button disabled variant="contained" color="secondary">
                Join Event
              </Button>
            </span>
          </Tooltip>
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button onClick={handleClickOpen} variant="contained" color="secondary">
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
              <br />
              Time: {eventTime}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              onClick={() => updatePeopleData(event, user.uid)}
              variant="contained"
              color="success"
              autoFocus
            >
              Yes!
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
