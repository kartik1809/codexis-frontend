import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import projectRoute from './routes/projects.route.js';
import kanbanRoute from './routes/kanban.route.js';
import cors from 'cors';
dotenv.config();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());


// Connecting to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('It\'s Hammer Time');
});

// Routes for the API
app.use('/api/auth', authRoute);
app.use('/api/projects',projectRoute)
app.use('/api/kanban',kanbanRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
