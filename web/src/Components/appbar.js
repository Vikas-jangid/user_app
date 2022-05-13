import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from  'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  Link: {
    display: "flex",
    color: "white",
    textDecoration: "none",
    fontWeight:"400",
    fontSize:"1.15em",
  },
});

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USER APP
          </Typography>
            <Button color="inherit"><Link to="/" className={classes.Link}>Home</Link></Button>
            <Button color="inherit"><Link to="/signup" className={classes.Link}>Signup </Link></Button>
            <Button color="inherit"><Link to="/login" className={classes.Link}>Login</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
