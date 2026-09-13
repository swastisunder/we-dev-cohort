import { Router } from "express";
import { TodoController } from "./todo.controller.js";

const todoRouter = Router();
const controller = new TodoController();

todoRouter.get("/", controller.handleGetAllTodos.bind(controller));
todoRouter.get("/:id", controller.handleGetTodo.bind(controller));

todoRouter.post("/", controller.handleCreateTodo.bind(controller));

todoRouter.put("/:id", controller.handleUpdateTodo.bind(controller));
todoRouter.delete("/:id", controller.handleDeleteTodo.bind(controller));

export default todoRouter;
