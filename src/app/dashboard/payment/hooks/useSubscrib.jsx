'use client'
import { useUser } from "@/service/user";
import useSnap from "./useSnap";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { useRouter } from 'next/navigation'

const useSubscrip = () => {
    const user = useUser();
    const { snapEmbed } = useSnap();
    const func = FirebaseFunction();
    const router = useRouter()

    const Subs = async (TYPE, action) => {
        if(!user) {
            window.alert("User doesn't exist")
        }
      
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
            getOrder({ data: data }).then((result) => {
                action(true);
                snapEmbed(result.data.token, 'snap-container', {
                    onSuccess: function () {
                        action(false);
                        router.push('/dashboard')
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
    return {Subs};
};


export default useSubscrip;