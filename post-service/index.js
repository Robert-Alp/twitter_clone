const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Worker } = require('worker_threads');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = []; 

app.post('/post', (req, res) => {
    const { pseudo, message } = req.body;
    if (!pseudo || !message) return res.status(400).send({ error: 'Pseudo and message are required' });

    const worker = new Worker('./worker.js', { workerData: { pseudo, message } });
    worker.on('message', (result) => {
        posts.push(result);
        res.status(200).send(result);
    });

    worker.on('error', (err) => res.status(500).send({ error: err.message }));
});

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.listen(3002, () => console.log('Post Service running on port 3002'));
