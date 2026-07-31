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
    this.greatStones = [
      stoneData.greatClub,
      stoneData.greatDiamond,
      stoneData.greatHeart,
      stoneData.greatSpade,
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
      greatClub: this.greatStones[0],
      greatDiamond: this.greatStones[1],
      greatHeart: this.greatStones[2],
      greatSpade: this.greatStones[3],
    };
  }

  // ========== 印石システム ==========

  /** @param {number} type */
  calcRequirement(type) {
    const msData = MarkStone.markStoneData[type];
    if (msData == undefined) return new Decimal(Infinity);

    let exponent = msData.baseExp + this.gainedSinceCrownReset[type];
    exponent += MarkStone.calcTickDecay(this.ticksSinceRankReset) * msData.decayMult;
    return new Decimal(10).pow(exponent);
  }

  /**
   * @param {Decimal} money
   * @param {number} [type]
   */
  canGetStone(money, type = this.selectedType) {
    if (this.stones[type] >= 100_000_000) return false;

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

  calcStoneEffect() {
    let total = new Decimal(1);
    for (let i = 0; i < 4; i++) {
      total = total.mul((this.stones[i] * 0.01) + 1);
    }
    return total.sub(1).mul(100);
  }

  /** @param {number} type */
  selectType(type) {
    this.selectedType = type;
  }

  // ========== 大印石システム ==========

  canResetStone() {
    return this.calcStoneEffect().gt(100);
  }

  resetStone() {
    if (!this.canResetStone()) return;
    if (!confirm("印石をリセットして大杖印石を1つ入手しますか？\n全ての印石の所持数と入手数が0に戻ります。")) {
      return;
    }

    this.stones.fill(0, 0, 4);
    this.gainedSinceCrownReset.fill(0, 0, 4);
    this.greatStones[0] += 1;
  }


  // ========== 更新処理 ==========

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
