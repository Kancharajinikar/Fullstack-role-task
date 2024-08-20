
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./app.css"

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                setError('Failed to load posts');
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));  // Update the state to remove the deleted post
        } catch (error) {
            console.error('Failed to delete the post', error);
            setError('Failed to delete the post');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="blog-list">
            <h1>Blog Posts</h1>
            {posts.length > 0 ? <div className="blog-list">
            {posts.map(post => (
                <div className="blog-preview" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content.substring(0, 100)}...</p>
                    <div className="blog-actions">
                        <Link to={`/posts/${post.id}`} className="btn">Read More</Link>
                        <button className="btn delete-btn" onClick={() => onDelete(post.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>: (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default BlogList;
