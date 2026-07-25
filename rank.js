function Rankdata() {
  this.resetRankborder = function (data) {
    let p =
      data.player.onchallenge && data.player.challenges.includes(0) ? 96 : 72;
    let q = data.checkremembers();
    if (data.player.onpchallenge && data.player.pchallenges.includes(7)) {
      q = Math.pow(q, 0.5);
    }
    p -= Math.min(q / 2.0, 36);
    return new Decimal(10).pow(p);
  };

  this.calcgainrank = function (data) {
    let dv =
      36 -
      0.25 * data.checkremembers() -
      1.2 * data.player.levelitems[4] * (1 + 0.2 * data.player.setchip[29]);
    dv = Math.max(dv, 6);
    dv = dv - data.player.crown.add(2).log2() * 0.1;
    dv = Math.max(dv, 3);
    let gainrank = new Decimal(data.player.money.log10())
      .div(dv)
      .pow_base(2)
      .round();
    if (data.player.onpchallenge && data.player.pchallenges.includes(5)) {
      gainrank = new Decimal(gainrank.log10()).max(1);
    }
    if (data.player.rankchallengebonuses.includes(12)) {
      gainrank = gainrank.mul(3);
    }
    gainrank = gainrank.mul(1 + data.player.setchip[22] * 0.5);
    gainrank = gainrank.mul(1 + data.eachpipedsmalltrophy[4] * 0.2);
    return gainrank;
  };
  this.resetRank = function (data, force) {
    if (data.player.onchallenge && data.player.challenges.includes(0)) {
      if (data.player.money.lt(this.resetRankborder(data))) {
        alert("現在挑戦1が適用されているため、まだ昇階リセットができません。");
        return;
      }
    }

    let gainrank = this.calcgainrank(data);
    if (
      force ||
      confirm("昇階リセットして、階位" + gainrank + "を得ますか？")
    ) {
      if (data.player.onchallenge) {
        data.player.onchallenge = false;
        data.activechallengebonuses = data.player.challengebonuses;
        if (
          data.player.challengecleared.length >= 128 &&
          !data.player.rankchallengecleared.includes(
            data.challengedata.calcchallengeid(data),
          )
        ) {
          data.player.rankchallengecleared.push(
            data.challengedata.calcchallengeid(data),
          );
        }
      }

      // 印石獲得判定（markstonedata使用）
      data.markstonedata.tryGetClub(data);

      // tickカウンターリセット
      data.player.markstone.ticksSinceRankReset = 0;

      data.player.money = new Decimal(1);
      data.player.level = new Decimal(0);
      data.player.levelresettime = new Decimal(0);

      ((data.player.generators = new Array(8)
        .fill(null)
        .map(() => new Decimal(0))),
        (data.player.generatorsBought = new Array(8)
          .fill(null)
          .map(() => new Decimal(0))),
        (data.player.generatorsCost = [
          new Decimal(1),
          new Decimal("1e4"),
          new Decimal("1e9"),
          new Decimal("1e16"),
          new Decimal("1e25"),
          new Decimal("1e36"),
          new Decimal("1e49"),
          new Decimal("1e64"),
        ]),
        (data.player.accelerators = new Array(8)
          .fill(null)
          .map(() => new Decimal(0))),
        (data.player.acceleratorsBought = new Array(8)
          .fill(null)
          .map(() => new Decimal(0))),
        (data.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal("1e10"),
          new Decimal("1e20"),
          new Decimal("1e40"),
          new Decimal("1e80"),
          new Decimal("1e160"),
          new Decimal("1e320"),
          new Decimal("1e640"),
        ]),
        (data.player.tickspeed = 1000));

      data.player.rank = data.player.rank.add(gainrank);
      data.player.rankresettime = data.player.rankresettime.add(
        (data.player.rankchallengebonuses.includes(8)
          ? new Decimal(3)
          : new Decimal(1)
        )
          .mul(data.player.setchip[24] + 1)
          .mul(data.player.crownresettime.add(1)),
      );

      data.player.levelitems = [0, 0, 0, 0, 0];

      data.activechallengebonuses = data.player.challengebonuses;

      if (data.activechallengebonuses.includes(0))
        data.player.money = new Decimal(10001);
      if (data.activechallengebonuses.includes(1))
        data.player.accelerators[0] = new Decimal(10);
      if (data.player.rankchallengebonuses.includes(0))
        data.player.money = data.player.money.add(new Decimal("1e9"));
      if (data.player.rankchallengebonuses.includes(1))
        data.player.accelerators[0] = data.player.accelerators[0].add(256);
    }
  };
}
