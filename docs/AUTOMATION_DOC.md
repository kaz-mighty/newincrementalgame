# 自動化システム開発資料

このドキュメントはゲーム内の自動化機能に関する詳細な技術資料です。

---

## 概要

ゲームには以下の自動化カテゴリが存在します：

1. **コアオートバイヤー** - 発生器・加速器・リセットの自動化 (`automation.js`)
2. **輪自動化** - リングシステム関連の自動化 (`ring.js`)
3. **外部自動化** - シャイン/ブライト消費、挑戦の自動化 (`shine.js`, `ring.js`)

---

## 1. コアオートバイヤー (`automation.js`)

### アーキテクチャ

```
Automationdata クラス
├── configautobuyer(data, index)  - 設定変更
├── toggleautobuyer(data, index)  - オン/オフ切替
└── updateAutoBuyers(data)        - メインループで実行
```

### オートバイヤー一覧

| Index | 変数名         | 機能               | 解放条件                                         |
| ----- | -------------- | ------------------ | ------------------------------------------------ |
| 0     | `genautobuy`   | 発生器自動購入     | 効力5 (`challengebonuses.includes(5)`)           |
| 1     | `accautobuy`   | 時間加速器自動購入 | 効力10 (`challengebonuses.includes(9)`)          |
| 2     | `autolevel`    | 自動昇段リセット   | 効力15 (`challengebonuses.includes(14)`)         |
| 3     | `litemautobuy` | 段位効力自動購入   | 上位効力6 (`rankchallengebonuses.includes(5)`)   |
| 5     | `autorank`     | 自動昇階リセット   | 上位効力15 (`rankchallengebonuses.includes(14)`) |

> **注意**: Index 4 は未使用

### データ変数（Vueインスタンス `game.js`）

```javascript
// data() 内で定義
genautobuy: false,            // 発生器自動購入フラグ
accautobuy: false,            // 加速器自動購入フラグ
autolevel: false,             // 自動昇段フラグ
litemautobuy: false,          // 段位効力自動購入フラグ
autorank: false,              // 自動昇階フラグ

// 設定値
autolevelnumber: new Decimal(1),     // 最低入手段位
autolevelstopnumber: new Decimal(1), // 昇段停止段位
autoranknumber: new Decimal(1),      // 最低入手階位
autolevelpoint: new Decimal(0),      // 段位リセットポイント閾値（0で無効）
autorankpoint: new Decimal(0),       // 階位リセットポイント閾値（0で無効）
```

### 実行ロジック

#### 発生器自動購入 (genautobuy)

```javascript
if (data.activechallengebonuses.includes(5) && data.genautobuy) {
  for (let i = 7; i >= 0; i--) {
    // 高次発生器から順に購入
    data.buyGenerator(i);
  }
}
```

#### 加速器自動購入 (accautobuy)

```javascript
if (data.activechallengebonuses.includes(9) && data.accautobuy) {
  let ha = data.player.levelitems[3] + 1; // 段位効力で購入上限が拡大
  for (let i = ha; i >= 0; i--) {
    data.buyAccelerator(i);
  }
}
```

#### 自動昇段 (autolevel)

```javascript
if (
  (data.player.rings.outsideauto.autodochallenge || !data.player.onchallenge) &&
  data.activechallengebonuses.includes(14) &&
  data.autolevel
) {
  if (
    data.player.money.greaterThanOrEqualTo(data.resetLevelborder()) &&
    data.player.level.lt(data.autolevelstopnumber)
  ) {
    if (data.calcgainlevel().greaterThanOrEqualTo(data.autolevelnumber)) {
      data.resetLevel(true, false);
    }
  }
}
```

**条件:**

1. 挑戦中でない OR 自動挑戦が有効
2. 効力15が有効
3. `autolevel` がオン
4. ポイントが昇段条件を満たす
5. 現在段位が停止段位未満
6. 獲得段位が設定最低値以上
7. ポイント閾値が設定されている場合、ポイントが閾値以上

#### 自動昇階 (autorank)

```javascript
if (
  !data.player.onchallenge &&
  data.player.rankchallengebonuses.includes(14) &&
  data.autorank
) {
  let autorankshine = Math.max(0, 1000 - data.checkremembers() * 10);

  if (
    data.player.shine >= autorankshine &&
    data.player.money.greaterThanOrEqualTo(data.rankdata.resetRankborder(data))
  ) {
    if (
      data.rankdata.calcgainrank(data).greaterThanOrEqualTo(data.autoranknumber)
    ) {
      data.resetRank(true);
      data.player.shine -= autorankshine; // シャインを消費
    }
  }
}
```

**特徴:**

- 実行時にシャインを消費（思い出が多いほど消費減少）
- 消費量: `1000 - 思い出数 * 10` (最小0)
- ポイント閾値が設定されている場合、ポイントが閾値以上である必要がある

---

## 2. 輪自動化 (`ring.js`)

### 自動周回

リングミッションを自動で繰り返すシステム。

#### データ構造

```javascript
player.rings.auto = {
  doauto: false, // 自動周回有効フラグ
  automissionid: 0, // 自動周回ミッションID（未使用）
};
```

#### 関連関数

```javascript
// 自動周回トグル
configautomission(data) {
    data.player.rings.auto.doauto = !data.player.rings.auto.doauto
    if (data.player.rings.auto.doauto) {
        data.automissiontimerid = setInterval(
            function() { data.ringdata.autoplaymission(data) },
            1000  // 1秒ごと
        )
    } else {
        clearInterval(data.automissiontimerid)
        data.automissiontimerid = 0
    }
}

// 自動周回ロジック
autoplaymission(data) {
    // ターン上限に達したら終了
    if (data.player.rings.missionstate.turn >= this.missioninfo[data.player.rings.missionid].turn) {
        this.endmission(data)
    }

    if (data.player.rings.onmission) {
        this.useskill(data, 0)  // 通常スキルを使用
    } else {
        this.startmission(data, data.player.rings.missionid)
    }
}
```

---

## 3. 外部自動化 (outsideauto)

リングシステムクリアで解放される、メインゲームの自動化機能。

### データ構造 (`constants.js`)

```javascript
player.rings.outsideauto = {
  autospendshine: false, // 輝き自動消費フラグ
  autospendshinenumber: 0, // 消費量（最大1000）
  autospendbright: false, // 煌き自動消費フラグ
  autospendbrightnumber: 0, // 消費量（最大1000）
  autodarklevelreset: false, // 裏段位自動リセット（未実装）
  autodarklevelresetborder: 2, // （未実装）
  autodochallenge: false, // 自動挑戦フラグ
};
```

### 解放条件

| 機能         | 解放条件                                                 |
| ------------ | -------------------------------------------------------- |
| 輝き自動消費 | リングミッション5クリア (`clearedmission.includes(4)`)   |
| 煌き自動消費 | リングミッション12クリア (`clearedmission.includes(11)`) |
| 自動挑戦     | リングミッション13クリア (`clearedmission.includes(12)`) |

### 実装詳細

#### toggleringautobuyer (ring.js)

```javascript
toggleringautobuyer(data, index) {
    if (index == 0) {  // 輝き自動消費
        data.player.rings.outsideauto.autospendshine = !data.player.rings.outsideauto.autospendshine
        if (data.player.rings.outsideauto.autospendshine) {
            data.autoshinetimerid = setInterval(
                function() { data.shinedata.autoshine(data) },
                1000
            )
        } else {
            clearInterval(data.autoshinetimerid)
            data.autoshinetimerid = 0
        }
    }
    if (index == 1) {  // 煌き自動消費
        data.player.rings.outsideauto.autospendbright = !data.player.rings.outsideauto.autospendbright
        if (data.player.rings.outsideauto.autospendbright) {
            data.autobrighttimerid = setInterval(
                function() { data.shinedata.autobright(data) },
                1000
            )
        } else {
            clearInterval(data.autobrighttimerid)
            data.autobrighttimerid = 0
        }
    }
    if (index == 2) {  // 自動挑戦
        data.player.rings.outsideauto.autodochallenge = !data.player.rings.outsideauto.autodochallenge
        if (data.player.rings.outsideauto.autodochallenge) {
            data.autochallengetimerid = setInterval(
                function() { data.shinedata.autochallenge(data) },
                1000
            )
        } else {
            clearInterval(data.autochallengetimerid)
            data.autochallengetimerid = 0
        }
    }
}
```

#### configringautobuyer (ring.js)

```javascript
configringautobuyer(data, index) {
    let input = window.prompt("消費量を設定:最大1000", "")
    input = parseInt(input)
    if (isNaN(input)) return
    if (input < 0 || input > 1000) return

    if (index == 0) {
        data.player.rings.outsideauto.autospendshinenumber = input
    }
    if (index == 1) {
        data.player.rings.outsideauto.autospendbrightnumber = input
    }
}
```

### 自動化コールバック (shine.js)

```javascript
// 輝き自動消費
autoshine(data) {
    this.spendshine(data, data.player.rings.outsideauto.autospendshinenumber)
}

// 煌き自動消費
autobright(data) {
    this.spendbrightness(data, data.player.rings.outsideauto.autospendbrightnumber)
}

// 自動挑戦
autochallenge(data) {
    if (data.player.challengecleared.length == 255) return  // 全クリア済み

    // 現在の挑戦がクリア済みなら次の未クリア挑戦を探す
    if (data.player.challengecleared.includes(
        data.challengedata.getchallengeid(data.player.challenges))
        || data.player.challenges.length == 0) {
        data.challengedata.showunclearedchallenges(data)
    }

    // 挑戦中でなければ開始
    if (!data.player.onchallenge) {
        data.challengedata.startChallenge(data)
    }
}
```

---

## タイマーID管理

各自動化機能は `setInterval` でタイマーを使用。タイマーIDはVueインスタンスで管理。

```javascript
// game.js data()
automissiontimerid: 0,     // リング自動周回
autoshinetimerid: 0,       // 輝き自動消費
autobrighttimerid: 0,      // 煌き自動消費
autochallengetimerid: 0,   // 自動挑戦
```

### セーブ/ロード時の復元 (storage.js)

```javascript
// load() 内
if (data.player.rings.auto.doauto) {
  data.automissiontimerid = setInterval(data.autoplaymission, 1000);
} else {
  clearInterval(data.automissiontimerid);
  data.automissiontimerid = 0;
}
// 同様に autoshinetimerid, autobrighttimerid, autochallengetimerid も復元
```

---

## 副作用・特殊挙動

### 自動挑戦の発生器出力低下

`autodochallenge` が有効な場合、発生器倍率が低下:

```javascript
// generator.js - calccommonmult()
if (data.player.rings.outsideauto.autodochallenge) {
  base = base.mul(0.25); // 25%に減少
}
```

### 遅延発生の警告

UI上で「オンにすると2秒ほどゲームが停止します」と表示。
これは `setInterval` の初期化時に一時的なフリーズが発生するため。

---

## UI構造 (index.html)

```
自動タブ (v-show="player.currenttab == 'auto'")
├── 自動購入器設定
│   ├── 発生器自動購入器 (v-if 効力5)
│   ├── 時間加速器自動購入器 (v-if 効力10)
│   ├── 自動昇段器 (v-if 効力15)
│   │   ├── 設定:入手段位
│   │   └── 設定:停止段位
│   ├── 段位効力自動購入器 (v-if 上位効力6)
│   └── 自動昇階器 (v-if 上位効力15)
│       └── 設定:入手階位
├── 輪自動化器設定 (v-if ミッション5クリア)
│   ├── 輝き自動消費器 (v-if ミッション5クリア)
│   ├── 煌き自動消費器 (v-if ミッション12クリア)
│   └── 自動挑戦器 (v-if ミッション13クリア)
└── リングタブ内
    └── 自動周回設定
```

---

## 新しい自動化機能の追加手順

1. **フラグ変数の追加**
   - `game.js` の `data()` に新フラグを追加
   - 永続化が必要なら `constants.js` の `initialData()` にも追加

2. **トグル関数の拡張**
   - `automation.js` の `toggleautobuyer()` に新indexを追加
   - または `ring.js` の `toggleringautobuyer()` を拡張

3. **設定関数の拡張**（必要な場合）
   - `configautobuyer()` または `configringautobuyer()` を拡張

4. **実行ロジックの追加**
   - 同期実行: `updateAutoBuyers()` に追加
   - 非同期実行: `setInterval` でタイマー登録

5. **UI追加**
   - `index.html` の自動タブにボタン/設定UIを追加
   - 解放条件の `v-if` ディレクティブを設定

6. **セーブ/ロード対応**
   - `storage.js` の `load()` でタイマー復元処理を追加

---

## 注意点

- **タイマー競合**: 複数のタイマーが同じリソースを操作する場合は競合に注意
- **チャレンジ中の挙動**: 多くの自動化は挑戦中に制限される
- **パフォーマンス**: `setInterval` は1秒間隔。頻度を上げると性能影響
- **セーブ永続化**: outsideautoはplayer.ringsに保存、コアオートバイヤーのフラグは非永続

---

_最終更新: 2026-02-07_
