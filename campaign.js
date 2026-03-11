class Campaign {
  /** @type {Object<string, CampaignItem>} */
  static campaigns = {
    "newyear": {
      title: "新年キャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "vt": {
      title: "バレンタインキャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "hina": {
      title: "ひなまつりキャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "gw": {
      title: "ゴールデンウィークキャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "tanabata": {
      title: "七夕キャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
      predicate: (date) => date.getMonth() == 6 && date.getDate() <= 7,
    },
    "aniv": {
      title: "周年キャンペーン",
      desc: "発生器の倍率が+8倍",
      cost: 2,
      commonBonus: 2,
      predicate: (date) => (date.getMonth() == 6 && date.getDate() >= 30) || date.getMonth() == 7
    },
    "sw": {
      title: "シルバーウィークキャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "xmas": {
      title: "クリスマスキャンペーン",
      desc: "発生器の倍率が+4倍",
      cost: 1,
      commonBonus: 1,
    },
    "newyear2025": {
      title: "新年キャンペーン2025",
      desc: "挑戦4と5を含む挑戦中、発生器の倍率が+40倍",
      cost: 3,
      commonBonus: 0,
    },
    "gw2": {
      title: "ゴールデンウィークキャンペーン2",
      desc: "金片の入手数が+4個",
      cost: 2,
      commonBonus: 0,
    },
    "tanabata2": {
      title: "七夕キャンペーン2",
      desc: "天上ポイントが獲得鋳片に影響",
      cost: 4,
      commonBonus: 0,
      predicate: (date) => date.getMonth() == 6 && date.getDate() <= 7,
    },
    "xmas2": {
      title: "クリスマスキャンペーン2",
      desc: "輝き系の入手時、50%の確率で入手数+1",
      cost: 2,
      commonBonus: 0,
    },
  };

  /**
   * @param {CampaignItem} campaign
   * @param {Date} date 
   */
  static isDuring(campaign, date) {
    return campaign.predicate?.(date) ?? false;
  }

}
