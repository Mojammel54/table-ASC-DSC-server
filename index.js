const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { query } = require('express');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ebaxxgs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {

        const taskCollection = client.db("job").collection("task");

        app.get('/task', async (req, res) => {
            let query = {}
            const order = req.query.order === 'asc' ? 1 : -1;
            const cursor = taskCollection.find(query).sort({ age: order })
            const result = await cursor.toArray();
            res.send(result)




        })



        app.get('/taskdata', async (req, res) => {


            const query = {}
            const cursor = taskCollection.find(query)
            const data = await cursor.toArray();
            res.send(data)




        })





    }

    finally {





    }



}
run().catch(err => {

    console.log(err)


})


app.get('/', (req, res) => {

    res.send('server is running')


})

app.listen(port, () => {

    console.log(`port is running on${port}`)


})