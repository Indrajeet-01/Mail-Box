// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDPvpg3zn3RcltEDvk2Ms7Ma50zQ4ak9Is",
  authDomain: "mail-box-1415b.firebaseapp.com",
  projectId: "mail-box-1415b",
  storageBucket: "mail-box-1415b.appspot.com",
  messagingSenderId: "867838638573",
  appId: "1:867838638573:web:0be51191968cde75de8fe4",
  measurementId: "G-283TGDWP5C"
};

  const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app)

   export {auth, db}
