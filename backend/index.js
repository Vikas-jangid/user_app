import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import verify from "./middleware.js";
import cookieSession from "cookie-session";
import passport from "passport";
import { googleAuth } from "./controllers/auth.js";
import { fetchAllUsers, fetchSingleUser, forgetPassword, login, resetPassword, singUp, updateUser, deleteUser } from "./controllers/users.js";
import mongoose from "mongoose";


  
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/userapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db');
  });
  
  mongoose.connection.on('error', () => {
    console.log('error in connected to db');
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to db');
  });

app.use(cookieSession({
  name:"session",
  keys:["viky"],
  maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
})
);    

dotenv.config();

//Routes 

//jwt-verify
app.get('/jwt-test', verify, (req, res) => {
  res.status(200).json(req.user)
})

app.get('/', fetchAllUsers);
app.get('/:id', fetchSingleUser);
app.post('/signup', singUp);
app.post("/login", login );
app.post("/social-login", googleAuth);
app.post('/forgetPassword', forgetPassword);
app.post('/resetPassword/:token', resetPassword);
app.put('/user/:id', updateUser);
app.delete('/:id', deleteUser);

let PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
