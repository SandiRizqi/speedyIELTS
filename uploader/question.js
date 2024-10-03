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
        subject: `<!DOCTYPE html>  <html lang="en">  <head>          <meta charset="UTF-8">          <meta name="viewport" content="width=device-width, initial-scale=1.0">          <title>Skimming Practice</title>          <script src="https://cdn.tailwindcss.com"></script>          <style>                  .hidden {                          display: none;                  }          </style>  </head>  <body class="bg-gray-100 p-5">           <div class="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">                  <!-- Introduction Section -->                  <h1 class="text-3xl font-bold mb-6">Skimming Practice for IELTS</h1>                  <h2 class="text-2xl font-semibold mb-4">What is Skimming?</h2>                  <p class="mb-4">                          <strong>Skimming</strong> is a reading technique where you quickly go through the text to understand the general idea without reading every word. It helps you get the gist of the passage, allowing you to find the main points or locate specific information quickly. Skimming is essential for IELTS because the reading section is time-pressured, and being able to skim efficiently helps you answer questions faster.                  </p>                    <h2 class="text-xl font-semibold mb-4">When to Use Skimming:</h2>                  <ul class="list-disc pl-5 mb-4">                          <li>To identify the general idea of a passage</li>                          <li>To find the structure and organization of the text</li>                          <li>To locate key sentences, headings, or subheadings quickly</li>                          <li>To preview a passage before detailed reading</li>                  </ul>                    <h2 class="text-xl font-semibold mb-4">Tips for Effective Skimming:</h2>                  <ul class="list-disc pl-5 mb-6">                          <li><strong>Focus on the first and last sentences</strong> of each paragraph. These often contain the main idea.</li>                          <li><strong>Look for keywords</strong> like names, dates, and places that stand out in the passage.</li>                          <li>Ignore unnecessary details, such as adjectives or examples, unless they are directly relevant to the main idea.</li>                          <li><strong>Use titles, subheadings, and italicized or bold text</strong> to guide your understanding.</li>                  </ul>                    <!-- Passage and Questions Section -->                  <h2 class="text-2xl font-semibold mb-4">Skimming Exercise: The Effects of Deforestation on Biodiversity</h2>                  <p class="mb-4">                          Deforestation is the large-scale removal of trees from forests or other lands, which significantly impacts the environment. One of the most critical consequences of deforestation is the loss of biodiversity. Forests, especially tropical rainforests, are home to an incredibly diverse range of species. As trees are cut down, many species lose their natural habitats, leading to extinction for some. Additionally, deforestation disrupts ecosystems and decreases the ability of forests to act as carbon sinks, exacerbating climate change.                  </p>                  <p class="mb-4">                          The loss of biodiversity due to deforestation affects not only wildlife but also human communities. Indigenous populations that depend on forests for food, medicine, and shelter are particularly vulnerable. Furthermore, biodiversity loss can reduce the resilience of ecosystems, making them more susceptible to pests, diseases, and extreme weather events. In the long term, this poses a significant threat to global ecological stability.                  </p>                  <p class="mb-4">                          To mitigate the effects of deforestation, efforts such as reforestation, the establishment of protected areas, and the promotion of sustainable agricultural practices have been implemented. However, challenges remain due to illegal logging, the demand for land for agriculture, and insufficient enforcement of environmental regulations in many regions.                  </p>                    <!-- Questions -->                  <h2 class="text-xl font-semibold mb-4">Questions</h2>                    <!-- Question 1 -->                  <div class="mb-4">                          <label class="font-bold">1. What is one of the primary consequences of deforestation mentioned in the passage?</label>                          <div>                                  <input type="radio" name="question1" value="a" class="mr-2"> a. Increased rainfall<br>                                  <input type="radio" name="question1" value="b" class="mr-2"> b. Loss of biodiversity<br>                                  <input type="radio" name="question1" value="c" class="mr-2"> c. More food production<br>                                  <input type="radio" name="question1" value="d" class="mr-2"> d. Improved air quality                          </div>                  </div>                    <!-- Question 2 -->                  <div class="mb-4">                          <label class="font-bold">2. Which group of people is particularly vulnerable to the effects of deforestation?</label>                          <div>                                  <input type="radio" name="question2" value="a" class="mr-2"> a. Urban dwellers<br>                                  <input type="radio" name="question2" value="b" class="mr-2"> b. Indigenous populations<br>                                  <input type="radio" name="question2" value="c" class="mr-2"> c. Industrial workers<br>                                  <input type="radio" name="question2" value="d" class="mr-2"> d. Fishermen                          </div>                  </div>                    <!-- Question 3 -->                  <div class="mb-4">                          <label class="font-bold">3. What are some of the efforts to mitigate the effects of deforestation?</label>                          <div>                                  <input type="text" name="question3" placeholder="Fill in the blank" class="border-b border-gray-400 w-full py-2">                          </div>                  </div>           </div>  </body>  </html>`},
    };

    //uploadDocument("reading-questions", {question: question});
    await uploadDocumentWithID("mail", `soft-launching-promo-${Date.now()}`, payload);
  }

  
}


sendEmail();