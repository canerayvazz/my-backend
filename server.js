const PORT = 9005
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/completions', async(req, res) => {
    let full_content = "Bunu bir tech dev olarak yanıtla. " + req.body.message
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content: full_content}],
            max_tokens: 1000,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await  response.json()
        res.send(data)
    }catch(error){
        console.log(error)
    }
})

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT))

