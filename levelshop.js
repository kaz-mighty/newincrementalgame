function Levelshopdata() {
  this.itemcost = [
    new Decimal('1e1'),
    new Decimal('1e2'),
    new Decimal('1e3'),
    new Decimal('1e4'),
    new Decimal('1e5')
  ],
    this.itemtext = [
      "段位取得量が最大取得段位以下の範囲で増加します。",
      "取得している効力数によって、間隙が少しだけ短くなります。",
      "段位リセット1回あたりの効果が弱くなるのが遅くなります。",
      "新しい時間加速器を購入可能になります。",
      "階位の入手量が少しだけ増加します。",
    ]

  this.calclevelitemcost = function (data, index) {
    let d = index + 1
    let cost = this.itemcost[index].pow(data.player.levelitems[index] + 1)
    let dec = 0;
    for (let i = 1; i <= 5; i++) {
      if (4 * i * i * d * d * d <= data.player.levelitembought) dec = i;
    }
    cost = cost.div(new Decimal(10).pow(dec)).max(1)
    return cost
  }

  this.buylevelitems = function (data, index) {
    let cost = this.calclevelitemcost(data, index)
    if (data.player.level.lessThan(cost) || data.player.levelitems[index] >= 5) {
      return;
    }
    data.player.level = data.player.level.sub(cost);
    data.player.levelitems[index] = data.player.levelitems[index] + 1;
    if (data.player.levelitembought < 100000) data.player.levelitembought = data.player.levelitembought + 1;
  }
}
