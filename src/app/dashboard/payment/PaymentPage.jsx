'use client';

import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import useSubscrip from './hooks/useSubscrib';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import useSnap from './hooks/useSnap';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, ArrowRight } from 'lucide-react';


const PricingTier = ({ title, price, range, features, isPopular, type }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Subs, loading } = useSubscrip();

    

    
    async function handleChoose(type) {
        await Subs(type);
    }

    return (
        <div
            className={`relative p-8 rounded-md transition-all duration-500 hover:shadow-2xl overflow-hidden border
        ${isPopular ? 'bg-blue-600 text-white' : 'bg-white text-navy-900'}
        ${isHovered ? 'scale-105' : 'scale-100'}
        transform perspective-1000 hover:rotate-y-5`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            {isPopular && (
                <div className="absolute top-0 right-0 bg-white text-blue-600 px-4 py-1 flex items-center text-sm font-bold shadow-lg transform">
                    <Sparkles className="inline-block mr-2" size={20} /> Most Popular
                </div>
            )}
            <h3 className={`text-2xl font-black mb-6 relative ${!isPopular || "text-white"}`}>{title}</h3>
            {price && (
                <p className={`text-xl font-black mb-8 relative ${!isPopular || "text-white"}`}>
                    IDR{price}<span className="text-lg font-normal opacity-80">/{range}</span>
                </p>
            )}
            <ul className="space-y-4 mb-8 relative">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Check className={`mr-3 ${isPopular ? 'text-white' : 'text-blue-600'}`} size={24} />
                        <span className="text-md">{feature}</span>
                    </li>
                ))}
            </ul>
            {price && (
                <button className={`w-full py-2 px-4  font-extrabold text-xl transition-all duration-300 relative overflow-hidden group
        ${isPopular
                        ? 'bg-white text-blue-600 hover:bg-orange-50 hover:text-white'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`} onClick={() => handleChoose(type)}>
                    <span className="relative z-10 flex items-center justify-center">
                        {!loading ? "Choose Plan" : "Loading... ."}
                        <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
            )}
        </div>
    );
};


const PaymentPage = () => {
    const params = useSearchParams();
    const id = params.get('id');
    const { snapEmbed } = useSnap();
    const router = useRouter();

    const pricingTiers = [
        {
            title: "Free",
            price: false,
            features: ["Absolutely Free",
                "One free mini speaking test",
                "Two free writing part 1 tests",
                "One free listening test",
                "One free reading test",
                "Complete result & feedback",
                "Previous results tracking",
                "Good for quick revision before the exam"

            ],
            isPopular: false
        },
        {
            title: "Weekly Premium",
            price: "99,000",
            range: "Week",
            type: "SPEEDYIELTS_WEEKLY",
            features: ["7 Days access to All Unlimited Tests",
                "Access to hundreds of samples",
                "Complete result",
                "Comprehensive feedback",
                "All previous results tracking",
                "Good for quick practice before the exam",
                "Improve your IELTS score rapidly",
            ],
            isPopular: false
        },
        {
            title: "Monthly Premium",
            price: "369,000",
            range: "Mo",
            type: "SPEEDYIELTS_PREMIUM",
            features: ["Save 7%","31 Days access to All Unlimited Tests",
                "Access to hundreds of samples",
                "Complete result",
                "Comprehensive feedback",
                "All previous results tracking",
                "Good for quick practice before the exam",
                "Improve your IELTS score rapidly",
            ],
            isPopular: true
        },
        {
            title: "3Month Bundle",
            price: "899,000",
            range: "3Mo",
            type: "SPEEDYIELTS_3PREMIUM",
            features: ["save 24%","90 Days access to All Unlimited Tests",
                "Access to hundreds of samples",
                "Complete result",
                "Comprehensive feedback",
                "All previous results tracking",
                "Good for longterm learning",
                "Improve your IELTS score rapidly",
            ],
            isPopular: false
        }
    ];

    
    


    useEffect(() => {
        let snapInstance;
        if (id) {
            snapInstance = snapEmbed(id, 'snap-container', {
                onSuccess: function (payload) {
                    //console.log(payload);
                    // gtag_report_conversion(`https://app.speedyielts.com/dashboard/payment/status?order_id=${payload.order_id}`)
                    router.push(`/dashboard/payment/status?order_id=${payload.order_id}`)
                },
                onPending: function (payload) {
                    //console.log(payload);
                    router.push(`/dashboard/payment/status?order_id=${payload.order_id}`)
                },
                onClose: function () {
                    router.push('/dashboard')
                }
            });
        }

        return () => {
            // Cleanup function to remove the payment interface
            if (snapInstance && typeof snapInstance.destroy === 'function') {
                snapInstance.destroy();
            } else {
                // Manual cleanup if destroy method is not available
                const snapContainer = document.getElementById('snap-container');
                if (snapContainer) {
                    snapContainer.innerHTML = '';
                }
                // Remove any global event listeners or overlays here if necessary
            }
        };
    }, [id])


    useEffect(() => {
        // Create a new script element for Google Tag Manager
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16709210026';
        script.async = true;

        // Append the script to the document body
        document.body.appendChild(script);

        // Initialize gtag after the script has been loaded
        script.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'AW-16709210026');
            if (id) {
                gtag('event', 'conversion', {
                    'send_to': 'AW-16709210026/wNbICLed2tQZEKqfyZ8-',
                    'transaction_id': '',
                });
            }
        };

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [id]);
    


    return (
        <UserProvider>
            <AuthStateChangeProvider>
                <Breadcrumb pageName='Payment' />
                <div className="flex flex-1 max-w-screen-xl mx-auto items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

                    {!id ? (
                        <>
                            <div className="absolute inset-0 overflow-hidden dark:bg-slate-900 dark:text-slate-700">
                                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob"></div>
                                <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
                                <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>
                            </div>
                            <div className="max-w-7xl mx-auto relative">
                                <div className="text-center mb-20">
                                    <h4 className="text-4xl font-black mb-6 text-white leading-tight"><span className="text-blue-600 bg-clip-text">Perfect Plan</span></h4>
                                    <p className="text-2xl text-blue-400">Unlock your potential IELTS score with our flexible pricing options</p>
                                </div>
                                <div className="grid lg:grid-cols-4 gap-4 mt-8">
                                    {pricingTiers.map((tier, index) => (
                                        <PricingTier key={index} {...tier} />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (<div id="snap-container" className={`bg-white p-4 rounded-lg shadow-md w-full max-w-lg block dark:bg-slate-700 dark:text-slate-400`}></div>)}


                </div>
            </AuthStateChangeProvider>
        </UserProvider>
    )
};

export default PaymentPage;
