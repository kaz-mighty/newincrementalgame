class GameGenerator {

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.generators = playerData.generators.map(v => new Decimal(v));
    this.generatorsBought = playerData.generatorsBought.map(v => new Decimal(v));
    this.generatorsCost = playerData.generatorsCost.map(v => new Decimal(v));
    this.generatorsMode = Array.from(playerData.generatorsMode);
    this.setModes = Array.from(playerData.setmodes);

    this.highestGenerator = 0;

  }

  findHighestGenerator() {
    this.highestGenerator = 0;
    for (let j = 0; j < 8; j++) {
      if (this.generators[j].greaterThan(0)) {
        this.highestGenerator = j;
      }
    }
  }

  /** @param {Player} player */
  calcGnCost(player) {
    for (let i = 0; i < 8; i++) {
      let p = i === 0 ?
        this.generatorsBought[0] :
        this.generatorsBought[i].add(i + 1).mul(i + 1);
      if (player.challenge.isChallengeActive(1) && this.generatorsBought[i].gt(0)) {
        p = p.mul(2);
      }
      p = p.sub(player.eachPipedSmallTrophy[0] * 0.2);

      this.generatorsCost[i] = new Decimal(10).pow(p);
    }
  }

  /**
   * @param {Player} player 
   * @param {Decimal} mu 
   */
  updateGenerators(player, mu) {
    for (let i = 0; i < 8; i++) {
      if (!player.challenge.activeBonuses.includes(13)) {
        let to = this.generatorsMode[i];
        let mult = mu.mul(player.calcIncrementMult(i, to));
        if (to === 0) {
          player.money = player.money.add(this.generators[i].mul(mult));
        } else {
          this.generators[to - 1] = this.generators[to - 1].add(this.generators[i].mul(mult));
        }
      } else {
        if (player.challenge.isChallengeActive(3)) {
          let mult = mu.mul(player.calcIncrementMult(i, 0));
          mult = mult.mul(i + 1);
          player.money = player.money.add(this.generators[i].mul(mult));
        } else {
          for (let to = 0; to <= i; to++) {
            let mult = mu.mul(player.calcIncrementMult(i, to));
            if (to === 0) {
              player.money = player.money.add(this.generators[i].mul(mult));
            } else {
              this.generators[to - 1] = this.generators[to - 1].add(this.generators[i].mul(mult));
            }
          }
        }
      }
    }
  }

  /**
   * @param {Player} player 
   * @param {number} index 
   */
  buyGenerator(player, index) {
    if (player.challenge.isChallengeActive(6)) {
      if (index == 3 || index == 7) {
        return;
      }
    }
    if (player.money.greaterThanOrEqualTo(this.generatorsCost[index])) {
      player.money = player.money.sub(this.generatorsCost[index]);
      this.generators[index] = this.generators[index].add(1);
      this.generatorsBought[index] = this.generatorsBought[index].add(1);
      this.calcGnCost(player);
    }
  }

  reset() {
    this.generators = new Array(8).fill(null).map(() => new Decimal(0));
    this.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0));
    this.generatorsCost = [
      new Decimal(1),
      new Decimal('1e4'),
      new Decimal('1e9'),
      new Decimal('1e16'),
      new Decimal('1e25'),
      new Decimal('1e36'),
      new Decimal('1e49'),
      new Decimal('1e64')
    ];
  }

  setModeType() {
    if (confirm('現在のモードを登録します。よろしいですか？')) {
      for (let i = 0; i < 8; i++) {
        this.setModes[i] = this.generatorsMode[i];
      }
    }
  }
  /** @param {Player} player  */
  changeModeType(player) {
    if (player.challenge.isChallengeActive(3)) return;
    for (let i = 0; i < 8; i++) {
      this.generatorsMode[i] = this.setModes[i];
    }
  }
  /**
   * @param {Player} player 
   * @param {number} index 
   */
  changeMode(player, index) {
    if (player.challenge.isChallengeActive(3)) return;
    this.generatorsMode[index] += 1;
    if (this.generatorsMode[index] > index) {
      this.generatorsMode[index] = 0;
    }
  }

}