export interface VideoGame {
  name?: string;
  type?: string;
  imgLink?: string;
  scenes?: any[] | undefined;
  levels?: Level[];
}

export interface Level {
  name: string;
  type: Difficulty;
  unlockPoints: number;
  unlocked: boolean;
  hardnessMultiplicator: number;
  backgroundPath?: string;
  musicPath?: string;
  ranges?: number[];
}

export enum Difficulty {
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard',
}
