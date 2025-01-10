require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth-routes/index');
const mediaRoutes = require('./routes/instructor-routes/media-routes');
const instructorCourseRoutes = require('./routes/instructor-routes/course-routes');
const studentViewCourseRoutes= require('./routes/student-routes/course-routes');
const studentViewOrderRoutes= require('./routes/student-routes/order-routes');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Apply CORS Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.error(`DB Connection Error: ${e.message}`));

// Routes Configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use(express.json());
app.use("/student/order", studentViewOrderRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err.message,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
