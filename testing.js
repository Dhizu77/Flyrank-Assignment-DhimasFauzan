//So this is the first move , let's create a simple server using express 

const express = require('express'); //so this is how we import express 
const app = express(); // and this how we use express in js

const PORT = 2000; //we defined our port number as 3000

//after that , first we must defined our root URL (its like our big gate of our home)
// we defined it with GET method

app.get(
  '/', (req,res) => {
    res.send('Hello World');
  }
);

//then we must start our server using listen method and give the port same as we already
//defined , and acallback function that will run when the server is started

app.listen(
  PORT, () => {
    console.log("Server is running on port", PORT);
  }
);

// after that , we must type on terminal to toggle on the server
// node [file-name]
// e.g => node index.js


//after that we can try open browser and open the url for the localhost at port 3000
// e.g => http://localhost:3000

//so this is the end of my first move.