import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { httpsCallable } from 'firebase/functions';
import { FirebaseFunction } from '@/service/firebase';
import Loader from '@/components/common/Loader';
import { useUser } from '@/service/user';


function checkQuota(WrappedComponent, quotaKey) {
  return function QuotaCheckedComponent(props) {
    const functions = FirebaseFunction();
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const { userState } = useUser(); // assume this provides { uid }
    const router = useRouter();

    useEffect(() => {
      const getQuota = async () => {
        try {
          const getData = httpsCallable(functions, 'getUserQuota');
          const result = await getData({ userId: userState.uid });
          const quotaData = result.data;
          console.log(quotaData)

       
          if (quotaData[quotaKey] < 2 || userState.subscribtion === "PREMIUM" || !quotaData[quotaKey]) {
            setAllowed(true);
          } else {
            router.replace('/dashboard/quota-exceeded');
          }
        } catch (error) {
          console.error('Error checking quota:', error);
          router.replace('/dashboard/error'); // fallback route
        } finally {
          setLoading(false);
        }
      };

      if (userState?.uid) {
        getQuota();
      }
    }, [userState]);

    if (loading) {
      return <Loader />
    }

    return allowed ? <WrappedComponent {...props} /> : null;
  };
}

export default checkQuota;
