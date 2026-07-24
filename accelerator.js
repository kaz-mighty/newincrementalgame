function Acceleratordata() {
    this.calcaccost = function (data) {
        for (let i = 0; i < 8; i++) {
            let p = data.player.acceleratorsBought[i].add(1)
            p = p.mul(p.add(1)).div(2)
            p = p.mul(i === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(i - 1)))
            p = p.sub(data.eachpipedsmalltrophy[3] * 0.2 * (i + 1))
            data.player.acceleratorsCost[i] = p.pow_base(10)
        }
    }

    this.updateaccelerators = function (data, mu) {
        for (let i = 1; i < 8; i++) {
            let mult = new Decimal(1)
            if (i == 1 && data.activechallengebonuses.includes(10)) {
                mult = data.player.rankchallengebonuses.includes(10) ? mult.add(data.player.acceleratorsBought[i].pow_base(2)) : mult.add(data.player.acceleratorsBought[i])
            } else if (i != 1 && data.player.rankchallengebonuses.includes(6)) {
                mult = data.player.rankchallengebonuses.includes(10) ? mult.add(data.player.acceleratorsBought[i].pow_base(2)) : mult.add(data.player.acceleratorsBought[i])
            }
            mult = mult.mul(new Decimal(1.5).pow(data.player.setchip[i + 10]))
            mult = mult.mul(1 + data.eachpipedsmalltrophy[1] * 0.2)
            data.player.accelerators[i - 1] = data.player.accelerators[i - 1].add(data.player.accelerators[i].mul(mult).mul(mu))

        }
    }

    this.buyAccelerator = function (data, index) {
        if (data.player.onchallenge && data.player.challenges.includes(5)) return;
        if (index >= 1 && data.player.levelresettime.lessThanOrEqualTo(0)) return;

        if (data.player.money.greaterThanOrEqualTo(data.player.acceleratorsCost[index])) {
            data.player.money = data.player.money.sub(data.player.acceleratorsCost[index])
            data.player.accelerators[index] = data.player.accelerators[index].add(1)
            data.player.acceleratorsBought[index] = data.player.acceleratorsBought[index].add(1)
            this.calcaccost(data)
        }
    }
}
