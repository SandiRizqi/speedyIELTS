'use client'
import { useEffect, useState } from "react"

const useSnap = () => {
    const  [snap, setSnap] = useState(null);


    useEffect(() => {
        const midtransScriptUrl = `${process.env.NEXT_PUBLIC_MITRANS_API_URL}/snap/snap.js`;  
        let script = document.createElement('script');
        script.src = midtransScriptUrl;
        const myMidtransClientKey = process.env.NEXT_PUBLIC_MITRANS_CLIENT_KEY;
        script.setAttribute('data-client-key', myMidtransClientKey);
        script.onload = () => {
            setSnap(window.snap);
        };
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    const snapEmbed = (snap_token, embedId, action) => {
        if (snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: function (result) {
                    console.log("Success", result);
                    action.onSuccess(result);
                },
                onPending: function (result) {
                    console.log("Pending", result);
                    action.onPending(result);
                },
                onClose: function () {
                    action.onClose();
                },


            })
        }
    }
    return{snapEmbed}
};



export default useSnap;