import { useEffect, useState } from "react";
import { Users, Package, FileText, Menu, Plus, Edit, Trash2, X } from "lucide-react";

const AdminDashboard = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("users");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Data States
  const [totalUsers, setTotalUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [postList, setPostList] = useState([]);
  
  // Form States
  const [formData, setFormData] = useState({});

  // Menu Configuration
  const menuItems = [
    { id: "users", label: "Users", icon: Users },
    { id: "equipments", label: "Equipments", icon: Package },
    { id: "posts", label: "Posts", icon: FileText }
  ];

  // API Calls
  const fetchData = async () => {
    try {
      switch (activeTab) {
        case "users":
          { const [usersCount, users] = await Promise.all([
            fetch("http://localhost:8000/api/users/count").then(res => res.json()),
            fetch("http://localhost:8000/api/all-users").then(res => res.json())
          ]);
          setTotalUsers(usersCount.totalUsers);
          setUserList(users);
          break; }
        case "equipments":
          { const equipment = await fetch("http://localhost:8000/api/equipment").then(res => res.json());
          setEquipmentList(equipment);
          break; }
        case "posts":
          { const posts = await fetch("http://localhost:8000/api/post").then(res => res.json());
          setPostList(posts);
          break; }
      }
      setError("");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Form Handlers
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  // CRUD Operations
  const handleAdd = async () => {
    try {
      const dataToSend = activeTab === "posts" 
        ? { ...formData, createdAt: new Date().toISOString() }
        : formData;

      const response = await fetch(`http://localhost:8000/api/${activeTab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) throw new Error("Failed to add item");
      
      setSuccess("Item added successfully");
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const dataToSend = activeTab === "posts" 
        ? { ...formData, updatedAt: new Date().toISOString() }
        : formData;

      const response = await fetch(`http://localhost:8000/api/${activeTab}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) throw new Error("Failed to update item");
      
      setSuccess("Item updated successfully");
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${activeTab}/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) throw new Error("Failed to delete item");
      
      setSuccess("Item deleted successfully");
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  // Render Functions
  const renderForm = () => {
    switch (activeTab) {
      case "equipments":
        return (
          <>
            <input
              type="text"
              name="name"
              placeholder="Equipment Name"
              value={formData.name || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <select
              name="availabilitystatus"
              value={formData.availabilitystatus || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </>
        );
      case "posts":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={formData.title || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              name="content"
              placeholder="Post Content"
              value={formData.content || ""}
              onChange={handleFormChange}
              rows={6}
              className="w-full mb-4 p-2 border rounded resize-none"
            />
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    const getColumns = () => {
      switch (activeTab) {
        case "users":
          return [
            { key: "userid", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "datejoined", label: "Date Joined", format: (value) => new Date(value).toLocaleDateString() }
          ];
        case "equipments":
          return [
            { key: "equipmentid", label: "ID" },
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "price", label: "Price", format: (value) => `$${value}` },
            { key: "availabilitystatus", label: "Status" }
          ];
        case "posts":
          return [
            { key: "postid", label: "ID" },
            { key: "content", label: "Content", format: (value) => value?.length > 100 ? value.substring(0, 100) + "..." : value },
            { key: "createdAt", label: "Created", format: (value) => new Date(value).toLocaleDateString() }
          ];
        default:
          return [];
      }
    };

    const data = activeTab === "users" ? userList : 
                 activeTab === "equipments" ? equipmentList : 
                 postList;

    const columns = getColumns();

    return (
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="p-4 text-left font-medium text-gray-700">
                  {col.label}
                </th>
              ))}
              <th className="p-4 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item[`${activeTab.slice(0, -1)}id`]} className="border-t">
                {columns.map(col => (
                  <td key={col.key} className="p-4">
                    {col.format ? col.format(item[col.key]) : item[col.key]}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex space-x-2">
                    {activeTab !== "users" && (
                      <button
                        onClick={() => openModal("edit", item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item[`${activeTab.slice(0, -1)}id`])}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:hidden p-4">
        <button
          className="p-2 hover:bg-gray-200 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex">
        <aside className={`
          ${isMobileMenuOpen ? "block" : "hidden"}
          lg:block w-64 bg-white h-screen fixed lg:sticky top-0 shadow-lg
        `}>
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-2 p-3 rounded-lg
                      ${activeTab === item.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:ml-28eve">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              {activeTab !== "users" && (
                <button
                  onClick={() => openModal("add")}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {activeTab.slice(0, -1)}
                </button>
              )}
            </div>

            {activeTab === "users" && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Overview</h3>
                <div className="text-2xl font-bold">{totalUsers} Total Users</div>
              </div>
            )}

            {renderTable()}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalType === "add" ? "Add" : "Edit"} {activeTab.slice(0, -1)}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              modalType === "add" ? handleAdd() : handleEdit(selectedItem[`${activeTab.slice(0, -1)}id`]);
            }}>
              {renderForm()}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {modalType === "add" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;