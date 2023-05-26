const cors = require('cors');   
const express = require('express');

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require('dotenv').config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}); 

const openai = new OpenAIApi(configuration);
  


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.overleaf.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
    res.send("API checking ")
})

app.get("/api/check", async (req, res) => {
    const input = req.query.input;
    console.log("api checkk");
    let Result = "";
    console.log("check check");
    if(input) {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
              {
                role: "user",
                content: `Please check the grammar of the following sentence while retaining the LaTeX syntax: "${input}", and provided the corrected only, without any additional feedback?`
              },
            ],
          });
          console.log(response.data.choices[0].message.content);
          Result = response.data.choices[0].message.content; // JSON.parse(...)
          res.status(200).json({output: Result});

    }
    else console.log("chua truy cap duoc if tren");
})

app.listen(3001, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3001);
});
