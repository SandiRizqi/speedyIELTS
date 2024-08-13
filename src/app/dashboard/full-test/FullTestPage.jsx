'use client'
import React from "react";
import { useEffect, useState, useCallback } from "react";
import AcademicListeningPage from "../listening/academic-listening/AcademicListeningPage";
import AcademicReadingPage from "../reading/academic-reading/AcademicReadingPage";
import WritingFullPage from "../writing/writing-full/WritingFullPage";


const FullTestPage = () => {
    const [activeTab, setActiveTab] = useState('listening');

    function TabNavigation() {
        const tabs = ['listening', 'reading', 'writing', 'speaking'];
      
        const handleKeyDown = useCallback((e) => {
          if (e.key === 'ArrowRight') {
            setActiveTab((prev) => (prev + 1) % tabs.length);
          } else if (e.key === 'ArrowLeft') {
            setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
          }
        }, [tabs.length]);
      
        return (
          <div className="flex w-full justify-center mb-4 overflow-x-auto">
            <div className="flex border-b w-full justiry-center border-gray-200" role="tablist" onKeyDown={handleKeyDown}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeTab === tab}
                  tabIndex={activeTab === tab ? 0 : -1}
                  className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        );
      }

    const RenderPage = ({page}) => {

        switch (page) {
            case 'listening':
                return (<div className="max-w-screen-2xl"><AcademicListeningPage /></div>)
            case 'reading':
                return (<AcademicReadingPage />)
            case 'writing':
                return <WritingFullPage />
            default:
                return null;
        }

    };



    return (
        <div className={activeTab !== 'reading' ? "mx-auto max-w-screen-2xl": "mx-auto max-w-full"}>
        <TabNavigation />
        <RenderPage page={activeTab}/>
        </div>
    )
}

export default FullTestPage;