/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import styles from "./main.module.css";
import { useNavigate } from "react-router";

export default function main() {
  const navigate = useNavigate();

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file === null) return;
    const formData = new FormData();

    formData.append("file", file);

    axios
      .post("http://localhost:8080/upload/", formData, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        navigate("/upload", {
          state: {
            data: response.data,
          },
        });

        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <Fab
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          color="primary"
          aria-label="add"
          component="label"
        >
          <input type="file" onChange={uploadFile} hidden />
          <AddIcon />
        </Fab>
      </header>
    </div>
  );
}
