import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";

const MyComponent = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得
            const response = await axios.get('http://localhost:3030/messages/read', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { messages } = response.data;
            setMessages(messages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>タイトル</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td>読み込み中...</td>
                            </tr>
                        ) : (
                            messages.map(message => (
                                <tr key={message.id}>
                                    <td>{message.text}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyComponent;
