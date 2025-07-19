import React from "react";

const TikTokEmbed = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-white rounded-2xl shadow-lg">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Shaking Loved by Many — Including <span className="text-red-500">ALI BHAI HYDERABADI</span> ❤️
        </h2>
        <p className="text-gray-600 text-lg">
          Aisa vibe jo sabko nacha de! Don’t miss the energy and charm that has everyone — from the streets of Hyderabad to TikTok — vibing nonstop.🔥
        </p>
      </div>

      {/* Right Side: TikTok Embed */}
      <div className="md:w-1/2 w-full flex justify-center">
        <iframe
          src="https://www.tiktok.com/embed/v2/7526979862087732488"
          width="325"
          height="580"
          allowFullScreen
          className="rounded-xl border-none"
        ></iframe>
      </div>
    </div>
  );
};

export default TikTokEmbed;