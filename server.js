import express from 'express';
import connectDb from './config/db.js';
import cookieParser  from 'cookie-parser'
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import taskRouter from './routes/tasksRoute.js';


const app = express();
connectDb();

app.use(express.json());
app.use(cookieParser())
app.use(cors())




const port = 8080;
app.use('/api/auth', userRouter)
app.use('/api', taskRouter)
app.listen(port, () => {
    console.log(`app is listining on port ${port}`)
})


