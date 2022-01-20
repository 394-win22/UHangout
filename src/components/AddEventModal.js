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
import DateTimePicker from "@mui/lab/DateTimePicker";
import { pushData } from "../utilities/firebase";
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
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
  },
});
function createEventInFirebase(event) {
  pushData("/events", event);
}

const AddEventModal = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles();
  const defaultValues = {
    description: "",
    duration: 0,
    location: "",
    max: 2,
    name: "",
    people: ["host's name"],
    photoUrl: "",
    eventTime: new Date(),
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    console.log("SUBMIT");
    console.log(formValues);
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
        <form onSubmit={handleSubmit}>
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
            <DateTimePicker
              required
              name="eventTime"
              renderInput={(props) => <TextField {...props} />}
              label="Date & Time"
              value={formValues.eventTime}
              onChange={(newValue) => {
                setFormValues({
                  ...formValues,
                  eventTime: newValue.toJSON(),
                });
              }}
            />
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
          <TextField
            name="photoUrl"
            value={formValues.photoUrl}
            onChange={handleInputChange}
            label="Custom Image Link"
            InputLabelProps={{ shrink: true }}
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
