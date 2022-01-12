import "./App.css";
import {useEffect} from "react"
import EventList from "./components/EventList";
import { useData, pushData } from "./utilities/firebase.js";

import BottomMenu from "./components/BottomMenu"

function getEventList(events) {
  return Object.entries(events).map(([eventId, eventObj]) => {
    return ({...eventObj, id: eventId});
  })
}

function createEventInFirebase(event) {
  console.log('create event called');
  pushData("/events", event);
}



function App() {
  const [eventList, loading, error] = useData("/events", getEventList);
  console.log("EVENT LIST");
  console.log(eventList);

  useEffect(()=>{
    const sampleEventData = {
      "description": "Looking for 5 people to join me for sailing",
      "duration": 2,
      "location": "South Beach",
      "max": 6,
      "name": "Sailing at South Beach",
      "people": ["host's name", "firstName2 lastName2"],
      "photoUrl": "firebaseHostingLinkForPhoto",
      "time": 1646957153
    }

    createEventInFirebase(sampleEventData);
  },[]);

  return (
    <div className="App">
        <h1> UHangout</h1>
        <EventList></EventList>
        <BottomMenu />
    </div>
  );
}

export default App;
