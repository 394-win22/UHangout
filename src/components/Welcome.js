import moment from "moment"

import EventList from "./EventList"
import { useState } from 'react'
import { getUserFromUID } from "./Event"

import TopNavBar from "./TopNavBar"

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  if (query != "") {
    const lowerCaseQuery = query.toLowerCase()
    filteredEvents = events.filter((e) => {
      let time = moment(e.eventTime)
      time = time.format('MMMM Do YYYY, h:mm a')

      return e.name.toLowerCase().includes(lowerCaseQuery)
        || e.description.toLowerCase().includes(lowerCaseQuery)
        || getUserFromUID(Object.values(e.people)[0], userList).displayName.toLowerCase().includes(lowerCaseQuery)
        || time.toLowerCase().includes(lowerCaseQuery)
    });
  }

  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} />
      <EventList events={filteredEvents} userList={userList} user={user} />
    </div>
  )
}
