import mongoose from 'mongoose';

// User Schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    contactNumber: {
        type: Number,
        required: [true, 'Contact Number is required'],
    },
    email: {
        type: String,
        match: /.+@.+\..+/,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
    },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
