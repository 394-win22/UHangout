import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { pushData } from "../utilities/firebase";

export default function Event({ event, clickedEvent, setclickedEvent }) {
  console.log("POSITION OF INTERSSST");
  console.log(event);
  const currCapacity = Object.keys(event.people).length;
  [joined, setJoined] = useState(false); // handle can't-join-twice later
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardHeader title={event.name} subheader={event.date}></CardHeader>
      <CardMedia
        component="img"
        height="140"
        image={event.photoUrl}
        alt="South Beach"
      />
      <CardContent>
        <Typography gutterBottom variant="body" component="div">
          Time: {event.time}
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
