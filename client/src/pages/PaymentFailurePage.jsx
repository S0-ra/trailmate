import HeaderCommon from "../components/common/HeaderCommon";
import NewsletterBar from "../components/common/NewsletterBar";
import Footer from "../components/common/Footer";
import { X } from 'lucide-react';

const PaymentFailure = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Failure Animation */}
        <div className="mb-6">
          <div className="mx-auto relative">
            <div className="h-24 w-24 mx-auto rounded-full bg-red-100 flex items-center justify-center animate-pulse">
              <X className="h-12 w-12 text-red-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Failure Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600">
          Sorry, your payment couldnt be processed. Please try again or use a different payment method.
        </p>
      </div>
    </div>
  );
};

const PaymentFailurePage=function(){
    return <>
    <HeaderCommon/>
    <PaymentFailure/>
    <NewsletterBar/>
    <Footer />
    </>
}

export default PaymentFailurePage;