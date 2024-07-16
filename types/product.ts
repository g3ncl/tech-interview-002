export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type RetrievedProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

export type RetrievedProductsResponse = {
  products: RetrievedProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type Product = Pick<
  RetrievedProduct,
  "title" | "price" | "thumbnail" | "category"
> & {
  reviewAverageRating: number;
};
export type ProductsResponse = {
  products: Product[];
  total: number;
};
