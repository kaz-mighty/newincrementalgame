class Light {
  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.lightMoney = new Decimal(playerData.lightmoney);

    this.lightGenerators = playerData.lightgenerators.map(v => new Decimal(v));
    this.lightGeneratorsBought = playerData.lightgeneratorsBought.map(v => new Decimal(v));
    this.lightGeneratorsCost = playerData.lightgeneratorsCost.map(v => new Decimal(v));
  }

  calcLgCost() {
    for (let i = 0; i < 8; i++) {
      let p = 200 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1) * (i + 1));
      let q = this.lightGeneratorsBought[i].mul(i + 1).mul(i + 1).mul(i + 1);
      q = q.add(p);
      this.lightGeneratorsCost[i] = new Decimal(10).pow(q);
    }
  }

  /**
   * @param {Player} player 
   * @param {Decimal} mu 
   */
  updateLightGenerators(player, mu) {
    let pipemult = 1 + player.eachPipedSmallTrophy[10] * 0.1;

    this.lightMoney = this.lightMoney.add(this.lightGenerators[0].mul(mu).mul(pipemult));
    for (let i = 1; i < 8; i++) {
      this.lightGenerators[i - 1] = this.lightGenerators[i - 1].add(this.lightGenerators[i].mul(pipemult));
    }
  }


  /**
   * @param {Player} player 
   * @param {number} index 
   */
  canBuyLightGenerator(player, index) {
    return player.money.greaterThanOrEqualTo(this.lightGeneratorsCost[index]);
  }
  /**
   * @param {Player} player 
   * @param {number} index 
   */
  buyLightGenerator(player, index) {
    if (!this.canBuyLightGenerator(player, index)) return;

    player.money = player.money.sub(this.lightGeneratorsCost[index]);
    this.lightGenerators[index] = this.lightGenerators[index].add(1);
    this.lightGeneratorsBought[index] = this.lightGeneratorsBought[index].add(1);
    this.calcLgCost();
  }

}