function Generatordata() {
    this.calcgncost = function (data) {
        for (let i = 0; i < 8; i++) {
            let p = i === 0 ?
                data.player.generatorsBought[0] :
                data.player.generatorsBought[i].add(i + 1).mul(i + 1)
            if (data.player.onchallenge && data.player.challenges.includes(1) && data.player.generatorsBought[i].gt(0)) {
                p = p.mul(2)
            }
            p = p.sub(data.eachpipedsmalltrophy[0] * 0.2)

            data.player.generatorsCost[i] = new Decimal(10).pow(p)

        }
    }

    this.updategenerators = function (data, mu) {
        for (let i = 0; i < 8; i++) {
            if (!data.activechallengebonuses.includes(13)) {
                let to = data.player.generatorsMode[i];
                let mult = mu.mul(data.calcincrementmult(i, to))
                if (to === 0) {
                    data.player.money = data.player.money.add(data.player.generators[i].mul(mult))
                } else {
                    data.player.generators[to - 1] = data.player.generators[to - 1].add(data.player.generators[i].mul(mult))
                }
            } else {
                if (data.player.onchallenge && data.player.challenges.includes(3)) {
                    let mult = mu.mul(data.calcincrementmult(i, 0))
                    mult = mult.mul(i + 1)
                    data.player.money = data.player.money.add(data.player.generators[i].mul(mult))
                } else {
                    for (let to = 0; to <= i; to++) {
                        let mult = mu.mul(data.calcincrementmult(i, to))
                        if (to === 0) {
                            data.player.money = data.player.money.add(data.player.generators[i].mul(mult))
                        } else {
                            data.player.generators[to - 1] = data.player.generators[to - 1].add(data.player.generators[i].mul(mult))
                        }
                    }
                }
            }
        }
    }

    this.buyGenerator = function (data, index) {
        if (data.player.onchallenge && data.player.challenges.includes(6)) {
            if (index == 3 || index == 7) {
                return;
            }
        }
        if (data.player.money.greaterThanOrEqualTo(data.player.generatorsCost[index])) {
            data.player.money = data.player.money.sub(data.player.generatorsCost[index])
            data.player.generators[index] = data.player.generators[index].add(1)
            data.player.generatorsBought[index] = data.player.generatorsBought[index].add(1)
            this.calcgncost(data)
        }
    }

    this.calccommonmult = function (data) {
        let mult = new Decimal(1);
        if (!(data.player.onchallenge && data.player.challenges.includes(7))) {
            let cap = new Decimal(100).mul(data.player.levelitems[2] * (1 + data.player.setchip[28] * 0.3) + 1)
            mult = mult.mul(data.softCap(data.player.levelresettime.add(1), cap))
        }

        if (data.activechallengebonuses.includes(3)) {
            mult = mult.mul(new Decimal(2))
        }

        if (data.player.rankchallengebonuses.includes(3)) {
            mult = mult.mul(new Decimal(3))
        }

        if (data.player.onpchallenge && data.player.pchallenges.includes(0)) {
            mult = mult.div(100)
        }

        let x1 = 0.25
        let x2 = 12

        if (data.player.onpchallenge && data.player.pchallenges.includes(7)) {
            x1 = 1.0 / 81
            x2 = 27
        }

        mult = mult.mul(1 + data.smalltrophy * 0.01 + data.memorysum * x1)

        if (data.player.rankchallengebonuses.includes(11)) {
            mult = mult.mul(new Decimal(2).pow(new Decimal(data.memorysum).div(x2)))
        }

        mult = mult.mul(1 + Math.sqrt(data.pipedsmalltrophy))

        if (data.player.onchallenge && data.player.rankchallengebonuses.includes(4)) {
            mult = mult.mul(1 + data.player.challenges.length * 0.25)
        }
        if (!(data.player.onpchallenge && data.player.pchallenges.includes(8))) {
            if (data.player.darkmoney.greaterThanOrEqualTo(1)) {
                mult = mult.mul(new Decimal(data.player.darkmoney.add(10).log10()).pow(1 + data.player.setchip[40] * 0.1))
            }
        }

        mult = mult.mul(data.multbyac)
        if (data.multbyac.gt(1)) mult = mult.mul(data.multbyac)

        mult = mult.mul(1 + data.player.setchip[0] * 0.1)

        for (let i = 0; i < setchipkind; i++) {
            mult = mult.mul(1 + data.player.statue[i] * 0.01)
        }

        let camp = 0
        if (data.player.activatedcampaigns.includes("newyear")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("vt")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("hina")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("gw")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("tanabata")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("aniv")) camp = camp + 2
        if (data.player.activatedcampaigns.includes("sw")) camp = camp + 1
        if (data.player.activatedcampaigns.includes("xmas")) camp = camp + 1

        if (data.player.activatedcampaigns.includes("newyear2025")) {
            if (data.player.onchallenge && data.player.challenges.includes(3) && data.player.challenges.includes(4)) {
                camp = camp + 10
            }
        }

        mult = mult.mul(1 + 4 * camp)

        if (data.player.rings.outsideauto.autodochallenge) {
            mult = mult.mul(0.001)
        }

        data.commonmult = mult
    }

    this.calcincrementmult = function (data, i, to) {
        let mult = data.incrementalmults[i]
        if (!(data.player.onchallenge && data.player.challenges.includes(4))) {
            mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
        }

        let lv = new Decimal(data.player.level.pow(1 + 0.5 * data.player.setchip[19]).add(2).log2())


        let rk = data.player.rank.add(2).div(262142).log2()
        rk += new Decimal(data.player.rank.add(2).log2()).log2() * data.player.setchip[23]
        mult = mult.mul(new Decimal(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))))

        if (data.player.onpchallenge && data.player.pchallenges.includes(3) && mult.gt("1e-100")) {
            let b = Math.floor(mult.log10() / 6)
            mult = new Decimal(10).pow(b * 6)
        }


        return mult
    }

    this.calcbasicincrementmult = function (data, i) {
        let mult = new Decimal(data.commonmult);

        if (!(data.player.onchallenge && data.player.challenges.includes(2))) {
            let mm = new Decimal(1)
            mm = mm.mul(data.player.generatorsBought[i])
            if (data.activechallengebonuses.includes(11)) {
                mm = mm.mul(new Decimal(mm.add(2).log2()))
            }

            if (i < data.highest && mm.greaterThanOrEqualTo(1)) {
                mult = mult.mul(mm)
            } else {
                if (data.activechallengebonuses.includes(2) && mm.greaterThanOrEqualTo(1)) {
                    mult = mult.mul(mm)
                }
            }
        }

        if (i == 0 && data.activechallengebonuses.includes(7)) {
            if (data.player.rankchallengebonuses.includes(7)) {
                mult = mult.mul(data.strongsoftcap(data.player.maxlevelgained, new Decimal(100000)))
            } else {
                mult = mult.mul(data.player.maxlevelgained.min(100000))
            }
        }
        if (!(data.player.onpchallenge && data.player.pchallenges.includes(8))) {
            if (data.player.darkgenerators[i].greaterThanOrEqualTo(1)) {
                mult = mult.mul(new Decimal(i + 2 + data.player.darkgenerators[i].log10()).pow(1 + data.player.setchip[i + 32] * 0.25))
            }
        }

        mult = mult.mul(1 + data.player.setchip[i + 1] * 0.5)

        if (data.player.onpchallenge && data.player.pchallenges.includes(2)) {
            data.incrementalmults[2] = new Decimal(0)
            data.incrementalmults[5] = new Decimal(0)
        }

        data.incrementalmults[i] = mult

    }

    this.findhighestgenerator = function (data) {
        data.highest = 0;
        for (let j = 0; j < 8; j++) {
            if (data.player.generators[j].greaterThan(0)) {
                data.highest = j;
            }
        }
    }

    this.changeMode = function (data, index) {
        if (data.player.onchallenge && data.player.challenges.includes(3)) return;
        data.player.generatorsMode[index] += 1;
        if (data.player.generatorsMode[index] > index) {
            data.player.generatorsMode[index] = 0;
        }
    }

    this.setmodetype = function (data) {
        if (confirm('現在のモードを登録します。よろしいですか？')) {
            for (let i = 0; i < 8; i++) {
                data.player.setmodes[i] = data.player.generatorsMode[i]
            }
        }
    }

    this.changemodetype = function (data) {
        if (data.player.onchallenge && data.player.challenges.includes(3)) return;
        for (let i = 0; i < 8; i++) {
            while (data.player.setmodes[i] != data.player.generatorsMode[i]) {
                this.changeMode(data, i)
            }
        }
    }
}
