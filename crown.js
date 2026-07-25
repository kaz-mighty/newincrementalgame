function Crowndata() {
  this.calcgaincrown = function (data) {
    let dv = 72;
    return new Decimal(2).pow(data.player.money.log10() / dv).round();
  };

  this.resetCrownborder = function (data) {
    return new Decimal("1e216");
  };

  this.resetCrown = function (data, force) {
    if (data.player.onchallenge) {
      alert("現在挑戦中のため、昇冠リセットができません。");
      //あとで消す
      return;
    }
    if (data.player.onchallenge && data.player.challenges.includes(0)) {
      if (data.player.money.lt(this.resetCrownborder(data))) {
        alert("現在挑戦1が適用されているため、まだ昇冠リセットができません。");
        return;
      }
    }

    let gaincrown = this.calcgaincrown(data);
    if (
      force ||
      confirm("昇冠リセットして、冠位" + gaincrown + "を得ますか？")
    ) {
      data.player.money = new Decimal(1);
      data.player.level = new Decimal(0);
      data.player.levelresettime = new Decimal(0);

      data.player.rank = new Decimal(0);
      data.player.rankresettime = new Decimal(0);

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
        ]));

      if (!force) {
        data.player.crown = data.player.crown.add(gaincrown);
        data.player.crownresettime = data.player.crownresettime.add(1);
      }

      data.player.tickspeed = 1000;

      data.player.levelitems = [0, 0, 0, 0, 0];

      // 冠位リセット後の印石入手数をリセット
      data.player.markstone.clubGainedSinceCrownReset = 0;
      data.player.markstone.diamondGainedSinceCrownReset = 0;
      data.player.markstone.heartGainedSinceCrownReset = 0;
      data.player.markstone.spadeGainedSinceCrownReset = 0;

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
