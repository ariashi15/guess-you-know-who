export type GameRoom = {
    id: string;
    players: string[];
    mutuals: string[]
    turn: number;
}

const rooms = new Map<string, GameRoom>();

export function createRoom(id: string) {
    rooms.set(id, {id, players: [], mutuals: [], turn: 1});
}

export function getRoom(id: string) {
    return rooms.get(id);
}