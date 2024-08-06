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
        audio: "gs://ielts-ai-b1478.appspot.com/listening/QIba4hCvpWGD936rjuJC/ELT_IELTS17_t4_audio1.mp3",
        parts: [
            {
                id: 1,
                type: "gap_filling",
                instruction: "Complete the notes below.",
                html: `
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-xl font-bold mb-4">Easy Life Cleaning Services</h1>
                        <p className="mb-4 font-bold">Basic cleaning package offered</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Cleaning all surfaces</li>
                            <li>Cleaning the <input type="text" name="1" className="border border-gray-400 rounded p-1"> throughout the apartment</li>
                            <li>Cleaning shower, sinks, toilet etc.</li>
                        </ul>
                        <p className="mb-4 font-bold">Additional services agreed</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Every week
                                <ul className="list-disc pl-6">
                                    <li>Cleaning the <input type="text" name="2" className="border border-gray-400 rounded p-1"></li>
                                    <li>Ironing clothes – <input type="text" name="3" className="border border-gray-400 rounded p-1"> only</li>
                                </ul>
                            </li>
                            <li>Every month
                                <ul className="list-disc pl-6">
                                    <li>Cleaning all the <input type="text" name="4" className="border border-gray-400 rounded p-1"> from the inside</li>
                                    <li>Washing down the <input type="text" name="5" className="border border-gray-400 rounded p-1"></li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mb-4 font-bold">Other possibilities</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>They can organise a plumber or an <input type="text" name="6" className="border border-gray-400 rounded p-1"> if necessary.</li>
                            <li>A special cleaning service is available for customers who are allergic to <input type="text" name="7" className="border border-gray-400 rounded p-1"></li>
                        </ul>
                        <p className="mb-4 font-bold">Information on the cleaners</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Before being hired, all cleaners have a background check carried out by the <input type="text" name="8" className="border border-gray-400 rounded p-1"></li>
                            <li>References are required.</li>
                            <li>All cleaners are given <input type="text" name="9" className="border border-gray-400 rounded p-1"> for two weeks.</li>
                            <li>Customers send a <input type="text" name="10" className="border border-gray-400 rounded p-1"> after each visit.</li>
                            <li>Usually, each customer has one regular cleaner.</li>
                        </ul>
                    </div>
                `
            },
              
        ]
    },
    {
        section: 2,
        audio: "gs://ielts-ai-b1478.appspot.com/listening/QIba4hCvpWGD936rjuJC/ELT_IELTS17_t4_audio2.mp3",
        parts: [
            {
                id: 2,
                type: "multiple_choice",
                instruction: "Choose the correct letter, A, B or C.",
                questions: [
                  {
                    number: 11,
                    question: "Many hotel managers are unaware that their staff often leave because of",
                    options: [
                      "A. a lack of training.",
                      "B. long hours.",
                      "C. low pay."
                    ]
                  },
                  {
                    number: 12,
                    question: "What is the impact of high staff turnover on managers?",
                    options: [
                      "A. an increased workload",
                      "B. low morale",
                      "C. an inability to meet targets"
                    ]
                  },
                  {
                    number: 13,
                    question: "What mistake should managers always avoid?",
                    options: [
                      "A. failing to treat staff equally",
                      "B. reorganising shifts without warning",
                      "C. neglecting to have enough staff during busy periods"
                    ]
                  },
                  {
                    number: 14,
                    question: "What unexpected benefit did Dunwich Hotel notice after improving staff retention rates?",
                    options: [
                      "A. a fall in customer complaints",
                      "B. an increase in loyalty club membership",
                      "C. a rise in spending per customer"
                    ]
                  }
                ]
              },
              {
                id: 3,
                type: "matching",
                instruction: "Which way of reducing staff turnover was used in each of the following hotels? Write the correct letter, A, B or C, next to Questions 15–20.",
                html: `
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold text-center mb-4">Ways of reducing staff turnover</h2>
                    <ul className="list-none mb-4">
                        <li className="mb-2"><span className="font-bold">A</span>. improving relationships and teamwork</li>
                        <li className="mb-2"><span className="font-bold">B</span>. offering incentives and financial benefits</li>
                        <li className="mb-2"><span className="font-bold">C</span>. providing career opportunities</li>
                    </ul>
                </div>
                `,
                options: {
                  A: "improving relationships and teamwork",
                  B: "offering incentives and financial benefits",
                  C: "providing career opportunities"
                },
                questions: [
                  {
                    number: 15,
                    question: "The Sun Club",
               
                  },
                  {
                    number: 16,
                    question: "The Portland",
              
                  },
                  {
                    number: 17,
                    question: "Bluewater Hotels",
                  
                  },
                  {
                    number: 18,
                    question: "Pentlow Hotels",
                   
                  },
                  {
                    number: 19,
                    question: "Green Planet",
                   
                  },
                  {
                    number: 20,
                    question: "The Amesbury",
                 
                  }
                ]
              }
              
        ]
    },
    {
        section: 3,
        audio: "gs://ielts-ai-b1478.appspot.com/listening/QIba4hCvpWGD936rjuJC/ELT_IELTS17_t4_audio3.mp3",
        parts: [
            {
                id: 4,
                type: "matching",
                html: `
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Questions 21–22</h1>
                    <p className="mb-4">Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.</p>

                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold mb-4">Which TWO points do Thomas and Jeanne make about Thomas’s sporting activities at school?</h2>
                        <ul className="list-none mb-4">
                            <li className="mb-2"><span className="font-bold">A.</span> He should have felt more positive about them.</li>
                            <li className="mb-2"><span className="font-bold">B.</span> The training was too challenging for him.</li>
                            <li className="mb-2"><span className="font-bold">C.</span> He could have worked harder at them.</li>
                            <li className="mb-2"><span className="font-bold">D.</span> His parents were disappointed in him.</li>
                            <li className="mb-2"><span className="font-bold">E.</span> His fellow students admired him.</li>
                        </ul>
                    </div>
                </div>
                `,
                options: {
                  A: "A",
                  B: "B",
                  C: "C",
                  D: "D",
                  E: "E"
                },
                questions: [
                    {
                        number: 21
                    },
                    {
                        number: 22
                    }
                ]

            },
            {
                id: 5,
                type: "matching",
                html: `
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Questions 23 and 24</h1>
                    <p className="mb-4">Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.</p>
              
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold mb-4">Which TWO feelings did Thomas experience when he was in Kenya?</h2>
                        <ul className="list-none mb-4">
                            <li className="mb-2"><span className="font-bold">A.</span> disbelief</li>
                            <li className="mb-2"><span className="font-bold">B.</span> relief</li>
                            <li className="mb-2"><span className="font-bold">C.</span> stress</li>
                            <li className="mb-2"><span className="font-bold">D.</span> gratitude</li>
                            <li className="mb-2"><span className="font-bold">E.</span> homesickness</li>
                        </ul>
                    </div>
                </div>
                `,
                options: {
                  A: "A",
                  B: "B",
                  C: "C",
                  D: "D",
                  E: "E"
                },
                questions: [
                    {
                        number: 23
                    },
                    {
                        number: 24
                    }
                ]
             },
            {
                id: 6,
                type: "gap_filling",
                html: `
                  <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                      <p className="mb-4">What comment do the students make about the development of each of the following items of sporting equipment?</p>
                      <p className="mb-4">Choose <span className="font-bold">SIX</span> answers from the box and write the correct letter, <span className="font-bold">A–H</span>, next to Questions 25–30.</p>
              
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <h2 className="text-lg font-semibold mb-4">Comments about the development of the equipment</h2>
                          <ul className="list-none mb-4">
                              <li className="mb-2"><span className="font-bold">A.</span> It could cause excessive sweating.</li>
                              <li className="mb-2"><span className="font-bold">B.</span> The material was being mass produced for another purpose.</li>
                              <li className="mb-2"><span className="font-bold">C.</span> People often needed to make their own.</li>
                              <li className="mb-2"><span className="font-bold">D.</span> It often had to be replaced.</li>
                              <li className="mb-2"><span className="font-bold">E.</span> The material was expensive.</li>
                              <li className="mb-2"><span className="font-bold">F.</span> It was unpopular among spectators.</li>
                              <li className="mb-2"><span className="font-bold">G.</span> It caused injuries.</li>
                              <li className="mb-2"><span className="font-bold">H.</span> No one using it liked it at first.</li>
                          </ul>
                      </div>
              
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h3 className="text-md font-bold mb-2">Items of sporting equipment</h3>
                          <ul className="list-none">
                              <li className="mb-2">25. the table tennis bat <span className="ml-4"><input type="text" name="25" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                              <li className="mb-2">26. the cricket helmet <span className="ml-4"><input type="text" name="26" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                              <li className="mb-2">27. the cycle helmet <span className="ml-4"><input type="text" name="27" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                              <li className="mb-2">28. the golf club <span className="ml-4"><input type="text" name="28" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                              <li className="mb-2">29. the hockey stick <span className="ml-4"><input type="text" name="29" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                              <li className="mb-2">30. the football <span className="ml-4"><input type="text" name="30" className="border border-gray-400 rounded p-1 w-12 text-center"></span></li>
                          </ul>
                      </div>
                  </div>
                `
              }
              
        ]
    
    },
    {
        section: 4,
        audio: "gs://ielts-ai-b1478.appspot.com/listening/QIba4hCvpWGD936rjuJC/ELT_IELTS17_t4_audio4.mp3",
        parts: [
            {
                id: 7,
                type: "gap_filling",
                html: `
                  <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                      <h1 className="text-xl font-bold mb-4">Maple syrup</h1>
                      <p className="mb-4">Write <span className="font-bold">ONE WORD ONLY</span> for each answer.</p>
                      
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <h2 className="text-lg font-semibold mb-4">What is maple syrup?</h2>
                          <ul className="list-none mb-4">
                              <li className="mb-2">• made from the sap of the maple tree</li>
                              <li className="mb-2">• added to food or used in cooking</li>
                              <li className="mb-2">• colour described as <input type="text" name="31" className="border border-gray-400 rounded p-1"> </li>
                              <li className="mb-2">• very <input type="text" name="32" className="border border-gray-400 rounded p-1"> compared to refined sugar</li>
                          </ul>
                      </div>
              
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <h2 className="text-lg font-semibold mb-4">The maple tree</h2>
                          <ul className="list-none mb-4">
                              <li className="mb-2">• has many species</li>
                              <li className="mb-2">• needs sunny days and cool nights</li>
                              <li className="mb-2">• maple leaf has been on the Canadian flag since 1964</li>
                              <li className="mb-2">• needs moist soil but does not need fertiliser as well</li>
                              <li className="mb-2">• best growing conditions and <input type="text" name="33" className="border border-gray-400 rounded p-1"> are in Canada and North America</li>
                          </ul>
                      </div>
              
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <h2 className="text-lg font-semibold mb-4">Early maple sugar producers</h2>
                          <ul className="list-none mb-4">
                              <li className="mb-2">• made holes in the tree trunks</li>
                              <li className="mb-2">• used hot <input type="text" name="34" className="border border-gray-400 rounded p-1"> to heat the sap</li>
                              <li className="mb-2">• used tree bark to make containers for collection</li>
                              <li className="mb-2">• sweetened food and drink with sugar</li>
                          </ul>
                      </div>
              
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <h2 className="text-lg font-semibold mb-4">Today’s maple syrup</h2>
                          <h3 className="text-md font-semibold mb-2">The trees</h3>
                          <ul className="list-none mb-4">
                              <li className="mb-2">• Tree trunks may not have the correct <input type="text" name="35" className="border border-gray-400 rounded p-1"> until they have been growing for 40 years.</li>
                              <li className="mb-2">• The changing temperature and movement of water within the tree produces the sap.</li>
                          </ul>
                          <h3 className="text-md font-semibold mb-2">The production</h3>
                          <ul className="list-none mb-4">
                              <li className="mb-2">• A tap is drilled into the trunk and a <input type="text" name="36" className="border border-gray-400 rounded p-1"> carries the sap into a bucket.</li>
                              <li className="mb-2">• Large pans of sap called evaporators are heated by means of a <input type="text" name="37" className="border border-gray-400 rounded p-1"></li>
                              <li className="mb-2">• A lot of <input type="text" name="38" className="border border-gray-400 rounded p-1"> is produced during the evaporation process.</li>
                              <li className="mb-2">• ‘Sugar sand’ is removed because it makes the syrup look <input type="text" name="39" className="border border-gray-400 rounded p-1"> and affects the taste.</li>
                              <li className="mb-2">• The syrup is ready for use.</li>
                              <li className="mb-2">• A huge quantity of sap is needed to make a <input type="text" name="40" className="border border-gray-400 rounded p-1"> of maple syrup.</li>
                          </ul>
                      </div>
                  </div>
                `,
              }
              
        ]
    }
    
]


const ans = {
    1: ["FLOOR", "FLOORS"],
    2: ["FRIDGE"],
    3: ["SHIRTS"],
    4: ["WINDOWS"],
    5: ["BALCONY"],
    6: ["ELECTRICIAN"],
    7: ["DUST"],
    8: ["POLICE"],
    9: ["TRAINING"],
    10: ["REVIEW"],
    11: ["A"],
    12: ["A"],
    13: ["A"],
    14: ["C"],
    15: ["A"],
    16: ["C"],
    17: ["B"],
    18: ["C"],
    19: ["B"],
    20: ["A"],
    21: ["C", "E"],
    22: ["C", "E"],
    23: ["A", "D"],
    24: ["A", "D"],
    25: ["B"],
    26: ["F"],
    27: ["A"],
    28: ["D"],
    29: ["C"],
    30: ["G"],
    31: ["GOLDEN"],
    32: ["HEALTHY"],
    33: ["CLIMATE"],
    34: ["ROCKS", "ROCK"],
    35: ["DIAMETER"],
    36: ["TUBE"],
    37: ["FIRE"],
    38: ["STEAM"],
    39: ["CLOUDY"],
    40: ["LITRE", "LITER"]
}



    //uploadDocument("reading-questions", {question: question});
uploadDocumentWithID("listening-questions", "QIba4hCvpWGD936rjuJC", {answers: ans, question: question} )