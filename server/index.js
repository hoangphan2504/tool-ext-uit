const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("API  running")
})

app.get("/api/check", async (req, res) => {
    const kw = req.query.kw;
    const input = req.query.input;
    const output = req.query.output;

    if(kw && input && output) {
        // check grammar by chat GPT
    }
})

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3000);
});