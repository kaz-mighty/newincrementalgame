class Player {
  /**
   * @param {PlayerSaveData} playerData
   */
  constructor(playerData) {
    this.money = new Decimal(playerData.money);
    this.level = new Decimal(playerData.level);
    this.levelResetTime = new Decimal(playerData.levelresettime);
    this.maxLevelGained = new Decimal(playerData.maxlevelgained);
    this.token = playerData.token;
    this.shine = playerData.shine;
    this.brightness = playerData.brightness;
    this.flicker = playerData.flicker;

    this.shineloader = Array.from(playerData.shineloader);
    this.brightloader = Array.from(playerData.brightloader);

    this.residue = playerData.residue;

    this.rank = new Decimal(playerData.rank);
    this.rankResetTime = new Decimal(playerData.rankresettime);

    this.crown = new Decimal(playerData.crown);
    this.crownResetTime = new Decimal(playerData.crownresettime);

    this.rankToken = playerData.ranktoken;

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
    this.accelLevel = playerData.accelevel;
    this.accelLevelUsed = playerData.accelevelused;
    this.activatedCampaigns = Array.from(playerData.activatedcampaigns);
    this.timeCrystal = Array.from(playerData.timecrystal);
    this.saveVersion = playerData.saveversion;

    this.currentTab = "basic";
    this.tweeting = Array.from(playerData.tweeting);

    this.onChallenge = playerData.onchallenge;
    this.challenges = Array.from(playerData.challenges);
    this.challengeCleared = Array.from(playerData.challengecleared);
    this.challengeBonuses = Array.from(playerData.challengebonuses);

    this.challengeWeight = Array.from(playerData.challengeweight);
    this.challengeWeightValue = Array.from(playerData.challengeweightvalue);

    this.onPerfectChallenge = playerData.onpchallenge;
    this.perfectChallenges = Array.from(playerData.pchallenges);
    this.perfectChallengeCleared = Array.from(playerData.pchallengecleared);
    this.perfectRankChallengeCleared = Array.from(playerData.prchallengecleared);

    this.boughtType = Array.from(playerData.boughttype);
    this.setModes = Array.from(playerData.setmodes);
    this.setChallengeBonuses1 = Array.from(playerData.setchallengebonusesfst);
    this.setChallengeBonuses2 = Array.from(playerData.setchallengebonusessnd);
    this.setRankChallengeBonuses1 = Array.from(playerData.setrankchallengebonusesfst);
    this.setRankChallengeBonuses2 = Array.from(playerData.setrankchallengebonusessnd);

    this.rankChallengeCleared = Array.from(playerData.rankchallengecleared);
    this.rankChallengeBonuses = Array.from(playerData.rankchallengebonuses);

    this.trophies = Array.from(playerData.trophies);
    this.smallTrophies1st = Array.from(playerData.smalltrophies);
    this.smallTrophies2nd = Array.from(playerData.smalltrophies2nd);

    this.levelItems = Array.from(playerData.levelitems);
    this.levelItemBought = playerData.levelitembought;

    this.remember = playerData.remember;
    this.rememberSpent = playerData.rememberspent;
    this.rememberForgot = playerData.rememberforgot;

    this.chips = new Chips(playerData);
    this.statues = new Statues(playerData);

    this.spiritLevelA = Array.from(playerData.spiritlevela);
    this.spiritBoughtCurrentCrown = Array.from(playerData.spiritboughtcurrentcrown);

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
      token: this.token,
      shine: this.shine,
      brightness: this.brightness,
      flicker: this.flicker,

      shineloader: this.shineloader,
      brightloader: this.brightloader,

      residue: this.residue,

      rank: this.rank,
      rankresettime: this.rankResetTime,

      crown: this.crown,
      crownresettime: this.crownResetTime,

      ranktoken: this.rankToken,

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
      accelevel: this.accelLevel,
      accelevelused: this.accelLevelUsed,
      activatedcampaigns: this.activatedCampaigns,
      timecrystal: this.timeCrystal,
      saveversion: this.saveVersion,

      currenttab: this.currentTab,
      tweeting: this.tweeting,

      onchallenge: this.onChallenge,
      challenges: this.challenges,
      challengecleared: this.challengeCleared,
      challengebonuses: this.challengeBonuses,

      challengeweight: this.challengeWeight,
      challengeweightvalue: this.challengeWeightValue,

      onpchallenge: this.onPerfectChallenge,
      pchallenges: this.perfectChallenges,
      pchallengecleared: this.perfectChallengeCleared,
      prchallengecleared: this.perfectRankChallengeCleared,

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
      rememberspent: this.rememberSpent,
      rememberforgot: this.rememberForgot,

      chip: chips.chip,
      setchip: chips.setchip,
      disabledchip: chips.disabledchip,
      spendchip: chips.spendchip,

      statue: statues.statue,
      polishedstatue: statues.polishedstatue,
      polishedstatuebr: statues.polishedstatuebr,

      spiritlevela: this.spiritLevelA,
      spiritboughtcurrentcrown: this.spiritBoughtCurrentCrown,

      setchiptypefst: chips.setchiptypefst,

      worldpipe: this.worldPipe,
      rings: this.rings.toSaveObject(this),
    };
  }

  /* リファクタ中の一時的措置 */
  get chip() {
    return this.chips.chip;
  }
  get setChip() {
    return this.chips.setChip;
  }
}
