import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { getUserDataFromUid } from "../utilities/firebase";
import Button from "@mui/material/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Link } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const ViewParticipants = ({ event, userId }) => {
  const [open, setOpen] = React.useState(false);

  const [userDataList, setUserDataList] = React.useState([]);


  useEffect(()=>{
    var newList = [];
    Object.values(event.people).forEach( async (uid) => {
      await getUserDataFromUid(uid).then((userData) => {
      newList.push(userData);
    }) ;
    setUserDataList(newList);
  });
  }, [event]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(userDataList);



  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClickOpen /*deleteEvent(event, userId)*/}
          variant="contained"
          color="primary"
        >
            View Participants
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
        Participants
        </DialogTitle>
        <DialogContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {userDataList.map((userData)=>(
            <ListItem component={Button} href={'mailto:yourmail@domain.com'}>
            <ListItemAvatar>
              <Avatar src={userData.photoURL}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userData.displayName} secondary={userData.email} />
          </ListItem>
          ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
           Close
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </>
  );
};
