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

    this.calibration = new MarkStone.Calibration(stoneData.calibration);
  }

  /** @returns {MarkStoneSaveData} */
  toSaveObject() {
    const calibration = this.calibration;
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
      calibration: this.calibration.toSaveObject(),
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
    this.calibration.updateCalibration(this.greatStones);
  }


  static Calibration = class Calibration {
    static enemyTypes = [
      { name: "矛盾1", resolveName: "矛盾の解決1", hp: 100 },
      { name: "矛盾2", resolveName: "矛盾の解決2", hp: 5000 },
      { name: "矛盾3", resolveName: "矛盾の解決3", hp: 20000 },
    ];

    static shopItems = [
      { name: "成果の現れ1", cost: 1, desc: "較正力1.2倍" },
      { name: "成果の現れ2", cost: 1, desc: "レベルを2に変更可能" },
      { name: "成果の現れ3", cost: 4, desc: "待機中も1/10の較正力を発揮" },
      { name: "成果の現れ4", cost: 16, desc: "発生器の効率2倍" },
      { name: "成果の現れ5", cost: 4, desc: "較正力1.5倍" },
      { name: "成果の現れ6", cost: 8, desc: "較正力2倍" },
      { name: "成果の現れ7", cost: 12, desc: "矛盾3を解放" },
    ];

    /** @param {MarkStoneSaveData["calibration"]} calData */
    constructor(calData) {
      this.active = calData.active;
      this.selectedEnemy = calData.selectedEnemy;
      this.enemyHp = calData.enemyHp;
      this.enemyLevel = calData.enemyLevel;
      this.cooldown = calData.cooldown;
      this.totalDamage = calData.totalDamage;
      this.achievements = calData.achievements;
      this.shopUpgrades = Array.from(calData.shopUpgrades);
      this.resolutions = Array.from(calData.resolutions);
    }

    /** @returns {MarkStoneSaveData["calibration"]} */
    toSaveObject() {
      return {
        active: this.active,
        selectedEnemy: this.selectedEnemy,
        enemyHp: this.enemyHp,
        enemyLevel: this.enemyLevel,
        cooldown: this.cooldown,
        totalDamage: this.totalDamage,
        achievements: this.achievements,
        shopUpgrades: this.shopUpgrades,
        resolutions: this.resolutions,
      };
    }

    getEnemyMaxHp() {
      return Calibration.enemyTypes[this.selectedEnemy].hp * Math.pow(5, this.enemyLevel - 1);
    }

    getRewardMult() {
      return Math.pow(2, this.enemyLevel - 1);
    }

    calcAttack() {
      let base = 1;
      let mult1 = 1 + 0.1 * this.resolutions[0];
      let mult2 = 1 + 0.1 * this.resolutions[1];
      let mult3 = 1 + 0.1 * this.resolutions[2];

      let shopMult = 1;
      if (this.shopUpgrades[0]) shopMult *= 1.2;
      if (this.shopUpgrades[4]) shopMult *= 1.5;
      if (this.shopUpgrades[5]) shopMult *= 2;

      return base * mult1 * mult2 * mult3 * shopMult;
    }

    /** @param {number} enemyId */
    isEnemyVisible(enemyId) {
      switch (enemyId) {
        case 2: return this.shopUpgrades[6];
        default: return true;
      }
    }

    isShopVisible() {
      if (this.achievements > 0) return true;
      if (this.shopUpgrades.some((item) => item)) return true;
      return false;
    }

    toggleCalibration() {
      this.active = !this.active;
      if (this.active) {
        this.enemyHp = this.getEnemyMaxHp();
        this.cooldown = 0; // bug?: 切替でクールダウンリセットできる(3か所)
      }
    }

    /** @param {number} enemyId */
    selectEnemy(enemyId) {
      if (this.selectedEnemy === enemyId) return;
      this.selectedEnemy = enemyId;
      this.enemyHp = this.getEnemyMaxHp();
      this.cooldown = 0;
    }

    /** @param {number} level */
    selectEnemyLevel(level) {
      if (!this.shopUpgrades[1]) return;
      if (level < 1 || level > 2) return;
      // bug?: 現在のレベルに切り替えられる

      this.enemyLevel = level;
      this.enemyHp = this.getEnemyMaxHp();
      this.cooldown = 0;
    }

    /** @param {number} upgradeId */
    buyShopUpgrade(upgradeId) {
      if (this.shopUpgrades[upgradeId]) return;
      if (this.achievements < Calibration.shopItems[upgradeId].cost) return;

      this.achievements -= Calibration.shopItems[upgradeId].cost;
      this.shopUpgrades[upgradeId] = true;
    }

    /** @param {number[]} greatStones */
    updateCalibration(greatStones) {
      if (!this.active) return;
      if (greatStones[0] <= 0) return;

      let attack = 0;
      if (this.cooldown > 0) {
        this.cooldown -= 1;
        if (!this.shopUpgrades[2]) return;
        attack = this.calcAttack() * 0.1;
      } else {
        attack = this.calcAttack();
      }

      this.enemyHp -= attack;
      if (this.enemyHp <= 0) {
        this.resolutions[this.selectedEnemy] += this.getRewardMult();
        // 合計ダメージはオーバーキルをカウントしない
        this.totalDamage += this.getEnemyMaxHp();

        if (this.totalDamage >= 1000000) {
          this.achievements += 1;
          this.totalDamage = 0;
          this.resolutions = new Array(3).fill(0);
          this.selectedEnemy = 0;
          this.enemyLevel = 1;
          this.enemyHp = this.getEnemyMaxHp();
          this.cooldown = 0;
          return;
        }

        this.enemyHp = this.getEnemyMaxHp();
        this.cooldown = 5;
      }
    }
  };
}

