import React, { useEffect, useRef } from 'react';



interface DataType {
  uid: string;
  Subscribtion: "SPEEDYIELTS_WEEKLY" | "SPEEDYIELTS_PREMIUM" | "SPEEDYIELTS_3PREMIUM";
  firstname: string;
  lastname?: string;
  email: string;
  phonenumber: string;
  gross_amount: number;
  transaction_status: "pending" | "denied" | "completed";
}


interface PayPalButtonProps {
  id: string;
  data: DataType;
  onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ id, data, onSuccess }) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIEND_ID}&currency=USD&disable-funding=paylater`;
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal && paypalRef.current) {
        (window as any).paypal.Buttons({
          createOrder: (_: any, actions: any) => {
            return actions.order.create({
              application_context: {
                shipping_preference: "NO_SHIPPING"
              },
              purchase_units: [{
                reference_id: data.Subscribtion,
                amount: { value: data.gross_amount },
                custom_id: id,
              },

              ]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const details = await actions.order.capture();
            onSuccess(details);
          },
          onCancel: () => {
            window.location.href = "/dashboard/payment"; // or any custom route
          }

        }).render(paypalRef.current);
      }
    };
    document.body.appendChild(script);
  }, [data, onSuccess]);

  return <div ref={paypalRef}></div>;
};


export default PayPalButton;