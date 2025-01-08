const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')


const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors(
    {
        origin: "",
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// ----------- routes -----------

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Example app is listning on ${PORT}`);
})
