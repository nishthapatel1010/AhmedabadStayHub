import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState({
    location: "",
    propertyType: "",
    gender: "",
    rooms: "",
  });

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilter({
      location: "",
      propertyType: "",
      gender: "",
      rooms: "",
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white p-6 h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-white text-2xl absolute top-6 left-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        <h2 className={`text-2xl font-semibold mb-4 ${isOpen ? "block" : "hidden"}`}>Filters</h2>

        {/* Filter Section */}
        <div className="space-y-4">
          <div className={isOpen ? "block" : "hidden"}>
            <label className="block mb-2 text-lg">Location</label>
            <select
              name="location"
              value={filter.location}
              onChange={handleFilterChange}
              className="p-2 rounded border w-full"
            >
              <option value="">Select Location</option>
              <option value="city-center">City Center</option>
              <option value="suburbs">Suburbs</option>
              <option value="outskirts">Outskirts</option>
            </select>
          </div>

          <div className={isOpen ? "block" : "hidden"}>
            <label className="block mb-2 text-lg">Property Type</label>
            <select
              name="propertyType"
              value={filter.propertyType}
              onChange={handleFilterChange}
              className="p-2 rounded border w-full"
            >
              <option value="">Select Property Type</option>
              <option value="pg">PG</option>
              <option value="hostel">Hostel</option>
              <option value="rent-house">Rent House</option>
            </select>
          </div>

          <div className={isOpen ? "block" : "hidden"}>
            <label className="block mb-2 text-lg">Gender</label>
            <select
              name="gender"
              value={filter.gender}
              onChange={handleFilterChange}
              className="p-2 rounded border w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
          </div>

          <div className={isOpen ? "block" : "hidden"}>
            <label className="block mb-2 text-lg">Number of Rooms</label>
            <select
              name="rooms"
              value={filter.rooms}
              onChange={handleFilterChange}
              className="p-2 rounded border w-full"
            >
              <option value="">Select Number of Rooms</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
            </select>
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={() => alert(`Filtered by: ${JSON.stringify(filter)}`)}
            className={`mt-4 bg-blue-600 text-white p-2 rounded w-full ${isOpen ? "block" : "hidden"}`}
          >
            Apply Filter
          </button>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className={`mt-2 bg-gray-500 text-white p-2 rounded w-full ${isOpen ? "block" : "hidden"}`}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
