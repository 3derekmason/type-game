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

  const wordArray: string[] = targetWord.split("");

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
      <Timer start={startTimer} complete={complete} />
      <div className={styles.wordHolder}>
        {wordArray.map((char: string, i) => (
          <h1
            key={i}
            className={
              inputWord[i] === wordArray[i]
                ? styles.match
                : !inputWord[i]
                ? styles.noMatch
                : styles.wrongMatch
            }
          >
            {char}
          </h1>
        ))}
      </div>
      <input
        type="text"
        value={inputWord}
        onChange={handleInput}
        onFocus={() => {
          setStartTimer(true);
        }}
        className={match ? styles.inputMatch : ""}
      />
      {match ? (
        <p>
          You did it! in{" "}
          {typeCount === wordArray.length
            ? `a perfect ${typeCount} keystrokes!`
            : `${typeCount} keystrokes.`}
        </p>
      ) : (
        <br />
      )}
      <span className={styles.gameTools}>
        <button onClick={resetGame}>NEW WORD</button>
        <button onClick={resetGame}>RESET WORD</button>
      </span>
    </div>
  );
};
export default GameWord;
