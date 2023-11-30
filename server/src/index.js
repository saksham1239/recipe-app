import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/Recipes.js";

const app = express();

//! Middleware
app.use(express.json()); // converts the data from the frontend to json
app.use(cors()); // it solves many issues when trying to make the api request from the frontend
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://sakshamkamboj71:skSK2003@recipes.no2ptuv.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(8000, () => {
  console.log("Server Started");
});
