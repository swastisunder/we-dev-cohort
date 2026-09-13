import type { Request, Response } from "express";
import type { Todo } from "../../validations/todo.schema.js";
import { todoSchema } from "../../validations/todo.schema.js";

export class TodoController {
  private _db: Todo[];

  constructor() {
    this._db = [];
  }

  public handleGetAllTodos(req: Request, res: Response): Todo[] {
    const todos = this._db;
    res.status(200).json({ todos });
    return todos;
  }

  public async handleCreateTodo(req: Request, res: Response) {
    try {
      const unvalidatedTodo = req.body;
      const validatedTodo = await todoSchema.parseAsync(unvalidatedTodo);
      this._db.push(validatedTodo);
      res.status(201).json({ todo: validatedTodo });
    } catch (error) {
      return res.status(400).json({ error: "Invalid request body" });
    }
  }

  public handleGetTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = this._db.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json({ todo });
  }

  public handleUpdateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const index = this._db.findIndex((todo) => todo.id === id);
    if (index === -1) return res.status(404).json({ error: "Todo not found" });
    const updatedTodo = { ...this._db[index], ...req.body };
    this._db[index] = updatedTodo;
    res.status(200).json({ todo: updatedTodo });
  }

  public handleDeleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const index = this._db.findIndex((todo) => todo.id === id);
    if (index === -1) return res.status(404).json({ error: "Todo not found" });
    this._db.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  }
}
