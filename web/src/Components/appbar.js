import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import {Link} from  'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import LocaleContext from './localeContext.js';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import  i18n  from '../Components/i18n';

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
 
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  function changeLocale (l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }
  
  const token = localStorage.getItem('user');
 
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
            <Button color="inherit"><Link to="/" className={classes.Link}>{t('Home')}</Link></Button>
            { !token ? " " : <Button color="inherit"><Link to="/dashboard" className={classes.Link}>{t('Users')}</Link></Button> }
            { token ? " " : <Button color="inherit"><Link to="/signup" className={classes.Link}>{t('Signup')} </Link></Button>}
            { token ? <Button color="inherit" onClick={ () => logOut() }><Link to="/login" className={classes.Link}>{t ('LogOut')}</Link></Button> 
                    : <Button color="inherit" ><Link to="/login"  className={classes.Link}>{t('Login')}</Link></Button>}
        <div>
          <Button
            color="inherit"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <LanguageIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={() => changeLocale('en')}>English</MenuItem>
                      <MenuItem onClick={() => changeLocale('ar')}>العربية</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        </Toolbar>
        
      </AppBar>
    </Box>
  );
}
