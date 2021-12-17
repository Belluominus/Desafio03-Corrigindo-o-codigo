const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repositorie = repositories.find(repositorie => id === repositorie.id)

  const repositoryIndex = repositories.indexOf(repositorie);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  updatedRepository.likes = repositorie.likes;

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find(repositorie => id === repositorie.id)

  const repositoryIndex = repositories.indexOf(repositorie);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find(repositorie => id === repositorie.id)

  const repositoryIndex = repositories.indexOf(repositorie);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  repositories[repositoryIndex].likes = likes;

  return response.json({
    likes: likes
  });
});

module.exports = app;
