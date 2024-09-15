"use client"
import React from 'react';
import { FirestoreDB } from '@/service/firebase';
import { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import PaymentErrorPage from './PaymentErrorPage';
import PaymentSuccessPage from './PaymentSuccessPage';
import PaymentPendingPage from './PaymentPendingPage';
import { useSearchParams } from 'next/navigation';
import { ErrorMessage } from '../../_components/Alert';
import { onSnapshot, doc } from 'firebase/firestore';

export default function StatusHandler() {
    const [statusResponse, setStatusResponse] = useState(null);
    const db = FirestoreDB();
    const params = useSearchParams();

    const getTransaction = async (documentId) => {
        // Listen to real-time updates
        const docRef = doc(db, "payment", documentId);
        onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const documentData = docSnapshot.data(); // Get document data
                console.log(documentData)
                setStatusResponse(documentData);
            } else {
                ErrorMessage("No such document!");
            }
        }, (error) => {
            ErrorMessage("Error fetching document: ", error);
        });
    }

    useEffect(() => {
        if (params.get('order')) {
            getTransaction(params.get('order'));
        }
    }, [params])


    if (statusResponse) {
        // let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                // TODO set transaction status on your database to 'success'
               return <PaymentSuccessPage amount={statusResponse.gross_amount} transactionId={statusResponse.transaction_id} date={statusResponse.transaction_time}/>
            }
        } else if (transactionStatus == 'settlement') {
            // TODO set transaction status on your database to 'success'
            return <PaymentSuccessPage amount={statusResponse.gross_amount} transactionId={statusResponse.transaction_id} date={statusResponse.transaction_time} />
        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO set transaction status on your database to 'failure'
           return <PaymentErrorPage amount={statusResponse.gross_amount} transactionId={statusResponse.transaction_id} date={statusResponse.transaction_time}/>
        } else if (transactionStatus == 'pending') {
            // TODO set transaction status on your database to 'pending' / waiting payment
            return <PaymentPendingPage amount={statusResponse.gross_amount} transactionId={statusResponse.transaction_id} date={statusResponse.transaction_time} />
        }
    }
    return (
        <Loader />
    )
}
