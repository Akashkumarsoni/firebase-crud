import React, { useState } from "react";
import { auth, googleSignedIn } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   console.log("userDetails : ", auth.currentUser);
  const submitCredentials = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((e)=>{
      console.log("response email: ",e)
    });
  };
  const signedInWithGoogle = async () => {
    await signInWithPopup(auth, googleSignedIn).then((e) => {
      console.log("response google : ", e);
    });
  };
  const logoutHandler = async () => {
    await signOut(auth).then((e) => {
      console.log("response Logout : ", e);
    });
  };
  return (
    <div>
      <input
        placeholder="Enter email"
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitCredentials}>Submit</button>
      <button onClick={signedInWithGoogle}>Signin with Google</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default AuthComponent;
