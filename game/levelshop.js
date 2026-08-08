class LevelShop {
  static itemCost = [
    new Decimal('1e1'),
    new Decimal('1e2'),
    new Decimal('1e3'),
    new Decimal('1e4'),
    new Decimal('1e5'),
  ];
  static itemText = [
    "段位取得量が最大取得段位以下の範囲で増加します。",
    "取得している効力数によって、間隙が少しだけ短くなります。",
    "段位リセット1回あたりの効果が弱くなるのが遅くなります。",
    "新しい時間加速器を購入可能になります。",
    "階位の入手量が少しだけ増加します。",
  ];

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.levelItems = Array.from(playerData.levelitems);
    this.levelItemBought = playerData.levelitembought;
  }

  // todo: コストを状態にして持つ
  /** @param {number} index */
  calcLevelItemCost(index) {
    let d = index + 1;
    let cost = LevelShop.itemCost[index].pow(this.levelItems[index] + 1);
    let dec = 0;
    for (let i = 1; i <= 5; i++) {
      if (4 * i * i * d * d * d <= this.levelItemBought) dec = i;
    }
    cost = cost.div(new Decimal(10).pow(dec)).max(1);
    return cost;
  }

   /**
   * @param {Player} player 
   * @param {number} index 
   */
 canBuyLevelItems(player, index) {
    const cost = this.calcLevelItemCost(index);
    if (player.level.lessThan(cost) || this.levelItems[index] >= 5) return false;
    return true;
  }
  /**
   * @param {Player} player 
   * @param {number} index 
   */
  buyLevelItems(player, index) {
    if (!this.canBuyLevelItems(player, index)) return;
    player.level = player.level.sub(this.calcLevelItemCost(index));
    this.levelItems[index] = this.levelItems[index] + 1;
    if (this.levelItemBought < 100000) this.levelItemBought = this.levelItemBought + 1;
  }

}
