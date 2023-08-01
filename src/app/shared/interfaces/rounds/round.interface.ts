import { Color } from '@interfaces/result.interface';

export interface Round {
  id: string;
  userId: string;
  closeTime: string;
  closed: boolean;
  winner: string;
  createdAt: string;
  updatedAt: string;

  color?: Color;
}
