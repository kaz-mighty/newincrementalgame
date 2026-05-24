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

class Nig { // New Incremental Game
  constructor() {
    const common = initialCommonData();

    this.world = 0;
    this.player = new Player(this.world, initialData(), common);
    this.players = new Array(worldnum).fill(null).map(() => initialData());
    this.common = common;

    this.autoMissionTimerId = 0;
    this.autoShineTimerId = 0;
    this.autoBrightTimerId = 0;
    this.autoChallengeTimerId = 0;

    this.time = 0;
    this.diff = 0;
  }

  awake() {
    this.dataLoad();
    this.load(0);

    this.time = Date.now();

    setTimeout(() => this.update(), this.player.tickSpeed);
    setInterval(() => this.save(), 20000);
  }
  save() {
    this.players[this.world] = deepmerge(this.players[this.world], this.player.toSaveObject(), {
      isMergeableObject: isPlainObject
    });

    localStorage.setItem("playerStoredb", btoa(JSON.stringify(this.players)));
    console.log("save succeeded" + Date.now())
  }
  dataLoad() {
    const store = localStorage.getItem("playerStoredb");
    if (!store) return
    console.log(atob(store))
    this.players = JSON.parse(atob(store))

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
      while (saveData.spiritlevela.length < Spirit.spiritNumA) {
        saveData.spiritlevela.push(0)
      }
      while (saveData.spiritboughtcurrentcrown.length < Spirit.spiritNumA) {
        saveData.spiritboughtcurrentcrown.push(0)
      }
      while (saveData.worldpipe.length < worldnum) {
        saveData.worldpipe.push(0)
      }

      this.players[i] = saveData
    }
  }
  /** @param {number} world */
  load(world) {
    let saveData = this.players[world]
    this.world = world
    console.log(saveData)

    this.player = new Player(this.world, saveData, this.common)

    this.checkMemories()
    this.checkRemembers()
    this.player.checkTrophies()
    this.player.checkWorlds()
    this.player.countSmallTrophies()
    this.checkPipedSmallTrophies()

    this.player.updateTickSpeed()
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
      this.autoMissionTimerId = setInterval(() => this.player.ring.autoPlayMission(), 1000)
    } else {
      clearInterval(this.autoMissionTimerId)
      this.autoMissionTimerId = 0
    }
    if (this.player.auto.autoSpendShine) {
      this.autoShineTimerId = setInterval(() => this.autoShine(), 1000)
    } else {
      clearInterval(this.autoShineTimerId)
      this.autoShineTimerId = 0
    }
    if (this.player.auto.autoSpendBright) {
      this.autoBrightTimerId = setInterval(() => this.autoBright(), 1000)
    } else {
      clearInterval(this.autoBrightTimerId)
      this.autoBrightTimerId = 0
    }
    if (this.player.auto.autoDoChallenge) {
      this.autoChallengeTimerId = setInterval(() => this.autoChallenge(), 1000)
    } else {
      clearInterval(this.autoChallengeTimerId)
      this.autoChallengeTimerId = 0
    }
  }

  update() {
    let diffm = this.diff
    this.diff = Date.now() - this.time - this.player.tickSpeed
    this.time = Date.now()

    this.player.update()

    setTimeout(() => this.update(), Math.max(this.player.tickSpeed - (this.diff + diffm) / 2, 1));
  }

  /** @param {number} index */
  configAutoBuyer(index) {
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
  }
  /** @param {number} index */
  toggleAutoBuyer(index) {
    if (index == 0) this.common.genAutoBuy = !this.common.genAutoBuy
    if (index == 1) this.common.accAutoBuy = !this.common.accAutoBuy
    if (index == 2) this.common.autoLevel = !this.common.autoLevel
    if (index == 3) this.common.levelItemAutoBuy = !this.common.levelItemAutoBuy
    if (index == 5) this.common.autoRank = !this.common.autoRank
  }
  toggleChipThresholdUse() {
    this.common.chipThresholdUse = !this.common.chipThresholdUse
  }
  configChipThresholdNumber() {
    let input = new Decimal(window.prompt("閾値を設定", ""))
    this.common.chipThreshold = input
  }
  autoShine() {
    this.player.spendShine(this.player.auto.autoSpendShineNumber)
  }
  autoBright() {
    this.player.spendBrightness(this.player.auto.autoSpendBrightNumber)
  }
  autoChallenge() {
    if (this.player.challenge.challengeCleared.length == 255) return;
    if (this.player.challenge.challengeCleared.includes(this.player.challenge.getChallengeId()) || this.player.challenge.challenges.length == 0) {
      this.player.challenge.showUnclearedChallenges()
    }
    if (!this.player.challenge.onChallenge) {
      this.player.challenge.startChallenge(this.player);
    }
  }
  /** @param {number} index */
  toggleRingAutoBuyer(index) {
    if (index == 0) {
      this.player.auto.autoSpendShine = !this.player.auto.autoSpendShine
      if (this.player.auto.autoSpendShine) {
        this.autoShineTimerId = setInterval(() => this.autoShine(), 1000)
      } else {
        clearInterval(this.autoShineTimerId)
        this.autoShineTimerId = 0
      }
    }
    if (index == 1) {
      this.player.auto.autoSpendBright = !this.player.auto.autoSpendBright
      if (this.player.auto.autoSpendBright) {
        this.autoBrightTimerId = setInterval(() => this.autoBright(), 1000)
      } else {
        clearInterval(this.autoBrightTimerId)
        this.autoBrightTimerId = 0
      }
    }
    if (index == 2) {
      this.player.auto.autoDoChallenge = !this.player.auto.autoDoChallenge
      if (this.player.auto.autoDoChallenge) {
        this.autoChallengeTimerId = setInterval(() => this.autoChallenge(), 1000)
      } else {
        clearInterval(this.autoChallengeTimerId)
        this.autoChallengeTimerId = 0
      }
    }
  }
  /** @param {number} index */
  configRingAutoBuyer(index) {
    let input = parseInt(window.prompt("消費量を設定:最大1000", ""))
    if (isNaN(input)) return
    if (input < 0 || input > 1000) return
    if (index == 0) {
      this.player.auto.autoSpendShineNumber = input
    }
    if (index == 1) {
      this.player.auto.autoSpendBrightNumber = input
    }
  }

  /** @param {boolean} force */
  resetData(force) {
    if (force || confirm('これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？')) {
      this.player = new Player(this.world, initialData(), this.common)
      for (let i = 0; i < worldnum; i++) {
        this.players[i] = initialData()
      }
    }
  }

  /** @param {number} i */
  moveWorld(i) {
    // @ts-expect-error
    if (world == i || !this.common.worldOpened[i]) return // bug
    this.save()
    this.load(i)
  }
  /** @param {number} i */
  shrinkWorld(i) {
    let newData = Remember.shrinkWorld(i, this.players[i], this.common.trophyNumber[i], this.player.rememberSum);
    if (newData == undefined) return;

    this.players[i] = newData;
    // bug: 収縮直後に合計思い出や記憶が再計算されていない
    this.checkPipedSmallTrophies()
  }

  confCheckTrophies() {
    this.common.trophyCheck = !this.common.trophyCheck
  }

  configAutoMission() {
    this.player.auto.autoRing = !this.player.auto.autoRing
    if (this.player.auto.autoRing) {
      this.autoMissionTimerId = setInterval(() => this.player.ring.autoPlayMission(), 1000)
    } else {
      clearInterval(this.autoMissionTimerId)
      this.autoMissionTimerId = 0
    }
  }

  /** @param {number} index */
  countTrophies(index) {
    let cnt = 0
    for (let i = 0; i < trophynum; i++) {
      if (this.players[index].trophies[i]) cnt++;
    }
    this.common.trophyNumber[index] = cnt;
  }
  checkPipedSmallTrophies() {
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
  }
  checkMemories() {
    let cnt = 0;

    for (let i = 0; i < worldnum; i++) {
      this.countTrophies(i)
      if (this.world == i) continue
      cnt += this.common.trophyNumber[i]
    }
    this.player.memorySum = cnt
  }
  checkRemembers() {
    let cnt = 0;
    for (let i = this.world + 1; i < worldnum; i++) {
      cnt += this.players[i].remember
    }

    this.player.rememberSum = cnt
  }
}

/** @type {Vue.Ref<Nig>} */
const nigInstance = Vue.ref(new Nig());
/** @type {Vue.Ref<Player>} */
const currentPlayer = Vue.ref(nigInstance.value.player);
Vue.watchEffect(() => {
  console.log("player change");
  currentPlayer.value = nigInstance.value.player;
});

