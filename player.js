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
   * @param {PlayerSaveData} playerData
   */
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

    this.generators = playerData.generators.map(v => new Decimal(v));
    this.generatorsBought = playerData.generatorsBought.map(v => new Decimal(v));
    this.generatorsCost = playerData.generatorsCost.map(v => new Decimal(v));
    this.generatorsMode = Array.from(playerData.generatorsMode);

    this.accelerators = playerData.accelerators.map(v => new Decimal(v));
    this.acceleratorsBought = playerData.acceleratorsBought.map(v => new Decimal(v));
    this.acceleratorsCost = playerData.acceleratorsCost.map(v => new Decimal(v));

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
    this.timeCrystal = Array.from(playerData.timecrystal);
    this.saveVersion = playerData.saveversion;

    this.campaign = Campaign.new(playerData);

    this.currentTab = "basic";
    this.tweeting = Array.from(playerData.tweeting);

    this.challenge = new Challenge(playerData);

    this.boughtType = Array.from(playerData.boughttype);
    this.setModes = Array.from(playerData.setmodes);
    this.setChallengeBonuses1 = Array.from(playerData.setchallengebonusesfst);
    this.setChallengeBonuses2 = Array.from(playerData.setchallengebonusessnd);
    this.setRankChallengeBonuses1 = Array.from(playerData.setrankchallengebonusesfst);
    this.setRankChallengeBonuses2 = Array.from(playerData.setrankchallengebonusessnd);

    this.trophies = Array.from(playerData.trophies);
    this.smallTrophies1st = Array.from(playerData.smalltrophies);
    this.smallTrophies2nd = Array.from(playerData.smalltrophies2nd);

    this.levelItems = Array.from(playerData.levelitems);
    this.levelItemBought = playerData.levelitembought;

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

    this.unUsed = {
      shineLoader: Array.from(playerData.shineloader),
      brightLoader: Array.from(playerData.brightloader),
      rememberSpent: playerData.rememberspent,
      rememberForgot: playerData.rememberforgot,
      spiritBoughtCurrentCrown: Array.from(playerData.spiritboughtcurrentcrown),
    };
  }

  /**
   * @returns {PlayerSaveData}
   */
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

      generators: this.generators,
      generatorsBought: this.generatorsBought,
      generatorsCost: this.generatorsCost,
      generatorsMode: this.generatorsMode,

      accelerators: this.accelerators,
      acceleratorsBought: this.acceleratorsBought,
      acceleratorsCost: this.acceleratorsCost,

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
      timecrystal: this.timeCrystal,
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
      setmodes: this.setModes,
      setchallengebonusesfst: this.setChallengeBonuses1,
      setchallengebonusessnd: this.setChallengeBonuses2,
      setrankchallengebonusesfst: this.setRankChallengeBonuses1,
      setrankchallengebonusessnd: this.setRankChallengeBonuses2,

      rankchallengecleared: this.rankChallengeCleared,
      rankchallengebonuses: this.rankChallengeBonuses,

      trophies: this.trophies,
      smalltrophies: this.smallTrophies1st,
      smalltrophies2nd: this.smallTrophies2nd,

      levelitems: this.levelItems,
      levelitembought: this.levelItemBought,

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
}
