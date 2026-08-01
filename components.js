/* Vue.jsのコンポーネントを記述する。

  アップデートで利用者のいる拡張スクリプトが派手に壊れるとまずいため、
  イベントハンドリングは必ずコンポーネントメソッドを経由して呼び出す方針にしている。
 */

/**
 * @param {Decimal} dec 
 * @param {number} exp 
 */
function toFormated(dec, exp) {
  if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber();
  else return dec.toExponential(3);
}


const BasicTab = Vue.defineComponent({
  template: "#basic-tab",
  data: () => ({
    player: currentPlayer,
    showMult: true,
  }),
  computed: {
    visibleAccelerators() {
      return new Array(8).fill(null).map((_, i) => this.player.accelerator.isOpened(this.player, i));
    },
  },
  methods: {
    resetLevel(force, exit) {
      this.player.resetLevel(force, exit);
    },
    resetRank(force) {
      this.player.resetRank(force);
    },
    resetCrown(force) {
      this.player.resetCrown(force);
    },
    configShowMult() {
      this.showMult = !this.showMult;
    },
    buyGenerator(i) {
      this.player.generator.buyGenerator(this.player, i);
    },
    changeMode(i) {
      this.player.generator.changeMode(this.player, i);
    },
    buyAccelerator(i) {
      this.player.accelerator.buyAccelerator(this.player, i);
    },
    setModeType() {
      this.player.generator.setModeType();
    },
    changeModeType() {
      this.player.generator.changeModeType(this.player);
    },
  },
});

const DarkTab = Vue.defineComponent({
  template: "#dark-tab",
  data: () => ({
    player: currentPlayer,
    brightnessSpendUnits: [1, 10, 100, 1_000],
  }),
  computed: {
    visibleSpendBrightness() {
      return [
        this.player.challenge.rankChallengeCleared.length >= 32,
        this.player.challenge.rankChallengeCleared.length >= 64,
        this.player.challenge.rankChallengeCleared.length >= 128,
        this.player.challenge.rankChallengeCleared.length >= 255,
      ];
    },
  },
  methods: {
    resetDarkLevel() {
      this.player.dark.resetDarklevel(this.player);
    },
    buyDarkGenerator(i) {
      this.player.dark.buyDarkGenerator(this.player, i);
    },
    spendBrightness(num) {
      this.player.spendBrightness(num);
    },
  },
});

const LightTab = Vue.defineComponent({
  template: "#light-tab",
  data: () => ({player: currentPlayer}),
  methods: {
    buyLightGenerator(i) {
      this.player.light.buyLightGenerator(this.player, i);
    },
  },
});

const TimeTab = Vue.defineComponent({
  template: "#time-tab",
  data: () => ({player: currentPlayer}),
  methods: {
    addAccelLevelUsed(value) {
      this.player.campaign.addAccelLevelUsed(value);
    },
    chooseCampaigns(campaignId) {
      this.player.campaign.chooseCampaigns(campaignId);
    },
  },
});

const OptionTab = Vue.defineComponent({
  template: "#option-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {
    tweets() {
      return [
        {id: "money", name: "ポイント", isShow: true},
        {id: "darkmoney", name: "裏ポイント", isShow: this.player.dark.darkMoney.gt(0)},
        {id: "lightmoney", name: "天上ポイント", isShow: this.player.light.lightMoney.gt(0)},
        {id: "level", name: "段位", isShow: this.player.levelResetTime.gt(0) || this.player.rankResetTime.gt(0)},
        {id: "darklevel", name: "裏段位", isShow: this.player.dark.darkLevel.gt(0)},
        {id: "achieved", name: "挑戦達成", isShow: this.player.levelResetTime.gt(0) || this.player.rankResetTime.gt(0)},
        {id: "rankachieved", name: "上位挑戦達成", isShow: this.player.challenge.rankChallengeCleared.length >= 1},
        {id: "pachieved", name: "完全挑戦段階", isShow: this.player.challenge.perfectChallengeStage >= 1},
        {id: "rank", name: "階位", isShow: this.player.rankResetTime.gt(0)},
        {id: "levelitemboughttime", name: "段位効力購入", isShow: this.player.rankResetTime.gt(0)},
        {id: "world", name: "世界", isShow: this.nig.common.worldOpened[1] || this.nig.common.worldOpened[2]},
        {id: "memory", name: "記憶", isShow: this.nig.common.worldOpened[1] || this.nig.common.worldOpened[2]},
        {id: "remember", name: "思い出", isShow: this.player.rememberSum > 0},
        {id: "crown", name: "冠位", isShow: this.player.crownResetTime.gt(0)},
        {id: "statue", name: "像", isShow: this.player.statue.statue[0] > 0},
        {id: "polishedstatue", name: "輝像", isShow: this.player.statue.polishedStatue[0] > 0},
        {id: "polishedstatuebr", name: "煌像", isShow: this.player.statue.brightStatue[0] > 0},
        {id: "polishedstatuefl", name: "瞬像", isShow: this.player.statue.flickerStatue[0] > 0},
      ];
    },
  },
  methods: {
    resetData(force) {
      this.nig.resetData(force);
    },
    configTweet(content) {
      this.player.configTweet(content);
    },
    exportSave() {
      // セーブボタンが無いため吐き出し時にセーブもする
      this.nig.dataSave();
      this.nig.common.exported = localStorage.getItem("playerStoredb");
    },
    exportSaveFile() {
      this.nig.save();
      let result = btoa(JSON.stringify(Vue.toRaw(this.nig.playersSave)));
      const file = new Blob([result], {type: 'text/plain'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = `newincremantal_savedata${new Date()}.txt`;
      a.click();
    },
    importSave() {
      let input = window.prompt("データを入力", "");
      if (input.length <= 50) {
        return;
      }
      let k = atob(input).charAt(0);
      if (k == '{') return;
      localStorage.setItem("playerStoredb", input);
      this.nig.dataLoad();
    },
  },
});

const LevelTab = Vue.defineComponent({
  template: "#level-tab",
  data: () => ({player: currentPlayer}),
  computed: {
    weightKinds() {
      return new Array(20).fill(null).map((_, i) => Challenge.calcChallengesArray(this.player.challenge.challengeWeight[i]).map(e => e + 1));
    },
  },
  methods: {
    configChallenge(i) {
      this.player.challenge.configChallenge(i);
    },
    showUnclearedChallenges() {
      this.player.challenge.showUnclearedChallenges();
    },
    showUnclearedRankChallenges() {
      this.player.challenge.showUnclearedRankChallenges();
    },
    startChallenge() {
      this.player.challenge.startChallenge(this.player);
    },
    exitChallenge() {
      this.player.challenge.exitChallenge(this.player);
    },
    buyRewards(i) {
      this.player.challenge.buyRewards(i);
    },
    buyRankRewards(i) {
      this.player.challenge.buyRankRewards(i);
    },
    setBonuseType(i) {
      this.player.challenge.setBonuseType(i);
    },
    changeBonuseType(i) {
      this.player.challenge.changeBonuseType(i);
    },
    setRankBonuseType(i) {
      this.player.challenge.setRankBonuseType(i);
    },
    changeRankBonuseType(i) {
      this.player.challenge.changeRankBonuseType(i);
    },
    configChallengeWeightKind(i) {
      this.player.challenge.configChallengeWeightKind(i);
    },
    configChallengeWeightValue(i) {
      this.player.challenge.configChallengeWeightValue(i);
    },
  },
});

const RankTab = Vue.defineComponent({
  template: "#rank-tab",
  data: () => ({player: currentPlayer}),
  methods: {
    buyLevelItems(i) {
      this.player.levelShop.buyLevelItems(this.player, i);
    }
  },
});

const CrownTab = Vue.defineComponent({
  template: "#crown-tab",
  data: () => ({player: currentPlayer}),
  computed: {
    pChallengeId() {
      return this.player.challenge.getPChallengeId();
    },
  },
  methods: {
    configPChallenge(i) {
      this.player.challenge.configPChallenge(i);
    },
    startPChallenge() {
      this.player.challenge.startPChallenge(this.player);
    },
    exitPChallenge() {
      this.player.challenge.exitPChallenge(this.player);
    },
  },
});

const SpiritTab = Vue.defineComponent({
  template: "#spirit-tab",
  data: () => ({player: currentPlayer}),
  methods: {
    /** @param {number} i */
    buySpirit(i) {
      return;
      this.player.spiritLevelA[i] += 1;
    },
  },
});

const AutoTab = Vue.defineComponent({
  template: "#auto-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  methods: {
    toggleAutoBuyer(i) {
      this.nig.toggleAutoBuyer(i);
    },
    configAutoBuyer(i) {
      this.nig.configAutoBuyer(i);
    },
    toggleRingAutoBuyer(i) {
      this.nig.toggleRingAutoBuyer(i);
    },
    configRingAutoBuyer(i) {
      this.nig.configRingAutoBuyer(i);
    },
  },
});

const ShineTab = Vue.defineComponent({
  template: "#shine-tab",
  data: () => ({
    player: currentPlayer,
    shineSpendUnits: [1, 10, 100, 1_000, 10_000, 100_000, 1_000_000],
    brightnessSpendUnits: [1, 10, 100, 1_000],
    flickerSpendUnits: [1],
    typeNames: ["モード型", "効力型1", "効力型2", "上位効力型1", "上位効力型2", "鋳片型"],
  }),
  computed: {
    visibleSpendShine() {
      return [
        true,
        this.player.challenge.challengeCleared.length >= 96,
        this.player.challenge.challengeCleared.length >= 128,
        this.player.challenge.challengeCleared.length >= 160,
        this.player.challenge.challengeCleared.length >= 192,
        this.player.challenge.challengeCleared.length >= 224,
        this.player.challenge.perfectChallengeStage >= 10,
      ];
    },
    visibleSpendBrightness() {
      return [
        this.player.challenge.rankChallengeCleared.length >= 32,
        this.player.challenge.rankChallengeCleared.length >= 64,
        this.player.challenge.rankChallengeCleared.length >= 128,
        this.player.challenge.rankChallengeCleared.length >= 255,
      ];
    },
    visibleSpendFlicker() {
      return [
        this.player.challenge.perfectChallengeStage >= 1,
      ];
    },
    visibleBuyType() {
      return [
        true,
        true,
        true,
        this.player.challenge.rankChallengeCleared.length >= 1,
        this.player.challenge.rankChallengeCleared.length >= 1,
        this.player.crownResetTime.gt(0),
      ];
    },
    visibleResidue() {
      // bug: 残滓獲得後に収縮すると非表示になる
      return this.player.challenge.perfectChallengeStage >= 10;
    }
  },
  methods: {
    spendShine(num) {
      this.player.spendShine(num);
    },
    spendBrightness(num) {
      this.player.spendBrightness(num);
    },
    spendFlicker(num) {
      this.player.spendFlicker(num);
    },
    buyType(i) {
      this.player.shine.buyType(i);
    },
  },
});

const WorldTab = Vue.defineComponent({
  template: "#world-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {
    visibleRemember() {
      return this.nig.players[0].trophy.memory >= 6;
    },
    visiblePipe() {
      return this.player.trophy.smallTrophy >= 75;
    },
    maxPipe() {
      // bug: 表示と動作が一致してない(Player.calcMaxPipeと微妙に異なる)
      return this.player.trophy.trophies[9] ? 3 : this.player.crownResetTime.gt(0) ? 2 : 1;
    },
  },
  methods: {
    moveWorld(i) {
      this.nig.moveWorld(i);
    },
    shrinkWorld(i) {
      this.nig.shrinkWorld(i);
    },
    openPipe(i) {
      this.player.openPipe(i);
    },
  },
});

const ChipTab = Vue.defineComponent({
  template: "#chip-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {

  },
  methods: {
    toggleChipThresholdUse() {
      this.nig.toggleChipThresholdUse();
    },
    configChipThresholdNumber() {
      this.nig.configChipThresholdNumber();
    },
    configSpendChip(i) {
      this.player.chip.configSpendChip(this.player.statue.statue[i], i);
    },
    isVisibleSetChip(i) {
      if (i <= 31) return true;
      if (i <= 51) return this.player.rememberSum >= 16;
      return false;
    },
    chipSet(i, j) {
      this.player.chip.chipSet(i, j);
    },
    clearSetChip() {
      this.player.chip.clearSetChip();
    },
    setChipType() {
      this.player.chip.setChipType();
    },
    changeChipType() {
      this.player.chip.changeChipType();
    },
  },
});

const StatueTab = Vue.defineComponent({
  template: "#statue-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {
    buildStatue(i) {
      this.player.statue.buildStatue(this.player, i);
    },
    polishStatue(i) {
      this.player.statue.polishStatue(this.player, i);
    },
    polishStatueBright(i) {
      this.player.statue.polishStatueBright(this.player, i);
    },
    polishStatueFlicker(i) {
      this.player.statue.polishStatueFlicker(this.player, i);
    },
  },
});

const RingTab = Vue.defineComponent({
  template: "#ring-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {
    activeRingId() {
      return this.player.ring.setRings[this.player.ring.missionState.activeRing];
    }
  },
  methods: {
    configAutoMission() {
      this.nig.configAutoMission();
    },
    configSetRings(i) {
      this.player.ring.configSetRings(this.player.world, i);
    },
    startMission(i) {
      this.player.ring.startMission(i);
    },
    useSkill(i) {
      this.player.ring.useSkill(i);
    },
    endMission() {
      this.player.ring.endMission();
    },
  },
});

const TrophyTab = Vue.defineComponent({
  template: "#trophy-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  methods: {
    confCheckTrophies() {
      this.nig.confCheckTrophies();
    },
    /** @param {number} i */
    getTrophyName(i) {
      return this.player.trophy.trophies[i] ? Trophy.contents[i] : "???";
    },
  },
});

const MarkStoneTab = Vue.defineComponent({
  template: "#mark-stone-tab",
  data: () => ({
    player: currentPlayer,
  }),
  computed: {
    calibration() {
      return this.player.markStone.calibration;
    },
  },
  methods: {
    selectType(i) {
      this.player.markStone.selectType(i);
    },
    resetStone() {
      this.player.markStone.resetStone();
    },
    toggleCalibration() {
      this.calibration.toggleCalibration();
    },
    selectEnemy(i) {
      this.calibration.selectEnemy(i);
    },
    selectEnemyLevel(lv) {
      this.calibration.selectEnemyLevel(lv);
    },
    buyShopUpgrade(i) {
      this.calibration.buyShopUpgrade(i);
    },
  },
});

const app = Vue.createApp(Vue.defineComponent({
  components: {
    BasicTab,
    DarkTab,
    LightTab,
    TimeTab,
    OptionTab,
    LevelTab,
    RankTab,
    CrownTab,
    SpiritTab,
    AutoTab,
    ShineTab,
    WorldTab,
    ChipTab,
    StatueTab,
    RingTab,
    TrophyTab,
    MarkStoneTab,
  },
  data() {
    return {
      nig: nigInstance,
      player: currentPlayer,
      typeNames: ["モード型適用", "効力型適用1", "効力型適用2", "上位効力型適用1", "上位効力型適用2", "鋳片型適用"],
    };
  },
  computed: {
    tabComponentName() {
      return this.player.currentTab.charAt(0).toUpperCase() + this.player.currentTab.slice(1) + "Tab";
    },
    tweetLink() {
      let tweetText = "";
      if (this.player.tweeting.includes('world')) {
        tweetText += '在住世界:' + (this.nig.world + 1) + '%0A';
      }
      if (this.player.tweeting.includes('memory')) {
        tweetText += '記憶:' + this.player.memorySum + '%0A';
      }
      if (this.player.tweeting.includes('remember')) {
        tweetText += '思い出:' + this.player.rememberSum + '%0A';
      }
      if (this.player.tweeting.includes('money')) {
        tweetText += 'ポイント:' + this.player.money +
          '(' + this.player.money.toExponential().replace('+', '%2B') + ')%0A';
      }
      if (this.player.tweeting.includes('darkmoney')) {
        tweetText += '裏ポイント:' + this.player.dark.darkMoney +
          '(' + this.player.dark.darkMoney.toExponential().replace('+', '%2B') + ')%0A';
      }
      if (this.player.tweeting.includes('lightmoney')) {
        tweetText += '天上ポイント:' + this.player.light.lightMoney +
          '(' + this.player.light.lightMoney.toExponential().replace('+', '%2B') + ')%0A';
      }

      if (this.player.tweeting.includes('level')) {
        tweetText += '段位:' + this.player.level + '%0A';
      }
      if (this.player.tweeting.includes('darklevel')) {
        tweetText += '裏段位:' + this.player.dark.darkLevel + '%0A';
      }
      if (this.player.tweeting.includes('achieved')) {
        tweetText += '挑戦達成:' + this.player.challenge.challengeCleared.length + '%0A';
      }
      if (this.player.tweeting.includes('rankachieved')) {
        tweetText += '上位挑戦達成:' + this.player.challenge.rankChallengeCleared.length + '%0A';
      }
      if (this.player.tweeting.includes('pachieved')) {
        tweetText += '完全挑戦段階:' + this.player.challenge.perfectChallengeStage + '%0A';
      }
      if (this.player.tweeting.includes('rank')) {
        tweetText += '階位:' + this.player.rank + '%0A';
      }
      if (this.player.tweeting.includes('levelitemboughttime')) {
        tweetText += '段位効力購入:' + this.player.levelShop.levelItemBought + '%0A';
      }
      if (this.player.tweeting.includes('crown')) {
        tweetText += '冠位:' + this.player.crown + '%0A';
      }
      if (this.player.tweeting.includes('crownResetTime')) {
        tweetText += '冠位リセット:' + this.player.crownResetTime + '%0A';
      }
      if (this.player.tweeting.includes('statue')) {
        tweetText += '像:' + this.player.statue.statueSum + '%0A';
      }
      if (this.player.tweeting.includes('polishedstatue')) {
        tweetText += '輝像:' + this.player.statue.polishedStatueSum + '%0A';
      }
      if (this.player.tweeting.includes('polishedstatuebr')) {
        tweetText += '煌像:' + this.player.statue.brightStatueSum + '%0A';
      }
      if (this.player.tweeting.includes('polishedstatuefl')) {
        tweetText += '瞬像:' + this.player.statue.flickerStatueSum + '%0A';
      }

      let tweetUrl = 'dem08656775.github.io/newincrementalgame';
      let tweetHashtag = '新しい放置ゲーム';

      let attribute = 'https://twitter.com/intent/tweet?'
        + 'text=' + tweetText
        + '&url=' + tweetUrl
        + '&hashtags=' + tweetHashtag;

      return attribute;
    }
  },
  methods: {
    changeType(typeIndex) {
      switch (typeIndex) {
        case 0: this.player.generator.changeModeType(this.player); break;
        case 1: this.player.challenge.changeBonuseType(1); break;
        case 2: this.player.challenge.changeBonuseType(2); break;
        case 3: this.player.challenge.changeRankBonuseType(1); break;
        case 4: this.player.challenge.changeRankBonuseType(2); break;
        case 5: this.player.chip.changeChipType(); break;
      }
    },
    /** @param {string} tabname */
    changeTab(tabname) {
      this.player.currentTab = tabname;
    },
  },
  mounted() {
    this.nig.awake();
  },
}));
app.config.globalProperties.toFormated = toFormated;
app.config.globalProperties.Campaign = Campaign;
app.config.globalProperties.Challenge = Challenge;
app.config.globalProperties.Chip = Chip;
app.config.globalProperties.LevelShop = LevelShop;
app.config.globalProperties.MarkStone = MarkStone;
app.config.globalProperties.Remember = Remember;
app.config.globalProperties.Ring = Ring;
app.config.globalProperties.Shine = Shine;
app.config.globalProperties.Spirit = Spirit;
app.mount('#app');
