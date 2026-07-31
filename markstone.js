class MarkStone {
  /** @param {number} ticks */
  static calcTickDecay(ticks) {
    if (ticks <= 1) return 10000;
    return Math.pow(2, 12 / Math.log10(ticks));
  }

  static markStoneData = [
    {
      name: "杖印石",
      baseExp: 240,
      decayMult: 1,
    },
    {
      name: "貨印石",
      baseExp: 250,
      decayMult: 1.25,
    },
    {
      name: "杯印石",
      baseExp: 260,
      decayMult: 1.5,
    },
    {
      name: "剣印石",
      baseExp: 270,
      decayMult: 1.75,
    },
  ];

  /** @param {MarkStoneSaveData} stoneData */
  constructor(stoneData) {
    this.stones = [
      stoneData.club,
      stoneData.diamond,
      stoneData.heart,
      stoneData.spade,
    ];
    this.gainedSinceCrownReset = [
      stoneData.clubGainedSinceCrownReset,
      stoneData.diamondGainedSinceCrownReset,
      stoneData.heartGainedSinceCrownReset,
      stoneData.spadeGainedSinceCrownReset,
    ];
    this.ticksSinceRankReset = stoneData.ticksSinceRankReset;
    this.selectedType = stoneData.selectedType;
  }

  /** @returns {MarkStoneSaveData} */
  toSaveObject() {
    return {
      club: this.stones[0],
      clubGainedSinceCrownReset: this.gainedSinceCrownReset[0],
      diamond: this.stones[1],
      diamondGainedSinceCrownReset: this.gainedSinceCrownReset[1],
      heart: this.stones[2],
      heartGainedSinceCrownReset: this.gainedSinceCrownReset[2],
      spade: this.stones[3],
      spadeGainedSinceCrownReset: this.gainedSinceCrownReset[3],
      ticksSinceRankReset: this.ticksSinceRankReset,
      selectedType: this.selectedType,
    };
  }

  /** @param {number} type */
  calcRequirement(type) {
    const msData = MarkStone.markStoneData[type];
    let exponent = msData.baseExp + this.gainedSinceCrownReset[type];
    exponent += MarkStone.calcTickDecay(this.ticksSinceRankReset) * msData.decayMult;
    return new Decimal(10).pow(exponent);
  }

  /**
   * @param {Decimal} money
   * @param {number} [type]
   */
  canGetStone(money, type = this.selectedType) {
    return money.greaterThanOrEqualTo(this.calcRequirement(type));
  }

  /** @param {Decimal} money */
  tryGetStone(money) {
    if (this.canGetStone(money)) {
      this.stones[this.selectedType] += 1;
      this.gainedSinceCrownReset[this.selectedType] += 1;
      return true;
    }
    return false;
  }

  /** @param {number} type */
  selectType(type) {
    this.selectedType = type;
  }

  /** @param {Decimal} money */
  resetRank(money) {
    this.tryGetStone(money);
    this.ticksSinceRankReset = 0;
  }
  
  resetCrown() {
    this.gainedSinceCrownReset.fill(0, 0, 4);
  }

  update() {
    if (this.ticksSinceRankReset < 1_000_000) {
      this.ticksSinceRankReset++;
    }
  }
}
