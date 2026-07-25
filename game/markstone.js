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
        current: data.player.markstone.club,
        gained: data.player.markstone.clubGainedSinceCrownReset,
        baseExp: 240,
        decayMult: 1,
      };
    } else if (type === 1) {
      return {
        current: data.player.markstone.diamond,
        gained: data.player.markstone.diamondGainedSinceCrownReset,
        baseExp: 250,
        decayMult: 1.25,
      };
    } else if (type === 2) {
      return {
        current: data.player.markstone.heart,
        gained: data.player.markstone.heartGainedSinceCrownReset,
        baseExp: 260,
        decayMult: 1.5,
      };
    } else if (type === 3) {
      return {
        current: data.player.markstone.spade,
        gained: data.player.markstone.spadeGainedSinceCrownReset,
        baseExp: 270,
        decayMult: 1.75,
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
    let msData = this.getMarkstoneData(data, type);
    if (!msData) return false;

    // 所持数上限チェック (1億)
    if (msData.current >= 100000000) return false;

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
      } else if (type === 2) {
        data.player.markstone.heart += 1;
        data.player.markstone.heartGainedSinceCrownReset += 1;
      } else if (type === 3) {
        data.player.markstone.spade += 1;
        data.player.markstone.spadeGainedSinceCrownReset += 1;
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

  // 印石効果を計算
  // ((1+0.01*Club)*(1+0.01*Diamond)*(1+0.01*Heart)*(1+0.01*Spade)-1)*100
  this.calcMarkstoneEffect = function (data) {
    let club = new Decimal(data.player.markstone.club).mul(0.01).add(1);
    let diamond = new Decimal(data.player.markstone.diamond).mul(0.01).add(1);
    let heart = new Decimal(data.player.markstone.heart).mul(0.01).add(1);
    let spade = new Decimal(data.player.markstone.spade).mul(0.01).add(1);

    let total = club.mul(diamond).mul(heart).mul(spade);
    return total.sub(1).mul(100);
  };

  // ========== 大印石（印石リセット）システム ==========

  // 印石リセット可能判定（印石総効果 > 100）
  this.canResetMarkstone = function (data) {
    return this.calcMarkstoneEffect(data).gt(100);
  };

  // 印石リセット処理
  this.resetMarkstone = function (data) {
    if (!this.canResetMarkstone(data)) return;

    if (
      !confirm(
        "印石をリセットして大杖印石を1つ入手しますか？\n全ての印石の所持数と入手数が0に戻ります。",
      )
    ) {
      return;
    }

    // 印石の所持数をリセット
    data.player.markstone.club = 0;
    data.player.markstone.diamond = 0;
    data.player.markstone.heart = 0;
    data.player.markstone.spade = 0;

    // 入手数をリセット
    data.player.markstone.clubGainedSinceCrownReset = 0;
    data.player.markstone.diamondGainedSinceCrownReset = 0;
    data.player.markstone.heartGainedSinceCrownReset = 0;
    data.player.markstone.spadeGainedSinceCrownReset = 0;

    // 大杖印石を1つ入手
    data.player.markstone.greatClub += 1;
  };

  // 大印石効果を計算
  // type: 0=大杖印石, 1=大貨印石, 2=大杯印石, 3=大剣印石
  this.calcGreatMarkstoneEffect = function (data, type) {
    if (type === 0) {
      return 1 + 0.01 * data.player.markstone.greatClub;
    } else if (type === 1) {
      return 1 + 0.01 * data.player.markstone.greatDiamond;
    } else if (type === 2) {
      return 1 + 0.01 * data.player.markstone.greatHeart;
    } else if (type === 3) {
      return 1 + 0.01 * data.player.markstone.greatSpade;
    }
    return 1;
  };

  // ========== 較正（戦闘）システム ==========

  // 矛盾の種類定義
  this.enemyTypes = [
    { name: "矛盾1", hp: 100 },
    { name: "矛盾2", hp: 5000 },
    { name: "矛盾3", hp: 20000 },
  ];

  // レベルに応じた最大HP: 基礎HP × 5^(level-1)
  this.getEnemyMaxHp = function (data, idx) {
    let lv = data.player.markstone.calibration.enemyLevel || 1;
    return this.enemyTypes[idx].hp * Math.pow(5, lv - 1);
  };

  // レベルに応じた報酬倍率: 2^(level-1)
  this.getRewardMult = function (data) {
    let lv = data.player.markstone.calibration.enemyLevel || 1;
    return Math.pow(2, lv - 1);
  };

  // 較正モードのON/OFF切替
  this.toggleCalibration = function (data) {
    data.player.markstone.calibration.active =
      !data.player.markstone.calibration.active;
    if (data.player.markstone.calibration.active) {
      let idx = data.player.markstone.calibration.selectedEnemy;
      data.player.markstone.calibration.enemyHp = this.getEnemyMaxHp(data, idx);
      data.player.markstone.calibration.cooldown = 0;
    }
  };

  // 矛盾の種類を選択（切替時は報酬なしでHPリセット）
  this.selectEnemy = function (data, index) {
    if (data.player.markstone.calibration.selectedEnemy === index) return;
    data.player.markstone.calibration.selectedEnemy = index;
    data.player.markstone.calibration.enemyHp = this.getEnemyMaxHp(data, index);
    data.player.markstone.calibration.cooldown = 0;
  };

  // 較正力を計算
  this.calcCalibrationAttack = function (data) {
    let base = data.player.markstone.greatClub > 0 ? 1 : 0;
    let res = data.player.markstone.calibration.resolutions;
    let mult1 = 1 + 0.1 * (res[0] || 0);
    let mult2 = 1 + 0.1 * (res[1] || 0);
    let mult3 = 1 + 0.1 * (res[2] || 0);
    let shopMult = 1;
    let su = data.player.markstone.calibration.shopUpgrades;
    if (su) {
      if (su[0]) shopMult *= 1.2; // 成果の現れ1
      if (su[4]) shopMult *= 1.5; // 成果の現れ5
      if (su[5]) shopMult *= 2; // 成果の現れ6
    }
    return base * mult1 * mult2 * mult3 * shopMult;
  };

  // レベル変更（ショップ2購入済みの場合のみ）
  this.setEnemyLevel = function (data, level) {
    if (
      !data.player.markstone.calibration.shopUpgrades ||
      !data.player.markstone.calibration.shopUpgrades[1]
    )
      return;
    if (level < 1 || level > 2) return;
    data.player.markstone.calibration.enemyLevel = level;
    // 戦闘リセット
    let idx = data.player.markstone.calibration.selectedEnemy;
    data.player.markstone.calibration.enemyHp = this.getEnemyMaxHp(data, idx);
    data.player.markstone.calibration.cooldown = 0;
  };

  // ========== 成果ショップ ==========

  // 成果ショップを表示すべきか
  this.shouldShowShop = function (data) {
    let cal = data.player.markstone.calibration;
    if (cal.achievements > 0) return true;
    if (cal.shopUpgrades) {
      for (let i = 0; i < cal.shopUpgrades.length; i++) {
        if (cal.shopUpgrades[i]) return true;
      }
    }
    return false;
  };

  this.shopItems = [
    { name: "成果の現れ1", cost: 1, desc: "較正力1.2倍" },
    { name: "成果の現れ2", cost: 1, desc: "レベルを2に変更可能" },
    { name: "成果の現れ3", cost: 4, desc: "待機中も1/10の較正力を発揮" },
    { name: "成果の現れ4", cost: 16, desc: "発生器の効率2倍" },
    { name: "成果の現れ5", cost: 4, desc: "較正力1.5倍" },
    { name: "成果の現れ6", cost: 8, desc: "較正力2倍" },
    { name: "成果の現れ7", cost: 12, desc: "矛盾3を解放" },
  ];

  this.buyShopUpgrade = function (data, index) {
    let cal = data.player.markstone.calibration;
    if (!cal.shopUpgrades) cal.shopUpgrades = [false, false, false];
    if (cal.shopUpgrades[index]) return; // 購入済み
    if (cal.achievements < this.shopItems[index].cost) return; // 成果不足
    cal.achievements -= this.shopItems[index].cost;
    cal.shopUpgrades[index] = true;
  };

  // tick毎の較正処理
  this.updateCalibration = function (data) {
    if (!data.player.markstone.calibration.active) return;
    if (data.player.markstone.greatClub <= 0) return;

    // クールダウン中
    if (data.player.markstone.calibration.cooldown > 0) {
      data.player.markstone.calibration.cooldown -= 1;
      // ショップ3: 待機中も1/10ダメージ
      if (
        data.player.markstone.calibration.shopUpgrades &&
        data.player.markstone.calibration.shopUpgrades[2]
      ) {
        let attack = this.calcCalibrationAttack(data) * 0.1;
        data.player.markstone.calibration.enemyHp -= attack;
        // 待機中に倒した場合はkill処理へ進む
        if (data.player.markstone.calibration.enemyHp <= 0) {
          data.player.markstone.calibration.cooldown = 0;
        } else {
          return;
        }
      } else {
        return;
      }
    }

    let idx = data.player.markstone.calibration.selectedEnemy;
    let attack = this.calcCalibrationAttack(data);
    data.player.markstone.calibration.enemyHp -= attack;

    // 矛盾を倒した
    if (data.player.markstone.calibration.enemyHp <= 0) {
      let reward = this.getRewardMult(data);
      data.player.markstone.calibration.resolutions[idx] += reward;

      // 合計与ダメージ = 敵のHP（オーバーキルしない）
      let maxHp = this.getEnemyMaxHp(data, idx);
      data.player.markstone.calibration.totalDamage += maxHp;

      // 成果チェック: 合計与ダメージが100万に達した
      if (data.player.markstone.calibration.totalDamage >= 1000000) {
        data.player.markstone.calibration.achievements += 1;
        // 較正リセット
        data.player.markstone.calibration.totalDamage = 0;
        data.player.markstone.calibration.resolutions = [0, 0, 0];
        data.player.markstone.calibration.enemyLevel = 1;
        data.player.markstone.calibration.selectedEnemy = 0;
        data.player.markstone.calibration.cooldown = 0;
        data.player.markstone.calibration.enemyHp = this.enemyTypes[0].hp;
        return;
      }

      // 5tick待機後に自動再戦
      data.player.markstone.calibration.cooldown = 5;
      data.player.markstone.calibration.enemyHp = this.getEnemyMaxHp(data, idx);
    }
  };
}
