import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AddEditContact from "../pages/AddEditContact";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [showFormModal, setShowFormModal] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log("Submitted New Contact:", formData);
    // TODO: Add API logic here
    setShowFormModal(false);
  };

  return (
    <>
      <nav className="bg-[#48CFCB] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-wide">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            </Link>

            {/* Nav Links */}
            <div className="flex items-center space-x-4">
              <SearchBar />
              <button
                onClick={() => setShowFormModal(true)}
                className="bg-[#229799] hover:bg-[#1f8c8d] text-white px-4 py-2 rounded-md transition"
              >
                + Add Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add Contact Modal */}
      <AddEditContact
        isOpen={showFormModal}
        contact={null} // Blank form
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};

export default NavBar;
