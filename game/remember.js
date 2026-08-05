class Shrink {

  static contents = [
    "段位リセット1回",
    "段位リセット2回",
    "段位リセット3回",
    "段位リセット5回",
    "段位リセット8回",
    "段位リセット13回",
    "段位リセット21回",
    "段位リセット34回",

    "階位リセット1回",
    "階位リセット2回",
    "階位リセット3回",
    "階位リセット5回",
    "階位リセット8回",
    "階位リセット13回",
    "階位リセット21回",
    "階位リセット34回",

    "挑戦(2356)_1",
    "挑戦(2356)_2",
    "挑戦(17)_1,(2356)_3",
    "挑戦(17)_1+(2356)_1,挑戦(2356)_4,",
    "挑戦(17)_1+(2356)_2",
    "挑戦(17)_1+(2356)_3",
    "挑戦(17)_1+(2356)_4",
    "挑戦(17)_2,4,8",

    "階位64",
    "段位効力購入108",
    "階位128",
    "段位効力購入256",
    "階位256",
    "段位効力購入800",
    "階位512",
    "段位効力購入1728",

    "最大取得段位1000",
    "挑戦(17)_2+(2356)_1,4+(23)_1,8+(56)_1",
    "最大取得段位3000",
    "挑戦(17)_2+(2356)_2,4+(23)_2,8+(56)_2",
    "最大取得段位10000",
    "挑戦(17)_2+(2356)_3,4+1,8+7",
    "最大取得段位30000",
    "挑戦(17)_2+(2356)_4,4+1+(23)_(1,2),8+7+(56)_(1,2)",

    "段位リセット1000回",
    "階位リセット300回",
    "階位4096",
    "輝き100000",
    "最大取得段位100000",
    "段位効力購入6400",
    "挑戦4+6+(123)_(0,1,2,3)",
    "挑戦8+(23)_1+(567)_(0,1)",//95

    "挑戦8+(23)_2+(567)_(0,1),挑戦8+1+(56)_(0,1)",//102
    "挑戦8+1+(23)_(1,2)+(56)_(0,1)",//111
    "挑戦8+(23)_1+(567)_(2,3)",//119
    "挑戦4+7+(236)_(0,1,2,3),挑戦4+5",//128
    "上位挑戦(2356)_1",
    "上位挑戦(2356)_2",
    "上位挑戦(17)_1,(2356)_3",
    "上位挑戦(17)_1+(2356)_1,挑戦(2356)_4,",

    "銅片1",
    "銅片15",
    "銅片55",
    "銅片120",
    "銀片1",
    "銀片15",
    "銀片55",
    "銀片120",

    "金片1",
    "金片15",
    "金片55",
    "金片120",
    "白金片1",
    "白金片15",
    "白金片55",
    "白金片120",

    "裏段位100",
    "輝き10000000",
    "裏段位500",
    "煌き30000",
    "裏段位2000",
    "銅像1つにつき銅片1000",
    "銀像1つにつき銀片1000",
    "金像1つにつき金片1000",
    "白金像1つにつき白金片1000",
  ];

  static givenChallenges = [
    [[1], [2], [4], [5]],
    [[1, 2], [1, 4], [1, 5], [2, 4], [2, 5], [4, 5]],
    [[0], [6], [1, 2, 4], [1, 2, 5], [1, 4, 5], [2, 4, 5]],
    [[0, 1], [0, 2], [0, 4], [0, 5], [6, 1], [6, 2], [6, 4], [6, 5], [1, 2, 4, 5]],
    [[0, 1, 2], [0, 1, 4], [0, 1, 5], [0, 2, 4], [0, 2, 5], [0, 4, 5], [6, 1, 2], [6, 1, 4], [6, 1, 5], [6, 2, 4], [6, 2, 5], [6, 4, 5]],
    [[0, 1, 2, 4], [0, 1, 2, 5], [0, 1, 4, 5], [0, 2, 4, 5], [6, 1, 2, 4], [6, 1, 2, 5], [6, 1, 4, 5], [6, 2, 4, 5]],
    [[0, 1, 2, 4, 5], [6, 1, 2, 4, 5]],
    [[0, 6], [3], [7]],
    [[0, 6, 1], [0, 6, 2], [0, 6, 4], [0, 6, 5], [3, 1], [3, 2], [7, 4], [7, 5]],
    [[0, 6, 1, 2], [0, 6, 1, 4], [0, 6, 1, 5], [0, 6, 2, 4], [0, 6, 2, 5], [0, 6, 4, 5], [3, 1, 2], [7, 4, 5]],
    [[0, 6, 1, 2, 4], [0, 6, 1, 2, 5], [0, 6, 1, 4, 5], [0, 6, 2, 4, 5], [3, 0], [7, 6]],
    [[0, 6, 1, 2, 4, 5], [3, 0, 1], [3, 0, 2], [3, 0, 1, 2], [7, 6, 4], [7, 6, 5], [7, 6, 4, 5]],
    [[3, 5], [3, 5, 0], [3, 5, 1], [3, 5, 2], [3, 5, 0, 1], [3, 5, 0, 2], [3, 5, 1, 2], [3, 5, 0, 1, 2]],
    [[7, 1], [7, 2], [7, 1, 4], [7, 1, 5], [7, 1, 6], [7, 2, 4], [7, 2, 5], [7, 2, 6]],
    [[7, 1, 2], [7, 1, 2, 4], [7, 1, 2, 5], [7, 1, 2, 6], [7, 0], [7, 0, 4], [7, 0, 5]],
    [[7, 0, 1], [7, 0, 1, 4], [7, 0, 1, 5], [7, 0, 2], [7, 0, 2, 4], [7, 0, 2, 5], [7, 0, 1, 2], [7, 0, 1, 2, 4], [7, 0, 1, 2, 5]],
    [[7, 1, 4, 5], [7, 1, 4, 6], [7, 1, 5, 6], [7, 1, 4, 5, 6], [7, 2, 4, 5], [7, 2, 4, 6], [7, 2, 5, 6], [7, 2, 4, 5, 6]],
    [[3, 6], [3, 6, 1], [3, 6, 2], [3, 6, 5], [3, 6, 1, 2], [3, 6, 1, 5], [3, 6, 2, 5], [3, 6, 1, 2, 5], [3, 4]]
  ];

  /**
   * @param {PlayerSaveData} newData 
   * @param {number} giveId 
   * @param {boolean} isRank 
   */
  static giveChallenge(newData, giveId, isRank) {
    let target = isRank ? newData.rankchallengecleared : newData.challengecleared;
    for (let i = 0; i < Shrink.givenChallenges[giveId].length; i++) {
      target.push(Challenge.getChallengeId(Player.numArray2BoolArray(Shrink.givenChallenges[giveId][i], 8)));
    }
  }

  // 引数をPlayerにするとringsのコピーが困難になるので、当面はPlayerSaveDataのままとする
  // (Player.ring が扱う範囲 != PlayerSaveData.rings が扱う範囲)
  /**
   * @param {number} world 対象世界 (0-index)
   * @param {PlayerSaveData} playerData 
   * @param {number} memory 対象世界の実績数
   * @param {number} remember0 世界0の合計思い出
   * @return {PlayerSaveData | undefined}
   */
  static shrinkWorld(world, playerData, memory, remember0) {
    if (4 > memory) {
      alert("実績が4つ未満なので、世界を収縮できません。");
      return;
    }
    if (playerData.remember >= memory) {
      alert("実績が思い出より多くありません。");
      return;
    }
    if (!confirm("世界" + (world + 1) + "を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。")) {
      return;
    }
    let st = playerData.statue;
    let newData = initialData();
    newData.remember = memory;
    newData.rings = playerData.rings;
    newData.residue = playerData.residue;
    newData.darklevelproof = playerData.darklevelproof;
    newData.challengeweight = playerData.challengeweight;
    newData.challengeweightvalue = playerData.challengeweightvalue;

    if (remember0 >= 1) newData.levelresettime = new Decimal(1);
    if (remember0 >= 2) newData.levelresettime = new Decimal(2);
    if (remember0 >= 3) newData.levelresettime = new Decimal(3);
    if (remember0 >= 4) newData.levelresettime = new Decimal(5);
    if (remember0 >= 5) newData.levelresettime = new Decimal(8);
    if (remember0 >= 6) newData.levelresettime = new Decimal(13);
    if (remember0 >= 7) newData.levelresettime = new Decimal(21);
    if (remember0 >= 8) newData.levelresettime = new Decimal(34);
    if (remember0 >= 9) newData.rankresettime = new Decimal(1);
    if (remember0 >= 10) newData.rankresettime = new Decimal(2);
    if (remember0 >= 11) newData.rankresettime = new Decimal(3);
    if (remember0 >= 12) newData.rankresettime = new Decimal(5);
    if (remember0 >= 13) newData.rankresettime = new Decimal(8);
    if (remember0 >= 14) newData.rankresettime = new Decimal(13);
    if (remember0 >= 15) newData.rankresettime = new Decimal(21);
    if (remember0 >= 16) newData.rankresettime = new Decimal(34);
    if (remember0 >= 17) Shrink.giveChallenge(newData, 0, false);
    if (remember0 >= 18) Shrink.giveChallenge(newData, 1, false);
    if (remember0 >= 19) Shrink.giveChallenge(newData, 2, false);
    if (remember0 >= 20) Shrink.giveChallenge(newData, 3, false);
    if (remember0 >= 21) Shrink.giveChallenge(newData, 4, false);
    if (remember0 >= 22) Shrink.giveChallenge(newData, 5, false);
    if (remember0 >= 23) Shrink.giveChallenge(newData, 6, false);
    if (remember0 >= 24) Shrink.giveChallenge(newData, 7, false);
    if (remember0 >= 25) newData.rank = new Decimal(64);
    if (remember0 >= 26) newData.levelitembought = 108;
    if (remember0 >= 27) newData.rank = new Decimal(128);
    if (remember0 >= 28) newData.levelitembought = 256;
    if (remember0 >= 29) newData.rank = new Decimal(256);
    if (remember0 >= 30) newData.levelitembought = 800;
    if (remember0 >= 31) newData.rank = new Decimal(512);
    if (remember0 >= 32) newData.levelitembought = 1728;
    if (remember0 >= 33) newData.maxlevelgained = new Decimal(1000);
    if (remember0 >= 34) Shrink.giveChallenge(newData, 8, false);
    if (remember0 >= 35) newData.maxlevelgained = new Decimal(3000);
    if (remember0 >= 36) Shrink.giveChallenge(newData, 9, false);
    if (remember0 >= 37) newData.maxlevelgained = new Decimal(10000);
    if (remember0 >= 38) Shrink.giveChallenge(newData, 10, false);
    if (remember0 >= 39) newData.maxlevelgained = new Decimal(30000);
    if (remember0 >= 40) Shrink.giveChallenge(newData, 11, false);
    if (remember0 >= 41) newData.levelresettime = new Decimal(1000);
    if (remember0 >= 42) newData.rankresettime = new Decimal(300);
    if (remember0 >= 43) newData.rank = new Decimal(4096);
    if (remember0 >= 44) newData.shine = 100000;
    if (remember0 >= 45) newData.maxlevelgained = new Decimal(100000);
    if (remember0 >= 46) newData.levelitembought = 6400;
    if (remember0 >= 47) Shrink.giveChallenge(newData, 12, false);
    if (remember0 >= 48) Shrink.giveChallenge(newData, 13, false);
    if (remember0 >= 49) Shrink.giveChallenge(newData, 14, false);
    if (remember0 >= 50) Shrink.giveChallenge(newData, 15, false);
    if (remember0 >= 51) Shrink.giveChallenge(newData, 16, false);
    if (remember0 >= 52) Shrink.giveChallenge(newData, 17, false);
    if (remember0 >= 53) Shrink.giveChallenge(newData, 0, true);
    if (remember0 >= 54) Shrink.giveChallenge(newData, 1, true);
    if (remember0 >= 55) Shrink.giveChallenge(newData, 2, true);
    if (remember0 >= 56) Shrink.giveChallenge(newData, 3, true);
    if (remember0 >= 57) newData.chip[0] = 1;
    if (remember0 >= 58) newData.chip[0] = 15;
    if (remember0 >= 59) newData.chip[0] = 55;
    if (remember0 >= 60) newData.chip[0] = 120;
    if (remember0 >= 61) newData.chip[1] = 1;
    if (remember0 >= 62) newData.chip[1] = 15;
    if (remember0 >= 63) newData.chip[1] = 55;
    if (remember0 >= 64) newData.chip[1] = 120;
    if (remember0 >= 65) newData.chip[2] = 1;
    if (remember0 >= 66) newData.chip[2] = 15;
    if (remember0 >= 67) newData.chip[2] = 55;
    if (remember0 >= 68) newData.chip[2] = 120;
    if (remember0 >= 69) newData.chip[3] = 1;
    if (remember0 >= 70) newData.chip[3] = 15;
    if (remember0 >= 71) newData.chip[3] = 55;
    if (remember0 >= 72) newData.chip[3] = 120;
    if (remember0 >= 73) newData.darklevel = new Decimal(100);
    if (remember0 >= 74) newData.brightness = 30000;
    if (remember0 >= 75) newData.darklevel = new Decimal(500);
    if (remember0 >= 76) newData.shine = 10000000;
    if (remember0 >= 77) newData.darklevel = new Decimal(2000);
    if (remember0 >= 78) newData.chip[0] += st[0] * 1000;
    if (remember0 >= 79) newData.chip[1] += st[1] * 1000;
    if (remember0 >= 80) newData.chip[2] += st[2] * 1000;
    if (remember0 >= 81) newData.chip[3] += st[3] * 1000;

    newData.token = newData.challengecleared.length;

    return newData;
  }
}
