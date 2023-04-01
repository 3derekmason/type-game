import React, { useState, useEffect, FC } from "react";

interface TimerProps {
  complete: boolean;
}

const Timer: FC<TimerProps> = ({ complete }): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      if (!complete) {
        setSeconds((prevSeconds: number) => prevSeconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [complete]);

  return (
    <div>
      <h1>{seconds}</h1>
    </div>
  );
};

export default Timer;
