function Automationdata() {
  this.configautobuyer = function (data, index) {
    if (index == 0) {
      let input = window.prompt("リセット時入手段位を設定", "");
      input = new Decimal(input);
      data.autolevelnumber = input;
    } else if (index == 1) {
      let input = window.prompt("昇段停止段位を設定", "");
      input = new Decimal(input);
      data.autolevelstopnumber = input;
    } else if (index == 2) {
      let input = window.prompt("リセット時入手階位を設定", "");
      input = new Decimal(input);
      data.autoranknumber = input;
    }
  };

  this.toggleautobuyer = function (data, index) {
    if (index == 0) data.genautobuy = !data.genautobuy;
    if (index == 1) data.accautobuy = !data.accautobuy;
    if (index == 2) data.autolevel = !data.autolevel;
    if (index == 3) data.litemautobuy = !data.litemautobuy;
    if (index == 5) data.autorank = !data.autorank;
  };

  this.updateAutoBuyers = function (data) {
    let autorankshine = Math.max(0, 1000 - data.checkremembers() * 10);

    if (
      !data.player.onchallenge &&
      data.player.rankchallengebonuses.includes(14) &&
      data.autorank
    ) {
      if (
        data.player.shine >= autorankshine &&
        data.player.money.greaterThanOrEqualTo(
          data.rankdata.resetRankborder(data),
        )
      ) {
        if (
          data.rankdata
            .calcgainrank(data)
            .greaterThanOrEqualTo(data.autoranknumber)
        ) {
          data.resetRank(true);
          data.player.shine -= autorankshine;
        }
      }
    }

    if (data.player.rankchallengebonuses.includes(5) && data.litemautobuy) {
      for (let i = 0; i < 5; i++) {
        data.buylevelitems(i);
      }
    }

    if (data.remembersum >= 100) {
      if (!(data.player.onchallenge || data.player.onpchallenge)) {
        data.player.level = data.player.level.add(1);
        data.player.levelresettime = data.player.levelresettime.add(1);
      }
    }

    if (
      (data.player.rings.outsideauto.autodochallenge ||
        !data.player.onchallenge) &&
      data.activechallengebonuses.includes(14) &&
      data.autolevel
    ) {
      if (
        data.player.money.greaterThanOrEqualTo(data.resetLevelborder()) &&
        data.player.level.lt(data.autolevelstopnumber)
      ) {
        if (data.calcgainlevel().greaterThanOrEqualTo(data.autolevelnumber)) {
          data.resetLevel(true, false);
        }
      }
    }

    if (data.activechallengebonuses.includes(5) && data.genautobuy) {
      for (let i = 7; i >= 0; i--) {
        data.buyGenerator(i);
      }
    }

    if (data.activechallengebonuses.includes(9) && data.accautobuy) {
      let ha = data.player.levelitems[3] + 1;
      for (let i = ha; i >= 0; i--) {
        data.buyAccelerator(i);
      }
    }
  };
}
