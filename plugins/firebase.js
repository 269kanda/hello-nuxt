import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDLRgUgAd7iLS5EVlgd2rRnnbyWkqggGqU",
    authDomain: "hello-nuxt-cab92.firebaseapp.com",
    databaseURL: "https://hello-nuxt-cab92.firebaseio.com",
    projectId: "hello-nuxt-cab92",
    storageBucket: "hello-nuxt-cab92.appspot.com",
    messagingSenderId: "444211192589",
    appId: "1:444211192589:web:6002641fef5d6216"
  })
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true }
db.settings(settings);
firebase.db = db;

export default firebase 