import React from 'react';
import { XCircle, RefreshCcw, Home } from 'lucide-react';


const PaymentErrorPage = ({ errorMessage, errorCode }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Failed</h1>
          <p className="text-slate-600 mb-6">We're sorry, but there was an error processing your payment.</p>
        </div>
        
        <div className="bg-red-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-danger">Error Message:</span>
            <span className="text-danger">{errorMessage}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-danger">Error Code:</span>
            <span className="text-danger">{errorCode}</span>
          </div>
        </div>
        
        <p className="text-slate-600 text-center mb-6">
          Please try again or contact our support team if the problem persists.
        </p>
        
        <div className="space-y-4">
          <button className="w-full  text-blue-700 font-bold py-2 px-4  transition duration-300">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorPage;
