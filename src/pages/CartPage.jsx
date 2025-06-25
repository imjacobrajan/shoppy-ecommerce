import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function CartPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-slate-50 rounded-3xl p-12 max-w-md mx-auto">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Looks like you haven't added any products to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
        <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 h-24 bg-slate-50 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-3"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        <Link
                          to={`/product/${item.id}`}
                          className="hover:text-indigo-600 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-slate-600 font-medium">
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-all"
                        disabled={item.quantity <= 1}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M20 12H4"></path>
                        </svg>
                      </button>
                      <span className="mx-3 text-slate-900 font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-all"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 4v16m8-8H4"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-bold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-6">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-rose-600 hover:text-rose-700 font-medium hover:bg-rose-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Tax</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(totalPrice * 0.1)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-slate-900">
                    {formatPrice(totalPrice * 1.1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95"
                onClick={() => alert("Order Placed")}
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Secure checkout
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                SSL encrypted
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Promo Code
            </h3>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter discount code"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
