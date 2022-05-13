import express from 'express';
import User from '../models/userSchema.js';

const userRouter = express.Router();

userRouter.post('/signup', (request, response) => {
    const user = new User(
      {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        contactNumber: request.body.contactNumber,
        gender: request.body.gender,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
      },
    );
    return user.save()
      .then(() => {
        const userData = user.toObject();
        response.result(userData);
      })
      .catch((error) => {
        response.badRequest({
          message: 'Validation Error',
          errors: parseValidationErrors(error),
        });
      });
  });
  