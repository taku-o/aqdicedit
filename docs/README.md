# AqDicEdit - AquesTalk AqKanji2Koe Dictionary edit tool.
AqDicEditは、MYukkuriVoiceアプリのために作られた、
ユーザー定義辞書編集ツールです。
このツールで作成した

## 目次

<!-- toc -->

<a name="開発ステータス"></a>
## 開発ステータス

<a name="myukkurivoiceの導入"></a>
## MYukkuriVoiceの導入
<a name="ダウンロード"></a>
### ダウンロード
* 最新のアプリは次のURLからダウンロードできます。
  * [https://github.com/taku-o/myukkurivoice/releases](https://github.com/taku-o/myukkurivoice/releases)
    * [※Chromeで「一般的にダウンロードされておらず、危険を及ぼす可能性があります」と表示される](https://taku-o.github.io/myukkurivoice/help#!#trouble)。そのままダウンロードを進めてください。

<a name="インストール"></a>
### インストール
圧縮ファイル(MYukkuriVoice-darwin-x64.zip)をダウンロードして解凍後、  
初回の起動は MYukkuriVoice.app を右クリックして「開く」を選択してください。

<a name="アンインストール"></a>
### アンインストール
* アプリケーションをアンインストールするには、次のファイル・フォルダを削除してください。
  * アプリケーション MYukkuriVoice.app
  * ~/Application Support/MYukkuriVoice フォルダ
  * ~/Library/Logs/MYukkuriVoice フォルダ

<a name="myukkurivoiceに関して"></a>
## MYukkuriVoiceに関して
<a name="アプリの使い方を学ぶにはまず何から始めれば良いか"></a>
### アプリの使い方を学ぶにはまず何から始めれば良いか
1. MYukkuriVoiceを起動すると、右上に「チュートリアル」ボタンがあるので、それを押してチュートリアルを読んでみましょう。
2. メッセージ入力欄に文字を入力、「▶再生」ボタンを押して、音声を再生してみましょう。
3. メッセージ入力欄に文字を入力、「●記録」ボタンを押して、音声を録音してみましょう。
4. 声の種類を切り替えて、音声を再生、記録してみましょう。

<a name="ヘルプ・マニュアル"></a>
### ヘルプ・マニュアル
* MYukkuriVoiceのヘルプです。
  * [https://taku-o.github.io/myukkurivoice/help](https://taku-o.github.io/myukkurivoice/help)
  * アプリ内にある「ヘルプ」ボタンでも同じ内容をご覧になれます。

<a name="リリースノート"></a>
### リリースノート
* 各バージョンごとの変更点
  * [https://taku-o.github.io/myukkurivoice/releases](https://taku-o.github.io/myukkurivoice/releases)

<a name="連絡先・問題の報告"></a>
### 連絡先・問題の報告
* MYukkuriVoiceは、次のURLで開発しています。
  * [https://github.com/taku-o/myukkurivoice](https://github.com/taku-o/myukkurivoice)
* バグ報告は[こちら(課題リスト)](https://github.com/taku-o/myukkurivoice/issues)に登録お願いいたします。
* 連絡する際はこちら(mail@nanasi.jp)までお願いします。

<a name="myukkurivoiceの主な特徴"></a>
## MYukkuriVoiceの主な特徴
<a name="基本"></a>
### 基本
* MacOSX Sierra以降で動作検証。
* 設定を用意して切り替えて作業するスタイルで利用します。

<a href="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme.gif"><img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme.gif" width="400"></a>

<a name="ショートカット"></a>
### ショートカット
* 動画制作向きのショートカットキーがいくつか定義されています

<img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-shortcut-play.png" width="400">

<a name="ファイルの出力オプション"></a>
### ファイルの出力オプション
1ファイルごとにファイル名を指定して保存する方法以外に、  
音声ファイルを連番付きのファイル名で保存したり、  
音声ファイルの元となったメッセージを保存する機能があります。

<img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-filewriteopt.png" width="400">

<a name="選択した範囲のテキストのみの音声再生・録音"></a>
### 選択した範囲のテキストのみの音声再生・録音
* 選択した範囲のテキストを再生、録音する機能があります。
* メッセージ入力欄、音記号列入力欄、どちらでも機能します。

<img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-select-encoded.png" width="400">

<a name="保存した音声ファイルをアプリから動画編集ソフトに直接ドラッグアンドドロップ"></a>
### 保存した音声ファイルをアプリから動画編集ソフトに直接ドラッグアンドドロップ
* 最後に保存した音声ファイルのリンクが、アプリの左下に表示されます。
* ドラッグアンドドロップで動画編集ソフトに渡せます。

<a href="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-dnd.gif"><img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-dnd.gif" width="400"></a>

<a name="その他"></a>
### その他
* チュートリアル、ヘルプが用意されています

<img src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-tutorial.png" width="400">

* AquesTalk10から導入された音声の調節機能にも対応しています。(AquesTalk10ベースの音声のみ)

<img class="border" src="https://raw.githubusercontent.com/taku-o/myukkurivoice/master/docs/images/readme-editaq10voice.png" width="400">

<a name="機能一覧"></a>
### 機能一覧
* AquesTalk1, AquesTalk2, AquesTalk10ベースのメッセージ音声再生、音声録音機能
* 音記号列の表示編集、および、変更後音記号列の音声再生機能
* テキストエリアで選択したテキスト部分のみを音声再生、音声録音
* 設定の保存、複製。設定に名前をつけて複数の設定を保存可能。
* ファイル名を指定しての音声ファイル保存。連番ファイルでの音声ファイル保存の選択可能
* 音声保存時に、音声の元となったメッセージもテキストファイルに保存
* 音量、再生速度の調整。音質の調整。
* 再生する音声の抑揚のON・OFF切替
* 音声の再生時間目安の表示
* アプリから動画編集ソフトに、音声ファイルを直接ドラッグアンドドロップできる機能
* ウィンドウの前面表示固定、切替機能
* アプリを閉じた時のウィンドウの位置を記憶する
* マルチボイス機能
* テキストファイルをドロップしての入力。テキストフィールド、および、アプリアイコンが対応。
* 保存メッセージをクリックして、音声ファイル、メッセージファイルをQuickLookで開く。
* 各種ショートカットキー
* チュートリアル、ヘルプ


