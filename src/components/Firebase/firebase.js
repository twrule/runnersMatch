import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCtW9QjCw9MIU8k5NCqoUJ5kVg7VZ2Cgt0",
  authDomain: "runnersmatch-9a0d7.firebaseapp.com",
  databaseURL: "https://runnersmatch-9a0d7.firebaseio.com/",
  projectId: "runnersmatch-9a0d7",
  storageBucket: "runnersmatch-9a0d7.appspot.com",
  messagingSenderId: "725014418475",
  appId: "1:725014418475:web:99c2183fcb84d4b55f866e",
  measurementId: "G-4MH41MX56H"
};

  class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    //Authentication api
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPassWordReset = email => this.auth.sendPasswordResetEmail();

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
  
    //Database api
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');


  }

  export default Firebase;