/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Settings,
  ShoppingCart,
  LayoutDashboard,
  ListChecks,
  Users2,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

// Sample order data
const initialOrders = [
  {
    id: "ORD-1",
    customer: "John Doe",
    items: [
      { name: "Hiking Boots Pro", quantity: 1, price: 199.99 },
      { name: "Camping Tent XL", quantity: 1, price: 299.99 }
    ],
    total: 5000,
    status: "completed",
    paymentStatus: "paid",
    date: "2025-01-14",
    shippingAddress: "Kapan, Kathmandu",
    email: "johndoe@email.com"
  },
  {
    id: "ORD-2",
    customer: "Steven",
    items: [
      { name: "Hiking Boots Pro", quantity: 1, price: 199.99 },
      { name: "Camping Tent XL", quantity: 1, price: 299.99 }
    ],
    total:  13000,
    status: "completed",
    paymentStatus: "paid",
    date: "2025-01-13",
    shippingAddress: "Kapan, Kathmandu",
    email: "johndoe@email.com"
  },
  {
    id: "ORD-3",
    customer: "John Smith",
    items: [
      { name: "Climbing Rope", quantity: 1, price: 89.99 },
      { name: "Carabiners Set", quantity: 2, price: 45.99 }
    ],
    total: 3000,
    status: "pending",
    paymentStatus: "pending",
    date: "2025-01-15",
    shippingAddress: "456 Oak Ave, Portland, OR 97201",
    email: "sarah.j@email.com"
  },
];

// Reuse previous Sidebar components...
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
      <SidebarItem icon={LayoutDashboard} text="Dashboard" link="/vendor" />
      <SidebarItem icon={ShoppingCart} text="Order" isActive={true} link="/vendor/order" />
      <SidebarItem icon={ListChecks} text="Listing" link="/vendor/listing" />
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

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800"
  };

  const StatusIcon = {
    completed: CheckCircle2,
    pending: Clock,
    cancelled: XCircle
  }[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <StatusIcon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrderDetails = ({ order, onClose, onUpdateStatus }) => {
  const isPending = order.status === "pending";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Order Details - {order.id}</h3>
        <div className="flex items-center gap-3">
          {isPending && (
            <>
              <button
                onClick={() => onUpdateStatus(order.id, "completed")}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Complete Order
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, "cancelled")}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Cancel Order
              </button>
            </>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Customer Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> {order.customer}</p>
            <p><span className="text-gray-500">Email:</span> {order.email}</p>
            <p><span className="text-gray-500">Shipping Address:</span> {order.shippingAddress}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Order Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Order Date:</span> {order.date}</p>
            <p><span className="text-gray-500">Status:</span> <StatusBadge status={order.status} /></p>
            <p><span className="text-gray-500">Payment Status:</span> {order.paymentStatus}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Order Items</h4>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Price</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td colSpan="3" className="px-4 py-2 text-right">Total</td>
                <td className="px-4 py-2 text-right">${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update selected order if it's currently being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" ? true : order.status === statusFilter
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex items-center gap-4">
            <select
              className="px-4 py-2 rounded-lg bg-white border border-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {selectedOrder ? (
          <OrderDetails 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Customer</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Total</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Payment</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td 
                        className="py-4 px-6 text-sm font-medium text-blue-600 cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        {order.id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">{order.customer}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{order.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">Rs {order.total.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </td>
                      <td className="py-4 px-6">
                        {order.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(order.id, "completed")}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, "cancelled")}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;