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
import { DeleteButton } from "./DeleteButton";
import { useState } from "react";
import { EditEventButton } from "./EditEventButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { ViewParticipants } from "./ViewParticipants";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const getUserFromUID = (uid, userList) => {
  return userList.filter((user) => user.uid === uid)[0];
};

const isUIDinJoinedMembers = (uid, joinedMembers) => {
  return joinedMembers.includes(uid);
};

export default function Event({ eventList, event, userList, user }) {
  const currCapacity = Object.keys(event.people).length;
  let [joined, setJoined] = useState(false); // handle can't-join-twice later
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let descriptionPreviewLimit = 20;

  const [needExpansion, setNeedExpansion] = useState(
    event.description.length > descriptionPreviewLimit
  );

  const expandStr = needExpansion ? "..." : "";

if (user) {
    return (
      <Card sx={{ maxWidth: 345, mb: 5, textAlign: "center" }}>
        <CardHeader
          title={event.name}
          subheader={event.date}
          subheader={`Hosted by ${
            getUserFromUID(event.people[0], userList).displayName
          }`}
        ></CardHeader>
        <CardMedia
          component="img"
          imageURL={event.photoUrl}
          height="140"
          image={event.photoUrl}
          alt={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div">
            Time: {moment(event.eventTime).format("MMMM Do YYYY, h:mm a")}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            Duration: {event.duration} hour
            {parseInt(event.duration) > 1 ? "s" : ""}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            Capacity: {currCapacity} / {event.max}
          </Typography>
        </CardContent>

        <Collapse in={!expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {event.description.slice(0, descriptionPreviewLimit) + expandStr}
            </Typography>
          </CardContent>
        </Collapse>

        {needExpansion ? (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        ) : (
          <></>
        )}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              style={{ wordWrap: "break-word" }}
              display="inline"
              variant="body2"
              color="text.secondary"
            >
              {event.description}
            </Typography>
          </CardContent>
        </Collapse>

        <CardActions style={{ justifyContent: "center" }}>
          {
            <ViewParticipants
              key={event}
              event={event}
              userId={user.uid}
            ></ViewParticipants>
          }
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          {Object.values(event.people)[0] === user.uid ? (
            <>
              <EditEventButton
                key={event}
                event={event}
                userId={user.uid}
                setJoined={setJoined}
              />{" "}
              <DeleteButton
                key={event}
                event={event}
                userId={user.uid}
                setJoined={setJoined}
              />
            </>
          ) : isUIDinJoinedMembers(user.uid, Object.values(event.people)) ? (
            <LeaveButton
              key={event}
              event={event}
              userId={user.uid}
              setJoined={setJoined}
            />
          ) : currCapacity >= event.max ? (
            <Button disabled> Event Full </Button>
          ) : (
          <JoinButton
            eventList={eventList}
            key={event}
            event={event}
            user={user}
            setJoined={setJoined}
          />
          )}
        </CardActions>
      </Card>
    );
  }

  // user not signed in
  return (
    <Card sx={{ maxWidth: 345, mb: 5, textAlign: "center" }}>
      <CardHeader
        title={event.name}
        subheader={`Hosted by ${
          getUserFromUID(event.people[0], userList).displayName
        }`}
      ></CardHeader>
      <CardMedia
        component="img"
        height="140"
        image={event.photoUrl}
        alt={event.name}
      />
      <CardContent>
        <Typography gutterBottom variant="body" component="div">
          Time: {moment(event.eventTime).format("MMMM Do YYYY, h:mm a")}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          Duration: {event.duration} hour
          {parseInt(event.duration) > 1 ? "s" : ""}
        </Typography>
        <Typography gutterBottom variant="body" component="div">
          Capacity: {currCapacity} / {event.max}
        </Typography>
      </CardContent>

      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.description.slice(0, descriptionPreviewLimit) + expandStr}
          </Typography>
        </CardContent>
      </Collapse>

      {needExpansion ?? (
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            style={{ wordWrap: "break-word" }}
            display="inline"
            variant="body2"
            color="text.secondary"
          >
            {event.description}
          </Typography>
        </CardContent>
      </Collapse>

      <CardActions style={{ justifyContent: "center" }}>
        <JoinButton
          key={event}
          event={event}
          user={user}
          setJoined={setJoined}
        />
      </CardActions>
    </Card>
  );
}
