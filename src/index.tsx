import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import initFirebase from "./firebase/init";
import Upload from "./main/upload";
initFirebase();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<App />} />
        <Route path="/main" element={<Main />} />
        <Route path="/upload" element={<Upload/>} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
