const cors = require('cors');   
const express = require('express');

const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send("API checking ")
})

app.get("/api/check", async (req, res) => {
    const input = req.query.input;
    const output = req.query.output
    console.log("api check");
    if(input) {
        if(input === "Hello"){
            const result =  res.json({output: "Xin chao"})
            console.log(result);
        }
    }
})

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", 3000);
});