class Player {
  constructor(playerData) {
    this.money = new Decimal(playerData.money);
    this.level = new Decimal(playerData.level);
    this.levelresettime = new Decimal(playerData.levelresettime);
    this.maxlevelgained = new Decimal(playerData.maxlevelgained);
    this.token = playerData.token;
    this.shine = playerData.shine;
    this.brightness = playerData.brightness;
    this.flicker = playerData.flicker;

    this.shineloader = Array.from(playerData.shineloader);
    this.brightloader = Array.from(playerData.brightloader);

    this.residue = playerData.residue;

    this.rank = new Decimal(playerData.rank);
    this.rankresettime = new Decimal(playerData.rankresettime);

    this.crown = new Decimal(playerData.crown);
    this.crownresettime = new Decimal(playerData.crownresettime);

    this.ranktoken = playerData.ranktoken;

    this.generators = playerData.generators.map(v => new Decimal(v));
    this.generatorsBought = playerData.generatorsBought.map(v => new Decimal(v));
    this.generatorsCost = playerData.generatorsCost.map(v => new Decimal(v));
    this.generatorsMode = Array.from(playerData.generatorsMode);

    this.accelerators = playerData.accelerators.map(v => new Decimal(v));
    this.acceleratorsBought = playerData.acceleratorsBought.map(v => new Decimal(v));
    this.acceleratorsCost = playerData.acceleratorsCost.map(v => new Decimal(v));

    this.darkmoney = new Decimal(playerData.darkmoney);

    this.darkgenerators = playerData.darkgenerators.map(v => new Decimal(v));
    this.darkgeneratorsBought = playerData.darkgeneratorsBought.map(v => new Decimal(v));
    this.darkgeneratorsCost = playerData.darkgeneratorsCost.map(v => new Decimal(v));

    this.darklevel = new Decimal(playerData.darklevel);

    this.lightmoney = new Decimal(playerData.lightmoney);

    this.lightgenerators = playerData.lightgenerators.map(v => new Decimal(v));
    this.lightgeneratorsBought = playerData.lightgeneratorsBought.map(v => new Decimal(v));
    this.lightgeneratorsCost = playerData.lightgeneratorsCost.map(v => new Decimal(v));

    this.tickspeed = playerData.tickspeed;
    this.accelevel = playerData.accelevel;
    this.accelevelused = playerData.accelevelused;
    this.activatedcampaigns = Array.from(playerData.activatedcampaigns);
    this.timecrystal = Array.from(playerData.timecrystal);
    this.saveversion = playerData.saveversion;

    this.currenttab = "basic";
    this.tweeting = Array.from(playerData.tweeting);

    this.onchallenge = playerData.onchallenge;
    this.challenges = Array.from(playerData.challenges);
    this.challengecleared = Array.from(playerData.challengecleared);
    this.challengebonuses = Array.from(playerData.challengebonuses);

    this.challengeweight = Array.from(playerData.challengeweight);
    this.challengeweightvalue = Array.from(playerData.challengeweightvalue);

    this.onpchallenge = playerData.onpchallenge;
    this.pchallenges = Array.from(playerData.pchallenges);
    this.pchallengecleared = Array.from(playerData.pchallengecleared);
    this.prchallengecleared = Array.from(playerData.prchallengecleared);

    this.boughttype = Array.from(playerData.boughttype);
    this.setmodes = Array.from(playerData.setmodes);
    this.setchallengebonusesfst = Array.from(playerData.setchallengebonusesfst);
    this.setchallengebonusessnd = Array.from(playerData.setchallengebonusessnd);
    this.setrankchallengebonusesfst = Array.from(playerData.setrankchallengebonusesfst);
    this.setrankchallengebonusessnd = Array.from(playerData.setrankchallengebonusessnd);

    this.rankchallengecleared = Array.from(playerData.rankchallengecleared);
    this.rankchallengebonuses = Array.from(playerData.rankchallengebonuses);

    this.trophies = Array.from(playerData.trophies);
    this.smalltrophies = Array.from(playerData.smalltrophies);
    this.smalltrophies2nd = Array.from(playerData.smalltrophies2nd);

    this.levelitems = Array.from(playerData.levelitems);
    this.levelitembought = playerData.levelitembought;

    this.remember = playerData.remember;
    this.rememberspent = playerData.rememberspent;
    this.rememberforgot = playerData.rememberforgot;

    this.chip = Array.from(playerData.chip);
    this.setchip = Array.from(playerData.setchip);
    this.disabledchip = Array.from(playerData.disabledchip);
    this.spendchip = Array.from(playerData.spendchip);

    this.statues = new Statues(playerData);

    this.spiritlevela = Array.from(playerData.spiritlevela);
    this.spiritboughtcurrentcrown = Array.from(playerData.spiritboughtcurrentcrown);



    this.setchiptypefst = Array.from(playerData.setchiptypefst);

    this.worldpipe = Array.from(playerData.worldpipe);
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

  toSaveObject() {
    const statues = this.statues.toSaveObject();
    return {
      money: this.money,
      level: this.level,
      levelresettime: this.levelresettime,
      maxlevelgained: this.maxlevelgained,
      token: this.token,
      shine: this.shine,
      brightness: this.brightness,
      flicker: this.flicker,

      shineloader: this.shineloader,
      brightloader: this.brightloader,

      residue: this.residue,

      rank: this.rank,
      rankresettime: this.rankresettime,

      crown: this.crown,
      crownresettime: this.crownresettime,

      ranktoken: this.ranktoken,

      generators: this.generators,
      generatorsBought: this.generatorsBought,
      generatorsCost: this.generatorsCost,
      generatorsMode: this.generatorsMode,

      accelerators: this.accelerators,
      acceleratorsBought: this.acceleratorsBought,
      acceleratorsCost: this.acceleratorsCost,

      darkmoney: this.darkmoney,

      darkgenerators: this.darkgenerators,
      darkgeneratorsBought: this.darkgeneratorsBought,
      darkgeneratorsCost: this.darkgeneratorsCost,

      darklevel: this.darklevel,

      lightmoney: this.lightmoney,

      lightgenerators: this.lightgenerators,
      lightgeneratorsBought: this.lightgeneratorsBought,
      lightgeneratorsCost: this.lightgeneratorsCost,

      tickspeed: this.tickspeed,
      accelevel: this.accelevel,
      accelevelused: this.accelevelused,
      activatedcampaigns: this.activatedcampaigns,
      timecrystal: this.timecrystal,
      saveversion: this.saveversion,

      currenttab: this.currenttab,
      tweeting: this.tweeting,

      onchallenge: this.onchallenge,
      challenges: this.challenges,
      challengecleared: this.challengecleared,
      challengebonuses: this.challengebonuses,

      challengeweight: this.challengeweight,
      challengeweightvalue: this.challengeweightvalue,

      onpchallenge: this.onpchallenge,
      pchallenges: this.pchallenges,
      pchallengecleared: this.pchallengecleared,
      prchallengecleared: this.prchallengecleared,

      boughttype: this.boughttype,
      setmodes: this.setmodes,
      setchallengebonusesfst: this.setchallengebonusesfst,
      setchallengebonusessnd: this.setchallengebonusessnd,
      setrankchallengebonusesfst: this.setrankchallengebonusesfst,
      setrankchallengebonusessnd: this.setrankchallengebonusessnd,

      rankchallengecleared: this.rankchallengecleared,
      rankchallengebonuses: this.rankchallengebonuses,

      trophies: this.trophies,
      smalltrophies: this.smalltrophies,
      smalltrophies2nd: this.smalltrophies2nd,

      levelitems: this.levelitems,
      levelitembought: this.levelitembought,

      remember: this.remember,
      rememberspent: this.rememberspent,
      rememberforgot: this.rememberforgot,

      chip: this.chip,
      setchip: this.setchip,
      disabledchip: this.disabledchip,
      spendchip: this.spendchip,

      statue: statues.statue,
      polishedstatue: statues.polishedstatue,
      polishedstatuebr: statues.polishedstatuebr,

      spiritlevela: this.spiritlevela,
      spiritboughtcurrentcrown: this.spiritboughtcurrentcrown,



      setchiptypefst: this.setchiptypefst,

      worldpipe: this.worldpipe,
      rings: this.rings.toSaveObject(this),
    };
  }

}
