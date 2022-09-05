import express,{json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./error/error";
import rateLimit from "express-rate-limit";
import {petRouter} from "./routers/pet.router";
import {config} from "./config/config";

const app = express();
app.use(cors({
    origin: config.corsOrigin
}));
app.use(json());

app.use(rateLimit({
    windowMs: 10 * 60 * 1000, //10 min
    max: 150,
}))



//Routers
app.use('/pet', petRouter);

app.use(handleError);

app.listen(3001,'0.0.0.0', ()=>{
    console.log('Aplikacja działa na porcie http://localhost:3001')
})