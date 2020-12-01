import React from "react";
import { withStyles } from "@material-ui/core";
// Material :  withStyles & makeStyles
/* makeStyles
const useStyles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
});
*/
const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
};

const SideMenu = ({ classes }) => {
  return <div className={classes.sideMenu}>Side Menu</div>;
};

export default withStyles(style)(SideMenu);
