import React, { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import DeleteConfirmPopup from "../pages/DeleteConfirmPopup";
import AddEditContact from "../pages/AddEditContact";

const dummyContacts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  address: `Address ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `98765${10000 + i}`,
}));

const ContactTable = () => {
  const [contacts] = useState(dummyContacts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedContactData, setSelectedContactData] = useState(null);

  const totalPages = Math.ceil(contacts.length / pageSize);
  const indexOfFirst = (currentPage - 1) * pageSize;
  const indexOfLast = currentPage * pageSize;
  const currentContacts = contacts.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleFormSubmit = (formData) => {
    console.log("Submitted form:", formData);
    // TODO: API call (update or create based on `formData.id`)
    setShowFormModal(false);
    setSelectedContactId(null);
    setSelectedContactData(null);
  };

  const handleDelete = () => {
    console.log("Deleting contact with ID:", selectedContactId);
    // TODO: Replace this with actual API call
    setShowDeleteModal(false);
  };
  const openDeleteModal = (id) => {
    setSelectedContactId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow-md p-4">
      {/* Top Controls: Page size + Pagination icons */}
      <div className="flex flex-wrap justify-between items-center mb-3 gap-3">
        <h2 className="text-xl font-semibold text-[#229799]">Contact List</h2>

        <div className="flex items-center space-x-4">
          {/* Page size dropdown */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="pageSize"
              className="text-sm font-medium text-gray-700"
            >
              Show Top:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Prev/Next Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
              title="Previous"
            >
              <HiChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
              title="Next"
            >
              <HiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Table */}
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-[#48CFCB] text-white">
          <tr>
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, idx) => (
            <tr key={contact.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{indexOfFirst + idx + 1}</td>
              <td className="px-4 py-2">
                {contact.firstName} {contact.lastName}
              </td>
              <td className="px-4 py-2">{contact.address}</td>
              <td className="px-4 py-2">{contact.email}</td>
              <td className="px-4 py-2">{contact.phone}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedContactId(contact.id);
                      setSelectedContactData(contact);
                      setShowFormModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <HiPencil className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => openDeleteModal(contact.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Page Info */}
      <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
        Page <strong className="mx-1">{currentPage}</strong> of{" "}
        <strong className="ml-1">{totalPages}</strong>
      </div>

      {/* Edit Contact */}
      <AddEditContact
        isOpen={showFormModal}
        contact={selectedContactData}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Confirm Delete */}
      <DeleteConfirmPopup
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ContactTable;
