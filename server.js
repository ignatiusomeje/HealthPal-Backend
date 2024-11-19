import express from "express";
import http from "http";
import 'dotenv/config.js'
import App from "./app.js";



export const server = http.createServer(App);


server.listen(process.env.PORT, () => {
  console.log(`app is running on Port ${process.env.PORT}`);
});

