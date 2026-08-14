const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

//Stage0Assignment2
//In here we will replace array with Sql Lite to store our data

const Database = require('better-sqlite3');

const database = new Database('tasks.db');

database.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

//then , we will cek the number of the row first and then check if 0 we will create new tasks
const rowCount = database.prepare('SELECT COUNT(*) as count FROM tasks').get().count;

//here we will create new tasks

if (rowCount === 0) {
  const insertTask = database.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insertTask.run('task1', 0);
  insertTask.run('task2', 0);
  insertTask.run('task3', 1);
  console.log('Done for load the initial seed.');
}
//Stage0Assignment2

//stage5
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//stage5


//stage2
/*let database = [
  { id : 1, title: "task1" , done: true},
  { id : 2, title: "task2" , done: false},
  { id : 3, title: "task3" , done: true}
];
*/
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



/*
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
*/

//stage1Assignment2
app.get(
  '/tasks' , (req,res) => {
    //first we must create the statement in sql syntax first
    const statement = database.prepare('SELECT * from tasks');

    //then we will store the execute result of the statemen
    //but because in SQLite , the boolean is store in number 
    //we should change it first with map ()
    //so map() takes an existing array, applies a transformation callback 
    // to each element, and returns a new array with the modified elements
    //but before we use map , we need to get all of tasks into array of rows
    //we need all() to use it , so

    const allTasks = statement.all().map(task => ({
      ...task , //... is Spread operator , it keeps all original keys ,
      //because in here we just need to change the 'done' value not the keys
      done : Boolean(task.done)
    }));
    const id = database.prepare(req.params.id);
    return res.status(200).json(allTasks)
  }
);

app.get(
  '/tasks/:id',(req,res) => {

    //okay first we need extract the id in the req body first to 
    //pass it leter into the statement
    const id = parseInt(req.params.id ,10);

    
    //then we create statement to load the syntax first to execute later for 
    //get the item by id
    const statement = database.prepare('SELECT * FROM tasks WHERE id = ?')
    const item = statement.get(id);
    

     // statement.get(id) returns the matching task object, 
     // or 'undefined' if no row matches
    // In JavaScript, 'undefined' is falsy
    // By using the logical NOT operator (!item):
    // - If item is undefined (falsy)
    // -> !undefined becomes true  -> triggers the 404 block
    // - If item exists (truthy object) ->
    //  !{...}     becomes false -> skips to the 200 response
    if(!item) {
      return res.status(404).json({ "error": `Task ${id} not found` });
    };


    //in the end , we retur the code and body response that already
    //edit the value of done keys (number to boolean)
    return res.status(200).json({
    ...item,
    done: Boolean(item.done)
  });
  }
);
//stage1Assignment2

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