import React, { useState, useEffect, FC } from "react";
import styles from "../styles/Loading.module.css";
interface LoadingProps {
  message: string;
}

const Loading: FC<LoadingProps> = ({ message }): JSX.Element => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <h1>{message}...</h1>
    </div>
  );
};

export default Loading;
