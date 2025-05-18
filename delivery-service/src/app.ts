import express from "express";
import { json } from "body-parser";
import { router } from "./routers/items";

export const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());

app.use("/items", router);
