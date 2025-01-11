import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function RazorpayPaymentReturnPage() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('razorpayPaymentId');
    const paymentOrderId = params.get('razorpayOrderId');

    useEffect(() => {
        if (paymentId && paymentOrderId) {
            console.log(paymentId, paymentOrderId)
            async function capturePayment(){
            const currentOrderId = JSON.parse(sessionStorage)
            
            const response = await captureAndFinalizePaymentService(
                // captureData 
                captureData.razorpay_order_id,
                captureData.razorpay_payment_id,
                captureData.razorpay_signature
            );

            if(response?.success){
                sessionStorage.removeItem('currentOrderId');
                window.location.href = '/student-courses';
            }
            }
            capturePayment()
        }
    },[paymentId,paymentOrderId])
    console.log(params)

  return (
    <Card>
        <CardHeader>
            <CardTitle>Processing payment... Please wait</CardTitle>
        </CardHeader>
    </Card>
  )
}

export default RazorpayPaymentReturnPage