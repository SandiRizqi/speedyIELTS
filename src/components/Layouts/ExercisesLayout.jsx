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

const ExercisesLayout = ({ children, onCancel }) => {
  const [isOnline, setIsOnline] = useState(false); 
  const realDb = FirebaseRealtimeDatabase();
  const path = usePathname();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


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
                <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleFullscreen}>
                  <Maximize size={24} />
                </button>
              </ul>
              <div className="flex flex-1">
                {/* Add max-w-sm and sm:w-auto for responsive behavior */}
                <button className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 transition-colors w-full sm:w-auto max-w-sm" onClick={handleCancelClick} disabled={loading}>
                  Back
                </button>

              </div>

            </div>

            {/* Confirmation popup */}
            {showConfirm && (
              <div className="fixed inset-0 bg-slate-900 bg-opacity-30 flex justify-center items-center z-50 dark:z-9999">
                <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full dark:bg-slate-700">
                  <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                  <p>Are you sure you want to go back?</p>
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
        <header className="bg-white shadow-lg p-2 flex justify-between items-center dark:bg-slate-900">
          <img src="/images/logo/type/logo_round.png" alt="Logo" className="h-10" />
          
          <div className="flex items-center space-x-4">
            <OnlineStatus status={isOnline}/>

            <ul className="p-2">
              <DarkModeSwitcher />

            </ul>

            
            <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleFullscreen}>
              <Maximize size={24} />
            </button>


            <button className="px-4 py-2 bg-yellow-600 text-white  hover:bg-yellow-700 transition-colors" onClick={handleCancelClick} >
              Back
            </button>
          </div>

          {showConfirm && (
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 flex justify-center items-center z-50 dark:z-9999">
              <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full dark:bg-slate-700">
                <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                <p>Are you sure you want to go back?</p>
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
    <><div className="fixed inset-0 flex flex-col h-screen bg-slate-100 z-9999" id="testlayouter">
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      <div className="flex flex-col overflow-y-auto overflow-x-auto p-6 dark:bg-slate-900 max-w-screen right-scrollbar">
        {children}
      </div>

      <footer className="bg-blue-500 shadow-md px-2 py-1 dark:bg-slate-900 z-1 shadow-lg">
        <div className="flex justify-center border-b border-transparent">
        </div>
      </footer>

    </div>
    </>
  );
}


export default withProtected(withUser(ExercisesLayout));