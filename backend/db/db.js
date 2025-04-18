import mongoose from 'mongoose';

const connectTOMongoDb = async () => {
    try {
        const uri = process.env.MONGO_URL
        await mongoose.connect(uri);
        console.log("Connected To MongoDb");
    }
    catch (error) {
        console.log("Error in connection to MongoDb", error);
    }
};

export default connectTOMongoDb;
