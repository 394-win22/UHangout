import { useState } from "react";
import AddEventModal from "./AddEventModal";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { withStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

//icons
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { createTheme, ThemeProvider } from "@mui/material/styles";




const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#465a82",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});


const BottomMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: 1 }}
      elevation={3}
    >
      <div>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Browse Events"
            icon={<TravelExploreIcon />}
            onClick={() => navigate("/")}
          />
          <ThemeProvider theme={theme}>
          <BottomNavigationAction
            label="Add Event"
            icon={<AddIcon />}
            onClick={handleOpen}
          />
          </ThemeProvider>
          <AddEventModal
            user={user}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
          {/* <BottomNavigationAction label="Messages" icon={<ForumIcon />} /> */}
          <BottomNavigationAction
            label="My Events"
            icon={<EventSeatIcon />}
            onClick={() => navigate("/joined")}
          />
        </BottomNavigation>
      </div>
    </Paper>
  );
};

export default BottomMenu;

