import { useEffect, useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from  'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LanguageIcon from '@mui/icons-material/Language';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';


const useStyles = makeStyles({
  Link: {
    display: "flex",
    color: "white",
    textDecoration: "none",
    fontWeight:"400",
    fontSize:"1.15em",
  },
});



export default function Appbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation(["common"]);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);
  const token = localStorage.getItem('user');
 
  useEffect(()=>{
    if(localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage("en");
    }
 
    if (prevOpen.current === true && open === false) {
     anchorRef.current.focus();
    }
     prevOpen.current = open;
 
   },[open]);

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }


  

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

  const handleLaguageChange = (lng) => {
    i18next.changeLanguage(lng);
  }
  
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
                  <ClickAwayListener onClickAway={handleClose} >
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={()=>handleLaguageChange("en")}>English</MenuItem>
                      <MenuItem onClick={()=>handleLaguageChange("ar")}>العربية</MenuItem>
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
