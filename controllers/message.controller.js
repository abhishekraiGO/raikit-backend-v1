
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