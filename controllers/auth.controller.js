import User from "../models/User.model.js";
import { hashing } from "../utils/hashing.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        let { fullname, username, pasword, confirmpassword, gender } = req.body;
        if (pasword !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json({ error: "User Already exists" });
        }
        //hash password
        let password = await hashing(pasword);
        const newUser = new User({
            fullname,
            username,
            password,
            gender
        });
        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({ message: "User created successfully" })

        } else {
            return res.status(400).json({ message: "Invalid User data" });

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }



}
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log(password);
    if (!user) {
        return res.status(400).json({ message: "This username is not registered" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password is not Correct" });
    } else {
        generateTokenAndSetCookie(user._id, res)
        return res.status(201).json({ message: "User successfully logged in" });
    }
}
export const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({ message: "User Logged out Successfully" });
    } catch (error) {
        res.status(500).json(`Internal server error ${error.message}`)
    }
}