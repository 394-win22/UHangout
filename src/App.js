import "./App.css";
import { useEffect } from "react";
import EventList from "./components/EventList";
import { useData, signInWithGoogle, useUserState, signOut, saveUserToDb} from "./utilities/firebase.js";
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


const SignInButton = () => {
  return (
  <button className="btn btn-secondary btn-sm"
      onClick={ signInWithGoogle}>
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
  const [eventList, eventListLoading, eventListError] = useData("/events", getEventList);


  const [userList, userListLoading, userListError] = useData("/users", getUserList);
  const [user] = useUserState();
  // console.log(user);


  useEffect(() => {
    console.log("userlist printed", userList); // make sure get users correctly
  }, [userList]);

  useEffect(() => {
    if (!userList) return;
    if (!user) return;

    const userCount = userList.filter((entry)=>
      entry.uid === user.uid
    ).length;

    if (userCount === 0) {
      console.log("no user found in db");
      saveUserToDb(user);
    }
  }, [userList, user]);


  if (eventListError || userListError) return <h1>{eventListError + userListError}</h1>;
  if (eventListLoading || userListLoading) return <h1>Loading the events...</h1>;

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
