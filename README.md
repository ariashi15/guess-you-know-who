# guess-you-know-who

A spin-off of the classic Guess Who, made personal with the people you know IRL.

## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Styled Components

### Backend
- Node.js
- Express.js
- TypeScript
- Multer

### Data Storage
- In-memory Map - Temporary game session storage (auto-cleanup after 1 hour)

## Architecture & Game Flow

### 1. Game Creation
**Frontend:**
- `Home.tsx` generates a unique, 6-character alphanumeric game code
- Creates game session via `POST /game/create`
- Navigates to `/waiting-room/:gameCode`

**Backend:**
- `storage.ts` maintains in-memory `Map<gameCode, GameSession>`
- Creates empty session with timestamp: `{ createdAt: Date.now() }`

---

### 2. Joining a Game
**Frontend:**
- Player enters code in `Home.tsx`
- Validates existence via `GET /game/:gameCode/exists`
- Navigates to `/waiting-room/:gameCode`
- `WaitingRoom.tsx` calls `POST /game/:gameCode/join` on mount

**Backend:**
- Assigns "player1" or "player2" based on availability
- Returns `Game is full` if 2 players already joined
- Updates session with player ids

---

### 3. File Upload & Processing
**Frontend:**
- Uploads JSON to `POST /upload`
- Sends `gameCode` and `playerId` with file

**Backend:**
- `multer` middleware handles multipart form data in-memory
- `parser.ts` extracts Instagram profile links using `flatMap`
- Stores profiles in session: `{ player1Profiles: [...], player2Profiles: [...] }`
- Calculate mutuals once both files are uploaded

---

### 4. Game Start Synchronization
**Frontend:**
- `useEffect` polls `GET /game/:gameCode/status` every 1 second
- Checks `isFull && mutualsCount > 0`
- Auto-navigates both players to `/play/:gameCode` when ready
- Cleanup function stops polling on unmount

**Backend:**
- Returns: `{ isFull, mutuals, mutualsCount }`