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

//stage3 
//let's create middleware here

//first middleware for JSON request body
app.use(express.json());

//create middleware to catch some request received
app.use(
  (req,res,next) => {
    console.log('Request Received');
    next();
  }
);

//create middleware for error handling
app.use(
  (err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json({succes : false , message : "Something went wrong."});
  }
);
//stage3

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


//stage3
app.post(
  '/tasks' ,(req,res) => {

    
    //filter before create newTask , check whether the body is null or the type is not string or the lenght of the title is equal to 0
    //if true return errro and json error message
    if(!req.body?.title || typeof req.body.title !== 'string' || req.body.title.length === 0){
      return res.status(400).json({ error: "Bad Request: Title cannot be empty." });
    };
    
    //automatic ID and done is false 
    const newTask = {
      id: database.length + 1,
      title: req.body.title,
      done: false
    };

    database.push(newTask);
    
    res.status(201).json(newTask);
  }
);
//stage3

//curl.exe -i http://localhost:3000/tasks/1
//use this for powershell

//irm -Uri http://localhost:3000/tasks -Method Post -ContentType "application/json" -Body '{"title":"Buy milk"}'
//use this for testing post new task for powershell


//we must listen our port
app.listen(
  PORT , ()=>{
    console.log('Server is running.')
  }
)