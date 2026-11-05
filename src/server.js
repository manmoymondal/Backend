import express from "express";
import {config} from "dotenv";
import { connectDB , disconnectDB } from "./config/db.js";

//Import Routes 
import movieRoutes from "./Routes/movieRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

config();
connectDB();

const app = express();

//Body parsing midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//API Routes
app.use("/movies",movieRoutes);
app.use("/auth",authRoutes);

const PORT = 5001;
const server = app.listen(PORT, () =>{
    console.log(`server running on PORT ${PORT}`);
})
    

// Handle unhandled promise rejections (e.g. , database connection errors)
process.on("unhandledRejection", (err) =>{
    console.error("unhandled rejection:", err );
    server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) =>{
    console.error("uncaught Excepotin:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful Shutdown 
process.on("SIGTERM", async () =>{
    console.log("SIGTERM recieved , shutting down gracefully");
    server.close(async () =>{
        await disconnectDB();
        process.exit(0);
    });
});