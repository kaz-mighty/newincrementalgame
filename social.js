function Socialdata() {
    this.getTweetLink = function (data) {
        let tweetText = "";
        if (data.player.tweeting.includes('world')) {
            tweetText += '在住世界:' + (data.world + 1) + '%0A';
        }
        if (data.player.tweeting.includes('memory')) {
            tweetText += '記憶:' + data.memorysum + '%0A';
        }
        if (data.player.tweeting.includes('remember')) {
            tweetText += '思い出:' + data.checkremembers() + '%0A';
        }
        if (data.player.tweeting.includes('money')) {
            tweetText += 'ポイント:' + data.player.money +
                '(' + data.player.money.toExponential().replace('+', '%2B') + ')%0A';
        }
        if (data.player.tweeting.includes('darkmoney')) {
            tweetText += '裏ポイント:' + data.player.darkmoney +
                '(' + data.player.darkmoney.toExponential().replace('+', '%2B') + ')%0A';
        }
        if (data.player.tweeting.includes('lightmoney')) {
            tweetText += '天上ポイント:' + data.player.lightmoney +
                '(' + data.player.lightmoney.toExponential().replace('+', '%2B') + ')%0A';
        }

        if (data.player.tweeting.includes('level')) {
            tweetText += '段位:' + data.player.level + '%0A';
        }
        if (data.player.tweeting.includes('darklevel')) {
            tweetText += '裏段位:' + data.player.darklevel + '%0A';
        }
        if (data.player.tweeting.includes('achieved')) {
            tweetText += '挑戦達成:' + data.player.challengecleared.length + '%0A';
        }
        if (data.player.tweeting.includes('rankachieved')) {
            tweetText += '上位挑戦達成:' + data.player.rankchallengecleared.length + '%0A';
        }
        if (data.player.tweeting.includes('pachieved')) {
            tweetText += '完全挑戦段階:' + data.pchallengestage + '%0A';
        }
        if (data.player.tweeting.includes('rank')) {
            tweetText += '階位:' + data.player.rank + '%0A';
        }
        if (data.player.tweeting.includes('levelitemboughttime')) {
            tweetText += '段位効力購入:' + data.player.levelitembought + '%0A';
        }
        if (data.player.tweeting.includes('crown')) {
            tweetText += '冠位:' + data.player.crown + '%0A';
        }
        if (data.player.tweeting.includes('crownresettime')) {
            tweetText += '冠位リセット:' + data.player.crownresettime + '%0A';
        }
        if (data.player.tweeting.includes('statue')) {
            let sum = 0
            for (let i = 0; i < setchipkind; i++) {
                sum += data.player.statue[i]
            }
            tweetText += '像:' + sum + '%0A';
        }
        if (data.player.tweeting.includes('polishedstatue')) {
            let sum = 0
            for (let i = 0; i < setchipkind; i++) {
                sum += data.player.polishedstatue[i]
            }
            tweetText += '輝像:' + sum + '%0A';
        }
        if (data.player.tweeting.includes('polishedstatuebr')) {
            let sum = 0
            for (let i = 0; i < setchipkind; i++) {
                sum += Math.floor(data.player.polishedstatuebr[i] / 10)
            }
            tweetText += '煌像:' + sum + '%0A';
        }

        let tweetUrl = 'dem08656775.github.io/newincrementalgame';
        let tweetHashtag = '新しい放置ゲーム';

        let attribute = 'https://twitter.com/intent/tweet?'
            + 'text=' + tweetText
            + '&url=' + tweetUrl
            + '&hashtags=' + tweetHashtag

        return attribute
    }

    this.configtweet = function (data, content) {
        if (!data.player.tweeting.includes(content)) {
            data.player.tweeting.push(content)
        } else {
            data.player.tweeting.splice(data.player.tweeting.indexOf(content), 1)
        }
    }
}
