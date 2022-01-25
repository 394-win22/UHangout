import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { JoinButton } from "./JoinButton";
import { LeaveButton } from "./LeaveButton";
import { useState } from "react";

const getUserFromUID = (uid, userList) => {
  return userList.filter((user) => user.uid === uid)[0];
};

const isUIDinJoinedMembers = (uid, joinedMembers) => {
  return joinedMembers.includes(uid);
};



export default function Event({ event, userList, user }) {
  const currCapacity = Object.keys(event.people).length;
  let [joined, setJoined] = useState(false); // handle can't-join-twice later

  console.log("event var in Event component:", event);

  return (
    <Card sx={{ maxWidth: 345, mb: 5 }}>
      <CardHeader
        title={event.name}
        subheader={event.date}
        subheader={`Hosted by ${
          getUserFromUID(event.people[0], userList).displayName
        }`}
      ></CardHeader>
      {
        <CardMedia
          component="img"
          height="140"
          image={
            event.photoUrl !== ""
              ? event.photoUrl
              : "https://www.liveabout.com/thmb/hUZh9JL_8sFJxjCTnhMHf9dtY38=/2121x1414/filters:fill(auto,1)/GettyImages-906502488-f2360d9eddcb4e0d91b907be2b6f1f7a.jpg"
          }
          alt={event.name}
        />
      }

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
        {isUIDinJoinedMembers(user.uid, Object.values(event.people)) ? (
          <LeaveButton key={event} event={event} userId={user.uid} setJoined={setJoined} />
        ) : currCapacity >= event.max ? (
          <Button disabled> Event Full </Button>
        ) : (
          <JoinButton key={event} event={event} userId={user.uid} setJoined={setJoined} />
        )}
      </CardActions>
    </Card>
  );
}
