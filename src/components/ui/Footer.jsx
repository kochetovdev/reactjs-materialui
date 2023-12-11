import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import footerAdornment from "../../assets/Footer adornment.svg";
import {
  fourthFooterLinks,
  imgFooterLinks,
  menuLinks,
  thirdFooterLinks,
} from "../helpers";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "22em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  girdContainer: {
    position: "absolute",
  },
  gridItem: {
    margin: "3em",
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  icon: {
    height: "4em",
    width: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      with: "2.5em",
    },
  },
  socialContainer: {
    position: "absolute",
    marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
    },
  },
}));

const Footer = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid
          container
          justifyContent="center"
          className={classes.girdContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                onClick={() => {
                  setValue(0);
                  setSelectedIndex(0);
                }}
                item
                className={classes.link}
                component={Link}
                to="/"
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              {menuLinks.map(({ label, href }, index) => (
                <Grid
                  item
                  key={href}
                  className={classes.link}
                  component={Link}
                  to={href}
                  onClick={() => {
                    setValue(1);
                    setSelectedIndex(index);
                  }}
                >
                  {label}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              {thirdFooterLinks.map(({ label, href }, index) => (
                <Grid
                  item
                  key={href}
                  className={classes.link}
                  component={Link}
                  to={href}
                  onClick={() => {
                    setValue(2);
                    setSelectedIndex(index);
                  }}
                >
                  {label}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              {fourthFooterLinks.map(({ label, href }, index) => (
                <Grid
                  item
                  key={href}
                  className={classes.link}
                  component={Link}
                  to={href}
                  onClick={() => {
                    setValue(3);
                    setSelectedIndex(index);
                  }}
                >
                  {label}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/contact"
                onClick={() => {
                  setValue(4);
                  setSelectedIndex(4);
                }}
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img
        className={classes.adornment}
        src={footerAdornment}
        alt="black decorotive slash"
      />
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        className={classes.socialContainer}
      >
        {imgFooterLinks.map(({ alt, href, src }) => (
          <Grid
            key={href}
            item
            component={"a"}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={src} alt={alt} className={classes.icon} />
          </Grid>
        ))}
      </Grid>
    </footer>
  );
};

export default Footer;
