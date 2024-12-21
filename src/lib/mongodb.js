import mongoose from 'mongoose';

const uri = process.env.MongoDBUrl;

if (!uri) {
    throw new Error('Please add your MongoDB URL to .env.local');
}

mongoose.connect(uri, {
    dbName:"Yazlab1-3"
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;