import React, { useState, useEffect, FC } from "react";
import styles from "../styles/Timer.module.css";
interface TimerProps {
  start: boolean;
  complete: boolean;
  time: number;
  setTime: any;
}

const Timer: FC<TimerProps> = ({
  start,
  complete,
  time,
  setTime,
}): JSX.Element => {
  useEffect(() => {
    if (!start) {
      setTime(0);
    }
    const intervalId: NodeJS.Timeout = setInterval(() => {
      if (!complete && start) {
        setTime((prevTime: number) => prevTime + 0.01);
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [complete, setTime, start]);

  return (
    <div className={styles.timer}>
      <h1>{time.toFixed(2)}</h1>
    </div>
  );
};

export default Timer;
