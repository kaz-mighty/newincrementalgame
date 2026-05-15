function Rankdata() {

  this.resetRankborder = function (data) {

    let p = (data.player.challenge.isChallengeActive(0)) ? 96 : 72
    let q = data.checkremembers()
    if (data.player.challenge.isPChallengeActive(7)) {
      q = Math.pow(q, 0.5)
    }
    p -= Math.min(q / 2.0, 36)
    return new Decimal(10).pow(p)

  }

  this.calcgainrank = function (data) {

    let dv = 36 - 0.25 * data.checkremembers() - 1.2 * data.player.levelShop.levelItems[4] * (1 + 0.2 * data.player.setChip[29])
    dv = Math.max(dv, 6)
    dv = dv - data.player.crown.add(2).log2() * 0.1
    dv = Math.max(dv, 3)
    let gainrank = new Decimal(data.player.money.log10()).div(dv).pow_base(2).round()
    if (data.player.challenge.isPChallengeActive(5)) {
      gainrank = new Decimal(gainrank.log10()).max(1)
    }
    if (data.player.rankChallengeBonuses.includes(12)) {
      gainrank = gainrank.mul(3)
    }
    gainrank = gainrank.mul(1 + data.player.setChip[22] * 0.5)
    gainrank = gainrank.mul(1 + data.eachpipedsmalltrophy[4] * 0.2)
    return gainrank

  }
}