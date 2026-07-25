function Leveldata() {
    this.calcgainlevel = function (data) {
        if (data.player.onpchallenge && data.player.pchallenges.includes(4)) {

        }
        let dividing = 19 - data.player.rank.add(2).log2()
        if (dividing < 1) dividing = 1
        let mny = data.player.money.log10() - 17
        mny = new Decimal(mny).pow(data.player.setchip[18])
        let gainlevel = new Decimal(data.player.money.mul(mny).log10()).div(dividing).pow_base(2)

        let glmin = new Decimal(18).div(dividing).pow_base(2)
        let glmax = data.player.maxlevelgained.div(2)

        if (!glmin.add(0.1).greaterThanOrEqualTo(glmax)) {
            if (gainlevel.lt(glmax)) {
                let persent = new Decimal(1).sub(gainlevel.sub(glmin).div(glmax.sub(glmin)))

                persent = persent.pow(1 + data.player.levelitems[0] * (1 + data.player.setchip[26] * 2))
                persent = new Decimal(1).sub(persent)
                if (persent.lt("1e-5")) {
                    gainlevel = gainlevel.mul(1 + data.player.levelitems[0] * (1 + data.player.setchip[26] * 2))
                } else {
                    gainlevel = glmax.sub(glmin).mul(persent).add(glmin)
                }
            }

        }

        if (data.player.onpchallenge && data.player.pchallenges.includes(4)) {
            gainlevel = new Decimal(gainlevel.log2()).max(1)
        }

        gainlevel = gainlevel.round().max(1)

        gainlevel = gainlevel.mul(new Decimal(data.eachpipedsmalltrophy[2] / 5.0).pow_base(2))
        if (data.activechallengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2))
        return gainlevel;
    }

    this.resetLevelborder = function (data) {
        let p = (data.player.onchallenge && data.player.challenges.includes(0)) ? 24 : 18
        return new Decimal(10).pow(p)
    }

    this.resetLevel = function (data, force, exit) {
        if (data.player.onchallenge && data.player.challenges.includes(0)) {
            if (data.player.money.lt(new Decimal('1e24'))) {
                alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
                return;
            }
        }

        let dividing = 19 - data.player.rank.add(2).log2()
        if (dividing < 1) dividing = 1
        let gainlevel = this.calcgainlevel(data)
        let rst = data.player.rankresettime.add(1)
        if (data.player.onpchallenge && data.player.pchallenges.includes(4)) {
            rst = rst.pow(0.1).round()
        }
        let gainlevelreset = rst.mul(1 + data.player.setchip[20]).mul(new Decimal(exit ? 0 : data.activechallengebonuses.includes(8) ? 2 : 1))


        if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {

            let disa = data.player.onpchallenge && data.player.pchallenges.includes(9) && (!exit)
            if (data.player.onchallenge) {
                data.player.onchallenge = false;
                if (data.player.challenges.length >= 6) {
                    data.player.trophies[3] = true;
                }
                let id = data.calcchallengeid()
                if (!data.player.challengecleared.includes(id)) {
                    data.player.challengecleared.push(data.calcchallengeid())
                    disa = false
                }
                data.activechallengebonuses = data.player.challengebonuses;
            }

            if (disa) {

                let randomint = Math.floor(Math.random() * 100)
                data.chipset(randomint, 0)
                data.player.disabledchip[randomint] = true
            }

            if (data.player.money.greaterThan(1e80)) {

                if (data.chipdata.haveenoughchip(data)) {
                    for (let i = 0; i < 10; i++) {
                        data.player.chip[i] -= data.player.spendchip[i]
                    }
                }
                let gainchip = data.chipdata.calcgainchip(data)
                console.log(gainchip)
                if (gainchip != -1 && data.player.chip[gainchip] < 10000000) {

                    let chipgetnum = data.chipdata.calcchipgetnum(data, gainchip)

                    data.player.chip[gainchip] = data.player.chip[gainchip] + chipgetnum

                }
            }

            data.player.money = new Decimal(1)
            data.player.level = data.player.level.add(exit ? new Decimal(0) : gainlevel)
            data.player.levelresettime = data.player.levelresettime.add(gainlevelreset)
            data.player.maxlevelgained = data.player.maxlevelgained.max(exit ? new Decimal(0) : gainlevel)
            if (data.player.accelevel > 0) {
                for (let i = 0; i < 8; i++) {
                    let crystalnum = Math.floor(data.player.accelerators[i].log10()) - 10
                    if (crystalnum < 0) crystalnum = 0
                    if (crystalnum > 100) crystalnum = 100
                    data.player.timecrystal[i] = Math.max(data.player.timecrystal[i], crystalnum)
                }

            }


            data.player.generators = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.generatorsCost = [
                    new Decimal(1),
                    new Decimal('1e4'),
                    new Decimal('1e9'),
                    new Decimal('1e16'),
                    new Decimal('1e25'),
                    new Decimal('1e36'),
                    new Decimal('1e49'),
                    new Decimal('1e64')
                ],


                data.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.acceleratorsCost = [
                    new Decimal(10),
                    new Decimal('1e10'),
                    new Decimal('1e20'),
                    new Decimal('1e40'),
                    new Decimal('1e80'),
                    new Decimal('1e160'),
                    new Decimal('1e320'),
                    new Decimal('1e640'),
                ]

            data.player.tickspeed = 1000

            if (data.activechallengebonuses.includes(0)) data.player.money = new Decimal(10001)
            if (data.activechallengebonuses.includes(1)) data.player.accelerators[0] = new Decimal(10)
            if (data.player.rankchallengebonuses.includes(0)) data.player.money = data.player.money.add(new Decimal("1e9"))
            if (data.player.rankchallengebonuses.includes(1)) data.player.accelerators[0] = data.player.accelerators[0].add(256)

        }
    }
}
