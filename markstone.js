function Markstonedata() {
  // 杖印石獲得に必要なポイントの基準値
  this.baseRequirement = new Decimal("1e256");

  // 所持数に応じた獲得条件を計算
  // 所持数が増えるごとに必要ポイントが10倍に上昇
  // tick数に応じて要求指数が減少（1000倍ごとに-10、最大-20）
  this.calcClubRequirement = function (data) {
    let owned = data.player.markstone.club;
    let ticks = data.player.markstone.ticksSinceRankReset;

    // 基準指数 = 256 + 所持数
    let baseExponent = 256 + owned;

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
      return true;
    }
    return false;
  };
}
