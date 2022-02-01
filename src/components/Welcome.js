import EventList from "./EventList"
import { useState } from 'react'
import { getUserFromUID } from "./Event"

import TopNavBar from "./TopNavBar"

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  if (query != "") {
    filteredEvents = events.filter((e) => {
      return e.name.toLowerCase().includes(query.toLowerCase())
        || e.description.toLowerCase().includes(query.toLowerCase())
        || getUserFromUID(Object.values(e.people)[0], userList).displayName.toLowerCase().includes(query.toLowerCase());
    });
  }

  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} />
      <EventList events={filteredEvents} userList={userList} user={user} />
    </div>
  )
}
