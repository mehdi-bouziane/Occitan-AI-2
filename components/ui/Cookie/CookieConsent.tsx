"use client"
import React from 'react';
import { hasCookie, setCookie } from "cookies-next";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setShowConsent(!hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setCookie("localConsent", "true"); // Cookie will expire in 365 days
    setShowConsent(false);
  };

  const declineCookie = () => {
    setCookie("localConsent", "false"); // Cookie will expire in 365 days
    setShowConsent(false);
  };

  if (showConsent === null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-700 text-white p-5 z-50">
      <div className="flex-1">
        <p className="font-bold">Your Privacy, Our Priority</p>
        <p>
          We use cookies on our website to provide you with a more personalised digital experience. By clicking "Accept", you consent to the use of ALL the cookies. However, you may visit "Decline" to decline.
        </p>
      </div>
      <div className="flex-initial">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded" onClick={acceptCookie}>
          Accept
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-700 rounded ml-4" onClick={declineCookie}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
