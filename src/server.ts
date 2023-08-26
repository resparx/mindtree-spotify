import 'dotenv/config';
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";

import routes from "./routes";
import { AppDataSource } from './orm/dataSource';
export const app = express();

app.use(bodyParser.json())
app.use("/", routes);

const port = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log("DB running...!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
