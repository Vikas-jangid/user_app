import transporter from './transporter.js';
import User from '../models/userSchema.js';

export const resetPasswordEmail = (email, token) => {
  User.find({email : email }, (error, users) => {
    const mailOptions = {
      from: '04viky@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `<p>Hi</p>
      <p>Reset Your password by <a href="http://localhost:3000/resetPassword/${token}">reset password</a> link.</p>`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return err;
      }
      else{
        console.log("mail sent",data.response);
        return data;
      }
    });
  });
};