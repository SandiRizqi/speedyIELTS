"use client";
import React, { useState, ReactNode, useEffect } from "react";
import withProtected from "@/hooks/withProtected";
import withUser from "@/hooks/withUser";
import { Clock, Maximize, Notebook } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";


const TestLayout = ({ children, activePart, setActivePart, onSubmit, tabs, time, loading }) => {
  const [timeLeft, setTimeLeft] = useState(time * 60); // 60 minutes in seconds
  const path = usePathname();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    return `${minutes} minutes remaining`;
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


  const renderPartButton = (part) => (
    <button
      className={`flex-1 py-2 px-4 ${activePart === part ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-700'} rounded-t-lg font-medium text-sm`}
      key={part}
      onClick={() => setActivePart(part)}
    >
      Part {part}
    </button>
  );


  return (
    <><div className="flex flex-col h-screen bg-slate-100" id="testlayouter">
      {/* Header */}
      <header className="bg-white shadow-lg p-4 flex justify-between items-center">
        <img src="/images/logo/type/logo_round.png" alt="Logo" className="h-10" />
        <div className="flex items-center space-x-2">
          <Clock size={24} className="text-slate-500" />
          <span className="text-slate-700">{formatTime(timeLeft)}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:text-slate-700">
            <Notebook size={24} />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700" onClick={toggleFullscreen}>
            <Maximize size={24} />
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white  hover:bg-yellow-700 transition-colors" onClick={handleGoBack}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors" onClick={() => onSubmit()} disabled={loading}>
            {loading ? "loading... ." : "Submit"}
          </button>
        </div>
      </header>

      <div className="flex flex-col overflow-scroll p-6">
        {children}
      </div>

      <footer className="bg-white shadow-md px-4">
        <div className="flex border-b">
          {tabs.map((obj) => {
            return renderPartButton(obj);
          })}
        </div>
        {/* <div className="p-4">
          <div className="flex justify-center space-x-2 mb-4">
            {activePart === 1 && generateNumberButtons(1, 13)}
            {activePart === 2 && generateNumberButtons(1, 13)}
            {activePart === 3 && generateNumberButtons(1, 14)}
          </div>
          
        </div> */}
      </footer>
    </div>
    </>
  );
}


export default withProtected(withUser(TestLayout));