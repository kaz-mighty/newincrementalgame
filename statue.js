class Statues {
  /* リアクティビティーを利用する為に、Vue.markRawを使用する。
     インスタンス化する際は必ずnewメソッドを使用し、
     全プロパティは手動でリアクティブ化しなければならない。
  */

  /** @param {PlayerSaveData} playerData */
  static new(playerData) {
    return Vue.markRaw(new Statues(playerData));
  }

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.statue = Vue.reactive(Array.from(playerData.statue));
    this.polishedStatue = Vue.reactive(Array.from(playerData.polishedstatue));
    this.brightStatue = Vue.reactive(Array.from(playerData.polishedstatuebr));

    this._statueSum = Vue.computed(() => this.statue.reduce((a, b) => a + b));
    this._polishedStatueSum = Vue.computed(() => this.polishedStatue.reduce((a, b) => a + b));
    this._brightStatueSum = Vue.computed(
      () => this.brightStatue.reduce((a, b) => a + Math.floor(b / 10), 0)
    );
    this._generatorMulti = Vue.computed(
      () => this.statue.reduce((a, b) => a.mul(1 + b * 0.01), new Decimal(1))
    );
  }

  toSaveObject() {
    return {
      statue: this.statue,
      polishedstatue: this.polishedStatue,
      polishedstatuebr: this.brightStatue,
    };
  }

  /* 他のクラスとの一貫性のため、外部にはrefを使用していないかのように振る舞う。 */
  get statueSum() {return this._statueSum.value;}
  get polishedStatueSum() {return this._polishedStatueSum.value;}
  get brightStatueSum() {return this._brightStatueSum.value;}
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
    if (player.chips.chip[i] < cost) return
    player.chips.chip[i] -= cost
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
    if (this.polishedStatue[i] >= this.statue[i] || player.shines.shine < cost) return;
    player.shines.shine -= cost
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
    if (this.brightStatue[i] >= this.polishedStatue[i] * 10 || player.shines.brightness < cost) return;
    player.shines.brightness -= cost
    this.brightStatue[i] += 1

  }

}