import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { setData } from "../utilities/firebase";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const LeaveButton = ({ event, userId, setJoined }) => {
  function updatePeopleData(event, userId) {
    // remove user from the array of users
    let newUserArray = Object.values(event.people).filter((user) => {
      console.log("user in LeaveButton filter:", user);
      console.log("userId in LeaveButton filter:", userId);
      return user != userId
    });
    console.log("newUserArray", newUserArray);
    console.log(event);
    console.log(event.people);
    console.log("leaving event, filtered array: ", userId);
    setData("events/" + event.id + "/people", newUserArray);
    setJoined(false);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => updatePeopleData(event, userId)}
          variant="contained"
          color="primary"
        >
          Leave Event
        </Button>
      </ThemeProvider>
    </>
  );
};
