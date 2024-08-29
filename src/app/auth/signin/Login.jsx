'use client'
import React from 'react';
import { SignInWithPassword, SignInWithGoogle } from "@/service/firebase";
import { useState, useRef } from 'react';
import withUnProtected from "@/hooks/withUnProtected";
import getErrorMessage from "./getErrorMessage";


const LoginPage = () => {
    const [errors, setErrors] = useState(null);
    const form = useRef();


    async function handleSubmit (e){
        e.preventDefault()
        const email = e.target.elements.email.value
        const pass = e.target.elements.password.value
        try {
            const [_, err ] = await SignInWithPassword(email, pass);
            if (err) {
                setErrors(getErrorMessage(err))
            };
        } catch (e) {
            console.error(e);
        }
    }

  async function handleSignInGoogle() {
    const [_, err ] = await SignInWithGoogle();
    if (err) {
        setErrors(getErrorMessage(err))
    };
};

    return (
        <div>
            <header className="h-16 sm:h-24 flex flex-col justify-center bg-transparent fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto flex flex-row items-center justify-between">
                    <div className="space-y-3 p-4"><a href="/" className="inline-block">
                        <img src="/images/logo/type/logo_round.png" className="relative w-14 md:w-18" alt="logo" />
                    </a>
                    </div>
                    <nav className="">
                        <div className="flex flex-row items-center gap-2 sm:gap-4"></div>
                    </nav>
                </div>
            </header>
            <header className="h-16 sm:h-24 flex flex-col justify-center transition-all ease-in-out duration-200 -translate-y-full bg-white fixed left-0 top-0 right-0 z-50 shadow-xxs">
                <div className="container mx-auto flex flex-row items-center justify-between">
                    <div className="space-y-3 p-4">
                        <a href="#" className="inline-block">
                            <img src="/images/logo/type/logo_round.png" className="relative w-14 md:w-18" alt="logo" />
                        </a>
                    </div>
                    <nav>
                        <div className="flex flex-row items-center gap-2 sm:gap-4"></div>
                    </nav>
                </div>
            </header>
            <section className="hidden sm:flex flex-row h-screen fixed inset-0">
                <div className="sm:w-8/12 bg-cover bg-center bg-[url('/images/model-1.png')] h-full">
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </section>
            <section className="relative z-20 sm:h-screen">
                <div className="sm:hidden h-[400px] flex flex-col justify-end bg-cover bg-center bg-[url('/images/model-1.png')] pt-20 shadow-2xl">
                    <div className="container mx-auto">
                        <div className="pb-20 space-y-1 px-8">
                            <h1 className="font-bold text-xl text-white">Boost your IELTS Band score and Unlock Your Future</h1>
                            <span className="font-light text-white text-sm block">Enhance your learning experience with cutting-edge AI technology designed to support your educational journey at every step.</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto h-full">
                    <div className="sm:flex flex-row h-full">
                        <div className="hidden sm:flex sm:flex-col sm:justify-end sm:pb-36 sm:w-7/12 px-8">
                            <h1 className="font-bold text-4xl text-white mb-1 leading-tight">Boost your IELTS Band score and Unlock Your Future</h1>
                            <span className="font-light text-white text-lg">Enhance your learning experience with cutting-edge AI technology designed to support your educational journey at every step.</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center mx-auto">
                            <div className="p-6 sm:p-8 shadow-lg bg-white w-full max-w-md relative -top-12 sm:top-0 sm:left-0 rounded-2xl">
                                <h3 className="font-bold text-primary-black text-2xl mb-10">Login SpeedyIELTS</h3>
                                <form onSubmit={handleSubmit} ref={form}>
                                    <div className="mb-4">
                                        <label className="font-medium block text-sm text-neutral-black mb-1">Email</label>
                                        <input autoFocus="" type="text" placeholder="Use your email" className="px-4 py-3 w-full text-sm border border-primary-light-slate rounded-md outline-none placeholder-primary-placeholder" name="email" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-medium block text-sm text-neutral-black mb-1">Password</label>
                                        <input type="password" placeholder="Insert your password" className="px-4 py-3 w-full text-sm border border-primary-light-slate rounded-md outline-none placeholder-primary-placeholder" name="password" />
                                    </div>
                                    <button type="submit" className="bg-blue-600 rounded-md px-4 py-3 font-medium text-sm text-white text-center w-full transition-all duration-300 transform hover:scale-105">
                                        <span>Sign In</span>
                                    </button>
                                </form>
                                {errors && (<span className='text-danger text-xs'>{errors}</span>)}
                                <div className="flex flex-row items-center gap-4 my-6">
                                    <div className="h-0.5 bg-primary-light-slate flex-1"></div>
                                    <label className="font-normal text-xs text-black block">or Sign In</label>
                                    <div className="h-0.5 bg-primary-light-slate flex-1"></div>
                                </div>
                                <button type="button" className="bg-[#F1F2F4] w-full px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105"  onClick={handleSignInGoogle}>
                                    <div className="flex flex-row items-center justify-center gap-3">
                                        <img src="/images/icon/google-icon.svg" />
                                        <span className="font-semibold text-sm text-primary-black">Sign in with Google</span>
                                    </div>
                                </button>
                                <div className="font-normal text-sm text-neutral-black text-center mt-5">
                                    Don't have account? <a href="#" className="font-semibold text-sm text-primary-color">SignUp</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </section>
            
        </div>
    );
};

export default withUnProtected(LoginPage);
