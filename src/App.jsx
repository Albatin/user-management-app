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
    <div className="container mx-auto p-4">
      <h1>User Management App</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
