export const maxNumberOfTries = 5;
export const maxNumberOfInput = 5;
export type StatusOfProposedSolutionType =
  | 'correct'
  | 'differentLocation'
  | 'wrong';
export const apiCheckDigit = (seed: number): number => seed * 1234509876;
export const ensure = <T>(argument: T | undefined | null): T => {
  if (argument === undefined || argument === null)
    throw new Error('ensureの引数がnullもしくはundefinedになっています。');

  return argument;
};
