"use client";
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const WhatsAppLeadForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLeadForm = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(false);
    setLoading(true);
    
    try {
      const response = await fetch("/api/captureLead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        setIsFormSubmitted(true);
        setError(""); // Clear any previous error
        toast.success(data.message);
      }
    } catch (e) {
      setError("Can't connect to database, try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 5000);
    }
  };

  const validatePhoneNumber = (number) => {
    const regex = /^(\+92|0)?3[0-9]{9}$/;
    return regex.test(number);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    if (!validatePhoneNumber(value)) {
      setError("Please enter a valid number (e.g., +923XXXXXXXXX)");
    } else {
      setError("");
    }
  };

  return (
    <form
      className="flex flex-col items-start justify-center gap-4 h-full w-fit max-w-[100%] py-6"
      onSubmit={handleLeadForm}
    >
      <h1 className="max-w-lg text-xl text-left font-semibold tracking-tight xl:text-2xl text-white">
        Avail Future Discount by Signing up to our WhatsApp newsletter
      </h1>

      <div className="flex items-center gap-2 w-[100%]">
        <input
          id="whatsapp"
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          required
          className={`px-4 py-2 border rounded-md bg-gray-900 text-gray-300 w-[95%] border-gray-600 focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 ${
            error ? "border-red-500" : ""
          }`}
          placeholder="WhatsApp Number"
        />
        <Button
          className="px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
          loading={loading}
          type="submit"
        >
          Subscribe
        </Button>
      </div>
      {error && !isFormSubmitted && <p className="text-red-500 mt-2">{error}</p>}
      {isFormSubmitted && <p className="text-green-300 mt-2">✅ Subscribed Successfully!</p>}
    </form>
  );
};

export default WhatsAppLeadForm;
