import React from "react";
import Event from "./Event";
import Box from "@mui/material/Box";

const EventList = ({ events }) => {
  return (
    <Box sx={{ mx: "auto", width: 300 }}>
      {events.map((event) => (
        <Event key={event.id} event={event}></Event>
      ))}
    </Box>
  );
};

export default EventList;
