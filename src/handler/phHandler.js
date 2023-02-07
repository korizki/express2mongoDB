require("dotenv").config()
// menggunakan function dari mongodb
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.uri)
// const client = new MongoClient("mongodb+srv://ko_rizki:rizki002@safestrong.potgqke.mongodb.net/test")

const getAllPhData = async (req, res) => {
    // membuat array kosong
    let array = []
    try {
        // select db
        const db = client.db("Safestrong")
        // select table / collection
        const table = db.collection("collection_ph")
        // get data with query
        const cursor = table.find({cn: {$ne: "SP08"}})
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

module.exports = { getAllPhData }