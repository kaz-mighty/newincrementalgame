/* 型情報インポート 
 * 名前空間インポートと同名の変数定義があるとき、ファイル名の昇順でインポートが先だと何故か衝突するため、
 * d.tsファイルより後ろのファイルに書く。(typescript 5.9.3で確認)
 * 非モジュールjsファイルで@importすると何故かグローバルにインポートされるため、記載はこのファイルのみでよい。
 * (むしろ2つ書くと衝突する)
 */
/** @import * as Vue from "vue" */
/** @import Decimal from "break_infinity.js" */

class Player {
  /**
   * @param {Decimal} num 
   * @param {Decimal} cap 
   */
  static softCap(num, cap) {
    if (num.lessThanOrEqualTo(cap)) return num;
    let capped = num.div(cap)
    capped = new Decimal(capped.log2()).add(1)
    return cap.mul(capped).min(num)
  }
  /**
   * @param {Decimal} num 
   * @param {Decimal} cap 
   */
  static strongSoftCap(num, cap) {
    if (num.lessThanOrEqualTo(cap)) return num;
    let capped = num.div(cap)
    capped = new Decimal(capped.log2()).add(1)
    capped = new Decimal(capped.log2()).add(1)
    return cap.mul(capped).min(num)
  }


  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.money = new Decimal(playerData.money);
    this.level = new Decimal(playerData.level);
    this.levelResetTime = new Decimal(playerData.levelresettime);
    this.maxLevelGained = new Decimal(playerData.maxlevelgained);

    this.shines = new Shine(playerData);

    this.rank = new Decimal(playerData.rank);
    this.rankResetTime = new Decimal(playerData.rankresettime);

    this.crown = new Decimal(playerData.crown);
    this.crownResetTime = new Decimal(playerData.crownresettime);

    this.generator = new GameGenerator(playerData);
    this.accelerator = new Accelerator(playerData);

    this.darkMoney = new Decimal(playerData.darkmoney);

    this.darkGenerators = playerData.darkgenerators.map(v => new Decimal(v));
    this.darkGeneratorsBought = playerData.darkgeneratorsBought.map(v => new Decimal(v));
    this.darkGeneratorsCost = playerData.darkgeneratorsCost.map(v => new Decimal(v));

    this.darkLevel = new Decimal(playerData.darklevel);

    this.lightMoney = new Decimal(playerData.lightmoney);

    this.lightGenerators = playerData.lightgenerators.map(v => new Decimal(v));
    this.lightGeneratorsBought = playerData.lightgeneratorsBought.map(v => new Decimal(v));
    this.lightGeneratorsCost = playerData.lightgeneratorsCost.map(v => new Decimal(v));

    this.tickSpeed = playerData.tickspeed;
    this.saveVersion = playerData.saveversion;

    this.campaign = Campaign.new(playerData);

    this.currentTab = "basic";
    this.tweeting = Array.from(playerData.tweeting);

    this.challenge = new Challenge(playerData);

    this.boughtType = Array.from(playerData.boughttype);

    this.trophies = Array.from(playerData.trophies);
    this.smallTrophies1st = Array.from(playerData.smalltrophies);
    this.smallTrophies2nd = Array.from(playerData.smalltrophies2nd);

    this.levelShop = new LevelShop(playerData);

    this.remember = playerData.remember;

    this.chips = new Chips(playerData);
    this.statues = Statues.new(playerData);

    this.spiritLevelA = Array.from(playerData.spiritlevela);

    this.worldPipe = Array.from(playerData.worldpipe);
    this.rings = new Rings(playerData.rings);

    this.auto = {
        autoSpendShine: playerData.rings.outsideauto.autospendshine,
        autoSpendShineNumber: playerData.rings.outsideauto.autospendshinenumber,
        autoSpendBright: playerData.rings.outsideauto.autospendbright,
        autoSpendBrightNumber: playerData.rings.outsideauto.autospendbrightnumber,
        autoDarkLevelReset: playerData.rings.outsideauto.autodarklevelreset,
        autoDarkLevelResetBorder: playerData.rings.outsideauto.autodarklevelresetborder,
        autoDoChallenge: playerData.rings.outsideauto.autodochallenge,
        autoRing: playerData.rings.auto.doauto,
    };

    this.commonMult = new Decimal(0);
    this.incrementalMults = new Array(8).fill(null).map(() => new Decimal(1));
    this.memorySum = 0;
    this.rememberSum = 0;
    this.smallTrophy = 0;
    this.eachPipedSmallTrophy = new Array(worldnum).fill(0);
    this.pipedSmallTrophy = 0;
    this.multByAc = new Decimal(1);

    this.unUsed = {
      shineLoader: Array.from(playerData.shineloader),
      brightLoader: Array.from(playerData.brightloader),
      rememberSpent: playerData.rememberspent,
      rememberForgot: playerData.rememberforgot,
      spiritBoughtCurrentCrown: Array.from(playerData.spiritboughtcurrentcrown),
    };
  }

  /** @returns {PlayerSaveData} */
  toSaveObject() {
    const statues = this.statues.toSaveObject();
    const chips = this.chips.toSaveObject();
    return {
      money: this.money,
      level: this.level,
      levelresettime: this.levelResetTime,
      maxlevelgained: this.maxLevelGained,
      token: this.challenge.token,
      shine: this.shine,
      brightness: this.brightness,
      flicker: this.flicker,

      shineloader: this.unUsed.shineLoader,
      brightloader: this.unUsed.brightLoader,

      residue: this.shines.residue,

      rank: this.rank,
      rankresettime: this.rankResetTime,

      crown: this.crown,
      crownresettime: this.crownResetTime,

      ranktoken: this.challenge.rankToken,

      generators: this.generator.generators,
      generatorsBought: this.generator.generatorsBought,
      generatorsCost: this.generator.generatorsCost,
      generatorsMode: this.generator.generatorsMode,

      accelerators: this.accelerator.accelerators,
      acceleratorsBought: this.accelerator.acceleratorsBought,
      acceleratorsCost: this.accelerator.acceleratorsCost,

      darkmoney: this.darkMoney,

      darkgenerators: this.darkGenerators,
      darkgeneratorsBought: this.darkGeneratorsBought,
      darkgeneratorsCost: this.darkGeneratorsCost,

      darklevel: this.darkLevel,

      lightmoney: this.lightMoney,

      lightgenerators: this.lightGenerators,
      lightgeneratorsBought: this.lightGeneratorsBought,
      lightgeneratorsCost: this.lightGeneratorsCost,

      tickspeed: this.tickSpeed,
      accelevel: this.campaign.accelLevel,
      accelevelused: this.campaign.accelLevelUsed,
      activatedcampaigns: this.activatedCampaigns,
      timecrystal: this.accelerator.timeCrystal,
      saveversion: this.saveVersion,

      currenttab: this.currentTab,
      tweeting: this.tweeting,

      onchallenge: this.onChallenge,
      challenges: this.challenges,
      challengecleared: this.challengeCleared,
      challengebonuses: this.challengeBonuses,

      challengeweight: this.challenge.challengeWeight,
      challengeweightvalue: this.challenge.challengeWeightValue,

      onpchallenge: this.challenge.onPerfectChallenge,
      pchallenges: this.challenge.perfectChallenges,
      pchallengecleared: this.challenge.perfectChallengeCleared,
      prchallengecleared: this.challenge.perfectRankChallengeCleared,

      boughttype: this.boughtType,
      setmodes: this.generator.setModes,
      setchallengebonusesfst: this.challenge.setChallengeBonuses1,
      setchallengebonusessnd: this.challenge.setChallengeBonuses2,
      setrankchallengebonusesfst: this.challenge.setRankChallengeBonuses1,
      setrankchallengebonusessnd: this.challenge.setRankChallengeBonuses2,

      rankchallengecleared: this.rankChallengeCleared,
      rankchallengebonuses: this.rankChallengeBonuses,

      trophies: this.trophies,
      smalltrophies: this.smallTrophies1st,
      smalltrophies2nd: this.smallTrophies2nd,

      levelitems: this.levelShop.levelItems,
      levelitembought: this.levelShop.levelItemBought,

      remember: this.remember,
      rememberspent: this.unUsed.rememberSpent,
      rememberforgot: this.unUsed.rememberForgot,

      chip: chips.chip,
      setchip: chips.setchip,
      disabledchip: chips.disabledchip,
      spendchip: chips.spendchip,

      statue: statues.statue,
      polishedstatue: statues.polishedstatue,
      polishedstatuebr: statues.polishedstatuebr,

      spiritlevela: this.spiritLevelA,
      spiritboughtcurrentcrown: this.unUsed.spiritBoughtCurrentCrown,

      setchiptypefst: chips.setchiptypefst,

      worldpipe: this.worldPipe,
      rings: this.rings.toSaveObject(this),
    };
  }

  /* リファクタ中の一時的措置 */
  get generatorsBought() {return this.generator.generatorsBought;}
  get acceleratorsBought() {return this.accelerator.acceleratorsBought;}

  get shine() {return this.shines.shine;}
  set shine(x) {this.shines.shine = x;}
  get brightness() {return this.shines.brightness;}
  set brightness(x) {this.shines.brightness = x;}
  get flicker() {return this.shines.flicker;}
  set flicker(x) {this.shines.flicker = x;}

  get onChallenge() {return this.challenge.onChallenge;}
  set onChallenge(x) {this.challenge.onChallenge = x;}
  get challenges() {return this.challenge.challenges;}
  get challengeCleared() {return this.challenge.challengeCleared;}
  get challengeBonuses() {return this.challenge.challengeBonuses;}
  get rankChallengeCleared() {return this.challenge.rankChallengeCleared;}
  get rankChallengeBonuses() {return this.challenge.rankChallengeBonuses;}

  get chip() {
    return this.chips.chip;
  }
  get setChip() {
    return this.chips.setChip;
  }
  get activatedCampaigns() {
    return this.campaign.activated;
  }

  calcCommonMult() {
    let mult = new Decimal(1);
    if (!(this.challenge.isChallengeActive(7))) {
      let cap = new Decimal(100).mul(this.levelShop.levelItems[2] * (1 + this.setChip[28] * 0.3) + 1)
      mult = mult.mul(Player.softCap(this.levelResetTime.add(1), cap))
    }

    if (this.challenge.activeBonuses.includes(3)) {
      mult = mult.mul(new Decimal(2))
    }

    if (this.rankChallengeBonuses.includes(3)) {
      mult = mult.mul(new Decimal(3))
    }

    if (this.challenge.isPChallengeActive(0)) {
      mult = mult.div(100)
    }

    let x1 = 0.25
    let x2 = 12

    if (this.challenge.isPChallengeActive(7)) {
      x1 = 1.0 / 81
      x2 = 27
    }

    mult = mult.mul(1 + this.smallTrophy * 0.01 + this.memorySum * x1)

    if (this.rankChallengeBonuses.includes(11)) {
      mult = mult.mul(new Decimal(2).pow(new Decimal(this.memorySum).div(x2)))
    }

    mult = mult.mul(1 + Math.sqrt(this.pipedSmallTrophy))

    if (this.onChallenge && this.rankChallengeBonuses.includes(4)) {
      mult = mult.mul(1 + this.challenges.length * 0.25)
    }
    if (!(this.challenge.isPChallengeActive(8))) {
      if (this.darkMoney.greaterThanOrEqualTo(1)) {
        mult = mult.mul(new Decimal(this.darkMoney.add(10).log10()).pow(1 + this.setChip[40] * 0.1))
      }
    }

    mult = mult.mul(this.multByAc)
    if (this.multByAc.gt(1)) mult = mult.mul(this.multByAc)

    mult = mult.mul(1 + this.setChip[0] * 0.1)

    mult = mult.mul(this.statues.generatorMulti)

    let camp = this.campaign.sumCommonBonus;
    if (this.activatedCampaigns.includes("newyear2025")) {
      if (this.challenge.isChallengeActive(3) && this.challenge.isChallengeActive(4)) {
        camp = camp + 10
      }
    }

    mult = mult.mul(1 + 4 * camp)

    if (this.auto.autoDoChallenge) {
      mult = mult.mul(0.001)
    }


    this.commonMult = mult
  }

  /** @param {number} i */
  calcBasicIncrementMult(i) {
    let mult = new Decimal(this.commonMult);

    if (!(this.challenge.isChallengeActive(2))) {
      let mm = new Decimal(1)
      mm = mm.mul(this.generator.generatorsBought[i])
      if (this.challenge.activeBonuses.includes(11)) {
        mm = mm.mul(new Decimal(mm.add(2).log2()))
      }

      if (i < this.generator.highestGenerator && mm.greaterThanOrEqualTo(1)) {
        mult = mult.mul(mm)
      } else {
        if (this.challenge.activeBonuses.includes(2) && mm.greaterThanOrEqualTo(1)) {
          mult = mult.mul(mm)
        }
      }
    }

    if (i == 0 && this.challenge.activeBonuses.includes(7)) {
      if (this.rankChallengeBonuses.includes(7)) {
        mult = mult.mul(Player.strongSoftCap(this.maxLevelGained, new Decimal(100000)))
      } else {
        mult = mult.mul(this.maxLevelGained.min(100000))
      }
    }
    if (!(this.challenge.isPChallengeActive(8))) {
      if (this.darkGenerators[i].greaterThanOrEqualTo(1)) {
        mult = mult.mul(new Decimal(i + 2 + this.darkGenerators[i].log10()).pow(1 + this.setChip[i + 32] * 0.25))
      }
    }

    mult = mult.mul(1 + this.setChip[i + 1] * 0.5)

    if (this.challenge.isPChallengeActive(2)) {
      this.incrementalMults[2] = new Decimal(0)
      this.incrementalMults[5] = new Decimal(0)
    }

    this.incrementalMults[i] = mult
  }

  /**
   * @param {number} i 
   * @param {number} to 
   */
  calcIncrementMult(i, to) {
    let mult = this.incrementalMults[i]
    if (!(this.challenge.isChallengeActive(4))) {
      mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
    }

    let lv = new Decimal(this.level.pow(1 + 0.5 * this.setChip[19]).add(2).log2())

    let rk = this.rank.add(2).div(262142).log2()
    rk += new Decimal(this.rank.add(2).log2()).log2() * this.setChip[23]
    mult = mult.mul(new Decimal(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))))

    if (this.challenge.isPChallengeActive(3) && mult.gt("1e-100")) {
      let b = Math.floor(mult.log10() / 6)
      mult = new Decimal(10).pow(b * 6)
    }

    return mult
  }

  calcTickSpeed() {
    let tsp = 1000
    if (this.challenge.isPChallengeActive(1)) tsp = 10000
    tsp += 500 * this.campaign.accelLevelUsed
    tsp -= this.setChip[9] * 50
    tsp -= this.levelShop.levelItems[1] * this.challengeBonuses.length * (1 + this.setChip[27] * 0.5)
    tsp -= this.accelerator.timeCrystalSum
    if (tsp < 1) tsp = 1
    tsp /= this.accelerator.calcSpeed(this.challenge, this.setChip[10])

    return tsp
  }
  
}
