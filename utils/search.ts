import { SearchParams } from "@/types/search";

/**
 * Updates the history in the local storage with the given query parameters and the current date.
 *
 * @param {SearchParams} queryParams - The query parameters to update the history.
 * @return {void} This function does not return anything.
 */
export const updateHistory = (queryParams: SearchParams) => {
  if (typeof window !== "undefined") {
    const historyString = localStorage.getItem("history");
    let history = historyString ? JSON.parse(historyString) : [];
    history.push({ ...queryParams, date: new Date().toISOString() });
    localStorage.setItem("history", JSON.stringify(history));
  }
};
/**
 * Generates a query string from the given search parameters.
 *
 * @param {SearchParams} params - The search parameters to include in the query string.
 * @return {string} The generated query string.
 */
export const generateQueryString = (params: SearchParams): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
};
