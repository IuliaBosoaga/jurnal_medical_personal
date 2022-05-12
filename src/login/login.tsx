import React from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/init";

import { useNavigate } from "react-router";
import { Button } from "@mui/material";


interface ISignInFormProps {
  
}

export default function login(props: ISignInFormProps) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const signedIn = () => {
    navigate("/main")
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        signedIn();
      })
      .catch((error) => {
        // show error
      });
  };

  return (
    <Button variant="outlined" onClick={signInWithGoogle}>Login with Google</Button>

  );
}
