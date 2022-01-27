import EventList from "./EventList";
import Box from "@mui/material/Box";
import BottomMenu from "./BottomMenu";
import Button from "@mui/material/Button";
import { signInWithGoogle, signOut } from "../utilities/firebase";
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

export const Welcome = ({ user, events, userList }) => {
  return (
    <div className="App">
      <h1> UHangout</h1>
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
      {user && <BottomMenu user={user} />}
    </div>
  );
};
