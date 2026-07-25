function Lightdata() {
    this.calclgcost = function (data) {
        for (let i = 0; i < 8; i++) {
            let p = 200 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1) * (i + 1))
            let q = data.player.lightgeneratorsBought[i].mul(i + 1).mul(i + 1).mul(i + 1)
            q = q.add(p)
            data.player.lightgeneratorsCost[i] = new Decimal(10).pow(q)
        }
    }

    this.updatelightgenerators = function (data, mu) {
        let pipemult = 1 + data.eachpipedsmalltrophy[10] * 0.1

        data.player.lightmoney = data.player.lightmoney.add(data.player.lightgenerators[0].mul(mu).mul(pipemult))
        for (let i = 1; i < 8; i++) {
            data.player.lightgenerators[i - 1] = data.player.lightgenerators[i - 1].add(data.player.lightgenerators[i].mul(pipemult))
        }
    }

    this.buylightgenerator = function (data, index) {
        if (data.player.money.greaterThanOrEqualTo(data.player.lightgeneratorsCost[index])) {
            data.player.money = data.player.money.sub(data.player.lightgeneratorsCost[index])
            data.player.lightgenerators[index] = data.player.lightgenerators[index].add(1)
            data.player.lightgeneratorsBought[index] = data.player.lightgeneratorsBought[index].add(1)
            this.calclgcost(data)
        }
    }
}
