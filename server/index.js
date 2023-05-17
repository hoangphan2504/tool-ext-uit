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

app.use(cors());
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
                content: `Can you please provide me with the corrected ${input} only, without any additional feedback?${input}`
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
