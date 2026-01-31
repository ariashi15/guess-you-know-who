import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import multer from "multer";
import { extractProfileLinks } from "./parser.js";

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

// temporary storage for json files
const upload = multer({ storage: multer.memoryStorage() });

// frontend will send files to this endpoint
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
})