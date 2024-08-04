import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import cors from 'cors';
dotenv.config();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

// Log the MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Secret Key:', process.env.SECRET_KEY);
// Connecting to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('It\'s Hammer Time');
});

// Routes for the API
app.use('/api/auth', authRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
