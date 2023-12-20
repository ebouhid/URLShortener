import express from "express";
import {
  createURLrepository,
  RepositoryType,
} from "./adapters/repositoryAdapter";
import { shortenUrlUsecase } from "./usecases/shortenUrl";
import bodyParser from "body-parser";
import { retrieveUrlUsecase } from "./usecases/retrieveUrl";

const app = express();
const port = 3000;

// Choose the repository type (e.g., InMemory or MongoDB)
const repositoryType = RepositoryType.InMemory;

const urlRepository = createURLrepository(repositoryType);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/shorten", async (req, res) => {
  const usecase = new shortenUrlUsecase(urlRepository);
  const originalUrl = req.body.url as string;
  if (!originalUrl) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }
  try {
    const savedUrl = await usecase.perform(originalUrl);
    console.log("Saved URL", savedUrl);
    res.json(savedUrl);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error shortening URL", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.error("Unexpected error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.get("/retrieve", async (req, res) => {
  const hash = req.body.hash as string;
  const usecase = new retrieveUrlUsecase(urlRepository);
  if (!hash) {
    res.status(400).json({ error: "Missing hash parameter" });
    return;
  }
  try {
    const retrievedUrl = await usecase.perform(hash);
    console.log("Retrieved URL", retrievedUrl);
    res.json(retrievedUrl);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving URL", error.message);
      res.status(404).json({ error: "URL not found" });
    } else {
      console.error("Unexpected error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
