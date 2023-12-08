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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const tabLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "The revolution", href: "/revolution" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

const menuLinks = [
  { label: "Services", href: "/services" },
  { label: "Custom Software Development", href: "/customsoftware" },
  { label: "Mobile App Development", href: "/mobileapps" },
  { label: "Website Development", href: "/websites" },
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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const indexTab = tabLinks.findIndex((link) => link.href === pathname);
  const selectOption = menuLinks.findIndex(({ href }) => href === pathname);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, index) => {
    setValue(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (index) => () => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(index);
    handleClose();
  };

  useEffect(() => {
    if (indexTab === -1 && value !== -1) {
      setValue(-1);
    } else if (indexTab !== -1 && value !== indexTab) {
      setValue(indexTab);
    }

    if (selectOption !== -1) {
      setValue(1);
    }
  }, [pathname, value, tabLinks]);
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
              {tabLinks.map(({ label, href }) =>
                href === "/services" ? (
                  <Tab
                    key={href}
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup={anchorEl ? "true" : undefined}
                    onMouseOver={handleClick(event)}
                    className={classes.tab}
                    component={Link}
                    to={href}
                    label={label}
                  />
                ) : (
                  <Tab
                    key={href}
                    className={classes.tab}
                    component={Link}
                    to={href}
                    label={label}
                  />
                )
              )}
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
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuLinks.map(({ label, href }, index) => (
                <MenuItem
                  key={href}
                  component={Link}
                  to={href}
                  onClick={handleMenuItemClick(index)}
                  selected={index === selectedIndex && value === 1}
                  classes={{ root: classes.menuItem }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
