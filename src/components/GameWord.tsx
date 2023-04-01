import { useEffect, useState } from "react";
import styles from "../styles/GameWord.module.css";

import Timer from "./Timer";

export default function GameWord() {
  const [inputWord, setInputWord] = useState("");
  const target: string = "type game";
  const [match, setMatch] = useState(false);
  const [typeCount, setTypeCount] = useState(0);

  const handleInput = async (e: any) => {
    setTypeCount(typeCount + 1);
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
      <Timer />
      <p className={match ? styles.match : styles.noMatch}>{target}</p>
      <input type="text" value={inputWord} onChange={handleInput} />
      {match ? (
        <p>
          You did it! in{" "}
          {typeCount === target.split("").length
            ? `a perfect ${typeCount} keystrokes!`
            : `${typeCount} keystrokes.`}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
