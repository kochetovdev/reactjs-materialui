import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { ElevationScroll, menuLinks, tabLinks } from "../helpers/index";

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  logo: {
    height: "8em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
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
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
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
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
}));

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const classes = useStyles();
  const { pathname } = useLocation();

  const theme = useTheme();

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const indexTab = tabLinks.findIndex((link) => link.href === pathname);
  const selectOption = menuLinks.findIndex(({ href }) => href === pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (index) => () => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(index);
    handleClose();
  };

  useEffect(() => {
    if (indexTab === -1 && value !== -1) {
      setValue(1000);
    } else if (indexTab !== -1 && value !== indexTab) {
      setValue(indexTab);
    }

    if (selectOption !== -1) {
      setValue(1);
    }
  }, [pathname, value, tabLinks]);

  const tabs = (
    <Fragment>
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
        style={{ zIndex: 1302 }}
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
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
    </Fragment>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolBarMargin} />
        <List disablePadding>
          {tabLinks.map(({ label, href }, index) => (
            <ListItem
              key={href}
              onClick={() => {
                setOpenDrawer(false);
                setValue(index);
              }}
              divider
              button
              component={Link}
              to={href}
              selected={value === index}
            >
              <ListItemText
                className={
                  value === index
                    ? [classes.drawerItem, classes.drawerItemSelected]
                    : classes.drawerItem
                }
                disableTypography
              >
                {label}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            className={classes.drawerEstimate}
            onClick={() => {
              setOpenDrawer(false);
              setValue(tabLinks.length);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            selected={value === tabLinks.length}
          >
            <ListItemText
              className={
                pathname === "/estimate"
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              style={{ textDecoration: "none" }}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
