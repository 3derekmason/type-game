import React, { useState, useEffect, FC } from "react";
import styles from "../styles/Timer.module.css";
interface TimerProps {
  start: boolean;
  complete: boolean;
}

const Timer: FC<TimerProps> = ({ start, complete }): JSX.Element => {
  const [time, setTime] = useState<number>(0);

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
  }, [complete, start]);

  return (
    <div className={styles.timer}>
      <h1>{time.toFixed(2)}</h1>
    </div>
  );
};

export default Timer;
