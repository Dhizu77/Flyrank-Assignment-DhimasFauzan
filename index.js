const express = require('express');
const app = express();
const PORT = 3000;

//stage2
let database = [
  { id : 1, title: "task1" , done: true},
  { id : 2, title: "task2" , done: false},
  { id : 3, title: "task3" , done: true}
];
//stage2

//stage 1
app.get(
  '/',(req,res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
  }
);

app.get(
  '/health' ,(req,res) => {
    res.json({ "status": "ok" });
  }
);
//stage 1

//stage2
app.get(
  '/tasks',(req,res) => {
    res.status(200).json(database);
  }
);
app.get(
  '/tasks/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const item = database.find(i => i.id === id);

    if(!database.includes(item)) {
      res.status(404).json({ "error": "Task 99 not found" });
    };

    res.json(item);
  }
);
//stage2

//curl.exe -i http://localhost:3000/tasks/1
//use this for powershell

app.listen(
  PORT , ()=>{
    console.log('Server is running.')
  }
)