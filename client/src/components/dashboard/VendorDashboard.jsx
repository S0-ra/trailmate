import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Settings,
  ShoppingCart,
  Package,
  Users,
  LayoutDashboard,
  ListChecks,
  Users2,
} from "lucide-react";
/* eslint-disable react/prop-types */

// Card Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Sidebar Components
const SidebarItem = ({ icon: Icon, text, isActive, link }) => (
  <a href={link}>
    <div
      className={`
    flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
    ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
  `}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </div>
  </a>
);

const Sidebar = () => (
  <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col fixed">
    {/* Logo */}
    <div className="px-4 py-3 mb-6">
      <h1 className="text-xl font-bold text-gray-800">TrailMate</h1>
    </div>

    {/* Main Navigation */}
    <div className="space-y-1">
      <SidebarItem
        icon={LayoutDashboard}
        text="Dashboard"
        isActive={true}
        link="/vendor"
      />
      <SidebarItem icon={ShoppingCart} text="Order" link="/vendor/order" />
      <SidebarItem icon={ListChecks} text="Listing" link="/vendor/listing" />
      <SidebarItem icon={Settings} text="Setting" />
    </div>

    {/* Links Section */}
    <div className="mt-8">
      <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase">
        Links
      </div>
      <div className="space-y-1">
        <SidebarItem icon={Users2} text="Community" link="/community" />
      </div>
    </div>

    {/* User Profile */}
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

// Dashboard Data
const monthlyData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 8000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 2000 },
  { month: "May", revenue: 8000 },
  { month: "Jun", revenue: 8000 },
  { month: "Jul", revenue: 6000 },
  { month: "Aug", revenue: 2000 },
  { month: "Sep", revenue: 9000 },
  { month: "Oct", revenue: 8000 },
  { month: "Nov", revenue: 8000 },
  { month: "Dec", revenue: 2000 },
];

// Main Layout Component
const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        {" "}
        {/* Add margin to offset fixed sidebar */}
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Overview</h1>
            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg bg-gray-100"
              />
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <div className="text-3xl font-bold">Rs 15,000</div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="revenue" fill="#FFB800" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Visits</div>
                  <div className="font-semibold">112</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Sales</div>
                  <div className="font-semibold">13</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-orange-100">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Made</div>
                  <div className="font-semibold">Rs 18k</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-red-100">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Customers</div>
                  <div className="font-semibold">7</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Products Table */}
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500">
                        <th className="text-left p-2">Product</th>
                        <th className="text-left p-2">Inventory</th>
                        <th className="text-left p-2">Sale</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Today</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 rounded" />
                          <div>
                            <div>Trekking Bag</div>
                            <div className="text-sm text-gray-500">
                              Blue - 50 orders
                            </div>
                          </div>
                        </td>
                        <td className="p-2">10</td>
                        <td className="p-2">Rs 1,900</td>
                        <td className="p-2">Rs 1,300</td>
                        <td className="p-2">Rs 1,700</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
