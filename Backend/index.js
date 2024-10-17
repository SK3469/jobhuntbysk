import express, { urlencoded } from  "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import UserRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";



dotenv.config();
//connect DB
connectDB();
const PORT= process.env.PORT ||8080;
const app = express();
const _dirname= path.resolve();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname, "/FrontEnd/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"FrontEnd","dist","index.html"))
})

app.listen(PORT,()=>{
   
    console.log(`server running on port no ${PORT}`);
});