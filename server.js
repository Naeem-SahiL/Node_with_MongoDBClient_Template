import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const url = "mongodb://127.0.0.1:27017/";

// app.get('/', (req, res) => {
//     res.send('App is listening on 5000')
// });

app.route('/')
    .get((req, res) => {
        res.send('App is listening on 5000')
    });

app.route('/users')
    .post((req, res) => {
        try {
            MongoClient.connect(url, (err, db) => {
                if (err)
                    throw err;

                const dbo = db.db('mongoClient')
                dbo.collection('users').insertOne(req.body, (err) => {
                    if (err)
                        throw err;
                    res.send('inseted success')
                    db.close()
                })
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    .get((req, res) => {
        try {
            MongoClient.connect(url, (err, db) => {
                if (err)
                    throw err;

                const dbo = db.db('mongoClient')
                dbo.collection('users').find({}).toArray((err, users) => {
                    if (err)
                        throw err;
                    res.json(users)
                    db.close()
                })
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })

app.route('/users/:name')
    .get((req, res) => {
        try {
            MongoClient.connect(url, (err, db) => {
                if (err)
                    throw err;

                const dbo = db.db('mongoClient')
                dbo.collection('users').findOne({ "userName": req.params.name }, (err, user) => {
                    if (err)
                        throw err;
                    res.json(user)
                    db.close()
                })
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    .put((req, res) => {
        try {
            MongoClient.connect(url, (err, db) => {
                if (err)
                    throw err;

                const dbo = db.db('mongoClient')
                dbo.collection('users').findOneAndUpdate({ "userName": req.params.name }, { $set: req.body }, (err, result) => {
                    if (err)
                        throw err;
                    res.json('user updated')
                    db.close()
                })
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    .delete((req, res) => {
        try {
            MongoClient.connect(url, (err, db) => {
                if (err)
                    throw err;

                const dbo = db.db('mongoClient')
                dbo.collection('users').deleteMany({ "userName": req.params.name }, (err, result) => {
                    if (err)
                        throw err;
                    res.json(result)
                    db.close()
                })
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })

app.listen(5000, (err, res) => {
    if (err) {
        console.log('error occured', err)
    }

    console.log('server is listening on port 5000')
})