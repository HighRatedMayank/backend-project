/*
import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})
    connectDB();
*/



// import mongoose from "mongoose";
// import express from "express";
// import { DB_NAME } from "./constants.js";
// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log("MongoDB connected");

//         app.on("error", (error) => {
//             console.log("APP ERROR: ", error);
//             throw error;
//         });

//         const PORT = process.env.PORT || 8000;
//         app.listen(PORT, () => {
//             console.log(`App is listening on port ${PORT}`);
//         });

//     } catch (error) {
//         console.error("Connection or app setup failed:", error);
//         process.exit(1); // Exit the app if critical failure occurs
//     }
// })();


import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import { app } from "./app.js";  // ✅ Import the configured app

dotenv.config({ path: "./.env" });

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connected");

        app.on("error", (error) => {
            console.log("APP ERROR: ", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Connection or app setup failed:", error);
        process.exit(1);
    }
})();
