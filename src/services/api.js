const API_URL = "https://fakestoreapi.com";

export async function getProducts(limit = 10, offset = 0) {
  try {
    const response = await fetch(`${API_URL}/products?limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
}
