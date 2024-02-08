import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";
import Header from "@/components/Header";
import styles from "@/styles/Signup.module.css"

const Signup = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: '', pass: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/users/signup', formData);
            if (response.status === 201) {
                setMessage('ユーザが作成されました！');
                setFormData({ name: '', pass: '' });
                await router.push('/users/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <Header />
            <main className={styles['signup-container']}>
                <h1>Users/Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">名前:</label>
                        <input type="text" placeholder="ユーザー名を入力してください" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="pass">パスワード:</label>
                        <input type="password" id="pass" name="pass" value={formData.pass} onChange={handleChange} />
                    </div>
                    <button type="submit">登録</button>
                </form>
                {message && <div className={styles.message}>{message}</div>}
                <Link href="/users/login" className={styles['return-link']}>{'<< ログインページ へ戻る'}</Link>
            </main>
        </div>
    );
};

export default Signup;