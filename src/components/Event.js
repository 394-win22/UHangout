import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { pushData } from "../utilities/firebase";

export default function Event({ event, clickedEvent, setclickedEvent}) {
  console.log(event);
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardHeader title={event.title} subheader={event.date}></CardHeader>
      <CardMedia
        component="img"
        height="140"
        image="https://nurecreation.com/images/2015/8/16//SailingCenter.jpg?width=600&height=360&mode=crop"
        alt="South Beach"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"></Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {event.description}
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        <JoinButton key={event} event = {event} clickedEvent={clickedEvent} setclickedEvent={setclickedEvent} checked={event === clickedEvent} />
      </CardActions>
    </Card>
  );
}
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

// const JoinButton = ({event, clickedEvent,setclickedEvent,checked}) =>(
//   <>
    
//     {/* <input type="radio" id={clickedEvent} className="btn-check" checked={checked} autoComplete="off"
//       onChange={() => setclickedEvent(clickedEvent)} /> */}

//     <ThemeProvider theme={theme}>
//     <Button onClick={()=>updatePeopleData(clickedEvent)} 
//       variant="contained" color='secondary' htmlFor={clickedEvent}>
//     Join Event
//     </Button>
//     </ThemeProvider>
//   </>
  
// );

const JoinButton = ({event,clickedEvent,setclickedEvent,checked}) =>{
  function updatePeopleData(event){
    console.log("position of interest")
    console.log(event);
    pushData('events/'+ event.id + '/people',"newPerson");
  }

  return(
    
    // {/* <input type="radio" id={clickedEvent} className="btn-check" checked={checked} autoComplete="off"
    //   onChange={() => setclickedEvent(clickedEvent)} /> */}
    <>
    <ThemeProvider theme={theme}>
    <Button onClick={()=>updatePeopleData(event)} variant="contained" color='secondary' htmlFor={clickedEvent}>
    Join Event
    </Button>
    </ThemeProvider>
    </>
  )
};



// const Event = ({ data }) => {
//     return (
//       <div style={{ border: "1px solid black" }}>
//         {" "}
//         <h3>{data[0].title}</h3>
//       </div>
//     );
//   };
