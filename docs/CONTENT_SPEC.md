# コンテンツ仕様説明書

最終更新: 2026-07-04

この文書は、開発者が各コンテンツの役割、開放条件、主要データ、関連ファイルを把握するための仕様メモです。既存の人間向け説明やプレイヤー向け表現を置き換えるものではなく、実装作業用の参照資料として追加しています。

## 全体構造

ゲームは `game/index.html` のタブ UI と、機能別の `*data` クラスで構成されています。`game/game.js` が Vue アプリの入口になり、各機能クラスを `data()` で保持し、UI から呼ばれるメソッドを各クラスへ委譲します。

主な進行は、ポイント獲得、発生器購入、時間加速、リセット階層、挑戦、上位通貨、ワールド拡張、補助ミニゲームの順に広がります。

## 通常タブ

関連ファイル: `index.html`, `game.js`, `generator.js`, `accelerator.js`, `time.js`

通常タブはゲームの基本ループです。ポイント `money` を使って発生器と時間加速器を購入し、発生器がポイントまたは下位発生器を増やします。

開放条件:

- 初期状態から表示。
- 時間加速器2以降は `levelresettime > 0` で表示。
- 一部の時間加速器は `levelitems[3]` や `accelevel` により段階的に表示。

主なデータ:

- `player.money`
- `player.generators[0-7]`
- `player.generatorsBought[0-7]`
- `player.generatorsCost[0-7]`
- `player.generatorsMode[0-7]`
- `player.accelerators[0-7]`
- `player.acceleratorsBought[0-7]`
- `player.acceleratorsCost[0-7]`
- `player.tickspeed`

仕様:

- 発生器は8階層。通常は上位発生器が下位発生器を生産し、発生器1がポイントを生産する。
- `generatorsMode` により、発生器がどの下位対象へ生産するかを切り替える。
- 挑戦ボーナス13が有効な場合、発生器は全モード同時として扱われる。
- 時間加速器1は `tickspeed` 短縮の中心。時間加速器2以降は下位の時間加速器を増やす。
- 発生器購入コストは `calcgncost()`、時間加速器購入コストは `calcaccost()` で再計算される。
- 共通倍率は `calccommonmult()`、発生器別倍率は `calcbasicincrementmult()` と `calcincrementmult()` に分かれる。

開発注意:

- 大数は必ず `Decimal` とその比較メソッドで扱う。
- 挑戦、鋳片、像、記憶、印石、キャンペーン、ワールドパイプが倍率に絡むため、発生器倍率変更は影響範囲が広い。
- `generatorsMode` の変更は挑戦3中に禁止される。

## 段位

関連ファイル: `level.js`, `levelshop.js`, `index.html`

段位は最初のリセット階層です。ポイントをリセットして `level` と `levelresettime` を獲得します。発生器倍率、段位効力、チップ獲得などの基盤になります。

開放条件:

- タブ表示は `levelresettime > 0 || rankresettime > 0 || crownresettime > 0`。
- 昇段リセットボタンは通常 `money >= 1e18`。
- 挑戦1中は昇段条件が `1e24` になる。

主なデータ:

- `player.level`
- `player.levelresettime`
- `player.maxlevelgained`
- `player.levelitems[0-4]`
- `player.levelitembought`

仕様:

- `calcgainlevel()` が獲得段位を計算する。
- `resetLevel(force, exit)` でポイント、発生器、時間加速器、tickspeed を初期化する。
- 挑戦中の昇段成功時は挑戦クリア判定が行われ、`challengecleared` に挑戦IDが追加される。
- `money > 1e80` 以降は鋳片獲得処理が走る。
- 時間回帰力を持つ場合、リセット時に時間結晶 `timecrystal` が更新される。

開発注意:

- 完全挑戦中の一部条件では段位獲得量やリセット回数が弱体化される。
- `force` は自動化や挑戦開始時の内部リセットで使われる。
- `exit` は挑戦開始時のリセットなど、報酬を得ない文脈で使われる。

## 階位

関連ファイル: `rank.js`, `challenge.js`, `markstone.js`, `index.html`

階位は2番目のリセット階層です。段位を含む下位進行をリセットし、`rank` と `rankresettime` を得ます。階位挑戦、階位効力、印石獲得の入口でもあります。

開放条件:

- タブ表示は `rankresettime > 0 || crownresettime > 0`。
- リセット条件は `resetRankborder()` で計算され、基本は `1e72`。
- 挑戦1中は基準が高くなり、記憶により必要指数が下がる。

主なデータ:

- `player.rank`
- `player.rankresettime`
- `player.ranktoken`
- `player.rankchallengecleared`
- `player.rankchallengebonuses`
- `player.markstone`

仕様:

- `calcgainrank()` が獲得階位を計算する。
- 階位リセット時に `markstonedata.tryGetSelected()` が呼ばれ、選択中の印石を条件達成なら入手する。
- 階位リセット時に `markstone.ticksSinceRankReset` は0へ戻る。
- 通常挑戦を128個以上クリア済みで挑戦中に階位リセットすると、階位挑戦クリアとして `rankchallengecleared` に記録される。
- リセット後は `level`, `levelresettime`, 発生器、時間加速器、段位効力が初期化される。

開発注意:

- 印石は階位リセットと強く結びついているため、階位条件や自動階位を調整すると印石進行にも影響する。
- `rankchallengebonuses` は通常成長、時間加速、シャイン、ワールドなど多方面へ影響する。

## 冠位

関連ファイル: `crown.js`, `index.html`

冠位は3番目のリセット階層です。階位以下をリセットして `crown` と `crownresettime` を得ます。

開放条件:

- タブ表示は `crownresettime > 0`。
- リセット条件は `1e216`。
- 挑戦中は昇冠不可。

主なデータ:

- `player.crown`
- `player.crownresettime`
- `player.markstone.*GainedSinceCrownReset`

仕様:

- `calcgaincrown()` は `money.log10() / 72` を基準に冠位獲得量を計算する。
- 昇冠時は `money`, `level`, `rank`, 下位発生器、時間加速器、段位効力が初期化される。
- 通常の昇冠では `crown` と `crownresettime` が増える。
- 冠位リセット後、冠位中に得た印石数カウンターが0に戻る。

開発注意:

- 完全挑戦開始時に `resetCrown(true)` が使われるため、`force` 時の報酬付与有無に注意する。

## 裏

関連ファイル: `dark.js`, `index.html`

裏は通常発生器とは別系統の高位発生器です。裏発生器は裏ポイント `darkmoney` を生産し、裏ポイントや裏発生器は通常発生器を強化します。

開放条件:

- タブ表示は `money >= 1e100` または `darkgenerators[0] >= 1`。
- 裏ポイント表示と追加説明は `rankchallengecleared.length >= 32` 以降。

主なデータ:

- `player.darkmoney`
- `player.darkgenerators[0-7]`
- `player.darkgeneratorsBought[0-7]`
- `player.darkgeneratorsCost[0-7]`
- `player.darklevel`

仕様:

- 裏発生器はポイントで購入する。
- 裏発生器1が `darkmoney` を生産し、上位裏発生器が下位裏発生器を生産する。
- `darklevel`、ライトポイント、ライト発生器、鋳片、小実績パイプが裏生産に影響する。
- `darkmoney >= 1e18` で裏昇段リセットが可能。
- 裏昇段リセットは裏ポイントと裏発生器を初期化し、`darklevel` を増やす。

## 天上

関連ファイル: `light.js`, `index.html`

天上は裏より上位の発生器系統です。天上ポイント `lightmoney` を生産し、裏発生器の生産に倍率を与えます。

開放条件:

- タブ表示は `money >= 1e200 && crownresettime > 0` または `lightgenerators[0] >= 1`。
- 天上ポイント表示は `pchallengestage >= 1`。

主なデータ:

- `player.lightmoney`
- `player.lightgenerators[0-7]`
- `player.lightgeneratorsBought[0-7]`
- `player.lightgeneratorsCost[0-7]`

仕様:

- 天上発生器はポイントで購入する。
- 天上発生器1が `lightmoney` を生産し、上位天上発生器が下位天上発生器を生産する。
- 小実績パイプが天上生産に影響する。

## 挑戦

関連ファイル: `challenge.js`, `level.js`, `rank.js`, `index.html`

挑戦は制約付きの進行モードです。通常挑戦、階位挑戦、完全挑戦の3系統があります。

開放条件:

- 挑戦 UI は段位タブ内に表示される。
- 完全挑戦は通常挑戦255個、階位挑戦255個の完了が前提。
- 完全挑戦開始には、選択中の完全挑戦数に応じた像の作成数も必要。

主なデータ:

- `player.onchallenge`
- `player.challenges`
- `player.challengecleared`
- `player.challengebonuses`
- `player.token`
- `player.onpchallenge`
- `player.pchallenges`
- `player.pchallengecleared[1024]`
- `player.prchallengecleared[1024]`
- `pchallengestage`

仕様:

- 通常挑戦は8種類の制約をビットフラグ化し、1から255までの挑戦IDで管理する。
- 挑戦開始時は昇段相当のリセットを行い、選択した制約を有効化する。
- 挑戦クリアは昇段リセット成功時に判定される。
- 通常挑戦クリア数は `token` になり、挑戦効力の購入に使う。
- 階位挑戦は通常挑戦クリア128個以降、挑戦中に階位リセットを行うことで記録される。
- 階位挑戦クリア数は `ranktoken` になり、上位効力の購入に使う。
- 完全挑戦は通常挑戦/階位挑戦を一時的に空にして進行し、終了時に達成数を `pchallengecleared` と `prchallengecleared` に記録する。
- `pchallengestage` は完全挑戦進行度の合計から算出され、天上ポイント表示、瞬き、精霊タブなどの条件に使われる。

開発注意:

- 挑戦IDは `calcchallengeid()` と `calcchallengesarray()` の対応を崩さないこと。
- `activechallengebonuses` は挑戦中かつ効力4未取得の場合に空になる。
- 挑戦制約は発生器、時間加速器、段位/階位獲得、鋳片、裏系統など複数ファイルで参照される。

## 輝き・煌き・瞬き

関連ファイル: `shine.js`, `statue.js`, `ring.js`, `index.html`

輝き系は時間経過で確率獲得する特殊通貨です。直接消費により発生器や上位系統へ一時的な生産処理を走らせます。

開放条件:

- 輝きタブは `challengecleared.length >= 64`。
- 煌きは `rankchallengecleared.length >= 32` 以降。
- 瞬きは `pchallengestage >= 1` 以降。

主なデータ:

- `player.shine`
- `player.brightness`
- `player.flicker`
- `shinepersent`
- `brightpersent`
- `flickerpersent`
- `player.boughttype[0-5]`

仕様:

- 輝き獲得率は通常挑戦クリア数、鋳片、パイプ小実績、残滓、輝像により上がる。
- 煌き獲得率は階位挑戦クリア数、鋳片、パイプ小実績、煌像により上がる。
- 瞬き獲得率は `pchallengestage` に比例し、完成した瞬像数で増える。計算式は `getfp(pchallengestage) + (1 / 1000000) * sum(floor(polishedstatuefl[i] / 100))`。
- 輝き消費は通常発生器と時間加速器を進める。
- 煌き消費は通常発生器、時間加速器、裏発生器を進める。
- 瞬き消費は通常発生器、時間加速器、裏発生器、天上発生器を進める。
- `boughttype` はモード型、効力型、上位効力型、鋳片型などの登録機能解放に使う。

開発注意:

- 完全挑戦7中は輝き/煌き消費が無効。
- 輝き消費でトロフィー9取得後に `residue` が増える。

## 自動

関連ファイル: `automation.js`, `ring.js`, `shine.js`, `index.html`

自動タブは自動購入、自動リセット、輪由来の外部自動化を扱います。

開放条件:

- タブ表示は `levelresettime > 0 || rankresettime > 0 || crownresettime > 0`。
- 発生器自動購入は挑戦効力5。
- 時間加速器自動購入は挑戦効力9。
- 自動昇段は挑戦効力14。
- 段位効力自動購入は上位効力5。
- 自動昇階は上位効力14。
- 輪由来の自動化は輪ミッション5、12、13クリアで順に開放。

主なデータ:

- `genautobuy`
- `accautobuy`
- `autolevel`
- `autolevelnumber`
- `autolevelstopnumber`
- `autolevelpoint`
- `litemautobuy`
- `autorank`
- `autoranknumber`
- `autorankpoint`
- `autorankrequiremarkstone`
- `player.rings.auto`
- `player.rings.outsideauto`

仕様:

- `updateAutoBuyers()` はゲームループ内で毎回呼ばれる。
- 自動昇段は必要ポイント、獲得段位、停止段位、任意のポイント閾値を満たすと実行される。
- 自動昇階はシャイン消費、獲得階位、任意のポイント閾値、任意の印石獲得可能条件を満たすと実行される。
- 輪由来の自動消費は `setInterval` による1秒間隔処理。
- 自動挑戦は未クリア挑戦を選び、挑戦開始を繰り返す。

## 鋳片

関連ファイル: `chip.js`, `level.js`, `index.html`

鋳片は昇段リセット時に獲得する強化素材です。鋳片をスロットに装着することで各種倍率や獲得量を強化します。

開放条件:

- タブ表示は `smalltrophies[5]`。
- 鋳片獲得処理は昇段リセット時、`money > 1e80` で走る。

主なデータ:

- `player.chip[0-9]`
- `player.setchip[0-99]`
- `player.disabledchip[0-99]`
- `player.spendchip[0-9]`
- `chipused[0-9]`
- `chipthresholduse`
- `chipthreshold`
- `player.setchiptypefst`

仕様:

- 鋳片種別は10種類。
- 獲得対象はポイント帯から算出される `clevel` と確率表 `ptable` により決まる。
- 同じ種類の鋳片を複数スロットに使うほど、次の必要消費が増える。
- `setchip` の値は1始まりで鋳片種別を表し、0は未装着。
- 完全挑戦10中は条件によってランダムな鋳片効力が無効化される。
- 鋳片型購入後は現在の装着構成を保存し、一括復元できる。

開発注意:

- `setchip` の各スロットは発生器、時間加速、段位、階位、裏、輝きなど広範囲で直接参照される。
- `chipset()` は消費済み鋳片の返却と再消費を同時に扱うため、装着仕様を変える場合は慎重に見る。

## 像

関連ファイル: `statue.js`, `chip.js`, `challenge.js`, `index.html`

像は鋳片を消費して作る上位強化です。輝きや煌きで研磨でき、上位通貨の獲得量や上限にも関わります。

開放条件:

- タブ表示は `chip[0] >= 10000 || statue[0] >= 1`。

主なデータ:

- `player.statue[0-9]`
- `player.polishedstatue[0-9]`
- `player.polishedstatuebr[0-9]`
- `player.polishedstatuefl[0-9]`

仕様:

- 像の作成コストは `(現在の像数 + 1) * 10000` の同種鋳片。
- 輝き研磨コストは `(現在の輝像数 + 1) * 1000000`。
- 煌き研磨コストは `(現在の煌像数 + 10) * 100`。
- 煌像は輝像1につき10段階まで。
- 瞬き研磨コストは `現在の瞬像内部値 + 100`。1クリックごとに必要な瞬きが1ずつ増え、表示上の瞬像が1.00増えると開始時から+1倍になる。
- 瞬像は1クリックで内部値が1増え、表示上は0.01増える。
- 瞬像は煌像の表示値と同じ値まで作れる。内部上限は `polishedstatuebr * 10`。
- 瞬像は各像ごとに表示上1.00以上完成した分だけ、瞬き入手率と最大瞬き保有数を強化する。効果計算では `floor(polishedstatuefl[i] / 100)` を合計する。最大瞬き保有数は、完成した瞬像1個ごとに1%増える。
- 完全挑戦開始条件として、選択中の完全挑戦数に応じた像数が要求される。

## 輪

関連ファイル: `ring.js`, `shine.js`, `automation.js`, `index.html`

輪はターン制ミニゲームです。輪をセットして試練を開始し、花/雪/月の評価点を稼いで目標に到達するとクリアになります。

開放条件:

- タブ表示は `residue >= 100`。
- 残滓 `residue` はトロフィー9取得後、輝き消費により増える。

主なデータ:

- `player.rings.setrings`
- `player.rings.ringsexp[0-12]`
- `player.rings.onmission`
- `player.rings.missionid`
- `player.rings.missionstate`
- `player.rings.clearedmission`
- `player.rings.auto`
- `player.rings.outsideauto`

仕様:

- 初期利用可能な輪は0, 1, 2。
- ミッション5クリア後、ワールドに応じて追加輪が使える。
- ミッションは `missioninfo` でターン数、目標評価、経験値、必要輪数、前提ミッションを定義する。
- 各輪は経験値によりレベルアップし、レベルでスキルが増える。
- ミッション中はセット輪が順番に行動し、TPを消費してスキルを使う。
- 評価合計が目標以上ならクリア。クリア時に輪経験値と `clearedmission` を得る。
- 輪自動周回は、指定ミッションの開始と通常スキル使用を1秒ごとに繰り返す。

開発注意:

- `missionstate` はミッション開始時に初期化される。
- フィールド効果は `fieldeffect` に保存され、スキル使用時またはターン終了時に適用される。
- `levelcap()` は現在30固定。

## 世界・記憶・思い出

関連ファイル: `world.js`, `remember.js`, `trophy.js`, `storage.js`, `index.html`

世界は複数ワールド制の進行です。各世界は `players[world]` に独立保存され、条件達成で別世界へ移動できます。世界収縮により記憶を思い出に変化させます。

開放条件:

- 世界タブは `worldopened[1] || worldopened[2]`。
- 世界0は常に開放。
- 世界1から9は主に世界0の挑戦、階位挑戦、ランク、暗黒系条件などで開放。
- 冠位リセット後は世界1から9が開放される。
- 世界10は `lightmoney >= 1e8`。
- 世界11は `statue[2] >= 16`。

主なデータ:

- `players[0-11]`
- `world`
- `worldopened[0-11]`
- `player.worldpipe[0-11]`
- `player.remember`
- `memorysum`
- `remembersum`

仕様:

- `moveworld()` は現在の `player` を保存し、指定世界をロードする。
- `openpipe()` は小実績数から得たパイプ数を各世界へ割り振る。
- パイプ上限はトロフィー状態により1から3。
- `shrinkworld()` は対象世界を初期化し、達成実績数を `remember` として保持する。
- 収縮後は思い出数に応じて、初期段位リセット、階位リセット、挑戦クリア、ランク、鋳片、裏段位、輝きなどの補填が入る。

開発注意:

- ワールド移動とセーブ/ロードが密接に絡む。
- 収縮時に残すデータと消すデータが明示されているため、新しい永続要素を追加した場合は `shrinkworld()` の扱いを決める必要がある。

### 世界収縮で残るもの・消えるもの

関連処理: `world.js` の `shrinkworld(data, i)`

収縮は対象世界 `players[i]` を `initialData()` で初期化し直す処理です。初期化前に一部の値だけ退避し、初期化後に戻します。その後、全世界の思い出数 `checkremembers()` に応じた補填を追加します。

収縮条件:

- 対象世界のメイン実績数 `trophynumber[i]` が4以上。
- 対象世界の `remember` が `trophynumber[i]` 未満。
- 確認ダイアログで承認する。

収縮で直接残るもの:

- `remember`: 対象世界の実績数 `trophynumber[i]` が新しい `remember` として保存される。
- `rings`: 輪の状態一式。セット、経験値、クリア済み試練、自動化設定も含む。
- `residue`: 残滓。
- `challengeweight`: 挑戦重み設定。
- `challengeweightvalue`: 挑戦重み値。

収縮前に参照され、補填計算に使われるもの:

- `statue`: 収縮前の像数。思い出78以上で鋳片補填に使われる。
- `darklevel`: 退避されているが、現状の実装では復元にも補填にも使われていない。

収縮で基本的に消えるもの:

- `money`
- `level`
- `rank`
- `crown`
- `levelresettime`
- `rankresettime`
- `crownresettime`
- 通常発生器、購入数、コスト。
- 時間加速器、購入数、コスト。
- 裏ポイント、裏発生器、裏発生器購入数、裏発生器コスト。
- 天上ポイント、天上発生器、天上発生器購入数、天上発生器コスト。
- 挑戦クリア、階位挑戦クリア、挑戦効力、上位効力。
- 輝き、煌き、瞬き。
- 鋳片、鋳片装着、無効鋳片、像、輝像、煌像。
- 段位効力、時間結晶、キャンペーン、Tweet設定、印石、精霊など、`initialData()` に戻される値。

思い出数に応じて再付与されるもの:

- 1から8: `levelresettime` が1, 2, 3, 5, 8, 13, 21, 34へ段階的に設定される。
- 9から16: `rankresettime` が1, 2, 3, 5, 8, 13, 21, 34へ段階的に設定される。
- 17から24: 通常挑戦クリアが `rememberdata.givenchalenges[0-7]` から段階的に追加される。
- 25, 27, 29, 31, 43: `rank` が64, 128, 256, 512, 4096へ段階的に設定される。
- 26, 28, 30, 32, 46: `levelitembought` が108, 256, 800, 1728, 6400へ段階的に設定される。
- 33, 35, 37, 39, 45: `maxlevelgained` が1000, 3000, 10000, 30000, 100000へ段階的に設定される。
- 34, 36, 38, 40, 47から52: 通常挑戦クリアがさらに追加される。
- 41: `levelresettime` が1000に設定される。
- 42: `rankresettime` が300に設定される。
- 44: `shine` が100000に設定される。
- 53から56: 階位挑戦クリアが `rememberdata.givenchalenges[0-3]` から段階的に追加される。
- 57から72: 鋳片0から3が、1, 15, 55, 120へ段階的に設定される。
- 73, 75, 77: `darklevel` が100, 500, 2000へ段階的に設定される。
- 74: `brightness` が30000に設定される。
- 76: `shine` が10000000に設定される。
- 78から81: 収縮前の `statue[0-3]` に応じて、対応する鋳片へ `statue[n] * 1000` が追加される。

収縮後に再計算されるもの:

- `token` は、再付与された `challengecleared.length` と同じ値に設定される。
- `checkpipedsmalltrophies()` が呼ばれ、パイプ小実績関連の集計が更新される。

開発注意:

- `rings` と `residue` は収縮を跨いで残るため、輪コンテンツは世界収縮後も継続する設計。
- `statue` 自体は消えるが、思い出78以上では収縮前の像数が鋳片補填へ変換される。
- `darklevel` は退避変数 `dl` に入っているが、現在の実装では使われていない。仕様として残すなら復元処理が必要。
- 新しい永続コンテンツを追加した場合、収縮で残すか、消すか、思い出補填へ変換するかをここに追記する。

## 実績

関連ファイル: `trophy.js`, `world.js`, `index.html`

実績は進行状態に応じて自動判定されるメタ進行です。メイン実績、小実績、第2小実績があります。

開放条件:

- 実績タブは常時表示。

主なデータ:

- `player.trophies[0-11]`
- `player.smalltrophies[0-99]`
- `player.smalltrophies2nd[0-99]`
- `trophynumber`
- `smalltrophy`
- `eachpipedsmalltrophy`
- `pipedsmalltrophy`

仕様:

- `checktrophies()` がメイン実績と小実績を更新する。
- 小実績数は鋳片、輝き、世界パイプ、発生器コスト軽減など複数の効果に使われる。
- 第2小実績は冠位リセット後に表示される。
- 実績チェックは UI からオン/オフ可能。

## 時

関連ファイル: `time.js`, `level.js`, `index.html`

時は時間回帰力、時間結晶、キャンペーンを扱う補助コンテンツです。

開放条件:

- タブ表示は `accelevel > 0`。
- `accelevel` は使用中の時間回帰力が最大で、`tickspeed <= 10` の状態に到達すると増える。

主なデータ:

- `player.accelevel`
- `player.accelevelused`
- `player.activatedcampaigns`
- `player.timecrystal[0-7]`

仕様:

- `accelevelused` を増やすほど基礎 `tickspeed` は遅くなるが、キャンペーンに使えるコスト枠が増える。
- キャンペーンは発生器倍率、鋳片獲得、輝き系獲得などに影響する。
- 一部キャンペーンは現実の日付で自動有効化される。
- 昇段リセット時、時間回帰力を持っていると時間加速器の規模から `timecrystal` が更新される。

開発注意:

- 日付依存のため、キャンペーン仕様変更時は実日付条件も確認する。
- 較正モード中は `tickspeed` が1000に固定される。

## 印石

関連ファイル: `markstone.js`, `rank.js`, `crown.js`, `generator.js`, `automation.js`, `index.html`

印石は階位リセットと連動する後半コンテンツです。選択した印石を階位リセット時に獲得し、印石効果、印石リセット、大印石、較正ミニゲームへ進みます。

開放条件:

- タブ表示は `player.markstone && player.markstone.club > 0`。
- 印石の獲得判定は階位リセット時に行われる。

主なデータ:

- `player.markstone.club`
- `player.markstone.diamond`
- `player.markstone.heart`
- `player.markstone.spade`
- `player.markstone.*GainedSinceCrownReset`
- `player.markstone.selectedType`
- `player.markstone.greatClub`
- `player.markstone.calibration`

仕様:

- 印石は杖、貨、杯、剣の4種類。
- 各印石の必要ポイントは、種類ごとの基礎指数、冠位中入手数、階位リセット後の経過tickから計算する。
- 階位リセット後すぐは必要条件が非常に高く、tick経過により緩和される。
- 印石総効果は4種類の所持数から乗算的に計算される。
- 印石総効果が100を超えると印石リセットが可能になり、通常印石を初期化して大杖印石を得る。
- 大杖印石は発生器効率を1個あたり1%強化する。
- 較正は大杖印石入手後の自動戦闘系ミニゲーム。矛盾を倒して解決数と合計解決価を稼ぎ、100万到達で成果を得る。
- 成果ショップは較正力強化、敵レベル変更、待機中ダメージ、発生器効率2倍、矛盾3解放などを扱う。

開発注意:

- 自動昇階には「印石が入手可能なときだけ昇階する」オプションがある。
- 較正が有効な間は `time.js` で `tickspeed` が1000に固定される。
- 冠位リセット時に冠位中入手数カウンターが初期化される。

## 精霊

関連ファイル: `spirit.js`, `index.html`

精霊は現状ほぼ未実装のコンテンツです。UI タブとデータの骨組みだけが存在します。

開放条件:

- タブ表示は `pchallengestage >= 10`。

主なデータ:

- `player.spiritlevela`
- `player.spiritboughtcurrentcrown`
- `spiritdata.spiritnuma`
- `spiritdata.spiritnamea`
- `spiritdata.spiritcosta`

仕様:

- 現在の精霊数は1。
- 名前は「鼠」。
- コストは `1e180`。
- `buyspirit()` は先頭で `return` しており、購入処理は実質未実装。

## 設定・保存・共有

関連ファイル: `storage.js`, `social.js`, `index.html`

設定タブはデータリセット、Tweet対象設定、セーブエクスポート/インポートを扱います。

開放条件:

- 設定タブは常時表示。

主なデータ:

- `players`
- `player.currenttab`
- `player.tweeting`
- `exported`

仕様:

- セーブは `players` 配列を Base64 化して `localStorage.playerStoredb` に保存する。
- ロード時は `deepmerge(initialData(), saved)` で旧セーブを補完し、主要な `Decimal` フィールドを復元する。
- エクスポートは Base64 文字列として画面表示またはテキストファイル保存する。
- インポートは入力された Base64 を `localStorage` へ保存し、世界0をロードする。
- Tweet リンクは `social.js` の `getTweetLink()` で、`player.tweeting` の選択に応じて生成される。

## コンテンツ追加時の確認項目

- `constants.js` の `initialData()` に保存データが必要か。
- `storage.js` のロード時に `Decimal` 復元や旧セーブ補完が必要か。
- `game.js` の `data()` に機能クラスのインスタンスが必要か。
- `game.js` の `methods` に UI から呼ぶ委譲メソッドが必要か。
- `index.html` のタブ表示条件、ボタン表示条件、現在タブ判定が必要か。
- リセット時に初期化するか、保持するか。
- ワールド収縮時に初期化するか、保持するか。
- 挑戦中、完全挑戦中、自動化中に許可するか。
- 既存の小実績、鋳片、像、記憶、パイプ、印石が倍率へ絡むか。
