import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header.js";
import styles from "@/styles/Login.module.css"
import Link from "next/link";


const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3030/users/login", { name: username, pass: password });
            console.log(response.data); // ログイン成功時の処理
            // ログイン成功時の処理として、リダイレクトや画面遷移を行う
            if (response.data.message === "ログインに成功しました！") {
                router.push("/messages"); // ログイン成功時に/messagesにリダイレクト
            }
        } catch (error) {
            console.error(error.response.data); // ログイン失敗時の処理
           setErrorMessage("ログインに失敗しました。ユーザ名とパスワードを確認してください。");
        }
    };

    return (
        <div>
            <Header />
            <main className={styles["form-container"]}>
                <h2>User/Login</h2>
                {errorMessage && <div className={styles["error-message"]}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ユーザ名</label>
                        <input type="text" placeholder="ユーザー名を入力してください" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label>パスワード</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">ログイン</button>

                    <div className={styles["links-container"]}>
                        <a className={styles["link-text01"]}>アカウントをお持ちでないですか？</a>
                        <Link legacyBehavior href="/users/signup">
                            <p className={styles["link-text02"]}>登録する</p>
                        </Link>
                    </div>

                </form>
            </main>
        </div>
    );
};

export default Login;