# new incremental game

This is a fork repository of the incremental game.

これは新しい放置ゲーム(1).fileのフォークリポジトリです。

## Overview of fork 

結合度を下げつつ最適化することを目的にリファクタリングをしています。
元のゲームとなるべく同じ動作をするようにしていますが、一部異なる動作があります。

- セーブ関連の変更
  - 自動セーブを2秒毎から20秒毎に変更
  - データ吐き出ししたときにもセーブされるように
  - (おそらく)自動セーブを挟まずに2連続で世界を変更した場合でも最新の状態が保存されるように
  　- (元のゲームもベータ版なら保存される)
- 完全なリセット時に一部の変数が初期化されず、直前の状態が反映されたままになるバグを修正
- 上記の変数の一部が、ロード/世界切り替え時にも初期化されていないバグを修正
  - 世界の開放状態(ロード時のみ)
  - 現在効果を発揮している下位効力
  - 発生器の倍率
  - 上位効力10の倍率
- 収縮時、1tickを待たず即座に記憶と思い出を再計算するように
- 裏段位リセット時、1tickを待たず即座に裏段位の証を計算するように
- 不正なセーブデータを入力した際の動作
  - 具体的には、重複不能な配列に重複した値を入れた場合
  - (将来のバージョンのデータを持ってきた場合など、)
    配列の要素数が異なる場合や、未知のプロパティが追加された場合は同じ動作をします。
- 浮動小数点演算の計算順序を変更したことによる誤差
- コンソール出力

## Getting Started with Development

ビルドステップ不要なため、下準備は不要ですが、
IDEを最大限活用するためにライブラリの型定義を用意することを推奨します。\
`npm i` で自動的にダウンロードされます。

### 実装上の注意点

- Vueでリアクティブにするデータには、JSのクラスのプライベート要素は使えません。
  - リアクティブにできない以前に、そもそもVueのプロキシ経由でのアクセスができない。
- `Vue.ref`, `Vue.compute`は親がリアクティブなオブジェクトかどうかで自動でアンラップされるかどうかが変わるため、
  使用したいクラスでは`Vue.markRaw`を使用しています。(例: statue.js)
  - 副作用として`this`がプロキシでなくなるため、プライベート要素が使用可能です。

### 参考資料

- Vue公式ドキュメント全体 (特に以下)
  - Composition APIのリアクティビティーの基礎～算出プロパティ
  - [状態管理](https://ja.vuejs.org/guide/scaling-up/state-management.html)
- IDEが補完・型サポートできるように対応したときの資料
  - [CDNから読み込んだ(Moduleではない従来型の)JSライブラリに対して、後付けで型を適用する方法](https://qiita.com/murasuke/items/a5c29940fc39ad3c7117)
  - [JS プロジェクトのまま TS の型チェックの恩恵を受ける方法](https://qiita.com/tettekete/items/9335e9d9ea00311626aa)
  - [TypeScript 5.5 - @import Tag](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag)


## branch

- fork/stable: github-pages 公開用ブランチ 
- fork/beta: github-pages 公開用ブランチ。 内部APIや変数名が突然変わる可能性があります
- fork/origin-stable-fast: github-pages 公開用ブランチ。 origin の安定版を軽微な変更で軽量化したもの

- fork/develop: 開発用ブランチ
- fork/workflow: workflow用ブランチ

- fork/for_diff: originのベータ版のコミット履歴を整理し直したもの
- main: origin の安定版
- beta: origin のベータ版
