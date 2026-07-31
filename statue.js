class Statue {
  /* リアクティビティーを利用する為に、Vue.markRawを使用する。
     インスタンス化する際は必ずnewメソッドを使用し、
     全プロパティは手動でリアクティブ化しなければならない。
  */

  /** @param {PlayerSaveData} playerData */
  static new(playerData) {
    return Vue.markRaw(new Statue(playerData));
  }

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.statue = Vue.reactive(Array.from(playerData.statue));
    this.polishedStatue = Vue.reactive(Array.from(playerData.polishedstatue));
    this.brightStatue = Vue.reactive(Array.from(playerData.polishedstatuebr));
    this.flickerStatue = Vue.reactive(Array.from(playerData.polishedstatuefl));

    this._statueSum = Vue.computed(() => this.statue.slice(0, SET_CHIP_KIND).reduce((a, b) => a + b));
    this._polishedStatueSum = Vue.computed(
      () => this.polishedStatue.slice(0, SET_CHIP_KIND).reduce((a, b) => a + b)
    );
    this._brightStatueSum = Vue.computed(
      () => this.brightStatue.slice(0, SET_CHIP_KIND).reduce((a, b) => a + Math.floor(b / 10), 0)
    );
    // Note: ループ範囲が2種類あるが、元の仕様の再現を優先
    this._flickerStatueSum = Vue.computed(
      () => this.flickerStatue.slice(0, SET_CHIP_KIND).reduce((a, b) => a + Math.floor(b / 100), 0)
    );
    this._flickerStatueSumNotSlice = Vue.computed(
      () => this.flickerStatue.reduce((a, b) => a + Math.floor(b / 100), 0)
    );
    this._generatorMulti = Vue.computed(
      () => this.statue.slice(0, SET_CHIP_KIND).reduce((a, b) => a.mul(1 + b * 0.01), new Decimal(1))
    );
  }

  /* 他のクラスとの一貫性のため、外部にはrefを使用していないかのように振る舞う。 */
  get statueSum() {return this._statueSum.value;}
  get polishedStatueSum() {return this._polishedStatueSum.value;}
  get brightStatueSum() {return this._brightStatueSum.value;}
  get flickerStatueSum() {return this._flickerStatueSum.value;}
  get flickerStatueSumNotSlice() {return this._flickerStatueSumNotSlice.value;}
  get generatorMulti() {return this._generatorMulti.value;}

  /** @param {number} i */
  calcStatueCost(i) {
    return (this.statue[i] + 1) * 10000
  }

  /**
   * @param {Player} player
   * @param {number} i
   */
  buildStatue(player, i) {
    let cost = this.calcStatueCost(i)
    if (player.chip.chip[i] < cost) return
    player.chip.chip[i] -= cost
    this.statue[i] += 1
  }

  /** @param {number} i */
  calcPolishCost(i) {
    return (this.polishedStatue[i] + 1) * 1000000
  }

  /**
   * @param {Player} player
   * @param {number} i
   */
  polishStatue(player, i) {
    let cost = this.calcPolishCost(i)
    if (this.polishedStatue[i] >= this.statue[i] || player.shine.shine < cost) return;
    player.shine.shine -= cost
    this.polishedStatue[i] += 1
  }

  /** @param {number} i */
  calcPolishCostBright(i) {
    return (this.brightStatue[i] + 10) * 100
  }

  /**
   * @param {Player} player 
   * @param {number} i 
   */
  polishStatueBright(player, i) {
    let cost = this.calcPolishCostBright(i)
    if (this.brightStatue[i] >= this.polishedStatue[i] * 10 || player.shine.brightness < cost) return;
    player.shine.brightness -= cost
    this.brightStatue[i] += 1
  }

  /** @param {number} i */
  calcPolishCostFlicker(i) {
    return this.flickerStatue[i] + 100;
  }

  /**
   * @param {Player} player
   * @param {number} i
   */
  polishStatueFlicker(player, i) {
    let cost = this.calcPolishCostFlicker(i);
    if (this.flickerStatue[i] >= this.brightStatue[i] * 10 || player.shine.flicker < cost) return;
    player.shine.flicker -= cost
    this.flickerStatue[i] += 1
  }

}