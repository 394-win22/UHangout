import EventList from "./EventList";
import Box from "@mui/material/Box";
import BottomMenu from "./BottomMenu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import { useState } from 'react';

import { signInWithGoogle, signOut } from "../utilities/firebase";
const SignInButton = () => {
  return (
    <Box textAlign="center">
      <Button variant="contained" onClick={signInWithGoogle}>
        Sign In
      </Button>
    </Box>
  );
};

const SignOutButton = () => (
  <Box textAlign="center">
    <Button variant="contained" onClick={() => signOut()} sx={{ mb: 3 }}>
      Sign Out
    </Button>
  </Box>
);

export const Welcome = ({ user, events, userList }) => {
  const [query, setQuery] = useState("");

  let filteredEvents = events;
  if (query != "") {
    filteredEvents = events.filter((e) => {
      return e.name.toLowerCase().includes(query.toLowerCase())
        || e.description.toLowerCase().includes(query.toLowerCase());
    });
  }

  return (
    <div className="App">
      <Typography variant="h4" align="center" sx={{ padding: 3 }}>
        UHangout
      </Typography>
      {user ? (
        <Box>
          <SignOutButton />
          <SearchBar setQuery={setQuery}/>
          <EventList events={filteredEvents} userList={userList} user={user} />
        </Box>
      ) : (
        <SignInButton />
      )}{" "}
      <br />
      <br />
      <br />
    </div>
  );
};
