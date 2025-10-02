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
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
        User List
      </h2>

      <AddUserForm onAddUser={handleAddUser} />

      <div className="flex flex-col md:flex-row gap-3 mb-4 sm:mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <button
          onClick={handleSortToggle}
          className="px-4 sm:px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
        >
          Sort by Name (
          {sortOrder === "none"
            ? "None"
            : sortOrder === "asc"
            ? "A → Z"
            : "Z → A"}
          )
        </button>
      </div>

      <div className="block md:hidden space-y-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
          >
            {editingUserId === user.id ? (
              <div className="space-y-3">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  placeholder="Company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveEdit(user.id)}
                    className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 px-3 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <Link
                    to={`/users/${user.id}`}
                    state={{ user }}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-lg"
                  >
                    {user.name}
                  </Link>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Company:</strong> {user.company?.name || "N/A"}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(user)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {sortedUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <Link
                      to={`/users/${user.id}`}
                      state={{ user }}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200 text-sm sm:text-base"
                    >
                      {user.name}
                    </Link>
                  )}
                </td>
                <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm sm:text-base">
                      {user.email}
                    </span>
                  )}
                </td>
                <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm sm:text-base">
                      {user.company?.name || "N/A"}
                    </span>
                  )}
                </td>
                <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => saveEdit(user.id)}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-green-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => startEditing(user)}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
