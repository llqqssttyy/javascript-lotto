import { Validator } from '../src/domains';

describe('checkWinningLottoNumbers 기능 테스트', () => {
  test('당첨 로또 번호는 쉼표(,)로 구분되어 입력되어야 한다.', () => {
    const LOTTO_INPUTS = ['1/2/3/4/5/6', '1 2 3 4 5 6'];

    LOTTO_INPUTS.forEach((lottoInput) => {
      expect(() => Validator.checkWinningLottoNumbers(lottoInput)).toThrow();
    });
  });

  test('당첨 로또 번호는 정수로 이루어져야 한다.', () => {
    const LOTTO_INPUTS = ['1,2,3,4,5,4.5', '1,2,3,4,5,s'];

    LOTTO_INPUTS.forEach((lottoInput) => {
      expect(() => Validator.checkWinningLottoNumbers(lottoInput)).toThrow();
    });
  });

  test('당첨 로또 번호의 범위는 1~45까지다.', () => {
    const LOTTO_INPUTS = ['1,2,3,4,5,46', '1,2,3,4,5,0'];

    LOTTO_INPUTS.forEach((lottoInput) => {
      expect(() => Validator.checkWinningLottoNumbers(lottoInput)).toThrow();
    });
  });

  test('당첨 로또 번호는 총 6개이어야 한다.', () => {
    const LOTTO_INPUTS = ['1,2,3,4,5', '1,2,3,4,5,6,7'];

    LOTTO_INPUTS.forEach((lottoInput) => {
      expect(() => Validator.checkWinningLottoNumbers(lottoInput)).toThrow();
    });
  });

  test('당첨 로또 번호는 중복되지 않아야 한다.', () => {
    const LOTTO_INPUT = '1,2,3,4,5,5';

    expect(() => Validator.checkWinningLottoNumbers(LOTTO_INPUT)).toThrow();
  });
});

describe('checkBonusNumber 기능 테스트', () => {
  test('보너스 번호는 정수로 이루어져야 한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBERS = ['4.5', 's', ''];

    BONUS_NUMBERS.forEach((bonusNumber) => {
      expect(() =>
        Validator.checkBonusNumber(LOTTO_NUMBERS, bonusNumber),
      ).toThrow();
    });
  });

  test('보너스 번호의 범위는 1~45까지다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBERS = ['46', '0'];

    BONUS_NUMBERS.forEach((bonusNumber) => {
      expect(() =>
        Validator.checkBonusNumber(LOTTO_NUMBERS, bonusNumber),
      ).toThrow();
    });
  });

  test('보너스 번호는 로또 번호와 중복되지 않아야 한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = '1';

    expect(() =>
      Validator.checkBonusNumber(LOTTO_NUMBERS, BONUS_NUMBER),
    ).toThrow();
  });
});

describe('checkPaymentAmount 기능 테스트', () => {
  test('구입 금액은 정수이어야 한다.', () => {
    const INPUTS = ['1.1', 's', ''];

    INPUTS.forEach((input) => {
      expect(() => Validator.checkPaymentAmount(input)).toThrow();
    });
  });

  test('구입 가능한 로또는 최소 1장, 최대 20장이다.', () => {
    const INPUTS = ['999', '20001'];

    INPUTS.forEach((input) => {
      expect(() => Validator.checkPaymentAmount(input)).toThrow();
    });
  });

  test('구입 금액은 1000원 단위로 나누어 떨어져야 한다.', () => {
    const INPUTS = ['1500', '1001'];

    INPUTS.forEach((input) => {
      expect(() => Validator.checkPaymentAmount(input)).toThrow();
    });
  });
});

describe('checkRestartForm 기능 테스트', () => {
  test.each(['yes y', 'never'])(
    '재시작 여부는 y 또는 n으로 입력되어야 한다.: %s',
    (input) => {
      expect(() => Validator.checkRestartForm(input)).toThrow();
    },
  );

  test.each(['Y', 'N'])('대문자 입력은 유효하다.: %s', (input) => {
    expect(() => Validator.checkRestartForm(input)).not.toThrow();
  });
});
