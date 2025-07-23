import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjSUZW_VZrkIANvllwH40iiiFTrk37kNU',
  authDomain: 'budget-buddy-93bb8.firebaseapp.com',
  projectId: 'budget-buddy-93bb8',
  storageBucket: 'budget-buddy-93bb8.firebasestorage.app',
  messagingSenderId: '243089689760',
  appId: '1:243089689760:web:bbb976aedda1103589cdc5',
  measurementId: 'G-FCEL04Z3PR',
};

initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
