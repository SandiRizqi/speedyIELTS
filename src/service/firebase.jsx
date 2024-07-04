// Import the functions you need from the SDKs you need
'use client'
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId
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


export const FirebaseFunction = () => {
  return getFunctions();
}

export const FirebaseStorge = () => {
  const storage = getStorage();
  return storage;
}