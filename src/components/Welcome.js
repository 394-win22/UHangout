import EventList from "./EventList"
import { useState } from 'react'

import TopNavBar from "./TopNavBar"

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  if (query != "") {
    filteredEvents = events.filter((e) => {
      return e.name.toLowerCase().includes(query.toLowerCase())
        || e.description.toLowerCase().includes(query.toLowerCase());
    })
  }

  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} />
      <EventList events={filteredEvents} userList={userList} user={user} />
    </div>
  )
}
