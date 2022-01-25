import React from "react";
import Event from "./Event";
import Box from "@mui/material/Box";
import { useUserState } from "../utilities/firebase";




const JoinedEvents = ({ events, userList, user }) => {
  const [currentUser] = useUserState();
  return (
    <Box sx={{ mx: "auto", width: 300 }}>
      {events.map((event) => (
        user==currentUser &&
        <Event
          key={event.id}
          event={event}
          userList={userList}
          user={user}
        ></Event>
      ))}
    </Box>
  );
};

export default JoinedEvents;

