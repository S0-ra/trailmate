import ProductFilter from "./ProductFilter";
import CategoryGrid from "./../category/CategoryGrid";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProduct } from "../../context/ProductContext";

export const ProductCatalog = () => {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const { filter, searchQuery } = useProduct();

  useEffect(() => {
    axios 
      .get("http://localhost:8000/api/equipment")
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let updatedEquipment = [...equipment];

    // Apply search filter
    if (searchQuery) {
      updatedEquipment = updatedEquipment.filter((item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (filter.maxPrice) {
      updatedEquipment = updatedEquipment.filter(
        (item) => item.price <= filter.maxPrice
      );
    }

    // Apply location filter
    if (filter.location) {
      updatedEquipment = updatedEquipment.filter(
        (item) => item.location === filter.location
      );
    }

    // Apply rating filter
    if (filter.rating > 0) {
      updatedEquipment = updatedEquipment.filter(
        (item) => item.rating >= filter.rating
      );
    }

    setFilteredEquipment(updatedEquipment);
  }, [filter, equipment, searchQuery]); // Added searchQuery to dependencies

  return (
    <>
      <section className="text-sm pb-3 pt-10 flex ml-20">
        <a href="/">Home</a>
        <p>&nbsp;&gt;&nbsp;</p>
        <a href="#" className="text-red-400">
          All Categories
        </a>
      </section>
      <div className="container py-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold title-part mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Categories"}
          </h1>
          <p className="text-sm text-gray-600">
            {searchQuery 
              ? `Showing ${filteredEquipment.length} results for "${searchQuery}"`
              : "Explore all the gear, accessories, and essentials for your trekking adventure. Get the ultimate trekking experience at one place."}
          </p>
        </div>
        {/*Main Container*/}
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          <ProductFilter />
          <main className="w-full lg:w-3/4">
            {!searchQuery && <CategoryGrid />}
            <ProductList equipment={filteredEquipment} />
          </main>
        </div>
      </div>
    </>
  );
};