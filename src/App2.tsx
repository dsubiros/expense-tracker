import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const url = "https://jsonplaceholder.typicode.com/users1";

interface User {
  id: number;
  name: string;
}

const App2 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<User[]>(url);
        setUsers(data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <p className="text-danger">ERROR: {error}</p>}

      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default App2;
