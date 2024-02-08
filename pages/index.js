import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import styles from '../styles/Home.module.css';

const IndexPage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async () => {
        try {
            const response = await axios.get('http://localhost:3030/');
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
            <h1 className={styles.text01}>
                {message}
            </h1>
            </main>
        </div>
    );
};

export default IndexPage;
