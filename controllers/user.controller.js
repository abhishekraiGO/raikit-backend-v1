import User from "../models/User.model.js";

const getUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const filter = await User.find({ _id: { $ne: currentUserId } }).select("-password");
        return res.status(200).json(filter);
    } catch (error) {
        return res.status(500).json({ message: `Unable to get Users ${error.message}` });

    }

}
export default getUsers;
