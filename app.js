import 'dotenv/config'
import express from "express"
import userRouter from "./routes/UserRoutes.js";
import drugRouter from "./routes/DrugRoutes.js";
import cors from "cors"
import mongoose from "mongoose";

const App = express(); 

console.log("i entered here ooooo")

App.use(express.json())
App.use(cors())
App.use("/api/v1/user", userRouter);
App.use("/api/v1/drugs", drugRouter)

console.log("i entered here ooooo")


mongoose
  .connect(process.env.DBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB has connected Successfully"))
  .catch((err) => console.log(`error encountered ${err}`));


App.use((req,res)=> res.status(404).json({
  status:404,
  message: "Route does not exist"
}))

App.use((err, req,res) => {
  res.status(500).json({
    status:500,
    message:err
  });
})

export default App;