"use client"
import React, { useState, useEffect } from 'react';
import { FirestoreDB } from '@/service/firebase';
import { doc, query, getDocs, where, collection } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import DisplayMaterial from './DisplayMaterial';
import { Lock } from 'lucide-react';
import withUser from "@/hooks/withUser";
import { useUser } from "@/service/user";


function capitalizeTxt(txt) {
    if(!txt) {
        return null;
    }
    return txt.charAt(0).toUpperCase() + txt.slice(1); 
  }

  const miniPractices = [
    {
        skill: 'reading',
        icon: '📚',
        exercises: [
            { title: 'Skimming for Main Ideas', focus: 'Comprehension', cat: 'skimming' },
            { title: 'Scanning for Specific Information', focus: 'Speed Reading', cat: 'scanning' },
            { title: 'Matching Headings', focus: 'Text Organization', cat:'matching-heading'},
            { title: 'True/False/Not Given', focus: 'Critical Thinking', cat: 'true-false' },
            { title: 'Yes/No/Not Given', focus: 'Attention to Detail', cat: 'yes-no' },
            { title: 'Multiple Choice', focus: 'Inference', cat: 'multiple-choice' },
            { title: 'Matching Information', focus: 'Paragraph Analysis', cat: 'matching-information' },
            { title: 'Sentence Completion', focus: 'Vocabulary', cat: 'sentence-completion' },
            { title: 'Summary Completion', focus: 'Concise Writing', cat: 'summary-completion' },
            { title: 'Diagram Labelling', focus: 'Visual Comprehension', cat: 'diagram-labelling' },
            { title: 'Short Answer Questions', focus: 'Precise Information Retrieval', cat: 'short-answer' },
            { title: 'Table Completion', focus: 'Data Interpretation', cat: 'table-completion' }
        ]
    },
    {
        skill: 'writing',
        icon: '✍️',
        exercises: [
            { title: 'Task 1: Data Description (Charts/Graphs)', focus: 'Data Analysis', cat: 'data-description' },
            { title: 'Task 1: Process Description', focus: 'Sequential Writing', cat: 'process-description' },
            { title: 'Task 1: Map Description', focus: 'Spatial Analysis', cat: 'map-description' },
            { title: 'Task 2: Opinion Essay', focus: 'Argumentation', cat: 'opinion-essay' },
            { title: 'Task 2: Advantage/Disadvantage Essay', focus: 'Critical Analysis', cat: 'advantage-disadvantage' },
            { title: 'Task 2: Problem/Solution Essay', focus: 'Analytical Thinking', cat: 'problem-solution' },
            { title: 'Task 2: Discussion Essay', focus: 'Balanced Writing', cat: 'discussion-essay' },
            { title: 'Paraphrasing Practice', focus: 'Lexical Resource', cat: 'paraphrasing' },
            { title: 'Coherence and Cohesion Drills', focus: 'Text Organization', cat: 'coherence-cohesion' },
            { title: 'Grammar Focus: Complex Sentences', focus: 'Grammatical Range', cat: 'grammar-complex' },
            { title: 'Vocabulary Enhancement', focus: 'Lexical Precision', cat: 'vocabulary' },
            { title: 'Time Management Drills', focus: 'Efficiency', cat: 'time-management' }
        ]
    },
    {
        skill: 'listening',
        icon: '🎧',
        exercises: [
            { title: 'Form Completion', focus: 'Factual Information', cat: 'form-completion' },
            { title: 'Multiple Choice', focus: 'Main Idea & Detail', cat: 'multiple-choice' },
            { title: 'Matching', focus: 'Classification', cat: 'matching' },
            { title: 'Plan/Map/Diagram Labelling', focus: 'Visual Information', cat: 'diagram-labelling' },
            { title: 'Note Completion', focus: 'Summary Skills', cat: 'note-completion' },
            { title: 'Sentence Completion', focus: 'Specific Information', cat: 'sentence-completion' },
            { title: 'Short Answer Questions', focus: 'Comprehension', cat: 'short-answer' },
            { title: 'Table Completion', focus: 'Information Organization', cat: 'table-completion' },
            { title: 'Flow-Chart Completion', focus: 'Process Understanding', cat: 'flow-chart' },
            { title: 'Summary Completion', focus: 'Overall Understanding', cat: 'summary-completion' },
            { title: 'Predicting Answers', focus: 'Anticipation Skills', cat: 'predicting' },
            { title: 'Recognizing Distractors', focus: 'Critical Listening', cat: 'distractors' }
        ]
    },
    {
        skill: 'speaking',
        icon: '🗣️',
        exercises: [
            { title: 'Part 1: Personal Questions', focus: 'Fluency', cat: 'personal-questions' },
            { title: 'Part 2: Cue Card Practice', focus: 'Coherent Narratives', cat: 'cue-card' },
            { title: 'Part 3: Discussion', focus: 'Critical Thinking', cat: 'discussion' },
            { title: 'Pronunciation Drills', focus: 'Clear Speech', cat: 'pronunciation' },
            { title: 'Intonation Practice', focus: 'Natural Speech', cat: 'intonation' },
            { title: 'Vocabulary Building for Common Topics', focus: 'Lexical Resource', cat: 'vocabulary-topics' },
            { title: 'Storytelling Techniques', focus: 'Engaging Responses', cat: 'storytelling' },
            { title: 'Paraphrasing and Clarification', focus: 'Communication Strategies', cat: 'paraphrasing' },
            { title: 'Expressing and Justifying Opinions', focus: 'Argumentation', cat: 'opinions' },
            { title: 'Comparing and Contrasting', focus: 'Analytical Speaking', cat: 'comparing' },
            { title: 'Speculating and Hypothesizing', focus: 'Abstract Thinking', cat: 'speculating' },
            { title: 'Impromptu Speaking', focus: 'Spontaneity', cat: 'impromptu' }
        ]
    }
];

const MiniPractice = () => {
    const [selectedSkill, setSelectedSkill] = useState(miniPractices[0].skill);
    const [hoveredExercise, setHoveredExercise] = useState(null);
    const [materials, setMaterials] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [loading, setLoading] = useState(false);
    const db = FirestoreDB();
    const params = useSearchParams();
    const router = useRouter();
    
    // Get user data using useUser hook
    const { userState } = useUser();
    
    // Determine premium status from userState
    const isPremiumUser = userState?.subscribtion?.toUpperCase() === "PREMIUM";
    console.info(userState);

    function handleSelect(material) {
        if (canAccessMaterial(material)) {
            setSelectedMaterial(material.id);
        } else {
            handlePremiumPrompt();
        }
    }

    const canAccessMaterial = (material) => {
        return material.isFree || isPremiumUser;
    };

    const handlePremiumPrompt = () => {
        alert('This content is for premium users only. Please upgrade to access.');
    };

    const isCategoryValid = (cat, skill) => {
        return miniPractices.some(skillGroup => 
            skillGroup.skill === skill && skillGroup.exercises.some(exercise => exercise.cat === cat)
        );
    };
    
    const getAllCategories = () => {
        return miniPractices.reduce((cats, skillGroup) => {
            const skillCats = skillGroup.exercises.map(ex => ({
                cat: ex.cat,
                skill: skillGroup.skill
            }));
            return [...cats, ...skillCats];
        }, []);
    };

    const handleClick = (cat, skill) => {
        if (!cat || !skill) {
            return;
        }
        
        if (isCategoryValid(cat, skill)) {
            router.replace(`/dashboard/exercises?cat=${cat}&skill=${skill}`);
        } else {
            console.warn(`Invalid category or skill: ${cat}, ${skill}`);
        }
    };
    
    const handleBack = () => {
        const searchCat = params.get('cat');
        const searchSkill = params.get('skill');
        const validCategories = getAllCategories();
        
        if (searchCat && searchSkill && validCategories.some(item => 
            item.cat === searchCat && item.skill === searchSkill)) {
            router.replace('/dashboard/exercises');
        } else {
            router.back();
        }
    };

    const getExerciseByCategory = (cat, skill) => {
        const skillGroup = miniPractices.find(group => group.skill === skill);
        if (skillGroup) {
            const exercise = skillGroup.exercises.find(ex => ex.cat === cat);
            if (exercise) {
                return {
                    ...exercise,
                    skillGroup: skillGroup.skill,
                    icon: skillGroup.icon
                };
            }
        }
        return null;
    };

    useEffect(() => {
        async function getDocuments(collectionName, conditions) {
            setLoading(true);
            let q = query(collection(db, collectionName));
            
            conditions.forEach(condition => {
                q = query(q, where(condition.field, condition.operator, condition.value));
            });
          
            const querySnapshot = await getDocs(q);
            const result = [];
            querySnapshot.forEach((doc) => {
                result.push({id: doc.id, ...doc.data()});
            });
            setLoading(false);
            setMaterials(result);
        }

        const cat = params.get('cat');
        const skill = params.get('skill');

        if (cat && skill) {
            getDocuments("mini-exercises", [
                { field: "cat", operator: "==", value: cat },
                { field: "skill", operator: "==", value: skill }
            ]);
        } else {
            setMaterials(null);
        }
    }, [params]);

    if (loading) {
        return <Loader />;
    }

    console.info(materials);
    return (
        <div className="container mx-auto p-6 min-h-screen">
            <Breadcrumb pageName={capitalizeTxt(params.get('cat')) || "Mini Exercise"}/>
            {selectedMaterial && <DisplayMaterial id={selectedMaterial} onClose={() => setSelectedMaterial(null)}/>}
            <div className="absolute inset-0 overflow-hidden dark:bg-slate-900 dark:text-slate-700 z-0">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            {!materials ? (
                <div className="max-w-7xl mx-auto relative">
                    <h1 className="text-4xl font-bold mb-12 text-center text-slate-800 tracking-tight dark:text-slate-100 z-10">
                        IELTS Mini Exercise
                    </h1>
                </div>
            ) : (
                <button
                    onClick={handleBack}
                    className="left-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 hover:bg-orange-400 z-10 relative shadow-lg"
                >
                    Back
                </button>
            )}

            {/* Categories Row */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 z-10">
                {!materials && miniPractices.map((category, index) => (
                    <button
                        key={index}
                        className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg z-10
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
                {!materials && miniPractices.find(category => category.skill === selectedSkill).exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className={`group bg-white dark:bg-slate-500 p-6 rounded-md shadow-md transition-all duration-300 
                        hover:shadow-xl hover:scale-105 cursor-pointer transform min-h-[10rem]
                        ${hoveredExercise === index ? 'rotate-y-180' : ''}`}
                        onMouseEnter={() => setHoveredExercise(index)}
                        onMouseLeave={() => setHoveredExercise(null)}
                        onClick={() => handleClick(exercise.cat, selectedSkill)}
                    >
                        <div className={`transition-all duration-300 ${hoveredExercise === index ? 'opacity-0' : 'opacity-100'}`}>
                            <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {exercise.title}
                            </h3>
                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-lg">
                                {exercise.focus}
                            </span>
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center bg-orange-400 text-white rounded-md p-4 transition-all duration-300 
                             ${hoveredExercise === index ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}>
                            <p className="text-center">Click to start practice on <strong>{exercise.title}</strong></p>
                        </div>
                    </div>
                ))}
                
                {materials && materials.map((material, index) => (
                    <div
                        key={index}
                        className={`group bg-white dark:bg-slate-500 p-6 rounded-md shadow-md transition-all duration-300 
                        hover:shadow-xl hover:scale-105 cursor-pointer transform relative
                        ${hoveredExercise === index ? 'rotate-y-180' : ''}
                        ${!canAccessMaterial(material) ? 'opacity-75' : ''}`}
                        onMouseEnter={() => setHoveredExercise(index)}
                        onMouseLeave={() => setHoveredExercise(null)}
                        onClick={() => handleSelect(material)}
                    >
                        {/* Premium Lock Icon */}
                        {!material.isFree && !isPremiumUser && (
                            <div className="absolute top-2 right-2 text-amber-500">
                                <Lock className="w-5 h-5" />
                            </div>
                        )}
                        
                        <div className={`transition-all duration-300 ${hoveredExercise === index ? 'opacity-0' : 'opacity-100'}`}>
                            <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {material.title}
                            </h3>
                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-lg">
                                {material.cat}
                            </span>
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center bg-orange-400 text-white rounded-md p-4 transition-all duration-300 
                             ${hoveredExercise === index ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}>
                            <p className="text-center">
                                {canAccessMaterial(material) 
                                    ? `Click to start practice on ${material.title}`
                                    : 'Upgrade to Premium to access this content'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniPractice;