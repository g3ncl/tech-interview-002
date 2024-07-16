// app/api/search/route.ts
import {
  RetrievedProduct,
  RetrievedProductsResponse,
  Product,
  ProductsResponse,
  Review,
} from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

/**
 * Calculates the average rating of an array of reviews.
 *
 * @param {ReadonlyArray<Review>} reviews - The array of reviews.
 * @return {number} The average rating of the reviews.
 */
const calculateAverageRating = (reviews: ReadonlyArray<Review>): number =>
  reviews.length === 0
    ? 0
    : reviews.reduce((sum, { rating }) => sum + rating, 0) / reviews.length;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("q");
  const ratingMin = searchParams.get("ratingMin");
  const ratingMax = searchParams.get("ratingMax");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  try {
    // Fetch all products from the DummyJSON API
    const baseUrl = "https://dummyjson.com/products";
    const apiUrl = searchQuery
      ? `${baseUrl}/search?q=${encodeURIComponent(searchQuery)}`
      : `${baseUrl}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: RetrievedProductsResponse = await response.json();
    const ratingMinValue = ratingMin ? parseFloat(ratingMin) : null;
    const ratingMaxValue = ratingMax ? parseFloat(ratingMax) : null;

    const priceMinValue = priceMin ? parseFloat(priceMin) : null;
    const priceMaxValue = priceMax ? parseFloat(priceMax) : null;

    //Change the object structure to FilteredProduct and filter products based on query parameters
    const filteredProducts: Product[] = data.products
      .map((product: RetrievedProduct) => ({
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        reviewAverageRating: calculateAverageRating(product.reviews),
      }))
      .filter((product: Product) => {
        return (
          (!ratingMinValue || product.reviewAverageRating >= ratingMinValue) &&
          (!ratingMaxValue || product.reviewAverageRating <= ratingMaxValue) &&
          (!priceMinValue || product.price >= priceMinValue) &&
          (!priceMaxValue || product.price <= priceMaxValue)
        );
      });
    const productsResponse: ProductsResponse = {
      products: filteredProducts,
      total: filteredProducts.length,
    };

    return NextResponse.json(productsResponse);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}
