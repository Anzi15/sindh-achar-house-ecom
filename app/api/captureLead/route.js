import { db } from "../../lib/firebase/firbaseConfig"; // Adjust the path as needed
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function POST(req) {
  const { phoneNumber } = await req.json();
  try {
    const leadsCollection = collection(db, "leads");
    const q = query(leadsCollection, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return new Response(JSON.stringify({ error: "Already a subscriber" }), { status: 400 });
    }

    await addDoc(leadsCollection, { phoneNumber, createdAt: new Date() });
    return new Response(JSON.stringify({ message: "Subscribed successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to subscribe" }), { status: 500 });
  }
}
