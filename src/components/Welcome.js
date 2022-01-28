import EventList from "./EventList";
import Box from "@mui/material/Box";
import BottomMenu from "./BottomMenu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  return (
    <div className="App">
      <Typography variant="h4" align="center" sx={{ padding: 3 }}>
        UHangout
      </Typography>
      {user ? (
        <Box>
          <SignOutButton />
          <EventList events={events} userList={userList} user={user} />
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
