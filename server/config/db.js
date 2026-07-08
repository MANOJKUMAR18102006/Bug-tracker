const mongoose=require('mongoose');

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Stop the app if connection fails
    }
}

// Exporting the function directly
module.exports=connectDb;