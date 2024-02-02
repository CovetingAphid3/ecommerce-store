

export const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=9");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error so that the caller can handle it
    }
  };
  
  export const PRODUCTS = [];

