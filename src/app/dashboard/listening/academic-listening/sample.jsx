

export const listening_questions = [
    {
      id: 1,
      type: 'multiple-choice',
      instruction: 'Choose the correct letter, A, B, C, or D.',
      number: 1,
      question: 'What is the main topic of the lecture?',
      options: ['A. Climate change', 'B. Renewable energy', 'C. Ocean pollution', 'D. Deforestation'],
      correctAnswer: 'B. Renewable energy'
    },
    {
      id: 2,
      number: 2,
      type: 'short-answer',
      instruction: 'Complete the sentence below. Write NO MORE THAN THREE WORDS for the answer.',
      question: 'The Industrial Revolution began in the year _______.',
      correctAnswer: '1760'
    },
    {
      id: 3,
      number: 4,
      type: 'sentence-completion',
      instruction: 'Complete the sentence below. Write NO MORE THAN TWO WORDS for the answer.',
      question: 'The Great Barrier Reef is the world\'s largest _______ system.',
      correctAnswer: 'coral'
    },
    {
      id: 4,
      type: 'table-completion',
      instruction: 'Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
      question: 'Information about renewable energy sources:',
      table: [
        ['Energy Source', 'Advantage', 'Disadvantage'],
        ['Solar', '4) _______', 'Weather dependent'],
        ['Wind', 'Clean energy', '5) _______'],
        ['6) _______', 'Constant power', 'Limited locations']
      ],
      answers: ['No fuel costs', 'Noise pollution', 'Geothermal']
    },
    {
      id: 5,
      type: 'diagram-labelling',
      instruction: 'Label the diagram below. Choose NO MORE THAN THREE WORDS from the box for each answer.',
      question: 'Parts of a plant cell:',
      image: '/images/task/task-01.jpg',
      labels: [
        { id: 7, x: 50, y: 50 },
        { id: 8, x: 150, y: 200 },
        { id: 9, x: 200, y: 150 }
      ],
      options: ['Nucleus', 'Chloroplast', 'Cell wall', 'Mitochondria', 'Vacuole'],
      correctAnswers: { 7: 'Nucleus', 8: 'Chloroplast', 9: 'Cell wall' }
    },
    {
      id: 6,
      type: 'classification',
      instruction: 'Classify the following animals into the correct category. You may use each category more than once.',
      question: 'Animals:',
      items: ['10. Eagle', '11. Crocodile', '12. Dolphin', '13. Snake', '14. Penguin', '15. Elephant'],
      categories: ['A. Mammals', 'B. Reptiles', 'C. Birds'],
      correctClassification: {
        'A. Mammals': ['Dolphin', 'Elephant'],
        'B. Reptiles': ['Crocodile', 'Snake'],
        'C. Birds': ['Eagle', 'Penguin']
      }
    },
    {
      id: 7,
      type: 'matching',
      instruction: 'Match each invention to its inventor. Write the correct letter, A-D, next to questions 16-19.',
      question: 'Inventions and Inventors:',
      items: ['16. Telephone', '17. Light bulb', '18. Theory of Relativity', '19. Penicillin'],
      options: ['A. Alexander Graham Bell', 'B. Thomas Edison', 'C. Albert Einstein', 'D. Alexander Fleming'],
      correctAnswers: {
        'Telephone': 'A. Alexander Graham Bell',
        'Light bulb': 'B. Thomas Edison',
        'Theory of Relativity': 'C. Albert Einstein',
        'Penicillin': 'D. Alexander Fleming'
      }
    },
    {
        id: 8,
        type: 'multiple-choice',
        instruction: 'Choose the correct letter, A, B, or D.',
        number: 11,
        question:'Why does the speaker apologise about the seats?',
        options: ['A. They are too small.', 'B. There are not enough of them.', 'C. Some of them are very close together.'],
        correctAnswer: 'B. There are not enough of them.'
    },
    {
        id: 9,
        type: 'table-completion',
        instruction: 'Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
        question: 'Information about Transport survey:',
        table: [
          ['Name:', 'Sades Jones'],
          ['Year if Birth:', '1991'],
          ['Postcode:', '1) _______'],
          ['Travelling Bus:'],
          ['Date of bus journey:', '2) _____'],
          ['Reason for trip:', 'shopping and visit to the 3) _____'],
          ['Travelled by bus because cost of: ', '4) _____ too high'],
          ['Got on bus at:', '5) _____ Street'],
          ['Complaints about bus service:', ['- bus today was 6) _____', '- frequency of buses in the 7) _____', '- Late']],
          ['Travelling by car'],
          ['Dislikes travelling by bike in the city centre because of the:','9) _____'],
          ['Doesn’t own a bike because of a lack of:', '10) ______']
        ],
        answers: ['']
      },
  ];