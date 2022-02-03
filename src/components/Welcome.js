import moment from "moment"

import EventList from "./EventList"
import { useState } from 'react'
import { getUserFromUID } from "./Event"

import TopNavBar from "./TopNavBar"

const parseTime = input => {
   let parsedTime = moment(input, [
    'h',
    'h a',
    'h:mm',
    'h:mm a',
    'MMMM',
    'MMMM D',
    'MMMM Do',
    'MMMM Do h',
    'MMMM Do h:mm',
    'MMMM Do h:mm a'
  ])

  if (parsedTime.format() != 'Invalid date')
    return parsedTime
  else return false
}

const matchTime = (parsedTime, duration, eventTime, input) => {
    const parsedDuration = parseInt(duration)
    if (!isNaN(parsedDuration)) {
      const endTime = eventTime.add(duration, 'h').format('YYYY-MM-DD HH:mm')
      eventTime.subtract(duration, 'h')

      if (parsedTime.isBetween(eventTime, endTime))
        return true
    }

    if (eventTime.format('MMMM Do') == parsedTime.format('MMMM Do')) 
      return true

    // Note: will not match if only month is supplied (auto-completes with today's date)
    // TODO: Make so if only month is put in, then return all events in that month
    return eventTime.format('MMM').toLowerCase() == input || eventTime.format('MMMM').toLowerCase() == input
}

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  if (query != "") {
    const lowerCaseQuery = query.toLowerCase()
    const parsedTime = parseTime(lowerCaseQuery)
  
    filteredEvents = events.filter((e) => {
      console.log(e)
      let eventTime = moment(e.eventTime)

      return e.name.toLowerCase().includes(lowerCaseQuery)
        || e.description.toLowerCase().includes(lowerCaseQuery)
        || getUserFromUID(Object.values(e.people)[0], userList).displayName.toLowerCase().includes(lowerCaseQuery)
        || (parsedTime && matchTime(parsedTime, e.duration, eventTime, lowerCaseQuery))
    });
  }

  return (
    <div className="App">
      <TopNavBar isLoggedIn={user ? true : false} setQuery={setQuery} />
      <EventList events={filteredEvents} userList={userList} user={user} />
    </div>
  )
}
