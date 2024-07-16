export type SearchParams = {
  q: string;
  priceMin: string;
  priceMax: string;
  ratingMin: string;
  ratingMax: string;
};

export type HistoryItem = SearchParams & {
  date: string;
};
