/**
 * JLPT Vocabulary dataset.
 *
 * Each VocabItem ships with an example sentence (jp + kr) so the
 * learner sees the word in context. The `id` is stable across
 * sessions because the SRS engine keys on it.
 */

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export interface VocabItem {
  id: string
  word: string         // surface form (kanji or kana)
  reading: string      // hiragana reading
  romaji: string
  meaning: string      // Korean meaning (primary)
  meaningEn?: string
  pos: string          // part of speech: 명사, 동사, い형용사, な형용사, 부사, etc.
  level: JlptLevel
  category: string     // theme/topic
  example: string      // Japanese example sentence
  exampleReading?: string  // optional kana reading of example
  exampleKr: string    // Korean translation
  notes?: string
}

// ---------- N5 ----------
const n5: VocabItem[] = [
  // 인사·기본 표현
  { id: 'v-konnichiwa', word: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', meaning: '안녕하세요 (낮 인사)', pos: '인사', level: 'N5', category: '인사', example: 'こんにちは、お元気ですか。', exampleKr: '안녕하세요, 잘 지내세요?' },
  { id: 'v-ohayou', word: 'おはよう', reading: 'おはよう', romaji: 'ohayou', meaning: '안녕 (아침 인사)', pos: '인사', level: 'N5', category: '인사', example: 'おはようございます。', exampleKr: '안녕하세요 (아침).' },
  { id: 'v-konbanwa', word: 'こんばんは', reading: 'こんばんは', romaji: 'konbanwa', meaning: '안녕하세요 (저녁 인사)', pos: '인사', level: 'N5', category: '인사', example: 'こんばんは、今日もお疲れさま。', exampleKr: '안녕하세요, 오늘도 수고하셨어요.' },
  { id: 'v-arigatou', word: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', meaning: '고마워', pos: '인사', level: 'N5', category: '인사', example: '本当にありがとう。', exampleKr: '정말 고마워.' },
  { id: 'v-sumimasen', word: 'すみません', reading: 'すみません', romaji: 'sumimasen', meaning: '죄송합니다 / 실례합니다', pos: '인사', level: 'N5', category: '인사', example: 'すみません、駅はどこですか。', exampleKr: '실례합니다, 역은 어디입니까?' },
  { id: 'v-sayounara', word: 'さようなら', reading: 'さようなら', romaji: 'sayounara', meaning: '안녕히 가세요', pos: '인사', level: 'N5', category: '인사', example: 'では、さようなら。', exampleKr: '그럼, 안녕히 가세요.' },
  { id: 'v-hai', word: 'はい', reading: 'はい', romaji: 'hai', meaning: '네', pos: '감탄사', level: 'N5', category: '인사', example: 'はい、わかりました。', exampleKr: '네, 알겠습니다.' },
  { id: 'v-iie', word: 'いいえ', reading: 'いいえ', romaji: 'iie', meaning: '아니오', pos: '감탄사', level: 'N5', category: '인사', example: 'いいえ、違います。', exampleKr: '아니오, 다릅니다.' },

  // 사람·인칭
  { id: 'v-watashi', word: '私', reading: 'わたし', romaji: 'watashi', meaning: '나, 저', pos: '대명사', level: 'N5', category: '사람', example: '私は学生です。', exampleKr: '저는 학생입니다.' },
  { id: 'v-anata', word: 'あなた', reading: 'あなた', romaji: 'anata', meaning: '당신', pos: '대명사', level: 'N5', category: '사람', example: 'あなたの名前は何ですか。', exampleKr: '당신의 이름은 무엇입니까?' },
  { id: 'v-hito', word: '人', reading: 'ひと', romaji: 'hito', meaning: '사람', pos: '명사', level: 'N5', category: '사람', example: 'あの人は誰ですか。', exampleKr: '저 사람은 누구입니까?' },
  { id: 'v-tomodachi', word: '友達', reading: 'ともだち', romaji: 'tomodachi', meaning: '친구', pos: '명사', level: 'N5', category: '사람', example: '友達と映画を見ます。', exampleKr: '친구와 영화를 봅니다.' },
  { id: 'v-kazoku', word: '家族', reading: 'かぞく', romaji: 'kazoku', meaning: '가족', pos: '명사', level: 'N5', category: '사람', example: '私の家族は四人です。', exampleKr: '우리 가족은 네 명입니다.' },
  { id: 'v-otousan', word: 'お父さん', reading: 'おとうさん', romaji: 'otousan', meaning: '아버지', pos: '명사', level: 'N5', category: '사람', example: 'お父さんは会社員です。', exampleKr: '아버지는 회사원입니다.' },
  { id: 'v-okaasan', word: 'お母さん', reading: 'おかあさん', romaji: 'okaasan', meaning: '어머니', pos: '명사', level: 'N5', category: '사람', example: 'お母さんは料理が上手です。', exampleKr: '어머니는 요리를 잘합니다.' },
  { id: 'v-onii', word: 'お兄さん', reading: 'おにいさん', romaji: 'oniisan', meaning: '형, 오빠', pos: '명사', level: 'N5', category: '사람', example: 'お兄さんは大学生です。', exampleKr: '형은 대학생입니다.' },
  { id: 'v-onee', word: 'お姉さん', reading: 'おねえさん', romaji: 'oneesan', meaning: '누나, 언니', pos: '명사', level: 'N5', category: '사람', example: 'お姉さんはとても優しいです。', exampleKr: '언니는 정말 친절합니다.' },
  { id: 'v-otouto', word: '弟', reading: 'おとうと', romaji: 'otouto', meaning: '남동생', pos: '명사', level: 'N5', category: '사람', example: '弟は中学生です。', exampleKr: '남동생은 중학생입니다.' },
  { id: 'v-imouto', word: '妹', reading: 'いもうと', romaji: 'imouto', meaning: '여동생', pos: '명사', level: 'N5', category: '사람', example: '妹はピアノを習っています。', exampleKr: '여동생은 피아노를 배우고 있습니다.' },
  { id: 'v-sensei', word: '先生', reading: 'せんせい', romaji: 'sensei', meaning: '선생님', pos: '명사', level: 'N5', category: '사람', example: '田中先生は親切です。', exampleKr: '다나카 선생님은 친절합니다.' },
  { id: 'v-gakusei', word: '学生', reading: 'がくせい', romaji: 'gakusei', meaning: '학생', pos: '명사', level: 'N5', category: '사람', example: '私は日本語の学生です。', exampleKr: '저는 일본어 학생입니다.' },

  // 시간·날짜
  { id: 'v-ima', word: '今', reading: 'いま', romaji: 'ima', meaning: '지금', pos: '명사', level: 'N5', category: '시간', example: '今、何時ですか。', exampleKr: '지금 몇 시입니까?' },
  { id: 'v-kyou', word: '今日', reading: 'きょう', romaji: 'kyou', meaning: '오늘', pos: '명사', level: 'N5', category: '시간', example: '今日は雨です。', exampleKr: '오늘은 비가 옵니다.' },
  { id: 'v-ashita', word: '明日', reading: 'あした', romaji: 'ashita', meaning: '내일', pos: '명사', level: 'N5', category: '시간', example: '明日また会いましょう。', exampleKr: '내일 또 만납시다.' },
  { id: 'v-kinou', word: '昨日', reading: 'きのう', romaji: 'kinou', meaning: '어제', pos: '명사', level: 'N5', category: '시간', example: '昨日は忙しかったです。', exampleKr: '어제는 바빴습니다.' },
  { id: 'v-asa', word: '朝', reading: 'あさ', romaji: 'asa', meaning: '아침', pos: '명사', level: 'N5', category: '시간', example: '朝ご飯を食べました。', exampleKr: '아침밥을 먹었습니다.' },
  { id: 'v-hiru', word: '昼', reading: 'ひる', romaji: 'hiru', meaning: '낮, 점심', pos: '명사', level: 'N5', category: '시간', example: '昼はラーメンを食べます。', exampleKr: '점심은 라면을 먹습니다.' },
  { id: 'v-yoru', word: '夜', reading: 'よる', romaji: 'yoru', meaning: '밤', pos: '명사', level: 'N5', category: '시간', example: '夜は早く寝ます。', exampleKr: '밤에는 일찍 잡니다.' },
  { id: 'v-jikan', word: '時間', reading: 'じかん', romaji: 'jikan', meaning: '시간', pos: '명사', level: 'N5', category: '시간', example: '時間がありません。', exampleKr: '시간이 없습니다.' },
  { id: 'v-fun', word: '分', reading: 'ふん', romaji: 'fun', meaning: '분', pos: '조수사', level: 'N5', category: '시간', example: '十分待ってください。', exampleKr: '10분 기다려 주세요.' },
  { id: 'v-shuu', word: '週', reading: 'しゅう', romaji: 'shuu', meaning: '주', pos: '명사', level: 'N5', category: '시간', example: '今週は忙しいです。', exampleKr: '이번 주는 바쁩니다.' },
  { id: 'v-tsuki', word: '月', reading: 'つき', romaji: 'tsuki', meaning: '달, 월', pos: '명사', level: 'N5', category: '시간', example: '来月日本へ行きます。', exampleKr: '다음 달에 일본에 갑니다.' },
  { id: 'v-toshi', word: '年', reading: 'とし', romaji: 'toshi', meaning: '해, 년', pos: '명사', level: 'N5', category: '시간', example: '今年は二十歳です。', exampleKr: '올해 스무 살입니다.' },

  // 숫자
  { id: 'v-ichi', word: '一', reading: 'いち', romaji: 'ichi', meaning: '하나, 1', pos: '수사', level: 'N5', category: '숫자', example: '一つください。', exampleKr: '하나 주세요.' },
  { id: 'v-ni', word: '二', reading: 'に', romaji: 'ni', meaning: '둘, 2', pos: '수사', level: 'N5', category: '숫자', example: '二人で行きます。', exampleKr: '둘이서 갑니다.' },
  { id: 'v-san', word: '三', reading: 'さん', romaji: 'san', meaning: '셋, 3', pos: '수사', level: 'N5', category: '숫자', example: '三時に会いましょう。', exampleKr: '3시에 만납시다.' },
  { id: 'v-yon', word: '四', reading: 'よん', romaji: 'yon', meaning: '넷, 4', pos: '수사', level: 'N5', category: '숫자', example: '四月に始まります。', exampleKr: '4월에 시작됩니다.' },
  { id: 'v-go', word: '五', reading: 'ご', romaji: 'go', meaning: '다섯, 5', pos: '수사', level: 'N5', category: '숫자', example: '五分で終わります。', exampleKr: '5분이면 끝납니다.' },
  { id: 'v-roku', word: '六', reading: 'ろく', romaji: 'roku', meaning: '여섯, 6', pos: '수사', level: 'N5', category: '숫자', example: '六時に起きます。', exampleKr: '6시에 일어납니다.' },
  { id: 'v-nana', word: '七', reading: 'なな', romaji: 'nana', meaning: '일곱, 7', pos: '수사', level: 'N5', category: '숫자', example: '七人家族です。', exampleKr: '7인 가족입니다.' },
  { id: 'v-hachi', word: '八', reading: 'はち', romaji: 'hachi', meaning: '여덟, 8', pos: '수사', level: 'N5', category: '숫자', example: '八月は暑いです。', exampleKr: '8월은 덥습니다.' },
  { id: 'v-kyuu', word: '九', reading: 'きゅう', romaji: 'kyuu', meaning: '아홉, 9', pos: '수사', level: 'N5', category: '숫자', example: '九時に寝ます。', exampleKr: '9시에 잡니다.' },
  { id: 'v-juu', word: '十', reading: 'じゅう', romaji: 'juu', meaning: '열, 10', pos: '수사', level: 'N5', category: '숫자', example: '十分歩きました。', exampleKr: '10분 걸었습니다.' },
  { id: 'v-hyaku', word: '百', reading: 'ひゃく', romaji: 'hyaku', meaning: '백, 100', pos: '수사', level: 'N5', category: '숫자', example: '百円です。', exampleKr: '100엔입니다.' },
  { id: 'v-sen', word: '千', reading: 'せん', romaji: 'sen', meaning: '천, 1000', pos: '수사', level: 'N5', category: '숫자', example: '千円札を出した。', exampleKr: '천 엔짜리 지폐를 냈다.' },

  // 음식·먹다
  { id: 'v-mizu', word: '水', reading: 'みず', romaji: 'mizu', meaning: '물', pos: '명사', level: 'N5', category: '음식', example: '水を一杯ください。', exampleKr: '물 한 잔 주세요.' },
  { id: 'v-ocha', word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: '차', pos: '명사', level: 'N5', category: '음식', example: '熱いお茶が好きです。', exampleKr: '뜨거운 차를 좋아합니다.' },
  { id: 'v-koohii', word: 'コーヒー', reading: 'コーヒー', romaji: 'koohii', meaning: '커피', pos: '명사', level: 'N5', category: '음식', example: '毎朝コーヒーを飲みます。', exampleKr: '매일 아침 커피를 마십니다.' },
  { id: 'v-gohan', word: 'ご飯', reading: 'ごはん', romaji: 'gohan', meaning: '밥, 식사', pos: '명사', level: 'N5', category: '음식', example: 'ご飯を食べましょう。', exampleKr: '밥을 먹읍시다.' },
  { id: 'v-pan', word: 'パン', reading: 'パン', romaji: 'pan', meaning: '빵', pos: '명사', level: 'N5', category: '음식', example: '朝はパンを食べます。', exampleKr: '아침에는 빵을 먹습니다.' },
  { id: 'v-niku', word: '肉', reading: 'にく', romaji: 'niku', meaning: '고기', pos: '명사', level: 'N5', category: '음식', example: '肉が大好きです。', exampleKr: '고기를 정말 좋아합니다.' },
  { id: 'v-sakana', word: '魚', reading: 'さかな', romaji: 'sakana', meaning: '생선, 물고기', pos: '명사', level: 'N5', category: '음식', example: '魚は体にいいです。', exampleKr: '생선은 몸에 좋습니다.' },
  { id: 'v-yasai', word: '野菜', reading: 'やさい', romaji: 'yasai', meaning: '채소', pos: '명사', level: 'N5', category: '음식', example: '野菜をたくさん食べます。', exampleKr: '채소를 많이 먹습니다.' },
  { id: 'v-kudamono', word: '果物', reading: 'くだもの', romaji: 'kudamono', meaning: '과일', pos: '명사', level: 'N5', category: '음식', example: '果物が好きです。', exampleKr: '과일을 좋아합니다.' },
  { id: 'v-tamago', word: '卵', reading: 'たまご', romaji: 'tamago', meaning: '계란', pos: '명사', level: 'N5', category: '음식', example: '卵を二つ買いました。', exampleKr: '계란을 두 개 샀습니다.' },

  // 동작 동사 (자주 쓰이는 것들)
  { id: 'v-taberu', word: '食べる', reading: 'たべる', romaji: 'taberu', meaning: '먹다', pos: '동사(下一段)', level: 'N5', category: '동작', example: '寿司を食べたいです。', exampleKr: '초밥을 먹고 싶습니다.' },
  { id: 'v-nomu', word: '飲む', reading: 'のむ', romaji: 'nomu', meaning: '마시다', pos: '동사(五段)', level: 'N5', category: '동작', example: '水をたくさん飲みます。', exampleKr: '물을 많이 마십니다.' },
  { id: 'v-iku', word: '行く', reading: 'いく', romaji: 'iku', meaning: '가다', pos: '동사(五段)', level: 'N5', category: '동작', example: '学校に行きます。', exampleKr: '학교에 갑니다.' },
  { id: 'v-kuru', word: '来る', reading: 'くる', romaji: 'kuru', meaning: '오다', pos: '동사(불규칙)', level: 'N5', category: '동작', example: '友達がうちに来ます。', exampleKr: '친구가 우리 집에 옵니다.' },
  { id: 'v-kaeru', word: '帰る', reading: 'かえる', romaji: 'kaeru', meaning: '돌아가다, 돌아오다', pos: '동사(五段)', level: 'N5', category: '동작', example: '七時に家に帰ります。', exampleKr: '7시에 집에 돌아갑니다.' },
  { id: 'v-miru', word: '見る', reading: 'みる', romaji: 'miru', meaning: '보다', pos: '동사(上一段)', level: 'N5', category: '동작', example: 'テレビを見ます。', exampleKr: 'TV를 봅니다.' },
  { id: 'v-kiku', word: '聞く', reading: 'きく', romaji: 'kiku', meaning: '듣다, 묻다', pos: '동사(五段)', level: 'N5', category: '동작', example: '音楽を聞きます。', exampleKr: '음악을 듣습니다.' },
  { id: 'v-yomu', word: '読む', reading: 'よむ', romaji: 'yomu', meaning: '읽다', pos: '동사(五段)', level: 'N5', category: '동작', example: '毎日本を読みます。', exampleKr: '매일 책을 읽습니다.' },
  { id: 'v-kaku', word: '書く', reading: 'かく', romaji: 'kaku', meaning: '쓰다', pos: '동사(五段)', level: 'N5', category: '동작', example: '手紙を書きます。', exampleKr: '편지를 씁니다.' },
  { id: 'v-hanasu', word: '話す', reading: 'はなす', romaji: 'hanasu', meaning: '이야기하다', pos: '동사(五段)', level: 'N5', category: '동작', example: '日本語で話しましょう。', exampleKr: '일본어로 이야기합시다.' },
  { id: 'v-au', word: '会う', reading: 'あう', romaji: 'au', meaning: '만나다', pos: '동사(五段)', level: 'N5', category: '동작', example: '駅で会いましょう。', exampleKr: '역에서 만납시다.' },
  { id: 'v-kau', word: '買う', reading: 'かう', romaji: 'kau', meaning: '사다', pos: '동사(五段)', level: 'N5', category: '동작', example: '本を買いました。', exampleKr: '책을 샀습니다.' },
  { id: 'v-tsukuru', word: '作る', reading: 'つくる', romaji: 'tsukuru', meaning: '만들다', pos: '동사(五段)', level: 'N5', category: '동작', example: '料理を作ります。', exampleKr: '요리를 만듭니다.' },
  { id: 'v-suru', word: 'する', reading: 'する', romaji: 'suru', meaning: '하다', pos: '동사(불규칙)', level: 'N5', category: '동작', example: '宿題をします。', exampleKr: '숙제를 합니다.' },
  { id: 'v-aru', word: 'ある', reading: 'ある', romaji: 'aru', meaning: '있다 (사물)', pos: '동사(五段)', level: 'N5', category: '동작', example: '机の上に本があります。', exampleKr: '책상 위에 책이 있습니다.' },
  { id: 'v-iru', word: 'いる', reading: 'いる', romaji: 'iru', meaning: '있다 (사람·동물)', pos: '동사(上一段)', level: 'N5', category: '동작', example: '部屋に猫がいます。', exampleKr: '방에 고양이가 있습니다.' },
  { id: 'v-neru', word: '寝る', reading: 'ねる', romaji: 'neru', meaning: '자다', pos: '동사(下一段)', level: 'N5', category: '동작', example: '十一時に寝ます。', exampleKr: '11시에 잡니다.' },
  { id: 'v-okiru', word: '起きる', reading: 'おきる', romaji: 'okiru', meaning: '일어나다', pos: '동사(上一段)', level: 'N5', category: '동작', example: '毎朝六時に起きます。', exampleKr: '매일 아침 6시에 일어납니다.' },

  // 형용사 (い)
  { id: 'v-ookii', word: '大きい', reading: 'おおきい', romaji: 'ookii', meaning: '크다', pos: 'い형용사', level: 'N5', category: '형용사', example: '大きい家に住みたい。', exampleKr: '큰 집에 살고 싶다.' },
  { id: 'v-chiisai', word: '小さい', reading: 'ちいさい', romaji: 'chiisai', meaning: '작다', pos: 'い형용사', level: 'N5', category: '형용사', example: '小さい犬がかわいい。', exampleKr: '작은 강아지가 귀엽다.' },
  { id: 'v-atarashii', word: '新しい', reading: 'あたらしい', romaji: 'atarashii', meaning: '새롭다', pos: 'い형용사', level: 'N5', category: '형용사', example: '新しい靴を買いました。', exampleKr: '새 신발을 샀습니다.' },
  { id: 'v-furui', word: '古い', reading: 'ふるい', romaji: 'furui', meaning: '오래되다', pos: 'い형용사', level: 'N5', category: '형용사', example: 'この本は古いです。', exampleKr: '이 책은 오래됐습니다.' },
  { id: 'v-takai', word: '高い', reading: 'たかい', romaji: 'takai', meaning: '높다, 비싸다', pos: 'い형용사', level: 'N5', category: '형용사', example: 'この時計は高いです。', exampleKr: '이 시계는 비쌉니다.' },
  { id: 'v-yasui', word: '安い', reading: 'やすい', romaji: 'yasui', meaning: '싸다', pos: 'い형용사', level: 'N5', category: '형용사', example: 'このパンは安いです。', exampleKr: '이 빵은 쌉니다.' },
  { id: 'v-atsui', word: '暑い', reading: 'あつい', romaji: 'atsui', meaning: '덥다', pos: 'い형용사', level: 'N5', category: '형용사', example: '今日は本当に暑いです。', exampleKr: '오늘은 정말 덥습니다.' },
  { id: 'v-samui', word: '寒い', reading: 'さむい', romaji: 'samui', meaning: '춥다', pos: 'い형용사', level: 'N5', category: '형용사', example: '冬は寒いです。', exampleKr: '겨울은 춥습니다.' },
  { id: 'v-oishii', word: '美味しい', reading: 'おいしい', romaji: 'oishii', meaning: '맛있다', pos: 'い형용사', level: 'N5', category: '형용사', example: 'このケーキは美味しいですね。', exampleKr: '이 케이크는 맛있네요.' },
  { id: 'v-tanoshii', word: '楽しい', reading: 'たのしい', romaji: 'tanoshii', meaning: '즐겁다', pos: 'い형용사', level: 'N5', category: '형용사', example: '旅行は楽しかったです。', exampleKr: '여행은 즐거웠습니다.' },
  { id: 'v-omoshiroi', word: '面白い', reading: 'おもしろい', romaji: 'omoshiroi', meaning: '재미있다', pos: 'い형용사', level: 'N5', category: '형용사', example: 'この映画は面白いです。', exampleKr: '이 영화는 재미있습니다.' },
  { id: 'v-isogashii', word: '忙しい', reading: 'いそがしい', romaji: 'isogashii', meaning: '바쁘다', pos: 'い형용사', level: 'N5', category: '형용사', example: '今週は忙しいです。', exampleKr: '이번 주는 바쁩니다.' },
  { id: 'v-ii', word: 'いい', reading: 'いい', romaji: 'ii', meaning: '좋다', pos: 'い형용사', level: 'N5', category: '형용사', example: '天気がいいですね。', exampleKr: '날씨가 좋네요.' },
  { id: 'v-warui', word: '悪い', reading: 'わるい', romaji: 'warui', meaning: '나쁘다', pos: 'い형용사', level: 'N5', category: '형용사', example: '気分が悪いです。', exampleKr: '기분이 나쁩니다.' },

  // な형용사
  { id: 'v-suki', word: '好き', reading: 'すき', romaji: 'suki', meaning: '좋아함', pos: 'な형용사', level: 'N5', category: '형용사', example: '猫が好きです。', exampleKr: '고양이를 좋아합니다.' },
  { id: 'v-kirai', word: '嫌い', reading: 'きらい', romaji: 'kirai', meaning: '싫어함', pos: 'な형용사', level: 'N5', category: '형용사', example: '虫が嫌いです。', exampleKr: '벌레를 싫어합니다.' },
  { id: 'v-kirei', word: 'きれい', reading: 'きれい', romaji: 'kirei', meaning: '예쁘다, 깨끗하다', pos: 'な형용사', level: 'N5', category: '형용사', example: '花がきれいですね。', exampleKr: '꽃이 예쁘네요.' },
  { id: 'v-genki', word: '元気', reading: 'げんき', romaji: 'genki', meaning: '건강함, 활기', pos: 'な형용사', level: 'N5', category: '형용사', example: '元気ですか。', exampleKr: '잘 지내십니까?' },
  { id: 'v-shizuka', word: '静か', reading: 'しずか', romaji: 'shizuka', meaning: '조용함', pos: 'な형용사', level: 'N5', category: '형용사', example: '図書館は静かです。', exampleKr: '도서관은 조용합니다.' },
  { id: 'v-nigiyaka', word: 'にぎやか', reading: 'にぎやか', romaji: 'nigiyaka', meaning: '번화함', pos: 'な형용사', level: 'N5', category: '형용사', example: '渋谷はにぎやかです。', exampleKr: '시부야는 번화합니다.' },
  { id: 'v-yuumei', word: '有名', reading: 'ゆうめい', romaji: 'yuumei', meaning: '유명함', pos: 'な형용사', level: 'N5', category: '형용사', example: 'この店は有名です。', exampleKr: '이 가게는 유명합니다.' },
  { id: 'v-shinsetsu', word: '親切', reading: 'しんせつ', romaji: 'shinsetsu', meaning: '친절함', pos: 'な형용사', level: 'N5', category: '형용사', example: '彼はとても親切です。', exampleKr: '그는 정말 친절합니다.' },

  // 장소
  { id: 'v-uchi', word: '家', reading: 'うち', romaji: 'uchi', meaning: '집', pos: '명사', level: 'N5', category: '장소', example: '家でゆっくりします。', exampleKr: '집에서 쉽니다.' },
  { id: 'v-gakkou', word: '学校', reading: 'がっこう', romaji: 'gakkou', meaning: '학교', pos: '명사', level: 'N5', category: '장소', example: '学校まで歩きます。', exampleKr: '학교까지 걸어갑니다.' },
  { id: 'v-kaisha', word: '会社', reading: 'かいしゃ', romaji: 'kaisha', meaning: '회사', pos: '명사', level: 'N5', category: '장소', example: '会社に遅れました。', exampleKr: '회사에 지각했습니다.' },
  { id: 'v-eki', word: '駅', reading: 'えき', romaji: 'eki', meaning: '역', pos: '명사', level: 'N5', category: '장소', example: '駅の前で待ちます。', exampleKr: '역 앞에서 기다립니다.' },
  { id: 'v-mise', word: '店', reading: 'みせ', romaji: 'mise', meaning: '가게', pos: '명사', level: 'N5', category: '장소', example: 'この店はおいしいです。', exampleKr: '이 가게는 맛있습니다.' },
  { id: 'v-toshokan', word: '図書館', reading: 'としょかん', romaji: 'toshokan', meaning: '도서관', pos: '명사', level: 'N5', category: '장소', example: '図書館で勉強します。', exampleKr: '도서관에서 공부합니다.' },
  { id: 'v-byouin', word: '病院', reading: 'びょういん', romaji: 'byouin', meaning: '병원', pos: '명사', level: 'N5', category: '장소', example: '病院に行きました。', exampleKr: '병원에 갔습니다.' },
  { id: 'v-ginkou', word: '銀行', reading: 'ぎんこう', romaji: 'ginkou', meaning: '은행', pos: '명사', level: 'N5', category: '장소', example: '銀行はどこですか。', exampleKr: '은행은 어디입니까?' },
  { id: 'v-kouen', word: '公園', reading: 'こうえん', romaji: 'kouen', meaning: '공원', pos: '명사', level: 'N5', category: '장소', example: '公園で散歩します。', exampleKr: '공원에서 산책합니다.' },

  // 사물·생활
  { id: 'v-hon', word: '本', reading: 'ほん', romaji: 'hon', meaning: '책', pos: '명사', level: 'N5', category: '사물', example: '面白い本を読みました。', exampleKr: '재미있는 책을 읽었습니다.' },
  { id: 'v-kuruma', word: '車', reading: 'くるま', romaji: 'kuruma', meaning: '자동차', pos: '명사', level: 'N5', category: '사물', example: '車で行きましょう。', exampleKr: '차로 갑시다.' },
  { id: 'v-densha', word: '電車', reading: 'でんしゃ', romaji: 'densha', meaning: '전철', pos: '명사', level: 'N5', category: '사물', example: '電車で会社に行きます。', exampleKr: '전철로 회사에 갑니다.' },
  { id: 'v-keitai', word: '携帯', reading: 'けいたい', romaji: 'keitai', meaning: '휴대폰', pos: '명사', level: 'N5', category: '사물', example: '携帯を忘れました。', exampleKr: '휴대폰을 잊고 왔어요.' },
  { id: 'v-tsukue', word: '机', reading: 'つくえ', romaji: 'tsukue', meaning: '책상', pos: '명사', level: 'N5', category: '사물', example: '机の上に本があります。', exampleKr: '책상 위에 책이 있습니다.' },
  { id: 'v-isu', word: '椅子', reading: 'いす', romaji: 'isu', meaning: '의자', pos: '명사', level: 'N5', category: '사물', example: '椅子に座ってください。', exampleKr: '의자에 앉으세요.' },

  // 추가 동작 동사
  { id: 'v-aruku', word: '歩く', reading: 'あるく', romaji: 'aruku', meaning: '걷다', pos: '동사(五段)', level: 'N5', category: '동작', example: '駅まで歩きます。', exampleKr: '역까지 걷습니다.' },
  { id: 'v-hashiru', word: '走る', reading: 'はしる', romaji: 'hashiru', meaning: '달리다', pos: '동사(五段)', level: 'N5', category: '동작', example: '公園で走ります。', exampleKr: '공원에서 달립니다.' },
  { id: 'v-oyogu', word: '泳ぐ', reading: 'およぐ', romaji: 'oyogu', meaning: '수영하다', pos: '동사(五段)', level: 'N5', category: '동작', example: '海で泳ぎたい。', exampleKr: '바다에서 수영하고 싶다.' },
  { id: 'v-asobu', word: '遊ぶ', reading: 'あそぶ', romaji: 'asobu', meaning: '놀다', pos: '동사(五段)', level: 'N5', category: '동작', example: '友達と遊びます。', exampleKr: '친구와 놉니다.' },
  { id: 'v-yasumu', word: '休む', reading: 'やすむ', romaji: 'yasumu', meaning: '쉬다', pos: '동사(五段)', level: 'N5', category: '동작', example: '今日は休みます。', exampleKr: '오늘은 쉽니다.' },
  { id: 'v-hairu', word: '入る', reading: 'はいる', romaji: 'hairu', meaning: '들어가다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'お風呂に入ります。', exampleKr: '욕조에 들어갑니다.' },
  { id: 'v-deru', word: '出る', reading: 'でる', romaji: 'deru', meaning: '나가다', pos: '동사(下一段)', level: 'N5', category: '동작', example: '家を出ます。', exampleKr: '집을 나옵니다.' },
  { id: 'v-tsukau-2', word: '使う', reading: 'つかう', romaji: 'tsukau', meaning: '쓰다, 사용하다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'この辞書を使います。', exampleKr: '이 사전을 사용합니다.' },
  { id: 'v-suwaru', word: '座る', reading: 'すわる', romaji: 'suwaru', meaning: '앉다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'ここに座ってください。', exampleKr: '여기에 앉으세요.' },
  { id: 'v-tatsu', word: '立つ', reading: 'たつ', romaji: 'tatsu', meaning: '서다', pos: '동사(五段)', level: 'N5', category: '동작', example: '一時間立っていました。', exampleKr: '한 시간 서 있었습니다.' },
  { id: 'v-noru', word: '乗る', reading: 'のる', romaji: 'noru', meaning: '타다', pos: '동사(五段)', level: 'N5', category: '동작', example: '電車に乗ります。', exampleKr: '전철을 탑니다.' },
  { id: 'v-oriru', word: '降りる', reading: 'おりる', romaji: 'oriru', meaning: '내리다', pos: '동사(上一段)', level: 'N5', category: '동작', example: '次の駅で降ります。', exampleKr: '다음 역에서 내립니다.' },
  { id: 'v-wakaru', word: '分かる', reading: 'わかる', romaji: 'wakaru', meaning: '알다, 이해하다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'よく分かりました。', exampleKr: '잘 알겠습니다.' },
  { id: 'v-shiru', word: '知る', reading: 'しる', romaji: 'shiru', meaning: '알다(정보)', pos: '동사(五段)', level: 'N5', category: '동작', example: 'その人を知っています。', exampleKr: '그 사람을 압니다.' },
  { id: 'v-iu', word: '言う', reading: 'いう', romaji: 'iu', meaning: '말하다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'もう一度言ってください。', exampleKr: '한 번 더 말해 주세요.' },
  { id: 'v-toru', word: '撮る', reading: 'とる', romaji: 'toru', meaning: '(사진을) 찍다', pos: '동사(五段)', level: 'N5', category: '동작', example: '写真を撮りましょう。', exampleKr: '사진을 찍읍시다.' },
  { id: 'v-utau', word: '歌う', reading: 'うたう', romaji: 'utau', meaning: '노래하다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'カラオケで歌います。', exampleKr: '노래방에서 노래합니다.' },
  { id: 'v-odoru', word: '踊る', reading: 'おどる', romaji: 'odoru', meaning: '춤추다', pos: '동사(五段)', level: 'N5', category: '동작', example: 'みんなで踊りました。', exampleKr: '모두 춤췄습니다.' },
  { id: 'v-narau', word: '習う', reading: 'ならう', romaji: 'narau', meaning: '배우다', pos: '동사(五段)', level: 'N5', category: '동작', example: '日本語を習っています。', exampleKr: '일본어를 배우고 있습니다.' },
  { id: 'v-oshieru', word: '教える', reading: 'おしえる', romaji: 'oshieru', meaning: '가르치다', pos: '동사(下一段)', level: 'N5', category: '동작', example: '英語を教えます。', exampleKr: '영어를 가르칩니다.' },

  // 색깔
  { id: 'v-aka', word: '赤', reading: 'あか', romaji: 'aka', meaning: '빨강', pos: '명사', level: 'N5', category: '색깔', example: '赤いりんご。', exampleKr: '빨간 사과.' },
  { id: 'v-ao', word: '青', reading: 'あお', romaji: 'ao', meaning: '파랑', pos: '명사', level: 'N5', category: '색깔', example: '空が青いです。', exampleKr: '하늘이 파랗습니다.' },
  { id: 'v-shiro', word: '白', reading: 'しろ', romaji: 'shiro', meaning: '하양', pos: '명사', level: 'N5', category: '색깔', example: '白いシャツを着ます。', exampleKr: '흰 셔츠를 입습니다.' },
  { id: 'v-kuro', word: '黒', reading: 'くろ', romaji: 'kuro', meaning: '검정', pos: '명사', level: 'N5', category: '색깔', example: '黒い猫がいる。', exampleKr: '검은 고양이가 있다.' },
  { id: 'v-kiiro', word: '黄色', reading: 'きいろ', romaji: 'kiiro', meaning: '노랑', pos: '명사', level: 'N5', category: '색깔', example: '黄色い花がきれい。', exampleKr: '노란 꽃이 예쁘다.' },
  { id: 'v-midori', word: '緑', reading: 'みどり', romaji: 'midori', meaning: '초록', pos: '명사', level: 'N5', category: '색깔', example: '緑のお茶を飲む。', exampleKr: '녹차를 마신다.' },

  // 날씨·자연
  { id: 'v-tenki', word: '天気', reading: 'てんき', romaji: 'tenki', meaning: '날씨', pos: '명사', level: 'N5', category: '자연', example: '今日はいい天気ですね。', exampleKr: '오늘은 날씨가 좋네요.' },
  { id: 'v-ame', word: '雨', reading: 'あめ', romaji: 'ame', meaning: '비', pos: '명사', level: 'N5', category: '자연', example: '雨が降っています。', exampleKr: '비가 내리고 있습니다.' },
  { id: 'v-yuki', word: '雪', reading: 'ゆき', romaji: 'yuki', meaning: '눈', pos: '명사', level: 'N5', category: '자연', example: '雪が降りました。', exampleKr: '눈이 내렸습니다.' },
  { id: 'v-kaze', word: '風', reading: 'かぜ', romaji: 'kaze', meaning: '바람', pos: '명사', level: 'N5', category: '자연', example: '今日は風が強いです。', exampleKr: '오늘은 바람이 셉니다.' },
  { id: 'v-yama2', word: '山', reading: 'やま', romaji: 'yama', meaning: '산', pos: '명사', level: 'N5', category: '자연', example: '富士山を見たい。', exampleKr: '후지산을 보고 싶다.' },
  { id: 'v-umi', word: '海', reading: 'うみ', romaji: 'umi', meaning: '바다', pos: '명사', level: 'N5', category: '자연', example: '夏は海に行きます。', exampleKr: '여름엔 바다에 갑니다.' },
  { id: 'v-kawa-2', word: '川', reading: 'かわ', romaji: 'kawa', meaning: '강', pos: '명사', level: 'N5', category: '자연', example: '川で遊びました。', exampleKr: '강에서 놀았습니다.' },
  { id: 'v-sora', word: '空', reading: 'そら', romaji: 'sora', meaning: '하늘', pos: '명사', level: 'N5', category: '자연', example: '空が青いです。', exampleKr: '하늘이 파랗습니다.' },
  { id: 'v-hana-flower', word: '花', reading: 'はな', romaji: 'hana', meaning: '꽃', pos: '명사', level: 'N5', category: '자연', example: '花がきれいです。', exampleKr: '꽃이 예쁩니다.' },
  { id: 'v-ki-tree', word: '木', reading: 'き', romaji: 'ki', meaning: '나무', pos: '명사', level: 'N5', category: '자연', example: '大きな木があります。', exampleKr: '큰 나무가 있습니다.' },

  // 음식 추가
  { id: 'v-sushi', word: '寿司', reading: 'すし', romaji: 'sushi', meaning: '초밥', pos: '명사', level: 'N5', category: '음식', example: '寿司が大好きです。', exampleKr: '초밥을 정말 좋아합니다.' },
  { id: 'v-ramen', word: 'ラーメン', reading: 'ラーメン', romaji: 'raamen', meaning: '라면', pos: '명사', level: 'N5', category: '음식', example: '昼にラーメンを食べました。', exampleKr: '점심에 라면을 먹었습니다.' },
  { id: 'v-sake', word: 'お酒', reading: 'おさけ', romaji: 'osake', meaning: '술', pos: '명사', level: 'N5', category: '음식', example: 'お酒を少し飲みます。', exampleKr: '술을 조금 마십니다.' },
  { id: 'v-gyuunyuu', word: '牛乳', reading: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: '우유', pos: '명사', level: 'N5', category: '음식', example: '毎朝牛乳を飲みます。', exampleKr: '매일 아침 우유를 마십니다.' },
  { id: 'v-juusu', word: 'ジュース', reading: 'ジュース', romaji: 'juusu', meaning: '주스', pos: '명사', level: 'N5', category: '음식', example: 'オレンジジュースをください。', exampleKr: '오렌지 주스 주세요.' },
  { id: 'v-keeki', word: 'ケーキ', reading: 'ケーキ', romaji: 'keeki', meaning: '케이크', pos: '명사', level: 'N5', category: '음식', example: '誕生日にケーキを食べる。', exampleKr: '생일에 케이크를 먹는다.' },
  { id: 'v-ringo', word: 'りんご', reading: 'りんご', romaji: 'ringo', meaning: '사과', pos: '명사', level: 'N5', category: '음식', example: 'りんごを買いました。', exampleKr: '사과를 샀습니다.' },
  { id: 'v-mikan', word: 'みかん', reading: 'みかん', romaji: 'mikan', meaning: '귤', pos: '명사', level: 'N5', category: '음식', example: '冬はみかんがおいしい。', exampleKr: '겨울엔 귤이 맛있다.' },
  { id: 'v-banana', word: 'バナナ', reading: 'バナナ', romaji: 'banana', meaning: '바나나', pos: '명사', level: 'N5', category: '음식', example: 'バナナを食べた。', exampleKr: '바나나를 먹었다.' },

  // 신체
  { id: 'v-atama', word: '頭', reading: 'あたま', romaji: 'atama', meaning: '머리', pos: '명사', level: 'N5', category: '신체', example: '頭が痛いです。', exampleKr: '머리가 아픕니다.' },
  { id: 'v-kao', word: '顔', reading: 'かお', romaji: 'kao', meaning: '얼굴', pos: '명사', level: 'N5', category: '신체', example: '顔を洗います。', exampleKr: '얼굴을 씻습니다.' },
  { id: 'v-me', word: '目', reading: 'め', romaji: 'me', meaning: '눈', pos: '명사', level: 'N5', category: '신체', example: '目が大きいです。', exampleKr: '눈이 큽니다.' },
  { id: 'v-mimi', word: '耳', reading: 'みみ', romaji: 'mimi', meaning: '귀', pos: '명사', level: 'N5', category: '신체', example: '耳が痛い。', exampleKr: '귀가 아프다.' },
  { id: 'v-kuchi', word: '口', reading: 'くち', romaji: 'kuchi', meaning: '입', pos: '명사', level: 'N5', category: '신체', example: '口を開けてください。', exampleKr: '입을 벌려 주세요.' },
  { id: 'v-te', word: '手', reading: 'て', romaji: 'te', meaning: '손', pos: '명사', level: 'N5', category: '신체', example: '手を洗ってください。', exampleKr: '손을 씻어 주세요.' },
  { id: 'v-ashi', word: '足', reading: 'あし', romaji: 'ashi', meaning: '발, 다리', pos: '명사', level: 'N5', category: '신체', example: '足が疲れた。', exampleKr: '다리가 피곤하다.' },

  // 의문사
  { id: 'v-nani', word: '何', reading: 'なに', romaji: 'nani', meaning: '무엇', pos: '의문사', level: 'N5', category: '기타', example: 'これは何ですか。', exampleKr: '이것은 무엇입니까?' },
  { id: 'v-dare', word: '誰', reading: 'だれ', romaji: 'dare', meaning: '누구', pos: '의문사', level: 'N5', category: '기타', example: 'あの人は誰ですか。', exampleKr: '저 사람은 누구입니까?' },
  { id: 'v-doko', word: 'どこ', reading: 'どこ', romaji: 'doko', meaning: '어디', pos: '의문사', level: 'N5', category: '기타', example: 'トイレはどこですか。', exampleKr: '화장실은 어디입니까?' },
  { id: 'v-itsu', word: 'いつ', reading: 'いつ', romaji: 'itsu', meaning: '언제', pos: '의문사', level: 'N5', category: '기타', example: 'いつ行きますか。', exampleKr: '언제 갑니까?' },
  { id: 'v-doushite', word: 'どうして', reading: 'どうして', romaji: 'doushite', meaning: '왜', pos: '의문사', level: 'N5', category: '기타', example: 'どうして泣いていますか。', exampleKr: '왜 울고 있습니까?' },
  { id: 'v-ikura', word: 'いくら', reading: 'いくら', romaji: 'ikura', meaning: '얼마', pos: '의문사', level: 'N5', category: '기타', example: 'これはいくらですか。', exampleKr: '이것은 얼마입니까?' },

  // 빈도 부사
  { id: 'v-itsumo', word: 'いつも', reading: 'いつも', romaji: 'itsumo', meaning: '항상', pos: '부사', level: 'N5', category: '부사', example: 'いつも七時に起きます。', exampleKr: '항상 7시에 일어납니다.' },
  { id: 'v-yoku', word: 'よく', reading: 'よく', romaji: 'yoku', meaning: '자주, 잘', pos: '부사', level: 'N5', category: '부사', example: 'よく寝ました。', exampleKr: '잘 잤습니다.' },
  { id: 'v-tokidoki', word: '時々', reading: 'ときどき', romaji: 'tokidoki', meaning: '가끔', pos: '부사', level: 'N5', category: '부사', example: '時々映画を見ます。', exampleKr: '가끔 영화를 봅니다.' },
  { id: 'v-amari', word: 'あまり', reading: 'あまり', romaji: 'amari', meaning: '별로 (~않다)', pos: '부사', level: 'N5', category: '부사', example: 'あまり食べません。', exampleKr: '별로 안 먹습니다.' },
  { id: 'v-taihen', word: 'とても', reading: 'とても', romaji: 'totemo', meaning: '매우', pos: '부사', level: 'N5', category: '부사', example: 'とてもおいしいです。', exampleKr: '매우 맛있습니다.' },
  { id: 'v-sukoshi', word: '少し', reading: 'すこし', romaji: 'sukoshi', meaning: '조금', pos: '부사', level: 'N5', category: '부사', example: '少し疲れました。', exampleKr: '조금 피곤합니다.' },
  { id: 'v-takusan', word: 'たくさん', reading: 'たくさん', romaji: 'takusan', meaning: '많이', pos: '부사', level: 'N5', category: '부사', example: 'たくさん食べました。', exampleKr: '많이 먹었습니다.' },
]

// ---------- N4 ----------
const n4: VocabItem[] = [
  { id: 'v4-shumi', word: '趣味', reading: 'しゅみ', romaji: 'shumi', meaning: '취미', pos: '명사', level: 'N4', category: '일상', example: '趣味は読書です。', exampleKr: '취미는 독서입니다.' },
  { id: 'v4-keikaku', word: '計画', reading: 'けいかく', romaji: 'keikaku', meaning: '계획', pos: '명사', level: 'N4', category: '일상', example: '旅行の計画を立てます。', exampleKr: '여행 계획을 세웁니다.' },
  { id: 'v4-yotei', word: '予定', reading: 'よてい', romaji: 'yotei', meaning: '예정, 일정', pos: '명사', level: 'N4', category: '일상', example: '今日の予定は何ですか。', exampleKr: '오늘 일정은 무엇입니까?' },
  { id: 'v4-yakusoku', word: '約束', reading: 'やくそく', romaji: 'yakusoku', meaning: '약속', pos: '명사', level: 'N4', category: '일상', example: '友達と約束があります。', exampleKr: '친구와 약속이 있습니다.' },
  { id: 'v4-kibun', word: '気分', reading: 'きぶん', romaji: 'kibun', meaning: '기분', pos: '명사', level: 'N4', category: '감정', example: '今日は気分がいいです。', exampleKr: '오늘은 기분이 좋습니다.' },
  { id: 'v4-shinpai', word: '心配', reading: 'しんぱい', romaji: 'shinpai', meaning: '걱정', pos: '명사·する동사', level: 'N4', category: '감정', example: '心配しないでください。', exampleKr: '걱정하지 마세요.' },
  { id: 'v4-anshin', word: '安心', reading: 'あんしん', romaji: 'anshin', meaning: '안심', pos: '명사·する동사', level: 'N4', category: '감정', example: 'これで安心しました。', exampleKr: '이걸로 안심했습니다.' },
  { id: 'v4-kimochi', word: '気持ち', reading: 'きもち', romaji: 'kimochi', meaning: '기분, 마음', pos: '명사', level: 'N4', category: '감정', example: '気持ちを伝えたい。', exampleKr: '마음을 전하고 싶다.' },
  { id: 'v4-keiken', word: '経験', reading: 'けいけん', romaji: 'keiken', meaning: '경험', pos: '명사', level: 'N4', category: '학습', example: '経験から学びます。', exampleKr: '경험에서 배웁니다.' },
  { id: 'v4-shumi-gaku', word: '勉強', reading: 'べんきょう', romaji: 'benkyou', meaning: '공부', pos: '명사·する동사', level: 'N4', category: '학습', example: '日本語を勉強しています。', exampleKr: '일본어를 공부하고 있습니다.' },
  { id: 'v4-shiken', word: '試験', reading: 'しけん', romaji: 'shiken', meaning: '시험', pos: '명사', level: 'N4', category: '학습', example: '明日試験があります。', exampleKr: '내일 시험이 있습니다.' },
  { id: 'v4-shukudai', word: '宿題', reading: 'しゅくだい', romaji: 'shukudai', meaning: '숙제', pos: '명사', level: 'N4', category: '학습', example: '宿題が終わりました。', exampleKr: '숙제가 끝났습니다.' },
  { id: 'v4-kotae', word: '答え', reading: 'こたえ', romaji: 'kotae', meaning: '답', pos: '명사', level: 'N4', category: '학습', example: '答えがわかりません。', exampleKr: '답을 모르겠습니다.' },
  { id: 'v4-shitsumon', word: '質問', reading: 'しつもん', romaji: 'shitsumon', meaning: '질문', pos: '명사', level: 'N4', category: '학습', example: '質問してもいいですか。', exampleKr: '질문해도 괜찮습니까?' },
  { id: 'v4-imi', word: '意味', reading: 'いみ', romaji: 'imi', meaning: '의미', pos: '명사', level: 'N4', category: '학습', example: 'この言葉の意味は？', exampleKr: '이 단어의 의미는?' },
  { id: 'v4-kotoba', word: '言葉', reading: 'ことば', romaji: 'kotoba', meaning: '말, 단어', pos: '명사', level: 'N4', category: '학습', example: '優しい言葉をかけた。', exampleKr: '다정한 말을 건넸다.' },
  { id: 'v4-omou', word: '思う', reading: 'おもう', romaji: 'omou', meaning: '생각하다', pos: '동사(五段)', level: 'N4', category: '동작', example: 'いい考えだと思います。', exampleKr: '좋은 생각이라고 생각합니다.' },
  { id: 'v4-kangaeru', word: '考える', reading: 'かんがえる', romaji: 'kangaeru', meaning: '생각하다, 고민하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: 'よく考えてください。', exampleKr: '잘 생각해 주세요.' },
  { id: 'v4-tsukau', word: '使う', reading: 'つかう', romaji: 'tsukau', meaning: '사용하다', pos: '동사(五段)', level: 'N4', category: '동작', example: 'この道具を使います。', exampleKr: '이 도구를 사용합니다.' },
  { id: 'v4-tetsudau', word: '手伝う', reading: 'てつだう', romaji: 'tetsudau', meaning: '돕다', pos: '동사(五段)', level: 'N4', category: '동작', example: '母を手伝います。', exampleKr: '어머니를 돕습니다.' },
  { id: 'v4-isogu', word: '急ぐ', reading: 'いそぐ', romaji: 'isogu', meaning: '서두르다', pos: '동사(五段)', level: 'N4', category: '동작', example: '急いでください。', exampleKr: '서둘러 주세요.' },
  { id: 'v4-naku', word: '泣く', reading: 'なく', romaji: 'naku', meaning: '울다', pos: '동사(五段)', level: 'N4', category: '동작', example: '赤ちゃんが泣いています。', exampleKr: '아기가 울고 있습니다.' },
  { id: 'v4-warau', word: '笑う', reading: 'わらう', romaji: 'warau', meaning: '웃다', pos: '동사(五段)', level: 'N4', category: '동작', example: 'みんなで笑いました。', exampleKr: '모두 함께 웃었습니다.' },
  { id: 'v4-okuru', word: '送る', reading: 'おくる', romaji: 'okuru', meaning: '보내다, 배웅하다', pos: '동사(五段)', level: 'N4', category: '동작', example: 'メールを送ります。', exampleKr: '메일을 보냅니다.' },
  { id: 'v4-tsutaeru', word: '伝える', reading: 'つたえる', romaji: 'tsutaeru', meaning: '전하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: 'みんなに伝えてください。', exampleKr: '모두에게 전해 주세요.' },
  { id: 'v4-shiraberu', word: '調べる', reading: 'しらべる', romaji: 'shiraberu', meaning: '조사하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '辞書で調べます。', exampleKr: '사전에서 찾아봅니다.' },
  { id: 'v4-mitsukeru', word: '見つける', reading: 'みつける', romaji: 'mitsukeru', meaning: '찾다, 발견하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '鍵を見つけました。', exampleKr: '열쇠를 찾았습니다.' },
  { id: 'v4-erabu', word: '選ぶ', reading: 'えらぶ', romaji: 'erabu', meaning: '고르다', pos: '동사(五段)', level: 'N4', category: '동작', example: '好きな色を選んでください。', exampleKr: '좋아하는 색을 골라 주세요.' },
  { id: 'v4-machigau', word: '間違う', reading: 'まちがう', romaji: 'machigau', meaning: '틀리다', pos: '동사(五段)', level: 'N4', category: '동작', example: '答えを間違えました。', exampleKr: '답을 틀렸습니다.' },
  { id: 'v4-naoru', word: '直る', reading: 'なおる', romaji: 'naoru', meaning: '고쳐지다, 낫다', pos: '동사(五段)', level: 'N4', category: '동작', example: '時計が直りました。', exampleKr: '시계가 고쳐졌습니다.' },
  { id: 'v4-tetsudai', word: '準備', reading: 'じゅんび', romaji: 'junbi', meaning: '준비', pos: '명사·する동사', level: 'N4', category: '일상', example: '旅行の準備をします。', exampleKr: '여행 준비를 합니다.' },
  { id: 'v4-shitsurei', word: '失礼', reading: 'しつれい', romaji: 'shitsurei', meaning: '실례', pos: 'な형용사', level: 'N4', category: '인사', example: '失礼しました。', exampleKr: '실례했습니다.' },
  { id: 'v4-daijoubu', word: '大丈夫', reading: 'だいじょうぶ', romaji: 'daijoubu', meaning: '괜찮음', pos: 'な형용사', level: 'N4', category: '인사', example: 'もう大丈夫です。', exampleKr: '이제 괜찮습니다.' },

  // N4 추가
  { id: 'v4-shakai', word: '社会', reading: 'しゃかい', romaji: 'shakai', meaning: '사회', pos: '명사', level: 'N4', category: '사회', example: '社会の問題を考えます。', exampleKr: '사회 문제를 생각합니다.' },
  { id: 'v4-bunka', word: '文化', reading: 'ぶんか', romaji: 'bunka', meaning: '문화', pos: '명사', level: 'N4', category: '사회', example: '日本の文化が好きです。', exampleKr: '일본 문화를 좋아합니다.' },
  { id: 'v4-rekishi', word: '歴史', reading: 'れきし', romaji: 'rekishi', meaning: '역사', pos: '명사', level: 'N4', category: '사회', example: '歴史を勉強します。', exampleKr: '역사를 공부합니다.' },
  { id: 'v4-kyouiku', word: '教育', reading: 'きょういく', romaji: 'kyouiku', meaning: '교육', pos: '명사', level: 'N4', category: '학습', example: '子供の教育は大切です。', exampleKr: '아이의 교육은 중요합니다.' },
  { id: 'v4-shigoto', word: '仕事', reading: 'しごと', romaji: 'shigoto', meaning: '일, 직업', pos: '명사', level: 'N4', category: '일상', example: '仕事が忙しいです。', exampleKr: '일이 바쁩니다.' },
  { id: 'v4-kaigi', word: '会議', reading: 'かいぎ', romaji: 'kaigi', meaning: '회의', pos: '명사', level: 'N4', category: '일상', example: '今日は会議があります。', exampleKr: '오늘 회의가 있습니다.' },
  { id: 'v4-jisho', word: '辞書', reading: 'じしょ', romaji: 'jisho', meaning: '사전', pos: '명사', level: 'N4', category: '학습', example: '辞書で調べました。', exampleKr: '사전에서 찾았습니다.' },
  { id: 'v4-mondai', word: '問題', reading: 'もんだい', romaji: 'mondai', meaning: '문제', pos: '명사', level: 'N4', category: '학습', example: 'この問題は難しい。', exampleKr: '이 문제는 어렵다.' },
  { id: 'v4-riyuu', word: '理由', reading: 'りゆう', romaji: 'riyuu', meaning: '이유', pos: '명사', level: 'N4', category: '학습', example: '理由を教えてください。', exampleKr: '이유를 알려주세요.' },
  { id: 'v4-houhou', word: '方法', reading: 'ほうほう', romaji: 'houhou', meaning: '방법', pos: '명사', level: 'N4', category: '학습', example: '使う方法を学びました。', exampleKr: '사용하는 방법을 배웠습니다.' },
  { id: 'v4-jiyuu', word: '自由', reading: 'じゆう', romaji: 'jiyuu', meaning: '자유', pos: '명사·な형용사', level: 'N4', category: '감정', example: '自由な時間が欲しい。', exampleKr: '자유로운 시간을 원한다.' },
  { id: 'v4-tokoro', word: '所', reading: 'ところ', romaji: 'tokoro', meaning: '곳', pos: '명사', level: 'N4', category: '장소', example: '静かな所で休む。', exampleKr: '조용한 곳에서 쉰다.' },
  { id: 'v4-mura', word: '村', reading: 'むら', romaji: 'mura', meaning: '마을', pos: '명사', level: 'N4', category: '장소', example: '小さな村に住んでいます。', exampleKr: '작은 마을에 살고 있습니다.' },
  { id: 'v4-machi', word: '町', reading: 'まち', romaji: 'machi', meaning: '동네, 도시', pos: '명사', level: 'N4', category: '장소', example: 'この町は静かです。', exampleKr: '이 동네는 조용합니다.' },
  { id: 'v4-toshi', word: '都市', reading: 'とし', romaji: 'toshi', meaning: '도시', pos: '명사', level: 'N4', category: '장소', example: '大きな都市で働く。', exampleKr: '큰 도시에서 일한다.' },
  { id: 'v4-shokuji', word: '食事', reading: 'しょくじ', romaji: 'shokuji', meaning: '식사', pos: '명사·する동사', level: 'N4', category: '음식', example: '食事の準備をします。', exampleKr: '식사 준비를 합니다.' },
  { id: 'v4-aisatsu', word: '挨拶', reading: 'あいさつ', romaji: 'aisatsu', meaning: '인사', pos: '명사·する동사', level: 'N4', category: '인사', example: '元気に挨拶しましょう。', exampleKr: '활기차게 인사합시다.' },
  { id: 'v4-ryokou', word: '旅行', reading: 'りょこう', romaji: 'ryokou', meaning: '여행', pos: '명사·する동사', level: 'N4', category: '일상', example: '夏に旅行に行きます。', exampleKr: '여름에 여행 갑니다.' },
  { id: 'v4-undou', word: '運動', reading: 'うんどう', romaji: 'undou', meaning: '운동', pos: '명사·する동사', level: 'N4', category: '일상', example: '毎日運動しています。', exampleKr: '매일 운동하고 있습니다.' },
  { id: 'v4-kaimono', word: '買い物', reading: 'かいもの', romaji: 'kaimono', meaning: '쇼핑', pos: '명사', level: 'N4', category: '일상', example: 'スーパーで買い物しました。', exampleKr: '슈퍼에서 쇼핑했습니다.' },
  { id: 'v4-souji', word: '掃除', reading: 'そうじ', romaji: 'souji', meaning: '청소', pos: '명사·する동사', level: 'N4', category: '일상', example: '部屋を掃除します。', exampleKr: '방을 청소합니다.' },
  { id: 'v4-sentaku', word: '洗濯', reading: 'せんたく', romaji: 'sentaku', meaning: '빨래', pos: '명사·する동사', level: 'N4', category: '일상', example: '日曜日に洗濯します。', exampleKr: '일요일에 빨래합니다.' },
  { id: 'v4-ryouri', word: '料理', reading: 'りょうり', romaji: 'ryouri', meaning: '요리', pos: '명사·する동사', level: 'N4', category: '일상', example: '料理が好きです。', exampleKr: '요리를 좋아합니다.' },
  { id: 'v4-eiga', word: '映画', reading: 'えいが', romaji: 'eiga', meaning: '영화', pos: '명사', level: 'N4', category: '일상', example: '映画を見に行きます。', exampleKr: '영화를 보러 갑니다.' },
  { id: 'v4-ongaku', word: '音楽', reading: 'おんがく', romaji: 'ongaku', meaning: '음악', pos: '명사', level: 'N4', category: '일상', example: '音楽を聴きながら勉強する。', exampleKr: '음악을 들으면서 공부한다.' },

  // N4 동사 추가
  { id: 'v4-hajimeru', word: '始める', reading: 'はじめる', romaji: 'hajimeru', meaning: '시작하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '勉強を始めます。', exampleKr: '공부를 시작합니다.' },
  { id: 'v4-owaru', word: '終わる', reading: 'おわる', romaji: 'owaru', meaning: '끝나다', pos: '동사(五段)', level: 'N4', category: '동작', example: '会議が終わりました。', exampleKr: '회의가 끝났습니다.' },
  { id: 'v4-kotaeru', word: '答える', reading: 'こたえる', romaji: 'kotaeru', meaning: '대답하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '質問に答えてください。', exampleKr: '질문에 답해 주세요.' },
  { id: 'v4-tasukeru', word: '助ける', reading: 'たすける', romaji: 'tasukeru', meaning: '돕다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '友達を助けたい。', exampleKr: '친구를 돕고 싶다.' },
  { id: 'v4-mukaeru', word: '迎える', reading: 'むかえる', romaji: 'mukaeru', meaning: '맞이하다', pos: '동사(下一段)', level: 'N4', category: '동작', example: '駅でお客様を迎えます。', exampleKr: '역에서 손님을 맞이합니다.' },
  { id: 'v4-tsukareru', word: '疲れる', reading: 'つかれる', romaji: 'tsukareru', meaning: '피곤하다', pos: '동사(下一段)', level: 'N4', category: '감정', example: '今日は疲れました。', exampleKr: '오늘은 피곤했습니다.' },
  { id: 'v4-komaru', word: '困る', reading: 'こまる', romaji: 'komaru', meaning: '곤란하다', pos: '동사(五段)', level: 'N4', category: '감정', example: '困ったときは言ってください。', exampleKr: '곤란할 때는 말해 주세요.' },
  { id: 'v4-bikkuri', word: 'びっくりする', reading: 'びっくりする', romaji: 'bikkuri-suru', meaning: '깜짝 놀라다', pos: 'する동사', level: 'N4', category: '감정', example: 'ニュースを聞いてびっくりした。', exampleKr: '뉴스를 듣고 깜짝 놀랐다.' },
]

// ---------- N3 (selection of high-frequency) ----------
const n3: VocabItem[] = [
  { id: 'v3-koukan', word: '交換', reading: 'こうかん', romaji: 'koukan', meaning: '교환', pos: '명사·する동사', level: 'N3', category: '사회', example: 'プレゼントを交換しました。', exampleKr: '선물을 교환했습니다.' },
  { id: 'v3-shucchou', word: '出張', reading: 'しゅっちょう', romaji: 'shucchou', meaning: '출장', pos: '명사·する동사', level: 'N3', category: '사회', example: '来週東京へ出張します。', exampleKr: '다음 주 도쿄로 출장갑니다.' },
  { id: 'v3-soudan', word: '相談', reading: 'そうだん', romaji: 'soudan', meaning: '상담', pos: '명사·する동사', level: 'N3', category: '사회', example: 'ちょっと相談があります。', exampleKr: '잠깐 상담할 게 있어요.' },
  { id: 'v3-shoukai', word: '紹介', reading: 'しょうかい', romaji: 'shoukai', meaning: '소개', pos: '명사·する동사', level: 'N3', category: '사회', example: '友達を紹介します。', exampleKr: '친구를 소개합니다.' },
  { id: 'v3-yoyaku', word: '予約', reading: 'よやく', romaji: 'yoyaku', meaning: '예약', pos: '명사·する동사', level: 'N3', category: '사회', example: 'レストランを予約しました。', exampleKr: '레스토랑을 예약했습니다.' },
  { id: 'v3-renraku', word: '連絡', reading: 'れんらく', romaji: 'renraku', meaning: '연락', pos: '명사·する동사', level: 'N3', category: '사회', example: '後で連絡します。', exampleKr: '나중에 연락할게요.' },
  { id: 'v3-houkoku', word: '報告', reading: 'ほうこく', romaji: 'houkoku', meaning: '보고', pos: '명사·する동사', level: 'N3', category: '사회', example: '結果を報告します。', exampleKr: '결과를 보고합니다.' },
  { id: 'v3-kettei', word: '決定', reading: 'けってい', romaji: 'kettei', meaning: '결정', pos: '명사·する동사', level: 'N3', category: '사회', example: '会議で決定しました。', exampleKr: '회의에서 결정했습니다.' },
  { id: 'v3-mokuteki', word: '目的', reading: 'もくてき', romaji: 'mokuteki', meaning: '목적', pos: '명사', level: 'N3', category: '사회', example: '旅行の目的は何ですか。', exampleKr: '여행의 목적은 무엇입니까?' },
  { id: 'v3-rieki', word: '利益', reading: 'りえき', romaji: 'rieki', meaning: '이익', pos: '명사', level: 'N3', category: '사회', example: '利益が出ました。', exampleKr: '이익이 났습니다.' },
  { id: 'v3-kankei', word: '関係', reading: 'かんけい', romaji: 'kankei', meaning: '관계', pos: '명사', level: 'N3', category: '사회', example: '人間関係は大切です。', exampleKr: '인간관계는 중요합니다.' },
  { id: 'v3-eikyou', word: '影響', reading: 'えいきょう', romaji: 'eikyou', meaning: '영향', pos: '명사·する동사', level: 'N3', category: '사회', example: '天気の影響を受けます。', exampleKr: '날씨의 영향을 받습니다.' },
  { id: 'v3-genin', word: '原因', reading: 'げんいん', romaji: 'genin', meaning: '원인', pos: '명사', level: 'N3', category: '사회', example: '事故の原因を調べます。', exampleKr: '사고의 원인을 조사합니다.' },
  { id: 'v3-kekka', word: '結果', reading: 'けっか', romaji: 'kekka', meaning: '결과', pos: '명사', level: 'N3', category: '사회', example: '試験の結果が出ました。', exampleKr: '시험 결과가 나왔습니다.' },
  { id: 'v3-houhou', word: '方法', reading: 'ほうほう', romaji: 'houhou', meaning: '방법', pos: '명사', level: 'N3', category: '사회', example: '別の方法を試します。', exampleKr: '다른 방법을 시도합니다.' },
  { id: 'v3-keiken-do', word: '経験する', reading: 'けいけんする', romaji: 'keiken-suru', meaning: '경험하다', pos: 'する동사', level: 'N3', category: '동작', example: '色々経験したい。', exampleKr: '여러 가지를 경험하고 싶다.' },
  { id: 'v3-tsuduku', word: '続く', reading: 'つづく', romaji: 'tsuduku', meaning: '계속되다', pos: '동사(五段)', level: 'N3', category: '동작', example: '雨が続いています。', exampleKr: '비가 계속 오고 있습니다.' },
  { id: 'v3-tomeru', word: '止める', reading: 'とめる', romaji: 'tomeru', meaning: '멈추다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '車を止めてください。', exampleKr: '차를 세워 주세요.' },
  { id: 'v3-fueru', word: '増える', reading: 'ふえる', romaji: 'fueru', meaning: '늘다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '人口が増えています。', exampleKr: '인구가 늘고 있습니다.' },
  { id: 'v3-heru', word: '減る', reading: 'へる', romaji: 'heru', meaning: '줄다', pos: '동사(五段)', level: 'N3', category: '동작', example: '体重が減りました。', exampleKr: '체중이 줄었습니다.' },
  { id: 'v3-kawaru', word: '変わる', reading: 'かわる', romaji: 'kawaru', meaning: '변하다', pos: '동사(五段)', level: 'N3', category: '동작', example: '季節が変わります。', exampleKr: '계절이 바뀝니다.' },
  { id: 'v3-kotonaru', word: '異なる', reading: 'ことなる', romaji: 'kotonaru', meaning: '다르다', pos: '동사(五段)', level: 'N3', category: '동작', example: '意見が異なります。', exampleKr: '의견이 다릅니다.' },
  { id: 'v3-omoidasu', word: '思い出す', reading: 'おもいだす', romaji: 'omoidasu', meaning: '떠올리다', pos: '동사(五段)', level: 'N3', category: '동작', example: '昔を思い出しました。', exampleKr: '옛날이 떠올랐습니다.' },
  { id: 'v3-wasureru', word: '忘れる', reading: 'わすれる', romaji: 'wasureru', meaning: '잊다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '名前を忘れました。', exampleKr: '이름을 잊었습니다.' },
  { id: 'v3-oboeru', word: '覚える', reading: 'おぼえる', romaji: 'oboeru', meaning: '외우다, 기억하다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '単語を覚えます。', exampleKr: '단어를 외웁니다.' },
  { id: 'v3-tasukeru', word: '助ける', reading: 'たすける', romaji: 'tasukeru', meaning: '돕다, 구하다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '困った人を助けます。', exampleKr: '어려운 사람을 돕습니다.' },
  { id: 'v3-yurusu', word: '許す', reading: 'ゆるす', romaji: 'yurusu', meaning: '용서하다, 허락하다', pos: '동사(五段)', level: 'N3', category: '동작', example: 'どうぞ許してください。', exampleKr: '부디 용서해 주세요.' },
  { id: 'v3-mamoru', word: '守る', reading: 'まもる', romaji: 'mamoru', meaning: '지키다', pos: '동사(五段)', level: 'N3', category: '동작', example: '約束を守ります。', exampleKr: '약속을 지킵니다.' },
  { id: 'v3-kankeinai', word: '関係ない', reading: 'かんけいない', romaji: 'kankei-nai', meaning: '상관없다', pos: '관용표현', level: 'N3', category: '회화', example: '私には関係ない。', exampleKr: '나하고는 상관없어.' },
  { id: 'v3-tabun', word: '多分', reading: 'たぶん', romaji: 'tabun', meaning: '아마, 어쩌면', pos: '부사', level: 'N3', category: '부사', example: '多分明日は晴れるでしょう。', exampleKr: '아마 내일은 맑을 거예요.' },
  { id: 'v3-zettai', word: '絶対', reading: 'ぜったい', romaji: 'zettai', meaning: '절대', pos: '부사', level: 'N3', category: '부사', example: '絶対に勝ちたい。', exampleKr: '절대로 이기고 싶다.' },
  { id: 'v3-zenzen', word: '全然', reading: 'ぜんぜん', romaji: 'zenzen', meaning: '전혀', pos: '부사', level: 'N3', category: '부사', example: '全然わかりません。', exampleKr: '전혀 모르겠습니다.' },
  { id: 'v3-hotondo', word: 'ほとんど', reading: 'ほとんど', romaji: 'hotondo', meaning: '거의', pos: '부사', level: 'N3', category: '부사', example: 'ほとんど終わりました。', exampleKr: '거의 끝났습니다.' },
  { id: 'v3-tokuni', word: '特に', reading: 'とくに', romaji: 'tokuni', meaning: '특히', pos: '부사', level: 'N3', category: '부사', example: '特に問題はありません。', exampleKr: '특별히 문제는 없습니다.' },
  { id: 'v3-kanarazu', word: '必ず', reading: 'かならず', romaji: 'kanarazu', meaning: '반드시', pos: '부사', level: 'N3', category: '부사', example: '必ず連絡します。', exampleKr: '반드시 연락하겠습니다.' },

  // N3 추가
  { id: 'v3-mokuhyou', word: '目標', reading: 'もくひょう', romaji: 'mokuhyou', meaning: '목표', pos: '명사', level: 'N3', category: '사회', example: '今年の目標を立てた。', exampleKr: '올해의 목표를 세웠다.' },
  { id: 'v3-yume', word: '夢', reading: 'ゆめ', romaji: 'yume', meaning: '꿈', pos: '명사', level: 'N3', category: '감정', example: '将来の夢を語る。', exampleKr: '장래의 꿈을 이야기한다.' },
  { id: 'v3-kibou', word: '希望', reading: 'きぼう', romaji: 'kibou', meaning: '희망', pos: '명사', level: 'N3', category: '감정', example: '希望を持って生きる。', exampleKr: '희망을 가지고 산다.' },
  { id: 'v3-doryoku', word: '努力', reading: 'どりょく', romaji: 'doryoku', meaning: '노력', pos: '명사·する동사', level: 'N3', category: '학습', example: '努力すれば成功する。', exampleKr: '노력하면 성공한다.' },
  { id: 'v3-sekinin', word: '責任', reading: 'せきにん', romaji: 'sekinin', meaning: '책임', pos: '명사', level: 'N3', category: '사회', example: '責任を持って働く。', exampleKr: '책임을 갖고 일한다.' },
  { id: 'v3-shourai', word: '将来', reading: 'しょうらい', romaji: 'shourai', meaning: '장래', pos: '명사', level: 'N3', category: '시간', example: '将来は医者になりたい。', exampleKr: '장래에 의사가 되고 싶다.' },
  { id: 'v3-kako', word: '過去', reading: 'かこ', romaji: 'kako', meaning: '과거', pos: '명사', level: 'N3', category: '시간', example: '過去は変えられない。', exampleKr: '과거는 바꿀 수 없다.' },
  { id: 'v3-mirai', word: '未来', reading: 'みらい', romaji: 'mirai', meaning: '미래', pos: '명사', level: 'N3', category: '시간', example: '明るい未来を願う。', exampleKr: '밝은 미래를 바란다.' },
  { id: 'v3-kankyou', word: '環境', reading: 'かんきょう', romaji: 'kankyou', meaning: '환경', pos: '명사', level: 'N3', category: '사회', example: '環境を守ろう。', exampleKr: '환경을 지키자.' },
  { id: 'v3-shizen', word: '自然', reading: 'しぜん', romaji: 'shizen', meaning: '자연', pos: '명사·な형용사', level: 'N3', category: '자연', example: '自然の中で過ごす。', exampleKr: '자연 속에서 지낸다.' },
  { id: 'v3-shakai', word: '社会', reading: 'しゃかい', romaji: 'shakai', meaning: '사회', pos: '명사', level: 'N3', category: '사회', example: '社会のルールを守る。', exampleKr: '사회의 규칙을 지킨다.' },
  { id: 'v3-keizai', word: '経済', reading: 'けいざい', romaji: 'keizai', meaning: '경제', pos: '명사', level: 'N3', category: '사회', example: '経済の本を読む。', exampleKr: '경제 책을 읽는다.' },
  { id: 'v3-seijika', word: '政治', reading: 'せいじ', romaji: 'seiji', meaning: '정치', pos: '명사', level: 'N3', category: '사회', example: '政治について話す。', exampleKr: '정치에 대해 이야기한다.' },
  { id: 'v3-seikatsu', word: '生活', reading: 'せいかつ', romaji: 'seikatsu', meaning: '생활', pos: '명사·する동사', level: 'N3', category: '일상', example: '生活が楽になった。', exampleKr: '생활이 편해졌다.' },
  { id: 'v3-shukan', word: '習慣', reading: 'しゅうかん', romaji: 'shuukan', meaning: '습관', pos: '명사', level: 'N3', category: '일상', example: '早寝早起きの習慣をつける。', exampleKr: '일찍 자고 일찍 일어나는 습관을 들인다.' },
  { id: 'v3-seikaku', word: '性格', reading: 'せいかく', romaji: 'seikaku', meaning: '성격', pos: '명사', level: 'N3', category: '사람', example: '彼女は明るい性格です。', exampleKr: '그녀는 밝은 성격입니다.' },
  { id: 'v3-kokoro', word: '心', reading: 'こころ', romaji: 'kokoro', meaning: '마음', pos: '명사', level: 'N3', category: '감정', example: '優しい心を持つ。', exampleKr: '따뜻한 마음을 가진다.' },
  { id: 'v3-namida', word: '涙', reading: 'なみだ', romaji: 'namida', meaning: '눈물', pos: '명사', level: 'N3', category: '감정', example: '涙が出ました。', exampleKr: '눈물이 났습니다.' },
  { id: 'v3-warai', word: '笑い', reading: 'わらい', romaji: 'warai', meaning: '웃음', pos: '명사', level: 'N3', category: '감정', example: '笑いが止まらない。', exampleKr: '웃음이 멈추지 않는다.' },
  { id: 'v3-kotoba', word: '言葉', reading: 'ことば', romaji: 'kotoba', meaning: '말, 언어', pos: '명사', level: 'N3', category: '학습', example: '優しい言葉が大切。', exampleKr: '다정한 말이 중요하다.' },

  // N3 동사 추가
  { id: 'v3-kanjiru', word: '感じる', reading: 'かんじる', romaji: 'kanjiru', meaning: '느끼다', pos: '동사(上一段)', level: 'N3', category: '동작', example: '寒さを感じます。', exampleKr: '추위를 느낍니다.' },
  { id: 'v3-shinjiru', word: '信じる', reading: 'しんじる', romaji: 'shinjiru', meaning: '믿다', pos: '동사(上一段)', level: 'N3', category: '동작', example: 'あなたを信じます。', exampleKr: '당신을 믿습니다.' },
  { id: 'v3-utagau', word: '疑う', reading: 'うたがう', romaji: 'utagau', meaning: '의심하다', pos: '동사(五段)', level: 'N3', category: '동작', example: '彼を疑ってはいけない。', exampleKr: '그를 의심해서는 안 된다.' },
  { id: 'v3-kimeru', word: '決める', reading: 'きめる', romaji: 'kimeru', meaning: '정하다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '行く日を決めました。', exampleKr: '갈 날을 정했습니다.' },
  { id: 'v3-erabu', word: '選ぶ', reading: 'えらぶ', romaji: 'erabu', meaning: '고르다', pos: '동사(五段)', level: 'N3', category: '동작', example: 'いいものを選ぶ。', exampleKr: '좋은 것을 고른다.' },
  { id: 'v3-tsutaeru-2', word: '伝える', reading: 'つたえる', romaji: 'tsutaeru', meaning: '전하다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '彼に気持ちを伝えた。', exampleKr: '그에게 마음을 전했다.' },
  { id: 'v3-ataeru', word: '与える', reading: 'あたえる', romaji: 'ataeru', meaning: '주다, 부여하다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '影響を与える。', exampleKr: '영향을 미친다.' },
  { id: 'v3-uketoru', word: '受け取る', reading: 'うけとる', romaji: 'uketoru', meaning: '받다', pos: '동사(五段)', level: 'N3', category: '동작', example: '荷物を受け取りました。', exampleKr: '짐을 받았습니다.' },
  { id: 'v3-koeru', word: '越える', reading: 'こえる', romaji: 'koeru', meaning: '넘다', pos: '동사(下一段)', level: 'N3', category: '동작', example: '困難を越える。', exampleKr: '어려움을 넘는다.' },
  { id: 'v3-todoku', word: '届く', reading: 'とどく', romaji: 'todoku', meaning: '닿다, 도달하다', pos: '동사(五段)', level: 'N3', category: '동작', example: '荷物が届きました。', exampleKr: '짐이 도착했습니다.' },
]

const allVocab: VocabItem[] = [...n5, ...n4, ...n3]

export function getAllVocab(): VocabItem[] {
  return allVocab
}

export function getVocabByLevel(level: JlptLevel): VocabItem[] {
  return allVocab.filter(v => v.level === level)
}

export function getVocabByCategory(category: string): VocabItem[] {
  return allVocab.filter(v => v.category === category)
}

export function getVocabCategories(level?: JlptLevel): string[] {
  const pool = level ? allVocab.filter(v => v.level === level) : allVocab
  return Array.from(new Set(pool.map(v => v.category)))
}

export function getLevels(): JlptLevel[] {
  return ['N5', 'N4', 'N3']
}

export function getLevelStats() {
  return getLevels().map(level => ({
    level,
    count: getVocabByLevel(level).length,
  }))
}

export function vocabDeckId(level?: JlptLevel): string {
  return level ? `vocab-${level.toLowerCase()}` : 'vocab-all'
}
