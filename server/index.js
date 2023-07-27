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
              "You are a rude assistant. You only give the answer, what they ask and what user wants you to response. No polite in answer such as: 'the correct answer is...' or 'this is incorrect' ",
          },
          {
            role: "user",
            content: `Please provide the correct grammar version of this latex code: '${input}'. The response would be without any feedback and additional latex code.`,
          },
          // { role: "user", content: `Please check the grammar of the sentence: ${input} and provide the corrected version, retain the latex code of the input. No addiontal feedback` },
          // { role: "assistant", content: "Sure, here's the corrected version:" }

        ],
      });
      
      correctedGrammar = response.data.choices[0].message.content;
      if(input === correctedGrammar) console.log(1) ;
      else console.log(0);
      Result =  {correctedGrammar, input};
      console.log(input);
      console.log(Result);

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
            content: `Provide a paraphrased version, without any additional feedback :${input}. Keep the format of the input` },
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

app.get("/api/abstract1", async (req, res) => {
  const input = paraInput;
  console.log(input, "abstract_1");
  let Result = "";
  console.log("check check");
  if(input != "") {
        // paraphrase

        const abstractv1 = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
          // Include previous conversation messages
            { role: "user", 
            content: `Does this text show any solution to the problem in this latex code ? the latex code is: '${input}'` },
          ]
        });

        const abstract1 = abstractv1.data.choices[0].message.content;
        console.log("abstract1",abstract1.substring(0, 3));

        let firstThreeLetters;

        if (abstract1.startsWith('Yes')) {
          firstThreeLetters = abstract1.substring(0, 3);
        } else if (abstract1.startsWith('No')) {
          firstThreeLetters = abstract1.substring(0, 2);
        } else {
          // Handle the case when the string does not start with 'Yes' or 'No'
          console.log("The string doesn't start with 'Yes' or 'No'");
        }

        console.log(firstThreeLetters); // Output: 'Yes'


        abstract1Result =  firstThreeLetters;
        // Result = paraphrase;

        res.status(200).json({output: abstract1Result});

  }
  else console.log("chua truy cap duoc if tren");
})

  


app.listen(3001, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3001);
});
