'use client'
import { useUser } from "@/service/user";
import { useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { ErrorMessage } from "../../_components/Alert";
import { useRouter } from "next/navigation";


const useSubscrip = () => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null)
    const [selected, setSelected] = useState(null);
    const user = useUser();
    const {userState} = user;
    const func = FirebaseFunction();
    const router = useRouter();

  
    const Subs = async (TYPE) => {
      setSelected(TYPE)
      if (!userState.uid) {
        return window.alert("User doesn't exist");
      }

      //setStatus('loading')
  
      setLoading(true);
      
      const data = {
        uid: userState.uid,
        firstname: userState.name,
        lastname: '',
        email: userState.email,
        phonenumber: userState?.phoneNumber,
        Subscribtion: TYPE,
      };
      
      try {
        const getOrder = httpsCallable(func, process.env.NEXT_PUBLIC_PAYMENT_FUNCTION);
        const result = await getOrder({ data: data });
        setToken(result.data.token);
        router.push(`/dashboard/payment?id=${result.data.token}`)
        
        // Payment embed
        // snapEmbed(result.data.token, 'snap-container');
  
      } catch (error) {
        ErrorMessage(error)
        // setStatus('error');
        // setErrorMessage(error.message || 'Error processing your payment.');
        //console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return { Subs, loading, token, selected };
  };
  


export default useSubscrip;