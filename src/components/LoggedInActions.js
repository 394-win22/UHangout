import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { JoinButton } from "./JoinButton";
import { LeaveButton } from "./LeaveButton";
import { DeleteButton } from "./DeleteButton";
import { EditEventButton } from "./EditEventButton";
import { ViewParticipants } from "./ViewParticipants";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    marginTop: "10px",
  },
});
const LoggedInActions = ({ event, user, setJoined }) => {
  const classes = useStyles();

  const joined = user && Object.values(event.people).includes(user.uid);
  const currCapacity = Object.keys(event.people).length;
  const eventFull = currCapacity >= event.max;

  const isHost = user && Object.values(event.people)[0] === user.uid;

  if (!user) {
    return (
      <CardActions
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <ViewParticipants event={event} user={user} />
        <JoinButton
          event={event}
          user={user}
          setJoined={setJoined}
          className={classes.button}
        />
      </CardActions>
    );
  }

  return (
    <CardActions
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <ViewParticipants event={event} user={user} />

      {isHost && (
        <>
          <EditEventButton
            event={event}
            userId={user.uid}
            setJoined={setJoined}
            className={classes.button}
          />{" "}
          <DeleteButton
            event={event}
            userId={user.uid}
            setJoined={setJoined}
            className={classes.button}
          />
        </>
      )}
      {!isHost && joined && (
        <LeaveButton
          event={event}
          userId={user.uid}
          setJoined={setJoined}
          className={classes.button}
        />
      )}
      {!isHost && !joined && eventFull && (
        <Button disabled> Event Full </Button>
      )}
      {!isHost && !joined && !eventFull && (
        <JoinButton
          event={event}
          user={user}
          setJoined={setJoined}
          className={classes.button}
        />
      )}
    </CardActions>
  );
};

export default LoggedInActions;
