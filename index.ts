import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

//Routers


app.get('/', async (req, res)=>{
    throw new Error('Oj lipa');
})

app.listen(3001,'0.0.0.0', ()=>{
    console.log('Aplikacja działa na porcie http://localhost:3001')
})