import mongoose from 'mongoose';

const connectTOMongoDb = async () => {
    try {
        const uri = process.env.MONGO_URL; // Use an environment variable for your URI
        await mongoose.connect(uri);
        console.log("Connected To MongoDb");
    }
    catch (error) {
        console.log("Error in connection to MongoDb", error);
    }
};

export default connectTOMongoDb;
