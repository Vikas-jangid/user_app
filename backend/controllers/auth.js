import jwt_decode from "jwt-decode";

const googleAuth = (req, res) => {
    const { token }  = req.body
    var decoded= jwt_decode(token);
    console.log(decoded.email)
    res.send(decoded);
    new User(
      {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
      })
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