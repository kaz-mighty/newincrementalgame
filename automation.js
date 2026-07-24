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
}
