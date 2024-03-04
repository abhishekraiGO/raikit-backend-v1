
import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';
export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });
        console.log(conversation);
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })
        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()])

        return res.status(201).json({ message: "Message Sent from sender" });

    } catch (error) {
        console.log(`Error Occured in sending message${error.message}`)
        return res.status(500).json({ message: "Internal Server Error" });
    }

};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");
        if (conversation.messages) {
            return res.status(200).json([]);

        }
        return res.status(200).json(conversation.messages);

    } catch (error) {
        console.log(`Error Occured in getting message${error.message}`)
        return res.status(500).json({ message: "Internal Server Error" });

    }
}