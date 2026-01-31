import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import multer from "multer";
import { extractProfileLinks } from "./parser";

// SERVER SETUP

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

server.listen(3001, () => {
  console.log("Backend running on port 3001");
});

// STORAGE

// file storage for json
const upload = multer({ storage: multer.memoryStorage() });

interface GameSession {
  player1Profiles?: string[];
  player2Profiles?: string[];
  createdAt: number;
}

// game sessions mapped from game code to session
const gameSessions = new Map<string, GameSession>();

// clean up expired game sessions
setInterval(() => {
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();

  for (const [gameCode, session] of gameSessions.entries()) {
    if (now - session.createdAt > ONE_HOUR) {
      gameSessions.delete(gameCode);
      console.log(`Cleaned up game session ${gameCode}`)
    }
  }
}, 30 * 60 * 1000) // run cleanup every 30 minutes

// ENDPOINTS

app.get("/", (req, res) => {
  res.send("Game server is running");
});

app.get("/game/:gameCode/exists", (req, res) => {
  const { gameCode } = req.params;
  const session = gameSessions.get(gameCode);

  return res.json({ exists: !!session })
})

app.post("/game/create", (req, res) => {
  const { gameCode } = req.body;

  gameSessions.set(gameCode, { createdAt: Date.now() });
  console.log(`Created game session ${gameCode}`);

  return res.json({ gameCode, created: true})
})

// frontend uploads following json files
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    // convert file contents to object
    let json: unknown;
    try {
        json = JSON.parse(req.file.buffer.toString());
    } catch {
        return res.status(400).send('Invalid JSON file');
    }
    
    const profile_links = extractProfileLinks(json);

    return res.status(200).json({
      message: "File uploaded successfully",
      profileCount: profile_links.length
    })
})