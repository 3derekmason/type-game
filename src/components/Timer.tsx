import React, { useState, useEffect, FC } from "react";

interface TimerProps {
  complete: boolean;
}

const Timer: FC<TimerProps> = ({ complete }): JSX.Element => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      if (!complete) {
        setTime((prevTime: number) => prevTime + 0.01);
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [complete]);

  return (
    <div>
      <h1>{time.toFixed(2)}</h1>
    </div>
  );
};

export default Timer;
