import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true,'Enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'Enter your password']
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema);
export default User;
