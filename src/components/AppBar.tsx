import Link from "next/link";
import styles from "../styles/AppBar.module.css";
import { useAppContext } from "../../context/state";

const AppBar = () => {
  const { currentUser, logout, router } = useAppContext();
  return (
    <header className={styles.appBar}>
      <Link href="/">
        <h1>type game</h1>
      </Link>

      <nav>
        <Link href="/about">About</Link>
        <Link href="/scores">High Scores</Link>
        {currentUser ? (
          <button onClick={logout}>Logout</button>
        ) : router.pathname !== "/auth" ? (
          <Link href="/auth">Login / Sign Up</Link>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default AppBar;
