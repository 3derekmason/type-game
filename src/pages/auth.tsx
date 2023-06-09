import Head from "next/head";
import styles from "@/styles/AuthPage.module.css";
import { useAppContext } from "../../context/state";
import { useState } from "react";

import AppBar from "../components/AppBar";

const AuthPage = () => {
  const { setCurrentUser, router } = useAppContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    if (password.length < 6) {
      alert("Password must be 6 or more characters.");
      return;
    }
    const userData = {
      username,
      password,
      isPublic,
    };
    const JSONData = JSON.stringify(userData);
    const endpoint = signup ? "/api/user" : "/api/auth";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    };
    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      setCurrentUser(result);
      router.push("/");
    } catch (err: any) {
      setError(err);
    }
  };
  return (
    <>
      <Head>
        <title>User Login | type game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <main className={styles.authPage}>
        <span className={styles.authToggle}>
          <p>Sign Up</p>
          <div className={styles.btnHolster}>
            <button
              onClick={() => {
                setSignup(!signup);
                setError("");
              }}
              className={
                signup ? styles.toggleBtnSignup : styles.toggleBtnLogin
              }
            ></button>
          </div>
          <p>Log In</p>
        </span>
        {signup ? (
          <form>
            <h2>Sign Up</h2>
            <h4>Sign up to track high scores and join the community!</h4>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              minLength={6}
              placeholder="Choose Password (6+)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={password.length >= 6 ? styles.validP : styles.invalidP}
            />
            <span className={styles.checkbox}>
              <label htmlFor="togglePublicPosts">
                Make your high scores public?
              </label>
              <input
                type="checkbox"
                id="togglePublicPosts"
                onChange={() => {
                  setIsPublic(!isPublic);
                }}
              />
            </span>
            <button className={styles.submitBtn} onClick={onSubmit}>
              Sign Up
            </button>
          </form>
        ) : (
          <form>
            <h2>Log In</h2>
            <h4>Welcome back!</h4>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className={styles.submitBtn} onClick={onSubmit}>
              Log In
            </button>
          </form>
        )}
        <p className={styles.error}>{error}</p>
      </main>
    </>
  );
};

export default AuthPage;
