'use client'
import { useUser } from "@/service/user";
import useSnap from "./useSnap";
import { useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { ErrorMessage } from "../../_components/Alert";


const useSubscrip = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(''); // Track status: 'success', 'pending', 'error'
    const [errorMessage, setErrorMessage] = useState(''); // Track error message
    const user = useUser();
    const { snapEmbed } = useSnap();
    const func = FirebaseFunction();

  
    const Subs = async (TYPE, action) => {
      if (!user) {
        return window.alert("User doesn't exist");
      }
  
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
        const result = await getOrder({ data: data });
        
        // Payment embed
        snapEmbed(result.data.token, 'snap-container', {
            
          onSuccess: function () {
            setStatus('success'); // Set success status
            action(false);
            setLoading(false);
          },
          onPending: function () {
            setStatus('pending'); // Set pending status
            //console.log(payload);
          },
          onError: function (payload) {
            setStatus('error'); // Set error status
            setErrorMessage(payload.message || "An error occurred during payment.");
            //console.log(payload);
          },
        });
  
      } catch (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Error processing your payment.');
        //console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return { Subs, loading, status, errorMessage };
  };
  


export default useSubscrip;