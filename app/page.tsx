"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/types/product";
import { SearchParams } from "@/types/search";
import { generateQueryString, updateHistory } from "@/utils/search";
import Link from "next/link";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [q, setQ] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryParams: SearchParams = {
      q: q,
      priceMin: priceMin,
      priceMax: priceMax,
      ratingMin: ratingMin,
      ratingMax: ratingMax,
    };

    updateHistory(queryParams);
    const queryString = generateQueryString(queryParams);

    try {
      setLoading(true);
      const response = await fetch(`/api/search?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error during search:", error);
      setLoading(false);
    }
  };

  return (
    <main className=" bg-gray-100 min-h-screen w-screen flex justify-center px-4 py-8">
      <div className="max-w-6xl flex mflex flex-col flex-col  items-center ">
        <div className="max-w-5xl   p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between align-middle mb-6">
            <h2 className="text-2xl font-bold  text-gray-800 ">Search</h2>
            <Link
              href="/history"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Search History
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            <div className="flex items-center bg-gray-100  border border-gray-200  rounded-lg px-4 py-2">
              <input
                type="text"
                name="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="bg-transparent w-full focus:outline-none text-gray-800 bg-gray-100"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="priceMin"
                  className="block text-sm whitespace-nowrap font-medium text-gray-700 mb-1"
                >
                  Min Price
                </label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  min="0"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="priceMax"
                  className="block text-sm  whitespace-nowrap font-medium text-gray-700 mb-1"
                >
                  Max Price
                </label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="2500"
                  max="2500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="ratingMin"
                  className="block text-sm  whitespace-nowrap font-medium text-gray-700 mb-1"
                >
                  Min Rating
                </label>
                <input
                  type="number"
                  id="ratingMin"
                  name="ratingMin"
                  value={ratingMin}
                  onChange={(e) => setRatingMin(e.target.value)}
                  placeholder="1"
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="ratingMax"
                  className="block text-sm  whitespace-nowrap font-medium text-gray-700 mb-1"
                >
                  Max Rating
                </label>
                <input
                  type="number"
                  id="ratingMax"
                  name="ratingMax"
                  value={ratingMax}
                  onChange={(e) => setRatingMax(e.target.value)}
                  placeholder="5"
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>
        {loading ? (
          <div
            role="status"
            className="flex grow items-center justify-center w-full"
          >
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          products.length > 0 && (
            <div className="max-w-5xl ">
              <h2 className="text-2xl mt-6 font-semibold text-gray-800 mb-6">
                Products found
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default HomePage;
