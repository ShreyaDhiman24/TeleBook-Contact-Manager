import { useEffect, useState } from "react";

const AddEditContact = ({ isOpen, onClose, onSubmit, contact }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (contact) setForm(contact);
    else
      setForm({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
      });
  }, [contact]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#229799]">
            {contact ? "Edit Contact" : "Add Contact"}
          </h2>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#229799] hover:bg-[#1f8c8d] text-white py-2 rounded"
          >
            {contact ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditContact;
