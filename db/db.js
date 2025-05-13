import mongoose from "mongoose";

const connectToDatabase = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            
        });

        console.log(`DatabaseConnected: ${conn.connection.name}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
    }
}

export default connectToDatabase;