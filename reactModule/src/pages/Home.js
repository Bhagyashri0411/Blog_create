import { Grid } from "@mui/material";
import React from "react"
import { Blog } from "./Blog";

const Home = () => {
  
  return <>
    <Grid container justifyContent='center' className="mt-3">
      <Grid item sm={10}>
        <h2>Blog Page</h2>
        <hr />
        <Blog/>
      </Grid>
    </Grid>
  </>;
};

export default Home;
