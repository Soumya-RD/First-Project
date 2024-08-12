const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/users');
const taskRoute = require('./routes/tasks'); // Import the task routes

const app = express();
const port = 3011;
const mongoUrl = "mongodb://localhost:27017/register";

mongoose.connect(mongoUrl)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/master', userRoute); // User routes
app.use('/tasks', taskRoute); // Task routes

app.listen(port, () => console.log(`Server running on port ${port}`));
