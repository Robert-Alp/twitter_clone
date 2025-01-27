const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'twitter_clone',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/db/posts', (req, res) => {
    const { pseudo, message, timestamp } = req.body;
    const query = 'INSERT INTO posts (pseudo, message, timestamp) VALUES (?, ?, ?)';
    db.query(query, [pseudo, message, timestamp], (err, results) => {
        if (err) return res.status(500).send({ error: err.message });
        res.status(200).send({ id: results.insertId, pseudo, message, timestamp });
    });
});

app.get('/db/posts', (req, res) => {
    const query = 'SELECT * FROM posts';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send({ error: err.message });
        res.status(200).send(results);
    });
});

app.listen(3004, () => console.log('Database Service running on port 3004'));
