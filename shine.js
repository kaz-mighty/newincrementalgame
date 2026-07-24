function Shinedata() {

  this.getp = function (clear) {
    if (clear >= 32 * 8 - 1) return 0.20
    if (clear >= 32 * 7) return 0.16
    if (clear >= 32 * 6) return 0.13
    if (clear >= 32 * 5) return 0.10
    if (clear >= 32 * 4) return 0.07
    if (clear >= 32 * 3) return 0.04
    if (clear >= 32 * 2) return 0.02
    return 0

  }

  this.calcshinepersent = function (data) {

    let sp = this.getp(data.player.challengecleared.length)
    sp += 0.02 * data.player.setchip[30]
    sp += 0.01 * data.eachpipedsmalltrophy[6]
    sp += 0.001 * Math.floor(Math.pow(data.player.residue, 1 / 3))
    for (let i = 0; i < setchipkind; i++) {
      sp += 0.01 * data.player.polishedstatue[i]
    }

    return data.shinepersent = sp
  }

  this.calcshineget = function (data) {

    let sg = 0
    let spint = Math.floor(data.shinepersent)
    let spdec = data.shinepersent - spint

    sg += spint

    if (Math.random() < spdec) {
      sg += 1
    }


    if (data.player.activatedcampaigns.includes("xmas2") && sg >= 1) {
      if (Math.random() <= 0.5) {
        sg += 1//クリスマスキャンペーン
      }
    }

    if (data.player.rankchallengebonuses.includes(2)) sg *= 2
    sg *= data.player.accelevelused + 1

    return sg

  }

  this.calcmaxshine = function (data) {
    let rememberlevel = Math.floor((data.checkremembers() + 16) / 16)
    return this.getmaxshine(data.player.challengecleared.length, rememberlevel, data.player.polishedstatue)
  }

  this.getmaxshine = function (clear, remlv, pst) {
    let value = 0;
    if (clear >= 32 * 8 - 1) value = 10000000
    else if (clear >= 32 * 7) value = 3000000
    else if (clear >= 32 * 6) value = 1000000
    else if (clear >= 32 * 5) value = 700000
    else if (clear >= 32 * 4) value = 400000
    else if (clear >= 32 * 3) value = 200000
    else if (clear >= 32 * 2) value = 100000
    else value = 0
    value *= remlv

    let statuemul = 0;
    for (let i = 0; i < 10; i++) {
      statuemul += pst[i]
    }
    value += (value / 10) * statuemul

    return Math.floor(value)
  }

  this.calcbrightpersent = function (data) {

    let bp = this.getbp(data.player.rankchallengecleared.length)
    bp += 0.001 * data.player.setchip[49]
    bp += 0.001 * data.eachpipedsmalltrophy[9] * 0.5

    for (let i = 0; i < setchipkind; i++) {
      bp += 0.001 * Math.floor(data.player.polishedstatuebr[i] / 10) * 0.5
    }

    return data.brightpersent = bp
  }

  this.calcbrightget = function (data) {
    let bg = 0
    if (Math.random() < data.brightpersent) {
      bg += 1
    }

    if (data.player.activatedcampaigns.includes("xmas2") && bg >= 1) {
      if (Math.random() <= 0.5) {
        bg += 1//クリスマスキャンペーン
      }
    }

    bg *= data.player.accelevelused + 1
    return bg
  }

  this.calcmaxbright = function (data) {
    let rememberlevel = Math.floor((data.checkremembers() + 16) / 16)
    return this.getmaxbr(data.player.rankchallengecleared.length, rememberlevel, data.player.polishedstatuebr)
  }

  this.getbp = function (clear) {
    if (clear >= 32 * 8 - 1) return 0.010
    if (clear >= 32 * 7) return 0.008
    if (clear >= 32 * 6) return 0.006
    if (clear >= 32 * 5) return 0.005
    if (clear >= 32 * 4) return 0.004
    if (clear >= 32 * 3) return 0.003
    if (clear >= 32 * 2) return 0.002
    if (clear >= 32 * 1) return 0.001
    return 0
  }

  this.getfp = function (stage) {
    return 1 / 1000000 * stage
  }

  this.getmaxbr = function (clear, memlv, pst) {
    let value = 0;
    if (clear >= 32 * 8 - 1) value = 10000
    else if (clear >= 32 * 7) value = 6000
    else if (clear >= 32 * 6) value = 3500
    else if (clear >= 32 * 5) value = 2000
    else if (clear >= 32 * 4) value = 1200
    else if (clear >= 32 * 3) value = 700
    else if (clear >= 32 * 2) value = 300
    else if (clear >= 32) value = 100
    else value = 0
    value *= memlv

    let statuemul = 0;
    for (let i = 0; i < 10; i++) {
      statuemul += Math.floor(pst[i] / 10)
    }
    value += (value / 10) * statuemul

    return Math.floor(value)
  }

  this.getmaxfl = function (stage) {
    return stage * stage * 2
    //max:2097152
  }

  this.calcflickerget = function (data) {

    let fg = 0

    if (Math.random() < data.flickerpersent) {
      fg += 1
    }

    if (data.player.activatedcampaigns.includes("xmas2") && fg >= 1) {
      if (Math.random() <= 0.5) {
        fg += 1//クリスマスキャンペーン
      }
    }

    fg *= data.player.accelevelused + 1

    return fg

  }

  this.shineshopcost = [
    50000,
    100000,
    100000,
    300000,
    300000,
    5000000,
  ]

  this.rankrewardtext = [
    "モード型登録",
    "効力型登録1",
    "効力型登録2",
    "上位効力型登録1",
    "上位効力型登録2",
    "鋳片型効力",
  ]

  this.spendshine = function (data, num) {
    if (data.player.shine < num) return;
    if (data.player.onpchallenge && data.player.pchallenges.includes(6)) return
    data.player.shine -= num
    let val = new Decimal(11 + data.player.setchip[31]).pow(new Decimal(num).log10())
    data.updategenerators(new Decimal(val))
    data.updateaccelerators(new Decimal(val))
    if (data.player.trophies[9]) {
      data.player.residue += Math.floor(num * (1 + data.pchallengestage) / 1000000)
    }
  }

  this.spendbrightness = function (data, num) {
    if (data.player.brightness < num) return;
    if (data.player.onpchallenge && data.player.pchallenges.includes(6)) return
    data.player.brightness -= num
    let val = new Decimal(11 + data.player.setchip[50]).pow(new Decimal(num * 100).log10())
    let vald = new Decimal(10 + data.player.setchip[51] * 0.25).pow(new Decimal(num).log10())
    data.updategenerators(new Decimal(val))
    data.updateaccelerators(new Decimal(val))
    data.updatedarkgenerators(new Decimal(vald))
  }

  this.spendflicker = function (data, num) {
    if (data.player.flicker < num) return;
    data.player.flicker -= num
    let val = new Decimal(11 + data.player.setchip[50]).pow(new Decimal(num * 10000).log10())
    let vald = new Decimal(10 + data.player.setchip[51] * 0.25).pow(new Decimal(num).log10())
    data.updategenerators(new Decimal(val))
    data.updateaccelerators(new Decimal(val))
    data.updatedarkgenerators(new Decimal(vald))
    data.updatelightgenerators(new Decimal(vald))
  }

  this.autoshine = function (data) {
    this.spendshine(data, data.player.rings.outsideauto.autospendshinenumber)
  }

  this.autobright = function (data) {
    this.spendbrightness(data, data.player.rings.outsideauto.autospendbrightnumber)
  }

  this.autochallenge = function (data) {
    if (data.player.challengecleared.length == 255) return;
    if (data.player.challengecleared.includes(data.challengedata.getchallengeid(data.player.challenges)) || data.player.challenges.length == 0) {
      data.challengedata.showunclearedchallenges(data)
    }
    if (!data.player.onchallenge) {
      data.challengedata.startChallenge(data)
    }
  }

  this.buytype = function (data, num) {
    if (data.player.shine < this.shineshopcost[num] || data.player.boughttype[num]) return;
    if (confirm("本当に型を購入しますか？")) {
      data.player.shine -= this.shineshopcost[num]
      data.player.boughttype[num] = true
    }
  }

  this.updateShine = function (data) {
    this.calcshinepersent(data)

    let shineget = this.calcshineget(data)
    let maxshine = this.calcmaxshine(data)

    if (data.player.shine < maxshine) {
      data.player.shine = Math.min(data.player.shine + shineget, maxshine)
    }

    this.calcbrightpersent(data)

    let brightget = this.calcbrightget(data)
    let maxbright = this.calcmaxbright(data)

    if (data.player.brightness < maxbright) {
      data.player.brightness = Math.min(data.player.brightness + brightget, maxbright);
    }

    data.flickerpersent = this.getfp(data.pchallengestage)

    let flickerget = this.calcflickerget(data)

    let maxflicker = this.getmaxfl(data.pchallengestage)
    if (data.player.flicker < maxflicker) {
      data.player.flicker = Math.min(data.player.flicker + flickerget, maxflicker);
    }
  }
}
