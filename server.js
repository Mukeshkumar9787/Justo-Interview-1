import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import userRouter from "./src/routes/user.route.js";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
app.use(bodyParser.json())

const limiter = rateLimit({
  windowMs: 1000, // 5 minutes
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

app.use(limiter)

app.use(cors())

app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    res.removeHeader('x-powered-by');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','POST');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    //allow request to continue and be handled by routes
    next();
  });

app.use("/user",userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});