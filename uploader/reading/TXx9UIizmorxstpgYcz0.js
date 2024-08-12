const question = [
    {
        section: 1,
        html: `
        <div className="p-6 bg-white text-gray-900 max-w-4xl mx-auto">
            <div className="text-sm font-bold text-gray-500 uppercase mb-4">
                READING PASSAGE 1
            </div>
            <div className="text-base text-gray-700 mb-2">
                You should spend about 20 minutes on <span className="font-bold">Questions 1–13</span>, which are based on Reading Passage 1 below.
            </div>
            <h1 className="text-xl font-bold text-center mb-6">The Dead Sea Scrolls</h1>
            
            <p className="text-base leading-6 mb-4">
                In late 1946 or early 1947, three Bedouin teenagers were tending their goats and sheep near the ancient settlement of Qumran, located on the northwest shore of the Dead Sea in what is now known as the West Bank. One of these young shepherds tossed a rock into an opening on the side of a cliff and was surprised to hear a shattering sound. He and his companions later entered the cave and stumbled across a collection of large clay jars, seven of which contained scrolls with writing on them. The teenagers took the seven scrolls to a nearby town where they were sold for a small sum to a local antiquities dealer. Word of the find spread, and Bedouins and archaeologists eventually unearthed tens of thousands of additional scroll fragments from 10 nearby caves; together they make up between 800 and 900 manuscripts. It soon became clear that this was one of the greatest archaeological discoveries ever made.
            </p>
            
            <p className="text-base leading-6 mb-4">
                The origin of the Dead Sea Scrolls, which were written around 2,000 years ago between 150 BCE and 70 CE, is still the subject of scholarly debate even today. According to the prevailing theory, they are the work of a population that inhabited the area until Roman troops destroyed the settlement around 70 CE. The area was known as Judea at that time, and the people are thought to have belonged to a group called the Essenes, a devout Jewish sect.
            </p>
            
            <p className="text-base leading-6 mb-4">
                The majority of the texts on the Dead Sea Scrolls are in Hebrew, with some fragments written in an ancient version of its alphabet thought to have fallen out of use in the fifth century BCE. But there are other languages as well. Some scrolls are in Aramaic, the language spoken by many inhabitants of the region from the sixth century BCE to the siege of Jerusalem in 70 CE. In addition, several texts feature translations of the Hebrew Bible into Greek.
            </p>
            
            <p className="text-base leading-6 mb-4">
                The Dead Sea Scrolls include fragments from every book of the Old Testament of the Bible except for the Book of Esther. The only entire book of the Hebrew Bible preserved among the manuscripts from Qumran is Isaiah; this copy, dated to the first century BCE, is considered the earliest biblical manuscript still in existence. Along with biblical texts, the scrolls include documents about sectarian regulations and religious writings that do not appear in the Old Testament.
            </p>
            
            <p className="text-base leading-6 mb-4">
                The writing on the Dead Sea Scrolls is mostly in black or occasionally red ink, and the scrolls themselves are nearly all made of either parchment (animal skin) or an early form of paper called ‘papyrus’. The only exception is the scroll numbered 3Q15, which was created out of a combination of copper and tin. Known as the Copper Scroll, this curious document features letters chiselled onto metal – perhaps, as some have theorized, to better withstand the passage of time. One of the most intriguing manuscripts from Qumran, this is a sort of ancient treasure map that lists dozens of gold and silver caches. Using an unconventional vocabulary and odd spelling, it describes 64 underground hiding places that supposedly contain riches buried for safekeeping. None of these hoards have been recovered, possibly because the Romans pillaged Judea during the first century CE. According to various hypotheses, the treasure belonged to local people, or was rescued from the Second Temple before its destruction or never existed to begin with.
            </p>
            
            <p className="text-base leading-6 mb-4">
                Some of the Dead Sea Scrolls have been on interesting journeys. In 1948, a Syrian Orthodox archbishop known as Mar Samuel acquired four of the original seven scrolls from a Jerusalem shoemaker and part-time antiquity dealer, paying less than $100 for them. He then travelled to the United States and unsuccessfully offered them to a number of universities, including Yale. Finally, in 1954, he placed an advertisement in the business newspaper <span className="italic">The Wall Street Journal</span> – under the category ‘Miscellaneous Items for Sale’ – that read: ‘Biblical Manuscripts dating back to at least 200 B.C. are for sale. This would be an ideal gift to an educational or religious institution by an individual or group.’ Fortunately, Israeli archaeologist and statesman Yigael Yadin negotiated their purchase and brought the scrolls back to Jerusalem, where they remain to this day.
            </p>
            
            <p className="text-base leading-6 mb-4">
                In 2017, researchers from the University of Haifa restored and deciphered one of the last untranslated scrolls. The university’s Eshbal Ratson and Jonathan Ben-Dov spent one year reassembling the 60 fragments that make up the scroll. Deciphered from a band of coded text on parchment, the find provides insight into the community of people who wrote it and the 364-day calendar they would have used. The scroll names celebrations that indicate shifts in seasons and details two yearly religious events known from another Dead Sea Scroll. Only one more known scroll remains untranslated.
            </p>
            </div>
        `,
        parts: [
            {
                id: 1,
                type: 'gap_filling',
                instruction: "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 1-5 on your answer sheet.",
                html: `
                <div className="p-6 bg-white text-gray-900 max-w-4xl mx-auto border border-gray-400 rounded-lg">
                    <h1 className="text-xl font-bold text-center mb-6">The Dead Sea Scrolls</h1>
                    
                    <h2 className="text-lg font-semibold mb-4">Discovery</h2>
                    <p className="mb-2">Qumran, 1946/7</p>
                    
                    <ul className="list-disc list-inside mb-4">
                        <li className="mb-2">three Bedouin shepherds in their teens were near an opening on side of cliff</li>
                        <li className="mb-2">heard a noise of breaking when one teenager threw a 
                        <input 
                            name="1" 
                            type="text" 
                            className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        </li>
                        <li className="mb-2">teenagers went into the 
                        <input 
                            name="2" 
                            type="text" 
                            className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        /> 
                        and found a number of containers made of 
                        <input 
                            name="3" 
                            type="text" 
                            className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        </li>
                    </ul>
                    
                    <h2 className="text-lg font-semibold mb-4">The scrolls</h2>
                    
                    <ul className="list-disc list-inside mb-4">
                        <li className="mb-2">date from between 150 BCE and 70 CE</li>
                        <li className="mb-2">thought to have been written by group of people known as the 
                        <input 
                            name="4" 
                            type="text" 
                            className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        </li>
                        <li className="mb-2">written mainly in the 
                        <input 
                            name="5" 
                            type="text" 
                            className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        /> 
                        language
                        </li>
                        <li className="mb-2">most are on religious topics, written using ink on parchment or papyrus</li>
                    </ul>
                    </div>
                `,
            },
            {
                id: 2,
                type: 'true_false_not_given',
                instruction: "Do the following statements agree with the information given in Reading Passage 1?",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2FTXx9UIizmorxstpgYcz0%2FScreenshot%202024-08-02%20at%2010.29.02.png?alt=media&token=0356c5b6-1bd8-40aa-b935-5df7544ae255",
                questions: [
                    {
                        number: 6,
                        question: "The Bedouin teenagers who found the scrolls were disappointed by how little money they received for them.",
     
                    },
                    {
                        number: 7,
                        question: "There is agreement among academics about the origin of the Dead Sea Scrolls.",
     
                    },
                    {
                        number: 8,
                        question: "Most of the books of the Bible written on the scrolls are incomplete.",
                 
                    },
                    {
                        number: 9,
                        question: "The information on the Copper Scroll is written in an unusual way.",
                    
                    },
                    {
                        number: 10,
                        question: "Mar Samuel was given some of the scrolls a s a gift.",
                  
                    },
                    {
                        number: 11,
                        question: "In the early 1950s, a number of educational establishments in the US were keen to buy scrolls from Mar Samuel.",
       
                    },
                    {
                        number: 12,
                        question: "The scroll that was pieced together in 2017 contains information about annual occasions in the Qumran area 2,000 years ago.",
                  
                    },
                    {
                        number: 13,
                        question: "Academics at the University of Haifa are currently researching how to decipher the final scroll.",
                 
                    },
                ],
            },
            
        ]

    },
    {
        section: 2,
        html: `
                <div className="p-6 bg-white text-gray-900 max-w-4xl mx-auto">
                    <div className="text-sm font-bold text-gray-500 mb-4">
                        You should spend about 20 minutes on <span className="font-bold">Questions 14–26</span>, which are based on Reading Passage 2 below.
                    </div>
                    <h1 className="text-xl font-bold text-center mb-6">A second attempt at domesticating the tomato</h1>
                    
                    <div className="mb-6">
                        <p className="text-base leading-6 mb-4">
                        <span className="font-bold">A</span> It took at least 3,000 years for humans to learn how to domesticate the wild tomato and cultivate it for food. Now two separate teams in Brazil and China have done it all over again in less than three years. And they have done it better in some ways, as the re-domesticated tomatoes are more nutritious than the ones we eat at present.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        This approach relies on the revolutionary CRISPR genome editing technique, in which changes are deliberately made to the DNA of a living cell, allowing genetic material to be added, removed or altered. The technique could not only improve existing crops, but could also be used to turn thousands of wild plants into useful and appealing foods. In fact, a third team in the US has already begun to do this with a relative of the tomato called the groundcherry.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        This fast-track domestication could help make the world’s food supply healthier and far more resistant to diseases, such as the rust fungus devastating wheat crops.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        ‘This could transform what we eat,’ says Jorg Kudla at the University of Munster in Germany, a member of the Brazilian team. ‘There are 50,000 edible plants in the world, but 90 percent of our energy comes from just 15 crops.’
                        </p>
                        <p className="text-base leading-6 mb-4">
                        ‘We can now mimic the known domestication course of major crops like rice, maize, sorghum or others,’ says Caixia Gao of the Chinese Academy of Sciences in Beijing. ‘Then we might try to domesticate plants that have never been domesticated.’
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-base leading-6 mb-4">
                        <span className="font-bold">B</span> Wild tomatoes, which are native to the Andes region in South America, produce pea-sized fruits. Over many generations, peoples such as the Aztecs and Incas transformed the plant by selecting and breeding plants with mutations* in their genetic structure, which resulted in desirable traits such as larger fruit.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        But every time a single plant with a mutation is taken from a larger population for breeding, much genetic diversity is lost. And sometimes the desirable mutations come with less desirable traits. For instance, the tomato strains grown for supermarkets have lost much of their flavour.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        By comparing the genomes of modern plants to those of their wild relatives, biologists have been working out what genetic changes occurred as plants were domesticated. The teams in Brazil and China have now used this knowledge to reintroduce these changes from scratch while maintaining or even enhancing the desirable traits of wild strains.
                        </p>
                        <p className="text-xs text-gray-500 mt-4">
                        * mutations: changes in an organism’s genetic structure that can be passed down to later generations
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-base leading-6 mb-4">
                        <span className="font-bold">C</span> Kudla’s team made six changes altogether. For instance, they tripled the size of fruit by editing a gene called FRUIT WEIGHT, and increased the number of tomatoes per truss by editing another called MULTIFLORA.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        While the historical domestication of tomatoes reduced levels of the red pigment lycopene – thought to have potential health benefits – the team in Brazil managed to boost it instead. The wild tomato has twice as much lycopene as cultivated ones; the newly domesticated one has five times as much.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        ‘They are quite tasty,’ says Kudla. ‘A little bit strong. And very aromatic.’
                        </p>
                        <p className="text-base leading-6 mb-4">
                        The team in China re-domesticated several strains of wild tomatoes with desirable traits lost in domesticated tomatoes. In this way they managed to create a strain resistant to a common disease called bacterial spot race, which can devastate yields. They also created another strain that is more salt tolerant – and has higher levels of vitamin C.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-base leading-6 mb-4">
                        <span className="font-bold">D</span> Meanwhile, Joyce Van Eck at the Boyce Thompson Institute in New York state decided to use the same approach to domesticate the groundcherry or goldenberry (Physalis pruinosa) for the first time. This fruit looks similar to the closely related Cape gooseberry (Physalis peruviana).
                        </p>
                        <p className="text-base leading-6 mb-4">
                        Groundcherries are already sold to a limited extent in the US but they are hard to produce because the plant has a sprawling growth habit and the small fruits fall off the branches when ripe. Van Eck’s team has edited the plants to increase fruit size, make their growth more compact and to stop fruits dropping. ‘There’s potential for this to be a commercial crop,’ says Van Eck. But she adds that taking the work further would be expensive because of the need to pay for a licence for the CRISPR technology and get regulatory approval.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-base leading-6 mb-4">
                        <span className="font-bold">E</span> This approach could boost the use of many obscure plants, says Jonathan Jones of the Sainsbury Lab in the UK. But it will be hard for new foods to grow so popular with farmers and consumers that they become new staple crops, he thinks.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        The three teams already have their eye on other plants that could be ‘catapulted into the mainstream’, including foxtail, oat-grass and cowpea. By choosing wild plants that are drought or heat tolerant, says Gao, we could create crops that will thrive even as the planet warms.
                        </p>
                        <p className="text-base leading-6 mb-4">
                        But Kudla didn’t want to reveal which species were in his team’s sights, because CRISPR has made the process so easy. ‘Any one with the right skills could go to their lab and do this.’
                        </p>
                    </div>
                    </div>
        `,
        parts: [
            {
                id: 4,
                type: 'matching_headings',
                instruction: "Reading Passage 2 has five sections, A-E. Which section contains the following information? Write the correct letter, A-E, in boxes 14-18 on your answer sheet. You may use any letter more than once.",
                questions: [
                    {
                        number: 14,
                        question: "a reference to a type of tomato that can resist a dangerous infection",
                    },
                    {
                        number: 15,
                        question: "an explanation of how problems can arise from focusing only on a certain type of tomato plant.",
                    },
                    {
                        number: 16,
                        question: "a number of examples of plants that are not cultivated at present but could be useful a s food sources",
                    },
                    {
                        number: 17,
                        question: "a comparison between the early domestication of the tomato and more recent research",
                    },
                    {
                        number: 18,
                        question: "a personal reaction to the flavour of a tomato that has been genetically edited",
                    },
                ],
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E",
                }
            },
            {
                id: 5,
                type: 'matching_headings',
                instruction: "Look at the following statements (Questions 19-23) and the list of researchers below. Match each statement with the correct researcher, A-D. Write the correct letter, A-D, in boxes 19-23 on your answer sheet. You may use any letter more than once.",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2FTXx9UIizmorxstpgYcz0%2FScreenshot%202024-08-02%20at%2010.43.55.png?alt=media&token=28060635-e66d-4ebf-8fc3-7cc7bbdfea7a",
                questions: [
                    {
                        number: 19,
                        question: "Domestication of certain plants could allow them to adapt to future environmental challenges.",
                    },
                    {
                        number: 20,
                        question: "The idea of growing and eating unusual plants may not be accepted on a large scale.",
                    },
                    {
                        number: 21,
                        question: "It is not advisable for the future direction of certain research to be made public.",
                    },
                    {
                        number: 22,
                        question: "Present efforts to domesticate one wild fruit are limited by the costs involved.",
                    },
                    {
                        number: 23,
                        question: "Humans only make use of a small proportion of the plant food available on Earth.",
                    },
                ],
                options: {
                    A: "Jork Kudla",
                    B: "Caixia Gao",
                    C: "Joyce Van Eck",
                    D: "Jonathan Jones",
                }
            },
            {
                id: 6,
                type: 'gap_filling',
                instruction: "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 24-26 on your answer sheet.",
                questions: [{
                    number: 24,
                    question: "An undesirable trait such as loss of ..... in a tomato gene. may be caused by a mutation",
                   
                },
                {
                    number: 25,
                    question: "By modifying one gene in a tomato plant, researchers made the tomato three times Its original .....",
                 
                },
                {
                    number: 26,
                    question: "A type of tomato which was not badly affected by ....., and was rich in vitamin C, was produced by a team of researchers in China.",                 
                },
                ]
            },
        ]
    },
    {
        section: 3,
        html: `
                <div className="p-6 bg-white text-gray-900 max-w-4xl mx-auto">
                <div className="text-sm font-bold text-gray-500 mb-4">
                    You should spend about 20 minutes on <span className="font-bold">Questions 27–40</span>, which are based on Reading Passage 3 below.
                </div>
                <h1 className="text-xl font-bold text-center mb-6">Insight or evolution?</h1>
                <h2 className="text-lg font-semibold text-center mb-6 italic">
                    Two scientists consider the origins of discoveries and other innovative behavior
                </h2>

                <div className="mb-6">
                    <p className="text-base leading-6 mb-4">
                    Scientific discovery is popularly believed to result from the sheer genius of such intellectual stars as naturalist Charles Darwin and theoretical physicist Albert Einstein. Our view of such unique contributions to science often disregards the person’s prior experience and the efforts of their lesser-known predecessors. Conventional wisdom also places great weight on insight in promoting breakthrough scientific achievements, as if ideas spontaneously pop into someone’s head – fully formed and functional.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    There may be some limited truth to this view. However, we believe that it largely misrepresents the real nature of scientific discovery, as well as that of creativity and innovation in many other realms of human endeavor.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    Setting aside such greats as Darwin and Einstein – whose monumental contributions are duly celebrated – we suggest that innovation is more a process of trial and error, where two steps forward may sometimes come with one step back, as well as one or more steps to the right or left. This evolutionary view of human innovation undermines the notion of creative genius and recognizes the cumulative nature of scientific progress.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    Consider one unheralded scientist: John Nicholson, a mathematical physicist working in the 1910s who postulated the existence of ‘proto-elements’ in outer space. By combining different numbers of weights of these proto-elements’ atoms, Nicholson could recover the weights of all the elements in the then-known periodic table. These successes are all the more noteworthy given the fact that Nicholson was wrong about the presence of proto-elements: they do not actually exist. Yet, amid his often fanciful theories and wild speculations, Nicholson also proposed a novel theory about the structure of atoms. Niels Bohr, the Nobel prize-winning father of modern atomic theory, jumped off from this interesting idea to conceive his now-famous model of the atom.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    What are we to make of this story? One might simply conclude that science is a collective and cumulative enterprise. That may be true, but there may be a deeper insight to be gleaned. We propose that science is constantly evolving, much as species of animals do. In biological systems, organisms may display new characteristics that result from random genetic mutations. In the same way, random, arbitrary or accidental mutations of ideas may help pave the way for advances in science. If mutations prove beneficial, then the animal or the scientific theory will continue to thrive and perhaps reproduce.
                    </p>
                </div>

                <div className="mb-6">
                    <p className="text-base leading-6 mb-4">
                    Support for this evolutionary view of behavioral innovation comes from many domains. Consider one example of an influential innovation in US horseracing. The so-called ‘acey-deucy’ stirrup placement, in which the rider’s foot in his left stirrup is placed as much as 25 centimeters lower than the right, is believed to confer important speed advantages when turning on oval tracks. It was developed by a relatively unknown jockey named Jackie Westrope. Had Westrope conducted methodical investigations or examined extensive film records in a shrewd plan to outrun his rivals? Had he foreseen the speed advantage that would be conferred by riding acey-deucy? No. He suffered a leg injury, which left him unable to fully bend his left knee. His modification just happened to coincide with enhanced left-hand turning performance. This led to the rapid and widespread adoption of riding acey-deucy by many riders, a racing style which continues in today’s thoroughbred racing.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    Plenty of other stories show that fresh advances can arise from error, misadventure, and also pure serendipity – a happy accident. For example, in the early 1970s, two employees of the company 3M each had a problem: Spencer Silver had a product – a glue which was only slightly sticky – and no use for it, while his colleague Art Fry was trying to figure out how to affix temporary bookmarks in his hymn book without damaging its pages. The solution to both these problems was the invention of the brilliantly simple yet phenomenally successful Post-It note. Such examples give lie to the claim that ingenious, designing minds are responsible for human creativity and invention. Far more banal and mechanical forces may be at work; forces that are fundamentally connected to the laws of science.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    The notions of insight, creativity and genius are often invoked, but they remain vague and of doubtful scientific utility, especially when one considers the diverse and enduring contributions of individuals such as Plato, Leonardo da Vinci, Shakespeare, Beethoven, Galileo, Newton, Kepler, Curie, Pasteur and Edison. These notions merely label rather than explain the evolution of human innovations. We need another approach, and there is a promising candidate.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    The Law of Effect was advanced by psychologist Edward Thorndike in 1898, some 40 years after Charles Darwin published his groundbreaking work on biological evolution, <span className="italic">On the Origin of Species</span>. This simple law holds that organisms tend to repeat successful behaviors and to refrain from performing unsuccessful ones. Just like Darwin’s Law of Natural Selection, the Law of Effect involves an entirely mechanical process of variation and selection, without any end objective in sight.
                    </p>
                    <p className="text-base leading-6 mb-4">
                    Of course, the origin of human innovation demands much further study. In particular, the provenance of the raw material on which the Law of Effect operates is not as clearly known as that of the genetic mutations on which the Law of Natural Selection operates. The generation of novel ideas and behaviors may not be entirely random, but constrained by prior successes and failures – of the current individual (such as Bohr) or of predecessors (such as Nicholson).
                    </p>
                    <p className="text-base leading-6 mb-4">
                    The time seems right for abandoning the naive notions of intelligent design and genius, and for scientifically exploring the true origins of creative behavior.
                    </p>
                </div>
                </div>
        `,
        parts: [
            {
                id: 7,
                type: 'multiple_choice',
                instruction: "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 27-31 on your answer sheet.",
                questions: [{
                    number: 27,
                    question: "The purpose of the first paragraph is to",
                    options: [
                        "A. defend particular ideas.",
                        "B. compare certain beliefs.",
                        "C. disprove a widely held view.",
                        "D. outline a common assumption."
                    ],
                    
                },
                {
                    number: 28,
                    question: "What are the writers doing in the second paragraph?",
                    options: [
                        "A. criticising an opinion",
                        "B. justifying a standpoint",
                        "C. explaining an approach",
                        "D. supporting an argument"
                    ],
                   
                },
                {
                    number: 29,
                    question: "In the third paragraph, what do the writers suggest about Darwin and Einstein?",
                    options: [
                        "A. They represent an exception to a general rule.",
                        "B. Their way of working has been misunderstood.",
                        "C. They are an ideal which others should aspire to.",
                        "D. Their achievements deserve greater recognition."
                    ],
                    
                },
                {
                    number: 30,
                    question: "John Nicholson is an example of a person whose idea",
                    options: [
                        "A. established his reputation as an influential scientist.",
                        "B. was only fully understood at a later point in history.",
                        "C. laid the foundations for someone else's breakthrough.",
                        "D. initially met with scepticism from the scientific community."
                    ],
                
                },
                {
                    number: 31,
                    question: "What is the key point of interest about the 'acey-deucy' stirrup placement?",
                    options: [
                        "A. the simple reason why it was invented",
                        "B. the enthusiasm with which it was adopted",
                        "C. the research that went into its development",
                        "D. the cleverness of the person who first used it"
                    ],
           
                }
                ]
            },
            {
                id: 8,
                type: 'yes_no_not_given',
                instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?",
                image: "https://firebasestorage.googleapis.com/v0/b/ielts-ai-b1478.appspot.com/o/reading%2FTXx9UIizmorxstpgYcz0%2FScreenshot%202024-08-02%20at%2011.06.29.png?alt=media&token=90c50a2f-902a-4a71-afbe-9a00ed6e0168",
                questions: [
                    {
                        number: 32,
                        question: "Acknowledging people such as Plato or da Vinci as geniuses will help us understand the process by which great minds create new ideas.Charles chose Pepys for the task because he considered him to be trustworthy.",
     
                    },
                    {
                        number: 33,
                        question: "The Law of Effect was discovered at a time when psychologists were seeking a scientific reason why creativity occurs.",
                 
                    },
                    {
                        number: 34,
                        question: "The Law of Effect states that no planning is involved in the behaviour of organisms.",
                    
                    },
                    {
                        number: 35,
                        question: "The Law of Effect sets out clear explanations about the sources of new ideas and behaviours.",
                  
                    },
                    {
                        number: 36,
                        question: "Many scientists are now turning away from the notion of intelligent design and genius.",
                  
                    },
                ],
            },
            {
                id: 9,
                type: 'gap_filling',
                instruction: "Complete the summary using the list of words, A-G, below.",
                html : `
                <div className="p-6 bg-white text-gray-900 max-w-4xl mx-auto border border-gray-400 rounded-lg">
                    <p className="text-base leading-6 mb-4">
                        Write the correct letter, <span className="font-bold">A–G</span>, in boxes 37–40 on your answer sheet.
                    </p>
                    
                    <h1 className="text-xl font-bold text-center mb-6">The origins of creative behaviour</h1>
                    
                    <p className="text-base leading-6 mb-4">
                        The traditional view of scientific discovery is that breakthroughs happen when a single great mind has sudden 
                        <input 
                        name="37" 
                        type="text" 
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        . Although this can occur, it is not often the case. Advances are more likely to be the result of a longer process. In some cases, this process involves 
                        <input 
                        name="38" 
                        type="text" 
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        , such as Nicholson’s theory about proto-elements. In others, simple necessity may provoke innovation, as with Westrope’s decision to modify the position of his riding stirrups. There is also often an element of 
                        <input 
                        name="39" 
                        type="text" 
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        , for example, the coincidence of ideas that led to the invention of the Post-It note. With both the Law of Natural Selection and the Law of Effect, there may be no clear 
                        <input 
                        name="40" 
                        type="text" 
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-600 ml-2" 
                        />
                        involved, but merely a process of variation and selection.
                    </p>
                    </div>
                `
            },
            
            
        ]
    }


]

module.exports =  {question}