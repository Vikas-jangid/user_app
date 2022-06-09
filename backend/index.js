import express from "express";
import cors from "cors";
import dbConnect from './db/dbConnection.js';
import User from "./models/userSchema.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import verify from "./middleware.js";
import Randomstring from "randomstring";
import { resetPasswordEmail } from "./mailer/resetPassword.js";

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());    

dotenv.config();

const tokenSecret = "my-token-secret"

const generateToken = (user) => {
  return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}


//Routes 

//jwt-verify
app.get('/jwt-test', verify, (req, res) => {
  res.status(200).json(req.user)
})


//get all users
app.get('/', (req, res) => {
  User.find({ }, (error, data) => {
    res.status(200).results;
    res.send(data);
  });
});


//get single user
app.get('/:id', (req, res) => {
  User.findById(req.params.id , (error, user) => {
    if (user) {
      res.send(user)
    } else {
      console.log('error', error)
    }   
  });
});


//signup user
const rounds = 10;
app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash)=> {
    if(error) {
      res.status(500).json(error)
    }
    else{
      const user = new User(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          gender: req.body.gender,
          password: hash,
          confirmPassword: hash,
        });
      user.save()
        .then(user => {
          res.status(200).json(user)
        })
        .catch(error=>{
          res.status(500).json(error)
        })
      }
  });
});

//User Login
app.post("/login",  (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(!user) {
      res.status(404).json({error:"no user found with this email"})
    }
    else {
      bcrypt.compare(req.body.password, user.password, (error , match) => {
        if(error) {
          res.status(500).json(error)
        }
        else if(match){
          res.status(200).json({token: generateToken(user)})
        }
        else {
          res.status(403).json({error: "password is incorrect"})
        }
      });
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

//forget password

app.post('/forgetPassword', async (req, res) => {
  const email = req.body.email;
  const userData = await User.findOne({email : email});
 if(userData){
  const randomString = Randomstring.generate();  
  await User.findOneAndUpdate({email: email},{$set: {token:randomString}});
  resetPasswordEmail(email, randomString);
  res.status(200).send("Check inbox of email and reset your password");
 }else {
   res.status(404).send("This email is not registered");
 }

})

//Reset Password
app.post('/resetPassword/:token', async(req, res) => {
    const { token } = req.params;
    const userData = await User.find({ token: token })
    console.log(userData, "userData");
     if(userData){
      const tokenData = userData.map((a)=>{
        let  tokenValue = a.token;
        return tokenValue
      });
      bcrypt.hash(req.body.password, rounds, (error, hash)=> {   
          User.findOneAndUpdate({ token : tokenData.toString() } , {
            $set:{
            password: hash,
            confirmPassword: hash,
            token:''
          }},{new:true})
        .then(user => {
          if(user.password === user.confirmPassword){
            user.save()
          }
          else {
            console.log("password and confirm password must be same");
          }
          res.status(200).json(user)
        })
        .catch(error=>{
          res.status(500).json(error)
        })
      })
     }
     else {
       res.status(200).send("This link is expired.")
     }
});
//edit user
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  User.findOneAndUpdate({_id:id}, {
    $set:{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNumber: req.body.contactNumber, 
      gender: req.body.gender, 
      password: req.body.password, 
      confirmPassword: req.body.confirmPassword
    }
  })
  .then(result=>{
      res.status(200).json({
        updated_user: result
      })
      console.log(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
 });

//delete user
app.delete('/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
        console.log("Record deleted");
    } else {
      console.log("Record not deleted");
    }
  });
});

let PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
