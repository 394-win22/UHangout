import { useState, useEffect } from "react";
import Event from "./Event";
import AddEventModal from "./AddEventModal";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";

const BottomMenu = () => {
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
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
          <BottomNavigationAction label="Messages" icon={<ForumIcon />} />
        </BottomNavigation>
      </div>
    </Paper>
  );
};

export default BottomMenu;
