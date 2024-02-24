import { LOTTO_RULE, RANDOM_NUMBER_RULE, RESTART_KEY } from '../constants';

/**
 * 전달된 숫자가 정수인지 여부
 * @param {number} number
 */
export const isInteger = (number) => Number.isInteger(number);

export const isIntegers = (numbers) =>
  numbers.every((number) => Number.isInteger(number));

/**
 * 번호 배열의 갯수가 로또 번호들의 갯수과 같은지 여부
 * @param {number[]} numbers
 */
export const isValidLottoNumberCount = (numbers) => {
  const { length } = LOTTO_RULE;

  return numbers.length === length;
};

/**
 * 로또 번호들이 중복되지 않는 지 여부
 * @param {number[]} numbers
 */
export const isNotDuplicatedLottoNumber = (numbers) =>
  numbers.length === new Set(numbers).size;

/**
 * 로또 번호들이 유효한 범위안의 숫자인지 여부
 * @param {number} number
 */
export const isLottoNumberInRange = (number) => {
  const { start, end } = RANDOM_NUMBER_RULE.range;

  return start <= number && number <= end;
};

/**
 * 로또 번호 배열의 숫자들이 유효한 범위 안에 있는지 여부
 * @param {number[]} numbers
 * @returns
 */
export const isLottoNumbersInRange = (numbers) => {
  const { start, end } = RANDOM_NUMBER_RULE.range;
  return numbers.every((number) => start <= number && number <= end);
};

/**
 * 보너스 번호가 로또 번호들 다른 지 여부
 * @param {number[]} lottoNumbers
 * @param {number[]} bonusNumbers
 */
export const isNotInLottoNumber = (lottoNumbers, bonusNumber) =>
  !lottoNumbers.includes(bonusNumber);

/**
 * 구매금액이 로또 가격으로 나누어 떨어지는 지 여부
 *  @param {number} money
 */
export const isDivisibleByPrice = (money) => money % LOTTO_RULE.price === 0;

/**
 * 구매 금액으로 살 수 있는 로또 티켓 장수가 유효한 범위에 있는 지 여부
 *  @param {number} money
 */
export const isValidNumbersOfTickets = (money) => {
  const { price, numbersOfTickets } = LOTTO_RULE;
  const { min, max } = numbersOfTickets;
  const tickets = money / price;

  return tickets >= min && tickets <= max;
};

/**
 * 당첨번호에 대한 입력값이 숫자들로 이루어지며 숫자들이 쉼표로 구분되저 있는지 여부
 * @param {string} numberInput
 */
export const isValidWinningNumbersForm = (numbersInput) =>
  /^(\d+,)*\d+$/.test(numbersInput);

/**
 * 재시작 여부 입력으로 y 또는 n이 입력되었는지 여부
 * @param {string} restartInput
 */
export const isValidRestartInputForm = (restartInput) => {
  const { restart, end } = RESTART_KEY;
  const regex = new RegExp(`^[${restart}|${end}]$`);

  return regex.test(restartInput);
};
