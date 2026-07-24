function Statuedata() {
    this.calcstatuecost = function (data, i) {
        return (data.player.statue[i] + 1) * 10000
    }

    this.buildstatue = function (data, i) {
        let cost = this.calcstatuecost(data, i)
        if (data.player.chip[i] < cost) return
        data.player.chip[i] -= cost
        data.player.statue[i] += 1
    }

    this.calcpolishcost = function (data, i) {
        return (data.player.polishedstatue[i] + 1) * 1000000
    }

    this.polishstatue = function (data, i) {
        let cost = this.calcpolishcost(data, i)
        if (data.player.polishedstatue[i] >= data.player.statue[i] || data.player.shine < cost) return;
        data.player.shine -= cost
        data.player.polishedstatue[i] += 1
    }

    this.calcpolishcostbr = function (data, i) {
        return (data.player.polishedstatuebr[i] + 10) * 100
    }

    this.polishstatuebr = function (data, i) {
        let cost = this.calcpolishcostbr(data, i)
        if (data.player.polishedstatuebr[i] >= data.player.polishedstatue[i] * 10 || data.player.brightness < cost) return;
        data.player.brightness -= cost
        data.player.polishedstatuebr[i] += 1

    }
}
