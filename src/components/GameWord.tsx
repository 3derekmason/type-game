import { useEffect, useState } from "react";
import styles from "../styles/GameWord.module.css";

import Timer from "./Timer";

export default function GameWord() {
  const [inputWord, setInputWord] = useState<string>("");
  const [match, setMatch] = useState<boolean>(false);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  const target: string = "type game";

  const handleInput = async (e: any) => {
    setTypeCount(typeCount + 1);
    setInputWord(e.target.value);
  };

  useEffect(() => {
    if (inputWord === target) {
      setMatch(true);
      setComplete(true);
    } else {
      setMatch(false);
    }
  }, [inputWord]);

  return (
    <div>
      {startTimer ? <Timer complete={complete} /> : 0}

      <p className={match ? styles.match : styles.noMatch}>{target}</p>
      <input
        type="text"
        value={inputWord}
        onChange={handleInput}
        onFocus={() => {
          setStartTimer(true);
        }}
      />
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
