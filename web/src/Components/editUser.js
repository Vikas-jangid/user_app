import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        User App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const gender = ["Male", "Female", "other"];

export default function Update() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(()=> {
    loadUser();
  }, []);

  const loadUser = (e) => {   
    var urlString = (window.location).href; 
    var id =  urlString.substr(urlString.length - 24);
    axios.get(`http://localhost:9002/${id}`)
    .then(res => {
      var usersData = res.data;
      setUser( usersData )
    })
  }

  const updateUser = (e) => {
    e.preventDefault();
    var urlString = (window.location).href; 
    var id =  urlString.substr(urlString.length - 24);
    axios.put(`http://localhost:9002/user/${id}`, user)
    .then(response => {
      response.send(200)
    })
    .catch(error => {
      console.log(error);
    })
    navigate(`/`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',    
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar> 
          <Typography component="h1" variant="h5">
            Edit User
          </Typography> 
          <Box component="form" noValidate onSubmit={updateUser} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                <TextField
                  autoComplete="first-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                 autoFocus
                  value={user.firstName}
                  onChange={(e)=> {setUser({...user, ...{firstName:e.target.value}})}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={user?.lastName}
                  onChange={(e)=> {setUser({...user, ...{lastName:e.target.value}})}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user?.email}
                  onChange={(e)=> {setUser({...user, ...{email:e.target.value}})}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="contact_number"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                 value={user?.contactNumber}
                  onChange={(e)=> {setUser({...user, ...{contactNumber:e.target.value}})}}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    id="gender"
                    fullWidth
                    options={gender}
                    renderInput={(params) =>
                      <TextField {...params} label="Gender" name="gender" id="gender"
                                  value={user?.gender}
                      />} 
                    onChange={(e, value)=> {setUser({...user, ...{gender:value}})}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user?.password}
                  onChange={(e)=> {setUser({...user, ...{password:e.target.value}})}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={user?.confirmPassword}
                  autoComplete="confirmPassword"
                  onChange={(e)=> {setUser({...user, ...{confirmPassword:e.target.value}})}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}