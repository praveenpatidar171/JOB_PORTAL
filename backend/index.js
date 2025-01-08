const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// ----------- routes -----------






app.listen(PORT, () => {
    console.log(`Example app is listning on ${PORT}`);
})
