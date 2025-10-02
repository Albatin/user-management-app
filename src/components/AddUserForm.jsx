import React, { useState } from "react";

const AddUserForm = ({ onAddUser }) => {
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
    onAddUser(newUser);

    setName("");
    setEmail("");
    setCompany("");
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Name (required)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Email (required)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
