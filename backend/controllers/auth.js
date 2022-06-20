import jwt_decode from "jwt-decode";
import User from "../models/userSchema.js";

const googleAuth = (req, res) => {
    const { token }  = req.body
    var decoded= jwt_decode(token);
    console.log(decoded)
    const user = new User(
      {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
      })
      res.setHeader(user);
      res.send(decoded);
      user.save()
        .then(user => {
          res.status(200).json(user)
        })
        .catch(error=>{
          res.status(500).json(error)
      })
}

export {
  googleAuth
}