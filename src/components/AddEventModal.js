import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
/* For "Create" Button in Modal Box */
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import Alert from "@mui/material/Alert";

import { pushData, handlePostPhoto } from "../utilities/firebase";

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
    padding: "10px",
    borderRadius: "10px",
    overflow: "auto",
  },
  title: {
    textAlign: "center",
  },
});
function createEventInFirebase(event) {
  pushData("/events", event);
}

const AddEventModal = ({ user, open, handleOpen, handleClose }) => {
  const classes = useStyles();
  const defaultValues = {
    description: "",
    duration: 0,
    location: "",
    max: 2,
    name: "",
    people: user ? [user.uid] : "",
    photoUrl: "",
    eventTime: null,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [dateEmptyError, setDateEmptyError] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.eventTime === null) {
      setDateEmptyError(true);
      return;
    }

    createEventInFirebase(formValues);
    setFormValues(defaultValues);
    //NEED TO RERENDER
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ "& .MuiTextField-root": { m: 2, width: "25ch" } }}
    >
      <Box className={classes.container}>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            className={classes.title}
          >
            Add New Event
          </Typography>
          <TextField
            required
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            label="Event Name"
            variant="outlined"
          />
          <TextField
            required
            name="max"
            value={formValues.max}
            onChange={handleInputChange}
            label="Max # of People"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            name="location"
            value={formValues.location}
            onChange={handleInputChange}
            label="Event Location"
          />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <MobileDateTimePicker
              name="eventTime"
              renderInput={(props) => <TextField {...props} />}
              label="Date & Time *"
              value={formValues.eventTime}
              onChange={(newValue) => {
                setFormValues({
                  ...formValues,
                  eventTime: newValue.toJSON(),
                });
                setDateEmptyError(false);
              }}
            />
            {dateEmptyError && (
              <Alert severity="error">Date and Time field is required.</Alert>
            )}
          </LocalizationProvider>
          <TextField
            required
            name="duration"
            value={formValues.duration}
            onChange={handleInputChange}
            label="Duration (Hours)"
            type="number"
            InputLabelProps={{ shrink: true }}
          />{" "}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="form-control"
            onChange={handlePostPhoto}
          />
          <TextField
            required
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            label="Description"
            multiline
            rows={4}
          />
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Create
          </Button>
          <Button type="button" onClick={() => handleClose()}>
            {" "}
            Cancel{" "}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default AddEventModal;
