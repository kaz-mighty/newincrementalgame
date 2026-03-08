class Rings {
  /**
   * @param {RingSaveData} ringData
   */
  constructor(ringData) {
      this.setrings = Array.from(ringData.setrings);
      this.ringsexp = Array.from(ringData.ringsexp);
      this.onmission = ringData.onmission;
      this.missionid = ringData.missionid;
      this.missionstate = {
        turn: ringData.missionstate.turn,
        activering: ringData.missionstate.activering,
        skilllog: Array.from(ringData.missionstate.skilllog),
        flowerpoint: ringData.missionstate.flowerpoint,
        snowpoint: ringData.missionstate.snowpoint,
        moonpoint: ringData.missionstate.moonpoint,
        flowermultiplier: ringData.missionstate.flowermultiplier,
        snowmultiplier: ringData.missionstate.snowmultiplier,
        moonmultiplier: ringData.missionstate.moonmultiplier,
        tps: Array.from(ringData.missionstate.tps),
        fieldeffect: Array.from(ringData.missionstate.fieldeffect),
      };
      this.clearedmission = ringData.clearedmission;
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
      setrings: this.setrings,
      ringsexp: this.ringsexp,
      onmission: this.onmission,
      missionid: this.missionid,
      missionstate: {
        turn: this.missionstate.turn,
        activering: this.missionstate.activering,
        skilllog: this.missionstate.skilllog,
        flowerpoint: this.missionstate.flowerpoint,
        snowpoint: this.missionstate.snowpoint,
        moonpoint: this.missionstate.moonpoint,
        flowermultiplier: this.missionstate.flowermultiplier,
        snowmultiplier: this.missionstate.snowmultiplier,
        moonmultiplier: this.missionstate.moonmultiplier,
        tps: this.missionstate.tps,
        fieldeffect: this.missionstate.fieldeffect,
      },
      clearedmission: this.clearedmission,
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
        if (v.prop == 'flowerpoint') v.value = Math.floor(v.value * 1.5)
      },
      description: "花の評価上昇量1.5倍"
    },
    {
      id: 2,
      timing: "skilluse",
      effect: (v) => {
        if (v.prop == 'snowpoint') v.value = Math.floor(v.value * 1.5)
      },
      description: "雪の評価上昇量1.5倍"
    },
    {
      id: 3,
      timing: "skilluse",
      effect: (v) => {
        if (v.prop == 'moonpoint') v.value = Math.floor(v.value * 1.5)
      },
      description: "月の評価上昇量1.5倍"
    },
    {
      id: 4,
      timing: "turnend",
      effect: (v, val) => {
        v.flowerpoint += val
      },
      description: "花の評価上昇"
    },
    {
      id: 5,
      timing: "turnend",
      effect: (v, val) => {
        v.snowpoint += val
      },
      description: "雪の評価上昇"
    },
    {
      id: 6,
      timing: "turnend",
      effect: (v, val) => {
        v.moonpoint += val
      },
      description: "月の評価上昇"
    },
  ];

  static skills = [
    {
      name: "通常",
      tp: 0,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('flowerpoint', Math.floor(state.flowermultiplier * Rings.getStatus(ringid, 0, level)))
        rings.affect('snowpoint', Math.floor(state.snowmultiplier * Rings.getStatus(ringid, 1, level)))
        rings.affect('moonpoint', Math.floor(state.moonmultiplier * Rings.getStatus(ringid, 2, level)))

      },
    },
    {
      name: "花増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('flowermultiplier', Rings.getStatus(ringid, 3, level) * 0.01)
      }
    },
    {
      name: "雪増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('snowmultiplier', Rings.getStatus(ringid, 4, level) * 0.01)
      }
    },
    {
      name: "月増幅",
      tp: 8,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('moonmultiplier', Rings.getStatus(ringid, 5, level) * 0.01)
      }
    },
    //id:4
    {
      name: "花昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('flowerpoint', Math.floor(state.flowermultiplier * Rings.getStatus(ringid, 0, level) * 5))
      }
    },
    {
      name: "雪昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('snowpoint', Math.floor(state.snowmultiplier * Rings.getStatus(ringid, 1, level) * 5))
      }
    },
    {
      name: "月昇華",
      tp: 15,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('moonpoint', Math.floor(state.moonmultiplier * Rings.getStatus(ringid, 2, level) * 5))
      }
    },
    //id:7
    {
      name: "花爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('flowerpoint', Math.floor(state.flowermultiplier * Rings.getStatus(ringid, 0, level) * 12))
        rings.affect('flowermultiplier', Math.max(-0.20, 0.50 - state.flowermultiplier))
      }
    },
    {
      name: "雪爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('snowpoint', Math.floor(state.snowmultiplier * Rings.getStatus(ringid, 1, level) * 12))
        rings.affect('snowmultiplier', Math.max(-0.20, 0.50 - state.snowmultiplier))
      }
    },
    {
      name: "月爆発",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('moonpoint', Math.floor(state.moonmultiplier * Rings.getStatus(ringid, 2, level) * 12))
        rings.affect('moonmultiplier', Math.max(-0.20, 0.50 - state.moonmultiplier))
      }
    },
    //id:10
    {
      name: "花拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('flowermultiplier', -0.20)
        rings.affect('snowmultiplier', 0.10)
        rings.affect('moonmultiplier', 0.10)
      }
    },
    {
      name: "雪拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('snowmultiplier', -0.20)
        rings.affect('flowermultiplier', 0.10)
        rings.affect('moonmultiplier', 0.10)
      }
    },
    {
      name: "月拡散",
      tp: 20,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affect('moonmultiplier', -0.20)
        rings.affect('flowermultiplier', 0.10)
        rings.affect('snowmultiplier', 0.10)
      }
    },
    //id:13
    {
      name: "花充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affectField(4, Math.floor(state.flowermultiplier * Rings.getStatus(ringid, 0, level)))
      }
    },
    {
      name: "雪充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affectField(5, Math.floor(state.snowmultiplier * Rings.getStatus(ringid, 1, level)))
      }
    },
    {
      name: "月充満",
      tp: 45,
      effect: (rings) => {
        let state = rings.missionstate
        let ringid = rings.setrings[state.activering]
        let level = rings.getLevel(ringid)
        rings.affectField(6, Math.floor(state.moonmultiplier * Rings.getStatus(ringid, 2, level)))
      }
    },
  ];

  static statusTable(fst) {
    let ret = [fst]

    for (let i = 1; i < 98; i++) {
      ret[i] = ret[i - 1] * 1.05 + fst * 0.1
    }
    for (let i = 0; i < 99; i++) {
      ret[i] = Math.floor(ret[i] * fst * 0.1)
    }
    return ret
  }

  static getStatus(ringId, statusId, level) {
    return Rings.statusTable(Rings.statusDataType[ringId][statusId])[level - 1]
  }

  static levelCap() {
    return 30
  }

  getLevel(ringId) {
    let exp = this.ringsexp[ringId]
    let lv = 0
    for (let i = 0; i < Rings.levelTable.length; i++) {
      if (exp >= Rings.levelTable[i]) {
        lv = i
      }
    }
    lv += 1
    return Math.min(lv, Rings.levelCap())
  }

  shortGetStatus(statusId) {
    const ringId = this.setrings[this.missionstate.activering]
    return Rings.getStatus(ringId, statusId, this.getLevel(ringId))
  }

  availableSkills(ringId) {
    let ret = []
    let level = this.getLevel(ringId)
    for (let i in Rings.levelSkills[ringId]) {
      if (Number(i) <= level) {
        ret.push(Rings.levelSkills[ringId][i])
      }
    }
    return ret
  }

  affect(prop, value) {
    let v = {
      state: this.missionstate,
      prop: prop,
      value: value,
    }
    for (let e of this.missionstate.fieldeffect) {
      // @ts-expect-error
      if (e[0].timing == "skilluse") { // bug
        const eff = Rings.fieldEffects.find((elem) => elem.id == e[0])
        eff.effect(v)
      }
    }
    this.missionstate[v.prop] += v.value
  }

  affectField(fieldId, value) {
    this.missionstate.fieldeffect.push([fieldId, value]);
  }

  isAvailableRing(worldId, ringId) {
    if (ringId == 0 || ringId == 1 || ringId == 2) return true
    if (worldId >= 3) return false
    if (ringId == worldId + 3) {
      if (this.clearedmission.includes(4)) return true
    }
    return false
  }

  configSetRings(worldId, ringId) {
    if (this.onmission) return
    if (!this.isAvailableRing(worldId, ringId)) return
    if (this.setrings.includes(ringId)) {
      this.setrings.splice(this.setrings.indexOf(ringId), 1)
    } else {
      this.setrings.push(ringId)
    }
  }

  autoplaymission() {
    if (this.missionstate.turn >= Rings.missionInfo[this.missionid].turn) this.endMission()
    if (this.onmission) {
      this.useSkill(0)
    } else {
      this.startMission(this.missionid)
    }
  }

  isAvailableMission(missionId) {
    return Rings.missionInfo[missionId].preventchallenge.every((v) => this.clearedmission.includes(v))
  }

  startMission(i) {
    if (this.setrings.length < Rings.missionInfo[i].setsizemin || Rings.missionInfo[i].setsizemax < this.setrings.length) return
    if (this.onmission) return
    this.onmission = true
    this.missionid = i
    this.missionstate.turn = 0
    this.missionstate.activering = 0
    this.missionstate.flowerpoint = 0
    this.missionstate.snowpoint = 0
    this.missionstate.moonpoint = 0
    this.missionstate.flowermultiplier = 1
    this.missionstate.snowmultiplier = 1
    this.missionstate.moonmultiplier = 1
    this.missionstate.skilllog = []
    this.missionstate.tps = []
    for (let r of this.setrings) {
      let lv = this.getLevel(r)
      this.missionstate.tps.push(Rings.getStatus(r, 6, lv))//6:tp status id
    }
    this.missionstate.fieldeffect = []
    console.log("Starting mission:" + i)
    for (let e of Rings.missionInfo[i].passivefunction) {
      this.missionstate.fieldeffect.push([e, -1])
    }
  }

  useSkill(skillId) {
    let ringId = this.setrings[this.missionstate.activering]
    let skill = Rings.skills[this.availableSkills(ringId)[skillId]]
    if (skill.tp > this.missionstate.tps[this.missionstate.activering]) return
    skill.effect(this)
    this.missionstate.tps[this.missionstate.activering] -= skill.tp
    this.missionstate.skilllog.push([this.setrings[this.missionstate.activering], skillId])

    this.missionstate.activering++;
    if (this.missionstate.activering == this.setrings.length) {
      this.missionstate.activering = 0;
      this.missionstate.turn++;
      for (let e of this.missionstate.fieldeffect) {
        let eff = Rings.fieldEffects.find((elem) => elem.id == e[0])
        if (eff.timing == "turnend") {
          eff.effect(this.missionstate, e[1])
        }
      }

      //this.missionstate.fieldeffect.forEach((item, i) => {
      //if (item[1] >= 1) item[1]--;
      //});
      //this.missionstate.fieldeffect = this.missionstate.fieldeffect.filter((e) => e[1] != 0)
    }
  }

  endMission() {
    let win = this.ringPointSum() >= Rings.missionInfo[this.missionid].goal
    if ((!win) && this.missionstate.turn < Rings.missionInfo[this.missionid].turn) {
      if (!window.confirm("撤退します。よろしいですか？")) return
    }
    this.onmission = false
    if (win) {
      for (let i = 0; i < this.setrings.length; i++) {
        let ringId = this.setrings[i]
        this.ringsexp[ringId] += Math.floor(Rings.missionInfo[this.missionid].exp * (this.setrings.length - i) / (this.setrings.length * (this.setrings.length + 1) / 2))
        this.ringsexp[ringId] = Math.min(this.ringsexp[ringId], Rings.levelTable[Rings.levelCap() - 1])
      }
      if (!this.clearedmission.includes(this.missionid)) {
        this.clearedmission.push(this.missionid)
      }
    }
  }

  ringPointSum() {
    return this.missionstate.flowerpoint + this.missionstate.snowpoint + this.missionstate.moonpoint
  }

}


