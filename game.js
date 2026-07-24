Vue.createApp({
  data() {
    return {
      whole: this,
      player: initialData(),

      players: new Array(worldnum).fill(null).map(() => initialData()),

      highest: 0,
      commonmult: new Decimal(0),
      incrementalmults: new Array(8).fill(null).map(() => new Decimal(1)),
      showmult: true,
      trophycheck: true,

      challengedata: new Challengedata(),
      timedata: new Timedata(),
      rankdata: new Rankdata(),
      levelshopdata: new Levelshopdata(),
      shinedata: new Shinedata(),
      trophydata: new Trophydata(),
      rememberdata: new Rememberdata(),
      chipdata: new Chipdata(),
      ringdata: new Ringdata(),
      spiritdata: new Spiritdata(),
      generatordata: new Generatordata(),
      acceleratordata: new Acceleratordata(),
      darkdata: new Darkdata(),
      lightdata: new Lightdata(),
      leveldata: new Leveldata(),
      crowndata: new Crowndata(),
      worlddata: new Worlddata(),

      statuedata: new Statuedata(),
      storagedata: new Storagedata(),
      utilsdata: new Utilsdata(),
      socialdata: new Socialdata(),
      automationdata: new Automationdata(),
      exported: "",
      activechallengebonuses: [],
      genautobuy: false,
      accautobuy: false,
      autolevel: false,
      autolevelnumber: new Decimal(2),
      autoranknumber: new Decimal(4),
      autolevelstopnumber: new Decimal("1e100"),
      litemautobuy: false,
      autorank: false,

      chipthresholduse: false,
      chipthreshold: new Decimal("1e999"),

      automissiontimerid: 0,
      autoshinetimerid: 0,
      autobrighttimerid: 0,
      autochallengetimerid: 0,

      multbyac: new Decimal(1),

      shinepersent: 0,
      brightpersent: 0,
      flickerpersent: 0,

      memorysum: 0,
      remembersum: 0,

      trophynumber: new Array(10).fill(null).map(() => false),
      smalltrophy: 0,
      eachpipedsmalltrophy: new Array(worldnum).fill(null).map(() => 0),
      pipedsmalltrophy: 0,
      worldopened: new Array(worldnum).fill(null).map(() => false),

      chipused: new Array(setchipkind).fill(null).map(() => 0),

      pchallengestage: 0,

      world: 0,

      time: 0,
      diff: 0,
    };
  },
  computed: {
    tweetLink() {
      return this.socialdata.getTweetLink(this);
    },
  },
  methods: {
    exportsave() {
      this.storagedata.exportsave(this);
    },
    exportsavefile() {
      this.storagedata.exportsavefile(this);
    },
    importsave() {
      this.storagedata.importsave(this);
    },
    save() {
      this.storagedata.save(this);
    },
    dataload() {
      this.storagedata.dataload(this);
    },
    load(world) {
      this.storagedata.load(this, world);
    },
    configshowmult() {
      this.showmult = !this.showmult;
    },
    softCap(num, cap) {
      return this.utilsdata.softCap(num, cap);
    },
    strongsoftcap(num, cap) {
      return this.utilsdata.strongsoftcap(num, cap);
    },
    calcgncost() {
      this.generatordata.calcgncost(this);
    },
    calcaccost() {
      this.acceleratordata.calcaccost(this);
    },
    calcdgcost() {
      this.darkdata.calcdgcost(this);
    },
    calclgcost() {
      this.lightdata.calclgcost(this);
    },
    calccommonmult() {
      this.generatordata.calccommonmult(this);
    },
    calcincrementmult(i, to) {
      return this.generatordata.calcincrementmult(this, i, to);
    },
    calcbasicincrementmult(i) {
      this.generatordata.calcbasicincrementmult(this, i);
    },
    updategenerators(mu) {
      this.generatordata.updategenerators(this, mu);
    },
    updateaccelerators(mu) {
      this.acceleratordata.updateaccelerators(this, mu);
    },
    updatedarkgenerators(mu) {
      this.darkdata.updatedarkgenerators(this, mu);
    },
    updatelightgenerators(mu) {
      this.lightdata.updatelightgenerators(this, mu);
    },
    spendshine(num) {
      this.shinedata.spendshine(this, num);
    },
    spendbrightness(num) {
      this.shinedata.spendbrightness(this, num);
    },
    spendflicker(num) {
      this.shinedata.spendflicker(this, num);
    },
    buytype(num) {
      this.shinedata.buytype(this, num);
    },
    calctoken() {
      this.challengedata.calctoken(this);
    },
    countpchallengecleared() {
      this.challengedata.countpchallengecleared(this);
    },
    findhighestgenerator() {
      this.generatordata.findhighestgenerator(this);
    },
    update() {
      let diffm = this.diff;
      this.diff = Date.now() - this.time - this.player.tickspeed;

      this.time = Date.now();
      this.activechallengebonuses =
        this.player.challengebonuses.includes(4) || !this.player.onchallenge
          ? this.player.challengebonuses
          : [];

      if (this.trophycheck) this.checktrophies();
      this.checkmemories();
      this.checkworlds();
      this.countsmalltrophies();
      this.calccommonmult();
      this.findhighestgenerator();
      for (let i = 0; i < 8; i++) {
        this.calcbasicincrementmult(i);
      }

      this.calcgncost();
      this.calcaccost();
      this.calcdgcost();
      this.calclgcost();

      this.updategenerators(new Decimal(1));
      this.updateaccelerators(new Decimal(1));

      this.calctoken();

      this.activateintimecampaign();
      if (this.calccampaigncosts() > this.player.accelevelused) {
        alert(
          "キャンペーン期間が終了しました。起動時間回帰力が不足しているため、時間回帰力の選択がリセットされます。",
        );
        this.player.activatedcampaigns = [];
      }

      this.shinedata.calcshinepersent(this);

      let rememberlevel = Math.floor((this.checkremembers() + 16) / 16);

      let shineget = this.shinedata.calcshineget(this);
      let maxshine = this.shinedata.calcmaxshine(this);

      if (this.player.shine < maxshine) {
        this.player.shine = Math.min(this.player.shine + shineget, maxshine);
      }

      this.shinedata.calcbrightpersent(this);

      let brightget = this.shinedata.calcbrightget(this);
      let maxbright = this.shinedata.calcmaxbright(this);

      if (this.player.brightness < maxbright) {
        this.player.brightness = Math.min(
          this.player.brightness + brightget,
          maxbright,
        );
      }

      this.flickerpersent = this.shinedata.getfp(this.pchallengestage);

      let flickerget = this.shinedata.calcflickerget(this);

      let maxflicker = this.shinedata.getmaxfl(this.pchallengestage);
      if (this.player.flicker < maxflicker) {
        this.player.flicker = Math.min(
          this.player.flicker + flickerget,
          maxflicker,
        );
      }

      let autorankshine = Math.max(0, 1000 - this.checkremembers() * 10);

      if (
        !this.player.onchallenge &&
        this.player.rankchallengebonuses.includes(14) &&
        this.autorank
      ) {
        if (
          this.player.shine >= autorankshine &&
          this.player.money.greaterThanOrEqualTo(
            this.rankdata.resetRankborder(this),
          )
        ) {
          if (
            this.rankdata
              .calcgainrank(this)
              .greaterThanOrEqualTo(this.autoranknumber)
          ) {
            this.resetRank(true);
            this.player.shine -= autorankshine;
          }
        }
      }

      if (this.player.rankchallengebonuses.includes(5) && this.litemautobuy) {
        for (let i = 0; i < 5; i++) {
          this.buylevelitems(i);
        }
      }

      if (this.remembersum >= 100) {
        if (!(this.player.onchallenge || this.player.onpchallenge)) {
          this.player.level = this.player.level.add(1);
          this.player.levelresettime = this.player.levelresettime.add(1);
        }
      }

      if (
        (this.player.rings.outsideauto.autodochallenge ||
          !this.player.onchallenge) &&
        this.activechallengebonuses.includes(14) &&
        this.autolevel
      ) {
        if (
          this.player.money.greaterThanOrEqualTo(this.resetLevelborder()) &&
          this.player.level.lt(this.autolevelstopnumber)
        ) {
          if (this.calcgainlevel().greaterThanOrEqualTo(this.autolevelnumber)) {
            this.resetLevel(true, false);
          }
        }
      }

      if (this.activechallengebonuses.includes(5) && this.genautobuy) {
        for (let i = 7; i >= 0; i--) {
          this.buyGenerator(i);
        }
      }

      if (this.activechallengebonuses.includes(9) && this.accautobuy) {
        let ha = this.player.levelitems[3] + 1;
        for (let i = ha; i >= 0; i--) {
          this.buyAccelerator(i);
        }
      }

      this.player.tickspeed = this.timedata.calctickspeed(this);

      if (this.player.rankchallengebonuses.includes(9)) {
        this.multbyac = new Decimal(50).div(this.player.tickspeed);
        this.player.tickspeed = 50;
      } else {
        this.multbyac = new Decimal(1);
      }
      if (
        this.player.accelevelused == this.player.accelevel &&
        this.player.tickspeed <= 10
      )
        this.player.accelevel = this.player.accelevel + 1;

      setTimeout(
        this.update,
        Math.max(this.player.tickspeed - (this.diff + diffm) / 2, 1),
      );
    },
    changeTab(tabname) {
      this.player.currenttab = tabname;
    },
    configtweet(content) {
      this.socialdata.configtweet(this, content);
    },
    configchallenge(index) {
      this.challengedata.configchallenge(this, index);
    },
    configpchallenge(index) {
      this.challengedata.configpchallenge(this, index);
    },
    buyGenerator(index) {
      this.generatordata.buyGenerator(this, index);
    },
    buyAccelerator(index) {
      this.acceleratordata.buyAccelerator(this, index);
    },
    buydarkgenerator(index) {
      this.darkdata.buydarkgenerator(this, index);
    },
    buylightgenerator(index) {
      this.lightdata.buylightgenerator(this, index);
    },
    configautobuyer(index) {
      this.automationdata.configautobuyer(this, index);
    },
    toggleautobuyer(index) {
      this.automationdata.toggleautobuyer(this, index);
    },
    togglechipthresholduse() {
      this.chipdata.togglechipthresholduse(this);
    },
    configchipthresholdnumber() {
      this.chipdata.configchipthresholdnumber(this);
    },
    autoshine() {
      this.shinedata.autoshine(this);
    },
    autobright() {
      this.shinedata.autobright(this);
    },
    autochallenge() {
      this.shinedata.autochallenge(this);
    },
    toggleringautobuyer(index) {
      this.ringdata.toggleringautobuyer(this, index);
    },
    configringautobuyer(index) {
      this.ringdata.configringautobuyer(this, index);
    },
    setbonusetype(index) {
      this.challengedata.setbonusetype(this, index);
    },
    setrankbonusetype(index) {
      this.challengedata.setrankbonusetype(this, index);
    },
    changebonusetype(index) {
      this.challengedata.changebonusetype(this, index);
    },
    changerankbonusetype(index) {
      this.challengedata.changerankbonusetype(this, index);
    },
    buyRewards(index) {
      this.challengedata.buyRewards(this, index);
    },
    buyrankRewards(index) {
      this.challengedata.buyrankRewards(this, index);
    },
    calclevelitemcost(index) {
      return this.levelshopdata.calclevelitemcost(this, index);
    },
    buylevelitems(index) {
      this.levelshopdata.buylevelitems(this, index);
    },
    setmodetype() {
      this.generatordata.setmodetype(this);
    },
    changemodetype() {
      this.generatordata.changemodetype(this);
    },
    clearsetchip() {
      this.chipdata.clearsetchip(this);
    },
    setchiptype() {
      this.chipdata.setchiptype(this);
    },
    changechiptype() {
      this.chipdata.changechiptype(this);
    },
    changeMode(index) {
      this.generatordata.changeMode(this, index);
    },
    resetData(force) {
      this.storagedata.resetData(this, force);
    },
    calcgainlevel() {
      return this.leveldata.calcgainlevel(this);
    },
    configspendchip(i) {
      this.chipdata.configspendchip(this, i);
    },
    resetDarklevel() {
      this.darkdata.resetDarklevel(this);
    },
    resetLevel(force, exit) {
      this.leveldata.resetLevel(this, force, exit);
    },
    resetLevelborder() {
      return this.leveldata.resetLevelborder(this);
    },
    resetRank(force) {
      this.rankdata.resetRank(this, force);
    },
    calcgaincrown() {
      return this.crowndata.calcgaincrown(this);
    },
    resetCrownborder() {
      return this.crowndata.resetCrownborder(this);
    },
    resetCrown(force) {
      this.crowndata.resetCrown(this, force);
    },
    calcchallengeid() {
      return this.challengedata.calcchallengeid(this);
    },
    getchallengeid(arr) {
      return this.challengedata.getchallengeid(arr);
    },
    getpchallengeid(arr) {
      return this.challengedata.getpchallengeid(arr);
    },
    configchallengeweightkind(i) {
      this.challengedata.configchallengeweightkind(this, i);
    },
    configchallengeweightvalue(i) {
      this.challengedata.configchallengeweightvalue(this, i);
    },
    showunclearedchallenges() {
      this.challengedata.showunclearedchallenges(this);
    },
    showunclearedrankchallenges() {
      this.challengedata.showunclearedrankchallenges(this);
    },
    calcchallengesarray(challengeid) {
      return this.challengedata.calcchallengesarray(challengeid);
    },
    startChallenge() {
      this.challengedata.startChallenge(this);
    },
    startpChallenge() {
      this.challengedata.startpChallenge(this);
    },
    exitChallenge() {
      this.challengedata.exitChallenge(this);
    },
    exitpChallenge() {
      this.challengedata.exitpChallenge(this);
    },
    gettrophyname(i) {
      return this.trophydata.gettrophyname(this, i);
    },
    moveworld(i) {
      this.worlddata.moveworld(this, i);
    },
    shrinkworld(i) {
      this.worlddata.shrinkworld(this, i);
    },
    calcmaxpipe() {
      return this.worlddata.calcmaxpipe(this);
    },
    openpipe(i) {
      this.worlddata.openpipe(this, i);
    },
    confchecktrophies() {
      this.trophydata.confchecktrophies(this);
    },
    checktrophies() {
      this.trophydata.checktrophies(this);
    },
    chipset(i, j) {
      this.chipdata.chipset(this, i, j);
    },
    checkusedchips() {
      this.chipdata.checkusedchips(this);
    },
    calcstatuecost(i) {
      return this.statuedata.calcstatuecost(this, i);
    },
    buildstatue(i) {
      this.statuedata.buildstatue(this, i);
    },
    calcpolishcost(i) {
      return this.statuedata.calcpolishcost(this, i);
    },
    polishstatue(i) {
      this.statuedata.polishstatue(this, i);
    },
    calcpolishcostbr(i) {
      return this.statuedata.calcpolishcostbr(this, i);
    },
    polishstatuebr(i) {
      this.statuedata.polishstatuebr(this, i);
    },
    buyspirit(i) {
      return;
      this.player.spiritlevela[i] += 1;
    },
    isavailablering(i) {
      return this.ringdata.isavailablering(this, i);
    },
    configsetrings(i) {
      this.ringdata.configsetrings(this, i);
    },
    sleep(ms) {
      this.utilsdata.sleep(ms);
    },
    configautomission() {
      this.ringdata.configautomission(this);
    },
    autoplaymission() {
      this.ringdata.autoplaymission(this);
    },
    isavailablemission(i) {
      return this.ringdata.isavailablemission(this, i);
    },
    startmission(i) {
      this.ringdata.startmission(this, i);
    },
    useskill(i) {
      this.ringdata.useskill(this, i);
    },
    endmission() {
      this.ringdata.endmission(this);
    },
    ringpointsum() {
      return this.ringdata.ringpointsum(this);
    },
    worktime(val) {
      this.timedata.worktime(this, val);
    },
    calccampaigncosts() {
      return this.timedata.calccampaigncosts(this);
    },
    choosecampaigns(name) {
      this.timedata.choosecampaigns(this, name);
    },
    activateintimecampaign() {
      this.timedata.activateintimecampaign(this);
    },
    counttrophies(index) {
      this.trophydata.counttrophies(this, index);
    },
    checkpipedsmalltrophies() {
      this.trophydata.checkpipedsmalltrophies(this);
    },
    countsmalltrophies(index) {
      this.trophydata.countsmalltrophies(this, index);
    },
    checkmemories() {
      this.rememberdata.checkmemories(this);
    },
    checkremembers() {
      return this.rememberdata.checkremembers(this);
    },
    checkworlds() {
      this.worlddata.checkworlds(this);
    },
    toFormated(dec, exp) {
      return this.utilsdata.toFormated(dec, exp);
    },
  },
  mounted() {
    this.dataload();
    this.load(0);
    this.checkmemories();
    this.checkworlds();
    this.checkusedchips();
    this.time = Date.now();
    setTimeout(this.update, this.player.tickspeed);
    setInterval(this.save, 2000);
  },
}).mount("#app");
