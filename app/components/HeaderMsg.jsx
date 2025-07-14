// HeaderMsg.jsx (Server Component)
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firbaseConfig";

const HeaderMsg = async () => {
  const msgDoc = await getDoc(doc(db, "storeManagement", "headerNotificationMsg"));
  const headerMsg = msgDoc.exists() ? msgDoc.data().value : "Al Zehra z";

  return (
    <div className="w-full bg-black py-2 text-white md:text-lg sm:text-sm text-[0.85rem] text-center">
      {headerMsg}
    </div>
  );
};

export default HeaderMsg;
