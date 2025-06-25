import React, { useState, useEffect } from "react";
import { getCategories } from "../../services/api";

function FilterSidebar({ onFilterChange, isMobileOpen, onMobileClose }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({
      category,
      priceRange,
    });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setTempPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
    onFilterChange({
      category: selectedCategory,
      priceRange: tempPriceRange,
    });
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000 });
    setTempPriceRange({ min: 0, max: 1000 });
    onFilterChange({
      category: "",
      priceRange: { min: 0, max: 1000 },
    });
  };

  const sidebarClasses = `${
    isMobileOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 fixed md:sticky top-0 md:top-24 left-0 z-40 w-72 h-screen md:h-auto transition-transform duration-300 ease-in-out bg-slate-50 md:bg-slate-50/80 md:backdrop-blur-sm shadow-xl md:shadow-lg p-6 overflow-y-auto border-r border-slate-200/50`;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-30 md:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-xl font-bold text-slate-900">Filters</h2>
          <button
            onClick={onMobileClose}
            className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-200 rounded-full transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5 flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
            Category
          </h3>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-11 bg-slate-200 rounded-xl"></div>
              <div className="h-11 bg-slate-200 rounded-xl"></div>
              <div className="h-11 bg-slate-200 rounded-xl"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  selectedCategory === ""
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "hover:bg-white text-slate-700 hover:shadow-sm border border-slate-200/50"
                }`}
                onClick={() => handleCategoryChange("")}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 capitalize text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "hover:bg-white text-slate-700 hover:shadow-sm border border-slate-200/50"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5 flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
            Price Range
          </h3>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="min-price"
                  className="block text-xs font-medium text-slate-600 mb-2"
                >
                  Min Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 text-sm font-medium">
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    name="min"
                    id="min-price"
                    value={tempPriceRange.min}
                    onChange={handlePriceRangeChange}
                    min="0"
                    max={tempPriceRange.max}
                    className="pl-7 block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="max-price"
                  className="block text-xs font-medium text-slate-600 mb-2"
                >
                  Max Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 text-sm font-medium">
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    name="max"
                    id="max-price"
                    value={tempPriceRange.max}
                    onChange={handlePriceRangeChange}
                    min={tempPriceRange.min}
                    className="pl-7 block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={applyPriceFilter}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              Apply Filter
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200/60 pt-6">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center text-slate-600 hover:text-slate-800 font-medium py-2.5 px-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 border border-slate-200/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset All Filters
          </button>
        </div>
      </aside>
    </>
  );
}

export default FilterSidebar;
