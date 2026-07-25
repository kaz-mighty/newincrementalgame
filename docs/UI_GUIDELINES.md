# UI設計ガイドライン

このドキュメントは、新しい放置ゲームのUI設計における方針をまとめたものです。

## 基本方針

### 1. 行レイアウト

- 各アイテムの情報は **1行** にまとめる
- 改行や複数行構造は避ける
- 助数詞（「個」など）は不要

### 2. ボタン配置

- 選択/操作ボタンは **行の左端** に配置
- ボタンには **対象の名前** を表示（「選択」ではなく「杖印石」など）

### 3. 情報表示順序

ボタンの右に情報を以下の順序で表示:

```
[ボタン名] ラベル: 値 ラベル: 値 ラベル: 値
```

例:

```
[杖印石] 所持数: 5 次回入手条件: 1.000e+256 今冠位入手: 2
```

### 4. 条件付き表示

- 特定の条件でのみ意味がある情報は `v-if` で非表示にする
- 例: 冠位リセット0回のときは「今冠位入手」を表示しない

### 5. CSSクラス

- 見た目の統一には既存のCSSクラスを使用
- `statue-container` / `statue-item`: アイテム一覧のコンテナ
- `autobuyerbutton`: ボタンスタイル
- `:class="{ 'selected': 条件 }"`: 選択状態のハイライト

### 6. 構造の一貫性

- 他のタブと **見た目だけ** を似せる
- 既存のUIの構造（info/actions分離など）を完全にコピーしない
- シンプルな1行形式を維持

## 実装例

```html
<div class="statue-container">
  <div class="statue-item">
    <button
      type="button"
      class="autobuyerbutton"
      :class="{ 'selected': player.markstone.selectedType === 0 }"
      @click="markstonedata.selectType(whole, 0)"
    >
      杖印石
    </button>
    所持数: {{ player.markstone.club }} 次回入手条件: {{
    markstonedata.calcClubRequirement(whole).toExponential(3) }}
    <span v-if="player.crownresettime.gt(0)">
      今冠位入手: {{ player.markstone.clubGainedSinceCrownReset }}</span
    >
  </div>
</div>
```

## チェックリスト

新しいUIを作成する際の確認事項:

- [ ] 1行にまとまっているか
- [ ] ボタンは左端に配置されているか
- [ ] ボタンに対象名が書かれているか
- [ ] 助数詞を使っていないか
- [ ] 条件付き表示が適切か
- [ ] 既存のCSSクラスを使用しているか
