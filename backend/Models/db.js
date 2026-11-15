const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

async function connectDB() {
    try {
        if (!mongo_url) {
            throw new Error("MONGO_CONN missing in .env");
        }

        await mongoose.connect(mongo_url, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB Atlas Connected Successfully!");
    } catch (error) {
        console.log("MongoDB Connection Failed:");
        console.log(error);
    }
}

connectDB();

module.exports = connectDB;
