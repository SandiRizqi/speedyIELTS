// Import the functions you need from the SDKs you need
'use client'
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};


;

if (!getApps().length) {
  initializeApp(firebaseConfig);
}




export const FirebaseAuth = getAuth();

export const Authenticaion = () => {
  return FirebaseAuth;
}

export const SignUp = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const SignInWithPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    return [user, null];
  } catch (error) {
    return [null, error]
  }
}

export const SignInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(FirebaseAuth, googleProvider);
    return user;
  } catch (error) {
    console.log(error);
  }
}


export const SignOut = async () => {
    try {
        await signOut(FirebaseAuth);
    } catch (error) {
        console.log(error);
    }
}


export const FirestoreDB = () => {
  const db = getFirestore();
  return db;
}

export const FirebaseRealtimeDatabase = () => {
  const database = getDatabase();
  return database;
}
export const FirebaseFunction = () => {
  return getFunctions();
}

export const FirebaseStorge = () => {
  const storage = getStorage();
  return storage;
}