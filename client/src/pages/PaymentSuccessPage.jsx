import HeaderCommon from "../components/common/HeaderCommon";
import NewsletterBar from "../components/common/NewsletterBar";
import Footer from "../components/common/Footer";
import { Check } from 'lucide-react';

const SimplePaymentSuccess = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="mx-auto relative">
            <div className="h-24 w-24 mx-auto rounded-full bg-green-100 flex items-center justify-center animate-pulse">
              <Check className="h-12 w-12 text-green-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
      </div>
    </div>
  );
};

const PaymentSuccessPage=function(){
    return <>
    <HeaderCommon/>
    <SimplePaymentSuccess></SimplePaymentSuccess>
    <NewsletterBar/>
    <Footer />
    </>
}

export default PaymentSuccessPage;