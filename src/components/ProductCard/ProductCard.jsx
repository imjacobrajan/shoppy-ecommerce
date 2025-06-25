import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const originalPrice =
    product.price * 1.15 > product.price + 10
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price * 1.15)
      : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col h-full border border-slate-200/50"
    >
      {originalPrice && (
        <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-rose-500/20">
          Sale
        </span>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 opacity-80 hover:opacity-100 z-10 transition-all duration-200 hover:scale-110 shadow-lg border border-slate-200/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-600 hover:text-rose-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="relative pt-[120%] bg-slate-50/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full uppercase tracking-wider capitalize">
            {product.category}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-3 group-hover:text-indigo-600 transition-colors leading-relaxed">
          {product.title}
        </h3>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating?.rate || 0)
                      ? "text-amber-400"
                      : "text-slate-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-500 ml-2 font-medium">
              ({product.rating?.count || 0})
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900">
              {formattedPrice}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-500 line-through font-medium">
                {originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
