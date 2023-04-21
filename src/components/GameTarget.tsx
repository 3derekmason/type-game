import { FC, useEffect, useState, useCallback } from "react";
import Image from "next/image";

import styles from "../styles/GameTarget.module.css";
import { useAppContext } from "../../context/state";
import Score from "@/interface/Score";

import Timer from "./Timer";

interface GameTargetProps {
  target: string;
  getRandomTarget: any;
}

const GameWord: FC<GameTargetProps> = ({
  target,
  getRandomTarget,
}): JSX.Element => {
  const { currentUser } = useAppContext();
  const [inputTarget, setInputTarget] = useState<string>("");
  const [targetScores, setTargetScores] = useState<any>([]);
  const [match, setMatch] = useState<boolean>(false);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);

  const targetArray: string[] = target.split("");

  const handleInput = async (e: any) => {
    setTypeCount(typeCount + 1);
    setInputTarget(e.target.value);
  };

  const postTime = useCallback(async () => {
    const completionData = {
      time: Number(time.toFixed(2)),
      title: target,
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
    target,
    time,
    typeCount,
  ]);

  const getScoresForTarget = useCallback(() => {
    try {
      fetch(`/api/score/target/${target}`)
        .then((res) => res.json())
        .then((data) => setTargetScores(data));
    } catch (err) {
      console.error(err);
    }
  }, [target]);

  const resetGame = () => {
    setTypeCount(0);
    setStartTimer(false);
    setMatch(false);
    setComplete(false);
    setPosted(false);
    setInputTarget("");
  };

  useEffect(() => {
    if (inputTarget === target) {
      setMatch(true);
      setComplete(true);
      if (!posted) {
        postTime();
        setPosted(true);
      }
    } else {
      setMatch(false);
    }
  }, [inputTarget, postTime, posted, target]);

  useEffect(() => {
    getScoresForTarget();
  }, [getScoresForTarget]);

  return (
    <div className={styles.game}>
      <Timer
        start={startTimer}
        complete={complete}
        time={time}
        setTime={setTime}
      />
      <div className={styles.wordHolder}>
        {targetArray.map((char: string, i) => (
          <h1
            key={i}
            className={
              inputTarget[i] === targetArray[i]
                ? styles.match
                : !inputTarget[i]
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
        value={inputTarget}
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
          {typeCount === targetArray.length
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
            getRandomTarget();
          }}
        >
          <Image src="/shuffle.svg" width={30} height={30} alt="shuffle" />
        </button>
        <button onClick={resetGame}>
          <Image src="/refresh.svg" width={30} height={30} alt="reset" />
        </button>
      </span>
      <div className={styles.scoresForTarget}>
        {targetScores.map((score: Score, i: number) => (
          <span className={styles.highScore} key={i}>
            <p>{i + 1}</p>
            <p>{score.username}</p>
            <p>{score.time} seconds</p>
          </span>
        ))}
      </div>
    </div>
  );
};
export default GameWord;
