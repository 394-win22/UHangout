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

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    width: "350px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const BottomMenu = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [max, setMax] = useState("");
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
              label="No. of People"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
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
