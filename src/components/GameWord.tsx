import { useEffect, useState } from "react";
import styles from "../styles/GameWord.module.css";

export default function GameWord() {
  const [inputWord, setInputWord] = useState("");
  const target: string = "type game";
  const [match, setMatch] = useState(false);

  const handleInput = async (e: any) => {
    setInputWord(e.target.value);
  };

  useEffect(() => {
    if (inputWord === target) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [inputWord]);
  return (
    <div>
      <p className={match ? styles.match : styles.noMatch}>{target}</p>
      <input type="text" value={inputWord} onChange={handleInput} />
    </div>
  );
}
