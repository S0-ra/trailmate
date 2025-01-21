import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Settings,
  ShoppingCart,
  LayoutDashboard,
  ListChecks,
  Users2,
} from "lucide-react";
/* eslint-disable react/prop-types */

const initialProducts = [
  {
    id: 1,
    name: "Hiking Boots Pro",
    category: "Footwear",
    price: 2000,
    inventory: 45,
    status: "In Stock",
    image: "/api/placeholder/320/320",
    availability: "buy",
    description: "Professional hiking boots for all terrains",
    location: "Kathmandu",
  },
  {
    id: 2,
    name: "Sleeping Bag",
    category: "Footwear",
    price: 12803,
    inventory: 12,
    status: "In Stock",
    image: "/api/placeholder/320/320",
    availability: "rent",
    description: "Professional hiking boots for all terrains",
    location: "Pokhara  ",
  },
];

// Sidebar Components remain unchanged
const SidebarItem = ({ icon: Icon, text, isActive, link }) => (
  <a href={link}>
    <div
      className={`
      flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
      ${
        isActive
          ? "bg-gray-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }
    `}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </div>
  </a>
);

const Sidebar = () => (
  <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col fixed">
    <div className="px-4 py-3 mb-6">
      <h1 className="text-xl font-bold text-gray-800">TrailMate</h1>
    </div>

    <div className="space-y-1">
      <SidebarItem icon={LayoutDashboard} text="Dashboard" link="/vendor"/>
      <SidebarItem icon={ShoppingCart} text="Order" link="/vendor/order" />
      <SidebarItem icon={ListChecks} text="Listing" link="/vendor/listing" isActive={true} />
      <SidebarItem icon={Settings} text="Setting" />
    </div>

    <div className="mt-8">
      <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase">
        Links
      </div>
      <div className="space-y-1">
        <SidebarItem icon={Users2} text="Community" link="/community" />
      </div>
    </div>

    <div className="mt-auto">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <div className="font-medium text-gray-700">Dehan Pun</div>
          <div className="text-sm text-gray-500">dehanpun28@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
);

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Product
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Category
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Price
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Location
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Availability
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image || "/api/placeholder/320/320"}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="font-medium">{product.name}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {product.category}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                Rs {product.price}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {product.location}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.availability === "buy"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                  {product.availability.charAt(0).toUpperCase() +
                    product.availability.slice(1)}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-gray-500 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AddProductForm = ({ onSubmit, onCancel }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    status: "In Stock",
    image: null,
    availability: "buy",
    description: "",
    location: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview("/api/placeholder/320/320");
      setNewProduct({ ...newProduct, image: "/api/placeholder/320/320" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...newProduct,
      price: parseFloat(newProduct.price),
      inventory: parseInt(newProduct.inventory),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            ) : (
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
            )}
            <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Daily Retal Price / Item Price)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.inventory}
              onChange={(e) =>
                setNewProduct({ ...newProduct, inventory: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.location}
              onChange={(e) =>
                setNewProduct({ ...newProduct, location: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newProduct.availability}
              onChange={(e) =>
                setNewProduct({ ...newProduct, availability: e.target.value })
              }>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

const ListingPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (newProduct) => {
    const product = {
      id: products.length + 1,
      ...newProduct,
    };
    setProducts([product, ...products]); // Add new product at the beginning of the array
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    // Implement edit functionality
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Product Listing</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
            <input
              type="search"
              placeholder="Search products..."
              className="px-4 py-2 rounded-lg bg-gray-100"
            />
          </div>
        </div>

        {showAddForm && (
          <AddProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <ProductTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ListingPage;