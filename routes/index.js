var express = require("express");
var router = express.Router();

let tasks = [
  { id: 0, task: "Login page - perfomance issues", boardId: 0 },
  { id: 1, task: "Checkout bugfix", boardId: 0 },
  { id: 2, task: "Checkout bugfix2", boardId: 0 },
  { id: 3, task: "Shop page - perfomance issues", boardId: 1 },
  { id: 4, task: "Sprint bugfix", boardId: 1 },
];

router.get("/tasks", function (req, res, next) {
  res.send(tasks);
});
router.get("/board/:id/tasks", function (req, res, next) {
  res.send(tasks.filter((item) => `${item.boardId}` === req.params.id));
});

router.get("/tasks/:id", function (req, res, next) {
  res.send(tasks.find(({ id }) => req.params.id === `${id}`));
});



router.post("/tasks", (req, res, next) => {
  if (req.body.task) {
    console.log(tasks);
    const newTask = { id: tasks.length, ...req.body.task };
    tasks.push(newTask);
    res.send(tasks.filter((item) => item.boardId === newTask.boardId));
  }
});

router.post("/tasks/search", (req, res, next) => {
  const text = req.body.text;
  if (text) {
    res.send(tasks.filter((task) => task.task.indexOf(text) > -1));
  }
});

const boards = [
  { id: 0, title: "Backlog" },
  { id: 1, title: "Ready" },
  { id: 2, title: "In progress" },
  { id: 3, title: "Finished" },
];

router.get("/boards", function (req, res, next) {
  res.send(boards);
});

router.get("/boards/:id/tasks/search", function (req, res, next) {
  res.send(
    tasks
      .filter((item) => `${item.boardId}` === req.params.id)
      .filter((task) => task.task.includes(text))
  );
});

module.exports = router;
