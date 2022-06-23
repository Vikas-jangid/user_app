import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from  'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

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

  const token = localStorage.getItem('user');
 
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }

  const { t } = useTranslation(["common"])

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
          {t('userApp')}
          </Typography>
            <Button color="inherit"><Link to="/" className={classes.Link}>{t('home')}</Link></Button>
            { !token ? " " : <Button color="inherit"><Link to="/dashboard" className={classes.Link}>{t('users')}</Link></Button> }
            { token ? " " : <Button color="inherit"><Link to="/signup" className={classes.Link}>{t('signup')} </Link></Button>}
            { token ? <Button color="inherit" onClick={ () => logOut() }><Link to="/login" className={classes.Link}>{t('logout')}</Link></Button> 
                    : <Button color="inherit" ><Link to="/login"  className={classes.Link}>{t('login')}</Link></Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
