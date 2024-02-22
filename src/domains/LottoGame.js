import LottoMachine from './LottoMachine';
import Statistics from './Statistics';
import WinningLotto from './WinningLotto';

class LottoGame {
  #lottoData = {
    lottoMachine: undefined,
    winningLotto: new WinningLotto(),
  };

  #lottoAnalytics = {
    matchingResults: undefined,
    statistics: undefined,
  };

  set winningLottoNumbers(lottoNumbersInput) {
    this.#lottoData.winningLotto.lottoNumbers = lottoNumbersInput;
  }

  set bonusNumber(bonusNumberInput) {
    this.#lottoData.winningLotto.bonusNumber = bonusNumberInput;
  }

  insertMoney(paymentAmountInput) {
    this.#lottoData.lottoMachine = new LottoMachine(paymentAmountInput);
  }

  calculateMatchingResult() {
    this.#lottoAnalytics.matchingResults =
      this.#lottoData.lottoMachine.lottoTickets.map((lottoTicket) =>
        this.#lottoData.winningLotto.compareLotto(lottoTicket),
      );
  }

  calculateStatistics() {
    this.#lottoAnalytics.statistics = new Statistics();
    this.#lottoAnalytics.statistics.checkTickets(
      this.#lottoAnalytics.matchingResults,
    );
    this.#lottoAnalytics.statistics.calculateProfitRate(
      this.#lottoData.lottoMachine.paymentAmount,
    );
  }
}

export default LottoGame;
