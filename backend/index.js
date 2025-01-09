const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');


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
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes)

// -------------------------------

app.listen(PORT, () => {
    console.log(`Example app is listning on ${PORT}`);
})
