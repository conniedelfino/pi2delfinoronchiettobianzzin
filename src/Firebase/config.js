import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCW7neq8Wu2Y5cgNrb3Pt_3jP0ncjLKN4c",
  authDomain: "rnconstanza-d6d91.firebaseapp.com",
  projectId: "rnconstanza-d6d91",
  storageBucket: "rnconstanza-d6d91.firebasestorage.app",
  messagingSenderId: "939636258459",
  appId: "1:939636258459:web:b2a85f319ce9990eb7f83e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
