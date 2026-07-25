function Storagedata() {
  this.initialData = function () {
    return initialData();
  };

  this.save = function (data) {
    data.players[data.world] = data.player;

    localStorage.setItem("playerStoredb", btoa(JSON.stringify(data.players)));

    console.log("save succeeded" + Date.now());
  };

  this.dataload = function (data) {
    if (!localStorage.getItem("playerStoredb")) return;
    console.log(atob(localStorage.getItem("playerStoredb")));
    data.players = JSON.parse(atob(localStorage.getItem("playerStoredb")));

    while (data.players.length < worldnum) {
      data.players.push(this.initialData());
    }

    for (let i = 0; i < worldnum; i++) {
      const overwriteMerge = (destinationArray, sourceArray, options) =>
        sourceArray;

      saveData = deepmerge(this.initialData(), data.players[i], {
        arraymerge: overwriteMerge,
        isMergeableObject: isPlainObject,
      });

      while (saveData.trophies.length < trophynum) {
        saveData.trophies.push(false);
      }

      while (saveData.boughttype.length < 6) {
        saveData.boughttype.push(false);
      }

      while (saveData.chip.length < setchipkind) {
        saveData.chip.push(0);
      }

      while (saveData.statue.length < setchipkind) {
        saveData.statue.push(0);
      }

      while (saveData.rings.ringsexp.length < 13) {
        saveData.rings.ringsexp.push(0);
      }

      while (saveData.spiritlevela.length < data.spiritdata.spiritnuma) {
        saveData.spiritlevela.push(0);
      }

      while (
        saveData.spiritboughtcurrentcrown.length < data.spiritdata.spiritnuma
      ) {
        saveData.spiritboughtcurrentcrown.push(0);
      }

      while (saveData.worldpipe.length < worldnum) {
        saveData.worldpipe.push(0);
      }

      if (saveData.markstone) {
        if (!saveData.markstone.calibration) {
          saveData.markstone.calibration = {
            active: false,
            selectedEnemy: 0,
            enemyHp: 100,
            enemyLevel: 1,
            cooldown: 0,
            totalDamage: 0,
            achievements: 0,
            shopUpgrades: [false, false, false],
            resolutions: [0, 0],
          };
        }
        while (saveData.markstone.calibration.resolutions.length < 3) {
          saveData.markstone.calibration.resolutions.push(0);
        }
        if (!saveData.markstone.calibration.shopUpgrades) {
          saveData.markstone.calibration.shopUpgrades = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ];
        }
        while (saveData.markstone.calibration.shopUpgrades.length < 7) {
          saveData.markstone.calibration.shopUpgrades.push(false);
        }
      }

      data.players[i] = saveData;
    }
  };

  this.load = function (data, world) {
    saveData = data.players[world];
    data.world = world;
    console.log(saveData);

    data.player = {
      money: new Decimal(saveData.money),
      level: new Decimal(saveData.level),
      levelresettime: new Decimal(saveData.levelresettime ?? 0),
      maxlevelgained: new Decimal(saveData.maxlevelgained ?? 1),

      rank: new Decimal(saveData.rank ?? 0),
      rankresettime: new Decimal(saveData.rankresettime ?? 0),

      crown: new Decimal(saveData.crown ?? 0),
      crownresettime: new Decimal(saveData.crownresettime ?? 0),

      generators: saveData.generators.map((v) => new Decimal(v)),
      generatorsBought: saveData.generatorsBought.map((v) => new Decimal(v)),
      generatorsCost: saveData.generatorsCost.map((v) => new Decimal(v)),

      accelerators: saveData.accelerators.map((v) => new Decimal(v)),
      acceleratorsBought: saveData.acceleratorsBought.map(
        (v) => new Decimal(v),
      ),
      acceleratorsCost: saveData.acceleratorsCost.map((v) => new Decimal(v)),

      darkmoney: new Decimal(saveData.darkmoney),

      darkgenerators: saveData.darkgenerators.map((v) => new Decimal(v)),
      darkgeneratorsBought: saveData.darkgeneratorsBought.map(
        (v) => new Decimal(v),
      ),
      darkgeneratorsCost: saveData.darkgeneratorsCost.map(
        (v) => new Decimal(v),
      ),

      lightmoney: new Decimal(saveData.lightmoney ?? 0),

      lightgenerators: saveData.lightgenerators.map((v) => new Decimal(v)),
      lightgeneratorsBought: saveData.lightgeneratorsBought.map(
        (v) => new Decimal(v),
      ),
      lightgeneratorsCost: saveData.lightgeneratorsCost.map(
        (v) => new Decimal(v),
      ),

      darklevel: new Decimal(saveData.darklevel),
    };

    const overwriteMerge = (destinationArray, sourceArray, options) =>
      sourceArray;

    data.player = deepmerge(saveData, data.player, {
      arraymerge: overwriteMerge,
      isMergeableObject: isPlainObject,
    });
    console.log(data.player.levelresettime);
    console.log(typeof data.player.levelresettime);
    data.player.levelresettime.greaterThan(1);

    data.player.currenttab = "basic";
    if (!data.player.onchallenge || data.player.challengebonuses.includes(4))
      data.activechallengebonuses = data.player.challengebonuses;

    data.checktrophies();
    data.checkmemories();
    data.checkremembers();
    data.checkworlds();
    data.countsmalltrophies();
    data.calccommonmult();
    data.findhighestgenerator();

    data.checkpipedsmalltrophies();

    data.countpchallengecleared();

    data.calcgncost();
    data.calcaccost();
    data.calcdgcost();
    data.calclgcost();
    data.checkusedchips();

    if (data.player.rings.auto.doauto) {
      data.automissiontimerid = setInterval(data.autoplaymission, 1000);
    } else {
      clearInterval(data.automissiontimerid);
      data.automissiontimerid = 0;
    }
    if (data.player.rings.outsideauto.autospendshine) {
      data.autoshinetimerid = setInterval(data.autoshine, 1000);
    } else {
      clearInterval(data.autoshinetimerid);
      data.autoshinetimerid = 0;
    }
    if (data.player.rings.outsideauto.autospendbright) {
      data.autobrighttimerid = setInterval(data.autobright, 1000);
    } else {
      clearInterval(data.autobrighttimerid);
      data.autobrighttimerid = 0;
    }
    if (data.player.rings.outsideauto.autodochallenge) {
      data.autochallengetimerid = setInterval(data.autochallenge, 1000);
    } else {
      clearInterval(data.autochallengetimerid);
      data.autochallengetimerid = 0;
    }
  };

  this.exportsave = function (data) {
    data.exported = btoa(JSON.stringify(data.players));
  };

  this.exportsavefile = function (data) {
    let result = btoa(JSON.stringify(data.players));
    const file = new Blob([result], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = `newincremantal_savedata${new Date()}.txt`;
    a.click();
  };

  this.importsave = function (data) {
    let input = window.prompt("データを入力", "");
    if (input.length <= 50) {
      console.log("returned");
      return;
    }
    let k = atob(input).charAt(0);
    console.log(k);
    if (k == "{") return;
    localStorage.setItem("playerStoredb", input);
    this.dataload(data);
    this.load(data, 0);
  };

  this.resetData = function (data, force) {
    if (
      force ||
      confirm(
        "これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？",
      )
    ) {
      data.player = this.initialData();
      for (let i = 0; i < worldnum; i++) {
        data.players[i] = this.initialData();
      }
    }
  };
}
