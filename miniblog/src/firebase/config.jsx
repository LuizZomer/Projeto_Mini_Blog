import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3_9L1NOSCSbIxp6rUKkEDtJBHydY1fwI",
  authDomain: "miniblog-dd4eb.firebaseapp.com",
  projectId: "miniblog-dd4eb",
  storageBucket: "miniblog-dd4eb.appspot.com",
  messagingSenderId: "404052870021",
  appId: "1:404052870021:web:2db928f03b310a0ac7faec"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };