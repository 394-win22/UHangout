import { useEffect } from "react";
import { Welcome } from "./components/Welcome";
import {
  useData,
  useUserState,
  saveUserToDb,
  useEvents,
} from "./utilities/firebase.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinedEvents from "./components/JoinedEvents";
import Messages from "./components/Messages";
import BottomMenu from "./components/BottomMenu";

function getEventList(events) {
  var listOfEvent = Object.entries(events).map(([eventId, eventObj]) => {
    return { ...eventObj, id: eventId };
  });
  listOfEvent = listOfEvent.sort((item1, item2) => {
    return item1.eventTime - item2.eventTime;
  });
  return listOfEvent;
}

function getUserList(users) {
  return Object.entries(users).map(([uid, userObj]) => {
    return { ...userObj, uid: uid };
  });
}

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

  useEffect(() => {}, [userList]);

  useEffect(() => {
    if (!userList) return;
    if (!user) return;

    const userCount = userList.filter((entry) => entry.uid === user.uid).length;

    if (userCount === 0) {
      saveUserToDb(user);
    }
  }, [userList, user]);

  if (userListError || eventListError) return <h1>{userListError}</h1>;
  if (userListLoading || eventListLoading)
    return <h1>Loading the events...</h1>;

  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome user={user} events={eventList} userList={userList} />
            }
          />

          {/* <Route path="/events" element={<EventList/>} /> */}
          <Route
            path="/joined"
            element={
              <JoinedEvents
                events={eventList}
                userList={userList}
                user={user}
              />
            }
          />

          <Route path="/messages" element={<Messages />} />
        </Routes>
        {user && <BottomMenu user={user} />}
      </BrowserRouter>
    </>
  );
}

export default App;
