const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.emwzks8.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run () {
    try{

        const usersCollection = client.db('instaCity').collection('users');

        const detailsCollection = client.db('instaCity').collection('postDetails');

        const commentsCollection = client.db('instaCity').collection('comments');




        app.post('/users', async (req , res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            let query = {}
            if(req.query.email){
                 query = {
                    email: req.query.email
            }
            }
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id)}
        })



        app.post('/postDetails', async (req, res) => {
            const details = req.body;
            const result = await detailsCollection.insertOne(details);
            res.send(result);
        })

        app.get('/postDetails', async (req, res) => {
            const query = {};
            const cursor = await detailsCollection.find(query).toArray();
            res.send(cursor);
        })

        app.get('/postDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const post = await detailsCollection.findOne(query);
            res.send(post);
        })

        // --------------------------------------------------------------

        app.post('/comments', async (req , res) => {
            const comment = req.body;
            const result = await commentsCollection.insertOne(comment);
            res.send(result);
        })

       

    }
    finally{

    }
}
run().catch(console.log);






















app.get('/', (req , res) => {
    res.send('Insta-server is running');
})

app.listen(port, () => {
    console.log(`Insta-server is running on port ${port}`)
});