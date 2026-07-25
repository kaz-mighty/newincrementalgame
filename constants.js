const version = 2;
const trophynum = 12;
const setchipkind = 10;
const setchipnum = 100;
const ringmissionnum = 15;

const worldnum = 12;

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

    shineloader: new Array(8).fill(null).map(() => 0),
    brightloader: new Array(8).fill(null).map(() => 0),

    residue: 0,

    rank: new Decimal(0),
    rankresettime: new Decimal(0),

    crown: new Decimal(0),
    crownresettime: new Decimal(0),

    ranktoken: 0,

    // 印石（スート）システム
    markstone: {
      club: 0, // 杖印石
      clubGainedSinceCrownReset: 0, // 冠位リセット後に入手した杖印石の数
      diamond: 0, // 貨印石
      diamondGainedSinceCrownReset: 0, // 冠位リセット後に入手した貨印石の数
      heart: 0, // 杯印石
      heartGainedSinceCrownReset: 0, // 冠位リセット後に入手した杯印石の数
      spade: 0, // 剣印石
      spadeGainedSinceCrownReset: 0, // 冠位リセット後に入手した剣印石の数
      ticksSinceRankReset: 0, // 階位リセット後のtick数
      selectedType: 0, // 選択中の印石タイプ: 0=杖, 1=貨, 2=杯, 3=剣
      greatClub: 0, // 大杖印石
      greatDiamond: 0, // 大貨印石（将来用）
      greatHeart: 0, // 大杯印石（将来用）
      greatSpade: 0, // 大剣印石（将来用）
      calibration: {
        active: false, // 較正モードON/OFF
        selectedEnemy: 0, // 選択中の矛盾: 0=矛盾1, 1=矛盾2
        enemyHp: 100, // 矛盾の現在矛盾度
        enemyLevel: 1, // 矛盾のレベル（コンソールから変更）
        cooldown: 0, // 再戦までの待機tick
        totalDamage: 0, // 合計与ダメージ
        achievements: 0, // 成果
        shopUpgrades: [false, false, false, false, false, false, false], // 成果ショップ購入状態
        resolutions: [0, 0, 0], // 矛盾の解決数（0=解決1, 1=解決2, 2=解決3）
      },
    },

    generators: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsCost: [
      new Decimal(1),
      new Decimal("1e4"),
      new Decimal("1e9"),
      new Decimal("1e16"),
      new Decimal("1e25"),
      new Decimal("1e36"),
      new Decimal("1e49"),
      new Decimal("1e64"),
    ],
    generatorsMode: new Array(8).fill(null).map((_, i) => i),

    accelerators: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsCost: [
      new Decimal(10),
      new Decimal("1e10"),
      new Decimal("1e20"),
      new Decimal("1e40"),
      new Decimal("1e80"),
      new Decimal("1e160"),
      new Decimal("1e320"),
      new Decimal("1e640"),
    ],

    darkmoney: new Decimal(0),

    darkgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsCost: [
      new Decimal("1e100"),
      new Decimal("1e108"),
      new Decimal("1e127"),
      new Decimal("1e164"),
      new Decimal("1e225"),
      new Decimal("1e316"),
      new Decimal("1e443"),
      new Decimal("1e612"),
    ],

    darklevel: new Decimal(0),

    lightmoney: new Decimal(0),

    lightgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsCost: [
      new Decimal("1e200"),
      new Decimal("1e216"),
      new Decimal("1e281"),
      new Decimal("1e456"),
      new Decimal("1e825"),
      new Decimal("1e1496"),
      new Decimal("1e2601"),
      new Decimal("1e4296"),
    ],

    tickspeed: 1000,
    accelevel: 0,
    accelevelused: 0,
    activatedcampaigns: [],
    timecrystal: new Array(8).fill(null).map(() => 0),
    saveversion: version,

    currenttab: "basic",
    tweeting: ["money"],

    onchallenge: false,
    challenges: [],
    challengecleared: [],
    challengebonuses: [],

    challengeweight: new Array(20).fill(null).map(() => 0),
    challengeweightvalue: new Array(20).fill(null).map(() => 0),

    onpchallenge: false,
    pchallenges: [],
    pchallengecleared: new Array(1024).fill(null).map(() => 0),
    prchallengecleared: new Array(1024).fill(null).map(() => 0),

    boughttype: [false, false, false, false, false, false],
    setmodes: new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst: [],
    setchallengebonusessnd: [],
    setrankchallengebonusesfst: [],
    setrankchallengebonusessnd: [],

    rankchallengecleared: [],
    rankchallengebonuses: [],

    trophies: new Array(trophynum).fill(null).map(() => false),
    smalltrophies: new Array(100).fill(null).map(() => false),
    smalltrophies2nd: new Array(100).fill(null).map(() => false),

    levelitems: [0, 0, 0, 0, 0],
    levelitembought: 0,

    remember: 0,
    rememberspent: 0,
    rememberforgot: 0,

    chip: new Array(setchipkind).fill(0).map(() => 0),
    setchip: new Array(setchipnum).fill(0).map(() => 0),
    disabledchip: new Array(setchipnum).fill(0).map(() => false),
    spendchip: new Array(setchipkind).fill(0).map(() => 0),

    statue: new Array(setchipkind).fill(0).map(() => 0),
    polishedstatue: new Array(setchipkind).fill(0).map(() => 0),
    polishedstatuebr: new Array(setchipkind).fill(0).map(() => 0),

    spiritlevela: new Array(1).fill(0).map(() => 0),
    spiritboughtcurrentcrown: new Array(1).fill(0).map(() => 0),

    setchiptypefst: new Array(100).fill(setchipnum).map(() => 0),

    worldpipe: new Array(worldnum).fill(null).map(() => 0),
    rings: {
      setrings: [],
      ringsexp: new Array(13).fill(null).map(() => 0),
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
        autodochallenge: false,
      },
    },
  };
};
