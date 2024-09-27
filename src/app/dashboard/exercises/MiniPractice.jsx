"use client"
import React, { useState } from 'react';

const miniPractices = [
    {
      skill: 'Reading',
      icon: '📚',
      exercises: [
        { title: 'Skimming for Main Ideas', focus: 'Comprehension' },
        { title: 'Scanning for Specific Information', focus: 'Speed Reading' },
        { title: 'Matching Headings', focus: 'Text Organization' },
        { title: 'True/False/Not Given', focus: 'Critical Thinking' },
        { title: 'Yes/No/Not Given', focus: 'Attention to Detail' },
        { title: 'Multiple Choice', focus: 'Inference' },
        { title: 'Matching Information', focus: 'Paragraph Analysis' },
        { title: 'Sentence Completion', focus: 'Vocabulary' },
        { title: 'Summary Completion', focus: 'Concise Writing' },
        { title: 'Diagram Labelling', focus: 'Visual Comprehension' },
        { title: 'Short Answer Questions', focus: 'Precise Information Retrieval' },
        { title: 'Table Completion', focus: 'Data Interpretation' }
      ]
    },
    {
      skill: 'Writing',
      icon: '✍️',
      exercises: [
        { title: 'Task 1: Data Description (Charts/Graphs)', focus: 'Data Analysis' },
        { title: 'Task 1: Process Description', focus: 'Sequential Writing' },
        { title: 'Task 1: Map Description', focus: 'Spatial Analysis' },
        { title: 'Task 2: Opinion Essay', focus: 'Argumentation' },
        { title: 'Task 2: Advantage/Disadvantage Essay', focus: 'Critical Analysis' },
        { title: 'Task 2: Problem/Solution Essay', focus: 'Analytical Thinking' },
        { title: 'Task 2: Discussion Essay', focus: 'Balanced Writing' },
        { title: 'Paraphrasing Practice', focus: 'Lexical Resource' },
        { title: 'Coherence and Cohesion Drills', focus: 'Text Organization' },
        { title: 'Grammar Focus: Complex Sentences', focus: 'Grammatical Range' },
        { title: 'Vocabulary Enhancement', focus: 'Lexical Precision' },
        { title: 'Time Management Drills', focus: 'Efficiency' }
      ]
    },
    {
      skill: 'Listening',
      icon: '🎧',
      exercises: [
        { title: 'Form Completion', focus: 'Factual Information' },
        { title: 'Multiple Choice', focus: 'Main Idea & Detail' },
        { title: 'Matching', focus: 'Classification' },
        { title: 'Plan/Map/Diagram Labelling', focus: 'Visual Information' },
        { title: 'Note Completion', focus: 'Summary Skills' },
        { title: 'Sentence Completion', focus: 'Specific Information' },
        { title: 'Short Answer Questions', focus: 'Comprehension' },
        { title: 'Table Completion', focus: 'Information Organization' },
        { title: 'Flow-Chart Completion', focus: 'Process Understanding' },
        { title: 'Summary Completion', focus: 'Overall Understanding' },
        { title: 'Predicting Answers', focus: 'Anticipation Skills' },
        { title: 'Recognizing Distractors', focus: 'Critical Listening' }
      ]
    },
    {
      skill: 'Speaking',
      icon: '🗣️',
      exercises: [
        { title: 'Part 1: Personal Questions', focus: 'Fluency' },
        { title: 'Part 2: Cue Card Practice', focus: 'Coherent Narratives' },
        { title: 'Part 3: Discussion', focus: 'Critical Thinking' },
        { title: 'Pronunciation Drills', focus: 'Clear Speech' },
        { title: 'Intonation Practice', focus: 'Natural Speech' },
        { title: 'Vocabulary Building for Common Topics', focus: 'Lexical Resource' },
        { title: 'Storytelling Techniques', focus: 'Engaging Responses' },
        { title: 'Paraphrasing and Clarification', focus: 'Communication Strategies' },
        { title: 'Expressing and Justifying Opinions', focus: 'Argumentation' },
        { title: 'Comparing and Contrasting', focus: 'Analytical Speaking' },
        { title: 'Speculating and Hypothesizing', focus: 'Abstract Thinking' },
        { title: 'Impromptu Speaking', focus: 'Spontaneity' }
      ]
    }
  ];

const MiniPractice = () => {
  const [selectedSkill, setSelectedSkill] = useState(miniPractices[0].skill);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center text-slate-800 tracking-tight dark:text-white">
        IELTS Practice Exercises
      </h1>
      
      {/* Categories Row */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {miniPractices.map((category, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg
                       ${selectedSkill === category.skill 
                         ? 'bg-blue-600 text-white' 
                         : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            onClick={() => setSelectedSkill(category.skill)}
          >
            <span className="mr-2" role="img" aria-label={category.skill}>
              {category.icon}
            </span>
            {category.skill}
          </button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000">
        {miniPractices.find(category => category.skill === selectedSkill).exercises.map((exercise, index) => (
          <div 
            key={index}
            className={`group bg-white dark:bg-slate-500 p-6 rounded-xl shadow-md transition-all duration-300 
                        hover:shadow-xl hover:scale-105 cursor-pointer transform 
                        ${hoveredExercise === index ? 'rotate-y-180' : ''}`}
            onMouseEnter={() => setHoveredExercise(index)}
            onMouseLeave={() => setHoveredExercise(null)}
          >
            <div className={`transition-all duration-300 ${hoveredExercise === index ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {exercise.title}
              </h3>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                {exercise.focus}
              </span>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center bg-orange-400 text-white rounded-xl p-4 transition-all duration-300 
                             ${hoveredExercise === index ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}>
              <p className="text-center">Click to start practice on {exercise.title}</p>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default MiniPractice;