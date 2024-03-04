import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 500
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }
});
const User = model("User", userSchema);
export default User;