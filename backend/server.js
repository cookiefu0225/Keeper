///////////////////////////////// Import & Basic Setting/////////////////////////////////
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import noteRouter from "./routes/notes.js";

const       app = express();
const       port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/", noteRouter);


///////////////////////////////// Database /////////////////////////////////
const       dbUri = process.env.ATLAS_URI;
try {
    await mongoose.connect(dbUri);
    console.log("MongoDB Atlas connected");
} catch (error) {
    console.log("Database Connection Error");
    console.log(error);
}


///////////////////////////////// Server Setup /////////////////////////////////
app.listen(port, function() {
    console.log("Server running at port " + port);
});