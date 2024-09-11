import React, { useState } from 'react';
import { Headphones, Book, Pencil, Mic } from 'lucide-react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [completedTests, setCompletedTests] = useState([]);

  const tabs = [
    { name: 'Listening', color: 'bg-green-500', icon: <Headphones className="text-green-500" /> },
    { name: 'Reading', color: 'bg-blue-500', icon: <Book className="text-blue-500" /> },
    { name: 'Writing', color: 'bg-yellow-500', icon: <Pencil className="text-yellow-500" /> },
    { name: 'Speaking', color: 'bg-purple-500', icon: <Mic className="text-purple-500" /> }
  ];

  const handleTabClick = (tab) => {
    if (completedTests.includes(tab.name)) {
      setActiveTab(tab.name);
    }
  };

  const completeTest = (tab) => {
    if (!completedTests.includes(tab.name)) {
      setCompletedTests([...completedTests, tab.name]);
      setActiveTab(tab.name);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {/* Navbar */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 rounded-xl bg-gray-200 p-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab)}
            disabled={!completedTests.includes(tab.name)}
            className={`flex-grow sm:flex-grow-0 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              activeTab === tab.name
                ? 'bg-white text-gray-900 shadow'
                : completedTests.includes(tab.name)
                ? `${tab.color} text-white hover:opacity-90`
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => completeTest(tab)}
            className={`p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer 
            ${completedTests.includes(tab.name) 
              ? `${tab.color} text-white hover:opacity-90`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            ${activeTab === tab.name ? 'ring-4 ring-blue-400' : ''}
            ${!completedTests.includes(tab.name) ? 'opacity-60' : ''}`}
          >
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="p-2 sm:p-3 bg-white rounded-full">
                {React.cloneElement(tab.icon, { size: 20 })}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">{tab.name}</h3>
              <p className="text-xs sm:text-sm text-center">
                {completedTests.includes(tab.name) ? 'Completed' : 'Not started'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeTab && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{activeTab} Test Content</h3>
          <p className="text-sm sm:text-base">Here you can add the specific content or instructions for the {activeTab} test.</p>
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
