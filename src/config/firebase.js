import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1xgw24NbDXwX1nM8BrVeMkSTKi4Kj42Q",
  authDomain: "websitecrud.firebaseapp.com",
  projectId: "websitecrud",
  storageBucket: "websitecrud.appspot.com",
  messagingSenderId: "1035257579263",
  appId: "1:1035257579263:web:1b793b1aebbf63c02b6eca",
  measurementId: "G-28FWY79YK3"
  };
  // Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();