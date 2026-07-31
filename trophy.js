class Trophy {
  static contents = [
    "有段者",
    "有階者",
    "輝く者",
    "世界移動者",
    "裏の者",
    "煌く者",
    "想い出す者",
    "有冠者",
    "天上の者",
    "瞬く者",
  ]

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.trophies = Array.from(playerData.trophies);
    this.smallTrophies1st = Array.from(playerData.smalltrophies);
    this.smallTrophies2nd = Array.from(playerData.smalltrophies2nd);
    this.remember = playerData.remember;

    // 以下セーブされない状態
    this.memory = 0;
    this.smallTrophy = 0;

    this.countMemory();
    this.countSmallTrophies();
  }

  /** @param {number} i */
  unlockTrophy(i) {
    this.trophies[i] = true;
  }

  /** @param {Player} player */
  checkTrophies(player) {
    if (player.levelResetTime.greaterThan(0)) this.trophies[0] = true;
    if (player.rankResetTime.greaterThan(0)) this.trophies[1] = true;
    if (player.shine.shine > 0) this.trophies[2] = true;
    if (player.challenge.challengeCleared.includes(238) || player.challenge.challengeCleared.length >= 100) this.trophies[3] = true;
    if (player.dark.darkGenerators[0].greaterThan(0)) this.trophies[4] = true;
    if (player.shine.brightness > 0) this.trophies[5] = true;
    if (this.remember > 0) this.trophies[6] = true;
    if (player.world == 0) {
      if (player.rememberSum > 0) this.trophies[6] = true;
    }
    if (player.crownResetTime.greaterThan(0)) this.trophies[7] = true;
    if (player.light.lightGenerators[0].greaterThan(0)) this.trophies[8] = true;
    if (player.shine.flicker > 0) this.trophies[9] = true;

    this.countMemory();
    if (player.world === 0 && this.memory >= 6) {
      this.remember = Math.max(this.remember, this.memory);
    }

    if (player.money.greaterThan(0)) this.smallTrophies1st[0] = true
    if (player.money.greaterThan(777)) this.smallTrophies1st[1] = true
    if (player.money.greaterThan(7777777)) this.smallTrophies1st[2] = true
    if (player.money.greaterThan("1e19")) this.smallTrophies1st[3] = true
    if (player.money.greaterThan("1e36")) this.smallTrophies1st[4] = true
    if (player.money.greaterThan("1e77")) this.smallTrophies1st[5] = true
    if (player.money.greaterThan("1e81")) this.smallTrophies1st[6] = true
    if (player.money.greaterThan("1e303")) this.smallTrophies1st[7] = true
    if (player.generator.generatorsBought[0].greaterThan(0)) this.smallTrophies1st[8] = true
    if (player.generator.generatorsBought[1].greaterThan(0)) this.smallTrophies1st[9] = true
    if (player.generator.generatorsBought[2].greaterThan(0)) this.smallTrophies1st[10] = true
    if (player.generator.generatorsBought[3].greaterThan(0)) this.smallTrophies1st[11] = true
    if (player.generator.generatorsBought[4].greaterThan(0)) this.smallTrophies1st[12] = true
    if (player.generator.generatorsBought[5].greaterThan(0)) this.smallTrophies1st[13] = true
    if (player.generator.generatorsBought[6].greaterThan(0)) this.smallTrophies1st[14] = true
    if (player.generator.generatorsBought[7].greaterThan(0)) this.smallTrophies1st[15] = true
    if (player.accelerator.acceleratorsBought[0].greaterThan(0)) this.smallTrophies1st[16] = true
    if (player.accelerator.acceleratorsBought[1].greaterThan(0)) this.smallTrophies1st[17] = true
    if (player.accelerator.acceleratorsBought[2].greaterThan(0)) this.smallTrophies1st[18] = true
    if (player.accelerator.acceleratorsBought[3].greaterThan(0)) this.smallTrophies1st[19] = true
    if (player.accelerator.acceleratorsBought[4].greaterThan(0)) this.smallTrophies1st[20] = true
    if (player.accelerator.acceleratorsBought[5].greaterThan(0)) this.smallTrophies1st[21] = true
    if (player.accelerator.acceleratorsBought[6].greaterThan(0)) this.smallTrophies1st[22] = true
    if (player.accelerator.acceleratorsBought[7].greaterThan(0)) this.smallTrophies1st[23] = true
    if (player.levelResetTime.greaterThan(200)) this.smallTrophies1st[24] = true
    if (player.levelResetTime.greaterThan(999)) this.smallTrophies1st[25] = true
    if (player.challenge.challengeCleared.includes(128)) this.smallTrophies1st[26] = true
    if (player.challenge.challengeCleared.includes(64)) this.smallTrophies1st[27] = true
    if (player.challenge.challengeCleared.includes(32)) this.smallTrophies1st[28] = true
    if (player.challenge.challengeCleared.includes(16)) this.smallTrophies1st[29] = true
    if (player.challenge.challengeCleared.includes(8)) this.smallTrophies1st[30] = true
    if (player.challenge.challengeCleared.includes(4)) this.smallTrophies1st[31] = true
    if (player.challenge.challengeCleared.includes(2)) this.smallTrophies1st[32] = true
    if (player.challenge.challengeCleared.includes(1)) this.smallTrophies1st[33] = true
    if (player.challenge.challengeCleared.length >= 32) this.smallTrophies1st[34] = true
    if (player.challenge.challengeCleared.length >= 64) this.smallTrophies1st[35] = true
    if (player.challenge.challengeCleared.length >= 96) this.smallTrophies1st[36] = true
    if (player.challenge.challengeCleared.length >= 128) this.smallTrophies1st[37] = true
    if (player.challenge.challengeCleared.length >= 160) this.smallTrophies1st[38] = true
    if (player.challenge.challengeCleared.length >= 192) this.smallTrophies1st[39] = true
    if (player.challenge.challengeCleared.length >= 224) this.smallTrophies1st[40] = true
    if (player.challenge.challengeCleared.length >= 255) this.smallTrophies1st[41] = true
    if (player.rankResetTime.greaterThan(1)) this.smallTrophies1st[42] = true
    if (player.rankResetTime.greaterThan(4)) this.smallTrophies1st[43] = true
    if (player.rankResetTime.greaterThan(9)) this.smallTrophies1st[44] = true
    if (player.rankResetTime.greaterThan(99)) this.smallTrophies1st[45] = true
    if (player.rankResetTime.greaterThan(999)) this.smallTrophies1st[46] = true
    if (player.levelShop.levelItemBought >= 4) this.smallTrophies1st[47] = true
    if (player.levelShop.levelItemBought >= 108) this.smallTrophies1st[48] = true
    if (player.levelShop.levelItemBought >= 256) this.smallTrophies1st[49] = true
    if (player.levelShop.levelItemBought >= 1728) this.smallTrophies1st[50] = true
    if (player.levelShop.levelItemBought >= 12500) this.smallTrophies1st[51] = true
    if (player.shine.shine >= 100) this.smallTrophies1st[52] = true
    if (player.shine.shine >= 1000) this.smallTrophies1st[53] = true
    if (player.shine.shine >= 10000) this.smallTrophies1st[54] = true
    if (player.shine.shine >= 100000) this.smallTrophies1st[55] = true
    if (player.shine.shine >= 1000000) this.smallTrophies1st[56] = true
    if (player.shine.shine >= 10000000) this.smallTrophies1st[57] = true
    if (player.common.exported.length >= 2) this.smallTrophies1st[58] = true
    if (player.tweeting.length >= 2) this.smallTrophies1st[59] = true
    if (player.dark.darkGenerators[0].greaterThanOrEqualTo(1)) this.smallTrophies1st[60] = true
    if (player.dark.darkGenerators[1].greaterThanOrEqualTo(1)) this.smallTrophies1st[61] = true
    if (player.dark.darkGenerators[2].greaterThanOrEqualTo(1)) this.smallTrophies1st[62] = true
    if (player.dark.darkGenerators[3].greaterThanOrEqualTo(1)) this.smallTrophies1st[63] = true
    if (player.dark.darkGenerators[4].greaterThanOrEqualTo(1)) this.smallTrophies1st[64] = true
    if (player.dark.darkGenerators[5].greaterThanOrEqualTo(1)) this.smallTrophies1st[65] = true
    if (player.dark.darkGenerators[6].greaterThanOrEqualTo(1)) this.smallTrophies1st[66] = true
    if (player.dark.darkGenerators[7].greaterThanOrEqualTo(1)) this.smallTrophies1st[67] = true
    if (player.challenge.rankChallengeCleared.length >= 32) this.smallTrophies1st[68] = true
    if (player.challenge.rankChallengeCleared.length >= 64) this.smallTrophies1st[69] = true
    if (player.challenge.rankChallengeCleared.length >= 96) this.smallTrophies1st[70] = true
    if (player.challenge.rankChallengeCleared.length >= 128) this.smallTrophies1st[71] = true
    if (player.challenge.rankChallengeCleared.length >= 160) this.smallTrophies1st[72] = true
    if (player.challenge.rankChallengeCleared.length >= 192) this.smallTrophies1st[73] = true
    if (player.challenge.rankChallengeCleared.length >= 224) this.smallTrophies1st[74] = true
    if (player.challenge.rankChallengeCleared.length >= 255) this.smallTrophies1st[75] = true
    if (player.shine.brightness >= 10) this.smallTrophies1st[76] = true
    if (player.shine.brightness >= 100) this.smallTrophies1st[77] = true
    if (player.shine.brightness >= 1000) this.smallTrophies1st[78] = true
    if (player.shine.brightness >= 10000) this.smallTrophies1st[79] = true
    if (player.dark.darkMoney.greaterThanOrEqualTo(1)) this.smallTrophies1st[80] = true
    if (player.dark.darkMoney.greaterThanOrEqualTo(777)) this.smallTrophies1st[81] = true
    if (player.dark.darkMoney.greaterThanOrEqualTo(7777777)) this.smallTrophies1st[82] = true
    if (player.dark.darkMoney.greaterThanOrEqualTo("1e18")) this.smallTrophies1st[83] = true
    if (player.dark.darkMoney.greaterThanOrEqualTo("1e72")) this.smallTrophies1st[84] = true
    if (player.chip.chip[0] > 0) this.smallTrophies1st[85] = true
    if (player.chip.chip[0] >= 210) this.smallTrophies1st[86] = true
    if (player.chip.chip[0] >= 1275) this.smallTrophies1st[87] = true
    if (player.chip.chip[1] > 0) this.smallTrophies1st[88] = true
    if (player.chip.chip[1] >= 210) this.smallTrophies1st[89] = true
    if (player.chip.chip[1] >= 1275) this.smallTrophies1st[90] = true
    if (player.chip.chip[2] > 0) this.smallTrophies1st[91] = true
    if (player.chip.chip[2] >= 210) this.smallTrophies1st[92] = true
    if (player.chip.chip[2] >= 1275) this.smallTrophies1st[93] = true
    if (player.chip.chip[3] > 0) this.smallTrophies1st[94] = true
    if (player.chip.chip[3] >= 210) this.smallTrophies1st[95] = true
    if (player.chip.chip[3] >= 1275) this.smallTrophies1st[96] = true
    if (player.dark.darkLevel.greaterThan(0)) this.smallTrophies1st[97] = true
    if (player.dark.darkLevel.greaterThan('1e3')) this.smallTrophies1st[98] = true
    if (player.dark.darkLevel.greaterThan('1e10')) this.smallTrophies1st[99] = true

    if (player.crownResetTime.gt(0)) {

      if (player.crownResetTime.gt(0)) this.smallTrophies2nd[0] = true
      if (player.crownResetTime.greaterThanOrEqualTo(5)) this.smallTrophies2nd[1] = true
      if (player.crownResetTime.greaterThanOrEqualTo(20)) this.smallTrophies2nd[2] = true
      if (player.crownResetTime.greaterThanOrEqualTo(100)) this.smallTrophies2nd[3] = true
      if (player.campaign.accelLevel >= 1) this.smallTrophies2nd[4] = true
      if (player.campaign.accelLevel >= 3) this.smallTrophies2nd[5] = true
      if (player.campaign.accelLevel >= 6) this.smallTrophies2nd[6] = true
      if (player.campaign.accelLevel >= 10) this.smallTrophies2nd[7] = true
      if (player.rank.gt('1e8')) this.smallTrophies2nd[8] = true
      if (player.rank.gt('1e10')) this.smallTrophies2nd[9] = true
      if (player.rank.gt('1e12')) this.smallTrophies2nd[10] = true
      if (player.light.lightGenerators[0].greaterThanOrEqualTo(1)) this.smallTrophies2nd[11] = true
      if (player.light.lightGenerators[1].greaterThanOrEqualTo(1)) this.smallTrophies2nd[12] = true
      if (player.light.lightGenerators[2].greaterThanOrEqualTo(1)) this.smallTrophies2nd[13] = true
      if (player.light.lightGenerators[3].greaterThanOrEqualTo(1)) this.smallTrophies2nd[14] = true
      if (player.light.lightGenerators[4].greaterThanOrEqualTo(1)) this.smallTrophies2nd[15] = true
      if (player.light.lightGenerators[5].greaterThanOrEqualTo(1)) this.smallTrophies2nd[16] = true
      if (player.light.lightGenerators[6].greaterThanOrEqualTo(1)) this.smallTrophies2nd[17] = true
      if (player.light.lightGenerators[7].greaterThanOrEqualTo(1)) this.smallTrophies2nd[18] = true
      if (player.chip.chip[4] > 0) this.smallTrophies2nd[19] = true
      if (player.chip.chip[4] >= 210) this.smallTrophies2nd[20] = true
      if (player.chip.chip[4] >= 1275) this.smallTrophies2nd[21] = true
      if (player.statue.statue[0] >= 10) this.smallTrophies2nd[22] = true
      if (player.statue.statue[1] >= 10) this.smallTrophies2nd[23] = true
      if (player.statue.statue[2] >= 10) this.smallTrophies2nd[24] = true
      if (player.statue.statue[3] >= 10) this.smallTrophies2nd[25] = true
      if (player.crown.greaterThanOrEqualTo(100)) this.smallTrophies2nd[26] = true
      if (player.crown.greaterThanOrEqualTo(10000)) this.smallTrophies2nd[27] = true
      if (player.crown.greaterThanOrEqualTo("1e8")) this.smallTrophies2nd[28] = true
      if (player.light.lightMoney.greaterThanOrEqualTo(1)) this.smallTrophies2nd[29] = true
      if (player.light.lightMoney.greaterThanOrEqualTo("1e9")) this.smallTrophies2nd[30] = true
      if (player.light.lightMoney.greaterThanOrEqualTo("1e18")) this.smallTrophies2nd[31] = true
      if (player.light.lightMoney.greaterThanOrEqualTo("1e36")) this.smallTrophies2nd[32] = true
      if (player.shine.flicker >= 10) this.smallTrophies2nd[33] = true
      if (player.shine.flicker >= 100) this.smallTrophies2nd[34] = true
      if (player.shine.flicker >= 1000) this.smallTrophies2nd[35] = true
      if (player.shine.flicker >= 10000) this.smallTrophies2nd[36] = true
      if (player.shine.flicker >= 100000) this.smallTrophies2nd[37] = true
      if (player.shine.flicker >= 1000000) this.smallTrophies2nd[38] = true
      if (player.chip.chip[5] > 0) this.smallTrophies2nd[39] = true
      if (player.chip.chip[5] >= 210) this.smallTrophies2nd[40] = true
      if (player.chip.chip[5] >= 1275) this.smallTrophies2nd[41] = true
      if (player.chip.chip[6] > 0) this.smallTrophies2nd[42] = true
      if (player.chip.chip[6] >= 210) this.smallTrophies2nd[43] = true
      if (player.chip.chip[6] >= 1275) this.smallTrophies2nd[44] = true
      if (player.statue.statue[4] >= 10) this.smallTrophies2nd[45] = true
      if (player.statue.statue[5] >= 10) this.smallTrophies2nd[46] = true
      if (player.statue.statue[6] >= 10) this.smallTrophies2nd[47] = true
      if (player.statue.statue[0] >= 64) this.smallTrophies2nd[48] = true
      if (player.statue.statue[1] >= 64) this.smallTrophies2nd[49] = true
      if (player.statue.statue[2] >= 64) this.smallTrophies2nd[50] = true
      if (player.statue.statue[3] >= 64) this.smallTrophies2nd[51] = true
      if (player.statue.statue[4] >= 64) this.smallTrophies2nd[52] = true
      if (player.statue.statue[5] >= 64) this.smallTrophies2nd[53] = true
      if (player.statue.statue[6] >= 64) this.smallTrophies2nd[54] = true
      if (player.shine.shine >= 100000000) this.smallTrophies2nd[55] = true
      if (player.shine.shine >= 1000000000) this.smallTrophies2nd[56] = true
      if (player.shine.brightness >= 100000) this.smallTrophies2nd[57] = true
      if (player.shine.brightness >= 1000000) this.smallTrophies2nd[58] = true
      if (player.markStone.stones[0] >= 1) this.smallTrophies2nd[59] = true
      if (player.markStone.stones[0] >= 100) this.smallTrophies2nd[60] = true
      if (player.markStone.stones[0] >= 10000) this.smallTrophies2nd[61] = true
      if (player.markStone.stones[1] >= 1) this.smallTrophies2nd[62] = true
      if (player.markStone.stones[1] >= 100) this.smallTrophies2nd[63] = true
      if (player.markStone.stones[1] >= 10000) this.smallTrophies2nd[64] = true
    }
    this.countSmallTrophies();
  }

  countMemory() {
    let cnt = 0;
    for (let i = 0; i < TROPHY_NUM; i++) {
      if (this.trophies[i]) cnt++;
    }
    this.memory = cnt;
  }

  countSmallTrophies() {
    let cnt = 0;
    for (let i = 0; i < 100; i++) {
      if (this.smallTrophies1st[i]) cnt++;
    }
    for (let i = 0; i < 100; i++) {
      if (this.smallTrophies2nd[i]) cnt++;
    }
    this.smallTrophy = cnt
  }
}
