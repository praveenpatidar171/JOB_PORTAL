const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

//deployment imports
const path = require('path');


const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

// path of our backend
const _dirname = path.resolve();

app.use(cors(
    {
        origin: "http://127.0.0.1:5173",
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------- routes -----------

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes)

// -------------------------------

// ----------deployment code--------

//joining the paths
app.use(express.static(path.join(_dirname, '/frontend/dist')));

//serving routes other than backend ex- frontend's in this case 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
})

//- ---------------------------------

app.listen(PORT, () => {
    console.log(`Example app is listning on ${PORT}`);
})
