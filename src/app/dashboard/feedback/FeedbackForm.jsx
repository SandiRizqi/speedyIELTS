"use client"
import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { MapPin, Mail, Upload, AlertCircle } from 'lucide-react';
import { FirebaseStorge } from '@/service/firebase';
import withUser from '@/hooks/withUser';
import { useUser } from '@/service/user';

const storage = FirebaseStorge();

const FeedbackForm = () => {
    const user = useUser();
    const [formData, setFormData] = useState({
        name: user.displayName,
        email: user.email,
        subject: '',
        message: '',
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
            if (file) {
                await uploadFile(file);
            }
            // Handle form submission (e.g., send data to backend)
            console.log(formData);
            // Reset form after successful submission
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setFile(null);
            setUploadProgress(0);
            alert('Form submitted successfully!');
        } catch (error) {
            if (error.code === 'storage/unauthorized') {
                setError('Error: Firebase Storage access denied. Please check your Firebase security rules.');
            } else {
                setError('An error occurred. Please try again later.');
            }
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-indigo-900">Send Us Your Feedback</h2>
                    <p className="text-gray-600">
                        Your feedback is invaluable to us and helps us improve our services.
                    </p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        value={formData.name}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        disabled
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        disabled
                        required
                    />

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        rows="4"
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                    ></textarea>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <label htmlFor="file-upload" className="cursor-pointer bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition flex items-center space-x-2">
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
                        className="w-full bg-blue-600 text-white font-semibold py-3 hover:bg-orange-400 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withUser(FeedbackForm);