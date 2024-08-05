import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "../routes/index.js";

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);

app.listen(3000, () => {
  console.log("Server on port 3000");
});
