const mongoose = require('mongoose');

const mongoURI = 'mongodb://sunnysable2003:UYhvYh4mZirWtFmb@ac-8z1qhn7-shard-00-00.sgzxh8j.mongodb.net:27017,ac-8z1qhn7-shard-00-01.sgzxh8j.mongodb.net:27017,ac-8z1qhn7-shard-00-02.sgzxh8j.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-tqrdj0-shard-0&authSource=admin&retryWrites=true&w=majority'; // Your MongoDB URI here

const connectToMongoDB = async () => {
    try {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(mongoURI, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const fetchFoodData = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection not ready');
            return null;
        }

        const foodItems = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        return { foodItems, foodCategory };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


const startServer = () => {
    const express = require('express');
    const app = express();
    const port = 5000;

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.json());
    app.use('/api', require('./Routes/Creatuser'));
    app.use('/api', require('./Routes/DisplayData'));
    app.use('/api', require('./Routes/OrderData'));


    app.listen(port, async () => {
        console.log(`Example app listening on port ${port}`);
        await connectToMongoDB();
        const data = await fetchFoodData();
        if (data) {
            app.locals.foodData = data; // Store the fetched data in app locals
        }
    });
};

startServer();
