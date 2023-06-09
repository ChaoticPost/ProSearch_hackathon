import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: String, //Employer or an Employee
    passwordHash: {
        type: String,
        required: true,
    },
    description: String,
    },
    {
        timestamps: true,
    });

export default mongoose.model('User', UserSchema);