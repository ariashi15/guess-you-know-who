import { Server, Socket } from 'socket.io';

export function setupSockets(io: Server) {
    // this runs every time a player connects
    io.on("connection", (socket: Socket) => {
        // listen for the room id that the player wants to join
        socket.on("join-room", (roomId: string) => {
            socket.join(roomId);
        });
    });
}