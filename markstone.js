function Markstonedata() {
  // 杖印石獲得に必要なポイントの基準値
  this.baseRequirement = new Decimal("1e256");

  // tickによる基礎減衰を計算
  this.calcTickDecay = function (ticks) {
    if (ticks <= 1) return 10000; // 初期値として大きな値を返す（実質入手不可）
    let t = Math.log10(ticks);
    if (t <= 0) return 10000;
    return Math.pow(2, 12 / t);
  };

  // 印石データのヘルパー関数
  this.getMarkstoneData = function (data, type) {
    if (type === 0) {
      return {
        gained: data.player.markstone.clubGainedSinceCrownReset,
        baseExp: 240,
        decayMult: 1,
      };
    } else if (type === 1) {
      return {
        gained: data.player.markstone.diamondGainedSinceCrownReset,
        baseExp: 250,
        decayMult: 1.25,
      };
    }
    // 将来用
    return null;
  };

  // 獲得条件計算（共通化）
  this.calcRequirement = function (data, type) {
    let msData = this.getMarkstoneData(data, type);
    if (!msData) return new Decimal(Infinity);

    let ticks = data.player.markstone.ticksSinceRankReset;
    let baseExponent = msData.baseExp + msData.gained;
    let tickDecay = this.calcTickDecay(ticks) * msData.decayMult;

    let finalExponent = baseExponent + tickDecay;
    return new Decimal(10).pow(finalExponent);
  };

  // 獲得可能判定（共通化）
  this.canGet = function (data, type) {
    return data.player.money.greaterThanOrEqualTo(
      this.calcRequirement(data, type),
    );
  };

  // 獲得処理（共通化）
  this.tryGet = function (data, type) {
    if (this.canGet(data, type)) {
      if (type === 0) {
        data.player.markstone.club += 1;
        data.player.markstone.clubGainedSinceCrownReset += 1;
      } else if (type === 1) {
        data.player.markstone.diamond += 1;
        data.player.markstone.diamondGainedSinceCrownReset += 1;
      }
      return true;
    }
    return false;
  };

  // ========== 印石選択システム ==========
  // 印石タイプ名
  this.typeNames = ["杖印石", "貨印石", "杯印石", "剣印石"];

  // 選択したタイプを設定
  this.selectType = function (data, type) {
    data.player.markstone.selectedType = type;
  };

  // 選択した印石が入手可能かどうかを判定
  this.canGetSelected = function (data) {
    return this.canGet(data, data.player.markstone.selectedType);
  };

  // 選択した印石を入手
  this.tryGetSelected = function (data) {
    return this.tryGet(data, data.player.markstone.selectedType);
  };

  // 選択した印石の入手条件を計算
  this.calcSelectedRequirement = function (data) {
    return this.calcRequirement(data, data.player.markstone.selectedType);
  };
}
