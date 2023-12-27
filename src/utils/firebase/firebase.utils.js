import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA2C_Edm4_NoEkhJof4ZNnIs-TLZPwEfXw",
  authDomain: "crwn-clothing-db-b544a.firebaseapp.com",
  projectId: "crwn-clothing-db-b544a",
  storageBucket: "crwn-clothing-db-b544a.appspot.com",
  messagingSenderId: "568591421397",
  appId: "1:568591421397:web:d1e5403662bd371922775c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserdocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  // check if user date exists
  // if yes, return user document reference
  // if no, create/set document with data from userAuth in my collection
  if(!userSnapShot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}