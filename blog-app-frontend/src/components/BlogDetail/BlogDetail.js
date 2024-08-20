
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./app.css"

const BlogDetail = () => {
    const { id } = useParams();  // Extracting the post ID from the URL
    const [post, setPost] = useState(null);  // State to hold the post data
    const [loading, setLoading] = useState(true);  // State for loading status
    const [error, setError] = useState(null);  // State for error handling

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load the post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);  // Dependency array ensures this effect runs when 'id' changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        
        <div className="blog-details">
            {post ? (
                <>
                    
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p><strong>Published on:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
};

export default BlogDetail;
