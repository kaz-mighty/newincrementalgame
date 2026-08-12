class Challenge {
  static challengeText = [
    "昇段リセットは1e24ポイントから可能になります。",
    "発生器は高速に値上がりします。",
    "発生器購入数による強化は無効になります。",
    "発生器のモードは0に固定されます。",
    "段位によらない基礎的な下位モード強化は無効となります。",
    "時間加速器は購入できません。",
    "発生器4と8は購入できません。",
    "段位リセット回数による強化は無効になります。",
  ];
  static rewardText = [
    "昇段リセット後1e4ポイント獲得",
    "昇段リセット後10個の時間加速器1獲得",
    "番号が最高の発生器にも購入数ボーナスが働く",
    "全発生器の生産力が2倍に",
    "挑戦中でも効力を有効に",
    "発生器自動購入器を入手",
    "時間加速器1に購入数ボーナスが働く",
    "発生器1の生産力が一度に取得した最大段位数倍に(上限:100000)",
    "段位リセット回数の増加分が2倍に",
    "時間加速器自動購入器を入手",
    "時間加速器2に購入数ボーナスが働く",
    "発生器の購入数ボーナスが強化",
    "リセット時の段位取得数が2倍に",
    "発生器は同時に全てのモードとなる",
    "自動昇段リセット器を入手",
  ];
  static rankRewardText = [
    "昇段リセット後1e9ポイント獲得",
    "昇段リセット後256個の時間加速器1獲得",
    "輝きの一度の入手数が2つに",
    "全発生器の生産力が3倍に",
    "受けている挑戦の数に応じて発生器が少し強化",
    "段位効力自動購入器を入手",
    "時間加速器3以降に購入数ボーナスが働く",
    "効力8が上限以降も少しだけ強化",
    "階位リセット回数の増加分が3倍に",
    "間隙が50毛秒に固定(発生器の生産力変化)",
    "時間加速器の購入数ボーナスが強化",
    "記憶が入手数に応じてさらに強化",
    "リセット時の階位取得数が3倍に",
    "全時間加速器が間隙に影響",
    "自動昇階リセット器を入手"
  ];
  static rewardCost = [
    1,
    2,
    4,
    8,
    8,
    8,
    16,
    16,
    16,
    16,
    32,
    32,
    32,
    32,
    32
  ];
  static challengeIds = [128, 64, 32, 16, 8, 4, 2, 1, 192, 160, 96, 144, 80, 48, 136, 72, 40, 24, 132, 68, 36, 20, 12, 130, 66, 34, 18, 10, 6, 129, 65, 33, 17, 9, 5, 3, 224, 208, 176, 112, 200, 168, 104, 152, 88, 56, 196, 164, 100, 148, 84, 52, 140, 76, 44, 28, 194, 162, 98, 146, 82, 50, 138, 74, 42, 26, 134, 70, 38, 22, 14, 193, 161, 97, 145, 81, 49, 137, 73, 41, 25, 133, 69, 37, 21, 13, 131, 67, 35, 19, 11, 7, 240, 232, 216, 184, 120, 228, 212, 180, 116, 204, 172, 108, 156, 92, 60, 226, 210, 178, 114, 202, 170, 106, 154, 90, 58, 198, 166, 102, 150, 86, 54, 142, 78, 46, 30, 225, 209, 177, 113, 201, 169, 105, 153, 89, 57, 197, 165, 101, 149, 85, 53, 141, 77, 45, 29, 195, 163, 99, 147, 83, 51, 139, 75, 43, 27, 135, 71, 39, 23, 15, 248, 244, 236, 220, 188, 124, 242, 234, 218, 186, 122, 230, 214, 182, 118, 206, 174, 110, 158, 94, 62, 241, 233, 217, 185, 121, 229, 213, 181, 117, 205, 173, 109, 157, 93, 61, 227, 211, 179, 115, 203, 171, 107, 155, 91, 59, 199, 167, 103, 151, 87, 55, 143, 79, 47, 31, 252, 250, 246, 238, 222, 190, 126, 249, 245, 237, 221, 189, 125, 243, 235, 219, 187, 123, 231, 215, 183, 119, 207, 175, 111, 159, 95, 63, 254, 253, 251, 247, 239, 223, 191, 127, 255];

  static pChallengeText = [
    "発生器の倍率が1/100になります。",
    "間隙のベースは10000毛秒になります。",
    "発生器3と6は生産をしません。",
    "倍率は6桁毎に切り捨てられます。",
    "段位と段位リセットの入手量は大幅に減少します。",
    "階位の入手量は大幅に減少します。",
    "輝きと煌きは使用できません。",
    "記憶と思い出は大幅に弱体化されます。",
    "裏発生器と裏ポイントは発生器を強化しません。",
    "鋳片効力は、新規挑戦達成でない段位リセットを行うごとにランダムで1つが無効になります。",
  ];


  // 重複がない場合に限りoriginと同じ動作をする
  /** @param {Iterable<number>} iter */
  static getChallengeId(iter) {
    let challengeId = 0;
    for (const v of iter) {
      if (v < 0 || v >= 8) continue;
      challengeId += 1 << (7 - v);
    }
    return challengeId;
  }
  /** @param {Iterable<number>} iter */
  static getPerfectChallengeId(iter) {
    let challengeId = 0;
    for (const v of iter) {
      if (v < 0 || v >= 10) continue;
      challengeId += 1 << v;
    }
    return challengeId;
  }

  /** @param {number} challengeId */
  static calcChallengesArray(challengeId) {
    let ans = [];
    for (let i = 7; i >= 0; i--) {
      if (challengeId % 2 == 1) ans.push(i);
      challengeId = challengeId >>> 1;
    }
    ans.sort();
    return ans;
  }


  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.token = playerData.token;
    this.rankToken = playerData.ranktoken;

    this.onChallenge = playerData.onchallenge;
    this.selected = new Set(playerData.challenges);
    this.cleared = Array.from(playerData.challengecleared);
    this.rankCleared = Array.from(playerData.rankchallengecleared);

    this.bonuses = new Set(playerData.challengebonuses);
    this.rankBonuses = new Set(playerData.rankchallengebonuses);

    this.onPerfect = playerData.onpchallenge;
    this.perfectSelected = new Set(playerData.pchallenges);
    this.perfectCleared = Array.from(playerData.pchallengecleared);
    this.perfectRankCleared = Array.from(playerData.prchallengecleared);

    this.bonusesType1 = Array.from(playerData.setchallengebonusesfst);
    this.bonusesType2 = Array.from(playerData.setchallengebonusessnd);
    this.rankBonusesType1 = Array.from(playerData.setrankchallengebonusesfst);
    this.rankBonusesType2 = Array.from(playerData.setrankchallengebonusessnd);

    this.challengeWeight = Array.from(playerData.challengeweight);
    this.challengeWeightValue = Array.from(playerData.challengeweightvalue);

    this.activeBonuses = (!this.onChallenge || this.bonuses.has(4)) ? this.bonuses : new Set();
    this.perfectStage = 0;
    this.countPerfectCleared();
  }

  getChallengeId() {
    return Challenge.getChallengeId(this.selected);
  }
  getPerfectChallengeId() {
    return Challenge.getPerfectChallengeId(this.perfectSelected);
  }
  /** @param {number} index */
  isActive(index) {
    return this.onChallenge && this.selected.has(index);
  }
  /** @param {number} index */
  isPerfectActive(index) {
    return this.onPerfect && this.perfectSelected.has(index);
  }

  getMaxToken() {
    let t = this.cleared.length;
    if (this.onPerfect) {
      t = Math.max(t, this.perfectCleared[this.getPerfectChallengeId()]);
    }
    return t;
  }
  getMaxRankToken() {
    let rt = this.rankCleared.length;
    if (this.onPerfect) {
      rt = Math.max(rt, this.perfectRankCleared[this.getPerfectChallengeId()]);
    }
    return rt;
  }
  calcToken() {
    let spent = 0;
    for (let i of this.bonuses) {
      spent += Challenge.rewardCost[i];
    }
    this.token = this.getMaxToken() - spent;

    let rspent = 0;
    for (let i of this.rankBonuses) {
      rspent += Challenge.rewardCost[i];
    }
    this.rankToken = this.getMaxRankToken() - rspent;
  }
  countPerfectCleared() {
    let cnt = 0;
    for (let i = 0; i < 1024; i++) {
      cnt += this.perfectCleared[i];
      cnt += this.perfectRankCleared[i];
    }

    cnt /= 510;
    this.perfectStage = Math.floor(cnt);
  }


  /** @param {number} index */
  buyRewards(index) {
    if (this.bonuses.delete(index)) {
      this.token += Challenge.rewardCost[index];
    } else {
      if (this.token < Challenge.rewardCost[index]) {
        return;
      }
      this.bonuses.add(index);
      this.token -= Challenge.rewardCost[index];
    }
  }
  /** @param {number} index */
  buyRankRewards(index) {
    if (this.rankBonuses.delete(index)) {
      this.rankToken += Challenge.rewardCost[index];
    } else {
      if (this.rankToken < Challenge.rewardCost[index]) {
        return;
      }
      this.rankBonuses.add(index);
      this.rankToken -= Challenge.rewardCost[index];
    }
  }

  /** @param {1|2} index */
  setBonuseType(index) {
    if (confirm("現在の効力を登録します。よろしいですか？")) {
      let ans = [];
      for (let i = 0; i < 15; i++) {
        if (this.bonuses.has(i)) {
          ans.push(i);
        }
      }
      if (index == 1) this.bonusesType1 = ans;
      else if (index == 2) this.bonusesType2 = ans;
    }
  }
  /** @param {1|2} index */
  setRankBonuseType(index) {
    if (confirm("現在の上位効力を登録します。よろしいですか？")) {
      let ans = [];
      for (let i = 0; i < 15; i++) {
        if (this.rankBonuses.has(i)) {
          ans.push(i);
        }
      }
      if (index == 1) this.rankBonusesType1 = ans;
      else if (index == 2) this.rankBonusesType2 = ans;
    }
  }
  /** @param {1|2} index */
  changeBonuseType(index) {
    for (let i = 0; i < 15; i++) {
      if (this.bonuses.has(i)) {
        this.buyRewards(i);
      }
    }

    let setBonuses = [];
    if (index == 1) setBonuses = this.bonusesType1;
    else if (index == 2) setBonuses = this.bonusesType2;

    for (let i = 0; i < 15; i++) {
      if (setBonuses.includes(i)) {
        this.buyRewards(i);
      }
    }
  }
  /** @param {1|2} index */
  changeRankBonuseType(index) {
    for (let i = 0; i < 15; i++) {
      if (this.rankBonuses.has(i)) {
        this.buyRankRewards(i);
      }
    }

    let setBonuses = [];
    if (index == 1) setBonuses = this.rankBonusesType1;
    else if (index == 2) setBonuses = this.rankBonusesType2;

    for (let i = 0; i < 15; i++) {
      if (setBonuses.includes(i)) {
        this.buyRankRewards(i);
      }
    }
  }


  /** @param {number} index */
  configSelected(index) {
    if (this.onChallenge) return;
    if (!this.selected.delete(index)) {
      this.selected.add(index);
    }
  }
  /** @param {number} index */
  configPerfectSelected(index) {
    if (this.onPerfect) return;
    if (!this.perfectSelected.delete(index)) {
      this.perfectSelected.add(index);
    }
  }

  /** @param {number} i */
  configChallengeWeightKind(i) {
    this.challengeWeight[i] = this.getChallengeId();
  }
  /** @param {number} i */
  configChallengeWeightValue(i) {
    let input = parseInt(window.prompt("重みを設定", ""));
    if (isNaN(input)) return;
    this.challengeWeightValue[i] = input;
  }
  /** @param {boolean} isRank */
  showUncleared(isRank) {
    const cleared = isRank ? this.rankCleared : this.cleared;
    if (cleared.length == 255) return;
    if (this.onChallenge) return;

    let challengeWeightPairs = [];
    for (let i = 1; i <= 255; i++) {
      let ans = 0;
      for (let j = 0; j < 20; j++) {
        if ((i | this.challengeWeight[j]) == i) {
          ans += this.challengeWeightValue[j];
        }
      }
      challengeWeightPairs.push({
        id: i,
        weight: ans
      });
    }

    challengeWeightPairs.sort((a, b) => a.weight - b.weight);
    console.log("challenge weights:", challengeWeightPairs);

    let challengeId = this.getChallengeId();
    do {
      if (challengeId == 0) {
        challengeId = challengeWeightPairs[0].id;
      } else {
        let idx = challengeWeightPairs.findIndex((e) => e.id == challengeId) + 1;
        if (idx == 255) idx = 0;
        challengeId = challengeWeightPairs[idx].id;
      }
    } while (cleared.includes(challengeId));

    this.selected = new Set(Challenge.calcChallengesArray(challengeId));
  }

  /** @param {Player} player */
  startChallenge(player) {
    let challengeid = this.getChallengeId();

    if (challengeid == 0) {
      alert("挑戦が一つも選択されていません。");
      return;
    }

    let conf = '挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。';

    if (this.cleared.includes(challengeid)) {
      if (this.cleared.length < 128) {
        alert("すでに達成した挑戦です。");
        return;
      }
      conf = 'すでに達成した挑戦です。勲章は得られませんが、それでもよろしいですか？';
      if (this.rankCleared.includes(challengeid)) {
        conf = 'すでに階位挑戦としても達成した挑戦です。勲章や大勲章は得られませんが、それでもよろしいですか？';
      }
    }

    if (player.auto.autoDoChallenge || confirm(conf)) {
      if (!this.bonuses.has(4)) this.activeBonuses = new Set();
      player.resetLevel(true, true);
      this.onChallenge = true;
      if (this.selected.has(3)) {
        for (let i = 0; i < 8; i++) {
          player.generator.generatorsMode[i] = 0;
        }
      }
    }
  }

  /** @param {Player} player */
  startPerfectChallenge(player) {
    if (!(this.cleared.length >= 255 && this.rankCleared.length >= 255)) {
      alert("まだ挑戦や階位挑戦を完了していないので、完全挑戦を開始できません。");
      return;
    }

    if (this.onChallenge) {
      alert("現在挑戦中のため、完全挑戦を開始できません。");
      return;
    }

    for (let i = 0; i < 10; i++) {
      if (player.statue.statue[i] < this.perfectSelected.size - i) {
        alert("像の作成数が不足しているため、完全挑戦を開始できません。");
        return;
      }
    }

    let conf = '完全挑戦を開始しますか？現在のポイントや発生器、段位や段位リセット、階位などは失われます。';
    if (confirm(conf)) {
      player.resetCrown(true);  // bug: 効力が有効な状態でリセットされる
      this.onPerfect = true;
      this.cleared = [];
      this.bonuses = new Set();  // bug: 1tick経過するまでthis.activeBonusesが更新されない
      this.rankCleared = [];
      this.rankBonuses = new Set();  // bug: 同上
    }
  }

  /** @param {Player} player */
  exitChallenge(player) {
    if (confirm('挑戦を諦めますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
      this.onChallenge = false;
      this.activeBonuses = this.bonuses;
      player.generator.updateAllCost(player);
    }
  }

  /** @param {Player} player */
  exitPerfectChallenge(player) {
    if (confirm('完全挑戦を中断しますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
      if (this.onChallenge) this.exitChallenge(player);
      const pChallengeId = this.getPerfectChallengeId();
      this.onPerfect = false;
      this.perfectCleared[pChallengeId] = Math.max(this.perfectCleared[pChallengeId], this.cleared.length);
      this.perfectRankCleared[pChallengeId] = Math.max(this.perfectRankCleared[pChallengeId], this.rankCleared.length);
      this.cleared = Challenge.challengeIds;
      this.rankCleared = Challenge.challengeIds;
      for (let i = 0; i < SET_CHIP_NUM; i++) {
        player.chip.disabledChip[i] = false;
      }
      this.countPerfectCleared();
    }
  }

}
