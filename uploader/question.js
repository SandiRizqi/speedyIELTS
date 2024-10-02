const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc, getDocs, collection } = require('firebase/firestore');

// const { question } = require("./speaking/speaking_18_4")

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


async function getAllUserEmails() {
  const emails = [];
  try {
    // Replace "users" with your actual collection name where emails are stored
    const querySnapshot = await getDocs(collection(db, "users-data"));
    querySnapshot.forEach((doc) => {
      // Assuming each document has an "email" field
      const userData = doc.data();
      if (userData.email) {
        emails.push(userData.email);
      }
    });
    console.log("Fetched emails: ", emails);
  } catch (error) {
    console.error("Error fetching user emails: ", error);
  }
  return emails;
}



async function uploadDocumentWithID(collectionName, documentID, documentData) {
    try {
      await setDoc(doc(db, collectionName, documentID), documentData, {merge: true});
      console.log("Document written with ID: ", documentID);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

// Example usage
const BATCH_SIZE = 20; 

async function sendEmail() {
  const emails = await getAllUserEmails();

  // Function to chunk the email array into batches of 20
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const emailBatches = chunkArray(emails, BATCH_SIZE);

  for (const batch of emailBatches) {
    const payload = {
      to: batch,
      message: {
        subject: "SpeedyIELTS Soft Lauching Promo",
        html: `<!DOCTYPE html> <html lang="en"> <head>     <meta charset="UTF-8">     
          <meta name="viewport" content="width=device-width, initial-scale=1.0">     
          <title>Congratulations! You've Been Selected for a Special Offer</title>    
          <style>         @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');        
                    body {             font-family: 'Roboto', Arial, sans-serif;             line-height: 1.6;             
                      color: #333;             background-color: #f4f4f4;             margin: 0;             padding: 0         }         .container {             max-width: 600px;             margin: 0 auto;             background-color: #ffffff         }         .header {             background-color: #4CAF50;             color: white;             padding: 20px;             text-align: center         }         .content {             padding: 20px         }         .congrats {             font-size: 28px;             font-weight: bold;             color: #4CAF50;             margin-bottom: 20px;             text-align: center         }         .promo-code {             font-size: 24px;             font-weight: bold;             color: #e74c3c;             text-align: center;             padding: 10px;             border: 2px dashed #e74c3c;             margin: 20px 0         }         .cta-button {             display: inline-block;             background-color: #3498db;             color: white;             padding: 15px 30px;             text-decoration: none;             border-radius: 5px;             font-weight: bold;             margin-top: 20px;             transition: background-color 0.3s ease         }         .cta-button:hover {             background-color: #2980b9         }         .main-image {             max-width: 100%;             height: auto;             display: block;             margin: 20px auto         }         .footer {             background-color: #34495e;             color: white;             padding: 10px;             text-align: center;             font-size: 12px         }     </style> </head> <body>     <div class="container">         <div class="header">             <h1>Exclusive Offer Inside</h1>         </div>         <div class="content">             <p class="congrats">Congratulations! You've Been Selected</p>             <p>Dear Valued Customer</p>             <p>We're thrilled to inform you that you've been chosen to receive an exclusive offer on our IELTS Simulation  platform</p>             <img src="https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/assets%2Fcontent%2Fpackages.png?alt=media&token=74b61ee9-54e3-4e76-8c04-95ee3f8f607b" alt="Simulation Platform" class="main-image">             <p>As a selected customer, you now have the opportunity to unlock unlimited access to hundreds of text simulation questions at a special discounted rate</p>             <p>Use your exclusive promo code to get 30% off:</p>             <div class="promo-code">TRYSPEEDY</div>             <p>This offer includes:</p>             <ul>                 <li>Unlimited access to our entire question bank</li>                 <li>Personalized learning paths</li>                 <li>Real-time performance tracking</li>             </ul>             <p>Don't miss this opportunity to supercharge your text analysis skills</p>             <a href="https://speedyielts.com/pricing" class="cta-button">Claim Your Offer Now</a>         </div>         <div class="footer">             <p>Offer valid until soft launching promos period is over</p>         </div>     </div> </body> </html>
          `,
      },
    };

    //uploadDocument("reading-questions", {question: question});
    await uploadDocumentWithID("mail", `soft-launching-promo-${Date.now()}`, payload);
  }

  
}


sendEmail();