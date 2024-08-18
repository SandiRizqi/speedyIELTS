const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

const { question } = require("./speaking/speaking_18_4")

// Your Firebase configuration object
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpEG3UKag8YVwKjvrql1RsKXytEQ_jqo4",
    authDomain: "ielts-ai-b1478.firebaseapp.com",
    databaseURL: "https://ielts-ai-b1478-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ielts-ai-b1478",
    storageBucket: "ielts-ai-b1478.appspot.com",
    messagingSenderId: "585188926994",
    appId: "1:585188926994:web:22fce2fb5f7e46ee99dacb",
    measurementId: "G-LH95ET351W"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function uploadDocumentWithID(collectionName, documentID, documentData) {
    try {
      await setDoc(doc(db, collectionName, documentID), documentData, {merge: true});
      console.log("Document written with ID: ", documentID);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

// Example usage


    //uploadDocument("reading-questions", {question: question});
uploadDocumentWithID("speaking-questions", "speaking_18_4", {question: question} )