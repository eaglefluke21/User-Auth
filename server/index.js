import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());

const corsOptions = {
  origin: 'https://user-auth-mu-ten.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));



app.get('/', (req, res) => {
    res.send('server root  working');
  });

app.use('/users',userRoutes());


app.listen(port , function(){
    console.log(`server is listening at https://user-auth-backend-three.vercel.app`);
});