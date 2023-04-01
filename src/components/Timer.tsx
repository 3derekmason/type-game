import React, { useState, useEffect } from "react";

function Timer(): JSX.Element {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>{seconds}</h1>
    </div>
  );
}

export default Timer;
