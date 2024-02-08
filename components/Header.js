// components/Header.js
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter()
    const currentPath = router.pathname;

    return (
        <header className={styles.header}>
            <h1 className={styles.text01}>
                <Link legacyBehavior href="/">
                    <a>Home</a>
                </Link>
            </h1>
            {currentPath!== '/users/login' && currentPath!== '/users/signup' &&  currentPath!== '/messages' && (
            <h1 className={styles.text02}>
                <Link legacyBehavior href="/users/login">
                    <a>Login</a>
                </Link>
            </h1>
            )}
        </header>
    );
};

export default Header;