import Head from "next/head";
import styles from "@/styles/About.module.css";

import AppBar from "@/components/AppBar";

export default function About() {
  return (
    <>
      <Head>
        <title>About | type game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <main className={styles.aboutPage}>hello world</main>
    </>
  );
}
