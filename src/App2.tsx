import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import Spinner from "./components/Spinner";

const url = "https://jsonplaceholder.typicode.com/users1";

interface User {
  id: number;
  name: string;
}

const App2 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError('');
        setIsLoading(true);
        const { data } = await axios.get<User[]>(url, {
          signal: controller.signal,
        });

        setUsers(data);
        setIsLoading(false);
        
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const deleteUser = (id: number) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== id));
    axios.delete(`${url}/${id}`).catch((err: AxiosError) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];

    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    axios.post(url, newUser)
    .then(({data: savedUser}) => setUsers([savedUser, ...users]))
    .catch(err => {
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
        {users.map(({ id, name }) => (
          <li
            key={id}
            className="list-group-item d-flex justify-content-between"
          >
            {name}{" "}
            <button
              onClick={() => deleteUser(id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App2;