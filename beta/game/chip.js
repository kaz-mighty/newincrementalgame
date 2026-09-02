class Chip {
  /** @type {[Decimal, number[]][]} */
  static probTable = [
    [new Decimal("0"), [1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e80"), [0.85, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e90"), [0.65, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e100"), [0.40, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e110"), [0.30, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e120"), [0.20, 0.95, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e130"), [0.05, 0.80, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e140"), [0.00, 0.65, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e150"), [0.00, 0.55, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e160"), [0.00, 0.45, 0.95, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e170"), [0.00, 0.25, 0.85, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e180"), [0.00, 0.15, 0.60, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e190"), [0.00, 0.10, 0.40, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e200"), [0.00, 0.00, 0.20, 0.95, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e210"), [0.00, 0.00, 0.15, 0.85, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e220"), [0.00, 0.00, 0.10, 0.70, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e230"), [0.00, 0.00, 0.05, 0.60, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e240"), [0.00, 0.00, 0.00, 0.50, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e250"), [0.00, 0.00, 0.00, 0.40, 0.95, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e275"), [0.00, 0.00, 0.00, 0.30, 0.95, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e300"), [0.00, 0.00, 0.00, 0.20, 0.95, 0.99, 1.01, 1.01, 1.01, 1.01, 1.01]],
    [new Decimal("1e325"), [0.00, 0.00, 0.00, 0.20, 0.93, 0.98, 1.01, 1.01, 1.01, 1.01, 1.01]],

    [new Decimal("1e350"), [0.00, 0.00, 0.00, 0.20, 0.90, 0.97, 0.995, 1.01, 1.01, 1.01, 1.01]],
  ];

  static chipName = [
    "銅",
    "銀",
    "金",
    "白金",
    "紫鋼",
    "朱鋼",
    "蒼鋼",
    "翠鋼",
    "聖銀",
    "覇金",
  ];

  static chipBonusName = [
    "発生器効率",
    "発生器1効率",
    "発生器2効率",
    "発生器3効率",
    "発生器4効率",
    "発生器5効率",
    "発生器6効率",
    "発生器7効率",
    "発生器8効率",
    "間隙",
    "時間加速器1効率",
    "時間加速器2効率",
    "時間加速器3効率",
    "時間加速器4効率",
    "時間加速器5効率",
    "時間加速器6効率",
    "時間加速器7効率",
    "時間加速器8効率",
    "段位入手量",
    "段位効率",
    "段位リセット入手量",
    "段位リセット効率(工事中)",
    "階位入手量",
    "階位効率",
    "階位リセット入手量",
    "階位リセット効率(工事中)",
    "段位効力1効率",
    "段位効力2効率",
    "段位効力3効率",
    "段位効力5効率",
    "輝き入手割合",
    "輝き使用効率",
    "裏発生器1強化",
    "裏発生器2強化",
    "裏発生器3強化",
    "裏発生器4強化",
    "裏発生器5強化",
    "裏発生器6強化",
    "裏発生器7強化",
    "裏発生器8強化",
    "裏ポイント強化",
    "裏発生器1生産強化",
    "裏発生器2生産強化",
    "裏発生器3生産強化",
    "裏発生器4生産強化",
    "裏発生器5生産強化",
    "裏発生器6生産強化",
    "裏発生器7生産強化",
    "裏発生器8生産強化",
    "煌き入手割合",
    "煌き使用効率",
    "煌き使用効率裏(工事中)",
  ];

  /** @param {Decimal} money */
  static getChipLevel(money) {
    for (let i = Chip.probTable.length - 1; i > 0; i--) {
      if (money.greaterThanOrEqualTo(Chip.probTable[i][0])) {
        return i;
      }
    }
    return 0;
  }

  /** 
   * @param {number} lv
   * @param {number} time
   */
  static getChipId(lv, time) {
    let d = Math.random();
    let table = Chip.probTable[lv][1].map((x) => Math.pow(x, time));
    console.log(table);
    for (let i = 0; i <= 10; i++) {
      if (table[i] > d) {
        return i - 1;
      }
    }
    throw new Error("Unreacheable Error: getChipId");
  }

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.chip = Array.from(playerData.chip);
    this.setChip = Array.from(playerData.setchip);
    this.disabledChip = Array.from(playerData.disabledchip);
    this.spendChip = Array.from(playerData.spendchip);
    this.chipType1 = Array.from(playerData.setchiptypefst);

    this.chipUsed = new Array(SET_CHIP_KIND).fill(0);

    this.checkUsedChips();
  }

  calcChipRetryTime() {
    let retry = 0;
    for (let i = 0; i < 9; i++) {
      if (this.spendChip[i] > 0) {
        retry += 1 + Math.log(this.spendChip[i]) / Math.log(10 - i);
      }
    }
    retry = Math.floor(retry);
    return retry;
  }

  haveEnoughChip() {
    return this.chip.every((x, i) => x >= this.spendChip[i]);
  }

  /** @param {Decimal} money */
  calcGainChip(money) {
    let clevel = Chip.getChipLevel(money);
    return Chip.getChipId(clevel, 1 + (this.haveEnoughChip() ? this.calcChipRetryTime() : 0));
  }

  /**
   * @param {number} kind 
   * @param {number} chipDoubleProb
   * @param {boolean} isGw2
   */
  calcChipGetNum(kind, chipDoubleProb, isGw2) {
    let hit = 0;
    for (let i = 0; i < this.chipUsed[kind]; i++) {
      if (Math.random() < chipDoubleProb) hit++;
    }
    hit = Math.min(hit, 10);
    let chipGetNum = Math.floor(Math.pow(2, hit));

    //ゴールデンウィークキャンペーン
    if (isGw2 && kind == 2) chipGetNum += 4;

    chipGetNum = Math.min(chipGetNum, 10000000 - this.chip[kind]);
    return chipGetNum;
  }

  /**
   * @param {Decimal} money
   * @param {number} chipDoubleProb
   * @param {boolean} isGw2
   */
  gainRandomChip(money, chipDoubleProb, isGw2) {
    // There is a bug: chipの支払い後、さらにhaveEnoughChipの判定をしている
    if (this.haveEnoughChip()) {
      for (let i = 0; i < 10; i++) {
        this.chip[i] -= this.spendChip[i];
      }
    }
    let gainChip = this.calcGainChip(money);
    console.log("gainchip:" + gainChip);

    if (gainChip != -1 && this.chip[gainChip] < 10000000) {
      this.chip[gainChip] += this.calcChipGetNum(gainChip, chipDoubleProb, isGw2);
    }
  }

  /**
   * @param {number} statue 
   * @param {number} i 
   */
  configSpendChip(statue, i) {
    let maxspend = statue * statue;
    let input = parseInt(window.prompt("消費数を設定:設定可能最大数:" + maxspend.toString(), "") ?? "NaN");
    if (isNaN(input)) return;
    if (input < 0 || input > maxspend) return;
    this.spendChip[i] = input;
  }

  /**
   * @param {number} rememberSum
   * @param {number} i
   */
  isSetChipShown(rememberSum, i) {
    if (i <= 31) return true;
    if (i <= 51) return rememberSum >= 16;
    return false;
  }
  /**
   * @param {number} i 対象の鋳片効力 0-indexed
   * @param {number} j 鋳片の種類 1-indexed (0=None)
   */
  chipSet(i, j) {
    if (this.disabledChip[i]) return;
    if (this.setChip[i] == j) return;
    if (this.chip[j - 1] <= this.chipUsed[j - 1]) return;
    let oldchip = this.setChip[i] - 1;
    if (oldchip != -1) this.chip[oldchip] += this.chipUsed[oldchip];
    this.setChip[i] = j;
    if (j != 0) this.chip[j - 1] -= this.chipUsed[j - 1] + 1;
    this.checkUsedChips();
  }

  checkUsedChips() {
    this.chipUsed.fill(0);
    for (let v of this.setChip) {
      if (v != 0) this.chipUsed[v - 1]++;
    }
  }

  clearSetChip() {
    for (let i = 0; i < 100; i++) {
      this.chipSet(i, 0);
    }
  }

  /** @param {number} i */
  disableChip(i) {
    this.chipSet(i, 0);
    this.disabledChip[i] = true;
  }

  setChipType() {
    if (confirm('現在の鋳片型を登録します。よろしいですか？')) {
      for (let i = 0; i < 100; i++) {
        this.chipType1[i] = this.setChip[i];
      }
    }
  }

  changeChipType() {
    this.clearSetChip();
    for (let i = 0; i < 100; i++) {
      this.chipSet(i, this.chipType1[i]);
    }
  }

}
