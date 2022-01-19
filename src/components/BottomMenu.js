import { useState, useEffect } from "react";
import Event from "./Event";
import { database } from "../utilities/firebase";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
/* For "Create" Button in Modal Box */
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "20px 0 20px 0",
    borderRadius: "10px"
  },
  title: {
    textAlign: "center",
  }
});

const BottomMenu = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [max, setMax] = useState(4);
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(1);
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  /*
    const onCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const eventRef = database.ref("events").push();
        await eventRef.set({
            name, 
            max,
            description
        })

        setName("");
        setMax("");
        setDescription("");
    }
*/

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
          <BottomNavigationAction label="Messages" icon={<ForumIcon />} />
        </BottomNavigation>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ "& .MuiTextField-root": { m: 2, width: "25ch" } }}
        >
          <Box className={classes.container}>
            <Typography variant="h5" component="h5" align="center" className={classes.title}>
              Add New Event
            </Typography>
            <TextField
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              helperText="Please enter event name"
              label="Event Name"
              variant="outlined"
            />
            <TextField
              value={max}
              onChange={(event) => setMax(event.target.value)}
              label="Max # of People"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              label="Event Location"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              label="Duration (Hours)"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue)
                  console.log(newValue.valueOf());
                }}
              />
            </LocalizationProvider>
            <TextField
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              label="Description"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={console.log("Create Event")}
            >
              {" "}
              Create{" "}
            </Button>
          </Box>
        </Modal>
      </div>
    </Paper>
  );
};

export default BottomMenu;
