"use client"
import React from 'react';

const AppVersion = () => {
 
  return (
    <div className="bg-slate-700 p-2 rounded-lg shadow-lg flex flex-col justify-center mx-4 mb-16 text-white text-xs">
        App Version : {process.env.NEXT_PUBLIC_APP_VERSION}
    </div>
  );
};

export default AppVersion;
