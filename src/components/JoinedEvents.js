import React from "react";
import Event from "./Event";
import Box from "@mui/material/Box";
import { useUserState } from "../utilities/firebase";




const JoinedEvents = ({ events, userList, user }) => {
  // console.log(user.u
  return (
    <Box sx={{ mx: "auto", width: 300 }}>
      {events.map((event) => {
        console.log(event.people)
        return (
        Object.values(event.people).includes(user.uid)&&
        <Event
          key={event.id}
          event= {event}
          userList={userList}
          user={user}
        ></Event>
      )}
      )}
    </Box>
  );
};

export default JoinedEvents;
