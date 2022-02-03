import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { JoinButton } from "./JoinButton";
import { LeaveButton } from "./LeaveButton";
import { DeleteButton } from "./DeleteButton";
import { EditEventButton } from "./EditEventButton";
import { ViewParticipants } from "./ViewParticipants";

const LoggedInActions = ({event, user, setJoined }) => {
     const isHost = Object.values(event.people)[0] === user.uid;
     const joined = Object.values(event.people).includes(user.uid);
     const currCapacity = Object.keys(event.people).length;
     const eventFull = currCapacity >= event.max;

     return (
        <CardActions style={{ justifyContent: "center" }}>
            <ViewParticipants
                event={event}
                userId={user.uid}
            />

            {isHost && (
            <>
                <EditEventButton
                event={event}
                userId={user.uid}
                setJoined={setJoined}
                />{" "}
                <DeleteButton
                event={event}
                userId={user.uid}
                setJoined={setJoined}
                />
            </>
            )}
            { ( !isHost && joined ) && (
            <LeaveButton
                event={event}
                userId={user.uid}
                setJoined={setJoined}
            />
            )}
            { ( !isHost && !joined && eventFull ) && (
            <Button disabled> Event Full </Button>
            )}
            { ( !isHost && !joined && !eventFull) && (
            <JoinButton
                event={event}
                user={user}
                setJoined={setJoined}
            />
            )}
        </CardActions>
      );
};

export default LoggedInActions;

