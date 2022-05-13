import express from "express";
import cors from "cors";
import dbConnect from './db/dbConnection.js';
import User from "./models/userSchema.js";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());    

//Routes 

app.get('/', (req, res) => {
  User.find({ }, (error, data) => {
    res.status(200).results;
    res.send(data);
  });
});5

app.get('/:id', (req, res) => {
  console.log(req.params.id, "getting id")

  // User.findById(req.params.id , (error, user) => {
  //   if (user) {
  //     console.log(user, "SINGLE USER FOUND")
  //     res.send(user)
  //   } else {
  //     console.log('error', error)
  //   }
  // });
  //find post by id
  try {
      const user = User.findOne({id: req.params.id});
      res.send(user);
  } catch(error) {
      res.status(200).send(error);
  }
});

app.post('/signUp', (req, res) => {
  console.log(req.body);
    const user = new User(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        gender: req.body.gender,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      },
    );
    return user.save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          userData: result
        })
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  console.log(id, "id mil gyi");
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


app.delete('/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
        console.log("Record deleted");
    } else {
      console.log("Record not deleted");
    }
  });
});


app.listen(9002, ()=> {
    console.log("BackEnd is running at port 9002");
});