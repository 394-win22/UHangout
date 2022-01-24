import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import {
  useData,
  signInWithGoogle,
  useUserState,
  signOut,
  saveUserToDb,
} from "./utilities/firebase.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  const [eventList, eventListLoading, eventListError] = useData(
    "/events",
    getEventList
  );

  const [userList, userListLoading, userListError] = useData(
    "/users",
    getUserList
  );
  const [user] = useUserState();

  useEffect(() => {
    console.log("userlist printed", userList); // make sure get users correctly
  }, [userList]);

  useEffect(() => {
    if (!userList) return;
    if (!user) return;

    const userCount = userList.filter((entry) => entry.uid === user.uid).length;

    if (userCount === 0) {
      console.log("no user found in db");
      saveUserToDb(user);
    }
  }, [userList, user]);

  if (eventListError || userListError)
    return <h1>{eventListError + userListError}</h1>;
  if (eventListLoading || userListLoading)
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
