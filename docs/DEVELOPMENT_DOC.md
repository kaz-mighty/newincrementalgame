# 新しい放置ゲーム - AI開発者向け技術資料

## 概要

このゲームは **Antimatter Dimensions** や **Derivative Clicker** に影響を受けたVue.js製のインクリメンタル（放置）ゲームです。プレイヤーは発生器を購入し、ポイントを稼ぎ、複数層のプレステージ（リセット）システムを通じて進行します。

---

## 技術スタック

| 項目           | 技術                               |
| -------------- | ---------------------------------- |
| フレームワーク | Vue.js 3 (Options API)             |
| 大数処理       | break_infinity.js (Decimal クラス) |
| スタイル       | stylesheet.css (バニラCSS)         |
| セーブデータ   | localStorage (Base64エンコード)    |

---

## ファイル構成

```
├── index.html        # メインHTML、Vue テンプレート
├── game.js           # Vue app 本体、メインロジック
├── constants.js      # 定数、初期データ生成 (initialData)
├── generator.js      # 通常発生器 (8階層)
├── accelerator.js    # 時間加速器 (8階層)
├── dark.js           # ダーク発生器・ダークポイント
├── light.js          # ライト発生器・ライトポイント
├── level.js          # 段位リセット (1番目のプレステージ)
├── rank.js           # 階位リセット (2番目のプレステージ)
├── crown.js          # 冠位リセット (3番目のプレステージ)
├── challenge.js      # 挑戦・P挑戦（制約付きプレイ）
├── chip.js           # チップシステム
├── statue.js         # 彫像（チップの強化）
├── shine.js          # シャイン・ブライト・フリッカー通貨
├── ring.js           # リング戦闘ミニゲーム
├── trophy.js         # 実績・小実績
├── world.js          # 複数ワールド・パイプ
├── storage.js        # セーブ・ロード
├── automation.js     # オートバイヤー
├── remember.js       # 記憶システム
├── levelshop.js      # 段位ショップ
├── social.js         # Twitter共有
├── time.js           # 時間水晶システム
├── spirit.js         # 精霊システム（未完成）
├── utils.js          # ユーティリティ関数
├── break_infinity.js # 大数ライブラリ
└── stylesheet.css    # スタイルシート
```

---

## コアシステム解説

### 1. 発生器システム (`generator.js`, `game.js`)

8階層のカスケード式発生器。上位発生器が下位を生産し、最終的にポイント(`money`)を生成。

```
発生器8 → 発生器7 → ... → 発生器1 → ポイント(money)
```

**関連プロパティ:**

- `player.generators[0-7]`: 発生器の量
- `player.generatorsBought[0-7]`: 購入数
- `player.generatorsCost[0-7]`: 現在のコスト

**倍率計算:** `Generatordata.calccommonmult()` で共通倍率、`calcincrementmult()` で個別倍率を計算。

---

### 2. 時間加速器 (`accelerator.js`)

ゲーム内時間の流れを加速。8階層があり、上位が下位を増加させる。

**効果:** `tickspeed` の減少（1000ms → より短く）

---

### 3. ダーク/ライト発生器 (`dark.js`, `light.js`)

通常発生器と別系統の高位発生器。

| 種類         | 解放条件          | 生産物         |
| ------------ | ----------------- | -------------- |
| ダーク発生器 | ポイント >= 1e100 | ダークポイント |
| ライト発生器 | ポイント >= 1e200 | ライトポイント |

**相互作用:** ライト発生器がダーク発生器に倍率を与える。

---

### 4. プレステージ階層

3段階のソフトリセットシステム:

```
昇段リセット (Level)    条件: ポイント >= 1e18
       ↓
昇階リセット (Rank)     条件: ポイント >= 1e72
       ↓
昇冠リセット (Crown)    条件: ポイント >= 1e216
```

**リセット時リワード:**

| リセット | 獲得               | 主な効果             |
| -------- | ------------------ | -------------------- |
| 昇段     | 段位, チップ       | 発生器倍率UP         |
| 昇階     | 階位, 階位トークン | より強力なボーナス   |
| 昇冠     | 冠位               | さらに強力なボーナス |

---

### 5. 挑戦システム (`challenge.js`)

制約付きプレイで報酬を獲得するシステム。

**挑戦タイプ:**

| 種類     | ID管理                   | ボーナス配列             |
| -------- | ------------------------ | ------------------------ |
| 通常挑戦 | `challenges[]`           | `challengebonuses[]`     |
| 階位挑戦 | `rankchallengecleared[]` | `rankchallengebonuses[]` |
| P挑戦    | `pchallenges[]`          | 特殊効果                 |

**挑戦ID計算:** 有効な挑戦の組み合わせをビットフラグで管理 (`calcchallengeid`)

---

### 6. チップ・彫像システム (`chip.js`, `statue.js`)

昇段リセット時に獲得するチップで永続的な強化を行う。

**10種類のチップ:**

- `player.chip[0-9]`: 各種チップの所持数
- `player.setchip[0-99]`: セット済みチップ効果

**彫像:**

- チップを消費して彫像を建設
- シャインで彫像を研磨し追加効果

---

### 7. シャイン・ブライト・フリッカー (`shine.js`)

挑戦クリアで獲得確率が上昇する特殊通貨。

| 通貨       | 解放条件         | 主な用途           |
| ---------- | ---------------- | ------------------ |
| シャイン   | 挑戦64クリア     | 発生器直接ブースト |
| ブライト   | 階位挑戦32クリア | より強力なブースト |
| フリッカー | P挑戦進行        | 最上位ブースト     |

---

### 8. リングシステム (`ring.js`)

ターン制ミニゲーム。リングを装備してミッションをクリア。

**主要機能:**

- `startmission(data, i)`: ミッション開始
- `useskill(data, i)`: スキル使用
- `endmission(data)`: ミッション終了

**ステータス:** 花(flower)、雪(snow)、月(moon) の3系統ポイント

---

### 9. ワールドシステム (`world.js`)

12個の平行ワールドを管理。各ワールドで独立したセーブデータ。

**パイプ:** ワールド間でボーナスを共有する機能

---

### 10. トロフィー・実績 (`trophy.js`)

進行状況に応じて解放される実績システム。

- `player.trophies[]`: メイン実績（12個）
- `player.smalltrophies[]`: 小実績（100個）
- `player.smalltrophies2nd[]`: 第2小実績（100個）

---

### 11. オートメーション (`automation.js`)

自動購入・自動リセット機能。

**対応機能:**

- 発生器自動購入: `genautobuy`
- 加速器自動購入: `accautobuy`
- 自動昇段: `autolevel`
- 自動昇階: `autorank`
- 段位アイテム自動購入: `litemautobuy`

---

### 12. セーブ・ロード (`storage.js`)

**保存形式:**

```javascript
localStorage.setItem("playerStoredb", btoa(JSON.stringify(players)));
```

**ロード時処理:**

1. Base64デコード → JSONパース
2. `deepmerge` で初期データとマージ（後方互換性）
3. Decimal型への復元

---

## プレイヤーデータ構造 (`constants.js`)

主要なプレイヤー変数の一覧:

```javascript
{
  // 基本リソース
  money: Decimal,           // ポイント
  level: Decimal,           // 段位
  rank: Decimal,            // 階位
  crown: Decimal,           // 冠位

  // リセット回数
  levelresettime: Decimal,
  rankresettime: Decimal,
  crownresettime: Decimal,

  // 発生器
  generators: Decimal[8],
  generatorsBought: Decimal[8],
  generatorsCost: Decimal[8],

  // 加速器
  accelerators: Decimal[8],
  acceleratorsBought: Decimal[8],
  acceleratorsCost: Decimal[8],

  // ダーク系
  darkmoney: Decimal,
  darkgenerators: Decimal[8],
  darklevel: Decimal,

  // ライト系
  lightmoney: Decimal,
  lightgenerators: Decimal[8],

  // 特殊通貨
  shine: Number,
  brightness: Number,
  flicker: Number,
  token: Number,
  ranktoken: Number,

  // チップ
  chip: Number[10],
  setchip: Number[100],

  // 挑戦
  onchallenge: Boolean,
  challenges: Number[],
  challengecleared: Number[],
  challengebonuses: Number[],

  // P挑戦
  onpchallenge: Boolean,
  pchallenges: Number[],
  pchallengecleared: Number[1024],

  // リング
  rings: {
    setrings: Array,
    ringsexp: Number[13],
    onmission: Boolean,
    missionstate: Object,
    clearedmission: Array,
    auto: Object,
    outsideauto: Object,
  },

  // その他
  currenttab: String,
  trophies: Boolean[12],
  smalltrophies: Boolean[100],
  worldpipe: Number[12],
}
```

---

## ゲームループ (`game.js` - `update()`)

毎秒（`tickspeed` ミリ秒ごと）に実行:

1. `updateAutoBuyers()` - 自動購入処理
2. `updategenerators()` - 発生器の更新
3. `updateaccelerators()` - 加速器の更新
4. `updatedarkgenerators()` - ダーク発生器更新
5. `updatelightgenerators()` - ライト発生器更新
6. `updateShine()` - シャイン等の獲得判定
7. `checktrophies()` - 実績チェック

---

## 開発時のTips

### 大数の扱い

```javascript
// 正しい比較
player.money.greaterThanOrEqualTo("1e18");
player.level.add(10);
new Decimal("1e100");

// 誤り（JSの数値限界を超える）
player.money >= 1e18; // ×
```

### 挑戦ボーナスの確認

```javascript
// 通常挑戦ボーナス
data.activechallengebonuses.includes(5);

// 階位挑戦ボーナス
data.player.rankchallengebonuses.includes(14);
```

### 新機能追加の流れ

1. `constants.js` の `initialData()` にプレイヤー変数追加
2. `storage.js` の `load()` で Decimal 復元処理追加（必要な場合）
3. 機能用の新JSファイル作成
4. `game.js` でデータオブジェクト追加（例: `xxxdata: new Xxxdata()`）
5. `index.html` で `<script>` タグ追加
6. UIをHTMLに追加

---

## 定数一覧 (`constants.js`)

| 定数名           | 値  | 説明                       |
| ---------------- | --- | -------------------------- |
| `version`        | 2   | セーブデータバージョン     |
| `trophynum`      | 12  | メイントロフィー数         |
| `setchipkind`    | 10  | チップ種類数               |
| `setchipnum`     | 100 | セット可能チップスロット数 |
| `ringmissionnum` | 15  | リングミッション数         |
| `worldnum`       | 12  | ワールド数                 |

---

## 既知の未完成・WIP機能

1. **精霊システム** (`spirit.js`) - ほぼ空の状態
2. **キャンペーン** - クリスマスキャンペーン等のコードが残存

---

## 外部依存

- **Vue.js 3** (CDN)
- **break_infinity.js** - 1e308を超える大数を扱うライブラリ
- **deepmerge** - セーブデータマージ用

---

_この資料はAIコーディング補助向けに作成されました。_
_最終更新: 2026-02-07_
