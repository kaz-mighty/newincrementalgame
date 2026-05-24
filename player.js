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


  /** 
   * @param {number} world 
   * @param {PlayerSaveData} playerData 
   * @param {CommonData} commonData 
   */
  constructor(world, playerData, commonData) {
    this.world = world;
    this.saveVersion = playerData.saveversion;

    this.money = new Decimal(playerData.money);
    this.tickSpeed = playerData.tickspeed;
    this.currentTab = "basic";
    this.tweeting = Array.from(playerData.tweeting);

    this.level = new Decimal(playerData.level);
    this.levelResetTime = new Decimal(playerData.levelresettime);
    this.maxLevelGained = new Decimal(playerData.maxlevelgained);
    this.rank = new Decimal(playerData.rank);
    this.rankResetTime = new Decimal(playerData.rankresettime);
    this.crown = new Decimal(playerData.crown);
    this.crownResetTime = new Decimal(playerData.crownresettime);

    this.generator = new GameGenerator(playerData);
    this.accelerator = new Accelerator(playerData);
    this.dark = new Dark(playerData);
    this.light = new Light(playerData);

    this.campaign = Campaign.new(playerData);

    this.challenge = new Challenge(playerData);
    this.levelShop = new LevelShop(playerData);
    this.shines = new Shine(playerData);
    this.chips = new Chips(playerData);
    this.statues = Statues.new(playerData);
    this.rings = new Rings(playerData.rings);
    this.spiritLevelA = Array.from(playerData.spiritlevela);

    this.trophies = Array.from(playerData.trophies);
    this.smallTrophies1st = Array.from(playerData.smalltrophies);
    this.smallTrophies2nd = Array.from(playerData.smalltrophies2nd);

    this.remember = playerData.remember;
    this.worldPipe = Array.from(playerData.worldpipe);

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

    this.common = commonData;
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
      shine: this.shines.shine,
      brightness: this.shines.brightness,
      flicker: this.shines.flicker,

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

      darkmoney: this.dark.darkMoney,

      darkgenerators: this.dark.darkGenerators,
      darkgeneratorsBought: this.dark.darkGeneratorsBought,
      darkgeneratorsCost: this.dark.darkGeneratorsCost,

      darklevel: this.dark.darkLevel,

      lightmoney: this.light.lightMoney,

      lightgenerators: this.light.lightGenerators,
      lightgeneratorsBought: this.light.lightGeneratorsBought,
      lightgeneratorsCost: this.light.lightGeneratorsCost,

      tickspeed: this.tickSpeed,
      accelevel: this.campaign.accelLevel,
      accelevelused: this.campaign.accelLevelUsed,
      activatedcampaigns: this.campaign.activated,
      timecrystal: this.accelerator.timeCrystal,
      saveversion: this.saveVersion,

      currenttab: this.currentTab,
      tweeting: this.tweeting,

      onchallenge: this.challenge.onChallenge,
      challenges: this.challenge.challenges,
      challengecleared: this.challenge.challengeCleared,
      challengebonuses: this.challenge.challengeBonuses,

      challengeweight: this.challenge.challengeWeight,
      challengeweightvalue: this.challenge.challengeWeightValue,

      onpchallenge: this.challenge.onPerfectChallenge,
      pchallenges: this.challenge.perfectChallenges,
      pchallengecleared: this.challenge.perfectChallengeCleared,
      prchallengecleared: this.challenge.perfectRankChallengeCleared,

      boughttype: this.shines.boughtType,
      setmodes: this.generator.setModes,
      setchallengebonusesfst: this.challenge.setChallengeBonuses1,
      setchallengebonusessnd: this.challenge.setChallengeBonuses2,
      setrankchallengebonusesfst: this.challenge.setRankChallengeBonuses1,
      setrankchallengebonusessnd: this.challenge.setRankChallengeBonuses2,

      rankchallengecleared: this.challenge.rankChallengeCleared,
      rankchallengebonuses: this.challenge.rankChallengeBonuses,

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

  calcCommonMult() {
    let mult = new Decimal(1);
    if (!(this.challenge.isChallengeActive(7))) {
      let cap = new Decimal(100).mul(this.levelShop.levelItems[2] * (1 + this.chips.setChip[28] * 0.3) + 1)
      mult = mult.mul(Player.softCap(this.levelResetTime.add(1), cap))
    }

    if (this.challenge.activeBonuses.includes(3)) {
      mult = mult.mul(new Decimal(2))
    }

    if (this.challenge.rankChallengeBonuses.includes(3)) {
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

    if (this.challenge.rankChallengeBonuses.includes(11)) {
      mult = mult.mul(new Decimal(2).pow(new Decimal(this.memorySum).div(x2)))
    }

    mult = mult.mul(1 + Math.sqrt(this.pipedSmallTrophy))

    if (this.challenge.onChallenge && this.challenge.rankChallengeBonuses.includes(4)) {
      mult = mult.mul(1 + this.challenge.challenges.length * 0.25)
    }
    if (!(this.challenge.isPChallengeActive(8))) {
      if (this.dark.darkMoney.greaterThanOrEqualTo(1)) {
        mult = mult.mul(new Decimal(this.dark.darkMoney.add(10).log10()).pow(1 + this.chips.setChip[40] * 0.1))
      }
    }

    mult = mult.mul(this.multByAc)
    if (this.multByAc.gt(1)) mult = mult.mul(this.multByAc)

    mult = mult.mul(1 + this.chips.setChip[0] * 0.1)

    mult = mult.mul(this.statues.generatorMulti)

    let camp = this.campaign.sumCommonBonus;
    if (this.campaign.activated.includes("newyear2025")) {
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
      if (this.challenge.rankChallengeBonuses.includes(7)) {
        mult = mult.mul(Player.strongSoftCap(this.maxLevelGained, new Decimal(100000)))
      } else {
        mult = mult.mul(this.maxLevelGained.min(100000))
      }
    }
    if (!(this.challenge.isPChallengeActive(8))) {
      if (this.dark.darkGenerators[i].greaterThanOrEqualTo(1)) {
        mult = mult.mul(new Decimal(i + 2 + this.dark.darkGenerators[i].log10()).pow(1 + this.chips.setChip[i + 32] * 0.25))
      }
    }

    mult = mult.mul(1 + this.chips.setChip[i + 1] * 0.5)

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

    let lv = new Decimal(this.level.pow(1 + 0.5 * this.chips.setChip[19]).add(2).log2())

    let rk = this.rank.add(2).div(262142).log2()
    rk += new Decimal(this.rank.add(2).log2()).log2() * this.chips.setChip[23]
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
    tsp -= this.chips.setChip[9] * 50
    tsp -= this.levelShop.levelItems[1] * this.challenge.challengeBonuses.length * (1 + this.chips.setChip[27] * 0.5)
    tsp -= this.accelerator.timeCrystalSum
    if (tsp < 1) tsp = 1
    tsp /= this.accelerator.calcSpeed(this.challenge, this.chips.setChip[10])

    return tsp
  }
  
  /** @param {number} num */
  spendShine(num) {
    if (this.shines.shine < num) return;
    if (this.challenge.isPChallengeActive(6)) return
    this.shines.shine -= num
    let val = new Decimal(11 + this.chips.setChip[31]).pow(new Decimal(num).log10())
    this.generator.updateGenerators(this, new Decimal(val))
    this.accelerator.updateAccelerators(this, new Decimal(val))
    if (this.trophies[9]) {
      this.shines.residue += Math.floor(num * (1 + this.challenge.perfectChallengeStage) / 1000000)
    }
  }
  /** @param {number} num */
  spendBrightness(num) {
    if (this.shines.brightness < num) return;
    if (this.challenge.isPChallengeActive(6)) return
    this.shines.brightness -= num
    let val = new Decimal(11 + this.chips.setChip[50]).pow(new Decimal(num * 100).log10())
    let vald = new Decimal(10 + this.chips.setChip[51] * 0.25).pow(new Decimal(num).log10())
    this.generator.updateGenerators(this, new Decimal(val))
    this.accelerator.updateAccelerators(this, new Decimal(val))
    this.dark.updateDarkGenerators(this, new Decimal(vald))
  }
  /** @param {number} num */
  spendFlicker(num) {
    if (this.shines.flicker < num) return;
    this.shines.flicker -= num
    let val = new Decimal(11 + this.chips.setChip[50]).pow(new Decimal(num * 10000).log10())
    let vald = new Decimal(10 + this.chips.setChip[51] * 0.25).pow(new Decimal(num).log10())
    this.generator.updateGenerators(this, new Decimal(val))
    this.accelerator.updateAccelerators(this, new Decimal(val))
    this.dark.updateDarkGenerators(this, new Decimal(vald))
    this.light.updateLightGenerators(this, new Decimal(vald))
  }

  configTweet(content) {
    if (!this.tweeting.includes(content)) {
      this.tweeting.push(content)
    } else {
      this.tweeting.splice(this.tweeting.indexOf(content), 1)
    }
  }


  resetLevelBorder() {
    let p = (this.challenge.isChallengeActive(0)) ? 24 : 18
    return new Decimal(10).pow(p)
  }
  calcGainLevel() {
    let dividing = 19 - this.rank.add(2).log2()
    if (dividing < 1) dividing = 1
    let mny = Math.pow(this.money.log10() - 17, this.chips.setChip[18])
    let gainLevel = new Decimal(this.money.mul(mny).log10()).div(dividing).pow_base(2)

    let glMin = new Decimal(18).div(dividing).pow_base(2)
    let glMax = this.maxLevelGained.div(2)

    if (!glMin.add(0.1).greaterThanOrEqualTo(glMax)) {
      if (gainLevel.lt(glMax)) {
        let percent = new Decimal(1).sub(gainLevel.sub(glMin).div(glMax.sub(glMin)))

        percent = percent.pow(1 + this.levelShop.levelItems[0] * (1 + this.chips.setChip[26] * 2))
        percent = new Decimal(1).sub(percent)
        if (percent.lt("1e-5")) {
          gainLevel = gainLevel.mul(1 + this.levelShop.levelItems[0] * (1 + this.chips.setChip[26] * 2))
        } else {
          gainLevel = glMax.sub(glMin).mul(percent).add(glMin)
        }
      }

    }

    if (this.challenge.isPChallengeActive(4)) {
      gainLevel = new Decimal(gainLevel.log2()).max(1)
    }

    gainLevel = gainLevel.round().max(1)

    gainLevel = gainLevel.mul(new Decimal(this.eachPipedSmallTrophy[2] / 5.0).pow_base(2))
    if (this.challenge.activeBonuses.includes(12)) gainLevel = gainLevel.mul(new Decimal(2))
    return gainLevel;
  }
  /**
   * @param {boolean} force 
   * @param {boolean} exit 
   */
  resetLevel(force, exit) {
    if (this.challenge.isChallengeActive(0)) {
      if (this.money.lt(new Decimal('1e24'))) {
        alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
        return;
      }
    }

    let dividing = 19 - this.rank.add(2).log2()
    if (dividing < 1) dividing = 1
    let gainLevel = this.calcGainLevel()
    let rst = this.rankResetTime.add(1)
    if (this.challenge.isPChallengeActive(4)) {
      rst = rst.pow(0.1).round()
    }
    let gainLevelReset = rst.mul(1 + this.chips.setChip[20]).mul(new Decimal(exit ? 0 : this.challenge.activeBonuses.includes(8) ? 2 : 1))


    if (force || confirm('昇段リセットして、段位' + gainLevel + 'を得ますか？')) {

      let disa = this.challenge.isPChallengeActive(9) && (!exit)
      if (this.challenge.onChallenge) {
        this.challenge.onChallenge = false;
        if (this.challenge.challenges.length >= 6) {
          this.trophies[3] = true;
        }
        let id = this.challenge.getChallengeId()
        if (!this.challenge.challengeCleared.includes(id)) {
          this.challenge.challengeCleared.push(this.challenge.getChallengeId())
          disa = false
        }
        this.challenge.activeBonuses = this.challenge.challengeBonuses;
      }

      if (disa) {
        let randomint = Math.floor(Math.random() * 100)
        this.chips.disableChip(randomint)
      }

      if (this.money.greaterThan(1e80)) {
        let money = this.money;
        if (this.common.chipThresholdUse) money = money.min(this.common.chipThreshold)
        
        let bonus = new Decimal(10).pow(this.eachPipedSmallTrophy[7] * 0.4)
        if (this.campaign.activated.includes("tanabata2")) {
          bonus = bonus.mul(this.light.lightMoney.add(1))
        }
        console.log("gain chip bonus:" + bonus)

        const chipDoubleProb = 0.01 * (1 + 0.1 * this.eachPipedSmallTrophy[11])
        const isGw2 = this.campaign.activated.includes("gw2")

        this.chips.gainRandomChip(money.mul(bonus), chipDoubleProb, isGw2);
      }

      this.money = new Decimal(1)
      this.level = this.level.add(exit ? new Decimal(0) : gainLevel)
      this.levelResetTime = this.levelResetTime.add(gainLevelReset)
      this.maxLevelGained = this.maxLevelGained.max(exit ? new Decimal(0) : gainLevel)
      if (this.campaign.accelLevel > 0) {
        this.accelerator.gainTimeCrystal()
      }

      this.generator.reset()
      this.accelerator.reset(this.challenge)

      this.tickSpeed = 1000

      if (this.challenge.activeBonuses.includes(0)) this.money = new Decimal(10001)
      if (this.challenge.rankChallengeBonuses.includes(0)) this.money = this.money.add(new Decimal("1e9"))
    }
  }


  resetRankBorder() {
    let p = (this.challenge.isChallengeActive(0)) ? 96 : 72
    let q = this.rememberSum
    if (this.challenge.isPChallengeActive(7)) {
      q = Math.pow(q, 0.5)
    }
    p -= Math.min(q / 2.0, 36)
    return new Decimal(10).pow(p)
  }
  calcGainRank() {
    let dv = 36 - 0.25 * this.rememberSum - 1.2 * this.levelShop.levelItems[4] * (1 + 0.2 * this.chips.setChip[29])
    dv = Math.max(dv, 6)
    dv = dv - this.crown.add(2).log2() * 0.1
    dv = Math.max(dv, 3)
    let gainRank = new Decimal(this.money.log10()).div(dv).pow_base(2).round()
    if (this.challenge.isPChallengeActive(5)) {
      gainRank = new Decimal(gainRank.log10()).max(1)
    }
    if (this.challenge.rankChallengeBonuses.includes(12)) {
      gainRank = gainRank.mul(3)
    }
    gainRank = gainRank.mul(1 + this.chips.setChip[22] * 0.5)
    gainRank = gainRank.mul(1 + this.eachPipedSmallTrophy[4] * 0.2)
    return gainRank
  }
  /** @param {boolean} force */
  resetRank(force) {
    if (this.challenge.isChallengeActive(0)) {
      if (this.money.lt(this.resetRankBorder())) {
        alert('現在挑戦1が適用されているため、まだ昇階リセットができません。')
        return;
      }
    }

    let gainRank = this.calcGainRank()
    if (force || confirm('昇階リセットして、階位' + gainRank + 'を得ますか？')) {

      if (this.challenge.onChallenge) {
        this.challenge.onChallenge = false;
        this.challenge.activeBonuses = this.challenge.challengeBonuses;
        if (this.challenge.challengeCleared.length >= 128 && !this.challenge.rankChallengeCleared.includes(this.challenge.getChallengeId())) {
          this.challenge.rankChallengeCleared.push(this.challenge.getChallengeId())
        }
      }

      this.money = new Decimal(1)
      this.level = new Decimal(0)
      this.levelResetTime = new Decimal(0)

      this.generator.reset()
      this.accelerator.reset(this.challenge)

      this.tickSpeed = 1000

      this.rank = this.rank.add(gainRank)
      this.rankResetTime = this.rankResetTime.add((this.challenge.rankChallengeBonuses.includes(8) ? new Decimal(3) : new Decimal(1)).mul(this.chips.setChip[24] + 1).mul(this.crownResetTime.add(1)))

      this.levelShop.levelItems = [0, 0, 0, 0, 0]

      this.challenge.activeBonuses = this.challenge.challengeBonuses

      if (this.challenge.activeBonuses.includes(0)) this.money = new Decimal(10001)
      if (this.challenge.rankChallengeBonuses.includes(0)) this.money = this.money.add(new Decimal("1e9"))
    }
  }


  resetCrownBorder() {
    return new Decimal("1e216")
  }
  calcGainCrown() {
    let dv = 72
    return new Decimal(2).pow(this.money.log10() / dv).round()
  }
  /** @param {boolean} force  */
  resetCrown(force) {
    if (this.challenge.onChallenge) {
      alert('現在挑戦中のため、昇冠リセットができません。')
      //あとで消す
      return;
    }
    if (this.challenge.isChallengeActive(0)) {
      if (this.money.lt(this.resetCrownBorder())) {
        alert('現在挑戦1が適用されているため、まだ昇冠リセットができません。')
        return;
      }
    }

    let gainCrown = this.calcGainCrown()
    if (force || confirm('昇冠リセットして、冠位' + gainCrown + 'を得ますか？')) {

      this.money = new Decimal(1)
      this.level = new Decimal(0)
      this.levelResetTime = new Decimal(0)

      this.rank = new Decimal(0)
      this.rankResetTime = new Decimal(0)

      this.generator.reset()
      this.accelerator.reset(this.challenge)

      if (!force) {
        this.crown = this.crown.add(gainCrown)
        this.crownResetTime = this.crownResetTime.add(1)
      }

      this.tickSpeed = 1000

      this.levelShop.levelItems = [0, 0, 0, 0, 0]

      this.challenge.activeBonuses = this.challenge.challengeBonuses

      if (this.challenge.activeBonuses.includes(0)) this.money = new Decimal(10001)
      if (this.challenge.rankChallengeBonuses.includes(0)) this.money = this.money.add(new Decimal("1e9"))

    }
  }


  calcMaxPipe() {
    if (this.trophies[9]) return 3
    if (this.trophies[7]) return 2
    return 1
  }
  /** @param {number} to */
  openPipe(to) {
    let maxPipe = this.calcMaxPipe()
    if (this.worldPipe[to] >= maxPipe) return

    let havePipe = Math.floor((this.smallTrophy - 72) / 3)
    for (let i = 0; i < worldnum; i++) {
      havePipe -= this.worldPipe[i]
    }

    if (havePipe > 0 && this.worldPipe[to] < maxPipe) this.worldPipe[to] += 1
  }

  
  checkTrophies() {
    if (this.levelResetTime.greaterThan(0)) this.trophies[0] = true;
    if (this.rankResetTime.greaterThan(0)) this.trophies[1] = true;
    if (this.shines.shine > 0) this.trophies[2] = true;
    if (this.challenge.challengeCleared.includes(238) || this.challenge.challengeCleared.length >= 100) this.trophies[3] = true;
    if (this.dark.darkGenerators[0].greaterThan(0)) this.trophies[4] = true;
    if (this.shines.brightness > 0) this.trophies[5] = true;
    if (this.remember > 0) this.trophies[6] = true;
    if (this.world == 0) {
      if (this.rememberSum > 0) this.trophies[6] = true;
    }
    if (this.crownResetTime.greaterThan(0)) this.trophies[7] = true;
    if (this.light.lightGenerators[0].greaterThan(0)) this.trophies[8] = true;
    if (this.shines.flicker > 0) this.trophies[9] = true;

    this.common.trophyNumber[this.world] = this.countTrophies();
    if (this.world === 0 && this.common.trophyNumber[0] >= 6) {
      this.remember = Math.max(this.remember, this.common.trophyNumber[0]);
    }

    if (this.money.greaterThan(0)) this.smallTrophies1st[0] = true
    if (this.money.greaterThan(777)) this.smallTrophies1st[1] = true
    if (this.money.greaterThan(7777777)) this.smallTrophies1st[2] = true
    if (this.money.greaterThan("1e19")) this.smallTrophies1st[3] = true
    if (this.money.greaterThan("1e36")) this.smallTrophies1st[4] = true
    if (this.money.greaterThan("1e77")) this.smallTrophies1st[5] = true
    if (this.money.greaterThan("1e81")) this.smallTrophies1st[6] = true
    if (this.money.greaterThan("1e303")) this.smallTrophies1st[7] = true
    if (this.generator.generatorsBought[0].greaterThan(0)) this.smallTrophies1st[8] = true
    if (this.generator.generatorsBought[1].greaterThan(0)) this.smallTrophies1st[9] = true
    if (this.generator.generatorsBought[2].greaterThan(0)) this.smallTrophies1st[10] = true
    if (this.generator.generatorsBought[3].greaterThan(0)) this.smallTrophies1st[11] = true
    if (this.generator.generatorsBought[4].greaterThan(0)) this.smallTrophies1st[12] = true
    if (this.generator.generatorsBought[5].greaterThan(0)) this.smallTrophies1st[13] = true
    if (this.generator.generatorsBought[6].greaterThan(0)) this.smallTrophies1st[14] = true
    if (this.generator.generatorsBought[7].greaterThan(0)) this.smallTrophies1st[15] = true
    if (this.accelerator.acceleratorsBought[0].greaterThan(0)) this.smallTrophies1st[16] = true
    if (this.accelerator.acceleratorsBought[1].greaterThan(0)) this.smallTrophies1st[17] = true
    if (this.accelerator.acceleratorsBought[2].greaterThan(0)) this.smallTrophies1st[18] = true
    if (this.accelerator.acceleratorsBought[3].greaterThan(0)) this.smallTrophies1st[19] = true
    if (this.accelerator.acceleratorsBought[4].greaterThan(0)) this.smallTrophies1st[20] = true
    if (this.accelerator.acceleratorsBought[5].greaterThan(0)) this.smallTrophies1st[21] = true
    if (this.accelerator.acceleratorsBought[6].greaterThan(0)) this.smallTrophies1st[22] = true
    if (this.accelerator.acceleratorsBought[7].greaterThan(0)) this.smallTrophies1st[23] = true
    if (this.levelResetTime.greaterThan(200)) this.smallTrophies1st[24] = true
    if (this.levelResetTime.greaterThan(999)) this.smallTrophies1st[25] = true
    if (this.challenge.challengeCleared.includes(128)) this.smallTrophies1st[26] = true
    if (this.challenge.challengeCleared.includes(64)) this.smallTrophies1st[27] = true
    if (this.challenge.challengeCleared.includes(32)) this.smallTrophies1st[28] = true
    if (this.challenge.challengeCleared.includes(16)) this.smallTrophies1st[29] = true
    if (this.challenge.challengeCleared.includes(8)) this.smallTrophies1st[30] = true
    if (this.challenge.challengeCleared.includes(4)) this.smallTrophies1st[31] = true
    if (this.challenge.challengeCleared.includes(2)) this.smallTrophies1st[32] = true
    if (this.challenge.challengeCleared.includes(1)) this.smallTrophies1st[33] = true
    if (this.challenge.challengeCleared.length >= 32) this.smallTrophies1st[34] = true
    if (this.challenge.challengeCleared.length >= 64) this.smallTrophies1st[35] = true
    if (this.challenge.challengeCleared.length >= 96) this.smallTrophies1st[36] = true
    if (this.challenge.challengeCleared.length >= 128) this.smallTrophies1st[37] = true
    if (this.challenge.challengeCleared.length >= 160) this.smallTrophies1st[38] = true
    if (this.challenge.challengeCleared.length >= 192) this.smallTrophies1st[39] = true
    if (this.challenge.challengeCleared.length >= 224) this.smallTrophies1st[40] = true
    if (this.challenge.challengeCleared.length >= 255) this.smallTrophies1st[41] = true
    if (this.rankResetTime.greaterThan(1)) this.smallTrophies1st[42] = true
    if (this.rankResetTime.greaterThan(4)) this.smallTrophies1st[43] = true
    if (this.rankResetTime.greaterThan(9)) this.smallTrophies1st[44] = true
    if (this.rankResetTime.greaterThan(99)) this.smallTrophies1st[45] = true
    if (this.rankResetTime.greaterThan(999)) this.smallTrophies1st[46] = true
    if (this.levelShop.levelItemBought >= 4) this.smallTrophies1st[47] = true
    if (this.levelShop.levelItemBought >= 108) this.smallTrophies1st[48] = true
    if (this.levelShop.levelItemBought >= 256) this.smallTrophies1st[49] = true
    if (this.levelShop.levelItemBought >= 1728) this.smallTrophies1st[50] = true
    if (this.levelShop.levelItemBought >= 12500) this.smallTrophies1st[51] = true
    if (this.shines.shine >= 100) this.smallTrophies1st[52] = true
    if (this.shines.shine >= 1000) this.smallTrophies1st[53] = true
    if (this.shines.shine >= 10000) this.smallTrophies1st[54] = true
    if (this.shines.shine >= 100000) this.smallTrophies1st[55] = true
    if (this.shines.shine >= 1000000) this.smallTrophies1st[56] = true
    if (this.shines.shine >= 10000000) this.smallTrophies1st[57] = true
    if (this.common.exported.length >= 2) this.smallTrophies1st[58] = true
    if (this.tweeting.length >= 2) this.smallTrophies1st[59] = true
    if (this.dark.darkGenerators[0].greaterThanOrEqualTo(1)) this.smallTrophies1st[60] = true
    if (this.dark.darkGenerators[1].greaterThanOrEqualTo(1)) this.smallTrophies1st[61] = true
    if (this.dark.darkGenerators[2].greaterThanOrEqualTo(1)) this.smallTrophies1st[62] = true
    if (this.dark.darkGenerators[3].greaterThanOrEqualTo(1)) this.smallTrophies1st[63] = true
    if (this.dark.darkGenerators[4].greaterThanOrEqualTo(1)) this.smallTrophies1st[64] = true
    if (this.dark.darkGenerators[5].greaterThanOrEqualTo(1)) this.smallTrophies1st[65] = true
    if (this.dark.darkGenerators[6].greaterThanOrEqualTo(1)) this.smallTrophies1st[66] = true
    if (this.dark.darkGenerators[7].greaterThanOrEqualTo(1)) this.smallTrophies1st[67] = true
    if (this.challenge.rankChallengeCleared.length >= 32) this.smallTrophies1st[68] = true
    if (this.challenge.rankChallengeCleared.length >= 64) this.smallTrophies1st[69] = true
    if (this.challenge.rankChallengeCleared.length >= 96) this.smallTrophies1st[70] = true
    if (this.challenge.rankChallengeCleared.length >= 128) this.smallTrophies1st[71] = true
    if (this.challenge.rankChallengeCleared.length >= 160) this.smallTrophies1st[72] = true
    if (this.challenge.rankChallengeCleared.length >= 192) this.smallTrophies1st[73] = true
    if (this.challenge.rankChallengeCleared.length >= 224) this.smallTrophies1st[74] = true
    if (this.challenge.rankChallengeCleared.length >= 255) this.smallTrophies1st[75] = true
    if (this.shines.brightness >= 10) this.smallTrophies1st[76] = true
    if (this.shines.brightness >= 100) this.smallTrophies1st[77] = true
    if (this.shines.brightness >= 1000) this.smallTrophies1st[78] = true
    if (this.shines.brightness >= 10000) this.smallTrophies1st[79] = true
    if (this.dark.darkMoney.greaterThanOrEqualTo(1)) this.smallTrophies1st[80] = true
    if (this.dark.darkMoney.greaterThanOrEqualTo(777)) this.smallTrophies1st[81] = true
    if (this.dark.darkMoney.greaterThanOrEqualTo(7777777)) this.smallTrophies1st[82] = true
    if (this.dark.darkMoney.greaterThanOrEqualTo("1e18")) this.smallTrophies1st[83] = true
    if (this.dark.darkMoney.greaterThanOrEqualTo("1e72")) this.smallTrophies1st[84] = true
    if (this.chips.chip[0] > 0) this.smallTrophies1st[85] = true
    if (this.chips.chip[0] >= 210) this.smallTrophies1st[86] = true
    if (this.chips.chip[0] >= 1275) this.smallTrophies1st[87] = true
    if (this.chips.chip[1] > 0) this.smallTrophies1st[88] = true
    if (this.chips.chip[1] >= 210) this.smallTrophies1st[89] = true
    if (this.chips.chip[1] >= 1275) this.smallTrophies1st[90] = true
    if (this.chips.chip[2] > 0) this.smallTrophies1st[91] = true
    if (this.chips.chip[2] >= 210) this.smallTrophies1st[92] = true
    if (this.chips.chip[2] >= 1275) this.smallTrophies1st[93] = true
    if (this.chips.chip[3] > 0) this.smallTrophies1st[94] = true
    if (this.chips.chip[3] >= 210) this.smallTrophies1st[95] = true
    if (this.chips.chip[3] >= 1275) this.smallTrophies1st[96] = true
    if (this.dark.darkLevel.greaterThan(0)) this.smallTrophies1st[97] = true
    if (this.dark.darkLevel.greaterThan('1e3')) this.smallTrophies1st[98] = true
    if (this.dark.darkLevel.greaterThan('1e10')) this.smallTrophies1st[99] = true

    if (this.crownResetTime.gt(0)) {

      if (this.crownResetTime.gt(0)) this.smallTrophies2nd[0] = true
      if (this.crownResetTime.greaterThanOrEqualTo(5)) this.smallTrophies2nd[1] = true
      if (this.crownResetTime.greaterThanOrEqualTo(20)) this.smallTrophies2nd[2] = true
      if (this.crownResetTime.greaterThanOrEqualTo(100)) this.smallTrophies2nd[3] = true
      if (this.campaign.accelLevel >= 1) this.smallTrophies2nd[4] = true
      if (this.campaign.accelLevel >= 3) this.smallTrophies2nd[5] = true
      if (this.campaign.accelLevel >= 6) this.smallTrophies2nd[6] = true
      if (this.campaign.accelLevel >= 10) this.smallTrophies2nd[7] = true
      if (this.rank.gt('1e8')) this.smallTrophies2nd[8] = true
      if (this.rank.gt('1e10')) this.smallTrophies2nd[9] = true
      if (this.rank.gt('1e12')) this.smallTrophies2nd[10] = true
      if (this.light.lightGenerators[0].greaterThanOrEqualTo(1)) this.smallTrophies2nd[11] = true
      if (this.light.lightGenerators[1].greaterThanOrEqualTo(1)) this.smallTrophies2nd[12] = true
      if (this.light.lightGenerators[2].greaterThanOrEqualTo(1)) this.smallTrophies2nd[13] = true
      if (this.light.lightGenerators[3].greaterThanOrEqualTo(1)) this.smallTrophies2nd[14] = true
      if (this.light.lightGenerators[4].greaterThanOrEqualTo(1)) this.smallTrophies2nd[15] = true
      if (this.light.lightGenerators[5].greaterThanOrEqualTo(1)) this.smallTrophies2nd[16] = true
      if (this.light.lightGenerators[6].greaterThanOrEqualTo(1)) this.smallTrophies2nd[17] = true
      if (this.light.lightGenerators[7].greaterThanOrEqualTo(1)) this.smallTrophies2nd[18] = true
      if (this.chips.chip[4] > 0) this.smallTrophies2nd[19] = true
      if (this.chips.chip[4] >= 210) this.smallTrophies2nd[20] = true
      if (this.chips.chip[4] >= 1275) this.smallTrophies2nd[21] = true
      if (this.statues.statue[0] >= 10) this.smallTrophies2nd[22] = true
      if (this.statues.statue[1] >= 10) this.smallTrophies2nd[23] = true
      if (this.statues.statue[2] >= 10) this.smallTrophies2nd[24] = true
      if (this.statues.statue[3] >= 10) this.smallTrophies2nd[25] = true
      if (this.crown.greaterThanOrEqualTo(100)) this.smallTrophies2nd[26] = true
      if (this.crown.greaterThanOrEqualTo(10000)) this.smallTrophies2nd[27] = true
      if (this.crown.greaterThanOrEqualTo("1e8")) this.smallTrophies2nd[28] = true
      if (this.light.lightMoney.greaterThanOrEqualTo(1)) this.smallTrophies2nd[29] = true
      if (this.light.lightMoney.greaterThanOrEqualTo("1e9")) this.smallTrophies2nd[30] = true
      if (this.light.lightMoney.greaterThanOrEqualTo("1e18")) this.smallTrophies2nd[31] = true
      if (this.light.lightMoney.greaterThanOrEqualTo("1e36")) this.smallTrophies2nd[32] = true
      if (this.shines.flicker >= 10) this.smallTrophies2nd[33] = true
      if (this.shines.flicker >= 100) this.smallTrophies2nd[34] = true
      if (this.shines.flicker >= 1000) this.smallTrophies2nd[35] = true
      if (this.shines.flicker >= 10000) this.smallTrophies2nd[36] = true
      if (this.shines.flicker >= 100000) this.smallTrophies2nd[37] = true
      if (this.shines.flicker >= 1000000) this.smallTrophies2nd[38] = true
      if (this.chips.chip[5] > 0) this.smallTrophies2nd[39] = true
      if (this.chips.chip[5] >= 210) this.smallTrophies2nd[40] = true
      if (this.chips.chip[5] >= 1275) this.smallTrophies2nd[41] = true
      if (this.chips.chip[6] > 0) this.smallTrophies2nd[42] = true
      if (this.chips.chip[6] >= 210) this.smallTrophies2nd[43] = true
      if (this.chips.chip[6] >= 1275) this.smallTrophies2nd[44] = true
      if (this.statues.statue[4] >= 10) this.smallTrophies2nd[45] = true
      if (this.statues.statue[5] >= 10) this.smallTrophies2nd[46] = true
      if (this.statues.statue[6] >= 10) this.smallTrophies2nd[47] = true
      if (this.statues.statue[0] >= 64) this.smallTrophies2nd[48] = true
      if (this.statues.statue[1] >= 64) this.smallTrophies2nd[49] = true
      if (this.statues.statue[2] >= 64) this.smallTrophies2nd[50] = true
      if (this.statues.statue[3] >= 64) this.smallTrophies2nd[51] = true
      if (this.statues.statue[4] >= 64) this.smallTrophies2nd[52] = true
      if (this.statues.statue[5] >= 64) this.smallTrophies2nd[53] = true
      if (this.statues.statue[6] >= 64) this.smallTrophies2nd[54] = true
      if (this.shines.shine >= 100000000) this.smallTrophies2nd[55] = true
      if (this.shines.shine >= 1000000000) this.smallTrophies2nd[56] = true
      if (this.shines.brightness >= 100000) this.smallTrophies2nd[57] = true
      if (this.shines.brightness >= 1000000) this.smallTrophies2nd[58] = true
    }
  }
  countTrophies() {
    let cnt = 0;
    for (let i = 0; i < trophynum; i++) {
      if (this.trophies[i]) cnt++;
    }
    return cnt;
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

  checkWorlds() {
    if (this.world !== 0) return;

    this.common.worldOpened[0] = true
    
    if (new Decimal(this.crownResetTime).gt(0)) {
      for (let i = 1; i < 10; i++) {
        this.common.worldOpened[i] = true
      }
    } else {
      if (this.challenge.challengeCleared.includes(238)) this.common.worldOpened[1] = true
      if (this.challenge.challengeCleared.length >= 100) this.common.worldOpened[2] = true
      if (this.challenge.rankChallengeCleared.length >= 16) this.common.worldOpened[3] = true
      if (this.levelShop.levelItemBought >= 12500) this.common.worldOpened[4] = true
      if (this.dark.darkMoney.greaterThanOrEqualTo('1e8')) this.common.worldOpened[5] = true
      if (this.rank.greaterThanOrEqualTo(262142)) this.common.worldOpened[6] = true
      if (this.challenge.rankChallengeCleared.includes(238)) this.common.worldOpened[7] = true
      if (this.challenge.challengeCleared.length >= 200) this.common.worldOpened[8] = true
      if (this.challenge.rankChallengeCleared.length >= 200) this.common.worldOpened[9] = true
    }

    if (this.light.lightMoney.greaterThanOrEqualTo('1e8')) this.common.worldOpened[10] = true
    if (this.statues.statue[2] >= 16) this.common.worldOpened[11] = true
  }


  update() {
    this.challenge.activeBonuses = (!this.challenge.onChallenge || this.challenge.challengeBonuses.includes(4)) ? this.challenge.challengeBonuses : []

    if (this.common.trophyCheck) {
        this.checkTrophies()
        this.countSmallTrophies()
    }
    this.checkWorlds()
    this.calcCommonMult()
    this.generator.findHighestGenerator()
    for (let i = 0; i < 8; i++) {
      this.calcBasicIncrementMult(i)
    }

    this.generator.calcGnCost(this)
    this.accelerator.calcAcCost(this)
    this.dark.calcDgCost(this)
    this.light.calcLgCost()

    this.generator.updateGenerators(this, new Decimal(1))
    this.accelerator.updateAccelerators(this, new Decimal(1))

    this.challenge.calcToken()

    if (this.campaign.updateCampaign()) {
      alert("キャンペーン期間が終了しました。起動時間回帰力が不足しているため、時間回帰力の選択がリセットされます。")
    }

    this.shines.updateShine(this);
    this.shines.updateBright(this);
    this.shines.updateFlicker(this);

    let autorankshine = Math.max(0, 1000 - this.rememberSum * 10)

    if (!this.challenge.onChallenge && this.challenge.rankChallengeBonuses.includes(14) && this.common.autoRank) {
      if (this.shines.shine >= autorankshine && this.money.greaterThanOrEqualTo(this.resetRankBorder())) {
        if (this.calcGainRank().greaterThanOrEqualTo(this.common.autoRankNumber)) {
          this.resetRank(true)
          this.shines.shine -= autorankshine
        }
      }
    }

    if (this.challenge.rankChallengeBonuses.includes(5) && this.common.levelItemAutoBuy) {
      for (let i = 0; i < 5; i++) {
        this.levelShop.buyLevelItems(this, i)
      }
    }

    if (this.rememberSum >= 100) {
      if (!(this.challenge.onChallenge || this.challenge.onPerfectChallenge)) {
        this.level = this.level.add(1)
        this.levelResetTime = this.levelResetTime.add(1)
      }
    }


    if ((this.auto.autoDoChallenge || !this.challenge.onChallenge) && this.challenge.activeBonuses.includes(14) && this.common.autoLevel) {
      if (this.money.greaterThanOrEqualTo(this.resetLevelBorder()) && this.level.lt(this.common.autoLevelStopNumber)) {
        if (this.calcGainLevel().greaterThanOrEqualTo(this.common.autoLevelNumber)) {
          this.resetLevel(true, false)
        }
      }
    }


    if (this.challenge.activeBonuses.includes(5) && this.common.genAutoBuy) {
      for (let i = 7; i >= 0; i--) {
        this.generator.buyGenerator(this, i)
      }
    }

    if (this.challenge.activeBonuses.includes(9) && this.common.accAutoBuy) {
      let ha = this.levelShop.levelItems[3] + 1
      for (let i = ha; i >= 0; i--) {
        this.accelerator.buyAccelerator(this, i)
      }
    }

    this.updateTickSpeed();
  }
  updateTickSpeed() {
    this.tickSpeed = this.calcTickSpeed()

    if (this.challenge.rankChallengeBonuses.includes(9)) {
      this.multByAc = new Decimal(50).div(this.tickSpeed)
      this.tickSpeed = 50
    } else {
      this.multByAc = new Decimal(1)
    }
    this.campaign.updateAccelLevel(this.tickSpeed);
  }
}
