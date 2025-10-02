import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import { useDispatch } from "react-redux";
import { setApiUsers } from "./store/usersSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setApiUsers(data));
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          User Management
        </h1>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
