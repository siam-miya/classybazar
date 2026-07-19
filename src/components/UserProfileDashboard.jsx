"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import { toast } from "react-toastify";

const UserProfileDashboard = () => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeMenu, setActiveMenu] = useState("My Profile");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveMenu(tab);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    toast.success("Changes saved successfully!");
  };

  return (
    <div className="container py-10 mx-auto px-4 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-black mb-2">Manage My Account</h3>
            <ul className="pl-4 space-y-2 text-sm text-gray-500">
              <li 
                onClick={() => setActiveMenu("My Profile")}
                className={`cursor-pointer transition-colors ${
                  activeMenu === "My Profile" ? "text-[#eb6e1b] font-medium" : "hover:text-black"
                }`}
              >
                My Profile
              </li>
            </ul>
          </div>

          {/* My Orders */}
          <div>
            <h3 className="font-semibold text-black mb-2">My Orders</h3>
            <ul className="pl-4 space-y-2 text-sm text-gray-500">
              <li 
                onClick={() => setActiveMenu("My Returns")}
                className={`cursor-pointer transition-colors ${
                  activeMenu === "My Returns" ? "text-[#eb6e1b] font-medium" : "hover:text-black"
                }`}
              >
                My Returns
              </li>
              <li 
                onClick={() => setActiveMenu("My Cancellations")}
                className={`cursor-pointer transition-colors ${
                  activeMenu === "My Cancellations" ? "text-[#eb6e1b] font-medium" : "hover:text-black"
                }`}
              >
                My Cancellations
              </li>
              <li 
                onClick={() => setActiveMenu("Order Track")}
                className={`cursor-pointer transition-colors ${
                  activeMenu === "Order Track" ? "text-[#eb6e1b] font-medium" : "hover:text-black"
                }`}
              >
                Order Track
              </li>
            </ul>
          </div>

          {/* My WishList */}
          <div>
            <h3 
              onClick={() => setActiveMenu("My WishList")}
              className={`font-semibold cursor-pointer transition-colors ${
                activeMenu === "My WishList" ? "text-[#eb6e1b]" : "text-black hover:text-[#eb6e1b]"
              }`}
            >
              My WishList
            </h3>
          </div>
        </div>

        <div className="md:col-span-3 bg-white p-6 md:p-10 rounded shadow-sm border border-gray-50 flex flex-col justify-center min-h-[400px]">
          
          {/* প্রোফাইল ট্যাব অ্যাক্টিভ থাকলে এই ফর্মটি দেখাবে */}
          {activeMenu === "My Profile" && (
            <>
              <h2 className="text-xl font-medium text-black mb-6">Edit Your Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Email & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Password Changes */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-black">Password Changes</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-100 px-4 py-3 text-sm rounded outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end items-center space-x-6 pt-4">
                  <button
                    type="button"
                    className="text-sm font-medium text-black hover:text-red-500 transition-colors cursor-pointer"
                    onClick={() => alert("Cancelled")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#eb6e1b] cursor-pointer text-white px-8 py-3 text-sm font-medium rounded hover:bg-black transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          )}

          {activeMenu !== "My Profile" && (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-black mb-2">{activeMenu}</h2>
              
              {/* প্রোফাইল ড্যাশবোর্ডের ভেতরে অর্ডার ট্র্যাক বাটনে ক্লিক করলে এটি দেখাবে */}
              {activeMenu === "Order Track" ? (
                <div className="bg-gray-50 py-8 rounded-lg border border-dashed border-gray-200">
                  <p className="text-gray-600 text-sm font-poppins">
                     No active orders tracking in your profile dashboard.
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm bg-gray-50 py-8 rounded-lg border border-dashed border-gray-200">
                  No data found
                </p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default UserProfileDashboard;