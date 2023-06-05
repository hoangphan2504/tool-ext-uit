const cors = require('cors');   
const express = require('express');

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require('dotenv').config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}); 

const openai = new OpenAIApi(configuration);
  
let paraInput = ""

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.overleaf.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
    res.send("API checking")
})

app.get("/api/check", async (req, res) => {
  const input = req.query.input;
  paraInput = req.query.input;
  console.log("api checkk");
  let Result = "";
  console.log("check check");

  if (input) {
    apiCallsMade = true;
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a rude assistant. You only give the answer, what they ask and what user wants you to response like user ask you to return 1 only the response only contain number 1, you won't give any friendly response or give any additional feedback.",
          },
          {
            role: "user",
            content: `Please check the grammar of the following sentence while retaining the LaTeX syntax: ${input}. Then provide the corrected only, without any additional feedback and additional latex code? If there are no error, return 1 only, no more`,
          },
        ],
      });

      correctedGrammar = response.data.choices[0].message.content;
      Result =  correctedGrammar;

        res.status(200).json({output: Result});
      
    } catch (error) {
      console.error("Error making API calls:", error);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  } else {
    console.log("chua truy cap duoc if tren");
    res.status(400).json({ error: "Invalid input" });
  }
});


app.get("/api/para", async (req, res) => {
  const input = paraInput;
  console.log(input, "para");
  let Result = "";
  console.log("check check");
  if(input != "") {
        // paraphrase

        const continuedResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
          // Include previous conversation messages
            { role: "user", 
            content: `Provide a paraphrased version and retain the latex syntax (if it has), without any additional feedback :${input}` },
          ]
        });

        const paraphrase = continuedResponse.data.choices[0].message.content;
        console.log("paraphrase",paraphrase);

        paraResult =  paraphrase;
        // Result = paraphrase;

        res.status(200).json({output: paraResult});

  }
  else console.log("chua truy cap duoc if tren");
})


  


app.listen(3001, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3001);
});
