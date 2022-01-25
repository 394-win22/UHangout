import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import {
  useData,
  signInWithGoogle,
  useUserState,
  signOut,
  saveUserToDb,
  useEvents
} from "./utilities/firebase.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottomMenu from "./components/BottomMenu";

function getEventList(events) {
  var listOfEvent =  Object.entries(events).map(([eventId, eventObj]) => {
    return { ...eventObj, id: eventId };
  });
  console.log("Need to sort the event");
  listOfEvent = listOfEvent.sort((item1, item2) => {
    return (item1.eventTime - item2.eventTime)
  })
  console.log(listOfEvent);
  return listOfEvent;
}

function getUserList(users) {
  return Object.entries(users).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
}

const SignInButton = () => {
  return (
    <Button variant="contained" onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
};

const SignOutButton = () => (
  <Button variant="contained" onClick={() => signOut()} sx={{ mb: 3 }}>
    Sign Out
  </Button>
);

function App() {
  var [eventList, eventListLoading, eventListError] = useEvents(
    "/events",
    getEventList
  );

  const [userList, userListLoading, userListError] = useData(
    "/users",
    getUserList
  );
  const [user] = useUserState();


  useEffect(() => {
  }, [userList]);

  useEffect(() => {
    if (!userList) return;
    if (!user) return;

    const userCount = userList.filter((entry) => entry.uid === user.uid).length;

    if (userCount === 0) {
      saveUserToDb(user);
    }
  }, [userList, user]);

  if ( userListError || eventListError)
    return <h1>{userListError}</h1>;
  if (userListLoading || eventListLoading)
    return <h1>Loading the events...</h1>;

  return (
    <div className="App">
      <h1> UHangout</h1>
      {user ? (
        <Box>
          <SignOutButton />
          <EventList events={eventList} userList={userList} user={user} />
        </Box>
      ) : (
        <SignInButton />
      )}
      <br />
      <br />
      <br />
      {user && <BottomMenu user={user} />}
    </div>
  );
}

export default App;
