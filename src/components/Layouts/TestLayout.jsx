"use client";
import React, { useState, ReactNode, useEffect } from "react";
import withProtected from "@/hooks/withProtected";
import withUser from "@/hooks/withUser";
import { Clock, Maximize, Notebook } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";


const TestLayout = ({ children, activePart, setActivePart, onSubmit, tabs, time, loading, finish, onCancel, labels, Answers }) => {
  const [timeLeft, setTimeLeft] = useState(time * 60); // 60 minutes in seconds
  const path = usePathname();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

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





  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!timeLeft) {
      onSubmit();
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  // const generateNumberButtons = (start, end, activePart) => {
  //   return Array.from({ length: end - start + 1 }, (_, i) => i + start).map((num) => (
  //     <button
  //       key={num}
  //       className={`w-6 h-6 text-xs rounded-full ${num === start && activePart ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'} flex items-center justify-center`}
  //     >
  //       {num}
  //     </button>
  //   ));
  // };


  // const renderPartButton = (part) => (
  //   <button
  //     className={`flex-1 py-2 px-4 ${activePart === part ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-700'} rounded-t-lg font-medium text-sm`}
  //     key={part}
  //     onClick={() => setActivePart(part)}
  //   >
  //     {labels ? labels : "Part"} {part}
  //   </button>
  // );


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
              <idv className="flex flex-1">
                {/* Add max-w-sm and sm:w-auto for responsive behavior */}
                <button className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 transition-colors w-full sm:w-auto max-w-sm" onClick={handleCancelClick} disabled={loading}>
                  {finish ? "Back" : "Cancel"}
                </button>

                <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors w-full sm:w-auto max-w-sm" onClick={() => onSubmit()} disabled={loading}>
                  {loading ? "loading... ." : "Submit"}
                </button>
              </idv>

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
            <button className="px-4 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors" onClick={() => onSubmit()} disabled={loading}>
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
              {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                <div
                  key={num}
                  className={`flex flex-col items-center p-2 rounded-lg ${Answers[num]
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' // Blue if there is an answer
                      : 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' // Orange if no answer
                    }`}
                >
                  <span className="text-md font-bold">{num}</span>
                  <span className="text-xs">
                    {Answers[num]?.toUpperCase() || '-'}
                  </span>
                </div>
              ))}
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