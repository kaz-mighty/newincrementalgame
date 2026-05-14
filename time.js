function Timedata() {

  this.calctickspeed = function (data) {

    let amult = new Decimal(1)
    if (data.player.challenge.activeBonuses.includes(6)) {
      if (data.player.rankChallengeBonuses.includes(10)) {
        amult = amult.mul(data.player.acceleratorsBought[0].pow_base(2))
      } else {
        amult = amult.mul(data.player.acceleratorsBought[0].add(1))
      }
    }

    let acnum = data.player.accelerators[0].mul(new Decimal(1.5).pow(data.player.setChip[10]))

    if (data.player.rankChallengeBonuses.includes(13)) {
      for (let i = 1; i < 8; i++) {
        acnum = acnum.mul(data.player.accelerators[i].add(1))
      }
    }


    //this.player.tickSpeed = 10
    let tsp = 1000
    if (data.player.onPerfectChallenge && data.player.perfectChallenges.includes(1)) tsp = 10000
    tsp += 500 * data.player.campaign.accelLevelUsed
    tsp -= data.player.setChip[9] * 50
    tsp -= data.player.levelItems[1] * data.player.challengeBonuses.length * (1 + data.player.setChip[27] * 0.5)
    for (let i = 0; i < 8; i++) {
      tsp -= data.player.timeCrystal[i]
    }
    if (tsp < 1) tsp = 1
    tsp /= acnum.add(10).mul(amult).log10()

    return tsp
  }

}