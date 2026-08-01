class Accelerator {
  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.accelerators = playerData.accelerators.map(v => new Decimal(v));
    this.acceleratorsBought = playerData.acceleratorsBought.map(v => new Decimal(v));
    this.acceleratorsCost = playerData.acceleratorsCost.map(v => new Decimal(v));

    this.timeCrystal = Array.from(playerData.timecrystal);
    this.timeCrystalSum = this.timeCrystal.slice(0, 8).reduce((a, b) => a + b);
  }

  /** @param {Player} player */
  calcAcCost(player) {
    for (let i = 0; i < 8; i++) {
      let p = this.acceleratorsBought[i].add(1);
      p = p.mul(p.add(1)).div(2);
      p = p.mul(i === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(i - 1)));
      p = p.sub(player.eachPipedSmallTrophy[3] * 0.2 * (i + 1));
      this.acceleratorsCost[i] = p.pow_base(10);
    }
  }

  /**
   * @param {Player} player 
   * @param {Decimal} mu 
   */
  updateAccelerators(player, mu) {
    for (let i = 1; i < 8; i++) {
      let mult = new Decimal(1);
      if (i == 1 && player.challenge.activeBonuses.includes(10)) {
        mult = player.challenge.rankChallengeBonuses.includes(10) ? mult.add(this.acceleratorsBought[i].pow_base(2)) : mult.add(this.acceleratorsBought[i]);
      } else if (i != 1 && player.challenge.rankChallengeBonuses.includes(6)) {
        mult = player.challenge.rankChallengeBonuses.includes(10) ? mult.add(this.acceleratorsBought[i].pow_base(2)) : mult.add(this.acceleratorsBought[i]);
      }
      mult = mult.mul(new Decimal(1.5).pow(player.chip.setChip[i + 10]));
      mult = mult.mul(1 + player.eachPipedSmallTrophy[1] * 0.2);
      this.accelerators[i - 1] = this.accelerators[i - 1].add(this.accelerators[i].mul(mult).mul(mu));

    }
  }

  /**
   * @param {Player} player 
   * @param {number} index 
   */
  isOpened(player, index) {
    if (index == 0) return true;
    if (!player.levelResetTime.gt(0)) return false;
    if (index == 1) return true;
    if (index >= 2 && index <= 6) return player.levelShop.levelItems[3] >= index - 1;
    if (index == 7) return player.levelShop.levelItems[3] == 5 && player.campaign.accelLevel > 0;
    return false;
  }
  /**
   * @param {Player} player 
   * @param {number} index 
   */
  buyAccelerator(player, index) {
    if (player.challenge.isChallengeActive(5)) return;
    if (index >= 1 && player.levelResetTime.lessThanOrEqualTo(0)) return;

    if (player.money.greaterThanOrEqualTo(this.acceleratorsCost[index])) {
      player.money = player.money.sub(this.acceleratorsCost[index]);
      this.accelerators[index] = this.accelerators[index].add(1);
      this.acceleratorsBought[index] = this.acceleratorsBought[index].add(1);
      this.calcAcCost(player);
    }
  }

  gainTimeCrystal() {
    for (let i = 0; i < 8; i++) {
      let crystalNum = Math.floor(this.accelerators[i].log10()) - 10;
      if (crystalNum < 0) crystalNum = 0;
      if (crystalNum > 100) crystalNum = 100;
      this.timeCrystal[i] = Math.max(this.timeCrystal[i], crystalNum);
    }
    this.timeCrystalSum = this.timeCrystal.slice(0, 8).reduce((a, b) => a + b);
  }

  /**
   * @param {Challenge} challenge 
   * @param {number} chip10 
   */
  calcSpeed(challenge, chip10) {
    let amult = new Decimal(1);
    if (challenge.activeBonuses.includes(6)) {
      if (challenge.rankChallengeBonuses.includes(10)) {
        amult = amult.mul(this.acceleratorsBought[0].pow_base(2));
      } else {
        amult = amult.mul(this.acceleratorsBought[0].add(1));
      }
    }

    let acnum = this.accelerators[0].mul(new Decimal(1.5).pow(chip10));

    if (challenge.rankChallengeBonuses.includes(13)) {
      for (let i = 1; i < 8; i++) {
        acnum = acnum.mul(this.accelerators[i].add(1));
      }
    }

    return acnum.add(10).mul(amult).log10();
  }


  /** @param {Challenge} challenge */
  reset(challenge) {
    this.accelerators = new Array(8).fill(null).map(() => new Decimal(0));
    this.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0));
    this.acceleratorsCost = [
      new Decimal(10),
      new Decimal('1e10'),
      new Decimal('1e20'),
      new Decimal('1e40'),
      new Decimal('1e80'),
      new Decimal('1e160'),
      new Decimal('1e320'),
      new Decimal('1e640'),
    ];

    let bonus = 0;
    if (challenge.activeBonuses.includes(1)) bonus += 10;
    if (challenge.rankChallengeBonuses.includes(1)) bonus += 256;
    this.accelerators[0] = new Decimal(bonus);
  }

}