import { BraintreePayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";

const UserManagementList = () => {
  const users = [
    {
      name: "Rishabh", // Fixed typo in name
      email: "rishabh@gmail.com",
      role: "Admin",
    },
  ];

  // ❌ Incorrect use of useState — You used square brackets instead of parentheses
  // ❌ You also declared `IsformData` with uppercase "I", which is against convention
  // ✅ Fixed useState syntax and variable naming
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // ✅ Renamed `IsformData` to `formData` inside handler for consistency
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit =(e)=>{
e.preventDefault()
console.log(formData)
setFormData({
  name:"",
  password:"",
  email:""
})
}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Add new User Form */}
      <div className="p-6 rounded-lg mb-6 bg-gray-100">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* ❌ Missing label text and name attribute in input */}
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserManagementList;
