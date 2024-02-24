import { WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #profitRate;

  constructor(matchingResults, paymentAmount) {
    this.#calculateRanks(matchingResults);
    this.#calculateProfitRate(paymentAmount);
  }

  get statisticsResult() {
    return this.#ranks.reduce(
      (acc, rank) => {
        acc[rank] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
  }

  get totalPrizes() {
    return this.#ranks.reduce(
      (totalPrizes, rank) => totalPrizes + WINNING_RULE.get(rank).money,
      0,
    );
  }

  get profitRate() {
    return this.#profitRate;
  }

  #calculateRanks(results) {
    results.forEach((result) => this.#checkTicket(result));
  }

  #checkTicket(result) {
    WINNING_RULE.forEach((value, key) => {
      const { matchedCount, isBonus } = value;

      const checkBonusMatch = matchedCount === 5;
      const isMatchingCount = matchedCount === result.matchedCount;
      const isMatchingOnlyCount = !checkBonusMatch && isMatchingCount;
      const isMatchingBonusAndCount =
        checkBonusMatch && isBonus === result.isBonus;

      if (!isMatchingCount) return;
      if (isMatchingOnlyCount || isMatchingBonusAndCount) {
        this.#ranks.push(key);
      }
    });
  }

  #calculateProfitRate(paymentAmount) {
    this.#profitRate = Number(
      ((this.totalPrizes / paymentAmount) * 100).toFixed(1),
    );
  }
}

export default Statistics;
