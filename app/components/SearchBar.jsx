"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ type = "full", onPostSearch }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // onPostSearch();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
        <input
          className="w-full border border-gray-300 bg-white h-12 px-4 pr-12 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          name="search"
          required
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </form>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBar />
    </Suspense>
  );
}
