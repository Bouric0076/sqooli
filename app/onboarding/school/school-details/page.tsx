"use client";
import React, { useState } from "react";
import { Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchoolRegistrationForm() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolMotto: "",
    schoolCode: "",
    schoolEmail: "",
    schoolWebsite: "",
    description: "",
    logo: null,
    county: "",
    city: "",
    address: "",
    adminEmail: "",
    adminPhone: "+254",
  });
  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");

    router.push("/school");
  };

  return (
    <div className="min-h-screen  w-full">
      <div className=" bg-white rounded-xl shadow-lg p-12">
        {/* Logo - Top Left Small */}
        <div className="flex items-center gap-0.5 mb-8">
          {["s", "q", "o", "o", "li"].map((letter, index) => (
            <div
              key={index}
              className={`w-7 h-7 flex items-center justify-center text-white font-bold text-sm
                ${
                  index === 0
                    ? "bg-blue-700"
                    : index === 1
                    ? "bg-blue-600"
                    : index === 2
                    ? "bg-blue-500"
                    : index === 3
                    ? "bg-blue-400"
                    : "bg-blue-600"
                }`}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Large Center Logo */}
        <div className="flex justify-center items-center gap-1 mb-8">
          {["s", "q", "o", "o", "li"].map((letter, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center text-white font-bold text-3xl rounded
                ${
                  index === 0
                    ? "bg-blue-600"
                    : index === 1
                    ? "bg-yellow-500"
                    : index === 2
                    ? "bg-teal-400"
                    : index === 3
                    ? "bg-teal-500"
                    : "bg-blue-400"
                }`}
            >
              {letter}
            </div>
          ))}
        </div>

        <h1 className="text-xl font-normal text-center mb-12 text-gray-900">
          Add the following details of your school
        </h1>

        {/* School Details Section */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-6 text-gray-900">
            School Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Name of School
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                School Motto (optional)
              </label>
              <input
                type="text"
                name="schoolMotto"
                value={formData.schoolMotto}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  School Code
                </label>
                <input
                  type="text"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  School Email
                </label>
                <input
                  type="email"
                  name="schoolEmail"
                  value={formData.schoolEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                School Website (optional)
              </label>
              <input
                type="url"
                name="schoolWebsite"
                value={formData.schoolWebsite}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a short description of the school..."
                rows={5}
                className="w-full px-4 py-3 rounded-3xl bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Logo (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/svg+xml,image/png,image/jpeg,image/gif"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Upload className="text-gray-400" size={24} />
                  </div>
                  <p className="text-sm mb-1">
                    <span className="text-blue-500 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  {formData.logo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.logo.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Address Section */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1 text-gray-900">
            Physical Address
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Add physical address details
          </p>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  County
                </label>
                <div className="relative">
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none text-sm text-gray-400 pr-10"
                  >
                    <option value="">Select...</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none text-sm text-gray-400 pr-10"
                  >
                    <option value="">Select...</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-3xl bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Admin Details Section */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1 text-gray-900">
            Admin Details
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Admin will receive instructions to complete school profile
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Official Email Address
              </label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2">
                Official Phone Number
              </label>
              <div className="flex rounded-full overflow-hidden bg-gray-100">
                <div className="flex items-center px-4 py-3 bg-gray-100">
                  <span className="text-xl mr-1">🇰🇪</span>
                  <svg
                    className="w-3 h-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 bg-gray-100 border-0 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button
            onClick={() => router.back()}
            type="button"
            className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-full transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium shadow-md"
          >
            Save & Submit
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
