const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

async function connectDB() {
    try {
        if (mongo_url) {
            await mongoose.connect(mongo_url, { serverSelectionTimeoutMS: 2000 });
            console.log('MongoDB Connected to configured URI...');
            return;
        }
    } catch (err) {
        console.log('Local/Remote MongoDB Connection failed, starting in-memory MongoDB server...');
    }

    try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log('MongoDB Connected to In-Memory Server at:', uri);
    } catch (error) {
        console.log('MongoDB Connection Error: ', error);
    }
}

connectDB();
