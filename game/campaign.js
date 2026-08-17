class Campaign {
  /* リアクティビティーを利用する為に、Vue.markRawを使用する。
     インスタンス化する際は必ずnewメソッドを使用し、
     全プロパティは手動でリアクティブ化しなければならない。
  */

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
      predicate: (month, date) => month == 6 && date <= 7,
    },
    "aniv": {
      title: "周年キャンペーン",
      desc: "発生器の倍率が+8倍",
      cost: 2,
      commonBonus: 2,
      predicate: (month, date) => (month == 6 && date >= 30) || month == 7
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
      predicate: (month, date) => month == 6 && date <= 7,
    },
    "xmas2": {
      title: "クリスマスキャンペーン2",
      desc: "輝き系の入手時、50%の確率で入手数+1",
      cost: 2,
      commonBonus: 0,
    },
  };

  /** @param {PlayerSaveData} playerData */
  static new(playerData) {
    return Vue.markRaw(new Campaign(playerData));
  }

  /** @param {PlayerSaveData} playerData */
  constructor(playerData) {
    this._accelLevel = Vue.ref(playerData.accelevel);
    this._accelLevelUsed = Vue.ref(playerData.accelevelused);
    this.activated = Vue.reactive(Array.from(playerData.activatedcampaigns));

    const date = new Date();
    this._nowMonth = Vue.ref(date.getMonth());
    this._nowDate = Vue.ref(date.getDate());

    this._sumCommonBonus = Vue.computed(() => {
      let sum = 0;
      for (const campaignId of this.activated) {
        sum += Campaign.campaigns[campaignId]?.commonBonus ?? 0;
      }
      return sum;
    });
    this._campaignCosts = Vue.computed(() => {
      let sum = 0;
      for (const campaignsId of this.activated) {
        const campaign = Campaign.campaigns[campaignsId];
        if (campaign == undefined) continue;
        if (this.isDuring(campaign)) continue;
        sum += campaign.cost;
      }
      return sum;
    });
  }

  /* 他のクラスとの一貫性のため、外部にはrefを使用していないかのように振る舞う。 */
  get accelLevel() {return this._accelLevel.value;}
  set accelLevel(x) {this._accelLevel.value = x;}
  get accelLevelUsed() {return this._accelLevelUsed.value;}
  set accelLevelUsed(x) {this._accelLevelUsed.value = x;}
  get sumCommonBonus() {return this._sumCommonBonus.value;}
  get campaignCosts() {return this._campaignCosts.value;}

  updateCampaign() {
    // Note: 1tickの間、期間中キャンペーンが空になることがあるが、元の仕様の再現を優先
    const date = new Date();
    this._nowMonth.value = date.getMonth();
    this._nowDate.value = date.getDate();

    for (const campaignId in Campaign.campaigns) {
      if (!this.isDuring(Campaign.campaigns[campaignId])) continue;
      if (this.activated.includes(campaignId)) continue;
      this.activated.push(campaignId);
    }

    if (this.campaignCosts > this.accelLevelUsed) {
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
    if (this.campaignCosts <= newLevel && newLevel <= this.accelLevel) {
      this.accelLevelUsed = newLevel;
    }
  }

  /** @param {CampaignItem} campaign */
  isDuring(campaign) {
    return campaign.predicate?.(this._nowMonth.value, this._nowDate.value) ?? false;
  }

  clearActivated() {
    this.activated.splice(0);
  }

  /** @param {string} campaignId */
  chooseCampaigns(campaignId) {
    if (this.activated.includes(campaignId)) {
      this.activated.splice(this.activated.indexOf(campaignId), 1);
    } else {
      if (this.campaignCosts + (Campaign.campaigns[campaignId]?.cost ?? 0) > this.accelLevelUsed) return;
      this.activated.push(campaignId);
    }
  }
}
