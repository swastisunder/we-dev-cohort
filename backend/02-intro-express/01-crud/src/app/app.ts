import express, { type Application } from "express";
import todoRouter from "./todo/todo.routes.js";

export function createServerApplication(): Application {
  const app = express();

  app.use(express.json());

  //#region  //*=========== Routes ===========
  app.use("/api/todos", todoRouter);

  //#endregion  //*======== Routes ===========

  return app;
}
