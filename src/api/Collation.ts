import {
  ensure,
  StatusOfProposedSolutionType,
} from '../modules/numberleModule';

const toStatus =
  (answer: string) =>
  (
    proposedSolutionCharacter: string,
    proposedSolutionCharacterNo: number
  ): StatusOfProposedSolutionType => {
    const validityAndStatus: {
      validity: boolean;
      status: StatusOfProposedSolutionType;
    }[] = [
      {
        validity:
          proposedSolutionCharacter ===
          answer.charAt(proposedSolutionCharacterNo),
        status: 'correct',
      },
      {
        validity: answer.includes(proposedSolutionCharacter),
        status: 'differentLocation',
      },
      {
        validity: true,
        status: 'wrong',
      },
    ];
    return ensure(validityAndStatus.find(({ validity }) => validity)).status;
  };

export default class Collation {
  public statusOfProposedSolution(proposedSolution: string, answer: string) {
    if (proposedSolution.length !== answer.length)
      throw new Error('提示された文字列長と回答の文字列長が異なります。');

    return [...proposedSolution].map(toStatus(answer));
  }
}
