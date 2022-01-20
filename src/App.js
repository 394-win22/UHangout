import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import { useData } from "./utilities/firebase.js";

import BottomMenu from "./components/BottomMenu";

function getEventList(events) {
  return Object.entries(events).map(([eventId, eventObj]) => {
    return { ...eventObj, id: eventId };
  });
}

function App() {
  const [eventList, loading, error] = useData("/events", getEventList);

  // useEffect(() => {
  //   const sampleEventData = {
  //     description: "Looking for 5 people to join me for sailing",
  //     duration: 2,
  //     location: "South Beach",
  //     max: 6,
  //     name: "Sailing at South Beach",
  //     people: ["host's name", "firstName2 lastName2"],
  //     photoUrl: "firebaseHostingLinkForPhoto",
  //     time: 1646957153,
  //   };

  //   createEventInFirebase(sampleEventData);
  // }, []);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the events...</h1>;

  return (
    <div className="App">
      <h1> UHangout </h1>
      <EventList events={eventList}></EventList>
      <br />
      <br />
      <br />
      <BottomMenu />
    </div>
  );
}

export default App;
