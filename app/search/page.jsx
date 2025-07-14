import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firbaseConfig";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { IoIosOptions } from "react-icons/io";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Image from "next/image";
import ProductCardGroup from "../components/ProductCardGroup";
import AnimatedDiv from "../components/AnimatedDiv";

// Helper function to fetch all books from Firestore
const getAllBooks = async () => {
  try {
    const booksCollectionRef = collection(db, "Products");
    const querySnapshot = await getDocs(booksCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export async function generateMetadata({ searchParams }) {
    const query = searchParams.query || "";
  return {
    title: `Search results for ${query}`,
    description:
      `Looking for the best match to ${query}? here are the results you need!`,
  };
}

export default async function ProductsPage({ searchParams }) {
  const query = searchParams.query || ""; // Fetch 
  const sortParam = searchParams.sort; // Fetch the sort parameter

  let products = await getAllBooks();

  // Filter products based on the query parameter
  if (query) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Sort products based on the sort parameter
  if (sortParam === "price") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (sortParam === "title") {
    products = products.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="md:px-6">
      {products.length > 0 ? <><div className="px-6 flex w-full justify-between items-center">
        <h1 className="md:text-[3rem] text-3xl uppercase text-left md:py-18 py-8">{query || "Products"}</h1>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex items-center gap-2 w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <IoIosOptions className="2xl" />
              <p className="md:block hidden">Filter & Sort</p>
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <Link href="?sort=title" className="block px-4 py-2 text-sm text-gray-700">
                  Sort by Title
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="?sort=price" className="block px-4 py-2 text-sm text-gray-700">
                  Sort by Price
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <div className="w-full grid lg:grid-cols-4 gap-3 md:p-2 p-6">
        {products.map((product) => (
          <AnimatedDiv>
            <ProductCard
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                key={product.id}
                price={product.price}
                title={product.title}
                image1={product.primaryImg}
                link={`/product/${product.id}`}
                comparePrice={product.comparePrice}
                productData={product}
            />
          </AnimatedDiv>
        ))}
      </div></>:
      <>
      <div className="min-h-[70vh]">
            <Image src="https://i.ibb.co/KWjrFgZ/d6dr79w7vh-O38a-INu-H.png" alt="no search results" width="480" height="480" className="w-full max-w-lg m-auto" />

            <div className="w-full justify-center flex flex-col items-center">

        <h1 className="text-[3rem] text-center">No Results Found</h1>

        <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg my-9"
            >
            Take me Home
          </Link>
              </div>
      </div>
   </>}
    </div>
  );
}