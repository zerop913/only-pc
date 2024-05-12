import React, { useState, useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import Menu from "../Products/Menu";

const CategoryProducts = ({ category, subcategory, handleAddToBuilder }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:3001/api/v1/${subcategory || category}`;
        if (subcategory) {
          url += `?subcategory=${subcategory}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data.slice(0, 10));
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  const loadMoreProducts = async () => {
    try {
      const start = filteredProducts.length;
      const end = start + 10;
      const newProducts =
        appliedFilters.length > 0
          ? products
              .filter((product) =>
                appliedFilters.every((filter) =>
                  filter.filter_values.some(
                    (value) =>
                      product[filter.filter_name] === value ||
                      product[filter.filter_name].includes(value)
                  )
                )
              )
              .slice(start, end)
          : products.slice(start, end);

      setFilteredProducts([...filteredProducts, ...newProducts]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error loading more products:", error);
    }
  };

  const handleApplyFilters = (selectedFilters) => {
    setAppliedFilters(selectedFilters);

    if (selectedFilters.length === 0) {
      setFilteredProducts(products.slice(0, 10));
      setCurrentPage(1);
      setTotalPages(Math.ceil(products.length / 10));
    } else {
      const filteredData = products.filter((product) =>
        selectedFilters.every((filter) =>
          filter.filter_values.some(
            (value) =>
              product[filter.filter_name] === value ||
              product[filter.filter_name].includes(value)
          )
        )
      );
      setFilteredProducts(filteredData.slice(0, 10));
      setCurrentPage(1);
      setTotalPages(Math.ceil(filteredData.length / 10));
    }
  };

  return (
    <div>
      <Menu
        category={subcategory || category}
        onApplyFilters={handleApplyFilters}
      />
      <div className="flex flex-col gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.product_title}
            image={product.product_images}
            price={product.price}
            categoryName={subcategory || category}
            onAddToBuilder={handleAddToBuilder}
            product={product}
          />
        ))}
      </div>
      {currentPage < totalPages && (
        <div className="flex justify-center mt-4 mb-4">
          <button
            className="bg-[#3C3A46] text-white px-4 py-2 rounded hover:bg-[#514f5e] transition-colors duration-300 ease-in-out"
            onClick={loadMoreProducts}
          >
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
