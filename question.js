const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc,setDoc, doc } = require('firebase/firestore');

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




const question = [
    {
        section: 1,
        html:  `
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">The development of the London underground railway</h1>
        <p className="mb-4">
            In the first half of the 1800s, London’s population grew at an astonishing rate, and the central area became increasingly congested. In addition, the expansion of the overground railway network resulted in more and more passengers arriving in the capital. However, in 1846, a Royal Commission decided that the railways should not be allowed to enter the City, the capital’s historic and business centre. The result was that the overground railway stations formed a ring around the City. The area within consisted of poorly built, overcrowded slums and the streets were full of horse-drawn traffic. Crossing the City became a nightmare. It could take an hour and a half to travel 8 km by horse-drawn carriage or bus. Numerous schemes were proposed to resolve these problems, but few succeeded.
        </p>
        <p className="mb-4">
            Amongst the most vocal advocates for a solution to London’s traffic problems was Charles Pearson, who worked as a solicitor for the City of London. He saw both social and economic advantages in building an underground railway that would link the overground railway stations together and clear London slums at the same time. His idea was to relocate the poor workers who lived in the inner-city slums to newly constructed suburbs, and to provide cheap rail travel for them to get to work. Pearson’s ideas gained support amongst some businessmen and in 1851 he submitted a plan to Parliament. It was rejected, but coincided with a proposal from another group for an underground connecting line, which Parliament passed.
        </p>
        <p className="mb-4">
            The two groups merged and established the Metropolitan Railway Company in August 1854. The company’s plan was to construct an underground railway line from the Great Western Railway’s (GWR) station at Paddington to the edge of the City at Farringdon Street — a distance of almost 5 km. The organisation had difficulty in raising the funding for such a radical and expensive scheme, not least because of the critical articles printed by the press. Objectors argued that the tunnels would collapse under the weight of traffic overhead, buildings would be shaken and passengers would be poisoned by the emissions from the train engines. However, Pearson and his partners persisted.
        </p>
        <p>
            The GWR, aware that the new line would finally enable them to run trains into the heart of the City, invested almost £250,000 in the scheme. Eventually, over a five-year period, £1m was raised. The chosen route ran beneath existing main roads to minimise the expense of construction.
        </p>
        </div>
        `,

        image: [
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.12.51.png?alt=media&token=c820d89d-3b18-42c7-b216-238c18cf1ffb",
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.14.56.png?alt=media&token=950de739-8a57-4bda-b11c-d83f30bf0253"
        ],
        parts: [
            {
                id: 1,
                type: 'gap_filling',
                instruction: "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 1-6 on your answer sheet.",
                image : "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2015.14.13.png?alt=media&token=fc03c07d-9081-448a-a9b1-8770d9ee3ef3",
                questions: [{
                    number: 1,
                   
                },
                {
                    number: 2,
                 
                },
                {
                    number: 3,
              
                },
                {
                    number: 4,
                    
                },
                {
                    number: 5,
                    
                },
                {
                    number: 6,
                   
                },
                ]
            },
            {
                id: 2,
                type: 'true_false_not_given',
                instruction: "Do the following statements agree with the information given in Reading Passage 1?",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2015.29.49.png?alt=media&token=3dd80165-a12b-4773-96c9-980cf8f363e9",
                questions: [
                    {
                        number: 7,
                        question: "Other countries had built underground railways before the Metropolitan line opened.",
     
                    },
                    {
                        number: 8,
                        question: "More people than predicted travelled on the Metropolitan line on the first day.",
                 
                    },
                    {
                        number: 9,
                        question: "The use of ventilation shafts failed to prevent pollution in the tunnels.",
                    
                    },
                    {
                        number: 10,
                        question: "A different approach from the 'cut and cover' technique was required in London's central area.",
                  
                    },
                    {
                        number: 11,
                        question: "The windows on City & South London trains were at eye level.",
       
                    },
                    {
                        number: 12,
                        question: "The City & South London Railway was a financial success.",
                  
                    },
                    {
                        number: 13,
                        question: "Trains on the 'Tuppenny Tube' nearly always ran on time.",
                 
                    },
                ],
            },
            
        ]

    },
    {
        section: 2,
        image: [
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.18.18.png?alt=media&token=a3829c0d-253c-4119-a118-5d33d6d27b74",
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.19.08.png?alt=media&token=543acb38-e2e8-483c-8776-295d15120af3"
        ],
        parts: [
            {
                id: 4,
                type: 'matching_headings',
                instruction: "Reading Passage 2 has seven sections, A-G. Which section contains the following information? Write the correct letter, A-G, in boxes 14-17 on your answer sheet. You may use any letter more than once.",
                questions: [
                    {
                        number: 14,
                        question: "a mention of negative attitudes towards stadium building projects",
                    },
                    {
                        number: 15,
                        question: "figures demonstrating the environmental benefits of a certain stadium",
                    },
                    {
                        number: 16,
                        question: "examples of the wide range of facilities available at some new stadiums",
                    },
                    {
                        number: 17,
                        question: "reference to the disadvantages of the stadiums built during a certain era",
                    },
                ],
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E",
                    F: "F",
                    G: "G"
                }
            },
            {
                id: 5,
                type: 'gap_filling',
                instruction: "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2015.48.53.png?alt=media&token=7aaa17b6-a29b-437a-b38e-9b166d768a7e",
                questions: [{
                    number: 18,
                    

                },
                {
                    number: 19,
                 
                   
                },
                {
                    number: 20,
               
                 
                },
                {
                    number: 21,
                 
                },
                {
                    number: 22,
                    
                }
                ]
            },
            {
                id: 6,
                type: 'gap_filling',
                instruction: "Choose TWO letters, A-E. Write the correct letters in boxes 23 and 24 on your answer sheet.",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2015.58.37.png?alt=media&token=6fd55436-e85d-466a-b4fa-0bfa3dd0d745",
                questions: [{
                    number: 23,
                   
                },
                {
                    number: 24,
                 
                },
                ]
            },
            {
                id: 7,
                type: 'gap_filling',
                instruction: "Choose TWO letters, A-E. Write the correct letters in boxes 25 a n d 26 on your answer sheet.",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2015.59.41.png?alt=media&token=b417cc58-1e70-4d6d-9fa8-3eb04ffff1af",
                questions: [{
                    number: 25,
                   
                },
                {
                    number: 26,
                 
                },
                ]
            },
            

        ]
    },
    {
        section: 3,
        image: [
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.21.20.png?alt=media&token=d7b2534d-1eb3-44c8-843e-f6b6b675ad04",
            "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2010.22.17.png?alt=media&token=d60aab80-0055-4346-a968-ecb38870e4b9"
        ],
        parts: [
            {
                id: 8,
                type: 'gap_filling',
                instruction: "Complete the summary using the list of phrases, A-J, below.",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2016.06.13.png?alt=media&token=dc8b73c8-35a6-4eae-bffa-64c9f666fac9",
                questions: [{
                    number: 27,
                   
                },
                {
                    number: 28,
                 
                },
                {
                    number: 29,
                 
                },
                {
                    number: 30,
                 
                },
                {
                    number: 31,
                 
                },
                ]
            },
            {
                id: 9,
                type: 'yes_no_not_given',
                instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2Fsample1%2FScreenshot%202024-08-01%20at%2016.08.58.png?alt=media&token=c020d324-2835-4733-af6e-f54a06542a11",
                questions: [
                    {
                        number: 32,
                        question: "Charles chose Pepys for the task because he considered him to be trustworthy.",
     
                    },
                    {
                        number: 33,
                        question: "Charles's personal recollection of the escape lacked sufficient detail.",
                 
                    },
                    {
                        number: 34,
                        question: "Charles indicated to Pepys that he had planned his escape before the battle.",
                    
                    },
                    {
                        number: 35,
                        question: "The inclusion of Charles's account is a positive aspect of the book.",
                  
                    },
                ],
            },
            {
                id: 10,
                type: 'multiple_choice',
                instruction: "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 36-40 on your answer sheet.",
                questions: [{
                    number: 36,
                    question: "What is the reviewer's main purpose in the first paragraph?",
                    options: [
                        "A. to describe what happened during the Battle of Worcester",
                        "B. to give an account of the circumstances leading to Charles Il's escape",
                        "C. to provide details of the Parliamentarians' political views",
                        "D. to compare Charles Il's beliefs with those of his father"
                    ],
                    
                },
                {
                    number: 37,
                    question: "Why does the reviewer include examples of the fugitives' behaviour in the third paragraph?",
                    options: [
                        "A. to explain how close Charles Il came to losing his life",
                        "B. to suggest that Charles Il's supporters were badly prepared",
                        "C. to illustrate how the events of the six weeks are brought to life",
                        "D. to argue that certain aspects are not as well known as they should be"
                    ],
                   
                },
                {
                    number: 38,
                    question: "What point does the reviewer make about Charles Il in the fourth paragraph?",
                    options: [
                        "A. He chose to celebrate what was essentially a defeat.",
                        "B. He misunderstood the motives of his opponents.",
                        "C. He aimed to restore people's faith in the monarchy.",
                        "D. He was driven by a desire to be popular."
                    ],
                    
                },
                {
                    number: 39,
                    question: "What does the reviewer say about Charles Spencer in the fifth paragraph?",
                    options: [
                        "A. His decision to write the book comes a s a surprise.",
                        "B. He takes an unbiased approach to the subject matter.",
                        "C. His descriptions of events would be better if they included more detail.",
                        "D. He chooses language that is suitable for a twenty-first-century audience."
                    ],
                
                },
                {
                    number: 40,
                    question: "When the reviewer says the book 'doesn't quite hit the mark', she is making the point that",
                    options: [
                        "A. it overlooks the impact of events on ordinary people.",
                        "B. it lacks an analysis of prevalent views on monarchy.",
                        "C. it omits any references to the deceit practised by Charles Il during his time in hiding.",
                        "D. it fails to address whether Charles Il's experiences had a lasting influence on him."
                    ],
           
                }
                ]
            }
        ]
    }


]


const ans = {
    1: ["LITTER"],
    2: ["DOGS"],
    3: ["INSECTS"],
    4: ["BUTTERFLIES"],
    5: ["WALL"],
    6: ["ISLAND"],
    7: ["BOOTS"],
    8: ["BEGINNERS"],
    9: ["SPOONS"],
    10: ["35", "THIRTY FIVE"],
    11: ["A"],
    12: ["C"],
    13: ["B"],
    14: ["B"],
    15: ["A", "D"],
    16: ["A", "D"],
    17: ["B", "C"],
    18: ["B", "C"],
    19: ["D", "E"],
    20: ["D", "E"],
    21: ["A"],
    22: ["B"],
    23: ["B"],
    24: ["A"],
    25: ["C"],
    26: ["C"],
    27: ["A"],
    28: ["E"],
    29: ["F"],
    30: ["C"],
    31: ["PUZZLE"],
    32: ["LOGIC"],
    33: ["CONFUSION"],
    34: ["MEDITATION"],
    35: ["STONE"],
    36: ["COINS"],
    37: ["TREE"],
    38: ["BREATHING"],
    39: ["PAPER"],
    40: ["ANXIETY"]
}

    //uploadDocument("reading-questions", {question: question});
uploadDocumentWithID("listening-questions", "sample1", {question: question} )