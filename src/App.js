import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import { useData, signInWithGoogle, useUserState, signOut} from "./utilities/firebase.js";
import Box from "@mui/material/Box";



import BottomMenu from "./components/BottomMenu";

function getEventList(events) {
  return Object.entries(events).map(([eventId, eventObj]) => {
    return { ...eventObj, id: eventId };
  });
}

function getUserList(users) {
  return Object.entries(users).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
}

const signIn = async () => {
  await signInWithGoogle();
  // push photoURL, displayName, email, ... to the users db
}

const SignInButton = () => {
  const [userList, loading, error] = useData("/users", getUserList);
  console.log(userList); // make sure get users correctly

  return (
  <button className="btn btn-secondary btn-sm"
      onClick={signIn()}>
    Sign In
  </button>
  );
};

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
      {(user)
      ? 
        <Box>
          <SignOutButton/>
          <EventList events={eventList} />
        </Box>
      : <SignInButton />}
      <br />
      <br />
      <br />
      <BottomMenu />
    </div>
  );
}

export default App;
