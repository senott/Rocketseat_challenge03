import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); 

  async function handleAddRepository() {
    const response = await api.post('/repositories', { 
      title: `Novo repositório ${Date.now()}`,
      url: 'http://github.com/...',
      techs: ['React', 'Javascript']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
      
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const updatedRepositories = [...repositories];
    
    updatedRepositories.splice(repositoryIndex, 1);

    setRepositories(updatedRepositories);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => {
          return (
            <li key={ repository.id }>
              { repository.title }

              <button onClick={ () => handleRemoveRepository(repository.id) }>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
