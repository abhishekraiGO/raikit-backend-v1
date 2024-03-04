import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo is connected successfully')
    } catch (error) {
        console.log(`Error connecting to mongo db ${error.message}`);
    }
}
export default connection;