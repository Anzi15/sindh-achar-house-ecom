"use client"; // Required for client-side rendering

import Header from './components/Header';
import "../app/globals.css";
import "../app/app.css";
import HeaderMsg from './components/HeaderMsg';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProviderProps';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from './lib/firebase/firbaseConfig';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === '/checkout' || pathname.startsWith('/admin');
  const [headerText, setHeaderText] = useState("Sindh Achar House | Quality Home made achars");
  const [blockMessage, setBlockMessage] = useState(null);

  useEffect(() => {
    const fetchHeaderMsg = async () => {
      try {
        const docRef = doc(db, "storeManagement", "headerNotificationMsg");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeaderText(docSnap.data().value);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching header message:", error);
      }
    };

    fetchHeaderMsg();
  }, []);
  useEffect(() => {
    const checkManagementDoc = async () => {
      try {
        const docRef = doc(db, "management", "msWbvZ8AmQ0ojP9Xbvxu");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const docDate = data.date?.toDate();
          console.log(docDate) // Convert Firestore Timestamp to JavaScript Date
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison

          if (docDate && docDate <= today) {
            setBlockMessage(data.message || "Website access is restricted for today.");
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching management document:", error);
      }
    };

    checkManagementDoc();
  }, []);

  // Facebook Pixel Initialization
  useEffect(() => {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '586209311174860');
    fbq('track', 'PageView');
  }, []); // Run only once on page load


  // if (blockMessage) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-center p-6">
  //       <h1 className="text-2xl font-bold">{blockMessage}</h1>
  //     </div>
  //   );
  // }
  return (
    <html lang="en">
      <Head>
        <title>Sindh Achar House | Home made achar 
        </title>
        <link rel="icon" href="/logo.svg" sizes="any" />
        <meta name="description" content="Sindh Achar House" />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1694861041450835&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
        <ToastProvider>
        {blockMessage ? (
          <div className="flex items-center justify-center h-screen text-center p-6">
            <h1 className="text-2xl font-bold">{blockMessage}</h1>
          </div>
        ) : (
      <body className="antialiased" suppressHydrationWarning={true}>
          {!hideHeaderFooter && (
            <>
              <Header headerText={headerText}>
              </Header>
            </>
          )}
          {children}
          <FloatingWhatsApp phoneNumber='923047210222' accountName='Sindh Achar House' statusMessage='Online' chatMessage="Asalam o alekum sir, kese hein ap?" darkMode={true} avatar="/logo.svg" />
          {!hideHeaderFooter && (
            <>
              <Footer />
            </>
          )}
      </body>
        
        )}
        </ToastProvider>
    </html>
  );
}
