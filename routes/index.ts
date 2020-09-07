import express from "express";
import TodoTask from "../models/todo";

const router = express.Router();

router.get("/", function (_, res) {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks || [] });
  });
});

router.post("/", async function (req: express.Request, res: express.Response) {
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    TodoTask.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks || [] });
    });
  } catch (error) {
    res.redirect("/");
  }
});

export default router;
