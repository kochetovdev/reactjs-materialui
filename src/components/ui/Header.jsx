import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const Links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "The revolution", href: "/revolution" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "8em",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },  
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { pathname } = useLocation();

  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    const index = Links.findIndex((link) => link.href === pathname);

    if (index === -1 && value !== -1) {
      setValue(-1);
    } else if (index !== -1 && value !== index) {
      setValue(index);
    }
  }, [pathname, value, Links]);
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              {Links.map(({ label, href }) => (
                <Tab
                  component={Link}
                  to={href}
                  className={classes.tab}
                  label={label}
                />
              ))}
            </Tabs>
            <Button
              component={Link}
              to="/estimate"
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
