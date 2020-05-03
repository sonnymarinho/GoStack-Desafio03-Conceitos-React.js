import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories([...repositories, ...response.data]);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Desafio 03 - ${Date.now()}`,
      url: "http://github.com/404",
      techs:["tech 01", "tech 02"]
    }

    const response = await api.post('repositories', data);

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // console.log({id})
    api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      repository => repository.id === id
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);

  }

  return (
    <div>

      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
