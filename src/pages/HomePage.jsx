import React, { useState, useEffect } from "react";
import { getProducts, getProductsByCategory } from "../services/api";
import ProductList from "../components/ProductList/ProductList";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import Pagination from "../components/Pagination/Pagination";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000 },
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const productsPerPage = 10;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (filters.category) {
          data = await getProductsByCategory(filters.category);
        } else {
          data = await getProducts(100);
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters.category]);

  useEffect(() => {
    let result = [...products];

    result = result.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    if (sortOption) {
      switch (sortOption) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "popularity":
          result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, filters.priceRange, sortOption]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("product-list-top").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden bg-white p-2 rounded-md border border-gray-300 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="relative">
            <label htmlFor="sort" className="sr-only">
              Sort products
            </label>
            <div className="relative">
              <select
                id="sort"
                name="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md min-w-[180px]"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="popularity">Most Popular</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          onFilterChange={handleFilterChange}
          isMobileOpen={isMobileFilterOpen}
          onMobileClose={() => setIsMobileFilterOpen(false)}
        />

        <main className="flex-1" id="product-list-top">
          <div className="mb-4 flex flex-wrap justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0} -{" "}
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>
          </div>

          <ProductList
            products={currentProducts}
            loading={loading}
            error={error}
          />

          {filteredProducts.length > productsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
