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
    res.redirect("/todos");
  }
});

router
  .route("/edit/:id")
  .get((req: express.Request, res: express.Response) => {
    const id = req.params.id;
    TodoTask.find({}, (_err, tasks) => {
      res.render("todoEdit.ejs", {
        todoTasks: tasks,
        idTask: id,
      });
    });
  })
  .post((req: express.Request, res: express.Response) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
      if (err) return res.status(500).send(err);
      res.redirect("/todos");
    });
  });

router
  .route("/remove/:id")
  .get((req: express.Request, res: express.Response) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.status(500).send(err);
      res.redirect("/todos");
    });
  });

export default router;
