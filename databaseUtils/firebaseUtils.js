import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseInitialize";


const firebaseSignup = createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("just signup user",user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error in firebase creating user",errorMessage)
    // ..
  });

export {firebaseSignup}