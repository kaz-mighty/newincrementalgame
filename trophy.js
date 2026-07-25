function Trophydata() {
  this.contents = [
    "有段者",
    "有階者",
    "輝く者",
    "世界移動者",
    "裏の者",
    "煌く者",
    "想い出す者",
    "有冠者",
    "天上の者",
    "瞬く者",
  ];

  this.gettrophyname = function (data, i) {
    return data.player.trophies[i] ? this.contents[i] : "???";
  };

  this.counttrophies = function (data, index) {
    let cnt = 0;
    for (let i = 0; i < trophynum; i++) {
      if (data.players[index].trophies[i]) cnt++;
    }
    data.trophynumber[index] = cnt;

    if (data.trophynumber[0] >= 6)
      data.players[0].remember = Math.max(
        data.players[0].remember,
        data.trophynumber[0],
      );
  };

  this.checkpipedsmalltrophies = function (data) {
    let sum = 0;
    for (let i = 0; i < worldnum; i++) {
      let cnt = 0;
      if (data.players[i].worldpipe[data.world] >= 1) {
        for (let j = 0; j < 100; j++) {
          if (data.players[i].smalltrophies[j]) cnt++;
        }
        for (let j = 0; j < 100; j++) {
          if (data.players[i].smalltrophies2nd[j]) cnt++;
        }
        cnt -= 75;
        cnt *= data.players[i].worldpipe[data.world];
        if (data.players[i].remember >= 10) {
          cnt = Math.floor(cnt * (0.1 + data.players[i].remember / 10));
        }
        data.eachpipedsmalltrophy[i] = cnt;
        sum += cnt;
      } else {
        data.eachpipedsmalltrophy[i] = 0;
      }
    }
    data.pipedsmalltrophy = sum;
  };

  this.countsmalltrophies = function (data, index) {
    let cnt = 0;
    for (let i = 0; i < 100; i++) {
      if (data.player.smalltrophies[i]) cnt++;
    }
    for (let i = 0; i < 100; i++) {
      if (data.player.smalltrophies2nd[i]) cnt++;
    }
    data.smalltrophy = cnt;
  };

  this.confchecktrophies = function (data) {
    data.trophycheck = !data.trophycheck;
  };

  this.checktrophies = function (data) {
    if (data.player.levelresettime.greaterThan(0))
      data.player.trophies[0] = true;
    if (data.player.rankresettime.greaterThan(0))
      data.player.trophies[1] = true;
    if (data.player.shine > 0) data.player.trophies[2] = true;
    if (
      data.player.challengecleared.includes(238) ||
      data.player.challengecleared.length >= 100
    )
      data.player.trophies[3] = true;
    if (data.player.darkgenerators[0].greaterThan(0))
      data.player.trophies[4] = true;
    if (data.player.brightness > 0) data.player.trophies[5] = true;
    if (data.player.remember > 0) data.player.trophies[6] = true;
    if (data.world == 0) {
      if (data.rememberdata.checkremembers(data) > 0)
        data.player.trophies[6] = true;
    }
    if (data.player.crownresettime.greaterThan(0))
      data.player.trophies[7] = true;
    if (data.player.lightgenerators[0].greaterThan(0))
      data.player.trophies[8] = true;
    if (data.player.flicker > 0) data.player.trophies[9] = true;

    if (data.player.money.greaterThan(0)) data.player.smalltrophies[0] = true;
    if (data.player.money.greaterThan(777)) data.player.smalltrophies[1] = true;
    if (data.player.money.greaterThan(7777777))
      data.player.smalltrophies[2] = true;
    if (data.player.money.greaterThan("1e19"))
      data.player.smalltrophies[3] = true;
    if (data.player.money.greaterThan("1e36"))
      data.player.smalltrophies[4] = true;
    if (data.player.money.greaterThan("1e77"))
      data.player.smalltrophies[5] = true;
    if (data.player.money.greaterThan("1e81"))
      data.player.smalltrophies[6] = true;
    if (data.player.money.greaterThan("1e303"))
      data.player.smalltrophies[7] = true;
    if (data.player.generatorsBought[0].greaterThan(0))
      data.player.smalltrophies[8] = true;
    if (data.player.generatorsBought[1].greaterThan(0))
      data.player.smalltrophies[9] = true;
    if (data.player.generatorsBought[2].greaterThan(0))
      data.player.smalltrophies[10] = true;
    if (data.player.generatorsBought[3].greaterThan(0))
      data.player.smalltrophies[11] = true;
    if (data.player.generatorsBought[4].greaterThan(0))
      data.player.smalltrophies[12] = true;
    if (data.player.generatorsBought[5].greaterThan(0))
      data.player.smalltrophies[13] = true;
    if (data.player.generatorsBought[6].greaterThan(0))
      data.player.smalltrophies[14] = true;
    if (data.player.generatorsBought[7].greaterThan(0))
      data.player.smalltrophies[15] = true;
    if (data.player.acceleratorsBought[0].greaterThan(0))
      data.player.smalltrophies[16] = true;
    if (data.player.acceleratorsBought[1].greaterThan(0))
      data.player.smalltrophies[17] = true;
    if (data.player.acceleratorsBought[2].greaterThan(0))
      data.player.smalltrophies[18] = true;
    if (data.player.acceleratorsBought[3].greaterThan(0))
      data.player.smalltrophies[19] = true;
    if (data.player.acceleratorsBought[4].greaterThan(0))
      data.player.smalltrophies[20] = true;
    if (data.player.acceleratorsBought[5].greaterThan(0))
      data.player.smalltrophies[21] = true;
    if (data.player.acceleratorsBought[6].greaterThan(0))
      data.player.smalltrophies[22] = true;
    if (data.player.acceleratorsBought[7].greaterThan(0))
      data.player.smalltrophies[23] = true;
    if (data.player.levelresettime.greaterThan(200))
      data.player.smalltrophies[24] = true;
    if (data.player.levelresettime.greaterThan(999))
      data.player.smalltrophies[25] = true;
    if (data.player.challengecleared.includes(128))
      data.player.smalltrophies[26] = true;
    if (data.player.challengecleared.includes(64))
      data.player.smalltrophies[27] = true;
    if (data.player.challengecleared.includes(32))
      data.player.smalltrophies[28] = true;
    if (data.player.challengecleared.includes(16))
      data.player.smalltrophies[29] = true;
    if (data.player.challengecleared.includes(8))
      data.player.smalltrophies[30] = true;
    if (data.player.challengecleared.includes(4))
      data.player.smalltrophies[31] = true;
    if (data.player.challengecleared.includes(2))
      data.player.smalltrophies[32] = true;
    if (data.player.challengecleared.includes(1))
      data.player.smalltrophies[33] = true;
    if (data.player.challengecleared.length >= 32)
      data.player.smalltrophies[34] = true;
    if (data.player.challengecleared.length >= 64)
      data.player.smalltrophies[35] = true;
    if (data.player.challengecleared.length >= 96)
      data.player.smalltrophies[36] = true;
    if (data.player.challengecleared.length >= 128)
      data.player.smalltrophies[37] = true;
    if (data.player.challengecleared.length >= 160)
      data.player.smalltrophies[38] = true;
    if (data.player.challengecleared.length >= 192)
      data.player.smalltrophies[39] = true;
    if (data.player.challengecleared.length >= 224)
      data.player.smalltrophies[40] = true;
    if (data.player.challengecleared.length >= 255)
      data.player.smalltrophies[41] = true;
    if (data.player.rankresettime.greaterThan(1))
      data.player.smalltrophies[42] = true;
    if (data.player.rankresettime.greaterThan(4))
      data.player.smalltrophies[43] = true;
    if (data.player.rankresettime.greaterThan(9))
      data.player.smalltrophies[44] = true;
    if (data.player.rankresettime.greaterThan(99))
      data.player.smalltrophies[45] = true;
    if (data.player.rankresettime.greaterThan(999))
      data.player.smalltrophies[46] = true;
    if (data.player.levelitembought >= 4) data.player.smalltrophies[47] = true;
    if (data.player.levelitembought >= 108)
      data.player.smalltrophies[48] = true;
    if (data.player.levelitembought >= 256)
      data.player.smalltrophies[49] = true;
    if (data.player.levelitembought >= 1728)
      data.player.smalltrophies[50] = true;
    if (data.player.levelitembought >= 12500)
      data.player.smalltrophies[51] = true;
    if (data.player.shine >= 100) data.player.smalltrophies[52] = true;
    if (data.player.shine >= 1000) data.player.smalltrophies[53] = true;
    if (data.player.shine >= 10000) data.player.smalltrophies[54] = true;
    if (data.player.shine >= 100000) data.player.smalltrophies[55] = true;
    if (data.player.shine >= 1000000) data.player.smalltrophies[56] = true;
    if (data.player.shine >= 10000000) data.player.smalltrophies[57] = true;
    if (data.exported.length >= 2) data.player.smalltrophies[58] = true;
    if (data.player.tweeting.length >= 2) data.player.smalltrophies[59] = true;
    if (data.player.darkgenerators[0].greaterThanOrEqualTo(1))
      data.player.smalltrophies[60] = true;
    if (data.player.darkgenerators[1].greaterThanOrEqualTo(1))
      data.player.smalltrophies[61] = true;
    if (data.player.darkgenerators[2].greaterThanOrEqualTo(1))
      data.player.smalltrophies[62] = true;
    if (data.player.darkgenerators[3].greaterThanOrEqualTo(1))
      data.player.smalltrophies[63] = true;
    if (data.player.darkgenerators[4].greaterThanOrEqualTo(1))
      data.player.smalltrophies[64] = true;
    if (data.player.darkgenerators[5].greaterThanOrEqualTo(1))
      data.player.smalltrophies[65] = true;
    if (data.player.darkgenerators[6].greaterThanOrEqualTo(1))
      data.player.smalltrophies[66] = true;
    if (data.player.darkgenerators[7].greaterThanOrEqualTo(1))
      data.player.smalltrophies[67] = true;
    if (data.player.rankchallengecleared.length >= 32)
      data.player.smalltrophies[68] = true;
    if (data.player.rankchallengecleared.length >= 64)
      data.player.smalltrophies[69] = true;
    if (data.player.rankchallengecleared.length >= 96)
      data.player.smalltrophies[70] = true;
    if (data.player.rankchallengecleared.length >= 128)
      data.player.smalltrophies[71] = true;
    if (data.player.rankchallengecleared.length >= 160)
      data.player.smalltrophies[72] = true;
    if (data.player.rankchallengecleared.length >= 192)
      data.player.smalltrophies[73] = true;
    if (data.player.rankchallengecleared.length >= 224)
      data.player.smalltrophies[74] = true;
    if (data.player.rankchallengecleared.length >= 255)
      data.player.smalltrophies[75] = true;
    if (data.player.brightness >= 10) data.player.smalltrophies[76] = true;
    if (data.player.brightness >= 100) data.player.smalltrophies[77] = true;
    if (data.player.brightness >= 1000) data.player.smalltrophies[78] = true;
    if (data.player.brightness >= 10000) data.player.smalltrophies[79] = true;
    if (data.player.darkmoney.greaterThanOrEqualTo(1))
      data.player.smalltrophies[80] = true;
    if (data.player.darkmoney.greaterThanOrEqualTo(777))
      data.player.smalltrophies[81] = true;
    if (data.player.darkmoney.greaterThanOrEqualTo(7777777))
      data.player.smalltrophies[82] = true;
    if (data.player.darkmoney.greaterThanOrEqualTo("1e18"))
      data.player.smalltrophies[83] = true;
    if (data.player.darkmoney.greaterThanOrEqualTo("1e72"))
      data.player.smalltrophies[84] = true;
    if (data.player.chip[0] > 0) data.player.smalltrophies[85] = true;
    if (data.player.chip[0] >= 210) data.player.smalltrophies[86] = true;
    if (data.player.chip[0] >= 1275) data.player.smalltrophies[87] = true;
    if (data.player.chip[1] > 0) data.player.smalltrophies[88] = true;
    if (data.player.chip[1] >= 210) data.player.smalltrophies[89] = true;
    if (data.player.chip[1] >= 1275) data.player.smalltrophies[90] = true;
    if (data.player.chip[2] > 0) data.player.smalltrophies[91] = true;
    if (data.player.chip[2] >= 210) data.player.smalltrophies[92] = true;
    if (data.player.chip[2] >= 1275) data.player.smalltrophies[93] = true;
    if (data.player.chip[3] > 0) data.player.smalltrophies[94] = true;
    if (data.player.chip[3] >= 210) data.player.smalltrophies[95] = true;
    if (data.player.chip[3] >= 1275) data.player.smalltrophies[96] = true;
    if (data.player.darklevel.greaterThan(0))
      data.player.smalltrophies[97] = true;
    if (data.player.darklevel.greaterThan("1e3"))
      data.player.smalltrophies[98] = true;
    if (data.player.darklevel.greaterThan("1e10"))
      data.player.smalltrophies[99] = true;

    if (data.player.crownresettime.gt(0)) {
      if (data.player.crownresettime.gt(0))
        data.player.smalltrophies2nd[0] = true;
      if (data.player.crownresettime.greaterThanOrEqualTo(5))
        data.player.smalltrophies2nd[1] = true;
      if (data.player.crownresettime.greaterThanOrEqualTo(20))
        data.player.smalltrophies2nd[2] = true;
      if (data.player.crownresettime.greaterThanOrEqualTo(100))
        data.player.smalltrophies2nd[3] = true;
      if (data.player.accelevel >= 1) data.player.smalltrophies2nd[4] = true;
      if (data.player.accelevel >= 3) data.player.smalltrophies2nd[5] = true;
      if (data.player.accelevel >= 6) data.player.smalltrophies2nd[6] = true;
      if (data.player.accelevel >= 10) data.player.smalltrophies2nd[7] = true;
      if (data.player.rank.gt("1e8")) data.player.smalltrophies2nd[8] = true;
      if (data.player.rank.gt("1e10")) data.player.smalltrophies2nd[9] = true;
      if (data.player.rank.gt("1e12")) data.player.smalltrophies2nd[10] = true;
      if (data.player.lightgenerators[0].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[11] = true;
      if (data.player.lightgenerators[1].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[12] = true;
      if (data.player.lightgenerators[2].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[13] = true;
      if (data.player.lightgenerators[3].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[14] = true;
      if (data.player.lightgenerators[4].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[15] = true;
      if (data.player.lightgenerators[5].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[16] = true;
      if (data.player.lightgenerators[6].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[17] = true;
      if (data.player.lightgenerators[7].greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[18] = true;
      if (data.player.chip[4] > 0) data.player.smalltrophies2nd[19] = true;
      if (data.player.chip[4] >= 210) data.player.smalltrophies2nd[20] = true;
      if (data.player.chip[4] >= 1275) data.player.smalltrophies2nd[21] = true;
      if (data.player.statue[0] >= 10) data.player.smalltrophies2nd[22] = true;
      if (data.player.statue[1] >= 10) data.player.smalltrophies2nd[23] = true;
      if (data.player.statue[2] >= 10) data.player.smalltrophies2nd[24] = true;
      if (data.player.statue[3] >= 10) data.player.smalltrophies2nd[25] = true;
      if (data.player.crown.greaterThanOrEqualTo(100))
        data.player.smalltrophies2nd[26] = true;
      if (data.player.crown.greaterThanOrEqualTo(10000))
        data.player.smalltrophies2nd[27] = true;
      if (data.player.crown.greaterThanOrEqualTo("1e8"))
        data.player.smalltrophies2nd[28] = true;
      if (data.player.lightmoney.greaterThanOrEqualTo(1))
        data.player.smalltrophies2nd[29] = true;
      if (data.player.lightmoney.greaterThanOrEqualTo("1e9"))
        data.player.smalltrophies2nd[30] = true;
      if (data.player.lightmoney.greaterThanOrEqualTo("1e18"))
        data.player.smalltrophies2nd[31] = true;
      if (data.player.lightmoney.greaterThanOrEqualTo("1e36"))
        data.player.smalltrophies2nd[32] = true;
      if (data.player.flicker >= 10) data.player.smalltrophies2nd[33] = true;
      if (data.player.flicker >= 100) data.player.smalltrophies2nd[34] = true;
      if (data.player.flicker >= 1000) data.player.smalltrophies2nd[35] = true;
      if (data.player.flicker >= 10000) data.player.smalltrophies2nd[36] = true;
      if (data.player.flicker >= 100000)
        data.player.smalltrophies2nd[37] = true;
      if (data.player.flicker >= 1000000)
        data.player.smalltrophies2nd[38] = true;
      if (data.player.chip[5] > 0) data.player.smalltrophies2nd[39] = true;
      if (data.player.chip[5] >= 210) data.player.smalltrophies2nd[40] = true;
      if (data.player.chip[5] >= 1275) data.player.smalltrophies2nd[41] = true;
      if (data.player.chip[6] > 0) data.player.smalltrophies2nd[42] = true;
      if (data.player.chip[6] >= 210) data.player.smalltrophies2nd[43] = true;
      if (data.player.chip[6] >= 1275) data.player.smalltrophies2nd[44] = true;
      if (data.player.statue[4] >= 10) data.player.smalltrophies2nd[45] = true;
      if (data.player.statue[5] >= 10) data.player.smalltrophies2nd[46] = true;
      if (data.player.statue[6] >= 10) data.player.smalltrophies2nd[47] = true;
      if (data.player.statue[0] >= 64) data.player.smalltrophies2nd[48] = true;
      if (data.player.statue[1] >= 64) data.player.smalltrophies2nd[49] = true;
      if (data.player.statue[2] >= 64) data.player.smalltrophies2nd[50] = true;
      if (data.player.statue[3] >= 64) data.player.smalltrophies2nd[51] = true;
      if (data.player.statue[4] >= 64) data.player.smalltrophies2nd[52] = true;
      if (data.player.statue[5] >= 64) data.player.smalltrophies2nd[53] = true;
      if (data.player.statue[6] >= 64) data.player.smalltrophies2nd[54] = true;
      if (data.player.shine >= 100000000)
        data.player.smalltrophies2nd[55] = true;
      if (data.player.shine >= 1000000000)
        data.player.smalltrophies2nd[56] = true;
      if (data.player.brightness >= 100000)
        data.player.smalltrophies2nd[57] = true;
      if (data.player.brightness >= 1000000)
        data.player.smalltrophies2nd[58] = true;
      if (data.player.markstone.club >= 1)
        data.player.smalltrophies2nd[59] = true;
      if (data.player.markstone.club >= 100)
        data.player.smalltrophies2nd[60] = true;
      if (data.player.markstone.club >= 10000)
        data.player.smalltrophies2nd[61] = true;
      if (data.player.markstone.diamond >= 1)
        data.player.smalltrophies2nd[62] = true;
      if (data.player.markstone.diamond >= 100)
        data.player.smalltrophies2nd[63] = true;
      if (data.player.markstone.diamond >= 10000)
        data.player.smalltrophies2nd[64] = true;
      if (data.player.markstone.heart >= 1)
        data.player.smalltrophies2nd[65] = true;
      if (data.player.markstone.heart >= 100)
        data.player.smalltrophies2nd[66] = true;
      if (data.player.markstone.heart >= 10000)
        data.player.smalltrophies2nd[67] = true;
      if (data.player.markstone.spade >= 1)
        data.player.smalltrophies2nd[68] = true;
      if (data.player.markstone.spade >= 100)
        data.player.smalltrophies2nd[69] = true;
      if (data.player.markstone.spade >= 10000)
        data.player.smalltrophies2nd[70] = true;
      if (data.player.markstone.greatClub >= 1)
        data.player.smalltrophies2nd[71] = true;
      if (data.player.markstone.greatClub >= 10)
        data.player.smalltrophies2nd[72] = true;
    }
  };
}
