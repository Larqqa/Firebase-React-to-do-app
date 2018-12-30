import firebase from "firebase/app";

const DB_CONFIG = {
  apiKey: "Your Key",
  authDomain: "Your Key",
  databaseURL: "Your Key",
  projectId: "Your Key",
  storageBucket: "Your Key",
  messagingSenderId: "Your Key"
};

// Check if Firebase app is initialized, else initialize with db_config
export default !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();