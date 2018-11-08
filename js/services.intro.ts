angular.module('dictIntroService', [])
  .factory('IntroService', () => {
    return {
      tutorial: function(): void {
        const intro = introJs();
        intro.setOption('showProgress', true);
        intro.setOptions({
          steps: [
            {
              element: '#grid',
              intro: 'カスタム辞書のデータを表示しています。この辞書データはMYukkuriVoiceアプリでのメッセージの変換で利用されます。',
            },
            {
              element: '#grid',
              intro: 'この表のデータは、セルをダブルクリックすると編集できます。',
            },
            {
              element: '#append-record',
              intro: 'これらのボタンで辞書のデータを増やしたり、減らしたりできます。',
            },
            {
              element: '#save',
              intro: '編集したデータはこのボタンで保存しましょう。不正なデータがあると保存できません。',
            },
            {
              element: '#export',
              intro: 'MYukkuriVoiceアプリのカスタム辞書を更新するにはこのボタンを押します。辞書データはMYukkuriVoiceアプリの画面を再読み込みすれば読み込まれます。MYukkuriVoiceは、メニューからか、Command + Rでリロードできます。',
            },
            {
              element: '#footer',
              intro: 'この辞書アプリで何かしら問題が発生すると、フッターにメッセージが表示されます。',
            },
            {
              element: '#always-on-top-btn',
              intro: 'このボタンを有効にしておくと、このアプリは常に前面で表示されるようになります。連続で辞書データを編集する時などに利用しましょう。',
            },
            {
              element: '#tutorial',
              intro: 'チュートリアルは以上です。またチュートリアルをまた確認したくなったら、このボタンを押してください。',
            },
            {
              element: '#tutorial',
              intro: 'MYukkuriVoiceアプリのヘルプにも、この辞書アプリの説明が書いてあります。',
            },
          ],
        });
        intro.start();
      },
    };
  });
