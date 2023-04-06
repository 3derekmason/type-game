import { FC, useEffect, useState } from "react";
import styles from "../styles/GameWord.module.css";

import Timer from "./Timer";

interface GameWordProps {
  targetWord: string;
}

const GameWord: FC<GameWordProps> = ({ targetWord }): JSX.Element => {
  const [inputWord, setInputWord] = useState<string>("");
  const [match, setMatch] = useState<boolean>(false);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  const handleInput = async (e: any) => {
    setTypeCount(typeCount + 1);
    setInputWord(e.target.value);
  };

  const resetGame = () => {
    setTypeCount(0);
    setStartTimer(false);
    setMatch(false);
    setComplete(false);
    setInputWord("");
  };

  useEffect(() => {
    if (inputWord === targetWord) {
      setMatch(true);
      setComplete(true);
    } else {
      setMatch(false);
    }
  }, [inputWord, targetWord]);

  return (
    <div className={styles.game}>
      <button onClick={resetGame}>RESET</button>
      <Timer start={startTimer} complete={complete} />
      <h1 className={match ? styles.match : styles.noMatch}>{targetWord}</h1>
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
          {typeCount === targetWord.split("").length
            ? `a perfect ${typeCount} keystrokes!`
            : `${typeCount} keystrokes.`}
        </p>
      ) : (
        <br />
      )}
    </div>
  );
};
export default GameWord;
