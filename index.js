const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user: dbuser1
// password: oUXmE2h4Bg2WstBG

const uri = "mongodb+srv://dbuser1:oUXmE2h4Bg2WstBG@cluster0.kqcdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect();
    const userCollection = client.db('foodExpress').collection('user');

    // get users
    app.get('/user', async (req, res) => {
        const query = {};
        const cursor = userCollection.find(query);
        const users = await cursor.toArray();
        res.send(users);
    })

    // POST user: add a new user
    app.post('/user', async (req, res) => {
        const newUser = req.body;
        console.log('adding new user', newUser);
        const result = await userCollection.insertOne(newUser);
        res.send(result);
    })

    // delete a user
    app.delete('/user/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };

    })
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running my node CRUD surver ');
});

app.listen(port, () => {
    console.log('CRUD server is running');
})