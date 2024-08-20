
import React from 'react';
import { Link } from 'react-router-dom';
import "./app.css"

const Header = () => {
    return (
        <header class="header">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/new-post">Create New Post</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
