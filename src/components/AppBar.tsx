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
        {router.pathname !== "/about" ? <Link href="/about">About</Link> : ""}
        {router.pathname !== "/scores" ? (
          <Link href="/scores">High Scores</Link>
        ) : (
          ""
        )}

        {currentUser ? (
          <>
            <Link href="/user">
              {currentUser.username[0].toUpperCase() +
                currentUser.username.slice(1)}
            </Link>
            <button onClick={logout}>Logout</button>
          </>
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
