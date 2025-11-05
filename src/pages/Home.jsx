import React, { useEffect, useState } from "react";
import { Plus, Package, Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ProductsForm from "../components/ProductsForm";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../utils/ProductsApi";
import DeleteDialog from "../components/DeleteDialog";
import {
  successToast,
  infoToast,
  deleteToast,
  errorToast,
} from "../utils/toastUtils";

const Home = () => {
  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setTimeout(() => setProducts(data), 800); 
      } catch (error) {
        toast.error("Failed to fetch products ❌");
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProducts();
  }, []);

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selected === "all" || product.category === selected;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Delete Products
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      deleteToast("Product deleted successfully ");
    } catch (error) {
      errorToast("Failed to delete product ");
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // Add & Edit Products
  const handleSave = async (data) => {
    try {
      if (!data.title || !data.price || !data.category || !data.description) {
        toast.warning("Please fill all required fields ⚠️");
        return;
      }

      if (editProduct) {
        const updated = await updateProduct(editProduct.id, data);
        setProducts(
          products.map((p) => (p.id === editProduct.id ? updated : p))
        );
        infoToast("Product updated successfully ");
        setEditProduct(null);
      } else {
        const newProduct = await addProduct(data);
        setProducts([...products, newProduct]);
        successToast("Product added successfully ");
      }
    } catch (error) {
      errorToast("Something went wrong ");
    } finally {
      setShowModal(false);
    }
  };

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 pt-3">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Product Dashboard
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage your product inventory
                  </p>
                </div>
              </div>

              {/* Search + Category */}
              <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-3 md:gap-4">
                <div className="relative w-full sm:w-64 md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                <div className="relative w-full sm:w-48">
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-md py-2 pl-3 pr-8 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={() => {
                  setEditProduct(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>
        </header>

        {/* PRODUCTS GRID */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-20 py-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200 rounded-xl"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <div className="p-5 space-y-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-tight text-gray-800 line-clamp-2">
                        {product.title}
                      </h3>
                      <span className="text-blue-600 font-bold text-lg sm:text-xl whitespace-nowrap">
                        ${product.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setEditProduct(product);
                          setShowModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md py-2 text-sm font-medium transition"
                      >
                        <FontAwesomeIcon icon={faPen} />
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 cursor-pointer text-white hover:bg-red-600 rounded-md py-2 text-sm font-medium transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}

      {showModal && (
        <ProductsForm
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialData={editProduct}
        />
      )}

      <DeleteDialog
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        productTitle={productToDelete?.title}
      />
    </>
  );
};

export default Home;
