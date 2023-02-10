require("dotenv").config()
// menggunakan function dari mongodb
const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient(process.env.uri)
// const client = new MongoClient("mongodb+srv://ko_rizki:rizki002@safestrong.potgqke.mongodb.net/test")
const dbuser = client.db("trial_collection").collection("dummy_data")

const getAllPhData = async (req, res) => {
    // membuat array kosong
    let array = []
    try {
        // select db
        const db = client.db("Safestrong")
        // select table / collection
        const table = db.collection("collection_ph")
        // get data with query
        const cursor = table.find({ cn: { $ne: "SP08" } })
        // jika data kosong eksekusi
        if (await cursor.count() == 0) {
            console.log("No record found.")
        }
        // jika data ada maka masukkan ke array
        await cursor.forEach(it => array.push(it))
        // kirim data array sebagai respon
        res.send(array)
    } catch (err) {
        console.log(err)
    }
}

const insertDataUser = async (req, res) => {
    try { 
        const result = await dbuser.insertOne(req.body)
        res.send(`New user with id ${result.insertedId} has been added.`)
    } catch (err) {
        console.log(err)
    }
}

const getAllUser = async (req, res) => {
    let array = []
    try {
        const result = await dbuser.find()
        await result.forEach(it => array.push(it))
        res.send(array)
    } catch(err){
        console.log(err)
    }
}

const updateUserInfo = async (req, res) => {
    let result = await dbuser.updateOne({_id: new ObjectId(req.query.id)}, {$set: req.body} )
    result.modifiedCount > 0 ? res.send(`User has been updated.`) : res.send('User not found.') 
}

module.exports = { getAllPhData, insertDataUser, getAllUser, updateUserInfo }