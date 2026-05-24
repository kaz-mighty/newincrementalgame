/**
 * @param {Decimal} dec 
 * @param {number} exp 
 */
function toFormated(dec, exp) {
  if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber()
  else return dec.toExponential(3)
}


const BasicTab = Vue.defineComponent({
  template: "#basic-tab",
  data: () => ({
    player: currentPlayer,
    showMult: true,
  }),
  methods: {
    configShowMult() {
      this.showMult = !this.showMult
    },
  },
});

const DarkTab = Vue.defineComponent({
  template: "#dark-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const LightTab = Vue.defineComponent({
  template: "#light-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const TimeTab = Vue.defineComponent({
  template: "#time-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const OptionTab = Vue.defineComponent({
  template: "#option-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {

  },
  methods: {
    exportSave() {
      this.nig.common.exported = btoa(JSON.stringify(this.nig.players))
    },
    exportSaveFile() {
      let result = btoa(JSON.stringify(this.nig.players))
      const file = new Blob([result], { type: 'text/plain' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = `newincremantal_savedata${new Date()}.txt`
      a.click()
    },
    importSave() {
      let input = window.prompt("データを入力", "")
      if (input.length <= 50) {
        return
      }
      let k = atob(input).charAt(0)
      if (k == '{') return
      localStorage.setItem("playerStoredb", input)
      this.nig.dataLoad()
      this.nig.load(0)
    },
  },
});

const LevelTab = Vue.defineComponent({
  template: "#level-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {
    startChallenge() {
      this.player.challenge.startChallenge(this.player);
    },
    exitChallenge() {
      this.player.challenge.exitChallenge(this.player);
    },
  },
});

const RankTab = Vue.defineComponent({
  template: "#rank-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const CrownTab = Vue.defineComponent({
  template: "#crown-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {
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
  computed: {

  },
  methods: {
    /** @param {number} i */
    buySpirit(i) {
      return
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
  computed: {

  },
  methods: {

  },
});

const ShineTab = Vue.defineComponent({
  template: "#shine-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const WorldTab = Vue.defineComponent({
  template: "#world-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {

  },
  methods: {

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

  },
});

const StatueTab = Vue.defineComponent({
  template: "#statue-tab",
  data: () => ({player: currentPlayer}),
  computed: {

  },
  methods: {

  },
});

const RingTab = Vue.defineComponent({
  template: "#ring-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {

  },
  methods: {

  },
});

const TrophyTab = Vue.defineComponent({
  template: "#trophy-tab",
  data: () => ({
    nig: nigInstance,
    player: currentPlayer,
  }),
  computed: {

  },
  methods: {
    /** @param {number} i */
    getTrophyName(i) {
      return this.player.trophies[i] ? Trophy.contents[i] : "???"
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
  },
  data() {
    return {
      nig: nigInstance,
      player: currentPlayer,
    }
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

      let tweetUrl = 'dem08656775.github.io/newincrementalgame';
      let tweetHashtag = '新しい放置ゲーム';

      let attribute = 'https://twitter.com/intent/tweet?'
        + 'text=' + tweetText
        + '&url=' + tweetUrl
        + '&hashtags=' + tweetHashtag

      return attribute
    }
  },
  methods: {
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
app.config.globalProperties.Remember = Remember;
app.config.globalProperties.Ring = Ring;
app.config.globalProperties.Shine = Shine;
app.config.globalProperties.Spirit = Spirit;
app.mount('#app');
