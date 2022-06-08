import React, {useState} from 'react';
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
import { useForm } from  'react-hook-form';


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

const gender = ["Male", "Female", "Other"];

export default function SignUp() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const registerUser = (e) => {
    axios.post("http://localhost:9002/signUp", user)
    .then(response => {
      response.send(200)
    })
    .catch(error => {
      console.log(error);
    })
    navigate(`/dashboard`);
    return false;
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(registerUser)} sx={{ mt: 3 }}>
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
                  value={user.first_name}
                  onChange={(e)=> {setUser({...user, ...{firstName:e.target.value}})}}
                  // {...register("firstName", {required: "First Name is required"})}
                  // error={!!errors.firstName}
                  // helperText={errors.firstName ? errors.firstName.message : null }
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
                  value={user?.last_name}
                  onChange={(e)=> {setUser({...user, ...{lastName:e.target.value}})}}
                  // {...register("lastName", {required: "Last Name is required"})}
                  // error={!!errors.lastName}
                  // helperText={errors.lastName ? errors.lastName.message : null }
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
                  value={user.email}
                  onChange={(e)=> {setUser({...user, ...{email:e.target.value}})}}
                  // {...register("email", {required: "email is required"})}
                  // error={!!errors.email}
                  // helperText={errors.email ? errors.email.message : null }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  value={user.contact_number}
                  onChange={(e)=> {setUser({...user, ...{contactNumber:e.target.value}})}}
                  // {...register("contactNumber", {required: "Contact is required"})}
                  // error={!!errors.contactNumber}
                  // helperText={errors.contactNumber ? errors.contactNumber.message : null }
                  />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="gender"
                  fullWidth
                  options={gender}
                  renderInput={(params) => <TextField 
                                              {...params} label="Gender"
                                              // {...register("gender", {required: "gender is required"})}
                                              // error={!!errors.gender}
                                              // helperText={errors.gender ? errors.gender.message : null }
                                              value={user?.gender}
                                          />} 
                  onChange={(e,value)=> {setUser({...user, ...{gender:value}})}}
                  
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
                  value={user.password}
                  onChange={(e)=> {setUser({...user, ...{password:e.target.value}})}}
                  // {...register("password", {required: "password is required"})}
                  // error={!!errors.password}
                  // helperText={errors.password ? errors.password.message : null }
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
                  autoComplete="confirmPassword"
                  onChange={(e)=> {setUser({...user, ...{confirmPassword:e.target.value}})}}
                  // {...register("confirmPassword", {required: "confirm password is required"})}
                  // error={!!errors.confirmPassword}
                  // helperText={errors.confirmPassword ? errors.confirmPassword.message : null }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}