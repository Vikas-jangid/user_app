import mongoose from "mongoose";

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
  
  export default mongoose;
  