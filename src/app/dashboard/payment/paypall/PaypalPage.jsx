"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/service/user';
import { Check, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';

const pricingTiers = [
  {
    title: "Free",
    price: false,
    features: [
      "Absolutely Free", "Two free mini speaking test", "Two free writing task 1 test",
      "Two free listening test", "Two free reading test", "Complete result & feedback",
      "Previous results tracking", "Good for quick revision before the exam"
    ],
    isPopular: false
  },
  {
    title: "Weekly Premium",
    price: "5",
    range: "Week",
    type: "SPEEDYIELTS_WEEKLY",
    features: [
      "7 Days access to All Unlimited Tests", "Access to hundreds of samples",
      "Complete result", "Comprehensive feedback", "All previous results tracking",
      "Good for quick practice before the exam", "Improve your IELTS score rapidly"
    ],
    isPopular: false
  },
  {
    title: "Monthly Premium",
    price: "15",
    range: "Mo",
    type: "SPEEDYIELTS_PREMIUM",
    features: [
      "Save 7%", "31 Days access to All Unlimited Tests", "Access to hundreds of samples",
      "Complete result", "Comprehensive feedback", "All previous results tracking",
      "Good for quick practice before the exam", "Improve your IELTS score rapidly"
    ],
    isPopular: true
  },
  {
    title: "3Month Bundle",
    price: "20",
    range: "3Mo",
    type: "SPEEDYIELTS_3PREMIUM",
    features: [
      "save 24%", "90 Days access to All Unlimited Tests", "Access to hundreds of samples",
      "Complete result", "Comprehensive feedback", "All previous results tracking",
      "Good for longterm learning", "Improve your IELTS score rapidly"
    ],
    isPopular: false
  }
];

const TierCard = ({ userState, tier, func, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createOrder() {
    const data = {
      uid: userState.uid,
      firstname: userState.name,
      lastname: '',
      email: userState.email,
      phonenumber: userState?.phoneNumber,
      Subscribtion: tier.type,
    };

    try {
      setIsLoading(true);
      const getOrder = httpsCallable(func, 'makeSubscriptionPaypal');
      const resp = await getOrder({ data: data });
    //   console.log(resp)
      onSelect(resp.data); // optionally pass response
    } catch (error) {
      console.error("❌ Error while creating order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`relative p-8 rounded-xl transition-all duration-500 border overflow-hidden transform
        ${tier.isPopular ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 dark:bg-slate-800 dark:text-white'}
        ${hovered ? 'scale-105 shadow-2xl' : 'shadow-md'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tier.isPopular && (
        <div className="absolute top-0 right-0 bg-white text-blue-600 px-3 py-1 text-xs font-semibold rounded-bl-lg">
          <Sparkles className="inline-block mr-1" size={16} />
          Most Popular
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2">{tier.title}</h2>
      <p className="text-lg font-semibold mb-6">
        {tier.price ? `$${tier.price}` : 'Free'}
        {tier.range && <span className="text-sm opacity-70 ml-1">/{tier.range}</span>}
      </p>

      <ul className="space-y-2 mb-6">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start text-sm">
            <Check size={18} className={`mr-2 ${tier.isPopular ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        disabled={!tier.price || isLoading}
        onClick={createOrder}
        className={`
          w-full py-2 px-4 font-bold rounded-lg transition-colors duration-300 text-center text-lg flex items-center justify-center
          ${tier.price
            ? tier.isPopular
              ? 'bg-white text-blue-600 hover:bg-blue-100'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-600 dark:bg-slate-600 dark:text-slate-300 cursor-not-allowed'}
          ${isLoading ? 'opacity-60 cursor-wait' : ''}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Processing...
          </>
        ) : tier.price ? (
          <>
            Buy Now <ArrowRight size={18} className="ml-2" />
          </>
        ) : 'Start Free'}
      </button>
    </div>
  );
};

export default function PaymentPage() {
  const router = useRouter();
  const { userState } = useUser();
  const func = FirebaseFunction();


  const handlePlanSelect = (data) => {
    const params = new URLSearchParams({
      id: data["id"]
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Choose Your <span className="text-blue-600 dark:text-blue-400">Perfect Plan</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Start for free or unlock unlimited test access anytime.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <TierCard key={index} tier={tier} onSelect={handlePlanSelect} func={func} userState={userState}/>
        ))}
      </div>
    </div>
  );
}
