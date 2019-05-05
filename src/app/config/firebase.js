import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD7y8q1cnB5YNC42UwCkONODI-a6ZofV4s",
  authDomain: "revents-238416.firebaseapp.com",
  databaseURL: "https://revents-238416.firebaseio.com",
  projectId: "revents-238416",
  storageBucket: "revents-238416.appspot.com",
  messagingSenderId: "491728497053",
  appId: "1:491728497053:web:8272e1da54f8d421"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase