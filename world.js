function Worlddata() {
    this.moveworld = function (data, i) {
        if (data.world == i || !data.worldopened[i]) return
        data.load(i)
        data.world = i
    }

    this.calcmaxpipe = function (data) {
        if (data.player.trophies[9]) return 3
        if (data.player.trophies[7]) return 2
        return 1
    }

    this.openpipe = function (data, i) {
        console.log("a")

        let maxpipe = this.calcmaxpipe(data)

        if (data.player.worldpipe[i] >= maxpipe) return

        let havepipe = Math.floor((data.smalltrophy - 72) / 3)
        for (let j = 0; j < worldnum; j++) {
            havepipe -= data.player.worldpipe[j]
        }

        if (havepipe > 0 && data.player.worldpipe[i] < maxpipe) data.player.worldpipe[i] = data.player.worldpipe[i] + 1

    }

    this.shrinkworld = function (data, i) {
        if (4 > data.trophynumber[i]) {
            alert("実績が4つ未満なので、世界を収縮できません。")
            return
        }
        if (data.players[i].remember >= data.trophynumber[i]) {
            alert("実績が思い出より多くありません。")
            return
        }
        if (confirm("世界" + (i + 1) + "を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。")) {
            let u = data.trophynumber[i]
            let rg = data.players[i].rings
            let r = data.checkremembers()
            let rd = data.players[i].residue
            let dl = data.players[i].darklevel
            let st = data.players[i].statue
            let cw = data.players[i].challengeweight
            let cwv = data.players[i].challengeweightvalue
            data.players[i] = initialData()
            data.players[i].remember = u
            data.players[i].rings = rg
            data.players[i].residue = rd
            data.players[i].challengeweight = cw
            data.players[i].challengeweightvalue = cwv

            if (r >= 1) data.players[i].levelresettime = new Decimal(1)
            if (r >= 2) data.players[i].levelresettime = new Decimal(2)
            if (r >= 3) data.players[i].levelresettime = new Decimal(3)
            if (r >= 4) data.players[i].levelresettime = new Decimal(5)
            if (r >= 5) data.players[i].levelresettime = new Decimal(8)
            if (r >= 6) data.players[i].levelresettime = new Decimal(13)
            if (r >= 7) data.players[i].levelresettime = new Decimal(21)
            if (r >= 8) data.players[i].levelresettime = new Decimal(34)
            if (r >= 9) data.players[i].rankresettime = new Decimal(1)
            if (r >= 10) data.players[i].rankresettime = new Decimal(2)
            if (r >= 11) data.players[i].rankresettime = new Decimal(3)
            if (r >= 12) data.players[i].rankresettime = new Decimal(5)
            if (r >= 13) data.players[i].rankresettime = new Decimal(8)
            if (r >= 14) data.players[i].rankresettime = new Decimal(13)
            if (r >= 15) data.players[i].rankresettime = new Decimal(21)
            if (r >= 16) data.players[i].rankresettime = new Decimal(34)
            if (r >= 17) {
                for (let j = 0; j < data.rememberdata.givenchalenges[0].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[0][j]))
                }
            }
            if (r >= 18) {
                for (let j = 0; j < data.rememberdata.givenchalenges[1].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[1][j]))
                }
            }
            if (r >= 19) {
                for (let j = 0; j < data.rememberdata.givenchalenges[2].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[2][j]))
                }
            }
            if (r >= 20) {
                for (let j = 0; j < data.rememberdata.givenchalenges[3].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[3][j]))
                }
            }
            if (r >= 21) {
                for (let j = 0; j < data.rememberdata.givenchalenges[4].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[4][j]))
                }
            }
            if (r >= 22) {
                for (let j = 0; j < data.rememberdata.givenchalenges[5].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[5][j]))
                }
            }
            if (r >= 23) {
                for (let j = 0; j < data.rememberdata.givenchalenges[6].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[6][j]))
                }
            }
            if (r >= 24) {
                for (let j = 0; j < data.rememberdata.givenchalenges[7].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[7][j]))
                }
            }
            if (r >= 25) data.players[i].rank = new Decimal(64)
            if (r >= 26) data.players[i].levelitembought = 108
            if (r >= 27) data.players[i].rank = new Decimal(128)
            if (r >= 28) data.players[i].levelitembought = 256
            if (r >= 29) data.players[i].rank = new Decimal(256)
            if (r >= 30) data.players[i].levelitembought = 800
            if (r >= 31) data.players[i].rank = new Decimal(512)
            if (r >= 32) data.players[i].levelitembought = 1728
            if (r >= 33) data.players[i].maxlevelgained = new Decimal(1000)
            if (r >= 34) {
                for (let j = 0; j < data.rememberdata.givenchalenges[8].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[8][j]))
                }
            }
            if (r >= 35) data.players[i].maxlevelgained = new Decimal(3000)
            if (r >= 36) {
                for (let j = 0; j < data.rememberdata.givenchalenges[9].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[9][j]))
                }
            }
            if (r >= 37) data.players[i].maxlevelgained = new Decimal(10000)
            if (r >= 38) {
                for (let j = 0; j < data.rememberdata.givenchalenges[10].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[10][j]))
                }
            }
            if (r >= 39) data.players[i].maxlevelgained = new Decimal(30000)
            if (r >= 40) {
                for (let j = 0; j < data.rememberdata.givenchalenges[11].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[11][j]))
                }
            }
            if (r >= 41) data.players[i].levelresettime = new Decimal(1000)
            if (r >= 42) data.players[i].rankresettime = new Decimal(300)
            if (r >= 43) data.players[i].rank = new Decimal(4096)
            if (r >= 44) data.players[i].shine = 100000
            if (r >= 45) data.players[i].maxlevelgained = new Decimal(100000)
            if (r >= 46) data.players[i].levelitembought = 6400
            if (r >= 47) {
                for (let j = 0; j < data.rememberdata.givenchalenges[12].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[12][j]))
                }
            }
            if (r >= 48) {
                for (let j = 0; j < data.rememberdata.givenchalenges[13].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[13][j]))
                }
            }
            if (r >= 49) {
                for (let j = 0; j < data.rememberdata.givenchalenges[14].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[14][j]))
                }
            }
            if (r >= 50) {
                for (let j = 0; j < data.rememberdata.givenchalenges[15].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[15][j]))
                }
            }
            if (r >= 51) {
                for (let j = 0; j < data.rememberdata.givenchalenges[16].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[16][j]))
                }
            }
            if (r >= 52) {
                for (let j = 0; j < data.rememberdata.givenchalenges[17].length; j++) {
                    data.players[i].challengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[17][j]))
                }
            }
            if (r >= 53) {
                for (let j = 0; j < data.rememberdata.givenchalenges[0].length; j++) {
                    data.players[i].rankchallengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[0][j]))
                }
            }
            if (r >= 54) {
                for (let j = 0; j < data.rememberdata.givenchalenges[1].length; j++) {
                    data.players[i].rankchallengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[1][j]))
                }
            }
            if (r >= 55) {
                for (let j = 0; j < data.rememberdata.givenchalenges[2].length; j++) {
                    data.players[i].rankchallengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[2][j]))
                }
            }
            if (r >= 56) {
                for (let j = 0; j < data.rememberdata.givenchalenges[3].length; j++) {
                    data.players[i].rankchallengecleared.push(data.getchallengeid(data.rememberdata.givenchalenges[3][j]))
                }
            }
            if (r >= 57) data.players[i].chip[0] = 1;
            if (r >= 58) data.players[i].chip[0] = 15;
            if (r >= 59) data.players[i].chip[0] = 55;
            if (r >= 60) data.players[i].chip[0] = 120;
            if (r >= 61) data.players[i].chip[1] = 1;
            if (r >= 62) data.players[i].chip[1] = 15;
            if (r >= 63) data.players[i].chip[1] = 55;
            if (r >= 64) data.players[i].chip[1] = 120;
            if (r >= 65) data.players[i].chip[2] = 1;
            if (r >= 66) data.players[i].chip[2] = 15;
            if (r >= 67) data.players[i].chip[2] = 55;
            if (r >= 68) data.players[i].chip[2] = 120;
            if (r >= 69) data.players[i].chip[3] = 1;
            if (r >= 70) data.players[i].chip[3] = 15;
            if (r >= 71) data.players[i].chip[3] = 55;
            if (r >= 72) data.players[i].chip[3] = 120;

            if (r >= 73) data.players[i].darklevel = new Decimal(100);
            if (r >= 74) data.players[i].brightness = 30000;
            if (r >= 75) data.players[i].darklevel = new Decimal(500);
            if (r >= 76) data.players[i].shine = 10000000;
            if (r >= 77) data.players[i].darklevel = new Decimal(2000);
            if (r >= 78) data.players[i].chip[0] += st[0] * 1000
            if (r >= 79) data.players[i].chip[1] += st[1] * 1000
            if (r >= 80) data.players[i].chip[2] += st[2] * 1000
            if (r >= 81) data.players[i].chip[3] += st[3] * 1000






            data.players[i].token = data.players[i].challengecleared.length

            data.checkpipedsmalltrophies()

        }
    }

    this.checkworlds = function (data) {

        data.worldopened[0] = true
        if (new Decimal(data.players[0].crownresettime).gt(0)) {
            for (let i = 1; i < 10; i++) {
                data.worldopened[i] = true
            }
        }

        if (data.players[0].challengecleared.includes(238)) data.worldopened[1] = true
        if (data.players[0].challengecleared.length >= 100) data.worldopened[2] = true
        if (data.players[0].rankchallengecleared.length >= 16) data.worldopened[3] = true
        if (data.players[0].levelitembought >= 12500) data.worldopened[4] = true
        if (new Decimal(data.players[0].darkmoney).greaterThanOrEqualTo('1e8')) data.worldopened[5] = true
        if (new Decimal(data.players[0].rank).greaterThanOrEqualTo(262142)) data.worldopened[6] = true
        if (data.players[0].rankchallengecleared.includes(238)) data.worldopened[7] = true
        if (data.players[0].challengecleared.length >= 200) data.worldopened[8] = true
        if (data.players[0].rankchallengecleared.length >= 200) data.worldopened[9] = true

        if (new Decimal(data.players[0].crownresettime).gt(0)) {
            for (let i = 1; i < 10; i++) {
                data.worldopened[i] = true
            }
        }

        if (new Decimal(data.players[0].lightmoney).greaterThanOrEqualTo('1e8')) data.worldopened[10] = true
        if (data.players[0].statue[2] >= 16) data.worldopened[11] = true
    }
}
