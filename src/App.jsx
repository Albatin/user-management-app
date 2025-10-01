import { useState } from "react";
import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="App">
      <h1>User Management App</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
