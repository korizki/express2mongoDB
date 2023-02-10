const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require("mongoose")
const { getAllPhData, insertDataUser, getAllUser, updateUserInfo } = require("./handler/phHandler.js")
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(5100, () => console.log('Started at port 5100'))
const init = async () => {
    const client = new MongoClient(process.env.URI)
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    } catch(err){
        console.log(`Error when establish connection to MongoDB`)
    }
}
init()

app.get('/api-ph', cors(), getAllPhData)
app.get('/user', cors(), getAllUser)
app.put('/user', cors(), updateUserInfo)
app.post('/user', cors(), insertDataUser )
