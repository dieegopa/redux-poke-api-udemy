import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf1wbR5e3c4n6w5n7gfG2pfsdmkg3pNfo",
    authDomain: "redux-react-udemy-dc713.firebaseapp.com",
    projectId: "redux-react-udemy-dc713",
    storageBucket: "redux-react-udemy-dc713.appspot.com",
    messagingSenderId: "348143266827",
    appId: "1:348143266827:web:4936ae53faca7a8020ab0e"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}