import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddUserForm from "./AddUserForm";
import { addUser, deleteUser, updateUser } from "../store/usersSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { apiUsers, localUsers } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCompany, setEditCompany] = useState("");

  const allUsers = [...localUsers, ...apiUsers];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "none") return 0;

    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleSortToggle = () => {
    if (sortOrder === "none") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("none");
  };
  const startEditing = (user) => {
    setEditingUserId(user.id);
    setEditName(user.name || "");
    setEditEmail(user.email || "");
    setEditCompany(user.company?.name || "");
  };

  const saveEdit = (id) => {
    dispatch(
      updateUser({
        id,
        data: {
          name: editName,
          email: editEmail,
          company: { name: editCompany },
        },
      })
    );
    setEditingUserId(null);
  };

  const cancelEdit = () => setEditingUserId(null);

  return (
    <div>
      <h2>User List</h2>
      <AddUserForm onAddUser={handleAddUser} />

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <button onClick={handleSortToggle}>
        Sort by Name (
        {sortOrder === "none"
          ? "None"
          : sortOrder === "asc"
          ? "A → Z"
          : "Z → A"}
        )
      </button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <Link
                    to={`/users/${user.id}`}
                    state={{ user }}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {user.name}
                  </Link>
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                  />
                ) : (
                  user.company?.name || "N/A"
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={() => saveEdit(user.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
