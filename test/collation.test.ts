import Collation from '../src/api/Collation';
import Numberle from '../src/api/Numberle';
import { StatusOfProposedSolutionType } from '../src/modules/numberleModule';

const toBeTested = new Numberle(1);
const cloneToBeTested = new Numberle(1);
const seedsToCheckForBias = [1, 5, 10, 55, 100, 1111, 50000];

test('Collation Tests.', () => {
  seedsToCheckForBias.forEach((seedToCheckForBias): void => {
    console.log(
      `Answer seed:${seedToCheckForBias} ${new Numberle(
        seedToCheckForBias
      ).getAnswer()}`
    );
  });

  expect(toBeTested.getAnswer()).toStrictEqual('80914');
  expect(cloneToBeTested.getAnswer()).toStrictEqual('80914');
  expect(cloneToBeTested.getAnswer()).not.toStrictEqual(80914);
  expect(toBeTested.getAnswer()).toStrictEqual(cloneToBeTested.getAnswer());
  expect(toBeTested.getAnswer()).toStrictEqual('80914');

  expect(
    new Collation().statusOfProposedSolution('01234', toBeTested.getAnswer())
  ).toStrictEqual<StatusOfProposedSolutionType[]>([
    'differentLocation',
    'differentLocation',
    'wrong',
    'wrong',
    'correct',
  ]);
  expect(
    new Collation().statusOfProposedSolution('56789', toBeTested.getAnswer())
  ).toStrictEqual<StatusOfProposedSolutionType[]>([
    'wrong',
    'wrong',
    'wrong',
    'differentLocation',
    'differentLocation',
  ]);
  expect(() => {
    new Collation().statusOfProposedSolution('0', toBeTested.getAnswer());
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
  expect(() => {
    new Collation().statusOfProposedSolution(
      '0123456789',
      toBeTested.getAnswer()
    );
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
});
