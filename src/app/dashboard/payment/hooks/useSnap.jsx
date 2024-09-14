'use client';

import { useEffect, useState } from 'react';

const useSnap = () => {
    const [snap, setSnap] = useState(null);

    useEffect(() => {
        const midtransScriptUrl = `${process.env.NEXT_PUBLIC_MITRANS_API_URL}/snap/snap.js`;
        const myMidtransClientKey = process.env.NEXT_PUBLIC_MITRANS_CLIENT_KEY;

        const script = document.createElement('script');
        script.src = midtransScriptUrl;
        script.setAttribute('data-client-key', myMidtransClientKey);

        const handleScriptLoad = () => {
            if (window.snap) {
                setSnap(window.snap);
            } else {
                console.error('Snap is not available on window.');
            }
        };

        script.onload = handleScriptLoad;
        script.onerror = () => {
            console.error('Failed to load Midtrans Snap script');
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const snapEmbed = (snap_token, embedId, action) => {
        if (snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: function () {
                    action?.onSuccess?.(result);
                },
                onPending: function (result) {
                    action?.onPending?.(result);
                },
                onClose: function () {
                    action?.onClose?.();
                },
            });
        } else {
            console.warn('Snap has not been initialized yet.');
        }
    };

    return { snapEmbed };
};

export default useSnap;
