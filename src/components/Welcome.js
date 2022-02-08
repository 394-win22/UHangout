import moment from "moment";

import EventList from "./EventList";
import { useState } from "react";
import { getUserFromUID } from "./Event";

import TopNavBar from "./TopNavBar";

const parseTime = (input) => {
  let parsedTime = moment(input, [
    "h",
    "h a",
    "h:mm",
    "h:mm a",
    "MMMM",
    "MMMM D",
    "MMMM Do",
    "MMMM Do h",
    "MMMM Do h:mm",
    "MMMM Do h:mm a",
  ]);
  // eslint-disable-next-line eqeqeq
  if (parsedTime.format() != "Invalid date") return parsedTime;
  else return false;
};

const matchTime = (parsedTime, duration, eventTime, rawInput) => {
  if (!rawInput.includes(":")) {
    return (
      // eslint-disable-next-line eqeqeq
      eventTime.format("MMMM Do") == parsedTime.format("MMMM Do") ||
      // eslint-disable-next-line eqeqeq
      eventTime.format("MMM").toLowerCase() == rawInput ||
      // eslint-disable-next-line eqeqeq
      eventTime.format("MMMM").toLowerCase() == rawInput
    );
  }

  const parsedDuration = parseInt(duration);
  if (!isNaN(parsedDuration)) {
    const endTime = eventTime
      .add(duration, "h")
      .add(1, "m")
      .format("YYYY-MM-DD HH:mm");
    eventTime.subtract(duration, "h");
    eventTime.subtract(2, "m");

    if (parsedTime.isBetween(eventTime, endTime)) return true;
  }

  return false;
};

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  // eslint-disable-next-line eqeqeq
  if (query != "") {
    const lowerCaseQuery = query.toLowerCase();
    const parsedTime = parseTime(lowerCaseQuery);

    filteredEvents = events.filter((e) => {
      let eventTime = moment(e.eventTime);

      return (
        e.name.toLowerCase().includes(lowerCaseQuery) ||
        e.description.toLowerCase().includes(lowerCaseQuery) ||
        getUserFromUID(Object.values(e.people)[0], userList)
          .displayName.toLowerCase()
          .includes(lowerCaseQuery) ||
        (parsedTime &&
          matchTime(parsedTime, e.duration, eventTime, lowerCaseQuery))
      );
    });
  }

  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} />
      <EventList events={filteredEvents} userList={userList} user={user} />
      <br />
      <br />
      <br />
    </div>
  );
};
