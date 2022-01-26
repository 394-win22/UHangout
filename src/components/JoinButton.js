import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";
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

export const JoinButton = ({ event, userId, setJoined }) => {
  function updatePeopleData(event, userId) {
    // console.log(userId);
    pushData("events/" + event.id + "/people", userId);
    setJoined(true);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => updatePeopleData(event, userId)}
          variant="contained"
          color="secondary"
        >
          Join Event
        </Button>
      </ThemeProvider>
    </>
  );
};
