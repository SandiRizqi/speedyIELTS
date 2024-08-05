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
        audio : [
            "gs://ielts-ai-b1478.appspot.com/listening/sample1/ELT_IELTS17_t1_audio1.mp3"
        ],
        parts: [
            {
                id: 1,
                type: 'gap_filling',
                instruction: "Complete the notes below.",
                html : `
                    <div className="font-sans leading-relaxed p-6">
                        <h1 className="text-lg font-bold text-center mb-6">Buckworth Conservation Group</h1>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Regular activities</h3>
                            <h4 className="text-lg font-bold mb-2">Beach</h4>
                            <ul className="list-disc pl-5 mb-4">
                            <li>making sure the beach does not have  <input type="text" className="border rounded px-2 py-1 ml-2" name="1"  /> on it</li>
                            <li>no <input type="text" className="border rounded px-2 py-1 ml-2" name="2" /></li>
                            </ul>
                            
                            <h4 className="text-lg font-bold mb-2">Nature reserve</h4>
                            <ul className="list-disc pl-5 mb-4">
                            <li>maintaining paths</li>
                            <li>nesting boxes for birds installed</li>
                            <li>next task is taking action to attract <input type="text" className="border rounded px-2 py-1 ml-2" name="3"  /> to the place</li>
                            <li>identifying types of <input type="text" className="border rounded px-2 py-1 ml-2" name="4" /></li>
                            <li>building a new <input type="text" className="border rounded px-2 py-1 ml-2" name="5"  /></li>
                            </ul>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Forthcoming events</h3>
                            <h4 className="text-lg font-bold mb-2">Saturday</h4>
                            <ul className="list-disc pl-5 mb-4">
                            <li>meet at Dunsmore Beach car park</li>
                            <li>walk across the sands and reach the <input type="text" className="border rounded px-2 py-1 ml-2" name="6" /></li>
                            <li>take a picnic</li>
                            <li>wear appropriate <input type="text" className="border rounded px-2 py-1 ml-2" name="7" /></li>
                            </ul>
                            
                            <h4 className="text-lg font-bold mb-2">Woodwork session</h4>
                            <ul className="list-disc pl-5 mb-4">
                            <li>suitable for <input type="text" className="border rounded px-2 py-1 ml-2" name="8" /> to participate in</li>
                            <li>making <input type="text" className="border rounded px-2 py-1 ml-2" name="9" /> out of wood</li>
                            <li>17th, from 10 a.m. to 3 p.m.</li>
                            <li>cost of session (no camping): £ <input type="text" className="border rounded px-2 py-1 ml-2" name="10"/></li>
                            </ul>
                        </div>
                        </div>
                    `,
                
            },
            
        ]

    },
    {
        section: 2,
        audio: "gs://ielts-ai-b1478.appspot.com/listening/sample1/ELT_IELTS17_t1_audio2.mp3",
        parts: [
            {
                id: 2,
                type: 'multiple_choice',
                instruction: "Choose the correct letter, A, B or C. ",
                html: `<h1 className="text-lg font-bold text-center mb-6">Boat trip round Tasmania</h1>`,

                questions: [{
                    number: 11,
                    question: "What is the maximum number of people who can stand on each side of the boat?",
                    options: [
                        "A. 9",
                        "B. 15",
                        "C. 18",
                    ],
                    
                },
                {
                    number: 12,
                    question: "What colour are the tour boats?",
                    options: [
                        "A. dark red",
                        "B. jet black",
                        "C. light green",
                    ],
                    
                },
                {
                    number: 13,
                    question: "Which lunchbox is suitable for someone who doesn't eat meat or fish ?",
                    options: [
                        "A. Lunchbox 1",
                        "B. Lunchbox 2",
                        "C. Lunchbox 3",
                    ],
                    
                },
                {
                    number: 14,
                    question: "What should people do with their litter?",
                    options: [
                        "A. take it home",
                        "B. hand it to a member of staff",
                        "C. put it the bins provided on the boat",
                    ],
                    
                },
            ]

            },
            {
                id: 3,
                type: 'matching',
                instruction: "Questions 15 and 16. Choose TWO letters, A-E.",
                html: `
                <div className="bg-white p-6 ">
                    <h4 className="text-lg font-bold mb-4">
                    Which <span className="font-semibold">TWO</span> features of the lighthouse does Lou mention?
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-semibold">A.</span> why it was built</li>
                    <li><span className="font-semibold">B.</span> who built it</li>
                    <li><span className="font-semibold">C.</span> how long it took to build</li>
                    <li><span className="font-semibold">D.</span> who staffed it</li>
                    <li><span className="font-semibold">E.</span> what it was built with</li>
                    </ul>
                </div> `,
                questions: [
                    {
                        number: 15,
                    },
                    {
                        number: 16,
                    },
                ],
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E"
                }
            },
            {
                id: 4,
                type: 'matching',
                instruction: "Questions 17 and 18. Choose TWO letters, A-E.",
                html: `
                <h4 className="text-lg font-bold mb-4">Which TWO types of creature might come close to the boat?</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-semibold">A.</span> sea eagles</li>
                    <li><span className="font-semibold">B.</span> fur seals</li>
                    <li><span className="font-semibold">C.</span> dolphins</li>
                    <li><span className="font-semibold">D.</span> whales</li>
                    <li><span className="font-semibold">E.</span> penguins</li>
                    </ul>
                    </div>`,
                questions: [
                    {
                        number: 17,
                    },
                    {
                        number: 18,
                    },
                ],
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E"
                }
            },
            {
                id: 4,
                type: 'matching',
                instruction: "Questions 19 and 20. Choose TWO letters, A-E.",
                html: `
                <h4 className="text-lg font-bold mb-4">Which TWO points does Lou make about the caves?</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><span className="font-semibold">A.</span> Only large tourist boats can visit them</li>
                        <li><span className="font-semibold">B.</span> The entrances to them are often blocked</li>
                        <li><span className="font-semibold">C.</span> It is too dangerous for individuals to go near them</li>
                        <li><span className="font-semibold">D.</span> Someone will explain what is inside them</li>
                        <li><span className="font-semibold">E.</span> They cannot be reached on foot</li>
                        </ul>
                    </div>`,
                questions: [
                    {
                        number: 19,
                    },
                    {
                        number: 20,
                    },
                ],
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E"
                }
            },
        ]
    },
    {
        section: 3,
        audio: "gs://ielts-ai-b1478.appspot.com/listening/sample1/ELT_IELTS17_t1_audio3.mp3",
        parts: [
            {
                id: 5,
                type: 'multiple_choice',
                instruction: "Choose the correct letter, A, B, or C",
                html: `<h1 className="text-lg font-bold text-center mb-6">Work experience for veterinary science students</h1>`,
                questions: [{
                    number: 21,
                    question: "What problem did both Diana and Tim have when arranging their work experience?",
                    options: [
                        "A. making initial contact with suitable farms",
                        "B. organising transport to and from the farm",
                        "C. finding a placement for the required length of time",
                    ],
                    
                },
                {
                    number: 22,
                    question: "Tim was pleased to be able to help",
                    options: [
                        "A. a lamb that had a broken leg.",
                        "B. a sheep that was having difficulty giving birth.",
                        "C. a newly born lamb that was having trouble feeding.",
                    ],
                   
                },
                {
                    number: 23,
                    question: "Diana says the sheep on her farm",
                    options: [
                        "A. were of various different varieties.",
                        "B. were mainly reared for their meat.",
                        "C. had better quality wool than sheep on the hills.",
                    ],
                    
                },
                {
                    number: 24,
                    question: "What did the students learn about adding supplements to chicken feed?",
                    options: [
                        "A. These should only be given if specially needed.",
                        "B. It is worth paying extra for the most effective ones.",
                        "C. The amount given at one time should be limited.",
                        
                    ],
                
                },
                {
                    number: 25,
                    question: "What happened when Diana was working with dairy cows?",
                    options: [
                        "A. She identified some cows incorrectly.",
                        "B. She accidentally threw some milk away.",
                        "C. She made a mistake when storing milk.",
                      
                    ],
           
                },
                {
                    number: 26,
                    question: "What did both farmers mention about vets and farming?",
                    options: [
                        "A. Vets are failing to cope with some aspects of animal health.",
                        "B. There needs to be a fundamental change in the training of vets.",
                        "C. Some jobs could be done by the farmer rather than by a vet.",
                      
                    ],
           
                }
                ]
            },
            {
                id: 6,
                type: 'gap_filling',
                instruction: "Questions 27-30",
                html: `
                    <h2 className="text-lg font-bold mb-4">What opinion do the students give about each of the following modules on their veterinary science course?</h2>
                    <p className="mb-4">Choose FOUR answers from the box and write the correct letter, A-F, next to questions 27-30.</p>

                    <ul className="">
                        <li>A. Tim found this easier than expected.</li>
                        <li>B. Tim thought this was not very clearly organised.</li>
                        <li>C. Diana may do some further study on this.</li>
                        <li>D. They both found the reading required for this was difficult.</li>
                        <li>E. Tim was shocked at something he learned on this module.</li>
                        <li>F. They were both surprised how little is known about some aspects of this.</li>
                    </ul>
                `,
                questions: [{
                    number: 27,
                    question: "Media terminology"
                   
                },
                {
                    number: 28,
                     question: "Diet and nutrition"
                 
                },
                {
                    number: 29,
                     question: "Animal disease"
                 
                },
                {
                    number: 30,
                     question: "Wildlife medication"
                 
                },
               
                ]
            },
        ]
    },
    {
        section: 4,
        audio : [
            "gs://ielts-ai-b1478.appspot.com/listening/sample1/ELT_IELTS17_t1_audio4.mp3"
        ],
        parts: [
            {
                id: 7,
                type: 'gap_filling',
                instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.",
                html : `
                    <div className="font-sans leading-relaxed p-6">
                        <h1 className="text-lg font-bold text-center mb-6">Labyrinths</h1>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Definition</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>a winding spiral path leading to a central area</li>
                            </ul>

                            <h3 className="text-lg font-bold mb-4">Labyrinths compared with mazes</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>Mazes are a type of <input type="text" name="31" className="border rounded px-2 py-1 ml-2" /></li>
                            <li>
                                <input type="text" name="32" className="border rounded px-2 py-1 ml-2" /> is needed to navigate through a maze
                            </li>
                            <li>
                                the word 'maze' is derived from a word meaning a feeling of <input type="text" name="33" className="border rounded px-2 py-1 ml-2" />
                            </li>
                            </ul>

                            <h3 className="text-lg font-bold mb-4">Labyrinths represent a journey through life</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>they have frequently been used in <input type="text" name="34" className="border rounded px-2 py-1 ml-2" /> and prayer</li>
                            </ul>

                            <h3 className="text-lg font-bold mb-4">Early examples of the labyrinth spiral</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>
                                Ancient carvings on <input type="text" name="35" className="border rounded px-2 py-1 ml-2" /> have been found across
                                many cultures
                            </li>
                            <li>The Pima, a Native American tribe, wove the symbol on baskets</li>
                            <li>Ancient Greeks used the symbol on <input type="text" name="36" className="border rounded px-2 py-1 ml-2" /></li>
                            </ul>

                            <h3 className="text-lg font-bold mb-4">Walking labyrinths</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>
                                The largest surviving example of a turf labyrinth once had a big <input type="text" name="37" className="border rounded px-2 py-1 ml-2" /> at its centre
                            </li>
                            </ul>

                            <h3 className="text-lg font-bold mb-4">Labyrinths nowadays</h3>
                            <ul className="list-disc pl-5 mb-4">
                            <li>
                                Believed to have a beneficial impact on mental and physical health, e.g., walking a maze can reduce a person's <input type="text" name="38" className="border rounded px-2 py-1 ml-2" /> rate
                            </li>
                            <li>Used in medical and health and fitness settings and also prisons</li>
                            <li>Popular with patients, visitors and staff in hospitals</li>
                            <li>
                                patients who can't walk can use 'finger labyrinths' made from <input type="text" name="39" className="border rounded px-2 py-1 ml-2" />
                            </li>
                            <li>
                                research has shown that Alzheimer's sufferers experience less <input type="text" name="40" className="border rounded px-2 py-1 ml-2" />
                            </li>
                            </ul>
                        </div>
                        </div>
                    `,
                
            },
            
        ]

    },

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
uploadDocumentWithID("listening-questions", "sample1", {answers: ans} )