import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PaymentSuccessPage = ({ amount, transactionId, date }) => {
  const router = useRouter();


  function handleHome () {
    router.push('/dashboard')
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg max-w-lg w-full">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h1>
          <p className="text-slate-600 mb-6">Thank you for your purchase.</p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-green-700">Amount Paid:</span>
            <span className="text-green-700">IDR{amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-green-700">Transaction ID:</span>
            <span className="text-green-700">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-green-700">Date:</span>
            <span className="text-green-700">{date}</span>
          </div>
        </div>
 
        
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 transition duration-300 block" onClick={handleHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
