class Ring {
  static statusDataType = [
    [17, 10, 10, 5, 1, 1, 12],//51
    [9, 15, 9, 2, 6, 2, 12],//53
    [8, 8, 13, 3, 3, 7, 12],//55
    [12, 12, 7, 4, 4, 1, 15],//49
    [10, 6, 10, 5, 2, 5, 15],//50
    [5, 8, 8, 3, 6, 6, 15],//51
  ];

  static levelTable = [
    0, 14, 67, 189, 417, 796, 1385, 2256, 3495, 5194,
    7449, 10367, 14064, 18673, 24338, 31213, 39456, 49232, 60719, 74105,
    89597, 107407, 127757, 150872, 176987, 206352, 239230, 275897, 316633, 361726,
    411470, 466173, 526159, 591762, 663324, 741194, 825727, 917289, 1016263, 1123042,
    1238030, 1361637, 1494279, 1636380, 1788381, 1950737, 2123911, 2308375, 2504604, 2713085,
    2934314, 3168807, 3417087, 3679688, 3957145, 4250004, 4558822, 4884172, 5226639, 5586815,
    5965299, 6362697, 6779625, 7216713, 7674605, 8153958, 8655429, 9179685, 9727401, 10299267,
    10895987, 11518275, 12166853, 12842447, 13545792, 14277637, 15038744, 15829888, 16651852, 17505424,
    18391398, 19310581, 20263796, 21251876, 22275666, 23336015, 24433777, 25569820, 26745022, 27960279,
    29216495, 30514581, 31855451, 33240033, 34669264, 36144098, 37665500, 39234441, 40851900, Infinity
  ];
  /*:generation
  new Array(99).fill(null).map((n,i) => Math.sin(i)*5 + i*10)
  .map((sum = 0, n => sum += n))
  .map((sum = 0, n => sum += n))
  .map((sum = 0, n => sum += n))
  .map((v) => Math.floor(v))
  */

  /** @type {{[x: number]: number}[]} */
  static levelSkills = [
    {
      1: 0,
      5: 1,
      8: 4,
      12: 7,
      17: 10,
      23: 13,
    },
    {
      1: 0,
      5: 2,
      8: 5,
      12: 8,
      17: 11,
      23: 14,
    },
    {
      1: 0,
      5: 3,
      8: 6,
      12: 9,
      17: 12,
      23: 15,
    },
    {
      1: 0,
      4: 1,
      6: 2,
      8: 4,
      10: 5,
      12: 7,
      14: 8
    },
    {
      1: 0,
      4: 1,
      6: 3,
      8: 4,
      10: 6,
      12: 7,
      14: 9
    },
    {
      1: 0,
      4: 2,
      6: 3,
      8: 5,
      10: 6,
      12: 8,
      14: 9
    },
  ];

  static missionInfo = [
    {
      //id:0
      name: "試練1",
      turn: 5,
      goal: 500,
      exp: 12,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: []
    },
    {
      //id:1
      name: "試練2",
      turn: 10,
      goal: 1500,
      exp: 30,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [0]
    },
    {
      //id:2
      name: "試練3",
      turn: 15,
      goal: 3000,
      exp: 48,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [1]
    },
    {
      //id:3
      name: "試練4",
      turn: 20,
      goal: 6000,
      exp: 90,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [2]
    },
    {
      //id:4
      name: "試練5",
      turn: 20,
      goal: 12000,
      exp: 120,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [3],
    },
    {
      //id:5
      name: "花試練1",
      turn: 10,
      goal: 7000,
      exp: 80,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [1],
      preventchallenge: [4]
    },
    {
      //id:6
      name: "雪試練1",
      turn: 10,
      goal: 7000,
      exp: 80,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [2],
      preventchallenge: [4],
    },
    {
      //id:7
      name: "月試練1",
      turn: 10,
      goal: 7000,
      exp: 80,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [3],
      preventchallenge: [4]
    },
    {
      //id:8
      name: "花試練2",
      turn: 20,
      goal: 23000,
      exp: 200,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [1],
      preventchallenge: [5]
    },
    {
      //id:9
      name: "雪試練2",
      turn: 20,
      goal: 23000,
      exp: 200,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [2],
      preventchallenge: [6],
    },
    {
      //id:10
      name: "月試練2",
      turn: 20,
      goal: 23000,
      exp: 200,
      setsizemin: 1,
      setsizemax: 1,
      passivefunction: [3],
      preventchallenge: [7]
    },
    {
      //id:11
      name: "試練6",
      turn: 20,
      goal: 65000,
      exp: 360,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [8, 9, 10],
    },
    {
      //id:12
      name: "試練7",
      turn: 20,
      goal: 140000,
      exp: 480,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [11],
    },
    {
      //id:13
      name: "試練8",
      turn: 30,
      goal: 350000,
      exp: 1920,
      setsizemin: 1,
      setsizemax: 3,
      passivefunction: [],
      preventchallenge: [12],
    },
  ];

  static fieldEffects = [
    {
      id: 1,
      timing: "skilluse",
      effect: (v) => {
        if (v.prop == 'flowerPoint') v.value = Math.floor(v.value * 1.5);
      },
      description: "花の評価上昇量1.5倍"
    },
    {
      id: 2,
      timing: "skilluse",
      effect: (v) => {
        if (v.prop == 'snowPoint') v.value = Math.floor(v.value * 1.5);
      },
      description: "雪の評価上昇量1.5倍"
    },
    {
      id: 3,
      timing: "skilluse",
      effect: (v) => {
        if (v.prop == 'moonPoint') v.value = Math.floor(v.value * 1.5);
      },
      description: "月の評価上昇量1.5倍"
    },
    {
      id: 4,
      timing: "turnend",
      effect: (v, val) => {
        v.flowerPoint += val;
      },
      description: "花の評価上昇"
    },
    {
      id: 5,
      timing: "turnend",
      effect: (v, val) => {
        v.snowPoint += val;
      },
      description: "雪の評価上昇"
    },
    {
      id: 6,
      timing: "turnend",
      effect: (v, val) => {
        v.moonPoint += val;
      },
      description: "月の評価上昇"
    },
  ];

  static skills = [
    {
      name: "通常",
      tp: 0,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('flowerPoint', Math.floor(state.flowerMultiplier * Ring.getStatus(ringid, 0, level)));
        rings.affect('snowPoint', Math.floor(state.snowMultiplier * Ring.getStatus(ringid, 1, level)));
        rings.affect('moonPoint', Math.floor(state.moonMultiplier * Ring.getStatus(ringid, 2, level)));

      },
    },
    {
      name: "花増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('flowerMultiplier', Ring.getStatus(ringid, 3, level) * 0.01);
      }
    },
    {
      name: "雪増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('snowMultiplier', Ring.getStatus(ringid, 4, level) * 0.01);
      }
    },
    {
      name: "月増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('moonMultiplier', Ring.getStatus(ringid, 5, level) * 0.01);
      }
    },
    //id:4
    {
      name: "花昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('flowerPoint', Math.floor(state.flowerMultiplier * Ring.getStatus(ringid, 0, level) * 5));
      }
    },
    {
      name: "雪昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('snowPoint', Math.floor(state.snowMultiplier * Ring.getStatus(ringid, 1, level) * 5));
      }
    },
    {
      name: "月昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('moonPoint', Math.floor(state.moonMultiplier * Ring.getStatus(ringid, 2, level) * 5));
      }
    },
    //id:7
    {
      name: "花爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('flowerPoint', Math.floor(state.flowerMultiplier * Ring.getStatus(ringid, 0, level) * 12));
        rings.affect('flowerMultiplier', Math.max(-0.20, 0.50 - state.flowerMultiplier));
      }
    },
    {
      name: "雪爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('snowPoint', Math.floor(state.snowMultiplier * Ring.getStatus(ringid, 1, level) * 12));
        rings.affect('snowMultiplier', Math.max(-0.20, 0.50 - state.snowMultiplier));
      }
    },
    {
      name: "月爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('moonPoint', Math.floor(state.moonMultiplier * Ring.getStatus(ringid, 2, level) * 12));
        rings.affect('moonMultiplier', Math.max(-0.20, 0.50 - state.moonMultiplier));
      }
    },
    //id:10
    {
      name: "花拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('flowerMultiplier', -0.20);
        rings.affect('snowMultiplier', 0.10);
        rings.affect('moonMultiplier', 0.10);
      }
    },
    {
      name: "雪拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('snowMultiplier', -0.20);
        rings.affect('flowerMultiplier', 0.10);
        rings.affect('moonMultiplier', 0.10);
      }
    },
    {
      name: "月拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affect('moonMultiplier', -0.20);
        rings.affect('flowerMultiplier', 0.10);
        rings.affect('snowMultiplier', 0.10);
      }
    },
    //id:13
    {
      name: "花充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affectField(4, Math.floor(state.flowerMultiplier * Ring.getStatus(ringid, 0, level)));
      }
    },
    {
      name: "雪充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affectField(5, Math.floor(state.snowMultiplier * Ring.getStatus(ringid, 1, level)));
      }
    },
    {
      name: "月充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionState;
        let ringid = rings.setRings[state.activeRing];
        let level = rings.getLevel(ringid);
        rings.affectField(6, Math.floor(state.moonMultiplier * Ring.getStatus(ringid, 2, level)));
      }
    },
  ];

  /** @param {number} fst */
  static statusTable(fst) {
    let ret = [fst];

    for (let i = 1; i < 98; i++) {
      ret[i] = ret[i - 1] * 1.05 + fst * 0.1;
    }
    for (let i = 0; i < 99; i++) {
      ret[i] = Math.floor(ret[i] * fst * 0.1);
    }
    return ret;
  }

  /**
   * @param {number} ringId 
   * @param {number} statusId 
   * @param {number} level 
   */
  static getStatus(ringId, statusId, level) {
    return Ring.statusTable(Ring.statusDataType[ringId][statusId])[level - 1];
  }

  static levelCap() {
    return 30;
  }

  /** @param {RingSaveData} ringData */
  constructor(ringData) {
    this.setRings = Array.from(ringData.setrings);
    this.ringsExp = Array.from(ringData.ringsexp);
    this.onMission = ringData.onmission;
    this.missionId = ringData.missionid;
    this.missionState = {
      turn: ringData.missionstate.turn,
      activeRing: ringData.missionstate.activering,
      skillLog: Array.from(ringData.missionstate.skilllog),
      flowerPoint: ringData.missionstate.flowerpoint,
      snowPoint: ringData.missionstate.snowpoint,
      moonPoint: ringData.missionstate.moonpoint,
      flowerMultiplier: ringData.missionstate.flowermultiplier,
      snowMultiplier: ringData.missionstate.snowmultiplier,
      moonMultiplier: ringData.missionstate.moonmultiplier,
      tps: Array.from(ringData.missionstate.tps),
      fieldEffect: Array.from(ringData.missionstate.fieldeffect),
    };
    this.clearedMission = ringData.clearedmission;
    this.unUsed = {
      automissionid: ringData.auto.automissionid,
    };
  }

  /**
   * @param {Player} player
   * @return {RingSaveData}
   */
  toSaveObject(player) {
    return {
      setrings: Array.from(this.setRings),
      ringsexp: Array.from(this.ringsExp),
      onmission: this.onMission,
      missionid: this.missionId,
      missionstate: {
        turn: this.missionState.turn,
        activering: this.missionState.activeRing,
        skilllog: this.missionState.skillLog.map(array => [...array]),  // 二次元配列 deep copy
        flowerpoint: this.missionState.flowerPoint,
        snowpoint: this.missionState.snowPoint,
        moonpoint: this.missionState.moonPoint,
        flowermultiplier: this.missionState.flowerMultiplier,
        snowmultiplier: this.missionState.snowMultiplier,
        moonmultiplier: this.missionState.moonMultiplier,
        tps: Array.from(this.missionState.tps),
        fieldeffect: this.missionState.fieldEffect.map(array => [...array]),
      },
      clearedmission: Array.from(this.clearedMission),
      auto: {
        doauto: player.auto.autoRing,
        automissionid: this.unUsed.automissionid,
      },
      outsideauto: {
        autospendshine: player.auto.autoSpendShine,
        autospendshinenumber: player.auto.autoSpendShineNumber,
        autospendbright: player.auto.autoSpendBright,
        autospendbrightnumber: player.auto.autoSpendBrightNumber,
        autodarklevelreset: player.auto.autoDarkLevelReset,
        autodarklevelresetborder: player.auto.autoDarkLevelResetBorder,
        autodochallenge: player.auto.autoDoChallenge,
      },
    };
  }

  /** @param {number} ringId */
  getLevel(ringId) {
    let exp = this.ringsExp[ringId];
    let lv = 0;
    for (let i = 0; i < Ring.levelTable.length; i++) {
      if (exp >= Ring.levelTable[i]) {
        lv = i;
      }
    }
    lv += 1;
    return Math.min(lv, Ring.levelCap());
  }

  /** @param {number} statusId */
  shortGetStatus(statusId) {
    const ringId = this.setRings[this.missionState.activeRing];
    return Ring.getStatus(ringId, statusId, this.getLevel(ringId));
  }

  /** @param {number} ringId */
  availableSkills(ringId) {
    let ret = [];
    let level = this.getLevel(ringId);
    for (let i in Ring.levelSkills[ringId]) {
      if (Number(i) <= level) {
        ret.push(Ring.levelSkills[ringId][i]);
      }
    }
    return ret;
  }

  /**
   * @param {string} property
   * @param {number} value
   */
  affect(property, value) {
    let v = {
      state: this.missionState,
      prop: property,
      value: value,
    };
    for (let e of this.missionState.fieldEffect) {
      // @ts-expect-error
      if (e[0].timing == "skilluse") { // bug
        const eff = Ring.fieldEffects.find((elem) => elem.id == e[0]);
        eff.effect(v);
      }
    }
    this.missionState[v.prop] += v.value;
  }

  /**
   * @param {number} fieldId 
   * @param {number} value 
   */
  affectField(fieldId, value) {
    this.missionState.fieldEffect.push([fieldId, value]);
  }

  /** 
   * @param {number} worldId
   * @param {number} ringId
   */
  isAvailableRing(worldId, ringId) {
    if (ringId == 0 || ringId == 1 || ringId == 2) return true;
    if (worldId >= 3) return false;
    if (ringId == worldId + 3) {
      if (this.clearedMission.includes(4)) return true;
    }
    return false;
  }

  /**
   * @param {number} worldId 
   * @param {number} ringId 
   */
  configSetRings(worldId, ringId) {
    if (this.onMission) return;
    if (!this.isAvailableRing(worldId, ringId)) return;
    if (this.setRings.includes(ringId)) {
      this.setRings.splice(this.setRings.indexOf(ringId), 1);
    } else {
      this.setRings.push(ringId);
    }
  }

  autoPlayMission() {
    if (this.missionState.turn >= Ring.missionInfo[this.missionId].turn) this.endMission();
    if (this.onMission) {
      this.useSkill(0);
    } else {
      this.startMission(this.missionId);
    }
  }

  /** @param {number} missionId */
  isAvailableMission(missionId) {
    return Ring.missionInfo[missionId].preventchallenge.every((v) => this.clearedMission.includes(v));
  }

  /** @param {number} missionId */
  startMission(missionId) {
    if (this.setRings.length < Ring.missionInfo[missionId].setsizemin || Ring.missionInfo[missionId].setsizemax < this.setRings.length) return;
    if (this.onMission) return;
    this.onMission = true;
    this.missionId = missionId;
    this.missionState.turn = 0;
    this.missionState.activeRing = 0;
    this.missionState.flowerPoint = 0;
    this.missionState.snowPoint = 0;
    this.missionState.moonPoint = 0;
    this.missionState.flowerMultiplier = 1;
    this.missionState.snowMultiplier = 1;
    this.missionState.moonMultiplier = 1;
    this.missionState.skillLog = [];
    this.missionState.tps = [];
    for (let r of this.setRings) {
      let lv = this.getLevel(r);
      this.missionState.tps.push(Ring.getStatus(r, 6, lv));//6:tp status id
    }
    this.missionState.fieldEffect = [];
    console.log("Starting mission:" + missionId);
    for (let e of Ring.missionInfo[missionId].passivefunction) {
      this.missionState.fieldEffect.push([e, -1]);
    }
  }

  /** @param {number} skillId */
  useSkill(skillId) {
    let ringId = this.setRings[this.missionState.activeRing];
    let skill = Ring.skills[this.availableSkills(ringId)[skillId]];
    if (skill.tp > this.missionState.tps[this.missionState.activeRing]) return;
    skill.effect(this);
    this.missionState.tps[this.missionState.activeRing] -= skill.tp;
    this.missionState.skillLog.push([this.setRings[this.missionState.activeRing], skillId]);

    this.missionState.activeRing++;
    if (this.missionState.activeRing == this.setRings.length) {
      this.missionState.activeRing = 0;
      this.missionState.turn++;
      for (let e of this.missionState.fieldEffect) {
        let eff = Ring.fieldEffects.find((elem) => elem.id == e[0]);
        if (eff.timing == "turnend") {
          eff.effect(this.missionState, e[1]);
        }
      }

      //this.missionState.fieldEffect.forEach((item, i) => {
      //if (item[1] >= 1) item[1]--;
      //});
      //this.missionState.fieldEffect = this.missionState.fieldEffect.filter((e) => e[1] != 0)
    }
  }

  endMission() {
    let win = this.ringPointSum() >= Ring.missionInfo[this.missionId].goal;
    if ((!win) && this.missionState.turn < Ring.missionInfo[this.missionId].turn) {
      if (!window.confirm("撤退します。よろしいですか？")) return;
    }
    this.onMission = false;
    if (win) {
      for (let i = 0; i < this.setRings.length; i++) {
        let ringId = this.setRings[i];
        this.ringsExp[ringId] += Math.floor(Ring.missionInfo[this.missionId].exp * (this.setRings.length - i) / (this.setRings.length * (this.setRings.length + 1) / 2));
        this.ringsExp[ringId] = Math.min(this.ringsExp[ringId], Ring.levelTable[Ring.levelCap() - 1]);
      }
      if (!this.clearedMission.includes(this.missionId)) {
        this.clearedMission.push(this.missionId);
      }
    }
  }

  ringPointSum() {
    return this.missionState.flowerPoint + this.missionState.snowPoint + this.missionState.moonPoint;
  }

}


