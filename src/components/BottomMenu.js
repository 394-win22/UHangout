import { useState, useEffect } from "react";
import Event from "./Event";
import AddEventModal from "./AddEventModal";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import EventSeatIcon from '@mui/icons-material/EventSeat';
// import {useNavigate, withRouter} from 'react-router-dom';


const BottomMenu = ({user}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <div>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Add Event"
            icon={<AddIcon />}
            onClick={handleOpen}
          />
          <AddEventModal
            user={user}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
          {/* <BottomNavigationAction label="Messages" icon={<ForumIcon />} /> */}
          {/* <Link to="/joined"> */}
            <BottomNavigationAction
              label="My Events"
              icon={<EventSeatIcon />}
            />
          {/* </Link> */}

        </BottomNavigation>
      </div>
    </Paper>
  );
};

export default BottomMenu;
