import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3PvOSO7SagDTylecniD_LOY1aZGlI33w",
  authDomain: "financialportfoliomanage-80efb.firebaseapp.com",
  databaseURL: "https://financialportfoliomanage-80efb.firebaseio.com",
  projectId: "financialportfoliomanage-80efb",
  storageBucket: "financialportfoliomanage-80efb.appspot.com",
  messagingSenderId: "1044965839693",
  appId: "1:1044965839693:web:267067f18d0d11a93a5d04",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
