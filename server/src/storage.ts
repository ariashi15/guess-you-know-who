import { GameSession } from "./types";

const gameSessions = new Map<string, GameSession>();

export function getSession(gameCode: string): GameSession | undefined {
  return gameSessions.get(gameCode);
}

export function createSession(gameCode: string): GameSession {
  const session: GameSession = { createdAt: Date.now() };
  gameSessions.set(gameCode, session);
  return session;
}

export function updateSession(gameCode: string, session: GameSession): void {
  gameSessions.set(gameCode, session);
}

export function deleteSession(gameCode: string): void {
  gameSessions.delete(gameCode);
}

// Fisher-Yates shuffle
function shuffleArray(array: string[]): string[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

// generate a shuffled board of up to 24 cards
export function generateBoard(mutuals: string[]): string[] {
  const shuffled = shuffleArray(mutuals);
  return shuffled.slice(0, Math.min(24, shuffled.length));
}

// calculate mutuals if both players have uploaded
export function calculateMutuals(gameCode: string): void {
  const session = gameSessions.get(gameCode);

  if (!session) {
    return;
  }

  const data1 = session.player1Profiles;
  const data2 = session.player2Profiles;

  if (data1 && data2 && !session.mutuals) {
    const set1 = new Set(data1);
    const mutuals =  data2.filter((user: string) => set1.has(user));
    // store the mutuals
    session.mutuals = mutuals;
    console.log(`Calculated ${session.mutuals.length} mutuals for game ${gameCode}`);
  }
}

// clean up expired game sessions
export function initCleanup(): void {
  setInterval(() => {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    for (const [gameCode, session] of gameSessions.entries()) {
      if (now - session.createdAt > ONE_HOUR) {
        deleteSession(gameCode);
        console.log(`Cleaned up game session ${gameCode}`);
      }
    }
  }, 30 * 60 * 1000);
}
