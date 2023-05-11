const cors = require('cors');   
const express = require('express');

// const bard = require("bard-builder");
// const bot = new bard.Bot({state: {}});
// bot.start();


// const { spawn } = require('child_process');

// // call my_function from my_script.py with arguments
// const pyScript = spawn('python', ['test_bard.py', 'bot', 'token']);

// pyScript.stdout.on('data', (data) => {
//   // handle the result returned by my_function
//   console.log(`Result: ${data}`);
// });

// pyScript.stderr.on('data', (data) => {
//   // handle any errors that occur
//   console.error(`Error: ${data}`);
// });

// const { PythonShell } = require('python-shell');
// const pyFile = 'test_bard.py';
// const pyFunction = 'bot';


  
const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send("API checking ")
})

app.get("/api/check", async (req, res) => {
    const input = req.query.input;
    console.log("api check");
    let Result = "";
    if(input) {
      Result = input;
    }
    res.status(200).json({output: Result});
})

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3000);
});