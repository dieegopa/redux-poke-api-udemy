import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}
