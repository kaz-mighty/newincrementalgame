class Shine {
  static shineShopCost = [
    50000,
    100000,
    100000,
    300000,
    300000,
    5000000,
  ];

  static getBaseShinePercent(clear) {
    if (clear >= 32 * 8 - 1) return 0.20
    if (clear >= 32 * 7) return 0.16
    if (clear >= 32 * 6) return 0.13
    if (clear >= 32 * 5) return 0.10
    if (clear >= 32 * 4) return 0.07
    if (clear >= 32 * 3) return 0.04
    if (clear >= 32 * 2) return 0.02
    return 0
  }

  static getBaseBrightPercent(clear) {
    if (clear >= 32 * 8 - 1) return 0.010
    if (clear >= 32 * 7) return 0.008
    if (clear >= 32 * 6) return 0.006
    if (clear >= 32 * 5) return 0.005
    if (clear >= 32 * 4) return 0.004
    if (clear >= 32 * 3) return 0.003
    if (clear >= 32 * 2) return 0.002
    if (clear >= 32 * 1) return 0.001
    return 0
  }

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.shine = playerData.shine;
    this.brightness = playerData.brightness;
    this.flicker = playerData.flicker;

    this.residue = playerData.residue;
  }

  /**
   * @param {Player} player 
   * @param {number[]} eachPipedSmallTrophy 
   */
  calcShinePercent(player, eachPipedSmallTrophy) {
    let sp = Shine.getBaseShinePercent(player.challengeCleared.length)
    sp += 0.02 * player.setChip[30]
    sp += 0.01 * eachPipedSmallTrophy[6]
    sp += 0.001 * Math.floor(Math.pow(this.residue, 1 / 3))
    sp += 0.01 * player.statues.polishedStatueSum

    return sp
  }
  
  /**
   * @param {Player} player 
   * @param {number} remember 
   */
  calcMaxShine(player, remember) {
    const clear = player.challengeCleared.length;
    const rememberLevel = Math.floor((remember + 16) / 16);

    let value = 0;
    if (clear >= 32 * 8 - 1) value = 10000000;
    else if (clear >= 32 * 7) value = 3000000;
    else if (clear >= 32 * 6) value = 1000000;
    else if (clear >= 32 * 5) value = 700000;
    else if (clear >= 32 * 4) value = 400000;
    else if (clear >= 32 * 3) value = 200000;
    else if (clear >= 32 * 2) value = 100000;
    else value = 0;

    value *= rememberLevel;
    value += (value / 10) * player.statues.polishedStatueSum;
    return Math.floor(value);
  }

  /**
   * @param {Player} player 
   * @param {number[]} eachPipedSmallTrophy 
   */
  calcBrightPercent(player, eachPipedSmallTrophy) {
    let bp = Shine.getBaseBrightPercent(player.rankChallengeCleared.length)
    bp += 0.001 * player.setChip[49]
    bp += 0.001 * eachPipedSmallTrophy[9] * 0.5
    bp += 0.001 * player.statues.brightStatueSum * 0.5

    return bp
  }

  /**
   * @param {Player} player 
   * @param {number} remember 
   */
  calcMaxBright(player, remember) {
    const clear = player.rankChallengeCleared.length;
    const rememberLevel = Math.floor((remember + 16) / 16);

    let value = 0;
    if (clear >= 32 * 8 - 1) value = 10000;
    else if (clear >= 32 * 7) value = 6000;
    else if (clear >= 32 * 6) value = 3500;
    else if (clear >= 32 * 5) value = 2000;
    else if (clear >= 32 * 4) value = 1200;
    else if (clear >= 32 * 3) value = 700;
    else if (clear >= 32 * 2) value = 300;
    else if (clear >= 32) value = 100;
    else value = 0;

    value *= rememberLevel;
    value += (value / 10) * player.statues.brightStatueSum;
    return Math.floor(value);
  }

  getFlickerPercent(stage) {
    return 1 / 1000000 * stage;
  }

  getMaxFlicker(stage) {
    return stage * stage * 2;
    //max:2097152
  }

  /**
   * @param {Player} player 
   * @param {number[]} eachPipedSmallTrophy
   * @param {number} remember 
   */
  updateShine(player, eachPipedSmallTrophy, remember) {
    const maxShine = this.calcMaxShine(player, remember);
    if (this.shine >= maxShine) return;

    const shinePercent = this.calcShinePercent(player, eachPipedSmallTrophy);
    let shineGain = Math.floor(shinePercent);
    if (Math.random() < shinePercent - shineGain) {
      shineGain += 1;
    }

    //クリスマスキャンペーン
    if (player.activatedCampaigns.includes("xmas2") && shineGain >= 1) {
      if (Math.random() <= 0.5) {
        shineGain += 1;
      }
    }

    if (player.rankChallengeBonuses.includes(2)) shineGain *= 2;
    shineGain *= player.campaign.accelLevelUsed + 1;
    this.shine = Math.min(this.shine + shineGain, maxShine);
  }

  /**
   * @param {Player} player 
   * @param {number[]} eachPipedSmallTrophy
   * @param {number} remember 
   */
  updateBright(player, eachPipedSmallTrophy, remember) {
    const maxBright = this.calcMaxBright(player, remember);
    if (this.brightness >= maxBright) return;

    let brightGain = 0;
    if (Math.random() < this.calcBrightPercent(player, eachPipedSmallTrophy)) {
      brightGain += 1;
    }

    //クリスマスキャンペーン
    if (player.activatedCampaigns.includes("xmas2") && brightGain >= 1) {
      if (Math.random() <= 0.5) {
        brightGain += 1;
      }
    }

    brightGain *= player.campaign.accelLevelUsed + 1;
    this.brightness = Math.min(this.brightness + brightGain, maxBright);
  }

  /**
   * @param {Player} player 
   * @param {number} pChallengeStage
   */
  updateFlicker(player, pChallengeStage) {
    const maxFlicker = this.getMaxFlicker(pChallengeStage);
    if (this.flicker >= maxFlicker) return;

    let flickerGain = 0;
    if (Math.random() < this.getFlickerPercent(pChallengeStage)) {
      flickerGain += 1;
    }

    //クリスマスキャンペーン
    if (player.activatedCampaigns.includes("xmas2") && flickerGain >= 1) {
      if (Math.random() <= 0.5) {
        flickerGain += 1;
      }
    }

    flickerGain *= player.campaign.accelLevelUsed + 1;
    this.flicker = Math.min(this.flicker + flickerGain, maxFlicker);
  }
}
