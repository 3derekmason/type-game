import Link from "next/link";
import styles from "../styles/AppBar.module.css";
import { useAppContext } from "../../context/state";

const AppBar = () => {
  const { currentUser, logout } = useAppContext();
  return (
    <header className={styles.appBar}>
      <Link href="/">
        <h1>type game</h1>
      </Link>

      <nav>
        <p>About</p>
        <p>High Scores</p>
        {currentUser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href="/auth">Login / Sign Up</Link>
        )}
      </nav>
    </header>
  );
};

export default AppBar;
