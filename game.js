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


/** @type {Vue.Ref<Player>} */
const currentPlayer = Vue.ref(new Player(initialData()));


const app = Vue.createApp(Vue.defineComponent({
  data() {
    return {

      whole: this,
      player: currentPlayer,

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
      spiritdata: new Spiritdata(),
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

      trophynumber: new Array(10).fill(0),
      smalltrophy: 0,
      eachpipedsmalltrophy: new Array(worldnum).fill(0),
      pipedsmalltrophy: 0,
      worldopened: new Array(worldnum).fill(false),


      pchallengestage: 0,

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
        tweetText += '記憶:' + this.memorysum + '%0A';
      }
      if (this.player.tweeting.includes('remember')) {
        tweetText += '思い出:' + this.checkremembers() + '%0A';
      }
      if (this.player.tweeting.includes('money')) {
        tweetText += 'ポイント:' + this.player.money +
          '(' + this.player.money.toExponential().replace('+', '%2B') + ')%0A';
      }
      if (this.player.tweeting.includes('darkmoney')) {
        tweetText += '裏ポイント:' + this.player.darkMoney +
          '(' + this.player.darkMoney.toExponential().replace('+', '%2B') + ')%0A';
      }
      if (this.player.tweeting.includes('lightmoney')) {
        tweetText += '天上ポイント:' + this.player.lightMoney +
          '(' + this.player.lightMoney.toExponential().replace('+', '%2B') + ')%0A';
      }

      if (this.player.tweeting.includes('level')) {
        tweetText += '段位:' + this.player.level + '%0A';
      }
      if (this.player.tweeting.includes('darklevel')) {
        tweetText += '裏段位:' + this.player.darkLevel + '%0A';
      }
      if (this.player.tweeting.includes('achieved')) {
        tweetText += '挑戦達成:' + this.player.challengeCleared.length + '%0A';
      }
      if (this.player.tweeting.includes('rankachieved')) {
        tweetText += '上位挑戦達成:' + this.player.rankChallengeCleared.length + '%0A';
      }
      if (this.player.tweeting.includes('pachieved')) {
        tweetText += '完全挑戦段階:' + this.pchallengestage + '%0A';
      }
      if (this.player.tweeting.includes('rank')) {
        tweetText += '階位:' + this.player.rank + '%0A';
      }
      if (this.player.tweeting.includes('levelitemboughttime')) {
        tweetText += '段位効力購入:' + this.player.levelItemBought + '%0A';
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
      this.exported = btoa(JSON.stringify(this.players))
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

      this.player = new Player(saveData)

      if (!this.player.onChallenge || this.player.challengeBonuses.includes(4)) this.activechallengebonuses = this.player.challengeBonuses

      this.checktrophies()
      this.checkmemories()
      this.checkremembers()
      this.checkworlds()
      this.countsmalltrophies()
      this.calccommonmult()
      this.findhighestgenerator()

      this.checkpipedsmalltrophies()

      this.countpchallengecleared()

      this.calcgncost()
      this.calcaccost()
      this.calcdgcost()
      this.calclgcost()

      if (this.player.auto.autoRing) {
        this.automissiontimerid = setInterval(() => this.player.rings.autoplaymission(), 1000)
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
    softCap(num, cap) {
      if (num.lessThanOrEqualTo(cap)) return num;
      let capped = num.div(cap)
      capped = new Decimal(capped.log2()).add(1)
      return cap.mul(capped).min(num)
    },
    strongsoftcap(num, cap) {
      if (num.lessThanOrEqualTo(cap)) return num;
      let capped = num.div(cap)
      capped = new Decimal(capped.log2()).add(1)
      capped = new Decimal(capped.log2()).add(1)
      return cap.mul(capped).min(num)
    },

    calcgncost() {
      for (let i = 0; i < 8; i++) {
        let p = i === 0 ?
          this.player.generatorsBought[0] :
          this.player.generatorsBought[i].add(i + 1).mul(i + 1)
        if (this.player.onChallenge && this.player.challenges.includes(1) && this.player.generatorsBought[i].gt(0)) {
          p = p.mul(2)
        }
        p = p.sub(this.eachpipedsmalltrophy[0] * 0.2)

        this.player.generatorsCost[i] = new Decimal(10).pow(p)

      }
    },

    calcaccost() {
      for (let i = 0; i < 8; i++) {
        let p = this.player.acceleratorsBought[i].add(1)
        p = p.mul(p.add(1)).div(2)
        p = p.mul(i === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(i - 1)))
        p = p.sub(this.eachpipedsmalltrophy[3] * 0.2 * (i + 1))
        this.player.acceleratorsCost[i] = p.pow_base(10)
      }
    },
    calcdgcost() {
      for (let i = 0; i < 8; i++) {
        let p = 100 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1))
        let q = this.player.darkGeneratorsBought[i].mul(i + 1).mul(i + 1)
        q = q.add(p)
        q = q.sub(this.eachpipedsmalltrophy[8] * 0.02 * (i + 1) * (i + 1))
        this.player.darkGeneratorsCost[i] = new Decimal(10).pow(q)
      }
    },

    calclgcost() {
      for (let i = 0; i < 8; i++) {
        let p = 200 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1) * (i + 1))
        let q = this.player.lightGeneratorsBought[i].mul(i + 1).mul(i + 1).mul(i + 1)
        q = q.add(p)
        this.player.lightGeneratorsCost[i] = new Decimal(10).pow(q)
      }
    },

    calccommonmult() {
      let mult = new Decimal(1);
      if (!(this.player.onChallenge && this.player.challenges.includes(7))) {
        let cap = new Decimal(100).mul(this.player.levelItems[2] * (1 + this.player.setChip[28] * 0.3) + 1)
        mult = mult.mul(this.softCap(this.player.levelResetTime.add(1), cap))
      }

      if (this.activechallengebonuses.includes(3)) {
        mult = mult.mul(new Decimal(2))
      }

      if (this.player.rankChallengeBonuses.includes(3)) {
        mult = mult.mul(new Decimal(3))
      }

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(0)) {
        mult = mult.div(100)
      }

      let x1 = 0.25
      let x2 = 12

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(7)) {
        x1 = 1.0 / 81
        x2 = 27
      }

      mult = mult.mul(1 + this.smalltrophy * 0.01 + this.memorysum * x1)

      if (this.player.rankChallengeBonuses.includes(11)) {
        mult = mult.mul(new Decimal(2).pow(new Decimal(this.memorysum).div(x2)))
      }

      mult = mult.mul(1 + Math.sqrt(this.pipedsmalltrophy))

      if (this.player.onChallenge && this.player.rankChallengeBonuses.includes(4)) {
        mult = mult.mul(1 + this.player.challenges.length * 0.25)
      }
      if (!(this.player.onPerfectChallenge && this.player.perfectChallenges.includes(8))) {
        if (this.player.darkMoney.greaterThanOrEqualTo(1)) {
          mult = mult.mul(new Decimal(this.player.darkMoney.add(10).log10()).pow(1 + this.player.setChip[40] * 0.1))
        }
      }

      mult = mult.mul(this.multbyac)
      if (this.multbyac.gt(1)) mult = mult.mul(this.multbyac)

      mult = mult.mul(1 + this.player.setChip[0] * 0.1)

      mult = mult.mul(this.player.statues.generatorMulti)

      let camp = 0
      if (this.player.activatedCampaigns.includes("newyear")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("vt")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("hina")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("gw")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("tanabata")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("aniv")) camp = camp + 2
      if (this.player.activatedCampaigns.includes("sw")) camp = camp + 1
      if (this.player.activatedCampaigns.includes("xmas")) camp = camp + 1

      if (this.player.activatedCampaigns.includes("newyear2025")) {
        if (this.player.onChallenge && this.player.challenges.includes(3) && this.player.challenges.includes(4)) {
          camp = camp + 10
        }
      }

      mult = mult.mul(1 + 4 * camp)

      if (this.player.auto.autoDoChallenge) {
        mult = mult.mul(0.001)
      }


      this.commonmult = mult
    },

    calcincrementmult(i, to) {
      let mult = this.incrementalmults[i]
      if (!(this.player.onChallenge && this.player.challenges.includes(4))) {
        mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
      }

      let lv = new Decimal(this.player.level.pow(1 + 0.5 * this.player.setChip[19]).add(2).log2())


      let rk = this.player.rank.add(2).div(262142).log2()
      rk += new Decimal(this.player.rank.add(2).log2()).log2() * this.player.setChip[23]
      mult = mult.mul(new Decimal(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))))

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(3) && mult.gt("1e-100")) {
        let b = Math.floor(mult.log10() / 6)
        mult = new Decimal(10).pow(b * 6)
      }


      return mult
    },

    calcbasicincrementmult(i) {
      let mult = new Decimal(this.commonmult);

      if (!(this.player.onChallenge && this.player.challenges.includes(2))) {
        let mm = new Decimal(1)
        mm = mm.mul(this.player.generatorsBought[i])
        if (this.activechallengebonuses.includes(11)) {
          mm = mm.mul(new Decimal(mm.add(2).log2()))
        }

        if (i < this.highest && mm.greaterThanOrEqualTo(1)) {
          mult = mult.mul(mm)
        } else {
          if (this.activechallengebonuses.includes(2) && mm.greaterThanOrEqualTo(1)) {
            mult = mult.mul(mm)
          }
        }
      }

      if (i == 0 && this.activechallengebonuses.includes(7)) {
        if (this.player.rankChallengeBonuses.includes(7)) {
          mult = mult.mul(this.strongsoftcap(this.player.maxLevelGained, new Decimal(100000)))
        } else {
          mult = mult.mul(this.player.maxLevelGained.min(100000))
        }
      }
      if (!(this.player.onPerfectChallenge && this.player.perfectChallenges.includes(8))) {
        if (this.player.darkGenerators[i].greaterThanOrEqualTo(1)) {
          mult = mult.mul(new Decimal(i + 2 + this.player.darkGenerators[i].log10()).pow(1 + this.player.setChip[i + 32] * 0.25))
        }
      }



      mult = mult.mul(1 + this.player.setChip[i + 1] * 0.5)

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(2)) {
        this.incrementalmults[2] = new Decimal(0)
        this.incrementalmults[5] = new Decimal(0)
      }

      this.incrementalmults[i] = mult

    },


    updategenerators(mu) {
      for (let i = 0; i < 8; i++) {
        if (!this.activechallengebonuses.includes(13)) {
          let to = this.player.generatorsMode[i];
          let mult = mu.mul(this.calcincrementmult(i, to))
          if (to === 0) {
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          } else {
            this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
          }
        } else {
          if (this.player.onChallenge && this.player.challenges.includes(3)) {
            let mult = mu.mul(this.calcincrementmult(i, 0))
            mult = mult.mul(i + 1)
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          } else {
            for (let to = 0; to <= i; to++) {
              let mult = mu.mul(this.calcincrementmult(i, to))
              if (to === 0) {
                this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
              } else {
                this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
              }
            }
          }
        }
      }
    },



    updateaccelerators(mu) {
      for (let i = 1; i < 8; i++) {
        let mult = new Decimal(1)
        if (i == 1 && this.activechallengebonuses.includes(10)) {
          mult = this.player.rankChallengeBonuses.includes(10) ? mult.add(this.player.acceleratorsBought[i].pow_base(2)) : mult.add(this.player.acceleratorsBought[i])
        } else if (i != 1 && this.player.rankChallengeBonuses.includes(6)) {
          mult = this.player.rankChallengeBonuses.includes(10) ? mult.add(this.player.acceleratorsBought[i].pow_base(2)) : mult.add(this.player.acceleratorsBought[i])
        }
        mult = mult.mul(new Decimal(1.5).pow(this.player.setChip[i + 10]))
        mult = mult.mul(1 + this.eachpipedsmalltrophy[1] * 0.2)
        this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i].mul(mult).mul(mu))

      }
    },

    updatedarkgenerators(mu) {
      let darkmult = this.player.darkLevel.add(1)
      darkmult = this.softCap(darkmult, new Decimal(1e3))
      if (this.player.lightMoney.greaterThanOrEqualTo(1)) {
        darkmult = darkmult.mul(this.player.lightMoney.log10() + 1)
      }
      let dgtocalc = Array.from(this.player.darkGenerators)
      for (let i = 0; i < 8; i++) {
        dgtocalc[i] = dgtocalc[i].mul(this.player.lightGenerators[i].add(1))
      }
      this.player.darkMoney = this.player.darkMoney.add(dgtocalc[0].mul(mu).mul(darkmult).mul(1 + this.player.setChip[41] * 0.25).mul(1 + this.eachpipedsmalltrophy[5] * 0.2))
      for (let i = 1; i < 8; i++) {
        this.player.darkGenerators[i - 1] = this.player.darkGenerators[i - 1].add(dgtocalc[i].mul(mu).mul(darkmult).mul(1 + this.player.setChip[41 + i] * 0.25).mul(1 + this.eachpipedsmalltrophy[5] * 0.2))
      }
    },
    updatelightgenerators(mu) {

      let pipemult = 1 + this.eachpipedsmalltrophy[10] * 0.1

      this.player.lightMoney = this.player.lightMoney.add(this.player.lightGenerators[0].mul(mu).mul(pipemult))
      for (let i = 1; i < 8; i++) {
        this.player.lightGenerators[i - 1] = this.player.lightGenerators[i - 1].add(this.player.lightGenerators[i].mul(pipemult))
      }
    },

    spendshine(num) {
      if (this.player.shine < num) return;
      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(6)) return
      this.player.shine -= num
      let val = new Decimal(11 + this.player.setChip[31]).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      if (this.player.trophies[9]) {
        this.player.residue += Math.floor(num * (1 + this.pchallengestage) / 1000000)
      }
    },
    spendbrightness(num) {
      if (this.player.brightness < num) return;
      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(6)) return
      this.player.brightness -= num
      let val = new Decimal(11 + this.player.setChip[50]).pow(new Decimal(num * 100).log10())
      let vald = new Decimal(10 + this.player.setChip[51] * 0.25).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      this.updatedarkgenerators(new Decimal(vald))
    },
    spendflicker(num) {
      if (this.player.flicker < num) return;
      this.player.flicker -= num
      let val = new Decimal(11 + this.player.setChip[50]).pow(new Decimal(num * 10000).log10())
      let vald = new Decimal(10 + this.player.setChip[51] * 0.25).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      this.updatedarkgenerators(new Decimal(vald))
      this.updatelightgenerators(new Decimal(vald))
    },
    buytype(num) {
      if (this.player.shine < this.shinedata.shineshopcost[num] || this.player.boughtType[num]) return;
      if (confirm("本当に型を購入しますか？")) {
        this.player.shine -= this.shinedata.shineshopcost[num]
        this.player.boughtType[num] = true
      }
    },
    calctoken() {

      let spent = 0;
      for (let i of this.player.challengeBonuses) {
        spent += this.challengedata.rewardcost[i]
      }
      let t = this.player.challengeCleared.length
      if (this.player.onPerfectChallenge) {
        t = Math.max(t, this.player.perfectChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)])
      }
      this.player.token = t - spent

      let rspent = 0;
      for (let i of this.player.rankChallengeBonuses) {
        rspent += this.challengedata.rewardcost[i]
      }
      let rt = this.player.rankChallengeCleared.length
      if (this.player.onPerfectChallenge) {
        rt = Math.max(rt, this.player.perfectRankChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)])
      }
      this.player.rankToken = rt - rspent

    },
    countpchallengecleared() {

      let cnt = 0;
      for (let i = 0; i < 1024; i++) {
        cnt += this.player.perfectChallengeCleared[i]
        cnt += this.player.perfectRankChallengeCleared[i]
      }

      cnt /= 510;
      this.pchallengestage = Math.floor(cnt);

    },
    findhighestgenerator() {
      this.highest = 0;
      for (let j = 0; j < 8; j++) {
        if (this.player.generators[j].greaterThan(0)) {
          this.highest = j;
        }
      }
    },
    update() {

      let diffm = this.diff
      this.diff = Date.now() - this.time - this.player.tickSpeed

      this.time = Date.now()
      this.activechallengebonuses = (this.player.challengeBonuses.includes(4) || !this.player.onChallenge) ? this.player.challengeBonuses : []

      if (this.trophycheck) this.checktrophies()
      this.checkmemories()
      this.checkworlds()
      this.countsmalltrophies()
      this.calccommonmult()
      this.findhighestgenerator()
      for (let i = 0; i < 8; i++) {
        this.calcbasicincrementmult(i)
      }

      this.calcgncost()
      this.calcaccost()
      this.calcdgcost()
      this.calclgcost()

      this.updategenerators(new Decimal(1))
      this.updateaccelerators(new Decimal(1))

      this.calctoken()

      this.activateintimecampaign()
      if (this.calccampaigncosts() > this.player.accelLevelUsed) {
        alert("キャンペーン期間が終了しました。起動時間回帰力が不足しているため、時間回帰力の選択がリセットされます。")
        this.player.activatedCampaigns = []
      }

      this.shinedata.calcshinepersent(this)

      let rememberlevel = Math.floor((this.checkremembers() + 16) / 16)

      let shineget = this.shinedata.calcshineget(this)
      let maxshine = this.shinedata.calcmaxshine(this)

      if (this.player.shine < maxshine) {
        this.player.shine = Math.min(this.player.shine + shineget, maxshine)
      }

      this.shinedata.calcbrightpersent(this)

      let brightget = this.shinedata.calcbrightget(this)
      let maxbright = this.shinedata.calcmaxbright(this)

      if (this.player.brightness < maxbright) {
        this.player.brightness = Math.min(this.player.brightness + brightget, maxbright);
      }

      this.flickerpersent = this.shinedata.getfp(this.pchallengestage)

      let flickerget = this.shinedata.calcflickerget(this)

      let maxflicker = this.shinedata.getmaxfl(this.pchallengestage)
      if (this.player.flicker < maxflicker) {
        this.player.flicker = Math.min(this.player.flicker + flickerget, maxflicker);
      }

      let autorankshine = Math.max(0, 1000 - this.checkremembers() * 10)

      if (!this.player.onChallenge && this.player.rankChallengeBonuses.includes(14) && this.autorank) {
        if (this.player.shine >= autorankshine && this.player.money.greaterThanOrEqualTo(this.rankdata.resetRankborder(this))) {
          if (this.rankdata.calcgainrank(this).greaterThanOrEqualTo(this.autoranknumber)) {
            this.resetRank(true)
            this.player.shine -= autorankshine
          }
        }
      }

      if (this.player.rankChallengeBonuses.includes(5) && this.litemautobuy) {
        for (let i = 0; i < 5; i++) {
          this.buylevelitems(i)
        }
      }

      if (this.remembersum >= 100) {
        if (!(this.player.onChallenge || this.player.onPerfectChallenge)) {
          this.player.level = this.player.level.add(1)
          this.player.levelResetTime = this.player.levelResetTime.add(1)
        }
      }


      if ((this.player.auto.autoDoChallenge || !this.player.onChallenge) && this.activechallengebonuses.includes(14) && this.autolevel) {
        if (this.player.money.greaterThanOrEqualTo(this.resetLevelborder()) && this.player.level.lt(this.autolevelstopnumber)) {
          if (this.calcgainlevel().greaterThanOrEqualTo(this.autolevelnumber)) {
            this.resetLevel(true, false)
          }
        }
      }


      if (this.activechallengebonuses.includes(5) && this.genautobuy) {
        for (let i = 7; i >= 0; i--) {
          this.buyGenerator(i)
        }
      }

      if (this.activechallengebonuses.includes(9) && this.accautobuy) {
        let ha = this.player.levelItems[3] + 1
        for (let i = ha; i >= 0; i--) {
          this.buyAccelerator(i)
        }
      }

      this.player.tickSpeed = this.timedata.calctickspeed(this)

      if (this.player.rankChallengeBonuses.includes(9)) {
        this.multbyac = new Decimal(50).div(this.player.tickSpeed)
        this.player.tickSpeed = 50
      } else {
        this.multbyac = new Decimal(1)
      }
      if (this.player.accelLevelUsed == this.player.accelLevel && this.player.tickSpeed <= 10) this.player.accelLevel = this.player.accelLevel + 1




      setTimeout(this.update, Math.max(this.player.tickSpeed - (this.diff + diffm) / 2, 1));
    },

    changeTab(tabname) {
      this.player.currentTab = tabname;
    },
    configtweet(content) {
      if (!this.player.tweeting.includes(content)) {
        this.player.tweeting.push(content)
      } else {
        this.player.tweeting.splice(this.player.tweeting.indexOf(content), 1)
      }
    },
    configchallenge(index) {
      if (this.player.onChallenge) return;
      if (!this.player.challenges.includes(index)) {
        this.player.challenges.push(index)
      } else {
        this.player.challenges.splice(this.player.challenges.indexOf(index), 1)
      }
    },
    configpchallenge(index) {
      if (this.player.onPerfectChallenge) return;
      if (!this.player.perfectChallenges.includes(index)) {
        this.player.perfectChallenges.push(index)
      } else {
        this.player.perfectChallenges.splice(this.player.perfectChallenges.indexOf(index), 1)
      }
    },
    buyGenerator(index) {
      if (this.player.onChallenge && this.player.challenges.includes(6)) {
        if (index == 3 || index == 7) {
          return;
        }
      }
      if (this.player.money.greaterThanOrEqualTo(this.player.generatorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.generatorsCost[index])
        this.player.generators[index] = this.player.generators[index].add(1)
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1)
        this.calcgncost()
      }
    },
    buyAccelerator(index) {
      if (this.player.onChallenge && this.player.challenges.includes(5)) return;
      if (index >= 1 && this.player.levelResetTime.lessThanOrEqualTo(0)) return;

      if (this.player.money.greaterThanOrEqualTo(this.player.acceleratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index])
        this.player.accelerators[index] = this.player.accelerators[index].add(1)
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1)
        this.calcaccost()
      }
    },
    buydarkgenerator(index) {
      if (this.player.money.greaterThanOrEqualTo(this.player.darkGeneratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.darkGeneratorsCost[index])
        this.player.darkGenerators[index] = this.player.darkGenerators[index].add(1)
        this.player.darkGeneratorsBought[index] = this.player.darkGeneratorsBought[index].add(1)
        this.calcdgcost()
      }
    },
    buylightgenerator(index) {
      if (this.player.money.greaterThanOrEqualTo(this.player.lightGeneratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.lightGeneratorsCost[index])
        this.player.lightGenerators[index] = this.player.lightGenerators[index].add(1)
        this.player.lightGeneratorsBought[index] = this.player.lightGeneratorsBought[index].add(1)
        this.calclgcost()
      }
    },
    configautobuyer(index) {
      if (index == 0) {
        let input = new Decimal(window.prompt("リセット時入手段位を設定", ""))
        this.autolevelnumber = input
      } else if (index == 1) {
        let input = new Decimal(window.prompt("昇段停止段位を設定", ""))
        this.autolevelstopnumber = input
      } else if (index == 2) {
        let input = new Decimal(window.prompt("リセット時入手階位を設定", ""))
        this.autoranknumber = input
      }
    },
    toggleautobuyer(index) {
      if (index == 0) this.genautobuy = !this.genautobuy
      if (index == 1) this.accautobuy = !this.accautobuy
      if (index == 2) this.autolevel = !this.autolevel
      if (index == 3) this.litemautobuy = !this.litemautobuy
      if (index == 5) this.autorank = !this.autorank
    },
    togglechipthresholduse() {
      this.chipthresholduse = !this.chipthresholduse
    },
    configchipthresholdnumber() {
      let input = new Decimal(window.prompt("閾値を設定", ""))
      this.chipthreshold = input
    },
    autoshine() {
      this.spendshine(this.player.auto.autoSpendShineNumber)
    },
    autobright() {
      this.spendbrightness(this.player.auto.autoSpendBrightNumber)
    },
    autochallenge() {
      if (this.player.challengeCleared.length == 255) return;
      if (this.player.challengeCleared.includes(this.getchallengeid(this.player.challenges)) || this.player.challenges.length == 0) {
        this.showunclearedchallenges()
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
    setbonusetype(index) {
      if (confirm("現在の効力を登録します。よろしいですか？")) {
        let ans = []
        for (let i = 0; i < 15; i++) {
          if (this.player.challengeBonuses.includes(i)) {
            ans.push(i)
          }
        }
        if (index == 1) {
          this.player.setChallengeBonuses1 = ans
        }
        if (index == 2) {
          this.player.setChallengeBonuses2 = ans
        }
      }

    },
    setrankbonusetype(index) {
      if (confirm("現在の上位効力を登録します。よろしいですか？")) {
        let ans = []
        for (let i = 0; i < 15; i++) {
          if (this.player.rankChallengeBonuses.includes(i)) {
            ans.push(i)
          }
        }
        if (index == 1) {
          this.player.setRankChallengeBonuses1 = ans
        }
        if (index == 2) {
          this.player.setRankChallengeBonuses2 = ans
        }
      }

    },
    changebonusetype(index) {
      for (let i = 0; i < 15; i++) {
        if (this.player.challengeBonuses.includes(i)) {
          this.buyRewards(i)
        }
      }
      if (index == 1) {
        for (let i = 0; i < 15; i++) {
          if (this.player.setChallengeBonuses1.includes(i)) {
            this.buyRewards(i)
          }
        }
      }
      if (index == 2) {
        for (let i = 0; i < 15; i++) {
          if (this.player.setChallengeBonuses2.includes(i)) {
            this.buyRewards(i)
          }
        }
      }

    },
    changerankbonusetype(index) {
      for (let i = 0; i < 15; i++) {
        if (this.player.rankChallengeBonuses.includes(i)) {
          this.buyrankRewards(i)
        }
      }
      if (index == 1) {
        for (let i = 0; i < 15; i++) {
          if (this.player.setRankChallengeBonuses1.includes(i)) {
            this.buyrankRewards(i)
          }
        }
      }
      if (index == 2) {
        for (let i = 0; i < 15; i++) {
          if (this.player.setRankChallengeBonuses2.includes(i)) {
            this.buyrankRewards(i)
          }
        }
      }

    },
    buyRewards(index) {
      if (this.player.challengeBonuses.includes(index)) {
        this.player.challengeBonuses.splice(this.player.challengeBonuses.indexOf(index), 1)
        this.player.token += this.challengedata.rewardcost[index]
      } else {
        if (this.player.token < this.challengedata.rewardcost[index]) {
          return;
        }
        this.player.challengeBonuses.push(index)
        this.player.token -= this.challengedata.rewardcost[index]
      }
    },
    buyrankRewards(index) {
      if (this.player.rankChallengeBonuses.includes(index)) {
        this.player.rankChallengeBonuses.splice(this.player.rankChallengeBonuses.indexOf(index), 1)
        this.player.rankToken += this.challengedata.rewardcost[index]
      } else {
        if (this.player.rankToken < this.challengedata.rewardcost[index]) {
          return;
        }
        this.player.rankChallengeBonuses.push(index)
        this.player.rankToken -= this.challengedata.rewardcost[index]
      }
    },
    calclevelitemcost(index) {
      let d = index + 1
      let cost = this.levelshopdata.itemcost[index].pow(this.player.levelItems[index] + 1)
      let dec = 0;
      for (let i = 1; i <= 5; i++) {
        if (4 * i * i * d * d * d <= this.player.levelItemBought) dec = i;
      }
      cost = cost.div(new Decimal(10).pow(dec)).max(1)
      return cost
    },
    buylevelitems(index) {
      let cost = this.calclevelitemcost(index)
      if (this.player.level.lessThan(cost) || this.player.levelItems[index] >= 5) {
        return;
      }
      this.player.level = this.player.level.sub(cost);
      this.player.levelItems[index] = this.player.levelItems[index] + 1;
      if (this.player.levelItemBought < 100000) this.player.levelItemBought = this.player.levelItemBought + 1;
    },
    setmodetype() {
      if (confirm('現在のモードを登録します。よろしいですか？')) {
        for (let i = 0; i < 8; i++) {
          this.player.setModes[i] = this.player.generatorsMode[i]
        }
      }
    },
    changemodetype() {
      if (this.player.onChallenge && this.player.challenges.includes(3)) return;
      for (let i = 0; i < 8; i++) {
        while (this.player.setModes[i] != this.player.generatorsMode[i]) {
          this.changeMode(i)
        }
      }
    },
    changeMode(index) {
      if (this.player.onChallenge && this.player.challenges.includes(3)) return;
      this.player.generatorsMode[index] += 1;
      if (this.player.generatorsMode[index] > index) {
        this.player.generatorsMode[index] = 0;
      }
    },
    resetData(force) {
      if (force || confirm('これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？')) {
        this.player = new Player(initialData())
        for (let i = 0; i < worldnum; i++) {
          this.players[i] = initialData()
        }
      }
    },
    calcgainlevel() {

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(4)) {

      }
      let dividing = 19 - this.player.rank.add(2).log2()
      if (dividing < 1) dividing = 1
      let mny = Math.pow(this.player.money.log10() - 17, this.player.setChip[18])
      let gainlevel = new Decimal(this.player.money.mul(mny).log10()).div(dividing).pow_base(2)

      let glmin = new Decimal(18).div(dividing).pow_base(2)
      let glmax = this.player.maxLevelGained.div(2)

      if (!glmin.add(0.1).greaterThanOrEqualTo(glmax)) {
        if (gainlevel.lt(glmax)) {
          let persent = new Decimal(1).sub(gainlevel.sub(glmin).div(glmax.sub(glmin)))

          persent = persent.pow(1 + this.player.levelItems[0] * (1 + this.player.setChip[26] * 2))
          persent = new Decimal(1).sub(persent)
          if (persent.lt("1e-5")) {
            gainlevel = gainlevel.mul(1 + this.player.levelItems[0] * (1 + this.player.setChip[26] * 2))
          } else {
            gainlevel = glmax.sub(glmin).mul(persent).add(glmin)
          }
        }

      }

      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(4)) {
        gainlevel = new Decimal(gainlevel.log2()).max(1)
      }

      gainlevel = gainlevel.round().max(1)

      gainlevel = gainlevel.mul(new Decimal(this.eachpipedsmalltrophy[2] / 5.0).pow_base(2))
      if (this.activechallengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2))
      return gainlevel;
    },

    configspendchip(i) {
      let maxspend = this.player.statues.statue[i] * this.player.statues.statue[i]
      let input = parseInt(window.prompt("消費数を設定:設定可能最大数:" + maxspend.toString(), ""))
      if (isNaN(input)) return
      if (input < 0 || input > maxspend) return
      this.player.chips.spendChip[i] = input
    },


    resetDarklevel() {
      let dv = 18 - this.player.crown.add(2).log2()
      dv = Math.max(dv, 1)
      let gaindarklevel = new Decimal(this.player.darkMoney.log10()).div(dv).pow_base(2).round()
      if (confirm('裏昇段リセットして、裏段位' + gaindarklevel + 'を得ますか？')) {
        this.player.darkMoney = new Decimal(0)
        this.player.darkGenerators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.darkGeneratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.darkGeneratorsCost = [
          new Decimal('1e100'),
          new Decimal('1e108'),
          new Decimal('1e127'),
          new Decimal('1e164'),
          new Decimal('1e225'),
          new Decimal('1e316'),
          new Decimal('1e443'),
          new Decimal('1e612')
        ]
        this.player.darkLevel = this.player.darkLevel.add(gaindarklevel)
      }
    },





    resetLevel(force, exit) {
      if (this.player.onChallenge && this.player.challenges.includes(0)) {
        if (this.player.money.lt(new Decimal('1e24'))) {
          alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
          return;
        }
      }

      let dividing = 19 - this.player.rank.add(2).log2()
      if (dividing < 1) dividing = 1
      let gainlevel = this.calcgainlevel()
      let rst = this.player.rankResetTime.add(1)
      if (this.player.onPerfectChallenge && this.player.perfectChallenges.includes(4)) {
        rst = rst.pow(0.1).round()
      }
      let gainlevelreset = rst.mul(1 + this.player.setChip[20]).mul(new Decimal(exit ? 0 : this.activechallengebonuses.includes(8) ? 2 : 1))


      if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {

        let disa = this.player.onPerfectChallenge && this.player.perfectChallenges.includes(9) && (!exit)
        if (this.player.onChallenge) {
          this.player.onChallenge = false;
          if (this.player.challenges.length >= 6) {
            this.player.trophies[3] = true;
          }
          let id = this.calcchallengeid()
          if (!this.player.challengeCleared.includes(id)) {
            this.player.challengeCleared.push(this.calcchallengeid())
            disa = false
          }
          this.activechallengebonuses = this.player.challengeBonuses;
        }

        if (disa) {
          let randomint = Math.floor(Math.random() * 100)
          this.player.chips.disableChip(randomint)
        }

        if (this.player.money.greaterThan(1e80)) {
          let money = this.player.money;
          if (this.chipthresholduse) money = money.min(this.chipthreshold)
          
          let bonus = new Decimal(10).pow(this.eachpipedsmalltrophy[7] * 0.4)
          if (this.player.activatedCampaigns.includes("tanabata2")) {
            bonus = bonus.mul(this.player.lightMoney.add(1))
          }
          console.log("gain chip bonus:" + bonus)

          const chipDoubleProb = 0.01 * (1 + 0.1 * this.eachpipedsmalltrophy[11])
          const isGw2 = this.player.activatedCampaigns.includes("gw2")

          this.player.chips.gainRandomChip(money.mul(bonus), chipDoubleProb, isGw2);
        }

        this.player.money = new Decimal(1)
        this.player.level = this.player.level.add(exit ? new Decimal(0) : gainlevel)
        this.player.levelResetTime = this.player.levelResetTime.add(gainlevelreset)
        this.player.maxLevelGained = this.player.maxLevelGained.max(exit ? new Decimal(0) : gainlevel)
        if (this.player.accelLevel > 0) {
          for (let i = 0; i < 8; i++) {
            let crystalnum = Math.floor(this.player.accelerators[i].log10()) - 10
            if (crystalnum < 0) crystalnum = 0
            if (crystalnum > 100) crystalnum = 100
            this.player.timeCrystal[i] = Math.max(this.player.timeCrystal[i], crystalnum)
          }

        }


        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsCost = [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ]


        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal('1e10'),
          new Decimal('1e20'),
          new Decimal('1e40'),
          new Decimal('1e80'),
          new Decimal('1e160'),
          new Decimal('1e320'),
          new Decimal('1e640'),
        ]

        this.player.tickSpeed = 1000

        if (this.activechallengebonuses.includes(0)) this.player.money = new Decimal(10001)
        if (this.activechallengebonuses.includes(1)) this.player.accelerators[0] = new Decimal(10)
        if (this.player.rankChallengeBonuses.includes(0)) this.player.money = this.player.money.add(new Decimal("1e9"))
        if (this.player.rankChallengeBonuses.includes(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256)



      }
    },

    resetLevelborder() {
      let p = (this.player.onChallenge && this.player.challenges.includes(0)) ? 24 : 18
      return new Decimal(10).pow(p)
    },

    resetRank(force) {

      if (this.player.onChallenge && this.player.challenges.includes(0)) {
        if (this.player.money.lt(this.rankdata.resetRankborder(this))) {
          alert('現在挑戦1が適用されているため、まだ昇階リセットができません。')
          return;
        }
      }

      let gainrank = this.rankdata.calcgainrank(this)
      if (force || confirm('昇階リセットして、階位' + gainrank + 'を得ますか？')) {

        if (this.player.onChallenge) {
          this.player.onChallenge = false;
          this.activechallengebonuses = this.player.challengeBonuses;
          if (this.player.challengeCleared.length >= 128 && !this.player.rankChallengeCleared.includes(this.calcchallengeid())) {
            this.player.rankChallengeCleared.push(this.calcchallengeid())
          }
        }

        this.player.money = new Decimal(1)
        this.player.level = new Decimal(0)
        this.player.levelResetTime = new Decimal(0)

        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsCost = [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ]


        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal('1e10'),
          new Decimal('1e20'),
          new Decimal('1e40'),
          new Decimal('1e80'),
          new Decimal('1e160'),
          new Decimal('1e320'),
          new Decimal('1e640'),
        ]

        this.player.tickSpeed = 1000

        this.player.rank = this.player.rank.add(gainrank)
        this.player.rankResetTime = this.player.rankResetTime.add((this.player.rankChallengeBonuses.includes(8) ? new Decimal(3) : new Decimal(1)).mul(this.player.setChip[24] + 1).mul(this.player.crownResetTime.add(1)))

        this.player.levelItems = [0, 0, 0, 0, 0]

        this.activechallengebonuses = this.player.challengeBonuses

        if (this.activechallengebonuses.includes(0)) this.player.money = new Decimal(10001)
        if (this.activechallengebonuses.includes(1)) this.player.accelerators[0] = new Decimal(10)
        if (this.player.rankChallengeBonuses.includes(0)) this.player.money = this.player.money.add(new Decimal("1e9"))
        if (this.player.rankChallengeBonuses.includes(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256)

      }
    },
    calcgaincrown() {
      let dv = 72
      return new Decimal(2).pow(this.player.money.log10() / dv).round()
    },
    resetCrownborder() {
      return new Decimal("1e216")
    },
    resetCrown(force) {
      if (this.player.onChallenge) {
        alert('現在挑戦中のため、昇冠リセットができません。')
        //あとで消す
        return;
      }
      if (this.player.onChallenge && this.player.challenges.includes(0)) {
        if (this.player.money.lt(this.resetCrownborder())) {
          alert('現在挑戦1が適用されているため、まだ昇冠リセットができません。')
          return;
        }
      }

      let gaincrown = this.calcgaincrown()
      if (force || confirm('昇冠リセットして、冠位' + gaincrown + 'を得ますか？')) {

        this.player.money = new Decimal(1)
        this.player.level = new Decimal(0)
        this.player.levelResetTime = new Decimal(0)

        this.player.rank = new Decimal(0)
        this.player.rankResetTime = new Decimal(0)

        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.generatorsCost = [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ]


        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        this.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal('1e10'),
          new Decimal('1e20'),
          new Decimal('1e40'),
          new Decimal('1e80'),
          new Decimal('1e160'),
          new Decimal('1e320'),
          new Decimal('1e640'),
        ]

        if (!force) {
          this.player.crown = this.player.crown.add(gaincrown)
          this.player.crownResetTime = this.player.crownResetTime.add(1)
        }

        this.player.tickSpeed = 1000

        this.player.levelItems = [0, 0, 0, 0, 0]

        this.activechallengebonuses = this.player.challengeBonuses

        if (this.activechallengebonuses.includes(0)) this.player.money = new Decimal(10001)
        if (this.activechallengebonuses.includes(1)) this.player.accelerators[0] = new Decimal(10)
        if (this.player.rankChallengeBonuses.includes(0)) this.player.money = this.player.money.add(new Decimal("1e9"))
        if (this.player.rankChallengeBonuses.includes(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256)

      }
    },


    calcchallengeid() {
      let challengeid = 0;
      for (let i = 0; i < 8; i++) {
        challengeid *= 2
        if (this.player.challenges.includes(i)) {
          challengeid += 1
        }
      }
      return challengeid;
    },
    getchallengeid(arr) {
      let challengeid = 0;
      for (let i = 0; i < 8; i++) {
        challengeid *= 2
        if (arr.includes(i)) {
          challengeid += 1
        }
      }
      return challengeid;
    },
    getpchallengeid(arr) {
      let challengeid = 0;
      for (let i = 9; i >= 0; i--) {
        challengeid *= 2
        if (arr.includes(i)) {
          challengeid += 1
        }
      }
      return challengeid;
    },
    configchallengeweightkind(i) {
      this.player.challengeWeight[i] = this.calcchallengeid()
    },
    configchallengeweightvalue(i) {
      let input = parseInt(window.prompt("重みを設定", ""))
      if (isNaN(input)) return
      this.player.challengeWeightValue[i] = input
    },
    showunclearedchallenges() {
      if (this.player.challengeCleared.length == 255) return;
      if (this.player.onChallenge) return;
      let challengeid = this.calcchallengeid();

      let challengeweightpairs = []
      for (let i = 1; i <= 255; i++) {
        let ans = 0;
        for (let j = 0; j < 20; j++) {

          if ((i | this.player.challengeWeight[j]) == i) {

            ans += this.player.challengeWeightValue[j]
          }
        }
        challengeweightpairs.push({
          id: i,
          weight: ans
        })
      }

      challengeweightpairs.sort((a, b) => a.weight - b.weight)

      console.log("challenge weights:", challengeweightpairs)

      do {
        if (challengeid == 0) {
          challengeid = challengeweightpairs[0].id
        } else {
          let idx = challengeweightpairs.findIndex((e) => e.id == challengeid) + 1
          if (idx == 255) idx = 0
          challengeid = challengeweightpairs[idx].id
        }
      } while (this.player.challengeCleared.includes(challengeid));

      this.player.challenges = this.calcchallengesarray(challengeid)
    },
    showunclearedrankchallenges() {
      if (this.player.rankChallengeCleared.length == 255) return;
      if (this.player.onChallenge) return;
      let challengeid = this.calcchallengeid();

      let challengeweightpairs = []
      for (let i = 1; i <= 255; i++) {
        let ans = 0;
        for (let j = 0; j < 20; j++) {

          if ((i | this.player.challengeWeight[j]) == i) {

            ans += this.player.challengeWeightValue[j]
          }
        }
        challengeweightpairs.push({
          id: i,
          weight: ans
        })
      }

      challengeweightpairs.sort((a, b) => a.weight - b.weight)

      do {
        if (challengeid == 0) {
          challengeid = challengeweightpairs[0].id
        } else {
          let idx = challengeweightpairs.findIndex((e) => e.id == challengeid) + 1
          if (idx == 255) idx = 0
          challengeid = challengeweightpairs[idx].id
        }
      } while (this.player.rankChallengeCleared.includes(challengeid));

      this.player.challenges = this.calcchallengesarray(challengeid)
    },
    calcchallengesarray(challengeid) {
      let ans = [];
      for (let i = 7; i >= 0; i--) {
        if (challengeid % 2 == 1) ans.push(i)
        challengeid = challengeid >>> 1
      }
      ans.sort()
      return ans
    },
    startChallenge() {
      let challengeid = this.calcchallengeid();

      if (challengeid == 0) {
        alert("挑戦が一つも選択されていません。")
        return;
      }

      let conf = '挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。'

      if (this.player.challengeCleared.includes(challengeid)) {
        if (this.player.challengeCleared.length < 128) {
          alert("すでに達成した挑戦です。")
          return;
        }
        conf = 'すでに達成した挑戦です。勲章は得られませんが、それでもよろしいですか？'
        if (this.player.rankChallengeCleared.includes(challengeid)) {
          conf = 'すでに階位挑戦としても達成した挑戦です。勲章や大勲章は得られませんが、それでもよろしいですか？'
        }
      }

      if (this.player.auto.autoDoChallenge || confirm(conf)) {
        if (!this.player.challengeBonuses.includes(4)) this.activechallengebonuses = [];
        this.resetLevel(true, true);
        this.player.onChallenge = true;
        if (this.player.challenges.includes(3)) {
          for (let i = 0; i < 8; i++) {
            this.player.generatorsMode[i] = 0
          }
        }
      }
    },
    startpChallenge() {

      if (!(this.player.challengeCleared.length >= 255 && this.player.rankChallengeCleared.length >= 255)) {
        alert("まだ挑戦や階位挑戦を完了していないので、完全挑戦を開始できません。")
        return;
      }

      if (this.player.onChallenge) {
        alert("現在挑戦中のため、完全挑戦を開始できません。")
        return;
      }

      for (let i = 0; i < 10; i++) {
        if (this.player.statues.statue[i] < this.player.perfectChallenges.length - i) {
          alert("像の作成数が不足しているため、完全挑戦を開始できません。")
          return;
        }
      }


      let conf = '完全挑戦を開始しますか？現在のポイントや発生器、段位や段位リセット、階位などは失われます。'

      if (confirm(conf)) {

        this.resetCrown(true);
        this.player.onPerfectChallenge = true;
        this.player.challengeCleared = []
        this.player.challengeBonuses = []
        this.player.rankChallengeCleared = []
        this.player.rankChallengeBonuses = []

      }
    },


    exitChallenge() {
      if (confirm('挑戦を諦めますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
        this.player.onChallenge = false;
        this.activechallengebonuses = this.player.challengeBonuses;
        this.calcgncost()
      }
    },

    exitpChallenge() {

      if (confirm('完全挑戦を中断しますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
        if (this.player.onChallenge) this.exitChallenge()
        this.player.onPerfectChallenge = false;
        this.player.perfectChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)] = Math.max(this.player.perfectChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)], this.player.challengeCleared.length)
        this.player.perfectRankChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)] = Math.max(this.player.perfectRankChallengeCleared[this.getpchallengeid(this.player.perfectChallenges)], this.player.rankChallengeCleared.length)
        this.player.challengeCleared = this.challengedata.challengeids
        this.player.rankChallengeCleared = this.challengedata.challengeids
        for (let i = 0; i < setchipnum; i++) {
          this.player.chips.disabledChip[i] = false
        }
        this.countpchallengecleared()



      }
    },



    gettrophyname(i) {
      return this.player.trophies[i] ? this.trophydata.contents[i] : "???"
    },
    moveworld(i) {
      // @ts-expect-error
      if (world == i || !this.worldopened[i]) return // bug
      this.save()
      this.load(i)
      this.world = i
    },
    shrinkworld(i) {
      if (4 > this.trophynumber[i]) {
        alert("実績が4つ未満なので、世界を収縮できません。")
        return
      }
      if (this.players[i].remember >= this.trophynumber[i]) {
        alert("実績が思い出より多くありません。")
        return
      }
      if (confirm("世界" + (i + 1) + "を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。")) {
        let u = this.trophynumber[i]
        let rg = this.players[i].rings
        let r = this.checkremembers()
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
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if (r >= 18) {
          for (let j = 0; j < this.rememberdata.givenchalenges[1].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if (r >= 19) {
          for (let j = 0; j < this.rememberdata.givenchalenges[2].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if (r >= 20) {
          for (let j = 0; j < this.rememberdata.givenchalenges[3].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[3][j]))
          }
        }
        if (r >= 21) {
          for (let j = 0; j < this.rememberdata.givenchalenges[4].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[4][j]))
          }
        }
        if (r >= 22) {
          for (let j = 0; j < this.rememberdata.givenchalenges[5].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[5][j]))
          }
        }
        if (r >= 23) {
          for (let j = 0; j < this.rememberdata.givenchalenges[6].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[6][j]))
          }
        }
        if (r >= 24) {
          for (let j = 0; j < this.rememberdata.givenchalenges[7].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[7][j]))
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
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[8][j]))
          }
        }
        if (r >= 35) this.players[i].maxlevelgained = new Decimal(3000)
        if (r >= 36) {
          for (let j = 0; j < this.rememberdata.givenchalenges[9].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[9][j]))
          }
        }
        if (r >= 37) this.players[i].maxlevelgained = new Decimal(10000)
        if (r >= 38) {
          for (let j = 0; j < this.rememberdata.givenchalenges[10].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[10][j]))
          }
        }
        if (r >= 39) this.players[i].maxlevelgained = new Decimal(30000)
        if (r >= 40) {
          for (let j = 0; j < this.rememberdata.givenchalenges[11].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[11][j]))
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
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[12][j]))
          }
        }
        if (r >= 48) {
          for (let j = 0; j < this.rememberdata.givenchalenges[13].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[13][j]))
          }
        }
        if (r >= 49) {
          for (let j = 0; j < this.rememberdata.givenchalenges[14].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[14][j]))
          }
        }
        if (r >= 50) {
          for (let j = 0; j < this.rememberdata.givenchalenges[15].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[15][j]))
          }
        }
        if (r >= 51) {
          for (let j = 0; j < this.rememberdata.givenchalenges[16].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[16][j]))
          }
        }
        if (r >= 52) {
          for (let j = 0; j < this.rememberdata.givenchalenges[17].length; j++) {
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[17][j]))
          }
        }
        if (r >= 53) {
          for (let j = 0; j < this.rememberdata.givenchalenges[0].length; j++) {
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if (r >= 54) {
          for (let j = 0; j < this.rememberdata.givenchalenges[1].length; j++) {
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if (r >= 55) {
          for (let j = 0; j < this.rememberdata.givenchalenges[2].length; j++) {
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if (r >= 56) {
          for (let j = 0; j < this.rememberdata.givenchalenges[3].length; j++) {
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[3][j]))
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

    calcmaxpipe() {
      if (this.player.trophies[9]) return 3
      if (this.player.trophies[7]) return 2
      return 1

    },

    openpipe(i) {
      let maxpipe = this.calcmaxpipe()

      if (this.player.worldPipe[i] >= maxpipe) return

      let havepipe = Math.floor((this.smalltrophy - 72) / 3)
      for (let j = 0; j < worldnum; j++) {
        havepipe -= this.player.worldPipe[j]
      }



      if (havepipe > 0 && this.player.worldPipe[i] < maxpipe) this.player.worldPipe[i] = this.player.worldPipe[i] + 1

    },

    confchecktrophies() {
      this.trophycheck = !this.trophycheck
    },

    checktrophies() {
      if (this.player.levelResetTime.greaterThan(0)) this.player.trophies[0] = true;
      if (this.player.rankResetTime.greaterThan(0)) this.player.trophies[1] = true;
      if (this.player.shine > 0) this.player.trophies[2] = true;
      if (this.player.challengeCleared.includes(238) || this.player.challengeCleared.length >= 100) this.player.trophies[3] = true;
      if (this.player.darkGenerators[0].greaterThan(0)) this.player.trophies[4] = true;
      if (this.player.brightness > 0) this.player.trophies[5] = true;
      if (this.player.remember > 0) this.player.trophies[6] = true;
      if (this.world == 0) {
        if (this.checkremembers() > 0) this.player.trophies[6] = true;
      }
      if (this.player.crownResetTime.greaterThan(0)) this.player.trophies[7] = true;
      if (this.player.lightGenerators[0].greaterThan(0)) this.player.trophies[8] = true;
      if (this.player.flicker > 0) this.player.trophies[9] = true;


      if (this.player.money.greaterThan(0)) this.player.smallTrophies1st[0] = true
      if (this.player.money.greaterThan(777)) this.player.smallTrophies1st[1] = true
      if (this.player.money.greaterThan(7777777)) this.player.smallTrophies1st[2] = true
      if (this.player.money.greaterThan("1e19")) this.player.smallTrophies1st[3] = true
      if (this.player.money.greaterThan("1e36")) this.player.smallTrophies1st[4] = true
      if (this.player.money.greaterThan("1e77")) this.player.smallTrophies1st[5] = true
      if (this.player.money.greaterThan("1e81")) this.player.smallTrophies1st[6] = true
      if (this.player.money.greaterThan("1e303")) this.player.smallTrophies1st[7] = true
      if (this.player.generatorsBought[0].greaterThan(0)) this.player.smallTrophies1st[8] = true
      if (this.player.generatorsBought[1].greaterThan(0)) this.player.smallTrophies1st[9] = true
      if (this.player.generatorsBought[2].greaterThan(0)) this.player.smallTrophies1st[10] = true
      if (this.player.generatorsBought[3].greaterThan(0)) this.player.smallTrophies1st[11] = true
      if (this.player.generatorsBought[4].greaterThan(0)) this.player.smallTrophies1st[12] = true
      if (this.player.generatorsBought[5].greaterThan(0)) this.player.smallTrophies1st[13] = true
      if (this.player.generatorsBought[6].greaterThan(0)) this.player.smallTrophies1st[14] = true
      if (this.player.generatorsBought[7].greaterThan(0)) this.player.smallTrophies1st[15] = true
      if (this.player.acceleratorsBought[0].greaterThan(0)) this.player.smallTrophies1st[16] = true
      if (this.player.acceleratorsBought[1].greaterThan(0)) this.player.smallTrophies1st[17] = true
      if (this.player.acceleratorsBought[2].greaterThan(0)) this.player.smallTrophies1st[18] = true
      if (this.player.acceleratorsBought[3].greaterThan(0)) this.player.smallTrophies1st[19] = true
      if (this.player.acceleratorsBought[4].greaterThan(0)) this.player.smallTrophies1st[20] = true
      if (this.player.acceleratorsBought[5].greaterThan(0)) this.player.smallTrophies1st[21] = true
      if (this.player.acceleratorsBought[6].greaterThan(0)) this.player.smallTrophies1st[22] = true
      if (this.player.acceleratorsBought[7].greaterThan(0)) this.player.smallTrophies1st[23] = true
      if (this.player.levelResetTime.greaterThan(200)) this.player.smallTrophies1st[24] = true
      if (this.player.levelResetTime.greaterThan(999)) this.player.smallTrophies1st[25] = true
      if (this.player.challengeCleared.includes(128)) this.player.smallTrophies1st[26] = true
      if (this.player.challengeCleared.includes(64)) this.player.smallTrophies1st[27] = true
      if (this.player.challengeCleared.includes(32)) this.player.smallTrophies1st[28] = true
      if (this.player.challengeCleared.includes(16)) this.player.smallTrophies1st[29] = true
      if (this.player.challengeCleared.includes(8)) this.player.smallTrophies1st[30] = true
      if (this.player.challengeCleared.includes(4)) this.player.smallTrophies1st[31] = true
      if (this.player.challengeCleared.includes(2)) this.player.smallTrophies1st[32] = true
      if (this.player.challengeCleared.includes(1)) this.player.smallTrophies1st[33] = true
      if (this.player.challengeCleared.length >= 32) this.player.smallTrophies1st[34] = true
      if (this.player.challengeCleared.length >= 64) this.player.smallTrophies1st[35] = true
      if (this.player.challengeCleared.length >= 96) this.player.smallTrophies1st[36] = true
      if (this.player.challengeCleared.length >= 128) this.player.smallTrophies1st[37] = true
      if (this.player.challengeCleared.length >= 160) this.player.smallTrophies1st[38] = true
      if (this.player.challengeCleared.length >= 192) this.player.smallTrophies1st[39] = true
      if (this.player.challengeCleared.length >= 224) this.player.smallTrophies1st[40] = true
      if (this.player.challengeCleared.length >= 255) this.player.smallTrophies1st[41] = true
      if (this.player.rankResetTime.greaterThan(1)) this.player.smallTrophies1st[42] = true
      if (this.player.rankResetTime.greaterThan(4)) this.player.smallTrophies1st[43] = true
      if (this.player.rankResetTime.greaterThan(9)) this.player.smallTrophies1st[44] = true
      if (this.player.rankResetTime.greaterThan(99)) this.player.smallTrophies1st[45] = true
      if (this.player.rankResetTime.greaterThan(999)) this.player.smallTrophies1st[46] = true
      if (this.player.levelItemBought >= 4) this.player.smallTrophies1st[47] = true
      if (this.player.levelItemBought >= 108) this.player.smallTrophies1st[48] = true
      if (this.player.levelItemBought >= 256) this.player.smallTrophies1st[49] = true
      if (this.player.levelItemBought >= 1728) this.player.smallTrophies1st[50] = true
      if (this.player.levelItemBought >= 12500) this.player.smallTrophies1st[51] = true
      if (this.player.shine >= 100) this.player.smallTrophies1st[52] = true
      if (this.player.shine >= 1000) this.player.smallTrophies1st[53] = true
      if (this.player.shine >= 10000) this.player.smallTrophies1st[54] = true
      if (this.player.shine >= 100000) this.player.smallTrophies1st[55] = true
      if (this.player.shine >= 1000000) this.player.smallTrophies1st[56] = true
      if (this.player.shine >= 10000000) this.player.smallTrophies1st[57] = true
      if (this.exported.length >= 2) this.player.smallTrophies1st[58] = true
      if (this.player.tweeting.length >= 2) this.player.smallTrophies1st[59] = true
      if (this.player.darkGenerators[0].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[60] = true
      if (this.player.darkGenerators[1].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[61] = true
      if (this.player.darkGenerators[2].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[62] = true
      if (this.player.darkGenerators[3].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[63] = true
      if (this.player.darkGenerators[4].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[64] = true
      if (this.player.darkGenerators[5].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[65] = true
      if (this.player.darkGenerators[6].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[66] = true
      if (this.player.darkGenerators[7].greaterThanOrEqualTo(1)) this.player.smallTrophies1st[67] = true
      if (this.player.rankChallengeCleared.length >= 32) this.player.smallTrophies1st[68] = true
      if (this.player.rankChallengeCleared.length >= 64) this.player.smallTrophies1st[69] = true
      if (this.player.rankChallengeCleared.length >= 96) this.player.smallTrophies1st[70] = true
      if (this.player.rankChallengeCleared.length >= 128) this.player.smallTrophies1st[71] = true
      if (this.player.rankChallengeCleared.length >= 160) this.player.smallTrophies1st[72] = true
      if (this.player.rankChallengeCleared.length >= 192) this.player.smallTrophies1st[73] = true
      if (this.player.rankChallengeCleared.length >= 224) this.player.smallTrophies1st[74] = true
      if (this.player.rankChallengeCleared.length >= 255) this.player.smallTrophies1st[75] = true
      if (this.player.brightness >= 10) this.player.smallTrophies1st[76] = true
      if (this.player.brightness >= 100) this.player.smallTrophies1st[77] = true
      if (this.player.brightness >= 1000) this.player.smallTrophies1st[78] = true
      if (this.player.brightness >= 10000) this.player.smallTrophies1st[79] = true
      if (this.player.darkMoney.greaterThanOrEqualTo(1)) this.player.smallTrophies1st[80] = true
      if (this.player.darkMoney.greaterThanOrEqualTo(777)) this.player.smallTrophies1st[81] = true
      if (this.player.darkMoney.greaterThanOrEqualTo(7777777)) this.player.smallTrophies1st[82] = true
      if (this.player.darkMoney.greaterThanOrEqualTo("1e18")) this.player.smallTrophies1st[83] = true
      if (this.player.darkMoney.greaterThanOrEqualTo("1e72")) this.player.smallTrophies1st[84] = true
      if (this.player.chip[0] > 0) this.player.smallTrophies1st[85] = true
      if (this.player.chip[0] >= 210) this.player.smallTrophies1st[86] = true
      if (this.player.chip[0] >= 1275) this.player.smallTrophies1st[87] = true
      if (this.player.chip[1] > 0) this.player.smallTrophies1st[88] = true
      if (this.player.chip[1] >= 210) this.player.smallTrophies1st[89] = true
      if (this.player.chip[1] >= 1275) this.player.smallTrophies1st[90] = true
      if (this.player.chip[2] > 0) this.player.smallTrophies1st[91] = true
      if (this.player.chip[2] >= 210) this.player.smallTrophies1st[92] = true
      if (this.player.chip[2] >= 1275) this.player.smallTrophies1st[93] = true
      if (this.player.chip[3] > 0) this.player.smallTrophies1st[94] = true
      if (this.player.chip[3] >= 210) this.player.smallTrophies1st[95] = true
      if (this.player.chip[3] >= 1275) this.player.smallTrophies1st[96] = true
      if (this.player.darkLevel.greaterThan(0)) this.player.smallTrophies1st[97] = true
      if (this.player.darkLevel.greaterThan('1e3')) this.player.smallTrophies1st[98] = true
      if (this.player.darkLevel.greaterThan('1e10')) this.player.smallTrophies1st[99] = true

      if (this.player.crownResetTime.gt(0)) {

        if (this.player.crownResetTime.gt(0)) this.player.smallTrophies2nd[0] = true
        if (this.player.crownResetTime.greaterThanOrEqualTo(5)) this.player.smallTrophies2nd[1] = true
        if (this.player.crownResetTime.greaterThanOrEqualTo(20)) this.player.smallTrophies2nd[2] = true
        if (this.player.crownResetTime.greaterThanOrEqualTo(100)) this.player.smallTrophies2nd[3] = true
        if (this.player.accelLevel >= 1) this.player.smallTrophies2nd[4] = true
        if (this.player.accelLevel >= 3) this.player.smallTrophies2nd[5] = true
        if (this.player.accelLevel >= 6) this.player.smallTrophies2nd[6] = true
        if (this.player.accelLevel >= 10) this.player.smallTrophies2nd[7] = true
        if (this.player.rank.gt('1e8')) this.player.smallTrophies2nd[8] = true
        if (this.player.rank.gt('1e10')) this.player.smallTrophies2nd[9] = true
        if (this.player.rank.gt('1e12')) this.player.smallTrophies2nd[10] = true
        if (this.player.lightGenerators[0].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[11] = true
        if (this.player.lightGenerators[1].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[12] = true
        if (this.player.lightGenerators[2].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[13] = true
        if (this.player.lightGenerators[3].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[14] = true
        if (this.player.lightGenerators[4].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[15] = true
        if (this.player.lightGenerators[5].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[16] = true
        if (this.player.lightGenerators[6].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[17] = true
        if (this.player.lightGenerators[7].greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[18] = true
        if (this.player.chip[4] > 0) this.player.smallTrophies2nd[19] = true
        if (this.player.chip[4] >= 210) this.player.smallTrophies2nd[20] = true
        if (this.player.chip[4] >= 1275) this.player.smallTrophies2nd[21] = true
        if (this.player.statues.statue[0] >= 10) this.player.smallTrophies2nd[22] = true
        if (this.player.statues.statue[1] >= 10) this.player.smallTrophies2nd[23] = true
        if (this.player.statues.statue[2] >= 10) this.player.smallTrophies2nd[24] = true
        if (this.player.statues.statue[3] >= 10) this.player.smallTrophies2nd[25] = true
        if (this.player.crown.greaterThanOrEqualTo(100)) this.player.smallTrophies2nd[26] = true
        if (this.player.crown.greaterThanOrEqualTo(10000)) this.player.smallTrophies2nd[27] = true
        if (this.player.crown.greaterThanOrEqualTo("1e8")) this.player.smallTrophies2nd[28] = true
        if (this.player.lightMoney.greaterThanOrEqualTo(1)) this.player.smallTrophies2nd[29] = true
        if (this.player.lightMoney.greaterThanOrEqualTo("1e9")) this.player.smallTrophies2nd[30] = true
        if (this.player.lightMoney.greaterThanOrEqualTo("1e18")) this.player.smallTrophies2nd[31] = true
        if (this.player.lightMoney.greaterThanOrEqualTo("1e36")) this.player.smallTrophies2nd[32] = true
        if (this.player.flicker >= 10) this.player.smallTrophies2nd[33] = true
        if (this.player.flicker >= 100) this.player.smallTrophies2nd[34] = true
        if (this.player.flicker >= 1000) this.player.smallTrophies2nd[35] = true
        if (this.player.flicker >= 10000) this.player.smallTrophies2nd[36] = true
        if (this.player.flicker >= 100000) this.player.smallTrophies2nd[37] = true
        if (this.player.flicker >= 1000000) this.player.smallTrophies2nd[38] = true
        if (this.player.chip[5] > 0) this.player.smallTrophies2nd[39] = true
        if (this.player.chip[5] >= 210) this.player.smallTrophies2nd[40] = true
        if (this.player.chip[5] >= 1275) this.player.smallTrophies2nd[41] = true
        if (this.player.chip[6] > 0) this.player.smallTrophies2nd[42] = true
        if (this.player.chip[6] >= 210) this.player.smallTrophies2nd[43] = true
        if (this.player.chip[6] >= 1275) this.player.smallTrophies2nd[44] = true
        if (this.player.statues.statue[4] >= 10) this.player.smallTrophies2nd[45] = true
        if (this.player.statues.statue[5] >= 10) this.player.smallTrophies2nd[46] = true
        if (this.player.statues.statue[6] >= 10) this.player.smallTrophies2nd[47] = true
        if (this.player.statues.statue[0] >= 64) this.player.smallTrophies2nd[48] = true
        if (this.player.statues.statue[1] >= 64) this.player.smallTrophies2nd[49] = true
        if (this.player.statues.statue[2] >= 64) this.player.smallTrophies2nd[50] = true
        if (this.player.statues.statue[3] >= 64) this.player.smallTrophies2nd[51] = true
        if (this.player.statues.statue[4] >= 64) this.player.smallTrophies2nd[52] = true
        if (this.player.statues.statue[5] >= 64) this.player.smallTrophies2nd[53] = true
        if (this.player.statues.statue[6] >= 64) this.player.smallTrophies2nd[54] = true
        if (this.player.shine >= 100000000) this.player.smallTrophies2nd[55] = true
        if (this.player.shine >= 1000000000) this.player.smallTrophies2nd[56] = true
        if (this.player.brightness >= 100000) this.player.smallTrophies2nd[57] = true
        if (this.player.brightness >= 1000000) this.player.smallTrophies2nd[58] = true




      }



    },

    buyspirit(i) {
      return
      this.player.spiritLevelA[i] += 1;
    },

    configautomission() {
      this.player.auto.autoRing = !this.player.auto.autoRing
      if (this.player.auto.autoRing) {
        this.automissiontimerid = setInterval(() => this.player.rings.autoplaymission(), 1000)
      } else {
        clearInterval(this.automissiontimerid)
        this.automissiontimerid = 0
      }
    },

    worktime(val) {
      if (0 <= val && val <= this.player.accelLevel && val >= this.calccampaigncosts()) {
        this.player.accelLevelUsed = val
      }
    },

    calccampaigncosts() {
      let sum = 0
      let date = new Date()
      for (const campaignsId of this.player.activatedCampaigns) {
        const campaign = Campaign.campaigns[campaignsId];
        if (campaign == undefined) continue;
        if (Campaign.isDuring(campaign, date)) continue;
        sum += campaign.cost;
      }
      return sum;
    },

    choosecampaigns(name) {

      if (this.player.activatedCampaigns.includes(name)) {
        this.player.activatedCampaigns.splice(this.player.activatedCampaigns.indexOf(name), 1)
      } else {
        if (this.calccampaigncosts() + (Campaign.campaigns[name]?.cost ?? 0) > this.player.accelLevelUsed) return;
        this.player.activatedCampaigns.push(name)
      }

    },

    activateintimecampaign() {
      let date = new Date()

      for (const campaingId in Campaign.campaigns) {
        if (!Campaign.isDuring(Campaign.campaigns[campaingId], date)) continue;
        if (this.player.activatedCampaigns.includes(campaingId)) continue;
        this.player.activatedCampaigns.push(campaingId);
      }
    },

    counttrophies(index) {
      let cnt = 0
      for (let i = 0; i < trophynum; i++) {
        if (this.players[index].trophies[i]) cnt++;
      }
      this.trophynumber[index] = cnt

      if (this.trophynumber[0] >= 6) this.players[0].remember = Math.max(this.players[0].remember, this.trophynumber[0])

    },
    checkpipedsmalltrophies() {
      let sum = 0
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
          this.eachpipedsmalltrophy[i] = cnt;
          sum += cnt
        } else {
          this.eachpipedsmalltrophy[i] = 0;
        }
      }
      this.pipedsmalltrophy = sum
    },
    countsmalltrophies(index) {
      let cnt = 0;
      for (let i = 0; i < 100; i++) {
        if (this.player.smallTrophies1st[i]) cnt++;
      }
      for (let i = 0; i < 100; i++) {
        if (this.player.smallTrophies2nd[i]) cnt++;
      }
      this.smalltrophy = cnt
    },
    checkmemories() {
      let cnt = 0;

      for (let i = 0; i < worldnum; i++) {
        this.counttrophies(i)
        if (this.world == i) continue
        cnt += this.trophynumber[i]
      }
      this.memorysum = cnt
    },
    checkremembers() {
      let cnt = 0;
      for (let i = this.world + 1; i < worldnum; i++) {
        cnt += this.players[i].remember
      }

      return this.remembersum = cnt
    },
    checkworlds() {

      this.worldopened[0] = true
      if (new Decimal(this.players[0].crownresettime).gt(0)) {
        for (let i = 1; i < 10; i++) {
          this.worldopened[i] = true
        }
      }

      if (this.players[0].challengecleared.includes(238)) this.worldopened[1] = true
      if (this.players[0].challengecleared.length >= 100) this.worldopened[2] = true
      if (this.players[0].rankchallengecleared.length >= 16) this.worldopened[3] = true
      if (this.players[0].levelitembought >= 12500) this.worldopened[4] = true
      if (new Decimal(this.players[0].darkmoney).greaterThanOrEqualTo('1e8')) this.worldopened[5] = true
      if (new Decimal(this.players[0].rank).greaterThanOrEqualTo(262142)) this.worldopened[6] = true
      if (this.players[0].rankchallengecleared.includes(238)) this.worldopened[7] = true
      if (this.players[0].challengecleared.length >= 200) this.worldopened[8] = true
      if (this.players[0].rankchallengecleared.length >= 200) this.worldopened[9] = true

      if (new Decimal(this.players[0].crownresettime).gt(0)) {
        for (let i = 1; i < 10; i++) {
          this.worldopened[i] = true
        }
      }

      if (new Decimal(this.players[0].lightmoney).greaterThanOrEqualTo('1e8')) this.worldopened[10] = true
      if (this.players[0].statue[2] >= 16) this.worldopened[11] = true



    },

    toFormated(dec, exp) {
      if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber()
      else return dec.toExponential(3)
    }

  },

  mounted() {
    this.dataload();
    this.load(0);

    this.checkmemories();
    this.checkworlds();

    this.time = Date.now()


    setTimeout(this.update, this.player.tickSpeed);
    setInterval(this.save, 20000);

  },
}));
app.config.globalProperties.Rings = Rings;
app.config.globalProperties.Chips = Chips;
app.config.globalProperties.Campaign = Campaign;
app.mount('#app');