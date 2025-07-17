import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongo_db:mongo_db@cluster0.shqkw.mongodb.net/ph-tour-db?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to DB..!!");

    server = app.listen(5000, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log(
    "unhandled Rejection Error Detected... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});


process.on("uncaughtException", (err) => {
  console.log(
    "uncaught Exception Error Detected... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});



process.on("SIGTERM", (err) => {
  console.log(
    "SIGTERM sigal received... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch this promise"));
// throw new Error ("I forget to handle this local error");
