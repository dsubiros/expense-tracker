import React, { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
// import apiClient, { CanceledError, AxiosError } from "./services/api-client";
import apiClient, { CanceledError } from "./services/apiClient";
import userServices, { User } from "./services/userServices";

const App2 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userServices.getAll();

    request
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return cancel;
  }, []);

  const deleteUser = (id: number) => {
    const originalUsers = [...users];

    const { request, cancel } = userServices.deleteOne(id);

    setUsers(users.filter((u) => u.id !== id));
    // apiClient.delete(`/users/${id}`)
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];

    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    const { request, cancel } = userServices.saveOne(newUser);

    // apiClient
    // .post("/users", newUser)
    request
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + "!" };
    const { request, cancel } = userServices.saveOne(updatedUser);

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // apiClient.patch(`/users/${user.id}`, updatedUser)
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">ERROR: {error}</p>}
      {isLoading && <Spinner />}

      <button onClick={addUser} className="btn btn-primary mb-3">
        Submit
      </button>

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}{" "}
            <div>
              <button
                onClick={() => updateUser(user)}
                className="btn btn-sm btn-outline-secondary mx-1"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="btn btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App2;
