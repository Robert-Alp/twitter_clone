const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'ta_CLÉ_secrète';

const pseudonyms = new Set();

app.post('/auth/choose-pseudo', (req, res) => {
    const { pseudo } = req.body;
    if (!pseudo) return res.status(400).send({ error: 'Pseudo is required' });

    if (pseudonyms.has(pseudo)) {
        return res.status(400).send({ error: 'Pseudo already taken' });
    }

    pseudonyms.add(pseudo);
    const token = jwt.sign({ pseudo }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
});

app.get('/auth/validate-session', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).send(decoded);
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
});

app.listen(3001, () => console.log('Auth Service running on port 3001'));
