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
        <p className="mb-4">
            The GWR, aware that the new line would finally enable them to run trains into the heart of the City, invested almost £250,000 in the scheme. Eventually, over a five-year period, £1m was raised. The chosen route ran beneath existing main roads to minimise the expense of construction.
        </p>
        <p className="mb-4">
            demolishing buildings. Originally scheduled to be completed in 21 months, the construction of the underground line took three years. It was built just below street level using a technique known as ‘cut and cover’. A trench about ten metres wide and six metres deep was dug, and the sides temporarily held up with timber beams. Brick walls were then constructed, and finally a brick arch was added to create a tunnel. A two-metre-deep layer of soil was laid on top of the tunnel and the road above rebuilt.
        </p>
        <p className="mb-4">
            The Metropolitan line, which opened on 10 January 1863, was the world’s first underground railway. On its first day, almost 40,000 passengers were carried between Paddington and Farringdon, the journey taking about 18 minutes. By the end of the Metropolitan’s first year of operation, 9.5 million journeys had been made.
        </p>
        <p className="mb-4">
            Even as the Metropolitan began operation, the first extensions to the line were being authorised; these were built over the next five years, reaching Moorgate in the east of London and Hammersmith in the west. The original plan was to pull the trains with steam locomotives, using firebricks in the boilers to provide steam, but these engines were never introduced. Instead, the line used specially designed locomotives that were fitted with water tanks in which steam could be condensed. However, smoke and fumes remained a problem, even though ventilation shafts were added to the tunnels.
        </p>
        <p className="mb-4">
            Despite the extension of the underground railway, by the 1880s, congestion on London’s streets had become worse. The problem was partly that the existing underground lines formed a circuit around the centre of London and extended to the suburbs, but did not cross the capital’s centre. The ‘cut and cover’ method of construction was not an option in this part of the capital. The only alternative was to tunnel deep underground.
        </p>
        <p className="mb-4">
            Although the technology to create these tunnels existed, steam locomotives could not be used in such a confined space. It wasn’t until the development of a reliable electric motor, and a means of transferring power from the generator to a moving train, that the world’s first deep-level electric railway, the City & South London, became possible. The line opened in 1890, and ran from the City to Stockwell, south of the River Thames. The trains were made up of three carriages and driven by electric engines. The carriages were narrow and had tiny windows just below the roof because it was thought that passengers would not want to look out at the tunnel walls. The line was not without its problems, mainly caused by an unreliable power supply. Although the City & South London Railway was a great technical achievement, it did not make a profit. Then, in 1900, the Central London Railway, known as the ‘Tuppenny Tube’, began operation using new electric locomotives. It was very popular and soon afterwards new railways and extensions were added to the growing tube network. By 1907, the heart of today’s Underground system was in place.
        </p>
    </div>
        `,
        parts: [
            {
                id: 1,
                type: 'gap_filling',
                instruction: "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 1-6 on your answer sheet.",
                html : `
                
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                    <h1 className="text-xl font-bold mb-4 text-center">The London underground railway</h1>
                    
                    <h2 className="text-lg font-semibold mb-2">The problem</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>The <input type="text" name="1" className="border border-gray-400 rounded p-1"> of London increased rapidly between 1800 and 1850</li>
                        <li>The streets were full of horse-drawn vehicles</li>
                    </ul>

                    <h2 className="text-lg font-semibold mb-2">The proposed solution</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Charles Pearson, a solicitor, suggested building an underground railway</li>
                        <li>Building the railway would make it possible to move people to better housing in the <input type="text" name="2" className="border border-gray-400 rounded p-1"></li>
                        <li>A number of <input type="text" name="3" className="border border-gray-400 rounded p-1"> agreed with Pearson’s idea</li>
                        <li>The company initially had problems getting the <input type="text" name="4" className="border border-gray-400 rounded p-1"> needed for the project</li>
                        <li>Negative articles about the project appeared in the <input type="text" name="5" className="border border-gray-400 rounded p-1"></li>
                    </ul>

                    <h2 className="text-lg font-semibold mb-2">The construction</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>The chosen route did not require many buildings to be pulled down</li>
                        <li>The ‘cut and cover’ method was used to construct the tunnels</li>
                        <li>With the completion of the brick arch, the tunnel was covered with <input type="text" name="6" className="border border-gray-400 rounded p-1"></li>
                    </ul>
                </div>
          
                `
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
        html: `
        <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Stadiums: past, present and future</h1>
            
            <p className="mb-4">
                <strong>A</strong> Stadiums are among the oldest forms of urban architecture: vast stadiums where the public could watch sporting events were at the centre of western city life as far back as the ancient Greek and Roman Empires, well before the construction of the great medieval cathedrals and the grand 19th- and 20th-century railway stations which dominated urban skylines in later eras.
            </p>

            <p className="mb-4">
                Today, however, stadiums are regarded with growing scepticism. Construction costs can soar above £1 billion, and stadiums finished for major events such as the Olympic Games or the FIFA World Cup have notably fallen into disuse and disrepair.
            </p>

            <p className="mb-4">
                But this need not be the case. History shows that stadiums can drive urban development and adapt to the culture of every age. Even today, architects and planners are finding new ways to adapt the mono-functional sports arenas which became emblematic of modernisation during the 20th century.
            </p>

            <p className="mb-4">
                <strong>B</strong> The amphitheatre* of Arles in southwest France, with a capacity of 25,000 spectators, is perhaps the best example of just how versatile stadiums can be. Built by the Romans in 90 AD, it became a fortress with four towers after the fifth century, and was then transformed into a village containing more than 200 houses. With the growing interest in conservation during the 19th century, it was converted back into an arena for the staging of bullfights, thereby returning the structure to its original use as a venue for public spectacles.
            </p>

            <p className="mb-4">
                Another example is the imposing arena of Verona in northern Italy, with space for 30,000 spectators, which was built 60 years before the Arles amphitheatre and 40 years before Rome’s famous Colosseum. It has endured the centuries and is currently considered one of the world’s prime sites for opera, thanks to its outstanding acoustics.
            </p>

            <p className="mb-4">
                <strong>C</strong> The area in the centre of the Italian town of Lucca, known as the Piazza dell’Anfiteatro, is yet another impressive example of an amphitheatre becoming absorbed into the fabric of the city. The site evolved in a similar way to Arles and was progressively filled with buildings from the Middle Ages until the 19th century, variously used as houses, a salt depot and a prison. But rather than reverting to an arena, it became a market square, designed by Romanticist architect Lorenzo Nottolini. Today, the ruins of the amphitheatre remain embedded in the various shops and residences surrounding the public square.
            </p>

            <p className="mb-4">
                <strong>D</strong> There are many similarities between modern stadiums and the ancient amphitheatres intended for games. But some of the flexibility was lost at the beginning of the 20th century, as stadiums were developed using new products such as steel and reinforced concrete, and made use of bright lights for night-time matches.
            </p>

            <p className="mb-4">
                Many such stadiums are situated in suburban areas, designed for sporting use only and surrounded by parking lots. These factors mean that they may not be as accessible to the general public, require more energy to run and contribute to urban heat.
            </p>

            <p className="mb-4">
                <strong>E</strong> But many of today’s most innovative architects see scope for the stadium to help improve the city. Among the current strategies, two seem to be having particular success: the stadium as an urban hub, and as a power plant.
            </p>

            <p className="mb-4">
                There’s a growing trend for stadiums to be equipped with public spaces and services that serve a function beyond sport, such as hotels, retail outlets, conference centres, restaurants and bars, children’s playgrounds and green space. Creating mixed-use developments such as this reinforces compactness and multi-functionality, making more efficient use of land and helping to regenerate urban spaces.
            </p>

            <p className="mb-4">
                This opens the space up to families and a wider cross-section of society, instead of catering only to sportspeople and supporters. There have been many examples of this in the UK: the mixed-use facilities at Wembley and Old Trafford have become a blueprint for many other stadiums in the world.
            </p>

            <p className="mb-4">
                <strong>F</strong> The phenomenon of stadiums as power stations has arisen from the idea that energy problems can be overcome by integrating interconnected buildings by means of a smart grid, which is an electricity supply network that uses digital communications technology to detect and react to local changes in usage, without significant energy losses. Stadiums are ideal for these purposes, because their canopies have a large surface area for fitting photovoltaic panels and rise high enough (more than 40 metres) to make use of micro wind turbines.
            </p>

            <p className="mb-4">
                Freiburg Mage Solar Stadium in Germany is the first of a new wave of stadiums as power plants, which also includes the Amsterdam Arena and the Kaohsiung Stadium. The latter, inaugurated in 2009, has 8,844 photovoltaic panels producing up to 1.14 GWh of electricity annually. This reduces the annual output of carbon dioxide by 660 tons and supplies up to 80 percent of the surrounding area when the stadium is not in use. This is proof that a stadium can serve its city, and have a decidedly positive impact in terms of reduction of CO2 emissions.
            </p>

            <p className="mb-4">
                <strong>G</strong> Sporting arenas have always been central to the life and culture of cities. In every era, the stadium has acquired new value and uses: from military fortress to residential village, public space to theatre and most recently a field for experimentation in advanced engineering. The stadium of today now brings together multiple functions, thus helping cities to create a sustainable future.
            </p>
        </div>
    </div>
       `,
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
        html: `
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">To catch a king</h1>
            <p className="italic mb-4">Anna Keay reviews Charles Spencer's book about the hunt for King Charles II during the English Civil War of the seventeenth century</p>
            <p className="mb-4">
                Charles Spencer’s latest book, <em>To Catch a King</em>, tells us the story of the hunt for King Charles II in the six weeks after his resounding defeat at the Battle of Worcester in September 1651. And what a story it is. After his father was executed by the Parliamentarians in 1649, the young Charles II sacrificed one of the very principles his father had died for and did a deal with the Scots, thereby accepting Presbyterianism* as the national religion in return for being crowned King of Scots. His arrival in Edinburgh prompted the English Parliamentary army to invade Scotland in a pre-emptive strike. This was followed by a Scottish invasion of England. The two sides finally faced one another at Worcester in the west of England in 1651. After being comprehensively defeated on the meadows outside the city by the Parliamentarian army, the 21-year-old king found himself the subject of a national manhunt, with a huge sum offered for his capture. Over the following six weeks he managed, through a series of heart-poundingly close escapes, to evade the Parliamentarians before seeking refuge in France. For the next nine years, the penniless and defeated Charles wandered around Europe with only a small group of loyal supporters.
            </p>
            <p className="mb-4">
                Years later, after his restoration as king, the 50-year-old Charles II requested a meeting with the writer and diarist Samuel Pepys. His intention when asking Pepys to commit his story to paper was to ensure that this most extraordinary episode was never forgotten. Over two three-hour sittings, the king related to him in great detail his personal recollections of the six weeks he had spent as a fugitive. As the king and secretary settled down (a scene that is surely a gift for a future scriptwriter), Charles commenced his story: ‘After the battle was so absolutely lost as to be beyond hope of recovery, I began to think of the best way of saving myself.’
            </p>
            <p className="mb-4">
                One of the joys of Spencer’s book, a result not least of its use of Charles II’s own narrative as well as those of his supporters, is just how close the reader gets to the action. The day-by-day retelling of the fugitives’ doings provides delicious details: the cutting of the king’s long hair with agricultural shears, the use of walnut leaves to dye his pale skin, and the day Charles spent lying on a branch of the great oak tree in Boscobel Wood as the Parliamentary soldiers scoured the forest floor below. Spencer draws out both the humour — such as the preposterous refusal of Charles’s friend Henry Wilmot to adopt disguise on the grounds that it was beneath his dignity — and the emotional tension when the secret of the king’s presence was cautiously revealed to his supporters.
            </p>
            <p className="mb-4">
                Charles’s adventures after losing the Battle of Worcester hide the uncomfortable truth that whilst almost everyone in England had been appalled by the execution of his father, they had not welcomed the arrival of his son with the Scots army, but had instead firmly bolted their doors. This was partly because he rode at the head of what looked like a foreign invasion force and partly because, after almost a decade of civil war, people were desperate to avoid it beginning again. This makes it all the more interesting that Charles II himself loved the story so much ever after. As well as retelling it to anyone who would listen, causing eye-rolling among courtiers, he set in train a series of initiatives to memorialise it. There was to be a new order of chivalry, the Knights of the Royal Oak. A series of enormous oil paintings depicting the episode were produced, including a two-metre-wide canvas of Boscobel Wood and a set of six similarly enormous paintings of the king on the run. In 1660, Charles II commissioned the artist John Michael Wright to paint a flying squadron of cherubs* carrying an oak tree to the heavens on the ceiling of his bedchamber. It is hard to imagine many other kings marking the lowest point in their life so enthusiastically, or indeed pulling off such an escape in the first place.
            </p>

            <p className="mb-4">
                Charles Spencer is the perfect person to pass the story on to a new generation. His pacey, readable prose steers deftly clear of modern idioms and elegantly brings to life the details of the great tale. He has even-handed sympathy for both the fugitive king and the fierce republican regime that hunted him, and he succeeds in his desire to explore far more of the background of the story than previous books on the subject have done. Indeed, the opening third of the book is about how Charles II found himself at Worcester in the first place, which for some will be reason alone to read <em>To Catch a King</em>.
            </p>

            <p className="mb-4">
                The tantalising question left, in the end, is that of what it all meant. Would Charles II have been a different king had these six weeks never happened? The days and nights spent in hiding must have affected him in some way. Did the need to assume disguises, to survive on wit and charm alone, to use trickery and subterfuge to escape from tight corners help form him? This is the one area where the book doesn’t quite hit the mark. Instead its depiction of Charles II in his final years as an ineffective, pleasure-loving monarch doesn’t do justice to the man (neither is it accurate), or to the complexity of his character. But this one niggle aside, <em>To Catch a King</em> is an excellent read, and those who come to it knowing little of the famous tale will find they have a treat in store.
            </p>
       </div>
         
        `,
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
uploadDocumentWithID("reading-questions", "sample1", {question: question} )