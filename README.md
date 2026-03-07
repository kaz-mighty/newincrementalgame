# newincrementalgame

this is an incremental game project I(twitter:@dem08656775) created. I threw old disgusting one away, so this is new incremantalgame --- not meaning I insist creating new type of incremental game or introducing new idea. Acctually, this game is similar to derivetive clicker or Antimatter Dimensions.

# Overview of fork 

結合度を下げつつ最適化することを目的にリファクタリングをしています。
元のゲームとなるべく同じ動作をするようにしていますが、一部異なる動作があります。

- 浮動小数点演算の計算順序を変更したことによる誤差
- セーブ関連の変更
  - 手動セーブボタンを追加
  - 自動セーブを2秒毎から20秒毎に変更
  - (おそらく)自動セーブを挟まずに2連続で世界を変更した場合でも最新の状態が保存されるように
  - 世界の解放条件を満たしてもセーブされるまで世界が解放されない
    - this.playersへthis.playerが反映されるのがセーブ時のため。後でなんとかする。

## 実装上の注意点

- Vueでリアクティブにするデータには、JSのクラスのプライベート要素は使えません。
  - リアクティブにできない以前に、そもそもVueのプロキシ経由でのアクセスができない。
- `Vue.ref`, `Vue.compute`は親がリアクティブなオブジェクトかどうかで自動でアンラップされるかどうかが変わるため、
  シミュレータ移植も考慮してゲッター関数でラップしています(例: statue.js)

## 参考資料

- Vue公式ドキュメント全体 (特に以下)
  - Composition APIのリアクティビティーの基礎～算出プロパティ
  - [状態管理](https://ja.vuejs.org/guide/scaling-up/state-management.html)

