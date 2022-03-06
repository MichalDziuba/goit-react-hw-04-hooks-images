import React from "react";
import { Triangle } from "react-loader-spinner";
import styles from './Loader.module.css'
const Loader = () => (
  <div className={styles.Loader}>
    <Triangle color="#00BFFF" height={280} width={280}  />
  </div>
);
export default Loader
