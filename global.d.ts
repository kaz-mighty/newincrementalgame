/* external library */

declare var Vue: typeof import("vue");
declare var Decimal: typeof import("break_infinity.js").default;
declare var deepmerge: typeof import("deepmerge");
declare function isPlainObject(o: any): boolean;


/* 毎回importするのが面倒なので再定義する 
   無駄が多そうに見えるが、これ以上良い方法は見つからなかった
*/
type Decimal = import("break_infinity.js").default;
namespace Vue {
  type Ref<T> = import("vue").Ref<T>;
  type ComputedRef<T> = import("vue").ComputedRef<T>;
  type MaybeRef<T> = import("vue").MaybeRef<T>;
}


/* SaveData types */

type RingSaveData = {
  setrings: number[];
  ringsexp: number[];
  onmission: boolean;
  missionid: number;
  missionstate: {
    turn: number;
    activering: number;
    skilllog: [number, number][];
    flowerpoint: number;
    snowpoint: number;
    moonpoint: number;
    flowermultiplier: number;
    snowmultiplier: number;
    moonmultiplier: number;
    tps: number[];
    fieldeffect: [fieldId: number, value: number][];
  };
  clearedmission: number[];
  auto: {
    doauto: boolean;
    automissionid: number;
  };
  outsideauto: {
    autospendshine: boolean;
    autospendshinenumber: number;
    autospendbright: boolean;
    autospendbrightnumber: number;
    autodarklevelreset: boolean;
    autodarklevelresetborder: number;
    autodochallenge: boolean;
  };
};

type PlayerSaveData = {
  money: Decimal;
  level: Decimal;
  levelresettime: Decimal;
  maxlevelgained: Decimal;
  token: number;
  shine: number;
  brightness: number;
  flicker: number;

  shineloader: number[];
  brightloader: number[];

  residue: number;

  rank: Decimal;
  rankresettime: Decimal;

  crown: Decimal;
  crownresettime: Decimal;

  ranktoken: number;

  generators: Decimal[];
  generatorsBought: Decimal[];
  generatorsCost: Decimal[];
  generatorsMode: number[];

  accelerators: Decimal[];
  acceleratorsBought: Decimal[];
  acceleratorsCost: Decimal[];

  darkmoney: Decimal;

  darkgenerators: Decimal[];
  darkgeneratorsBought: Decimal[];
  darkgeneratorsCost: Decimal[];

  darklevel: Decimal;

  lightmoney: Decimal,

  lightgenerators: Decimal[];
  lightgeneratorsBought: Decimal[];
  lightgeneratorsCost: Decimal[];

  tickspeed: number;
  accelevel: number;
  accelevelused: number;
  activatedcampaigns: string[],
  timecrystal: number[];
  saveversion: number;

  currenttab: string;
  tweeting: string[];

  onchallenge: boolean;
  challenges: number[];
  challengecleared: number[];
  challengebonuses: number[];

  challengeweight: number[];
  challengeweightvalue: number[];

  onpchallenge: boolean;
  pchallenges: number[];
  pchallengecleared: number[];
  prchallengecleared: number[];

  boughttype: boolean[];
  setmodes: number[];
  setchallengebonusesfst: number[];
  setchallengebonusessnd: number[];
  setrankchallengebonusesfst: number[];
  setrankchallengebonusessnd: number[];

  rankchallengecleared: number[];
  rankchallengebonuses: number[];

  trophies: boolean[];
  smalltrophies: boolean[];
  smalltrophies2nd: boolean[];

  levelitems: number[];
  levelitembought: number;

  remember: number;
  rememberspent: number;
  rememberforgot: number;

  chip: number[];
  setchip: number[];
  disabledchip: boolean[];
  spendchip: number[];

  statue: number[];
  polishedstatue: number[];
  polishedstatuebr: number[];

  spiritlevela: number[];
  spiritboughtcurrentcrown: number[];

  setchiptypefst: number[];

  worldpipe: number[];
  rings: RingSaveData;
};
