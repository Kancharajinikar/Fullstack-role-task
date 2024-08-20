require('dotenv').config();  // Load environment variables

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();  // Import sqlite3

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Failed to connect to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create the "posts" table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating posts table:', err.message);
            }
        });
    }
});

// Routes

// Get all posts
app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY createdAt DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching posts', error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching the post', error: err.message });
        } else if (!row) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(row);
        }
    });
});

// Create a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.run(sql, [title, content], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error creating post', error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, title, content, createdAt: new Date().toISOString() });
        }
    });
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.run(sql, [title, content, id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error updating the post', error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json({ message: 'Post updated successfully' });
        }
    });
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.run(sql, id, function (err) {
        if (err) {
            res.status(500).json({ message: 'Error deleting the post', error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

