const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
//stage5
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//stage5


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
    return res.status(500).json({succes : false , message : "Something went wrong."});
  }
);
//stage3

//stage 1
app.get(
  '/',(req,res) => {
    return res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
  }
);

app.get(
  '/health' ,(req,res) => {
    return res.json({ "status": "ok" });
  }
);
//stage 1

//stage2
app.get(
  '/tasks',(req,res) => {
    return res.status(200).json(database);
  }
);
app.get(
  '/tasks/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const item = database.find(i => i.id === id);

    if(!database.includes(item)) {
      return res.status(404).json({ "error": "Task 99 not found" });
    };

    return res.json(item);
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
    
    return res.status(201).json(newTask); //201 == created
  }
);
//stage3

//curl.exe -i http://localhost:3000/tasks/1
//use this for powershell

//irm -Uri http://localhost:3000/tasks -Method Post -ContentType "application/json" -Body '{"title":"Buy milk"}'
//use this for testing post new task for powershell


//stage4
app.put(
  '/tasks/:id' ,(req,res) => {
    const id = parseInt(req.params.id);
    const item = database.find(i => i.id === id);
    if(!(item)) {
      return res.status(404).json({ "error": "Task not found" });
    };


    if (req.body.title === undefined && req.body.done === undefined) {
      return res.status(400).json({ error: "Bad Request: Body cannot be empty." });
    }
    //check if the response body have tittle (so we can input if this have body)
    if(req.body.title !== undefined && (typeof req.body.title !== 'string' || req.body.title.trim() === '')){
      return res.status(400).json({ error: "Bad Request: Title cannot be empty." });
    };

    //well if we wanna change the done boolean , we must create the validation statement first for the input
    if(req.body.done !== undefined && (typeof req.body.done !== 'boolean')){
      return res.status(400).json({ error: "Bad Request: Done must be a boolean." })
    };

    if (req.body.title !== undefined) item.title = req.body.title.trim();
    if (req.body.done !== undefined) item.done = req.body.done;


    return res.status(200).json(item); //200 is ok
  }
);
//stage4

//stage4
app.delete(
  '/tasks/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const index = database.findIndex(i => i.id === id); //instead of we validate the item with the whole object context
    //in here we just use the index , because we do deleting in here not input

    if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
    //delete task from database
    database.splice(index , 1);

    return res.status(204).send(); //204 mean no context which mean that we succesfully delete it
  }
);
//stage4

//we must listen our port
app.listen(
  PORT , ()=>{
    console.log('Server is running.')
  }
)