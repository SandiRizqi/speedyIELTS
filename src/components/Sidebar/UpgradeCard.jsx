import React from 'react';
import { useRouter } from 'next/navigation';


const UpgradeCard = () => {
  const router = useRouter();

  function handleClick () {
    router.replace("/dashboard/payment");
  }
  return (
    <div className="bg-slate-700 p-2 rounded-lg shadow-lg max-w-xs mx-4">
      <h2 className="text-md font-bold text-white mb-2">Upgrade Your Plan</h2>
      <p className="text-xs text-slate-100 mb-4">
        You are currently on the free plan. Upgrade to the paid plan to unlock all features.
      </p>
      <div className="relative w-full h-2 bg-slate-300 rounded-full mb-2">
        <div className="absolute top-0 left-0 h-2 bg-orange-400 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <button className="bg-blue-600 text-white font-semibold text-sm py-1 px-4  hover:bg-orange-400" onClick={() => handleClick()}>
        UPGRADE
      </button>
    </div>
  );
};

export default UpgradeCard;
