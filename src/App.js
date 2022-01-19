import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import { useData, signInWithGoogle, useUserState, signOut} from "./utilities/firebase.js";



import BottomMenu from "./components/BottomMenu";

function getEventList(events) {
  return Object.entries(events).map(([eventId, eventObj]) => {
    return { ...eventObj, id: eventId };
  });
}

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

function App() {
  const [eventList, loading, error] = useData("/events", getEventList);
  

  const [user] = useUserState();
  console.log(user);


  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the events...</h1>;

  return (
    <div className="App">
      <h1> UHangout</h1>
      {(user) ? <SignOutButton/> : <SignInButton />}
      <EventList events={eventList}></EventList>
      <br />
      <br />
      <br />
      <BottomMenu />
    </div>
  );
}

export default App;
