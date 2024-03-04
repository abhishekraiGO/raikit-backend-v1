export const sendMessage = async (req, res) => {

    try {
        const {message} =req.body;
        const {id} =req.params;
        const senderid=req.userId;
    } catch (error) {
        console.log(`Error Occured in sending message${error.message}`)
        res.status(500).json({ message: "Internal Server Error" });
    }

};