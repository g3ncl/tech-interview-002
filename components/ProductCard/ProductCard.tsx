import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="flex-grow">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full "
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-blue-600 font-bold mb-2">
          {`€${product.price.toFixed(2)}`}
        </p>

        <p className="text-gray-600 text-sm mb-2">
          {`Rating: `}
          <span className="font-bold">
            {product.reviewAverageRating.toFixed(1)}
          </span>
        </p>
      </div>
    </div>
  );
};
export default ProductCard;
