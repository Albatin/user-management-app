import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";

const AddUserForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: company || "N/A" },
    };
    dispatch(addUser(newUser));

    setName("");
    setEmail("");
    setCompany("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Add New User</h3>
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          placeholder="Name (required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email (required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors duration-200 whitespace-nowrap"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
