
// Import the functions you need from the SDKs you need
import app from "firebase/app";
import"firebase/firestore";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABkwLmlw24nGQ9PMSrmWhhXVW6Tq_JKpE",
  authDomain: "autl-3e64c.firebaseapp.com",
  projectId: "autl-3e64c",
  storageBucket: "autl-3e64c.appspot.com",
  messagingSenderId: "470702622195",
  appId: "1:470702622195:web:8079bce9532a0576897e86"
};

// Initialize Firebase
 app.initializeApp(firebaseConfig);

 const db= app.firestore()
 const auth= app.auth()
 export {db,auth}

  