import Link from "next/link";
import styles from "../styles/AppBar.module.css";

const AppBar = () => {
  return (
    <header className={styles.appBar}>
      <Link href="/">
        <h1>type game</h1>
      </Link>

      <nav>
        <p>About</p>
        <Link href="/auth">User</Link>
        <p>High Scores</p>
      </nav>
    </header>
  );
};

export default AppBar;
