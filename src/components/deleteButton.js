import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { deleteData } from "../utilities/firebase";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const DeleteButton = ({ event, userId }) => {
  function deleteEvent(event) {
    // remove user from the array of users
    deleteData(`/events/${event.id}`);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => deleteEvent(event, userId)}
          variant="contained"
          color="primary"
        >
          Delete Event
        </Button>
      </ThemeProvider>
    </>
  );
};
