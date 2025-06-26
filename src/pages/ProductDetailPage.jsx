import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";
import { useCart } from "../contexts/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mockImages = [product?.image, product?.image, product?.image].filter(
    Boolean
  );

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-slate-200 rounded-2xl h-96"></div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded-xl w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-6 py-4 rounded-xl">
          <p className="font-medium">{error}</p>
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const originalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price * 1.15);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center mb-8 text-sm">
        <Link
          to="/"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Home
        </Link>
        <svg
          className="w-4 h-4 mx-2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          to="/"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Shop
        </Link>
        <svg
          className="w-4 h-4 mx-2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-slate-700 capitalize font-medium">
          {product.category}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden aspect-square">
            <img
              src={mockImages[selectedImageIndex] || product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex space-x-3">
            {mockImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-indigo-500 ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-contain p-2 bg-slate-50"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <div className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full uppercase tracking-wider capitalize mb-3">
              {product.category}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="ml-2 text-sm font-medium text-slate-600">
                {product.rating?.rate.toFixed(1)} ({product.rating?.count}{" "}
                reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-slate-900">
              {formattedPrice}
            </span>
            <span className="text-xl text-slate-500 line-through font-medium">
              {originalPrice}
            </span>
            <span className="bg-rose-100 text-rose-700 text-sm font-semibold px-2 py-1 rounded-full">
              Save 13%
            </span>
          </div>

          <p className="text-slate-700 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-slate-700 mr-3"
              >
                Quantity:
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95"
            >
              Add to Cart
            </button>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-8 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
              Buy Now
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-6 border-t border-slate-200">
            <button className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat
            </button>
            <button className="flex items-center text-slate-600 hover:text-rose-500 transition-colors font-medium">
              <svg
                className="h-5 w-5 mr-2"
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
              Wishlist
            </button>
            <button className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors font-medium">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="bg-white rounded-2xl border border-slate-200/50 p-8">
          <div className="flex flex-col items-start mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 ">
            <h2 className="text-2xl font-bold text-slate-900">
              Customer Reviews
            </h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
              Write Review
            </button>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                    <div className="flex text-amber-400 mr-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="font-semibold text-slate-900">
                      Absolutely love this product!
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    Alex T. • June 15, 2025
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-slate-500">24</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                This is exactly what I was looking for. The quality is
                outstanding and it fits perfectly. The shipping was fast and the
                packaging was excellent. Highly recommend this to anyone looking
                for a reliable product!
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                    <div className="flex text-amber-400 mr-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < 4 ? "text-amber-400" : "text-slate-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="font-semibold text-slate-900">
                      Great value for the price
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    Jamie R. • May 28, 2025
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-slate-500">12</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                I was hesitant at first, but this product exceeded my
                expectations. The build quality is solid and it works exactly as
                described. Would definitely buy again!
              </p>
            </div>

            <div className="text-center pt-4">
              <button className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                View All Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
