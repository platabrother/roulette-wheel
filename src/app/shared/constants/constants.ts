import { Cell } from '@interfaces/cell.interface';
import { Color } from '@interfaces/result.interface';

export const ROULETTE_VEL: number = 2500;
export const BALL_VEL: number = 2000;
export const DIAMONDS_AND_DOTS = [1, 2, 3, 4, 5, 6, 7, 8];

const NUMBERS: number[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

// roulette implementation 360/37 = 9.7 and Math.floor(deg/9.7) = roulette[index]
export const CELLS: Cell[] = NUMBERS.map((value: number, index: number) => {
  const degrees: number = 9.7 * index;

  let background: string = index % 2 === 0 ? Color.B : Color.R;
  if (index === 0) background = Color.G;

  return { value, degrees, background } as Cell;
});
