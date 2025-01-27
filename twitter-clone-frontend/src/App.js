import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
    const [pseudo, setPseudo] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3002/posts');
        setPosts(response.data);
    };

    const handlePost = async () => {
        await axios.post('http://localhost:3002/post', { pseudo, message });
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Twitter Clone</h1>
            <input
                type="text"
                placeholder="Enter Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
            />
            <textarea
                placeholder="Write a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={handlePost}>Post</button>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <p><b>{post.pseudo}</b>: {post.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
