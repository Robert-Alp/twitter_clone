const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = redis.createClient();
client.connect().catch(console.error);

app.get('/cache/posts', async (req, res) => {
    try {
        const cachedPosts = await client.get('posts');
        if (cachedPosts) {
            return res.status(200).send(JSON.parse(cachedPosts));
        }
        res.status(404).send({ error: 'No posts in cache' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/cache/posts', async (req, res) => {
    const { posts } = req.body;
    if (!posts) return res.status(400).send({ error: 'Posts data is required' });

    try {
        await client.set('posts', JSON.stringify(posts));
        res.status(200).send({ message: 'Cache updated' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3003, () => console.log('Cache Service running on port 3003'));
