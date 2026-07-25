function Markstonedata() {
  // 杖印石獲得に必要なポイントの基準値
  this.baseRequirement = new Decimal("1e256");

  // 所持数に応じた獲得条件を計算
  // 入手数が増えるごとに必要ポイントが10倍に上昇
  // tick数に応じて要求指数が減少（1000倍ごとに-10、最大-20）
  this.calcClubRequirement = function (data) {
    let gained = data.player.markstone.clubGainedSinceCrownReset;
    let ticks = data.player.markstone.ticksSinceRankReset;

    // 基準指数 = 256 + 入手数
    let baseExponent = 256 + gained;

    // tick減衰: log10(ticks) / 3 * 10 = 10 * log10(ticks) / 3
    // 1000倍（10^3）ごとに-10指数
    // 100万（10^6）で最大-20
    let tickReduction = 0;
    if (ticks > 1) {
      tickReduction = Math.min(20, (10 * Math.log10(ticks)) / 3);
    }

    let finalExponent = baseExponent - tickReduction;
    return new Decimal(10).pow(finalExponent);
  };

  // 印石獲得可能かどうかを判定
  this.canGetClub = function (data) {
    return data.player.money.greaterThanOrEqualTo(
      this.calcClubRequirement(data),
    );
  };

  // 印石獲得処理（階位リセット時に呼び出し）
  this.tryGetClub = function (data) {
    if (this.canGetClub(data)) {
      data.player.markstone.club += 1;
      data.player.markstone.clubGainedSinceCrownReset += 1;
      return true;
    }
    return false;
  };

  // ========== 貨印石（Diamond）==========
  // 貨印石獲得に必要なポイントの基準値
  this.baseDiamondRequirement = new Decimal("1e266");

  // 入手数に応じた獲得条件を計算
  // 入手数が増えるごとに必要ポイントが10倍に上昇（+1桁）
  // tick数に応じて要求指数が減少（最大-25）
  this.calcDiamondRequirement = function (data) {
    let gained = data.player.markstone.diamondGainedSinceCrownReset;
    let ticks = data.player.markstone.ticksSinceRankReset;

    // 基準指数 = 266 + 入手数
    let baseExponent = 266 + gained;

    // tick減衰: clubの1.25倍の速度で減衰
    // 12.5 * log10(ticks) / 3
    // 最大-25
    let tickReduction = 0;
    if (ticks > 1) {
      tickReduction = Math.min(25, (12.5 * Math.log10(ticks)) / 3);
    }

    let finalExponent = baseExponent - tickReduction;
    return new Decimal(10).pow(finalExponent);
  };

  // 貨印石獲得可能かどうかを判定
  this.canGetDiamond = function (data) {
    return data.player.money.greaterThanOrEqualTo(
      this.calcDiamondRequirement(data),
    );
  };

  // 貨印石獲得処理（階位リセット時に呼び出し）
  this.tryGetDiamond = function (data) {
    if (this.canGetDiamond(data)) {
      data.player.markstone.diamond += 1;
      data.player.markstone.diamondGainedSinceCrownReset += 1;
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
    let type = data.player.markstone.selectedType;
    if (type === 0) return this.canGetClub(data);
    if (type === 1) return this.canGetDiamond(data);
    // 将来用: type === 2 (杯), type === 3 (剣)
    return false;
  };

  // 選択した印石を入手
  this.tryGetSelected = function (data) {
    let type = data.player.markstone.selectedType;
    if (type === 0) return this.tryGetClub(data);
    if (type === 1) return this.tryGetDiamond(data);
    // 将来用: type === 2 (杯), type === 3 (剣)
    return false;
  };

  // 選択した印石の入手条件を計算
  this.calcSelectedRequirement = function (data) {
    let type = data.player.markstone.selectedType;
    if (type === 0) return this.calcClubRequirement(data);
    if (type === 1) return this.calcDiamondRequirement(data);
    // 将来用
    return new Decimal(Infinity);
  };
}
