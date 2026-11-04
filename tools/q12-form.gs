/**
 * 周りの就活生への聞き取り（質問設計ログ Q12）用の Google フォームを作るスクリプト。
 *
 * 使い方：
 * 1. https://script.google.com を開き「新しいプロジェクト」を作る
 * 2. 最初からあるコードを全部消して、このファイルの中身を貼り付ける
 * 3. 上の「実行」を押す（初回は Google アカウントの許可を求められるので許可する）
 * 4. 下の「実行ログ」に、回答用URLと編集用URLが表示される
 *
 * 設計上の注意（質問設計ログ Q12）：
 * - ②③④は自由記述のみ。選択肢や「成長のため」などの例は入れない（誘導の回避）。
 * - アプリの狙いや作り手の考えは書かない。
 */
function createQ12Form() {
  var form = FormApp.create('就活のこと、ちょっとだけ教えて');
  form.setDescription(
    'アプリ作ってて参考にしたいから、少しだけ教えてほしい！\n' +
    '思ったままでOK、短くてOK。名前は聞きません。'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);

  // 偏りの確認用（インターン仲間に偏っていないか）
  form.addMultipleChoiceItem()
    .setTitle('このフォームを送ってきた人とは')
    .setChoiceValues(['インターンの仲間', 'それ以外の友人・知り合い'])
    .setRequired(true);

  // ① 学年と状況
  form.addListItem()
    .setTitle('① 今何年生？')
    .setChoiceValues(['大学1年', '大学2年', '大学3年', '大学4年', '大学院生', 'その他'])
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('① 就活はどんな状況？（当てはまるもの全部）')
    .setChoiceValues(['まだ何もしてない', 'インターン探し中・参加中', '選考中', '内定が出た・就活を終えた'])
    .showOtherOption(true)
    .setRequired(true);

  // ② 実際にやったことときっかけ
  form.addParagraphTextItem()
    .setTitle('② 最近、自己分析っぽいこと（強み・ガクチカ・就活の軸を考える、とか）やった？やったなら、何がきっかけだった？')
    .setRequired(true);

  // ③ 自己分析の1段上の目的
  form.addParagraphTextItem()
    .setTitle('③ それをやって、何がどうなったら嬉しかった？（やってないなら、やってない理由でもOK）')
    .setRequired(true);

  // ④ 任意：企業選びの価値観
  form.addParagraphTextItem()
    .setTitle('④ （もしあれば）会社を選ぶとき、何を一番大事にしたい？')
    .setRequired(false);

  Logger.log('回答用URL: ' + form.getPublishedUrl());
  Logger.log('編集用URL: ' + form.getEditUrl());
}
