'use client'
import { useUser } from "@/service/user";
import useSnap from "./useSnap";
import { useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { useRouter } from 'next/navigation'

const useSubscrip = () => {
    const [loading, setLoading] = useState(false);
    const user = useUser();
    const { snapEmbed } = useSnap();
    const func = FirebaseFunction();
    const router = useRouter()

    const Subs = async (TYPE, action) => {
        if(!user) {
            return window.alert("User doesn't exist")
        };

        setLoading(true);
      
        const data = {
            uid: user.uid,
            firstname: user.displayName,
            lastname: '',
            email: user.email,
            phonenumber: '',
            Subscribtion: TYPE,
        };
        
        try {
            const getOrder = httpsCallable(func, 'makeSubscription');
            await getOrder({ data: data }).then((result) => {
                action(true);
                setLoading(false);
                snapEmbed(result.data.token, 'snap-container', {
                    onSuccess: function () {
                        action(false);
                        router.push('/dashboard/settings')
                    },
                    onPending: function (payload) {
                        console.log(payload);
                    },
                    onError: function (payload) {
                        console.log(payload);
                        
                    },
                })
            });

        } catch (error) {
            console.error('Error:', error);
        }
    };
    return {Subs, loading};
};


export default useSubscrip;