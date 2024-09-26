"use client"
import React, { useState, useEffect } from 'react';
import { ErrorMessage } from '../_components/Alert';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Mail, Upload, AlertCircle } from 'lucide-react';
import { MessageSquare, ThumbsUp, Award } from 'lucide-react';
import { FirebaseStorge } from '@/service/firebase';
import withUser from '@/hooks/withUser';
import { useUser } from '@/service/user';
import { FirestoreDB } from '@/service/firebase';
import { collection, addDoc } from 'firebase/firestore';

const storage = FirebaseStorge();

const FeedbackForm = () => {
    const user = useUser();
    const {userState} = user;
    const initData = {
        name: userState.name,
        email: userState.email,
        subject: '',
        message: '',
        file: '',
    }
    const [formData, setFormData] = useState(initData);
    const [file, setFile] = useState(null);
    const db = FirestoreDB();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const feedbackPoints = [
        { icon: MessageSquare, title: "Share Thoughts", description: "Your voice shapes our future" },
        { icon: ThumbsUp, title: "Drive Improvement", description: "Your feedback, our catalyst" },
        { icon: Award, title: "Co-create Success", description: "Be part of our journey" }
    ];


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadProgress(0);
    };


    const uploadFile = async (file) => {
        const storageRef = ref(storage, 'feedback/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFormData(prev => ({ ...prev, file: downloadURL }));
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // if (file) {
            //     await uploadFile(file);
            // }
            // // Handle form submission (e.g., send data to backend)
            await addDoc(collection(db, 'feedback'), {
                ...formData,
                createdAt: new Date()
            });
            // Reset form after successful submission
            setFormData(initData);
            setFile(null);
            setUploadProgress(0);
            alert('Feedback submitted successfully!');
        } catch (error) {
            ErrorMessage(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        if (file) {
            uploadFile(file);
        }

    }, [file])

    return (
        <div className="bg-white  rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative space-y-6 p-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-2xl rounded-tl-2xl shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-10 backdrop-filter backdrop-blur-lg"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-4">Feedback</h2>
                        <p className="text-indigo-100 text-lg mb-8">
                            Help us evolve. Your insights drive our innovation.
                        </p>
                        <div className="space-y-4">
                            {feedbackPoints.map((point, index) => (
                                <div
                                    key={index}
                                    className={`group flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${activeIndex === index ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                                        }`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full mr-4 transition-all duration-300 ${activeIndex === index ? 'bg-white text-indigo-600' : 'bg-indigo-400 text-white group-hover:bg-white group-hover:text-indigo-600'
                                        }`}>
                                        <point.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">
                                            {point.title}
                                        </h3>
                                        <p className="text-indigo-100 text-sm">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-8">
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Form</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <div className="flex items-center">
                                <AlertCircle className="mr-2" size={20} />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.displayName}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        disabled
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        disabled
                        required
                    />

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        rows="8"
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        onChange={handleChange}
                    ></textarea>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <label htmlFor="file-upload" className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition flex items-center space-x-2">
                                <Upload size={20} />
                                <span>Upload File</span>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {file && <span className="text-sm text-gray-600">{file.name}</span>}
                        </div>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div
                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full flex flex-row px-4 gap-2 bg-blue-600 text-white rounded-lg font-semibold py-3 hover:bg-orange-400 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        <Mail size={24} />
                        {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withUser(FeedbackForm);