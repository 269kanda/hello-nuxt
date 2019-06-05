import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxx"
  })
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true }
db.settings(settings);
firebase.db = db;

export default firebase 