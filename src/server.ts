import express from 'express';
import cors from 'cors';
import configData from './configs/config';
import mongoose from 'mongoose';
import authRouter from './routes/authRoutes';
import accRouter from './routes/accRoutes'


const app = express();

mongoose.connect(configData.mongo.url as string)
    .then(()=> console.log('connected to database'))
    .catch((error)=> console.log('Database connection error', error))

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
res.status(200).json({
    status: true,
    message: 'Server is running smoothly'
});
});

// Endpoints
app.use('/api/v1', authRouter);
app.use('/api/v2', accRouter);

app.listen(configData.server.port, ()=> console.log(`Server running successfully on port ${configData.server.port}`))