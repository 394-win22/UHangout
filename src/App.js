import "./App.css";
import EventList from "./components/EventList";
import { useData } from "./utilities/firebase.js";

import BottomMenu from "./components/BottomMenu"

function getEventList(events) {
  return Object.entries(events);
}

function App() {
  const [eventList, loading, error] = useData("/events", getEventList);
  console.log("EVENT LIST");
  console.log(eventList);

  return (
    <div className="App">
        <h1> UHangout</h1>
        <EventList></EventList>
        <BottomMenu />
    </div>
  );
}

export default App;
