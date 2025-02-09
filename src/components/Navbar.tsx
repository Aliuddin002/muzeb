import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => (
  <div className="flex justify-between items-center bg-blue-700 text-white p-4">
    <h1 className="text-2xl font-bold">MUZEB</h1>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by singer, title, genre..."
        className="p-2 rounded-l-md"
      />
      <button className="bg-blue-900 p-2 rounded-r-md">
        <FaSearch />
      </button>
    </div>
  </div>
);

export default Navbar;
