import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user:'04jangid@gmail.com',
    pass:'jarfhgqfscchyamr',
  }
});

export default transporter;
