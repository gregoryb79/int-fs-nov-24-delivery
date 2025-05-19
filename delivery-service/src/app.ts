import express from "express";
import path from "path";
import { json } from "body-parser";
import { router as itemsRouter} from "./routers/items.router";
// import { router as ordersRouter} from "./routers/orders";
import cors from "cors";

export const app = express();

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());

app.use("/items", itemsRouter);
// app.use("/orders", ordersRouter);
