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

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this.accelLevel = playerData.accelevel;
    this.accelLevelUsed = playerData.accelevelused;
    this.activated = Array.from(playerData.activatedcampaigns);
  }

  updateCampaign() {
    // todo: 1tickの間、期間中キャンペーンが空になることがあるが、現在は元の仕様の維持を優先
    let date = new Date()

    for (const campaingId in Campaign.campaigns) {
      if (!Campaign.isDuring(Campaign.campaigns[campaingId], date)) continue;
      if (this.activated.includes(campaingId)) continue;
      this.activated.push(campaingId);
    }

    if (this.calcCampaignCosts() > this.accelLevelUsed) {
      this.clearActivated();
      return true;
    }
    return false;
  }

  /** @param {number} tickSpeed */
  updateAccelLevel(tickSpeed) {
    if (this.accelLevelUsed == this.accelLevel && tickSpeed <= 10) {
      this.accelLevel++;
    }
  }

  /** @param {number} value */
  addAccelLevelUsed(value) {
    const newLevel = this.accelLevelUsed + value;
    if (this.calcCampaignCosts() <= newLevel && newLevel <= this.accelLevel) {
      this.accelLevelUsed = newLevel;
    }
  }

  clearActivated() {
    this.activated = [];
  }

  calcCampaignCosts() {
    let sum = 0
    let date = new Date()
    for (const campaignsId of this.activated) {
      const campaign = Campaign.campaigns[campaignsId];
      if (campaign == undefined) continue;
      if (Campaign.isDuring(campaign, date)) continue;
      sum += campaign.cost;
    }
    return sum;
  }

  /** @param {string} campaignId */
  chooseCampaigns(campaignId) {
    if (this.activated.includes(campaignId)) {
      this.activated.splice(this.activated.indexOf(campaignId), 1)
    } else {
      if (this.calcCampaignCosts() + (Campaign.campaigns[campaignId]?.cost ?? 0) > this.accelLevelUsed) return;
      this.activated.push(campaignId)
    }
  }
}
