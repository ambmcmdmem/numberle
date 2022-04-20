import { maxNumberOfInput } from '../modules/numberleModule';

type ConsistingOf4<T> = [T, T, T, T];

export default class Numberle {
  private forCreatingHash: ConsistingOf4<number>;
  private answer: string;

  constructor(seed: number) {
    this.forCreatingHash = [31415926535, 8979323846, 2643383279, seed];

    this.answer = this.shuffle([...Array(10).keys()])
      .slice(0, maxNumberOfInput)
      .join('');
  }

  private setNextHash(): void {
    const t = this.forCreatingHash[0] ^ (this.forCreatingHash[0] << 11);
    this.forCreatingHash[0] = this.forCreatingHash[1];
    this.forCreatingHash[1] = this.forCreatingHash[2];
    this.forCreatingHash[2] = this.forCreatingHash[3];
    this.forCreatingHash[3] =
      this.forCreatingHash[3] ^
      (this.forCreatingHash[3] >>> 19) ^
      (t ^ (t >>> 8));
  }
  private nextHash(): number {
    this.setNextHash();
    return this.forCreatingHash.slice(-1)[0];
  }

  private shuffle<T>(target: T[]): T[] {
    [...Array(target.length).keys()]
      .filter((targetNo): boolean => targetNo !== 0)
      .reverse()
      .forEach((i): void => {
        const j = Math.floor(Math.abs(this.nextHash()) % (i + 1));
        [target[i], target[j]] = [target[j], target[i]];
      });
    return target;
  }

  public getAnswer(): string {
    if (this.answer.length !== maxNumberOfInput)
      throw new Error('回答の文字列長が指定されたものと一致しません。');
    return this.answer;
  }
}
