import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";

export default function Event({ event, clickedEvent, setclickedEvent }) {
  const currCapacity = Object.keys(event.people).length;
  // [joined, setJoined] = useState(false); // handle can't-join-twice later
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardHeader
        title={event.name}
        subheader={event.date}
        subheader={`Hosted by ${event.people[0]}`}
      ></CardHeader>
      {event.photoUrl && (
        <CardMedia
          component="img"
          height="140"
          image={
            event.photoUrl.trim() !== ""
              ? event.photoUrl
              : "https://www.liveabout.com/thmb/hUZh9JL_8sFJxjCTnhMHf9dtY38=/2121x1414/filters:fill(auto,1)/GettyImages-906502488-f2360d9eddcb4e0d91b907be2b6f1f7a.jpg"
          }
          alt={event.name}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="body" component="div">
          Time: {moment(event.eventTime).format("MMMM Do YYYY, h:mm a")}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          Capacity: {currCapacity} / {event.max}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        {currCapacity >= event.max ? (
          <Button disabled> Event Full </Button>
        ) : (
          <JoinButton
            key={event}
            event={event}
            clickedEvent={clickedEvent}
            setclickedEvent={setclickedEvent}
            checked={event === clickedEvent}
          />
        )}
      </CardActions>
    </Card>
  );
}
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

// );

const JoinButton = ({ event, clickedEvent, setclickedEvent, checked }) => {
  function updatePeopleData(event) {
    pushData("events/" + event.id + "/people", "newPerson");
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => updatePeopleData(event)}
          variant="contained"
          color="secondary"
          htmlFor={clickedEvent}
        >
          Join Event
        </Button>
      </ThemeProvider>
    </>
  );
};
