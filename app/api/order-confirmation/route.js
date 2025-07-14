// /app/api/order-confirmation/route.js

import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from "../../lib/firebase/firbaseConfig";
import ConfirmationEmail from '../../components/ConfirmationEmail';
import AdminOrderNotification from '../../components/AdminOrderNotification';

// POST request to confirm the order
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
  
    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), { status: 400 });
    }
  
    try {
      const docRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(docRef);
  
      if (!orderDoc.exists()) {
        return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
      }
  
      const orderData = orderDoc.data();
      return new Response(JSON.stringify(orderData), { status: 200 });
    } catch (error) {
      console.error("Error fetching order data:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch order data" }), { status: 500 });
    }
  }

// Helper function to retrieve admin emails
const getAdminEmails = async () => {
  const emails = [];
  const emailsSnapshot = await getDocs(collection(db, "Admins"));

  emailsSnapshot.forEach((docSnapshot) => {
    const emailData = docSnapshot.data();
    if (emailData.Email) {
      emails.push(emailData.Email);
    }
  });

  return emails;
};
