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
import { getImageFromStorage } from "../utilities/firebase";
import { useState } from "react";
import TextField from"@mui/material/TextField";

const SearchBar = ({ setQuery }) => {
  return (
    <>
      <TextField id="outlined-basic" variant="outlined" onChange={(e)=>{
        setQuery(e.target.value)}}/>
      <Button>Search</Button>
    </>
  );
}

export default SearchBar;
