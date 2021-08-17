import express from "express";
import { APP_PORT } from "./config";
import db from "./database";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Routes);
app.listen(APP_PORT, () => {
  console.log("app connected successfully");
});
