import { CircularProgress } from "@mui/material";
import { getRedirectResult } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./App.module.css"
import { auth } from "./firebase/init";
import Login from "./login/login";

function App() {

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  if (auth.currentUser == null) {
    getRedirectResult(auth).then(() => {
      if (auth.currentUser == null) {
        throw Error;
      }
      navigate("/main")
    }).catch(() =>{
      setLoading(false)
    })
  }

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        {
      loading ? 
      <CircularProgress color="secondary" />
      :
      <Login />
        }

      </header>
    </div>
  );
}

export default App;
