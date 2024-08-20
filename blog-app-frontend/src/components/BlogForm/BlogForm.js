
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./app.css"


const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/posts', { title, content })
            .then(() => navigate('/'))
            .catch(error => console.error('There was an error creating the post!', error));
    };

    return (
        <div className="blog-form">
            <h2>Add New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Content:</label>
                <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button>Add Blog</button>
            </form>
        </div>    );
};

export default BlogForm;
