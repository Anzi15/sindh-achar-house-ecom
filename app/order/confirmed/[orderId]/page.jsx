import { IoCheckmark } from "react-icons/io5";
import Link from "next/link";

const OrderConfirmationPage = async ({ params, searchParams }) => {
  const { orderId } = params; // Get orderId from route params
  const { paymentMethod, name } = searchParams; // Get paymentMethod and name from search params

  // Construct the absolute URL for the fetch request
  const apiUrl = `http://alzehrabygm.store/api/order-confirmation?orderId=${orderId}`; // Change this to your production URL later

  // Fetch order data on the server side
  const response = await fetch(apiUrl, {
    method: 'GET',
    cache: 'no-cache', // Optional: control caching behavior
  });

  if (!response.ok) {
    // Handle the error appropriately
    throw new Error(`Error fetching order data: ${response.status}`);
  }

  const orderData = await response.json();

  // Render the page
  return (
    <main className='w-screen flex flex-col overflow-x-hidden'>
      <section className='flex items-center gap-3 justify-center py-16 flex-col'>
        <div className='flex gap-3 items-center'>
          <div className='border-2 border-gray-600 rounded-full w-fit p-3'>
            <IoCheckmark className='text-4xl text-gray-600' />
          </div>
          <div>
            <h3 className='text-2xl text-gray-600 text-left w-full'>
              Thank you, {name || "Customer"}!
            </h3>
            <h5 className='text-left text-gray-600'>Your order is placed.</h5>
          </div>
        </div>
        {paymentMethod !== "COD" && (
          <div>
            <p className="text-center">
              You have chosen an online payment method. <br />
              Kindly send us a screenshot of the receipt on <a className='underline font-bold text-light-blue-800' href="https://wa.me/923323947336" target='_blank'>WhatsApp</a>.<br />
              In unverified cases, the payment will be COD.
            </p>
          </div>
        )}
        <div className='py-10 px-10'>
          <Link href="/products" className='text-center bg-red-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-900 mb-8 block'>
            Continue Shopping
          </Link>
          <p>(Use promo code "OLDFRIEND" for a special discount on your next order 😉)</p>
        </div>
      </section>
    </main>
  );
};

export default OrderConfirmationPage;
