import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const localUser = location.state?.user;

  const [user, setUser] = React.useState(localUser || null);
  const [loading, setLoading] = React.useState(!localUser);

  React.useEffect(() => {
    if (!localUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [id, localUser]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>Loading user details...</p>;
  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone || "N/A"}
      </p>
      <p>
        <strong>Website:</strong> {user.website || "N/A"}
      </p>
      <p>
        <strong>Address:</strong> {user.address?.street || "N/A"},{" "}
        {user.address?.city || ""}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name || "N/A"}
      </p>
      <Link to="/">Back to User</Link>
    </div>
  );
};

export default UserDetails;
