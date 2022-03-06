const express = require('express');
const task = require('../models/task');

const router = express.Router();

router.get('/tasks', (req, res) => {

  task.find().sort({ createdAt: -1 })
    .then((result) => {
      console.log("Results of get all the tasks:- ", result);
      res.render('index', { title: 'All Tasks', tasks: result });
    })
    .catch(err => console.log(err));

});

router.get('/tasks/add', (req, res) => {
  res.render('add', { title: 'add a new task' });
});

router.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  task.findById(id)
    .then((result) => {
      res.render('detail', { title: 'task details', task: result });
    })
    .catch(err => console.log(err));
});


router.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask["completed"] = false;
  console.log(newTask);
  const Task = new Task(newTask);

  Task.save()
    .then((result) => {
      res.redirect('/tasks');
    })
    .catch(err => console.log(err));

});

router.put('/tasks/:id', (req, res) => {

  const Task = new Task({
    _id: req.params.id,
    description: req.params.description,
    completed: true
  });

  task.updateOne({ _id: req.params.id }, task)
    .then((result) => {
      res.json({ redirect: '/tasks' })
    })
    .catch(err => console.log(err));

});

router.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  task.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => console.log(err));

});

module.exports = router;