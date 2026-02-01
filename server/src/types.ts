export interface Profile {
  username: string;
  fullName: string;
  profilePicUrl: string;
}

export interface GameSession {
  player1Id?: string;
  player2Id?: string;
  player1Profiles?: string[];
  player2Profiles?: string[];
  mutuals?: string[];
  board?: Profile[];
  createdAt: number;
}
