import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCXFKlPoY3RALYkVUvCtVHM_nHWBxyVNLo",
  authDomain: "instagram-clone-acbeb.firebaseapp.com",
  projectId: "instagram-clone-acbeb",
  storageBucket: "instagram-clone-acbeb.appspot.com",
  messagingSenderId: "601522876650",
  appId: "1:601522876650:web:c9afc32ce48143d5b0a793",
  measurementId: "G-Y2RCSJF4XW"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
export {db, auth, storage, firebaseapp}