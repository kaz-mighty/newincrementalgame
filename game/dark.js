function Darkdata() {
    this.calcdgcost = function (data) {
        for (let i = 0; i < 8; i++) {
            let p = 100 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1))
            let q = data.player.darkgeneratorsBought[i].mul(i + 1).mul(i + 1)
            q = q.add(p)
            q = q.sub(data.eachpipedsmalltrophy[8] * 0.02 * (i + 1) * (i + 1))
            data.player.darkgeneratorsCost[i] = new Decimal(10).pow(q)
        }
    }

    this.updatedarkgenerators = function (data, mu) {
        let darkmult = data.player.darklevel.add(1)
        darkmult = data.softCap(darkmult, new Decimal(1e3))
        if (data.player.lightmoney.greaterThanOrEqualTo(1)) {
            darkmult = darkmult.mul(data.player.lightmoney.log10() + 1)
        }
        let dgtocalc = Array.from(data.player.darkgenerators)
        for (let i = 0; i < 8; i++) {
            dgtocalc[i] = dgtocalc[i].mul(data.player.lightgenerators[i].add(1))
        }
        data.player.darkmoney = data.player.darkmoney.add(dgtocalc[0].mul(mu).mul(darkmult).mul(1 + data.player.setchip[41] * 0.25).mul(1 + data.eachpipedsmalltrophy[5] * 0.2))
        for (let i = 1; i < 8; i++) {
            data.player.darkgenerators[i - 1] = data.player.darkgenerators[i - 1].add(dgtocalc[i].mul(mu).mul(darkmult).mul(1 + data.player.setchip[41 + i] * 0.25).mul(1 + data.eachpipedsmalltrophy[5] * 0.2))
        }
    }

    this.buydarkgenerator = function (data, index) {
        if (data.player.money.greaterThanOrEqualTo(data.player.darkgeneratorsCost[index])) {
            data.player.money = data.player.money.sub(data.player.darkgeneratorsCost[index])
            data.player.darkgenerators[index] = data.player.darkgenerators[index].add(1)
            data.player.darkgeneratorsBought[index] = data.player.darkgeneratorsBought[index].add(1)
            this.calcdgcost(data)
        }
    }

    this.resetDarklevel = function (data) {
        let dv = 18 - data.player.crown.add(2).log2()
        dv = Math.max(dv, 1)
        let gaindarklevel = new Decimal(data.player.darkmoney.log10()).div(dv).pow_base(2).round()
        if (confirm('裏昇段リセットして、裏段位' + gaindarklevel + 'を得ますか？')) {
            data.player.darkmoney = new Decimal(0)
            data.player.darkgenerators = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.darkgeneratorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
                data.player.darkgeneratorsCost = [
                    new Decimal('1e100'),
                    new Decimal('1e108'),
                    new Decimal('1e127'),
                    new Decimal('1e164'),
                    new Decimal('1e225'),
                    new Decimal('1e316'),
                    new Decimal('1e443'),
                    new Decimal('1e612')
                ],
                data.player.darklevel = data.player.darklevel.add(gaindarklevel)
        }
    }
}
