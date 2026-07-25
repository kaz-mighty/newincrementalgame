# 今後の作業用資料

最終更新: 2026-07-04

## 目的

この資料は、`newincrementalgame` の作業を再開するときに最初に読むための引き継ぎメモです。既存の `docs/*.md` は日本語部分が文字化けしているため、このファイルではソースコードから確認できた内容を日本語で整理します。

## プロジェクト概要

- Antimatter Dimensions / Derivative Clicker 系の静的ブラウザ向けインクリメンタルゲーム。
- Vue 3 の CDN 版を `game/index.html` から読み込み、ビルド工程なしで動く構成。
- 巨大数計算は `game/break_infinity.js` の `Decimal` を使用。
- セーブは `localStorage` の `playerStoredb` に、複数ワールド分の `players` 配列を Base64 化した JSON として保存。
- 現在の作業フォルダには `.git` が無いため、GitHub のブランチ・PR・履歴はこのチェックアウトだけでは確認できない。

## 起動方法

`game/index.html` をブラウザで開くと実行できます。外部 CDN から Vue / deepmerge / is-plain-object を読むため、初回起動や未キャッシュ環境ではネットワーク接続が必要です。

読み込み順は `index.html` 末尾の `<script>` 順に依存しています。新しい機能ファイルを追加するときは、依存先より後、`game.js` より前に読み込ませます。

## 技術構成

| 項目 | 内容 |
| --- | --- |
| UI | `game/index.html` の Vue テンプレート |
| アプリ本体 | `game/game.js` |
| 初期データ | `game/constants.js` の `initialData()` |
| スタイル | `game/stylesheet.css` |
| 保存/読込 | `game/storage.js` |
| 大数計算 | `game/break_infinity.js` |
| 外部ライブラリ | Vue 3.4.5, deepmerge, is-plain-object |

## 中核の流れ

1. `game/game.js` で Vue アプリを作成する。
2. `data()` で `player: initialData()` と各機能クラスのインスタンスを用意する。
3. `mounted()` で `dataload()`、`load(0)`、各種再計算を行う。
4. `setTimeout(this.update, this.player.tickspeed)` でゲームループを開始する。
5. `setInterval(this.save, 2000)` で約2秒ごとに保存する。

`update()` の主な処理順:

1. 時間差分と時間加速を更新。
2. 挑戦ボーナス、実績、記憶、ワールド開放状態を更新。
3. 共通倍率、個別倍率、各種コストを再計算。
4. 通常発生器、時間加速器を更新。
5. シャインなどの上位通貨、自動化、tickspeed を更新。
6. 印石の tick カウンターと較正ミニゲームを更新。
7. 次の `update()` を `setTimeout` で予約。

## ファイル地図

| ファイル | 役割 |
| --- | --- |
| `game/index.html` | すべての画面タブとボタン。タブ開放条件もここに多い。 |
| `game/game.js` | Vue アプリの入口。各機能クラスへの委譲、ゲームループ、computed。 |
| `game/constants.js` | `initialData()`、定数、セーブ対象のプレイヤーデータ構造。 |
| `game/storage.js` | localStorage 保存、Base64 エクスポート/インポート、ロード時の Decimal 復元と旧データ補完。 |
| `game/generator.js` | 通常発生器、購入、倍率、モード、最高発生器判定。 |
| `game/accelerator.js` | 時間加速器、tickspeed に関わる成長。 |
| `game/dark.js` | 裏発生器、裏ポイント、裏段位。 |
| `game/light.js` | 天上発生器、天上ポイント。 |
| `game/level.js` | 昇段リセット、段位獲得量、リセット条件。 |
| `game/rank.js` | 昇階リセット、階位獲得量、リセット条件。 |
| `game/crown.js` | 昇冠リセット、冠位獲得量、リセット条件。 |
| `game/challenge.js` | 通常挑戦、階位挑戦、完全挑戦、挑戦ID、報酬。 |
| `game/shine.js` | シャイン、明るさ、ちらつき、型購入、外部自動化。 |
| `game/chip.js` | 鋳片の獲得、装着、型登録、閾値設定。 |
| `game/statue.js` | 像の作成、研磨、明るさによる研磨。 |
| `game/ring.js` | 輪、ミッション、スキル、輪自動周回。 |
| `game/world.js` | 複数ワールド、パイプ、ワールド収縮。 |
| `game/trophy.js` | メイン実績、小実績、ワールド別小実績の集計。 |
| `game/remember.js` | 記憶と思い出の判定。 |
| `game/time.js` | 時間回帰力、キャンペーン、時間結晶、tickspeed 更新。 |
| `game/markstone.js` | 印石、巨大印石、較正ミニゲーム、成果ショップ。 |
| `game/automation.js` | 発生器/時間加速器/昇段/昇階などの自動化。 |
| `game/social.js` | Tweet リンクと投稿対象設定。 |
| `game/utils.js` | soft cap、表示整形、sleep。 |
| `game/spirit.js` | 精霊系。現状はほぼ空で、`buyspirit` は未実装相当。 |

## データ構造の要点

`initialData()` がセーブデータの基準です。新しい永続データを足す場合は、基本的にここへ追加します。

重要な領域:

- 基本資源: `money`, `level`, `rank`, `crown`
- 発生器: `generators`, `generatorsBought`, `generatorsCost`, `generatorsMode`
- 時間加速器: `accelerators`, `acceleratorsBought`, `acceleratorsCost`
- 裏/天上: `darkmoney`, `darkgenerators`, `darklevel`, `lightmoney`, `lightgenerators`
- 挑戦: `onchallenge`, `challenges`, `challengecleared`, `challengebonuses`, `rankchallengecleared`, `pchallengecleared`
- 永続/準永続: `shine`, `brightness`, `flicker`, `chip`, `setchip`, `statue`, `rings`, `worldpipe`, `markstone`

ロード時には `storage.js` が `deepmerge(initialData(), saved)` で旧セーブを補完し、`Decimal` が必要な値を明示的に復元します。新しい `Decimal` フィールドを足した場合は、`initialData()` だけでなく `load()` の復元処理も確認してください。

## 変更時の基本手順

### 新機能を追加する場合

1. `constants.js` の `initialData()` に必要な保存データを追加する。
2. 新しいロジックを機能別 `.js` に置く。既存の `function Xxxdata()` 形式に合わせる。
3. `game.js` の `data()` に `xxxdata: new Xxxdata()` を追加する。
4. `game.js` の `methods` で UI から呼ぶメソッドを委譲する。
5. `index.html` にタブ、ボタン、表示、開放条件を追加する。
6. 必要なら `storage.js` に旧セーブ補完と `Decimal` 復元を追加する。
7. コスト、倍率、購入条件がゲームループで再計算されるか確認する。

### UI を変更する場合

- 既存 UI は `index.html` に集中している。
- ボタンは `@click` で `game.js` の methods を呼び、実処理は各 `*data` クラスに委譲する形が多い。
- タブ開放条件は `v-if` に直接書かれている箇所が多いため、条件変更時は表示タブと内部ロジックの両方を見る。
- 既存の `docs/UI_GUIDELINES.md` は文字化けしているが、内容としては「1行表示」「既存 CSS クラス利用」「条件付き表示」を重視していた形跡がある。

### 自動化を変更する場合

- コア自動化は `automation.js` の `updateAutoBuyers()`。
- 輪や外部自動化は `ring.js` と `shine.js` にまたがる。
- `setInterval` を使う自動化は、オン/オフ切り替え時とロード時に timer id を適切に初期化する。
- 挑戦中の制限、自動挑戦中の倍率低下など、副作用が複数ファイルに分散している。

## 既知のリスクと改善候補

優先度高:

- 既存ドキュメントと `index.html` の日本語が文字化けしている。作業者が仕様を読み取りづらく、UI 文言の修正も危険。
- `.git` が無い状態なので、履歴・ブランチ・PR と照合できない。GitHub 連携作業前に正規のリポジトリ checkout を用意したい。
- テストや lint の仕組みが見当たらない。計算式変更やセーブ互換性変更の回帰確認が手作業になっている。
- `storage.js` にグローバル代入に見える `saveData = ...` があり、意図しない共有状態を作る可能性がある。
- ロード時の `setInterval(data.autoplaymission, 1000)` などはメソッドの `this`/引数文脈に注意が必要。現状動作確認が必要。

優先度中:

- `console.log` が多数残っており、保存データ全体を出力する箇所もある。公開版では削減したい。
- `window.prompt` / `confirm` / `alert` による入力が多く、誤入力やキャンセル時の UX が弱い。
- `index.html` が巨大化しており、タブごとの見通しが悪い。
- `game.js` の `update()` が多くの責務を持っているため、変更の影響範囲を追いにくい。
- `spirit.js` は実装がほぼ空で、UI 開放条件だけが存在する。

優先度低:

- ファイルごとにインデントやコメントの文字化けが混在している。
- CDN 依存のため、オフラインや CDN 障害時の起動性は低い。
- `README.md` が短く、起動方法や保守方針が不足している。

## 次にやるとよい作業

1. 文字化けしている既存ドキュメントを、この資料を元に置き換える。
2. 正規の GitHub リポジトリとして clone し直すか、このフォルダに `.git` を復元する。
3. セーブ/ロードの最小回帰テストを追加する。特に `Decimal` 復元と旧セーブ補完。
4. `storage.js` の暗黙グローバル代入とログ出力を整理する。
5. `spirit.js` を実装するか、未実装タブを一時的に隠す。
6. `index.html` のタブ構造を分割できるか検討する。まずはコメントや見出し整理でも効果が大きい。

## 作業前チェックリスト

- [ ] 変更対象の機能ファイルを確認した。
- [ ] `constants.js` の保存データに影響があるか確認した。
- [ ] `storage.js` の旧セーブ補完と `Decimal` 復元が必要か確認した。
- [ ] `game.js` の `data()` / `methods` / `update()` との接続を確認した。
- [ ] `index.html` の表示条件とボタン呼び出しを確認した。
- [ ] セーブ、ロード、リセット、ワールド移動に影響がないか確認した。

## 手動確認メモ

このプロジェクトには自動テストが見当たらないため、変更後は最低限ブラウザで以下を確認します。

- 初回起動して `basic` タブが表示される。
- 発生器を購入でき、ポイントが増える。
- セーブ後に再読み込みして資源が復元される。
- 対象機能のタブ開放条件とボタンが動く。
- コンソールに致命的なエラーが出ていない。
