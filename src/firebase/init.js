import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCzp9DFvHwVgXVgfI_PwnCHT3ht2dPVk7E",
  authDomain: "ninja-smoothies-4a47b.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-4a47b.firebaseio.com",
  projectId: "ninja-smoothies-4a47b",
  storageBucket: "ninja-smoothies-4a47b.appspot.com",
  messagingSenderId: "710598538750"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true})
export default firebaseApp.firestore()
