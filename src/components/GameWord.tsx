import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";

import styles from "../styles/GameWord.module.css";
import { useAppContext } from "../../context/state";

import Timer from "./Timer";

interface GameWordProps {
  targetWord: string;
  getRandomWord: any;
}

const GameWord: FC<GameWordProps> = ({
  targetWord,
  getRandomWord,
}): JSX.Element => {
  const { currentUser } = useAppContext();
  const [inputWord, setInputWord] = useState<string>("");
  const [match, setMatch] = useState<boolean>(false);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);

  const wordArray: string[] = targetWord.split("");

  const handleInput = async (e: any) => {
    setTypeCount(typeCount + 1);
    setInputWord(e.target.value);
  };

  const postTime = useCallback(async () => {
    const completionData = {
      time: Number(time.toFixed(2)),
      title: targetWord,
      count: typeCount,
      userId: currentUser?._id || 0,
      username: currentUser?.username || "anon",
      public: currentUser?.public,
    };
    const JSONData = JSON.stringify(completionData);
    const endpoint = "/api/scores";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
  }, [
    currentUser?._id,
    currentUser?.public,
    currentUser?.username,
    targetWord,
    time,
    typeCount,
  ]);

  const resetGame = () => {
    setTypeCount(0);
    setStartTimer(false);
    setMatch(false);
    setComplete(false);
    setPosted(false);
    setInputWord("");
  };

  useEffect(() => {
    if (inputWord === targetWord) {
      setMatch(true);
      setComplete(true);
      if (!posted) {
        postTime();
        setPosted(true);
      }
    } else {
      setMatch(false);
    }
  }, [inputWord, postTime, posted, targetWord]);

  return (
    <div className={styles.game}>
      <Timer
        start={startTimer}
        complete={complete}
        time={time}
        setTime={setTime}
      />
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
        disabled={posted}
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
        <button
          onClick={() => {
            resetGame();
            getRandomWord();
          }}
        >
          <Image src="/shuffle.svg" width={30} height={30} alt="shuffle" />
        </button>
        <button onClick={resetGame}>
          <Image src="/refresh.svg" width={30} height={30} alt="reset" />
        </button>
      </span>
    </div>
  );
};
export default GameWord;
