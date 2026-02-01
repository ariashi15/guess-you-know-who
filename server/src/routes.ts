import express from "express";
import multer from "multer";
import { extractProfileLinks } from "./parser";
import { fetchProfilesFromUrls } from "./apify";
import { getSession, createSession, updateSession, calculateMutuals, generateBoard } from "./storage";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Health check
router.get("/", (req, res) => {
  res.send("Game server is running");
});

// Check if game exists
router.get("/game/:gameCode/exists", (req, res) => {
  const { gameCode } = req.params;
  const session = getSession(gameCode);
  return res.json({ exists: !!session });
});

// Create a new game session
router.post("/game/create", (req, res) => {
  const { gameCode } = req.body;
  
  if (!gameCode) {
    return res.status(400).json({ error: "Game code required" });
  }

  createSession(gameCode);
  console.log(`Created game session ${gameCode}`);
  
  return res.json({ gameCode, created: true });
});

// join a game session
router.post("/game/:gameCode/join", (req, res) => {
  const { gameCode } = req.params;
  const { playerId } = req.body;

  if (!playerId) {
    return res.status(400).json({ error: "Player ID required" });
  }

  const session = getSession(gameCode);

  if (!session) {
    return res.status(404).json({ error: "Game not found" });
  }

  // rejoin: return existing slot if this client already joined
  if (session.player1Id === playerId) {
    return res.status(200).json({ assignedPlayerId: "player1" });
  }

  if (session.player2Id === playerId) {
    return res.status(200).json({ assignedPlayerId: "player2" });
  }

  // check if game is full
  if (session.player1Id && session.player2Id) {
    return res.status(400).json({ error: "Game is full" });
  }

  let assignedPlayerId: "player1" | "player2";

  if (!session.player1Id) {
    session.player1Id = playerId;
    assignedPlayerId = "player1";
    console.log(`${playerId} joined game ${gameCode} as player1`);
  } else {
    session.player2Id = playerId;
    assignedPlayerId = "player2";
    console.log(`${playerId} joined game ${gameCode} as player2`);
  }

  updateSession(gameCode, session);

  return res.status(200).json({ assignedPlayerId });
});

// get game status
router.get("/game/:gameCode/status", (req, res) => {
    const { gameCode } = req.params;
    const session = getSession(gameCode);

    if (!session) {
        return res.status(404).json({ error: "Game not found" });
    }

    return res.json({
        player1Connected: !!session.player1Id,
        player2Connected: !!session.player2Id,
        player1Uploaded: !!session.player1Profiles,
        player2Uploaded: !!session.player2Profiles,
    });
});

// proxy Instagram images to bypass CORS
router.get("/proxy-image", async (req, res) => {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Image URL required" });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch image" });
        }

        const contentType = response.headers.get("content-type");
        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }
        res.setHeader("Cache-Control", "public, max-age=86400");
        
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ error: "Failed to proxy image" });
    }
});

// return stored board profiles
router.get("/game/:gameCode/board", (req, res) => {
    const { gameCode } = req.params;
    const session = getSession(gameCode);

    if (!session) {
        return res.status(404).json({ error: "Game not found" });
    }

    return res.json({
      board: session.board || [],
    })
});

// reshuffle the board on demand (for refresh button)
router.get("/game/:gameCode/refresh_board", async (req, res) => {
    const { gameCode } = req.params;
    const session = getSession(gameCode);

    if (!session) {
        return res.status(404).json({ error: "Game not found" });
    }

    if (!session.mutuals || session.mutuals.length === 0) {
        return res.status(400).json({ error: "No mutuals to generate board from" });
    }

    const boardUrls = generateBoard(session.mutuals);
    session.board = await fetchProfilesFromUrls(boardUrls);
    updateSession(gameCode, session);

    return res.json({
        board: session.board,
    })
})

// upload profile data
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { gameCode, playerId } = req.body;

  if (!gameCode || !playerId) {
    return res.status(400).json({ error: "Missing gameCode or playerId" });
  }

  let json: unknown;
  try {
    json = JSON.parse(req.file.buffer.toString());
  } catch {
    return res.status(400).json({ error: "Invalid JSON file" });
  }

  const profileLinks = extractProfileLinks(json);
  let session = getSession(gameCode);

  if (!session) {
    session = createSession(gameCode);
  }

  // store profiles by player ID
  if (playerId === "player1") {
    session.player1Profiles = profileLinks;
  } else if (playerId === "player2") {
    session.player2Profiles = profileLinks;
  }

  updateSession(gameCode, session);

  // calculate mutuals after storing profiles
  calculateMutuals(gameCode);

  // get updated session with mutuals
  const updatedSession = getSession(gameCode);

  // creates a board if mutuals exist and the board hasn't bee created yet
  if (updatedSession?.mutuals && (!updatedSession.board || updatedSession.board.length === 0)) {
    // gets the 24 board urls
    const boardUrls = generateBoard(updatedSession.mutuals);
    // fetches profile info from the urls
    updatedSession.board = await fetchProfilesFromUrls(boardUrls);
    // updates session w/ profile info
    updateSession(gameCode, updatedSession);
  }
});

export default router;
