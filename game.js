const version = 2;
const trophynum = 12;
const setchipkind = 10;
const setchipnum = 100;
const ringmissionnum = 15;

const worldnum = 12

/** @type {() => PlayerSaveData} */
const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    maxlevelgained: new Decimal(1),
    token: 0,
    shine: 0,
    brightness: 0,
    flicker: 0,

    shineloader: new Array(8).fill(0),
    brightloader: new Array(8).fill(0),

    residue: 0,

    rank: new Decimal(0),
    rankresettime: new Decimal(0),

    crown: new Decimal(0),
    crownresettime: new Decimal(0),

    ranktoken: 0,

    generators: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsCost: [
      new Decimal(1),
      new Decimal('1e4'),
      new Decimal('1e9'),
      new Decimal('1e16'),
      new Decimal('1e25'),
      new Decimal('1e36'),
      new Decimal('1e49'),
      new Decimal('1e64')
    ],
    generatorsMode: new Array(8).fill(null).map((_, i) => i),

    accelerators: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsCost: [
      new Decimal(10),
      new Decimal('1e10'),
      new Decimal('1e20'),
      new Decimal('1e40'),
      new Decimal('1e80'),
      new Decimal('1e160'),
      new Decimal('1e320'),
      new Decimal('1e640'),
    ],

    darkmoney: new Decimal(0),

    darkgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsCost: [
      new Decimal('1e100'),
      new Decimal('1e108'),
      new Decimal('1e127'),
      new Decimal('1e164'),
      new Decimal('1e225'),
      new Decimal('1e316'),
      new Decimal('1e443'),
      new Decimal('1e612')
    ],

    darklevel: new Decimal(0),

    lightmoney: new Decimal(0),

    lightgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsCost: [
      new Decimal('1e200'),
      new Decimal('1e216'),
      new Decimal('1e281'),
      new Decimal('1e456'),
      new Decimal('1e825'),
      new Decimal('1e1496'),
      new Decimal('1e2601'),
      new Decimal('1e4296')
    ],

    tickspeed: 1000,
    accelevel: 0,
    accelevelused: 0,
    activatedcampaigns: [],
    timecrystal: new Array(8).fill(0),
    saveversion: version,

    currenttab: 'basic',
    tweeting: ['money'],

    onchallenge: false,
    challenges: [],
    challengecleared: [],
    challengebonuses: [],

    challengeweight: new Array(20).fill(0),
    challengeweightvalue: new Array(20).fill(0),

    onpchallenge: false,
    pchallenges: [],
    pchallengecleared: new Array(1024).fill(0),
    prchallengecleared: new Array(1024).fill(0),

    boughttype: new Array(6).fill(false),
    setmodes: new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst: [],
    setchallengebonusessnd: [],
    setrankchallengebonusesfst: [],
    setrankchallengebonusessnd: [],

    rankchallengecleared: [],
    rankchallengebonuses: [],

    trophies: new Array(trophynum).fill(false),
    smalltrophies: new Array(100).fill(false),
    smalltrophies2nd: new Array(100).fill(false),

    levelitems: new Array(5).fill(0),
    levelitembought: 0,

    remember: 0,
    rememberspent: 0,
    rememberforgot: 0,

    chip: new Array(setchipkind).fill(0),
    setchip: new Array(setchipnum).fill(0),
    disabledchip: new Array(setchipnum).fill(false),
    spendchip: new Array(setchipkind).fill(0),

    statue: new Array(setchipkind).fill(0),
    polishedstatue: new Array(setchipkind).fill(0),
    polishedstatuebr: new Array(setchipkind).fill(0),

    spiritlevela: new Array(1).fill(0),
    spiritboughtcurrentcrown: new Array(1).fill(0),



    setchiptypefst: new Array(setchipnum).fill(0),

    worldpipe: new Array(worldnum).fill(0),
    rings: {
      setrings: [],
      ringsexp: new Array(13).fill(0),
      onmission: false,
      missionid: 0,
      missionstate: {
        turn: 0,
        activering: 0,
        skilllog: [],
        flowerpoint: 0,
        snowpoint: 0,
        moonpoint: 0,
        flowermultiplier: 1,
        snowmultiplier: 1,
        moonmultiplier: 1,
        tps: [],
        fieldeffect: [],
      },
      clearedmission: [],
      auto: {
        doauto: false,
        automissionid: 0,
      },
      outsideauto: {
        autospendshine: false,
        autospendshinenumber: 0,
        autospendbright: false,
        autospendbrightnumber: 0,
        autodarklevelreset: false,
        autodarklevelresetborder: 2,
        autodochallenge: false
      },
    },
  };
}

/** @typedef {ReturnType<typeof initialCommonData>} CommonData */
/** 全世界で共有され、(UIを除く)ゲームの動作にも影響する変数 */
function initialCommonData() {
  return {
    trophyCheck: true,

    genAutoBuy: false,
    accAutoBuy: false,
    autoLevel: false,
    autoLevelNumber: new Decimal(2),
    autoRankNumber: new Decimal(4),
    autoLevelStopNumber: new Decimal("1e100"),
    levelItemAutoBuy: false,
    autoRank: false,

    chipThresholdUse: false,
    chipThreshold: new Decimal("1e999"),

    exported: "", // UIだけでなく里程にも影響するため

    trophyNumber: new Array(trophynum).fill(0),

    worldOpened: new Array(worldnum).fill(false),
  };
}

/** @type {Vue.Ref<Player>} */
const currentPlayer = Vue.ref(new Player(0, initialData(), initialCommonData()));


const app = Vue.createApp(Vue.defineComponent({
  data() {
    return {

      whole: this,
      player: currentPlayer,

      players: new Array(worldnum).fill(null).map(() => initialData()),
      common: initialCommonData(),

      showmult: true,

      trophydata: new Trophydata(),
      rememberdata: new Rememberdata(),
      spiritdata: new Spiritdata(),

      automissiontimerid: 0,
      autoshinetimerid: 0,
      autobrighttimerid: 0,
      autochallengetimerid: 0,

      world: 0,

      time: 0,
      diff: 0,
    }
  },
  computed: {
    tweetLink() {
      let tweetText = "";
      if (this.player.tweeting.includes('world')) {
        tweetText += '在住世界:' + (this.world + 1) + '%0A';
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
        tweetText += '挑戦達成:' + this.player.challengeCleared.length + '%0A';
      }
      if (this.player.tweeting.includes('rankachieved')) {
        tweetText += '上位挑戦達成:' + this.player.rankChallengeCleared.length + '%0A';
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
        tweetText += '像:' + this.player.statues.statueSum + '%0A';
      }
      if (this.player.tweeting.includes('polishedstatue')) {
        tweetText += '輝像:' + this.player.statues.polishedStatueSum + '%0A';
      }
      if (this.player.tweeting.includes('polishedstatuebr')) {
        tweetText += '煌像:' + this.player.statues.brightStatueSum + '%0A';
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

    exportsave() {
      this.common.exported = btoa(JSON.stringify(this.players))
    },
    exportsavefile() {
      let result = btoa(JSON.stringify(this.players))
      const file = new Blob([result], { type: 'text/plain' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = `newincremantal_savedata${new Date()}.txt`
      a.click()
    },
    importsave() {
      let input = window.prompt("データを入力", "")
      if (input.length <= 50) {
        return
      }
      let k = atob(input).charAt(0)
      if (k == '{') return
      localStorage.setItem("playerStoredb", input)
      this.dataload()
      this.load(0)
    },
    save() {

      this.players[this.world] = deepmerge(this.players[this.world], this.player.toSaveObject(), {
        isMergeableObject: (object) => isPlainObject(object)
      });

      localStorage.setItem("playerStoredb", btoa(JSON.stringify(this.players)));

      console.log("save succeeded" + Date.now())
    },
    dataload() {
      if (!localStorage.getItem("playerStoredb")) return
      console.log(atob(localStorage.getItem("playerStoredb")))
      this.players = JSON.parse(atob(localStorage.getItem("playerStoredb")))

      while (this.players.length < worldnum) {
        this.players.push(initialData())
      }

      for (let i = 0; i < worldnum; i++) {

        const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

        let saveData = deepmerge(initialData(), this.players[i], {
          arrayMerge: overwriteMerge,
          isMergeableObject: isPlainObject
        })

        while (saveData.trophies.length < trophynum) {
          saveData.trophies.push(false)
        }


        while (saveData.boughttype.length < 6) {
          saveData.boughttype.push(false)
        }

        while (saveData.chip.length < setchipkind) {
          saveData.chip.push(0)
        }

        while (saveData.statue.length < setchipkind) {
          saveData.statue.push(0)
        }

        while (saveData.rings.ringsexp.length < 13) {
          saveData.rings.ringsexp.push(0)
        }

        while (saveData.spiritlevela.length < this.spiritdata.spiritnuma) {
          saveData.spiritlevela.push(0)
        }

        while (saveData.spiritboughtcurrentcrown.length < this.spiritdata.spiritnuma) {
          saveData.spiritboughtcurrentcrown.push(0)
        }

        while (saveData.worldpipe.length < worldnum) {
          saveData.worldpipe.push(0)
        }


        this.players[i] = saveData
      }

    },
    load(world) {

      let saveData = this.players[world]
      this.world = world
      console.log(saveData)

      this.player = new Player(this.world, saveData, this.common)

      this.checkmemories()
      this.checkremembers()
      this.player.checkTrophies()
      this.player.checkWorlds()
      this.player.countSmallTrophies()
      this.checkpipedsmalltrophies()

      this.updateTickSpeed()
      this.player.calcCommonMult()
      this.player.generator.findHighestGenerator()
      for (let i = 0; i < 8; i++) {
        this.player.calcBasicIncrementMult(i)
      }

      this.player.generator.calcGnCost(this.player)
      this.player.accelerator.calcAcCost(this.player)
      this.player.dark.calcDgCost(this.player)
      this.player.light.calcLgCost()

      if (this.player.auto.autoRing) {
        this.automissiontimerid = setInterval(() => this.player.rings.autoPlayMission(), 1000)
      } else {
        clearInterval(this.automissiontimerid)
        this.automissiontimerid = 0
      }
      if (this.player.auto.autoSpendShine) {
        this.autoshinetimerid = setInterval(this.autoshine, 1000)
      } else {
        clearInterval(this.autoshinetimerid)
        this.autoshinetimerid = 0
      }
      if (this.player.auto.autoSpendBright) {
        this.autobrighttimerid = setInterval(this.autobright, 1000)
      } else {
        clearInterval(this.autobrighttimerid)
        this.autobrighttimerid = 0
      }
      if (this.player.auto.autoDoChallenge) {
        this.autochallengetimerid = setInterval(this.autochallenge, 1000)
      } else {
        clearInterval(this.autochallengetimerid)
        this.autochallengetimerid = 0
      }



    },

    configshowmult() {
      this.showmult = !this.showmult
    },

    update() {

      let diffm = this.diff
      this.diff = Date.now() - this.time - this.player.tickSpeed

      this.time = Date.now()
      this.player.challenge.activeBonuses = (!this.player.onChallenge || this.player.challengeBonuses.includes(4)) ? this.player.challengeBonuses : []

      if (this.common.trophyCheck) {
          this.player.checkTrophies()
          this.player.countSmallTrophies()
      }
      this.player.checkWorlds()
      this.player.calcCommonMult()
      this.player.generator.findHighestGenerator()
      for (let i = 0; i < 8; i++) {
        this.player.calcBasicIncrementMult(i)
      }

      this.player.generator.calcGnCost(this.player)
      this.player.accelerator.calcAcCost(this.player)
      this.player.dark.calcDgCost(this.player)
      this.player.light.calcLgCost()

      this.player.generator.updateGenerators(this.player, new Decimal(1))
      this.player.accelerator.updateAccelerators(this.player, new Decimal(1))

      this.player.challenge.calcToken()

      if (this.player.campaign.updateCampaign()) {
        alert("キャンペーン期間が終了しました。起動時間回帰力が不足しているため、時間回帰力の選択がリセットされます。")
      }

      this.player.shines.updateShine(this.player);
      this.player.shines.updateBright(this.player);
      this.player.shines.updateFlicker(this.player);

      let autorankshine = Math.max(0, 1000 - this.player.rememberSum * 10)

      if (!this.player.onChallenge && this.player.rankChallengeBonuses.includes(14) && this.common.autoRank) {
        if (this.player.shine >= autorankshine && this.player.money.greaterThanOrEqualTo(this.player.resetRankBorder())) {
          if (this.player.calcGainRank().greaterThanOrEqualTo(this.common.autoRankNumber)) {
            this.player.resetRank(true)
            this.player.shine -= autorankshine
          }
        }
      }

      if (this.player.rankChallengeBonuses.includes(5) && this.common.levelItemAutoBuy) {
        for (let i = 0; i < 5; i++) {
          this.player.levelShop.buyLevelItems(this.player, i)
        }
      }

      if (this.player.rememberSum >= 100) {
        if (!(this.player.onChallenge || this.player.challenge.onPerfectChallenge)) {
          this.player.level = this.player.level.add(1)
          this.player.levelResetTime = this.player.levelResetTime.add(1)
        }
      }


      if ((this.player.auto.autoDoChallenge || !this.player.onChallenge) && this.player.challenge.activeBonuses.includes(14) && this.common.autoLevel) {
        if (this.player.money.greaterThanOrEqualTo(this.player.resetLevelBorder()) && this.player.level.lt(this.common.autoLevelStopNumber)) {
          if (this.player.calcGainLevel().greaterThanOrEqualTo(this.common.autoLevelNumber)) {
            this.player.resetLevel(true, false)
          }
        }
      }


      if (this.player.challenge.activeBonuses.includes(5) && this.common.genAutoBuy) {
        for (let i = 7; i >= 0; i--) {
          this.player.generator.buyGenerator(this.player, i)
        }
      }

      if (this.player.challenge.activeBonuses.includes(9) && this.common.accAutoBuy) {
        let ha = this.player.levelShop.levelItems[3] + 1
        for (let i = ha; i >= 0; i--) {
          this.player.accelerator.buyAccelerator(this.player, i)
        }
      }

      this.updateTickSpeed();

      setTimeout(this.update, Math.max(this.player.tickSpeed - (this.diff + diffm) / 2, 1));
    },
    updateTickSpeed() {
      this.player.tickSpeed = this.player.calcTickSpeed()

      if (this.player.rankChallengeBonuses.includes(9)) {
        this.player.multByAc = new Decimal(50).div(this.player.tickSpeed)
        this.player.tickSpeed = 50
      } else {
        this.player.multByAc = new Decimal(1)
      }
      this.player.campaign.updateAccelLevel(this.player.tickSpeed);
    },

    changeTab(tabname) {
      this.player.currentTab = tabname;
    },
    configautobuyer(index) {
      if (index == 0) {
        let input = new Decimal(window.prompt("リセット時入手段位を設定", ""))
        this.common.autoLevelNumber = input
      } else if (index == 1) {
        let input = new Decimal(window.prompt("昇段停止段位を設定", ""))
        this.common.autoLevelStopNumber = input
      } else if (index == 2) {
        let input = new Decimal(window.prompt("リセット時入手階位を設定", ""))
        this.common.autoRankNumber = input
      }
    },
    toggleautobuyer(index) {
      if (index == 0) this.common.genAutoBuy = !this.common.genAutoBuy
      if (index == 1) this.common.accAutoBuy = !this.common.accAutoBuy
      if (index == 2) this.common.autoLevel = !this.common.autoLevel
      if (index == 3) this.common.levelItemAutoBuy = !this.common.levelItemAutoBuy
      if (index == 5) this.common.autoRank = !this.common.autoRank
    },
    togglechipthresholduse() {
      this.common.chipThresholdUse = !this.common.chipThresholdUse
    },
    configchipthresholdnumber() {
      let input = new Decimal(window.prompt("閾値を設定", ""))
      this.common.chipThreshold = input
    },
    autoshine() {
      this.player.spendShine(this.player.auto.autoSpendShineNumber)
    },
    autobright() {
      this.player.spendBrightness(this.player.auto.autoSpendBrightNumber)
    },
    autochallenge() {
      if (this.player.challengeCleared.length == 255) return;
      if (this.player.challengeCleared.includes(this.player.challenge.getChallengeId()) || this.player.challenges.length == 0) {
        this.player.challenge.showUnclearedChallenges()
      }
      if (!this.player.onChallenge) {
        this.startChallenge()
      }
    },
    toggleringautobuyer(index) {
      if (index == 0) {
        this.player.auto.autoSpendShine = !this.player.auto.autoSpendShine
        if (this.player.auto.autoSpendShine) {
          this.autoshinetimerid = setInterval(this.autoshine, 1000)
        } else {
          clearInterval(this.autoshinetimerid)
          this.autoshinetimerid = 0
        }
      }
      if (index == 1) {
        this.player.auto.autoSpendBright = !this.player.auto.autoSpendBright
        if (this.player.auto.autoSpendBright) {
          this.autobrighttimerid = setInterval(this.autobright, 1000)
        } else {
          clearInterval(this.autobrighttimerid)
          this.autobrighttimerid = 0
        }
      }
      if (index == 2) {
        this.player.auto.autoDoChallenge = !this.player.auto.autoDoChallenge
        if (this.player.auto.autoDoChallenge) {
          this.autochallengetimerid = setInterval(this.autochallenge, 1000)
        } else {
          clearInterval(this.autochallengetimerid)
          this.autochallengetimerid = 0
        }
      }
    },
    configringautobuyer(index) {
      let input = parseInt(window.prompt("消費量を設定:最大1000", ""))
      if (isNaN(input)) return
      if (input < 0 || input > 1000) return
      if (index == 0) {
        this.player.auto.autoSpendShineNumber = input
      }
      if (index == 1) {
        this.player.auto.autoSpendBrightNumber = input
      }
    },
    resetData(force) {
      if (force || confirm('これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？')) {
        this.player = new Player(this.world, initialData(), this.common)
        for (let i = 0; i < worldnum; i++) {
          this.players[i] = initialData()
        }
      }
    },


    startChallenge() {
      this.player.challenge.startChallenge(this.player);
    },
    startpChallenge() {
      this.player.challenge.startPChallenge(this.player);
    },


    exitChallenge() {
      this.player.challenge.exitChallenge(this.player);
    },

    exitpChallenge() {
      this.player.challenge.exitPChallenge(this.player);
    },



    gettrophyname(i) {
      return this.player.trophies[i] ? this.trophydata.contents[i] : "???"
    },
    moveworld(i) {
      // @ts-expect-error
      if (world == i || !this.common.worldOpened[i]) return // bug
      this.save()
      this.load(i)
    },
    shrinkworld(i) {
      if (4 > this.common.trophyNumber[i]) {
        alert("実績が4つ未満なので、世界を収縮できません。")
        return
      }
      if (this.players[i].remember >= this.common.trophyNumber[i]) {
        alert("実績が思い出より多くありません。")
        return
      }
      if (confirm("世界" + (i + 1) + "を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。")) {
        let u = this.common.trophyNumber[i]
        let rg = this.players[i].rings
        let r = this.player.rememberSum
        let rd = this.players[i].residue
        let dl = this.players[i].darklevel
        let st = this.players[i].statue
        let cw = this.players[i].challengeweight
        let cwv = this.players[i].challengeweightvalue
        this.players[i] = initialData()
        this.players[i].remember = u
        this.players[i].rings = rg
        this.players[i].residue = rd
        this.players[i].challengeweight = cw
        this.players[i].challengeweightvalue = cwv

        if (r >= 1) this.players[i].levelresettime = new Decimal(1)
        if (r >= 2) this.players[i].levelresettime = new Decimal(2)
        if (r >= 3) this.players[i].levelresettime = new Decimal(3)
        if (r >= 4) this.players[i].levelresettime = new Decimal(5)
        if (r >= 5) this.players[i].levelresettime = new Decimal(8)
        if (r >= 6) this.players[i].levelresettime = new Decimal(13)
        if (r >= 7) this.players[i].levelresettime = new Decimal(21)
        if (r >= 8) this.players[i].levelresettime = new Decimal(34)
        if (r >= 9) this.players[i].rankresettime = new Decimal(1)
        if (r >= 10) this.players[i].rankresettime = new Decimal(2)
        if (r >= 11) this.players[i].rankresettime = new Decimal(3)
        if (r >= 12) this.players[i].rankresettime = new Decimal(5)
        if (r >= 13) this.players[i].rankresettime = new Decimal(8)
        if (r >= 14) this.players[i].rankresettime = new Decimal(13)
        if (r >= 15) this.players[i].rankresettime = new Decimal(21)
        if (r >= 16) this.players[i].rankresettime = new Decimal(34)
        if (r >= 17) {
          for (let j = 0; j < this.rememberdata.givenchalenges[0].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if (r >= 18) {
          for (let j = 0; j < this.rememberdata.givenchalenges[1].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if (r >= 19) {
          for (let j = 0; j < this.rememberdata.givenchalenges[2].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if (r >= 20) {
          for (let j = 0; j < this.rememberdata.givenchalenges[3].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[3][j]))
          }
        }
        if (r >= 21) {
          for (let j = 0; j < this.rememberdata.givenchalenges[4].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[4][j]))
          }
        }
        if (r >= 22) {
          for (let j = 0; j < this.rememberdata.givenchalenges[5].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[5][j]))
          }
        }
        if (r >= 23) {
          for (let j = 0; j < this.rememberdata.givenchalenges[6].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[6][j]))
          }
        }
        if (r >= 24) {
          for (let j = 0; j < this.rememberdata.givenchalenges[7].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[7][j]))
          }
        }
        if (r >= 25) this.players[i].rank = new Decimal(64)
        if (r >= 26) this.players[i].levelitembought = 108
        if (r >= 27) this.players[i].rank = new Decimal(128)
        if (r >= 28) this.players[i].levelitembought = 256
        if (r >= 29) this.players[i].rank = new Decimal(256)
        if (r >= 30) this.players[i].levelitembought = 800
        if (r >= 31) this.players[i].rank = new Decimal(512)
        if (r >= 32) this.players[i].levelitembought = 1728
        if (r >= 33) this.players[i].maxlevelgained = new Decimal(1000)
        if (r >= 34) {
          for (let j = 0; j < this.rememberdata.givenchalenges[8].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[8][j]))
          }
        }
        if (r >= 35) this.players[i].maxlevelgained = new Decimal(3000)
        if (r >= 36) {
          for (let j = 0; j < this.rememberdata.givenchalenges[9].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[9][j]))
          }
        }
        if (r >= 37) this.players[i].maxlevelgained = new Decimal(10000)
        if (r >= 38) {
          for (let j = 0; j < this.rememberdata.givenchalenges[10].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[10][j]))
          }
        }
        if (r >= 39) this.players[i].maxlevelgained = new Decimal(30000)
        if (r >= 40) {
          for (let j = 0; j < this.rememberdata.givenchalenges[11].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[11][j]))
          }
        }
        if (r >= 41) this.players[i].levelresettime = new Decimal(1000)
        if (r >= 42) this.players[i].rankresettime = new Decimal(300)
        if (r >= 43) this.players[i].rank = new Decimal(4096)
        if (r >= 44) this.players[i].shine = 100000
        if (r >= 45) this.players[i].maxlevelgained = new Decimal(100000)
        if (r >= 46) this.players[i].levelitembought = 6400
        if (r >= 47) {
          for (let j = 0; j < this.rememberdata.givenchalenges[12].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[12][j]))
          }
        }
        if (r >= 48) {
          for (let j = 0; j < this.rememberdata.givenchalenges[13].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[13][j]))
          }
        }
        if (r >= 49) {
          for (let j = 0; j < this.rememberdata.givenchalenges[14].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[14][j]))
          }
        }
        if (r >= 50) {
          for (let j = 0; j < this.rememberdata.givenchalenges[15].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[15][j]))
          }
        }
        if (r >= 51) {
          for (let j = 0; j < this.rememberdata.givenchalenges[16].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[16][j]))
          }
        }
        if (r >= 52) {
          for (let j = 0; j < this.rememberdata.givenchalenges[17].length; j++) {
            this.players[i].challengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[17][j]))
          }
        }
        if (r >= 53) {
          for (let j = 0; j < this.rememberdata.givenchalenges[0].length; j++) {
            this.players[i].rankchallengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if (r >= 54) {
          for (let j = 0; j < this.rememberdata.givenchalenges[1].length; j++) {
            this.players[i].rankchallengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if (r >= 55) {
          for (let j = 0; j < this.rememberdata.givenchalenges[2].length; j++) {
            this.players[i].rankchallengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if (r >= 56) {
          for (let j = 0; j < this.rememberdata.givenchalenges[3].length; j++) {
            this.players[i].rankchallengecleared.push(Challenge.getChallengeId(this.rememberdata.givenchalenges[3][j]))
          }
        }
        if (r >= 57) this.players[i].chip[0] = 1;
        if (r >= 58) this.players[i].chip[0] = 15;
        if (r >= 59) this.players[i].chip[0] = 55;
        if (r >= 60) this.players[i].chip[0] = 120;
        if (r >= 61) this.players[i].chip[1] = 1;
        if (r >= 62) this.players[i].chip[1] = 15;
        if (r >= 63) this.players[i].chip[1] = 55;
        if (r >= 64) this.players[i].chip[1] = 120;
        if (r >= 65) this.players[i].chip[2] = 1;
        if (r >= 66) this.players[i].chip[2] = 15;
        if (r >= 67) this.players[i].chip[2] = 55;
        if (r >= 68) this.players[i].chip[2] = 120;
        if (r >= 69) this.players[i].chip[3] = 1;
        if (r >= 70) this.players[i].chip[3] = 15;
        if (r >= 71) this.players[i].chip[3] = 55;
        if (r >= 72) this.players[i].chip[3] = 120;

        if (r >= 73) this.players[i].darklevel = new Decimal(100);
        if (r >= 74) this.players[i].brightness = 30000;
        if (r >= 75) this.players[i].darklevel = new Decimal(500);
        if (r >= 76) this.players[i].shine = 10000000;
        if (r >= 77) this.players[i].darklevel = new Decimal(2000);
        if (r >= 78) this.players[i].chip[0] += st[0] * 1000
        if (r >= 79) this.players[i].chip[1] += st[1] * 1000
        if (r >= 80) this.players[i].chip[2] += st[2] * 1000
        if (r >= 81) this.players[i].chip[3] += st[3] * 1000






        this.players[i].token = this.players[i].challengecleared.length

        this.checkpipedsmalltrophies()

      }
    },

    confchecktrophies() {
      this.common.trophyCheck = !this.common.trophyCheck
    },

    buyspirit(i) {
      return
      this.player.spiritLevelA[i] += 1;
    },

    configautomission() {
      this.player.auto.autoRing = !this.player.auto.autoRing
      if (this.player.auto.autoRing) {
        this.automissiontimerid = setInterval(() => this.player.rings.autoPlayMission(), 1000)
      } else {
        clearInterval(this.automissiontimerid)
        this.automissiontimerid = 0
      }
    },

    counttrophies(index) {
      let cnt = 0
      for (let i = 0; i < trophynum; i++) {
        if (this.players[index].trophies[i]) cnt++;
      }
      this.common.trophyNumber[index] = cnt;
    },
    checkpipedsmalltrophies() {
      this.player.eachPipedSmallTrophy = new Array(worldnum).fill(0);
      this.player.pipedSmallTrophy = 0;
      for (let i = 0; i < worldnum; i++) {
        let cnt = 0
        if (this.players[i].worldpipe[this.world] >= 1) {
          for (let j = 0; j < 100; j++) {
            if (this.players[i].smalltrophies[j]) cnt++;
          }
          for (let j = 0; j < 100; j++) {
            if (this.players[i].smalltrophies2nd[j]) cnt++;
          }
          cnt -= 75
          cnt *= this.players[i].worldpipe[this.world]
          if (this.players[i].remember >= 10) {
            cnt = Math.floor(cnt * (0.1 + this.players[i].remember / 10))
          }
          this.player.eachPipedSmallTrophy[i] = cnt;
          this.player.pipedSmallTrophy += cnt;
        }
      }
    },
    checkmemories() {
      let cnt = 0;

      for (let i = 0; i < worldnum; i++) {
        this.counttrophies(i)
        if (this.world == i) continue
        cnt += this.common.trophyNumber[i]
      }
      this.player.memorySum = cnt
    },
    checkremembers() {
      let cnt = 0;
      for (let i = this.world + 1; i < worldnum; i++) {
        cnt += this.players[i].remember
      }

      this.player.rememberSum = cnt
    },

    toFormated(dec, exp) {
      if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber()
      else return dec.toExponential(3)
    }

  },

  mounted() {
    this.dataload();
    this.load(0);

    this.time = Date.now()


    setTimeout(this.update, this.player.tickSpeed);
    setInterval(this.save, 20000);

  },
}));
app.config.globalProperties.Campaign = Campaign;
app.config.globalProperties.Challenge = Challenge;
app.config.globalProperties.Chips = Chips;
app.config.globalProperties.LevelShop = LevelShop;
app.config.globalProperties.Rings = Rings;
app.config.globalProperties.Shine = Shine;
app.mount('#app');