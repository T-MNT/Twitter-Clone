import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: 'AIzaSyDO50MRBOash8ZuUUBjRPqdIZWyJpDAbfs',
  authDomain: 'twitter-clone-43761.firebaseapp.com',
  databaseURL:
    'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'twitter-clone-43761',
  storageBucket: 'twitter-clone-43761.appspot.com',
  messagingSenderId: '1042121973952',
  appId: '1:1042121973952:web:c78304162f0907871fcd25',
});

export const auth = app.auth();
export default app;
