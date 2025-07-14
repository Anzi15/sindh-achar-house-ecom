import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../lib/firebase/firbaseConfig";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { IoIosOptions } from "react-icons/io";
import Link from "next/link";
import ProductCardGroup from "../components/ProductCardGroup";
import ProductFilters from "../components/ProductsFilters";

import { GiHamburgerMenu } from "react-icons/gi";
import ProductsPageUi from "../components/ProductsPageUi";

export async function generateMetadata() {
  const docs = await getDocs(collection(db, "Products"));
  const products = [];

  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  const productCount = products.length;
  const title =
    productCount > 0
      ? ` ${productCount} Shikarpuri achars`
      : "No products available";

  return {
    title,
    description: "Looking for the best shikarpuri achars in Pakistan? Check out our top picks and reviews to find the perfect taste that suits your buds!",
  };
}

export default async function ProductsPage({ searchParams }) {
  const selectedFilters = searchParams?.filter 
    ? (Array.isArray(searchParams.filter) ? searchParams.filter : [searchParams.filter]) 
    : []; // Ensure it is always an array
  const sortOption = searchParams?.sort || "title"; // Default sorting by title

  // Build query based on sort and filter
  const q = query(
    collection(db, "Products"),
    ...(selectedFilters.length > 0 ? [where("tags", "array-contains-any", selectedFilters)] : []),
    orderBy(sortOption === "price" ? "price" : "title", "asc")
  );

  const docs = await getDocs(q);
  const products = [];

  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  // Function to handle filter toggle
  const handleFilterChange = (filter) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter) // Remove filter if already selected
      : [...selectedFilters, filter]; // Add filter if not selected

    return {
      pathname: "/products",
      query: {
        ...searchParams,
        filter: newFilters.length > 0 ? newFilters : undefined, // Set filter to undefined if empty
      },
    };
  };

  return (
    <div>
      <div className="px-6 flex w-full justify-between items-center py-4">
        <h1 className="md:text-[3rem] text-3xl flex  items-center">Products</h1>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex items-center gap-2 w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <IoIosOptions className="2xl" />
              Filter & Sort
            </MenuButton>
          </div>
          <MenuItems
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
          >
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
              Filter
              {/* Use the ProductFilters component here */}
              <ProductFilters selectedFilters={selectedFilters} searchParams={searchParams} />
            </div>
          </MenuItems>
        </Menu>
      </div>
     <ProductsPageUi products={products}/>
    </div>
  );
}
