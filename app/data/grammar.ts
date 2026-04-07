/**
 * JLPT Grammar dataset (N5 essentials).
 *
 * Each item ships with the pattern, Korean explanation, 2-3 example
 * sentences and a "fill the blank" practice item used by the quiz.
 */
export type JlptLevel = 'N5' | 'N4' | 'N3'

export interface GrammarExample {
  jp: string
  reading?: string
  kr: string
}

export interface GrammarPracticeOption {
  text: string
  isCorrect: boolean
}

export interface GrammarItem {
  id: string
  pattern: string         // e.g. "は", "～です", "～ています"
  title: string           // short Korean title
  level: JlptLevel
  category: string        // 조사 / 기본문형 / 동사활용 / な형용사 / い형용사 / 의문사 / 연결
  meaning: string         // Korean explanation
  formation?: string      // formation rule (Korean)
  examples: GrammarExample[]
  practice: {
    sentence: string      // sentence with ____ blank
    sentenceKr: string
    options: GrammarPracticeOption[]
    explanation?: string
  }
}

const grammar: GrammarItem[] = [
  // ========== 조사 (Particles) ==========
  {
    id: 'g-wa', pattern: 'は', title: '주제 조사 「は」', level: 'N5', category: '조사',
    meaning: '문장의 주제를 표시. "～은/는". 발음은 "wa" (ha 아님!).',
    formation: '명사 + は + (술어)',
    examples: [
      { jp: '私は学生です。', kr: '저는 학생입니다.' },
      { jp: 'これはペンです。', kr: '이것은 펜입니다.' },
      { jp: '今日は暑いです。', kr: '오늘은 덥습니다.' },
    ],
    practice: {
      sentence: '私___学生です。',
      sentenceKr: '저는 학생입니다.',
      options: [
        { text: 'は', isCorrect: true },
        { text: 'が', isCorrect: false },
        { text: 'を', isCorrect: false },
        { text: 'に', isCorrect: false },
      ],
      explanation: '"나는 ~이다"처럼 주제를 소개할 때 「は」를 씁니다.',
    },
  },
  {
    id: 'g-ga', pattern: 'が', title: '주격 조사 「が」', level: 'N5', category: '조사',
    meaning: '주어를 강조하거나, 새로운 정보의 주어. "이/가".',
    formation: '명사 + が',
    examples: [
      { jp: '誰がいますか。', kr: '누가 있습니까?' },
      { jp: '雨が降っています。', kr: '비가 내리고 있습니다.' },
      { jp: '猫が好きです。', kr: '고양이를 좋아합니다.' },
    ],
    practice: {
      sentence: '猫___好きです。',
      sentenceKr: '고양이를 좋아합니다.',
      options: [
        { text: 'が', isCorrect: true },
        { text: 'は', isCorrect: false },
        { text: 'を', isCorrect: false },
        { text: 'に', isCorrect: false },
      ],
      explanation: '"좋아하다(好き)"는 대상을 「が」로 표시합니다. (한국어 "을/를"과 다름!)',
    },
  },
  {
    id: 'g-wo', pattern: 'を', title: '목적격 조사 「を」', level: 'N5', category: '조사',
    meaning: '동작의 직접 목적어. "～을/를". 발음은 "o".',
    formation: '명사 + を + 타동사',
    examples: [
      { jp: 'パンを食べます。', kr: '빵을 먹습니다.' },
      { jp: '本を読みます。', kr: '책을 읽습니다.' },
      { jp: '映画を見ました。', kr: '영화를 봤습니다.' },
    ],
    practice: {
      sentence: 'コーヒー___飲みます。',
      sentenceKr: '커피를 마십니다.',
      options: [
        { text: 'を', isCorrect: true },
        { text: 'が', isCorrect: false },
        { text: 'は', isCorrect: false },
        { text: 'で', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-ni-place', pattern: 'に (장소·시간)', title: '존재·시간의 「に」', level: 'N5', category: '조사',
    meaning: '존재 장소("에 있다") 또는 시각/날짜("에"). 도착 지점.',
    formation: '장소·시간 + に + (います/あります/도착동사)',
    examples: [
      { jp: '部屋に猫がいます。', kr: '방에 고양이가 있습니다.' },
      { jp: '七時に起きます。', kr: '7시에 일어납니다.' },
      { jp: '東京に行きます。', kr: '도쿄에 갑니다.' },
    ],
    practice: {
      sentence: '机の上___本があります。',
      sentenceKr: '책상 위에 책이 있습니다.',
      options: [
        { text: 'に', isCorrect: true },
        { text: 'で', isCorrect: false },
        { text: 'を', isCorrect: false },
        { text: 'は', isCorrect: false },
      ],
      explanation: '존재("있다/없다")의 장소는 「に」로 표시.',
    },
  },
  {
    id: 'g-de', pattern: 'で', title: '수단·장소의 「で」', level: 'N5', category: '조사',
    meaning: '동작이 일어나는 장소 또는 수단/도구. "에서", "(으)로".',
    formation: '장소·도구 + で + 동작동사',
    examples: [
      { jp: '図書館で勉強します。', kr: '도서관에서 공부합니다.' },
      { jp: 'バスで行きます。', kr: '버스로 갑니다.' },
      { jp: '日本語で話してください。', kr: '일본어로 말해 주세요.' },
    ],
    practice: {
      sentence: 'カフェ___コーヒーを飲みます。',
      sentenceKr: '카페에서 커피를 마십니다.',
      options: [
        { text: 'で', isCorrect: true },
        { text: 'に', isCorrect: false },
        { text: 'を', isCorrect: false },
        { text: 'と', isCorrect: false },
      ],
      explanation: '동작이 벌어지는 장소는 「で」 (존재 장소 「に」와 구별!)',
    },
  },
  {
    id: 'g-he', pattern: 'へ', title: '방향의 「へ」', level: 'N5', category: '조사',
    meaning: '이동의 방향. "～으로". 발음은 "e".',
    formation: '장소 + へ + 이동동사',
    examples: [
      { jp: '学校へ行きます。', kr: '학교로 갑니다.' },
      { jp: '日本へ来ました。', kr: '일본으로 왔습니다.' },
    ],
    practice: {
      sentence: '家___帰ります。',
      sentenceKr: '집으로 돌아갑니다.',
      options: [
        { text: 'へ', isCorrect: true },
        { text: 'を', isCorrect: false },
        { text: 'が', isCorrect: false },
        { text: 'は', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-to', pattern: 'と', title: '나열·동반의 「と」', level: 'N5', category: '조사',
    meaning: '"～와/과". 명사 나열, 또는 함께하는 사람.',
    formation: '명사1 + と + 명사2 / 사람 + と',
    examples: [
      { jp: 'パンと牛乳を買いました。', kr: '빵과 우유를 샀습니다.' },
      { jp: '友達と映画を見ました。', kr: '친구와 영화를 봤습니다.' },
    ],
    practice: {
      sentence: '兄___姉がいます。',
      sentenceKr: '형과 누나가 있습니다.',
      options: [
        { text: 'と', isCorrect: true },
        { text: 'や', isCorrect: false },
        { text: 'は', isCorrect: false },
        { text: 'も', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-mo', pattern: 'も', title: '"～도" 「も」', level: 'N5', category: '조사',
    meaning: '"～도/역시". は/が/を를 대신해 사용.',
    examples: [
      { jp: '私も学生です。', kr: '저도 학생입니다.' },
      { jp: 'これもください。', kr: '이것도 주세요.' },
    ],
    practice: {
      sentence: '私___日本語を勉強しています。',
      sentenceKr: '저도 일본어를 공부하고 있습니다.',
      options: [
        { text: 'も', isCorrect: true },
        { text: 'は', isCorrect: false },
        { text: 'が', isCorrect: false },
        { text: 'を', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-no', pattern: 'の', title: '소유·수식 「の」', level: 'N5', category: '조사',
    meaning: '명사 사이에 들어가 소유/소속/속성 표시. "～의".',
    formation: '명사1 + の + 명사2',
    examples: [
      { jp: '私の本', kr: '나의 책' },
      { jp: '日本の文化', kr: '일본의 문화' },
      { jp: '会社の人', kr: '회사 사람' },
    ],
    practice: {
      sentence: '田中さん___傘です。',
      sentenceKr: '다나카씨의 우산입니다.',
      options: [
        { text: 'の', isCorrect: true },
        { text: 'は', isCorrect: false },
        { text: 'と', isCorrect: false },
        { text: 'が', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-ka', pattern: 'か', title: '의문조사 「か」', level: 'N5', category: '조사',
    meaning: '문장 끝에 붙어 의문문을 만든다.',
    formation: '문장 + か',
    examples: [
      { jp: '学生ですか。', kr: '학생입니까?' },
      { jp: 'これは何ですか。', kr: '이것은 무엇입니까?' },
    ],
    practice: {
      sentence: 'お元気です___。',
      sentenceKr: '잘 지내십니까?',
      options: [
        { text: 'か', isCorrect: true },
        { text: 'よ', isCorrect: false },
        { text: 'ね', isCorrect: false },
        { text: 'の', isCorrect: false },
      ],
    },
  },

  // ========== 기본 문형 ==========
  {
    id: 'g-desu', pattern: '～です', title: '명사 단정 「～です」', level: 'N5', category: '기본문형',
    meaning: '"~입니다". 정중한 단정. 부정은 「～じゃないです」/「～ではありません」.',
    formation: '명사 + です',
    examples: [
      { jp: '学生です。', kr: '학생입니다.' },
      { jp: '日本人です。', kr: '일본인입니다.' },
      { jp: '田中じゃないです。', kr: '다나카가 아닙니다.' },
    ],
    practice: {
      sentence: '私は会社員___。',
      sentenceKr: '저는 회사원입니다.',
      options: [
        { text: 'です', isCorrect: true },
        { text: 'ます', isCorrect: false },
        { text: 'ました', isCorrect: false },
        { text: 'ません', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-masu', pattern: '～ます', title: '동사 정중형 「～ます」', level: 'N5', category: '동사활용',
    meaning: '"~합니다". 동사의 정중한 현재/미래형.',
    formation: '동사 ます형 + ます',
    examples: [
      { jp: '本を読みます。', kr: '책을 읽습니다.' },
      { jp: '明日行きます。', kr: '내일 갑니다.' },
    ],
    practice: {
      sentence: '毎日コーヒーを飲___。',
      sentenceKr: '매일 커피를 마십니다.',
      options: [
        { text: 'みます', isCorrect: true },
        { text: 'みません', isCorrect: false },
        { text: 'みました', isCorrect: false },
        { text: 'みて', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-masen', pattern: '～ません', title: '동사 부정 「～ません」', level: 'N5', category: '동사활용',
    meaning: '"~하지 않습니다". 정중 부정.',
    formation: 'ます형 + ません',
    examples: [
      { jp: '肉を食べません。', kr: '고기를 먹지 않습니다.' },
      { jp: '今日は行きません。', kr: '오늘은 가지 않습니다.' },
    ],
    practice: {
      sentence: 'お酒は飲___。',
      sentenceKr: '술은 마시지 않습니다.',
      options: [
        { text: 'みません', isCorrect: true },
        { text: 'みます', isCorrect: false },
        { text: 'みました', isCorrect: false },
        { text: 'んで', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-mashita', pattern: '～ました', title: '과거 정중 「～ました」', level: 'N5', category: '동사활용',
    meaning: '"~했습니다". 정중한 과거형.',
    formation: 'ます형 + ました',
    examples: [
      { jp: '昨日映画を見ました。', kr: '어제 영화를 봤습니다.' },
      { jp: '友達に会いました。', kr: '친구를 만났습니다.' },
    ],
    practice: {
      sentence: '昨日寿司を食べ___。',
      sentenceKr: '어제 초밥을 먹었습니다.',
      options: [
        { text: 'ました', isCorrect: true },
        { text: 'ます', isCorrect: false },
        { text: 'ません', isCorrect: false },
        { text: 'ましょう', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-mashou', pattern: '～ましょう', title: '권유 「～ましょう」', level: 'N5', category: '동사활용',
    meaning: '"~합시다". 함께 하자는 권유.',
    formation: 'ます형 + ましょう',
    examples: [
      { jp: '一緒に行きましょう。', kr: '함께 갑시다.' },
      { jp: 'お茶を飲みましょう。', kr: '차를 마십시다.' },
    ],
    practice: {
      sentence: '休み___。',
      sentenceKr: '쉽시다.',
      options: [
        { text: 'ましょう', isCorrect: true },
        { text: 'ました', isCorrect: false },
        { text: 'ません', isCorrect: false },
        { text: 'ます', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-te', pattern: '～て (て형)', title: '연결형 「～て」', level: 'N5', category: '동사활용',
    meaning: '동사를 연결하거나 진행/요청 등 다양한 표현의 기초.',
    formation: '동사 て형 — 5단/1단/불규칙별 규칙 있음',
    examples: [
      { jp: '朝起きて、ご飯を食べます。', kr: '아침에 일어나서 밥을 먹습니다.' },
      { jp: '見てください。', kr: '봐 주세요.' },
    ],
    practice: {
      sentence: '本を読___ください。',
      sentenceKr: '책을 읽어 주세요.',
      options: [
        { text: 'んで', isCorrect: true },
        { text: 'みて', isCorrect: false },
        { text: 'みます', isCorrect: false },
        { text: 'みました', isCorrect: false },
      ],
      explanation: '読む(よむ)의 て형은 「読んで」.',
    },
  },
  {
    id: 'g-teiru', pattern: '～ています', title: '진행/상태 「～ています」', level: 'N5', category: '동사활용',
    meaning: '"~하고 있습니다" (진행) 또는 "~한 상태입니다" (결과).',
    formation: '동사 て형 + います',
    examples: [
      { jp: '今、勉強しています。', kr: '지금 공부하고 있습니다.' },
      { jp: '東京に住んでいます。', kr: '도쿄에 살고 있습니다.' },
    ],
    practice: {
      sentence: '雨が降___。',
      sentenceKr: '비가 내리고 있습니다.',
      options: [
        { text: 'っています', isCorrect: true },
        { text: 'ります', isCorrect: false },
        { text: 'りました', isCorrect: false },
        { text: 'りません', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-tekudasai', pattern: '～てください', title: '정중한 부탁 「～てください」', level: 'N5', category: '동사활용',
    meaning: '"~해 주세요". 정중한 요청.',
    formation: '동사 て형 + ください',
    examples: [
      { jp: 'ちょっと待ってください。', kr: '잠깐 기다려 주세요.' },
      { jp: 'もう一度言ってください。', kr: '한 번 더 말해 주세요.' },
    ],
    practice: {
      sentence: '名前を書___ください。',
      sentenceKr: '이름을 써 주세요.',
      options: [
        { text: 'いて', isCorrect: true },
        { text: 'きます', isCorrect: false },
        { text: 'いた', isCorrect: false },
        { text: 'く', isCorrect: false },
      ],
    },
  },

  // ========== 형용사 ==========
  {
    id: 'g-i-adj', pattern: 'い형용사', title: 'い형용사 활용', level: 'N5', category: '형용사',
    meaning: '"い"로 끝나는 형용사. 부정은 「～くない」, 과거는 「～かった」.',
    formation: '어간 + い (현재) / くない (부정) / かった (과거)',
    examples: [
      { jp: '寒いです。', kr: '춥습니다.' },
      { jp: '寒くないです。', kr: '춥지 않습니다.' },
      { jp: '昨日は寒かったです。', kr: '어제는 추웠습니다.' },
    ],
    practice: {
      sentence: 'このラーメンはおいし___です。',
      sentenceKr: '이 라면은 맛있지 않습니다.',
      options: [
        { text: 'くない', isCorrect: true },
        { text: 'じゃない', isCorrect: false },
        { text: 'ない', isCorrect: false },
        { text: 'くて', isCorrect: false },
      ],
      explanation: 'おいしい → おいしくない (い형용사 부정)',
    },
  },
  {
    id: 'g-na-adj', pattern: 'な형용사', title: 'な형용사 활용', level: 'N5', category: '형용사',
    meaning: '명사처럼 활용. 명사 수식 시 「な」 필요. 부정 「～じゃない」.',
    formation: '어간 + だ/です / 어간 + な + 명사',
    examples: [
      { jp: '静かな部屋', kr: '조용한 방' },
      { jp: 'きれいです。', kr: '예쁩니다.' },
      { jp: '便利じゃないです。', kr: '편리하지 않습니다.' },
    ],
    practice: {
      sentence: '静か___部屋がいいです。',
      sentenceKr: '조용한 방이 좋습니다.',
      options: [
        { text: 'な', isCorrect: true },
        { text: 'い', isCorrect: false },
        { text: 'の', isCorrect: false },
        { text: 'で', isCorrect: false },
      ],
      explanation: 'な형용사 + 명사 수식 시 「な」 필요.',
    },
  },

  // ========== 의문사 ==========
  {
    id: 'g-nani', pattern: '何 (なに/なん)', title: '"무엇" 「何」', level: 'N5', category: '의문사',
    meaning: '"무엇". 뒤에 오는 음에 따라 なに/なん으로 읽음.',
    examples: [
      { jp: 'これは何ですか。', kr: '이것은 무엇입니까?' },
      { jp: '何時ですか。', kr: '몇 시입니까?' },
    ],
    practice: {
      sentence: 'お名前は___ですか。',
      sentenceKr: '성함이 무엇입니까?',
      options: [
        { text: '何', isCorrect: true },
        { text: 'いつ', isCorrect: false },
        { text: 'どこ', isCorrect: false },
        { text: 'だれ', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-doko', pattern: 'どこ', title: '"어디" 「どこ」', level: 'N5', category: '의문사',
    meaning: '장소를 묻는다. "어디".',
    examples: [
      { jp: 'トイレはどこですか。', kr: '화장실은 어디입니까?' },
      { jp: 'どこに住んでいますか。', kr: '어디에 살고 있습니까?' },
    ],
    practice: {
      sentence: '駅は___ですか。',
      sentenceKr: '역은 어디입니까?',
      options: [
        { text: 'どこ', isCorrect: true },
        { text: 'いつ', isCorrect: false },
        { text: 'なに', isCorrect: false },
        { text: 'だれ', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-itsu', pattern: 'いつ', title: '"언제" 「いつ」', level: 'N5', category: '의문사',
    meaning: '시점을 묻는다.',
    examples: [
      { jp: 'いつ来ますか。', kr: '언제 옵니까?' },
      { jp: '誕生日はいつですか。', kr: '생일이 언제입니까?' },
    ],
    practice: {
      sentence: '___日本に来ましたか。',
      sentenceKr: '언제 일본에 왔습니까?',
      options: [
        { text: 'いつ', isCorrect: true },
        { text: 'どこ', isCorrect: false },
        { text: 'なに', isCorrect: false },
        { text: 'だれ', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-dare', pattern: 'だれ / どなた', title: '"누구" 「だれ」', level: 'N5', category: '의문사',
    meaning: '"누구". 정중하게는 「どなた」.',
    examples: [
      { jp: 'あの人は誰ですか。', kr: '저 사람은 누구입니까?' },
      { jp: 'どなたですか。', kr: '어느 분이십니까?' },
    ],
    practice: {
      sentence: 'これは___の本ですか。',
      sentenceKr: '이것은 누구의 책입니까?',
      options: [
        { text: 'だれ', isCorrect: true },
        { text: 'どこ', isCorrect: false },
        { text: 'いつ', isCorrect: false },
        { text: 'なに', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-ikura', pattern: 'いくら', title: '"얼마" 「いくら」', level: 'N5', category: '의문사',
    meaning: '가격을 묻는다.',
    examples: [
      { jp: 'これはいくらですか。', kr: '이것은 얼마입니까?' },
    ],
    practice: {
      sentence: 'このかばんは___ですか。',
      sentenceKr: '이 가방은 얼마입니까?',
      options: [
        { text: 'いくら', isCorrect: true },
        { text: 'いつ', isCorrect: false },
        { text: 'どこ', isCorrect: false },
        { text: 'なに', isCorrect: false },
      ],
    },
  },

  // ========== 표현 ==========
  {
    id: 'g-tai', pattern: '～たい', title: '희망 「～たい」', level: 'N5', category: '표현',
    meaning: '"~하고 싶다". 본인의 희망.',
    formation: '동사 ます형 + たい',
    examples: [
      { jp: '寿司が食べたいです。', kr: '초밥이 먹고 싶습니다.' },
      { jp: '日本へ行きたいです。', kr: '일본에 가고 싶습니다.' },
    ],
    practice: {
      sentence: '映画が見___です。',
      sentenceKr: '영화가 보고 싶습니다.',
      options: [
        { text: 'たい', isCorrect: true },
        { text: 'ます', isCorrect: false },
        { text: 'ません', isCorrect: false },
        { text: 'ました', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-suki', pattern: '～が好き', title: '"~을 좋아한다" 「～が好き」', level: 'N5', category: '표현',
    meaning: '대상은 「を」가 아닌 「が」!',
    formation: '대상 + が + 好き/嫌い/上手/下手',
    examples: [
      { jp: '猫が好きです。', kr: '고양이를 좋아합니다.' },
      { jp: '料理が上手です。', kr: '요리를 잘합니다.' },
    ],
    practice: {
      sentence: '日本料理___好きです。',
      sentenceKr: '일본 요리를 좋아합니다.',
      options: [
        { text: 'が', isCorrect: true },
        { text: 'を', isCorrect: false },
        { text: 'は', isCorrect: false },
        { text: 'に', isCorrect: false },
      ],
      explanation: '"좋아하다"의 대상은 「が」!',
    },
  },
  {
    id: 'g-kara', pattern: '～から', title: '이유 「～から」', level: 'N5', category: '연결',
    meaning: '"~ 이기 때문에". 이유.',
    formation: '문장 + から',
    examples: [
      { jp: '寒いから、コートを着ます。', kr: '추우니까 코트를 입습니다.' },
      { jp: '時間がないから、急ぎましょう。', kr: '시간이 없으니까 서두릅시다.' },
    ],
    practice: {
      sentence: '雨だ___、行きません。',
      sentenceKr: '비가 오기 때문에 가지 않습니다.',
      options: [
        { text: 'から', isCorrect: true },
        { text: 'まで', isCorrect: false },
        { text: 'けど', isCorrect: false },
        { text: 'ので', isCorrect: false },
      ],
    },
  },
  {
    id: 'g-ga-but', pattern: '～が (역접)', title: '역접 「～が」', level: 'N5', category: '연결',
    meaning: '"~지만". 두 문장을 역접으로 연결.',
    formation: '문장1 + が、문장2',
    examples: [
      { jp: '高いですが、おいしいです。', kr: '비싸지만 맛있습니다.' },
      { jp: '日本語は難しいですが、楽しいです。', kr: '일본어는 어렵지만 즐겁습니다.' },
    ],
    practice: {
      sentence: '安いです___、おいしくないです。',
      sentenceKr: '싸지만 맛이 없습니다.',
      options: [
        { text: 'が', isCorrect: true },
        { text: 'と', isCorrect: false },
        { text: 'から', isCorrect: false },
        { text: 'で', isCorrect: false },
      ],
    },
  },
]

export function getAllGrammar(): GrammarItem[] { return grammar }
export function getGrammarByLevel(level: JlptLevel): GrammarItem[] {
  return grammar.filter(g => g.level === level)
}
export function getGrammarCategories(level: JlptLevel): string[] {
  const pool = grammar.filter(g => g.level === level)
  return Array.from(new Set(pool.map(g => g.category)))
}
export function getGrammarByCategory(level: JlptLevel, category: string): GrammarItem[] {
  return grammar.filter(g => g.level === level && g.category === category)
}
