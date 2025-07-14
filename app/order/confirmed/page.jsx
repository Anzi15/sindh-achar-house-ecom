"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import OrderConfirmationPage from "./[orderId]/page";

const OrderConfirmation = () => {
  const [animate, setAnimate] = useState(false);
  const searchParams = useSearchParams();
  
  // Get order details from URL query parameters
  const orderId = searchParams.get("orderId") || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const paymentMethod = searchParams.get("paymentMethod") || "Credit Card";
  const customerName = searchParams.get("name") || "Customer";
  const orderDate = searchParams.get("date") || new Date().toLocaleDateString();
  const orderTotal = searchParams.get("total") || "---";

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center md:justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Animated checkmark container */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          {/* Circle background */}
          <div 
            className={`absolute inset-0 rounded-full border-4 ${
              animate ? "border-green-500 scale-100 opacity-100" : "border-gray-200 scale-90 opacity-0"
            } transition-all duration-700 ease-out`}
          />
          
          {/* Checkmark */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20,50 L40,70 L80,30"
              stroke="#22c55e"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${
                animate ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300 ease-in-out delay-500`}
              style={{
                strokeDasharray: 120,
                strokeDashoffset: animate ? 0 : 120,
                transition: "stroke-dashoffset 0.8s ease-in-out 0.7s"
              }}
            />
          </svg>
        </div>

        {/* Confirmation text */}
        <h1 
          className={`text-2xl font-bold text-gray-800 mb-2 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-700 delay-[1200ms]`}
        >
          Your order has been placed!
        </h1>
        
        <p 
          className={`text-gray-600 mb-8 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-700 delay-[1400ms]`}
        >
          Thank you, {customerName}! Your order has been confirmed and will arrive in 2-3 days.
        </p>

        {/* Order details */}
        <div 
          className={`bg-gray-50 rounded-lg p-4 mb-6 text-left ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-700 delay-[1600ms]`}
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order number:</span>
            <span className="font-medium">#{orderId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{orderDate}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Payment method:</span>
            <span className="font-medium">{formatPaymentMethod(paymentMethod)}</span>
          </div>
          {orderTotal !== "---" && (
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">Rs. {orderTotal}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-3 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-700 delay-[1800ms]`}
        >
          <Link className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300" href="/">
            Continue shopping
          </Link>
        </div>
      </div>

      {/* Confetti effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {animate && Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-2 h-2 rounded-full"
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `confetti 3s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Custom keyframes for confetti */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to format payment method codes into readable text
function formatPaymentMethod(method) {
  const methodMap = {
    'COD': 'Cash on Delivery',
    'JZC': 'JazzCash',
    'EZP': 'EasyPaisa',
    'BT': 'Bank Transfer',
  };
  
  return methodMap[method] || method;
}
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  );
}