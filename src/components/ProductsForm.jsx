 import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    }
  );

  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(res.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category) {
      toast.warning("Please complete all fields");
      return;
    }
    onSave(formData);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="relative w-full h-full overflow-y-auto flex justify-center p-4">
        <div
          ref={modalRef}
          className={`bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow-2xl p-6 my-auto transform transition-all duration-300 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-5 scale-95"
          }`}
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
              {initialData ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600 text-2xl font-bold leading-none"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                placeholder="Enter product title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">Price</label>
              <input
                type="number"
                placeholder="Enter product price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">Image URL</label>
              <input
                type="url"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">Description</label>
              <textarea
                rows="3"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 cursor-pointer text-white font-medium rounded-md hover:bg-blue-600 transition"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;
