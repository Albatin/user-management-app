import { useState } from "react";
import { Link } from "react-router-dom";
import AddUserForm from "./AddUserForm";

const UserList = ({ users, localUsers, setLocalUsers, loading }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) return <p>Loading users...</p>;
  const allUsers = [...localUsers, ...users];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
    if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h2>User List</h2>
      <AddUserForm
        onAddUser={(newUser) => setLocalUsers((prev) => [newUser, ...prev])}
      />

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by Name ({sortOrder === "asc" ? "A → Z" : "Z → A"})
      </button>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  state={{ user }}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.company?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
