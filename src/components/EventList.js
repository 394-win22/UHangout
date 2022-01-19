import React from 'react';
import { useState } from 'react';
import Event from "./Event";
import Box from "@mui/material/Box";

const data = [
  {
    title: "Sailing",
    location: "South Beach",
    capacity: 6,
    count: 4,
    time: "4-6pm",
    date: "Thursday, Jan 7",
    description: "Looking for 5 people",
    host: "Derek",
  },
  {
    title: "Sailing",
    location: "South Beach",
    capacity: 6,
    count: 4,
    time: "4-6pm",
    date: "Thursday, Jan 7",
    description: "Looking for 5 people",
    host: "Derek",
  },
  {
    title: "Sailing",
    location: "South Beach",
    capacity: 6,
    count: 4,
    time: "4-6pm",
    date: "Thursday, Jan 7",
    description: "Looking for 5 people",
    host: "Derek",
  },
  {
    title: "Sailing",
    location: "South Beach",
    capacity: 6,
    count: 4,
    time: "4-6pm",
    date: "Thursday, Jan 7",
    description: "Looking for 5 people",
    host: "Derek",
  }
];

const EventList = () => {
  const [clickedEvent, setclickedEvent] = useState();
  return (
    <Box sx={{ mx: "auto", width: 300 }}>
      {data.map((anEvent) => (
        <Event event={anEvent} clickedEvent={clickedEvent} setclickedEvent={setclickedEvent}></Event>
      ))}
    </Box>
  );
};

export default EventList;
