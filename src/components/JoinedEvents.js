import React from "react";
import Event from "./Event";
import Box from "@mui/material/Box";
import { useUserState } from "../utilities/firebase";
import Typography from "@mui/material/Typography";

const JoinedEvents = ({ events, userList, user }) => {
  return (
    <>
      <Typography variant="h3" align="center" sx={{ padding: 3 }}>
        My Events
      </Typography>
      <Box sx={{ mx: "auto", width: 300 }}>
        <Typography variant="h4" align="center" sx={{ padding: 3 }}>
          Events I'm Hosting
        </Typography>
        {events.map((event) => {
          return (
            Object.values(event.people)[0] === user.uid && (
              <Event
                key={event.id}
                event={event}
                userList={userList}
                user={user}
              ></Event>
            )
          );
        })}
        <Typography variant="h4" align="center" sx={{ padding: 3 }}>
          Events I'm Joining
        </Typography>
        {events.map((event) => {
          console.log(event.people);
          return (
            Object.values(event.people).includes(user.uid) &&
            Object.values(event.people)[0] !== user.uid && (
              <Event
                key={event.id}
                event={event}
                userList={userList}
                user={user}
              ></Event>
            )
          );
        })}
        <br />
        <br />
        <br />
      </Box>
    </>
  );
};

export default JoinedEvents;
