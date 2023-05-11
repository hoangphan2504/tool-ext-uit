const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: "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",
});

async function main() {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "check the latex code below, whether the grammar and vocabulary is right (return 'No error') else suggest how to fix: \begin{abstract} Pesson re-identification (ReID) play a crucial role in video surveillance with the aim to search a specific person across disjoint cameras, and it has progressed notably in recent years. However, visible cameras may not  able  record enough information about the pedestrian’s appearance under the condition for low illumination. \end{abstract}"
      },
    ],
  });
  console.log(response.data.choices);
}