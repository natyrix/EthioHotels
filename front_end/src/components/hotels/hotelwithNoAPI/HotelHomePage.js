import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RatesandReviews from "../RatesandReviews";
import Gallery from "../Gallery/Gallery";
import AccountLoader from "../AccountLoader";
import { Link } from 'react-router-dom'
import HotelIcon from '@material-ui/icons/Hotel';
import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import {Redirect} from "react-router";
import {useStoreActions, useStoreState} from "easy-peasy";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RecRooms from "./Rooms";
import RecCheckIns from "./CheckIns";
import ResReservations from "./Reservations";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function HotelHomePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [curTitle, setCurTitle] = React.useState('Home');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showingAlert, setShowingAlert] = useState(true);
  const [content, setContent] = React.useState(props.match.params.slug);
  const [loggedOut, setLoggedOut] = useState(false);
  const {setLogout} = useStoreActions(actions => actions.helpers);
  const {message} = useStoreState(state => state.rec);
  const {setClear} = useStoreActions(actions => actions.rec);

  // const { setSuccess } = useStoreActions(actions => actions.login);
  let alert;
  // const tok = localStorage.getItem('Tok');
  // useEffect(()=>{
  //   if(tok){
  //     setIsLoggedIn(true);
  //   }
  // },[]);
  if(loggedOut){
    setLogout();
    localStorage.removeItem('Tok');
    return <Redirect to={{pathname: '/'}}/>
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (e, index, text)=>{
    setSelectedIndex(index);
    setCurTitle(text);
    try {
      switch (text) {
        case 'Rooms':
          setContent(<RecRooms/>);
          break;
        case 'Check-Ins':
          setContent(<RecCheckIns/>);
          break;
        case "Reservations":
          setContent(<ResReservations/>);
          break;
        // case "Logout":
        //   setSelectedIndex(0);
        //   setCurTitle('');
        //   localStorage.removeItem('Tok');
        //   return <Redirect to={{pathname: '/login', state: {msg: `Access denied please login first`}}}/>
      }
    }catch (e) {
      setContent('')
    }
  };
  try {
    alert = showingAlert ? (
      <div className="alert alert-success">
        <h6 className="text-success"><strong>{props.location.state.msg}</strong></h6>
      </div>
    ): '';
  }
  catch (e) {
    alert = '';
  }
  setTimeout(() => {
    setShowingAlert(false)
  }, 3000);
  // if(!isLoggedIn){
  //   setSuccess('Access denied');
  //   return <Redirect to={{pathname: '/login', state: {msg: `Access denied please login first`}}}/>
  function handleLogout() {
    setLoggedOut(true);
  }

  if(message.length !==0){
    setTimeout(()=>{
      setClear();
    },5000);
  }

  // }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {curTitle}
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {['Rooms'].map((text, index) => (
            <ListItem button selected={selectedIndex === (index+1)} key={text} onClick={(event) => handleClick(event,(index+1),text)}>
              <ListItemIcon>{index % 2 === 0 ? <HotelIcon /> : <RateReviewIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Check-Ins', 'Reservations'].map((text, index) => (
            <ListItem button selected={selectedIndex === (index+2)} key={text} onClick={(event) => handleClick(event,(index+2),text)}>
              <ListItemIcon>{index % 2 === 0 ? <CheckCircleIcon /> : <PausePresentationIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon onClick={()=>handleLogout()}><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <section>
          {alert}
          {content}
        </section>
      </main>
    </div>
  );
}
