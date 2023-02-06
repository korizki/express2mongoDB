const express = require("express")
const mongoose = require("mongoose")
const { getAllPhData } = require("./handler/phHandler.js")

const app = express()

app.listen(5100, () => console.log('Started at port 5100'))
app.get('/api-ph', getAllPhData)