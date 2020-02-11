import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSKQEUIQSBpCpAXc4O78Dhco3GdMAgt7o",
    authDomain: "todo-sayain.firebaseapp.com",
    databaseURL: "https://todo-sayain.firebaseio.com",
    projectId: "todo-sayain",
    storageBucket: "todo-sayain.appspot.com",
    messagingSenderId: "504813592835",
    appId: "1:504813592835:web:1c5014734730b15897c936"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
export default db;