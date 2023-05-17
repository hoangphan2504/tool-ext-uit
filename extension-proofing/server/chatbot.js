const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: "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",
});

async function chat(input) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `check grammar and give me the correct answer only: ${input}`
      },
    ],
  });
  console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
}

module.exports.chat = chat