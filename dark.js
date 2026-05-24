class Dark {
  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.darkMoney = new Decimal(playerData.darkmoney);
    this.darkLevel = new Decimal(playerData.darklevel);

    this.darkGenerators = playerData.darkgenerators.map(v => new Decimal(v));
    this.darkGeneratorsBought = playerData.darkgeneratorsBought.map(v => new Decimal(v));
    this.darkGeneratorsCost = playerData.darkgeneratorsCost.map(v => new Decimal(v));
  }

  /** @param {Player} player */
  calcDgCost(player) {
    for (let i = 0; i < 8; i++) {
      let p = 100 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1))
      let q = this.darkGeneratorsBought[i].mul(i + 1).mul(i + 1)
      q = q.add(p)
      q = q.sub(player.eachPipedSmallTrophy[8] * 0.02 * (i + 1) * (i + 1))
      this.darkGeneratorsCost[i] = new Decimal(10).pow(q)
    }
  }
  
  /**
   * @param {Player} player 
   * @param {Decimal} mu 
   */
  updateDarkGenerators(player, mu) {
    let darkmult = this.darkLevel.add(1)
    darkmult = Player.softCap(darkmult, new Decimal(1e3))
    if (player.light.lightMoney.greaterThanOrEqualTo(1)) {
      darkmult = darkmult.mul(player.light.lightMoney.log10() + 1)
    }
    let dgtocalc = Array.from(this.darkGenerators)
    for (let i = 0; i < 8; i++) {
      dgtocalc[i] = dgtocalc[i].mul(player.light.lightGenerators[i].add(1))
    }
    this.darkMoney = this.darkMoney.add(dgtocalc[0].mul(mu).mul(darkmult).mul(1 + player.chip.setChip[41] * 0.25).mul(1 + player.eachPipedSmallTrophy[5] * 0.2))
    for (let i = 1; i < 8; i++) {
      this.darkGenerators[i - 1] = this.darkGenerators[i - 1].add(dgtocalc[i].mul(mu).mul(darkmult).mul(1 + player.chip.setChip[41 + i] * 0.25).mul(1 + player.eachPipedSmallTrophy[5] * 0.2))
    }
  }
  
  /**
   * @param {Player} player 
   * @param {number} index 
   */
  buyDarkGenerator(player, index) {
    if (player.money.greaterThanOrEqualTo(this.darkGeneratorsCost[index])) {
      player.money = player.money.sub(this.darkGeneratorsCost[index])
      this.darkGenerators[index] = this.darkGenerators[index].add(1)
      this.darkGeneratorsBought[index] = this.darkGeneratorsBought[index].add(1)
      this.calcDgCost(player)
    }
  }

  /** @param {Player} player */
  resetDarklevel(player) {
    let dv = 18 - player.crown.add(2).log2()
    dv = Math.max(dv, 1)
    let gaindarklevel = new Decimal(this.darkMoney.log10()).div(dv).pow_base(2).round()
    if (confirm('裏昇段リセットして、裏段位' + gaindarklevel + 'を得ますか？')) {
      this.darkMoney = new Decimal(0)
      this.darkGenerators = new Array(8).fill(null).map(() => new Decimal(0))
      this.darkGeneratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
      this.darkGeneratorsCost = [
        new Decimal('1e100'),
        new Decimal('1e108'),
        new Decimal('1e127'),
        new Decimal('1e164'),
        new Decimal('1e225'),
        new Decimal('1e316'),
        new Decimal('1e443'),
        new Decimal('1e612')
      ]
      this.darkLevel = this.darkLevel.add(gaindarklevel)
    }
  }

}