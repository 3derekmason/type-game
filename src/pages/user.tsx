import Head from "next/head";
// import styles from "@/styles/Home.module.css";
import { useAppContext } from "../../context/state";

import AppBar from "@/components/AppBar";
import { useEffect, useState } from "react";

export default function User() {
  const { currentUser } = useAppContext();

  const getUserScores = () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>{currentUser?.username} | type game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppBar />
      </main>
    </>
  );
}
