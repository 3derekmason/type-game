import Head from "next/head";
import styles from "@/styles/HighScore.module.css";
import { useAppContext } from "../../context/state";
import Score from "@/interface/Score";

import AppBar from "@/components/AppBar";
import { useEffect, useState } from "react";

export default function HighScore() {
  const { currentUser } = useAppContext();
  const [publicScores, setPublicScores] = useState<any>();
  const getPublicScores = async () => {
    const endpoint = "/api/scores";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      setPublicScores(result.sort((a: any, b: any) => a.time - b.time));
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPublicScores();
  }, []);

  return (
    <>
      <Head>
        <title>High Scores | type game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <main className={styles.highScorePage}>
        <table className={styles.scoreTable}>
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Time</th>
              <th>Count / Min</th>
            </tr>
          </thead>
          <tbody className={styles.scoreTableBody}>
            {publicScores?.map((score: Score, i: number) => {
              return (
                <tr key={i}>
                  <td>{score.title}</td>
                  <td
                    className={
                      score.username === currentUser?.username
                        ? styles.currentUserScore
                        : styles.scoreUser
                    }
                  >
                    {score.username}
                  </td>
                  <td>{score.time}s</td>
                  <td
                    className={
                      score.count === score.title.length ? styles.perfect : ""
                    }
                  >
                    {score.count} / {score.title.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
