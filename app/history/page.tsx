"use client";
import React, { useState, useEffect, useCallback } from "react";
import { HistoryItem } from "@/types/search";

/**
 * Formats a given ISO string date into a specific format.
 *
 * @param {string} isoString - The ISO string date to format.
 * @return {string} The formatted date string.
 */
const formatDate = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const loadHistory = useCallback(() => {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("Failed to parse history:", error);
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    loadHistory();

    const listenerFunction = (e: StorageEvent) => {
      if (e.key === "history") {
        loadHistory();
      }
    };
    window.addEventListener("storage", listenerFunction);
    return () => {
      window.removeEventListener("storage", listenerFunction);
    };
  }, [loadHistory]);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <main className="bg-gray-100 min-h-screen w-screen flex justify-center px-4 py-8">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg relative">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Search History
          </h2>
          <button
            onClick={clearHistory}
            className="absolute top-6 right-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 text-sm"
          >
            Clear
          </button>
          {history.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Search Query
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Min Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Max Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Min Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Max Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {history.map((params, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {params.q || "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {params.priceMin || "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {params.priceMax || "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {params.ratingMin || "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {params.ratingMax || "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(params.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No search history available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
