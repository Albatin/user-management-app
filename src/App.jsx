import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>User Management App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <UserList
              users={users}
              localUsers={localUsers}
              setLocalUsers={setLocalUsers}
              loading={loading}
            />
          }
        />
        <Route
          path="/users/:id"
          element={<UserDetails users={[...localUsers, ...users]} />}
        />
      </Routes>
    </div>
  );
}

export default App;
