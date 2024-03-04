import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(500).json({ message: "User is not logged in" })
        }
        const { userId } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(userId).select("-password");
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(500).json({ message: "User is not logged in" })

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
}
export default protectedRoutes;