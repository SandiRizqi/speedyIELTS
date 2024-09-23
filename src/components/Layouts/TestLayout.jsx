"use client";
import React, { useState, ReactNode, useEffect } from "react";
import withProtected from "@/hooks/withProtected";
import withUser from "@/hooks/withUser";
import { Clock, Maximize, Notebook } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import { FirebaseRealtimeDatabase } from "@/service/firebase";
import { ref, onValue } from "firebase/database";
import { motion } from 'framer-motion';

const TestLayout = ({ children, activePart, setActivePart, onSubmit, tabs, time, loading, finish, onCancel, labels, Answers, Corrections }) => {
  const [timeLeft, setTimeLeft] = useState(time * 60); // 60 minutes in seconds
  const [isOnline, setIsOnline] = useState(false); 
  const realDb = FirebaseRealtimeDatabase();
  const path = usePathname();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);


  useEffect(() => {
    // Reference to the /online path in the Realtime Database
    const statusRef = ref(realDb, ".info/connected");

    // Listener for value changes in the database
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status === true) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    }, 
    // Optional: Handle any errors, such as loss of connection
    (error) => {
      console.error(error);
      setIsOnline(false); // Set to offline in case of error
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleCancelClick = () => {

    if (finish) {
      return handleGoBack();
    }
    setShowConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirm(false);
    if (onCancel) {
      return onCancel();
    }
    handleGoBack();
  };

  const handleClosePopup = () => {
    setShowConfirm(false);
  };



  const toggleFullscreen = () => {
    const elem = document.getElementById("testlayouter"); // Target the element by its id

    if (!isFullscreen && elem) {
      // Enter fullscreen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };



  const handleGoBack = () => {
    const currentPath = path; // Get the current path
    const pathSegments = currentPath.split('/').filter(Boolean); // Split and remove empty segments
    pathSegments.pop(); // Remove the last segment
    const newPath = '/' + pathSegments.join('/'); // Join the remaining segments to form the new path

    router.replace(newPath); // Navigate to the new path
  };

  const toggleAnswers = () => {
    setIsAnswerOpen(!isAnswerOpen);
  };


  const handleSubmit = () => {
    onSubmit();
    //setIsFinish(true);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!timeLeft) {
      handleSubmit();
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  const OnlineStatus = ({status, size='medium'}) => {
    const sizeClasses = {
      small: 'w-2 h-2',
      medium: 'w-3 h-3',
      large: 'w-4 h-4'
    };

    return (<>
      <motion.div
      className={`${sizeClasses[size]} rounded-full ${status ? 'bg-green-500' : 'bg-danger'}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: status ? 1 : 0.3 }}
    >
      {status && (
        <motion.div
          className="w-full h-full rounded-full bg-green-500 opacity-75"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.div>
    </>
    )
  }


  const MobileHeader = () => {
    return (
      (
        <>
          {/* Header */}
          <header className="bg-white shadow-lg p-4 dark:bg-slate-900 z-1">
            {/* Top section: Logo and Timer (always visible) */}
            <div className="flex justify-between items-center w-full">
              <img src="/images/logo/type/logo_round.png" alt="Logo" className="h-10" />
              {!finish && (
                <div className="flex items-center space-x-2">
                  <Clock size={24} className="text-slate-500" />
                  <span className="text-slate-700 dark:text-white">{formatTime(timeLeft)}</span>
                </div>
              )}
              {/* Hamburger toggle button for small screens */}
              <button
                className="sm:hidden block p-2 text-slate-500 hover:text-slate-700"
                onClick={toggleMenu}
              >
                {/* Hamburger icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Menu items: Buttons (shown when menu is expanded on small screens) */}
            <div className={`mt-4 sm:flex flex-wrap items-center justify-center space-x-4 space-y-2 ${isMenuOpen ? "block" : "hidden"}`}>
              

              <ul className="p-2 flex items-center gap-2 2xsm:gap-4 justify-center">
                <OnlineStatus status={isOnline}/>
                <DarkModeSwitcher />
                {Answers && (
                  <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleAnswers}>
                    <Notebook size={24} />
                  </button>
                )}
                <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleFullscreen}>
                  <Maximize size={24} />
                </button>
              </ul>
              <div className="flex flex-1">
                {/* Add max-w-sm and sm:w-auto for responsive behavior */}
                <button className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 transition-colors w-full sm:w-auto max-w-sm" onClick={handleCancelClick} disabled={loading}>
                  {finish ? "Back" : "Cancel"}
                </button>


                <button className={`px-4 py-2 ${loading || finish ? 'bg-slate-500' : 'bg-green-600 hover:bg-green-700'} text-white  transition-colors w-full sm:w-auto max-w-sm`} onClick={() => handleSubmit()} disabled={loading || finish}>
                  {loading && (
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                  )}
                  {loading ? "loading... ." : "Submit"}
                </button>

              </div>

            </div>

            {/* Confirmation popup */}
            {showConfirm && (
              <div className="fixed inset-0 bg-slate-900 bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full dark:bg-slate-700">
                  <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                  <p>Are you sure you want to cancel?</p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button className="px-4 py-2 bg-slate-300 text-black hover:bg-slate-400" onClick={handleClosePopup}>
                      No
                    </button>
                    <button className="px-4 py-2 bg-danger text-white hover:bg-danger" onClick={handleConfirmCancel}>
                      Yes, Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </header>
        </>
      )
    )
  }


  const DesktopHeader = () => {
    return (
      <>
        <header className="bg-white shadow-lg p-2 flex justify-between items-center dark:bg-slate-900 z-1">
          <img src="/images/logo/type/logo_round.png" alt="Logo" className="h-10" />
          {!finish && (
            <div className="flex items-center space-x-2">
              <Clock size={24} className="text-slate-500" />
              <span className="text-slate-700 dark:text-white">{formatTime(timeLeft)}</span>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <OnlineStatus status={isOnline}/>

            <ul className="p-2">
              <DarkModeSwitcher />

            </ul>

            {Answers && (
              <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleAnswers}>
                <Notebook size={24} />
              </button>
            )}
            <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleFullscreen}>
              <Maximize size={24} />
            </button>


            <button className="px-4 py-2 bg-yellow-600 text-white  hover:bg-yellow-700 transition-colors" onClick={handleCancelClick} disabled={loading}>
              {finish ? "Back" : "Cancel"}
            </button>

            <button className={`px-4 py-2 ${loading || finish ? 'bg-slate-500' : 'bg-green-600 hover:bg-green-700'} text-white  transition-colors w-full sm:w-auto max-w-sm`} onClick={() => handleSubmit()} disabled={loading || finish}>
              {loading && (
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              )}
              {loading ? "loading... ." : "Submit"}
            </button>

          </div>

          {showConfirm && (
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full dark:bg-slate-700">
                <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                <p>Are you sure you want to cancel?</p>
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    className="px-4 py-2 bg-slate-300 text-black hover:bg-slate-400"
                    onClick={handleClosePopup}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 bg-danger text-white hover:bg-danger"
                    onClick={handleConfirmCancel}
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
      </>

    )
  }


  // Detect screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780); // 768px is Tailwind's md breakpoint
    };

    // Set initial screen size
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  return (
    <><div className="flex flex-col h-screen bg-slate-100" id="testlayouter">

      {isMobile ? <MobileHeader /> : <DesktopHeader />}

      {isAnswerOpen && Answers && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-50 max-h-screen overflow-auto">
          <div className="bg-white shadow-lg max-w-md w-full p-6 dark:bg-slate-800">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Your Answers</h2>
              <button onClick={toggleAnswers} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Answers Grid */}
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => {
                const answer = Answers[num]?.toUpperCase(); // Get the user's answer in uppercase

                let bgColor = 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'; // Default (no answer)
                if (answer) {
                  bgColor = 'bg-blue-300 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  if (Corrections) {
                    const correction = Corrections[num];
                    if (correction && correction.includes(answer)) {
                      bgColor = 'bg-green-500 text-white dark:bg-green-500 dark:text-white'; // Green if correct
                    } else {
                      bgColor = 'bg-danger text-white dark:bg-danger dark:text-white'; // Red if incorrect
                    }
                  }


                }

                return (
                  <div key={num} className={`flex flex-col items-center p-2 rounded-lg ${bgColor}`}>
                    <span className="text-md font-bold">{num}</span>
                    <span className="text-xs">
                      {answer || '-'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleAnswers}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="flex flex-col overflow-y-auto overflow-x-auto p-6 dark:bg-slate-900 max-w-screen">
        {children}
      </div>

      <footer className="bg-blue-500 shadow-md px-2 py-1 dark:bg-slate-900 z-1 shadow-lg">
        <div className="flex justify-center border-b border-transparent">
          {tabs?.map((obj) => (
            <button
              key={obj}
              className={`flex-1 py-2 px-6 transition-all duration-300 ease-in-out rounded-lg text-white font-semibold text-sm mx-1 border
        ${activePart === obj
                  ? 'bg-orange-400 text-white shadow-lg border-orange-500'  // Orange when active (clicked)
                  : 'bg-transparent hover:bg-white hover:text-indigo-600 hover:border-indigo-400'}
        `}
              onClick={() => setActivePart(obj)}
            >
              {labels ? labels : "Part"} {obj}
            </button>
          ))}
        </div>
      </footer>

    </div>
    </>
  );
}


export default withProtected(withUser(TestLayout));