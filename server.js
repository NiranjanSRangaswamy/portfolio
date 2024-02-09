import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

import http from 'http'
import app from './app.js';


http.createServer(app)
    .listen(process.env.PORT,(err)=>{if(err) console.log(err);console.log(`server running port ${process.env.PORT}`)})