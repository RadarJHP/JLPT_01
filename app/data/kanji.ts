/**
 * JLPT Kanji dataset.
 *
 * For each kanji we record on'yomi (음독, hiragana), kun'yomi (훈독), Korean meanings,
 * stroke count, and 2 example words. The SRS engine keys on `id`.
 */

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export interface KanjiItem {
  id: string
  kanji: string
  meaning: string         // Korean meaning(s)
  meaningEn?: string
  onyomi: string[]        // hiragana/katakana readings
  kunyomi: string[]
  strokes: number
  level: JlptLevel
  category: string        // 그룹 (숫자/사람/자연/시간/동작/장소…)
  examples: { word: string; reading: string; meaning: string }[]
  mnemonic?: string
}

const n5: KanjiItem[] = [
  // 숫자
  { id: 'k-1', kanji: '一', meaning: '하나, 일', onyomi: ['イチ', 'イツ'], kunyomi: ['ひと'], strokes: 1, level: 'N5', category: '숫자',
    examples: [{ word: '一つ', reading: 'ひとつ', meaning: '하나' }, { word: '一月', reading: 'いちがつ', meaning: '1월' }],
    mnemonic: '가로 한 획 = 하나' },
  { id: 'k-2', kanji: '二', meaning: '둘, 이', onyomi: ['ニ'], kunyomi: ['ふた'], strokes: 2, level: 'N5', category: '숫자',
    examples: [{ word: '二人', reading: 'ふたり', meaning: '두 사람' }, { word: '二月', reading: 'にがつ', meaning: '2월' }] },
  { id: 'k-3', kanji: '三', meaning: '셋, 삼', onyomi: ['サン'], kunyomi: ['みっ'], strokes: 3, level: 'N5', category: '숫자',
    examples: [{ word: '三つ', reading: 'みっつ', meaning: '셋' }, { word: '三月', reading: 'さんがつ', meaning: '3월' }] },
  { id: 'k-4', kanji: '四', meaning: '넷, 사', onyomi: ['シ'], kunyomi: ['よっ', 'よん'], strokes: 5, level: 'N5', category: '숫자',
    examples: [{ word: '四つ', reading: 'よっつ', meaning: '넷' }, { word: '四月', reading: 'しがつ', meaning: '4월' }] },
  { id: 'k-5', kanji: '五', meaning: '다섯, 오', onyomi: ['ゴ'], kunyomi: ['いつ'], strokes: 4, level: 'N5', category: '숫자',
    examples: [{ word: '五つ', reading: 'いつつ', meaning: '다섯' }, { word: '五月', reading: 'ごがつ', meaning: '5월' }] },
  { id: 'k-6', kanji: '六', meaning: '여섯, 육', onyomi: ['ロク'], kunyomi: ['むっ'], strokes: 4, level: 'N5', category: '숫자',
    examples: [{ word: '六つ', reading: 'むっつ', meaning: '여섯' }, { word: '六月', reading: 'ろくがつ', meaning: '6월' }] },
  { id: 'k-7', kanji: '七', meaning: '일곱, 칠', onyomi: ['シチ'], kunyomi: ['なな', 'なの'], strokes: 2, level: 'N5', category: '숫자',
    examples: [{ word: '七つ', reading: 'ななつ', meaning: '일곱' }, { word: '七月', reading: 'しちがつ', meaning: '7월' }] },
  { id: 'k-8', kanji: '八', meaning: '여덟, 팔', onyomi: ['ハチ'], kunyomi: ['やっ'], strokes: 2, level: 'N5', category: '숫자',
    examples: [{ word: '八つ', reading: 'やっつ', meaning: '여덟' }, { word: '八月', reading: 'はちがつ', meaning: '8월' }] },
  { id: 'k-9', kanji: '九', meaning: '아홉, 구', onyomi: ['キュウ', 'ク'], kunyomi: ['ここの'], strokes: 2, level: 'N5', category: '숫자',
    examples: [{ word: '九つ', reading: 'ここのつ', meaning: '아홉' }, { word: '九月', reading: 'くがつ', meaning: '9월' }] },
  { id: 'k-10', kanji: '十', meaning: '열, 십', onyomi: ['ジュウ'], kunyomi: ['とお'], strokes: 2, level: 'N5', category: '숫자',
    examples: [{ word: '十', reading: 'じゅう', meaning: '10' }, { word: '十月', reading: 'じゅうがつ', meaning: '10월' }] },
  { id: 'k-100', kanji: '百', meaning: '백, 100', onyomi: ['ヒャク'], kunyomi: [], strokes: 6, level: 'N5', category: '숫자',
    examples: [{ word: '百円', reading: 'ひゃくえん', meaning: '100엔' }, { word: '百人', reading: 'ひゃくにん', meaning: '100명' }] },
  { id: 'k-1000', kanji: '千', meaning: '천, 1000', onyomi: ['セン'], kunyomi: ['ち'], strokes: 3, level: 'N5', category: '숫자',
    examples: [{ word: '千円', reading: 'せんえん', meaning: '1000엔' }, { word: '三千', reading: 'さんぜん', meaning: '3000' }] },
  { id: 'k-10000', kanji: '万', meaning: '만, 10000', onyomi: ['マン', 'バン'], kunyomi: [], strokes: 3, level: 'N5', category: '숫자',
    examples: [{ word: '一万', reading: 'いちまん', meaning: '1만' }, { word: '万人', reading: 'まんにん', meaning: '만 명' }] },

  // 사람·가족
  { id: 'k-jin', kanji: '人', meaning: '사람', onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'], strokes: 2, level: 'N5', category: '사람',
    examples: [{ word: '日本人', reading: 'にほんじん', meaning: '일본인' }, { word: '一人', reading: 'ひとり', meaning: '한 사람' }],
    mnemonic: '두 다리로 선 사람의 모습' },
  { id: 'k-otoko', kanji: '男', meaning: '남자', onyomi: ['ダン', 'ナン'], kunyomi: ['おとこ'], strokes: 7, level: 'N5', category: '사람',
    examples: [{ word: '男の人', reading: 'おとこのひと', meaning: '남자' }, { word: '男子', reading: 'だんし', meaning: '남자' }] },
  { id: 'k-onna', kanji: '女', meaning: '여자', onyomi: ['ジョ', 'ニョ'], kunyomi: ['おんな'], strokes: 3, level: 'N5', category: '사람',
    examples: [{ word: '女の人', reading: 'おんなのひと', meaning: '여자' }, { word: '女子', reading: 'じょし', meaning: '여자' }] },
  { id: 'k-ko', kanji: '子', meaning: '아이', onyomi: ['シ', 'ス'], kunyomi: ['こ'], strokes: 3, level: 'N5', category: '사람',
    examples: [{ word: '子供', reading: 'こども', meaning: '아이' }, { word: '女の子', reading: 'おんなのこ', meaning: '여자아이' }] },
  { id: 'k-chichi', kanji: '父', meaning: '아버지', onyomi: ['フ'], kunyomi: ['ちち'], strokes: 4, level: 'N5', category: '사람',
    examples: [{ word: 'お父さん', reading: 'おとうさん', meaning: '아버지' }, { word: '父母', reading: 'ふぼ', meaning: '부모' }] },
  { id: 'k-haha', kanji: '母', meaning: '어머니', onyomi: ['ボ'], kunyomi: ['はは'], strokes: 5, level: 'N5', category: '사람',
    examples: [{ word: 'お母さん', reading: 'おかあさん', meaning: '어머니' }, { word: '母国', reading: 'ぼこく', meaning: '모국' }] },
  { id: 'k-tomo', kanji: '友', meaning: '벗, 친구', onyomi: ['ユウ'], kunyomi: ['とも'], strokes: 4, level: 'N5', category: '사람',
    examples: [{ word: '友達', reading: 'ともだち', meaning: '친구' }, { word: '友人', reading: 'ゆうじん', meaning: '친구' }] },
  { id: 'k-sen', kanji: '先', meaning: '먼저, 앞', onyomi: ['セン'], kunyomi: ['さき'], strokes: 6, level: 'N5', category: '사람',
    examples: [{ word: '先生', reading: 'せんせい', meaning: '선생님' }, { word: '先月', reading: 'せんげつ', meaning: '지난달' }] },
  { id: 'k-sei', kanji: '生', meaning: '살다, 나다', onyomi: ['セイ', 'ショウ'], kunyomi: ['い', 'う', 'は'], strokes: 5, level: 'N5', category: '사람',
    examples: [{ word: '学生', reading: 'がくせい', meaning: '학생' }, { word: '生まれる', reading: 'うまれる', meaning: '태어나다' }] },
  { id: 'k-gaku', kanji: '学', meaning: '배우다', onyomi: ['ガク'], kunyomi: ['まな'], strokes: 8, level: 'N5', category: '사람',
    examples: [{ word: '学校', reading: 'がっこう', meaning: '학교' }, { word: '大学', reading: 'だいがく', meaning: '대학' }] },
  { id: 'k-kou', kanji: '校', meaning: '학교', onyomi: ['コウ'], kunyomi: [], strokes: 10, level: 'N5', category: '장소',
    examples: [{ word: '学校', reading: 'がっこう', meaning: '학교' }, { word: '高校', reading: 'こうこう', meaning: '고등학교' }] },

  // 자연
  { id: 'k-hi', kanji: '日', meaning: '날, 해', onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'か'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '日本', reading: 'にほん', meaning: '일본' }, { word: '今日', reading: 'きょう', meaning: '오늘' }] },
  { id: 'k-tsuki', kanji: '月', meaning: '달, 월', onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '月曜日', reading: 'げつようび', meaning: '월요일' }, { word: '一月', reading: 'いちがつ', meaning: '1월' }] },
  { id: 'k-ka', kanji: '火', meaning: '불', onyomi: ['カ'], kunyomi: ['ひ'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '火曜日', reading: 'かようび', meaning: '화요일' }, { word: '花火', reading: 'はなび', meaning: '불꽃놀이' }] },
  { id: 'k-mizu', kanji: '水', meaning: '물', onyomi: ['スイ'], kunyomi: ['みず'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '水曜日', reading: 'すいようび', meaning: '수요일' }, { word: 'お水', reading: 'おみず', meaning: '물' }] },
  { id: 'k-ki', kanji: '木', meaning: '나무', onyomi: ['ボク', 'モク'], kunyomi: ['き'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '木曜日', reading: 'もくようび', meaning: '목요일' }, { word: '木', reading: 'き', meaning: '나무' }] },
  { id: 'k-kane', kanji: '金', meaning: '쇠, 돈', onyomi: ['キン', 'コン'], kunyomi: ['かね'], strokes: 8, level: 'N5', category: '자연',
    examples: [{ word: '金曜日', reading: 'きんようび', meaning: '금요일' }, { word: 'お金', reading: 'おかね', meaning: '돈' }] },
  { id: 'k-do', kanji: '土', meaning: '흙, 땅', onyomi: ['ド', 'ト'], kunyomi: ['つち'], strokes: 3, level: 'N5', category: '자연',
    examples: [{ word: '土曜日', reading: 'どようび', meaning: '토요일' }, { word: '土地', reading: 'とち', meaning: '토지' }] },
  { id: 'k-yama', kanji: '山', meaning: '산', onyomi: ['サン'], kunyomi: ['やま'], strokes: 3, level: 'N5', category: '자연',
    examples: [{ word: '富士山', reading: 'ふじさん', meaning: '후지산' }, { word: '山', reading: 'やま', meaning: '산' }] },
  { id: 'k-kawa', kanji: '川', meaning: '강', onyomi: ['セン'], kunyomi: ['かわ'], strokes: 3, level: 'N5', category: '자연',
    examples: [{ word: '川', reading: 'かわ', meaning: '강' }, { word: '小川', reading: 'おがわ', meaning: '시내' }] },
  { id: 'k-ten', kanji: '天', meaning: '하늘', onyomi: ['テン'], kunyomi: ['あま'], strokes: 4, level: 'N5', category: '자연',
    examples: [{ word: '天気', reading: 'てんき', meaning: '날씨' }, { word: '天才', reading: 'てんさい', meaning: '천재' }] },
  { id: 'k-ame', kanji: '雨', meaning: '비', onyomi: ['ウ'], kunyomi: ['あめ'], strokes: 8, level: 'N5', category: '자연',
    examples: [{ word: '雨', reading: 'あめ', meaning: '비' }, { word: '大雨', reading: 'おおあめ', meaning: '폭우' }] },
  { id: 'k-hana', kanji: '花', meaning: '꽃', onyomi: ['カ'], kunyomi: ['はな'], strokes: 7, level: 'N5', category: '자연',
    examples: [{ word: '花', reading: 'はな', meaning: '꽃' }, { word: '花見', reading: 'はなみ', meaning: '꽃구경' }] },
  { id: 'k-sora', kanji: '空', meaning: '하늘, 비다', onyomi: ['クウ'], kunyomi: ['そら', 'あ'], strokes: 8, level: 'N5', category: '자연',
    examples: [{ word: '空', reading: 'そら', meaning: '하늘' }, { word: '空気', reading: 'くうき', meaning: '공기' }] },

  // 시간
  { id: 'k-ima', kanji: '今', meaning: '지금', onyomi: ['コン', 'キン'], kunyomi: ['いま'], strokes: 4, level: 'N5', category: '시간',
    examples: [{ word: '今日', reading: 'きょう', meaning: '오늘' }, { word: '今年', reading: 'ことし', meaning: '올해' }] },
  { id: 'k-ji', kanji: '時', meaning: '때, 시간', onyomi: ['ジ'], kunyomi: ['とき'], strokes: 10, level: 'N5', category: '시간',
    examples: [{ word: '時間', reading: 'じかん', meaning: '시간' }, { word: '何時', reading: 'なんじ', meaning: '몇 시' }] },
  { id: 'k-fun', kanji: '分', meaning: '분, 나누다', onyomi: ['フン', 'ブン', 'プン'], kunyomi: ['わ'], strokes: 4, level: 'N5', category: '시간',
    examples: [{ word: '十分', reading: 'じゅっぷん', meaning: '10분' }, { word: '分かる', reading: 'わかる', meaning: '알다' }] },
  { id: 'k-han', kanji: '半', meaning: '반', onyomi: ['ハン'], kunyomi: ['なか'], strokes: 5, level: 'N5', category: '시간',
    examples: [{ word: '半分', reading: 'はんぶん', meaning: '절반' }, { word: '半年', reading: 'はんとし', meaning: '반년' }] },
  { id: 'k-nen', kanji: '年', meaning: '해, 년', onyomi: ['ネン'], kunyomi: ['とし'], strokes: 6, level: 'N5', category: '시간',
    examples: [{ word: '今年', reading: 'ことし', meaning: '올해' }, { word: '一年', reading: 'いちねん', meaning: '1년' }] },
  { id: 'k-mae', kanji: '前', meaning: '앞, 전', onyomi: ['ゼン'], kunyomi: ['まえ'], strokes: 9, level: 'N5', category: '시간',
    examples: [{ word: '名前', reading: 'なまえ', meaning: '이름' }, { word: '午前', reading: 'ごぜん', meaning: '오전' }] },
  { id: 'k-go', kanji: '後', meaning: '뒤, 후', onyomi: ['ゴ', 'コウ'], kunyomi: ['あと', 'うし'], strokes: 9, level: 'N5', category: '시간',
    examples: [{ word: '午後', reading: 'ごご', meaning: '오후' }, { word: '後ろ', reading: 'うしろ', meaning: '뒤' }] },
  { id: 'k-mai', kanji: '毎', meaning: '매, 마다', onyomi: ['マイ'], kunyomi: [], strokes: 6, level: 'N5', category: '시간',
    examples: [{ word: '毎日', reading: 'まいにち', meaning: '매일' }, { word: '毎週', reading: 'まいしゅう', meaning: '매주' }] },
  { id: 'k-shu', kanji: '週', meaning: '주', onyomi: ['シュウ'], kunyomi: [], strokes: 11, level: 'N5', category: '시간',
    examples: [{ word: '今週', reading: 'こんしゅう', meaning: '이번 주' }, { word: '来週', reading: 'らいしゅう', meaning: '다음 주' }] },
  { id: 'k-asa', kanji: '朝', meaning: '아침', onyomi: ['チョウ'], kunyomi: ['あさ'], strokes: 12, level: 'N5', category: '시간',
    examples: [{ word: '朝', reading: 'あさ', meaning: '아침' }, { word: '今朝', reading: 'けさ', meaning: '오늘 아침' }] },
  { id: 'k-hiru', kanji: '昼', meaning: '낮, 점심', onyomi: ['チュウ'], kunyomi: ['ひる'], strokes: 9, level: 'N5', category: '시간',
    examples: [{ word: '昼ご飯', reading: 'ひるごはん', meaning: '점심밥' }, { word: '昼間', reading: 'ひるま', meaning: '낮' }] },
  { id: 'k-yoru', kanji: '夜', meaning: '밤', onyomi: ['ヤ'], kunyomi: ['よる', 'よ'], strokes: 8, level: 'N5', category: '시간',
    examples: [{ word: '夜', reading: 'よる', meaning: '밤' }, { word: '今夜', reading: 'こんや', meaning: '오늘 밤' }] },

  // 동작
  { id: 'k-i', kanji: '行', meaning: '가다', onyomi: ['コウ', 'ギョウ'], kunyomi: ['い', 'おこな'], strokes: 6, level: 'N5', category: '동작',
    examples: [{ word: '行く', reading: 'いく', meaning: '가다' }, { word: '銀行', reading: 'ぎんこう', meaning: '은행' }] },
  { id: 'k-rai', kanji: '来', meaning: '오다', onyomi: ['ライ'], kunyomi: ['く', 'き'], strokes: 7, level: 'N5', category: '동작',
    examples: [{ word: '来る', reading: 'くる', meaning: '오다' }, { word: '来週', reading: 'らいしゅう', meaning: '다음 주' }] },
  { id: 'k-ki2', kanji: '帰', meaning: '돌아가다', onyomi: ['キ'], kunyomi: ['かえ'], strokes: 10, level: 'N5', category: '동작',
    examples: [{ word: '帰る', reading: 'かえる', meaning: '돌아가다' }, { word: '帰国', reading: 'きこく', meaning: '귀국' }] },
  { id: 'k-mi', kanji: '見', meaning: '보다', onyomi: ['ケン'], kunyomi: ['み'], strokes: 7, level: 'N5', category: '동작',
    examples: [{ word: '見る', reading: 'みる', meaning: '보다' }, { word: '花見', reading: 'はなみ', meaning: '꽃구경' }] },
  { id: 'k-kiku', kanji: '聞', meaning: '듣다', onyomi: ['ブン', 'モン'], kunyomi: ['き'], strokes: 14, level: 'N5', category: '동작',
    examples: [{ word: '聞く', reading: 'きく', meaning: '듣다' }, { word: '新聞', reading: 'しんぶん', meaning: '신문' }] },
  { id: 'k-yomu', kanji: '読', meaning: '읽다', onyomi: ['ドク'], kunyomi: ['よ'], strokes: 14, level: 'N5', category: '동작',
    examples: [{ word: '読む', reading: 'よむ', meaning: '읽다' }, { word: '読書', reading: 'どくしょ', meaning: '독서' }] },
  { id: 'k-kaku', kanji: '書', meaning: '쓰다', onyomi: ['ショ'], kunyomi: ['か'], strokes: 10, level: 'N5', category: '동작',
    examples: [{ word: '書く', reading: 'かく', meaning: '쓰다' }, { word: '辞書', reading: 'じしょ', meaning: '사전' }] },
  { id: 'k-hanasu', kanji: '話', meaning: '이야기', onyomi: ['ワ'], kunyomi: ['はな'], strokes: 13, level: 'N5', category: '동작',
    examples: [{ word: '話す', reading: 'はなす', meaning: '이야기하다' }, { word: '電話', reading: 'でんわ', meaning: '전화' }] },
  { id: 'k-au', kanji: '会', meaning: '만나다, 모임', onyomi: ['カイ'], kunyomi: ['あ'], strokes: 6, level: 'N5', category: '동작',
    examples: [{ word: '会う', reading: 'あう', meaning: '만나다' }, { word: '会社', reading: 'かいしゃ', meaning: '회사' }] },
  { id: 'k-kau', kanji: '買', meaning: '사다', onyomi: ['バイ'], kunyomi: ['か'], strokes: 12, level: 'N5', category: '동작',
    examples: [{ word: '買う', reading: 'かう', meaning: '사다' }, { word: '買い物', reading: 'かいもの', meaning: '쇼핑' }] },
  { id: 'k-tatsu', kanji: '立', meaning: '서다', onyomi: ['リツ'], kunyomi: ['た'], strokes: 5, level: 'N5', category: '동작',
    examples: [{ word: '立つ', reading: 'たつ', meaning: '서다' }, { word: '国立', reading: 'こくりつ', meaning: '국립' }] },
  { id: 'k-su', kanji: '住', meaning: '살다, 거주', onyomi: ['ジュウ'], kunyomi: ['す'], strokes: 7, level: 'N5', category: '동작',
    examples: [{ word: '住む', reading: 'すむ', meaning: '살다' }, { word: '住所', reading: 'じゅうしょ', meaning: '주소' }] },
  { id: 'k-shoku', kanji: '食', meaning: '먹다, 음식', onyomi: ['ショク'], kunyomi: ['た', 'く'], strokes: 9, level: 'N5', category: '동작',
    examples: [{ word: '食べる', reading: 'たべる', meaning: '먹다' }, { word: '食事', reading: 'しょくじ', meaning: '식사' }] },
  { id: 'k-noh', kanji: '飲', meaning: '마시다', onyomi: ['イン'], kunyomi: ['の'], strokes: 12, level: 'N5', category: '동작',
    examples: [{ word: '飲む', reading: 'のむ', meaning: '마시다' }, { word: '飲み物', reading: 'のみもの', meaning: '음료' }] },

  // 형용사·상태
  { id: 'k-oo', kanji: '大', meaning: '크다', onyomi: ['ダイ', 'タイ'], kunyomi: ['おお'], strokes: 3, level: 'N5', category: '상태',
    examples: [{ word: '大きい', reading: 'おおきい', meaning: '크다' }, { word: '大学', reading: 'だいがく', meaning: '대학' }] },
  { id: 'k-shou', kanji: '小', meaning: '작다', onyomi: ['ショウ'], kunyomi: ['ちい', 'こ'], strokes: 3, level: 'N5', category: '상태',
    examples: [{ word: '小さい', reading: 'ちいさい', meaning: '작다' }, { word: '小学校', reading: 'しょうがっこう', meaning: '초등학교' }] },
  { id: 'k-naka', kanji: '中', meaning: '가운데, 안', onyomi: ['チュウ'], kunyomi: ['なか'], strokes: 4, level: 'N5', category: '상태',
    examples: [{ word: '中', reading: 'なか', meaning: '안' }, { word: '中学校', reading: 'ちゅうがっこう', meaning: '중학교' }] },
  { id: 'k-takai', kanji: '高', meaning: '높다, 비싸다', onyomi: ['コウ'], kunyomi: ['たか'], strokes: 10, level: 'N5', category: '상태',
    examples: [{ word: '高い', reading: 'たかい', meaning: '높다' }, { word: '高校', reading: 'こうこう', meaning: '고등학교' }] },
  { id: 'k-yasui', kanji: '安', meaning: '편안, 싸다', onyomi: ['アン'], kunyomi: ['やす'], strokes: 6, level: 'N5', category: '상태',
    examples: [{ word: '安い', reading: 'やすい', meaning: '싸다' }, { word: '安心', reading: 'あんしん', meaning: '안심' }] },
  { id: 'k-shin', kanji: '新', meaning: '새롭다', onyomi: ['シン'], kunyomi: ['あたら', 'あら'], strokes: 13, level: 'N5', category: '상태',
    examples: [{ word: '新しい', reading: 'あたらしい', meaning: '새롭다' }, { word: '新聞', reading: 'しんぶん', meaning: '신문' }] },
  { id: 'k-furui', kanji: '古', meaning: '낡다', onyomi: ['コ'], kunyomi: ['ふる'], strokes: 5, level: 'N5', category: '상태',
    examples: [{ word: '古い', reading: 'ふるい', meaning: '낡다' }, { word: '中古', reading: 'ちゅうこ', meaning: '중고' }] },
  { id: 'k-naga', kanji: '長', meaning: '길다, 장', onyomi: ['チョウ'], kunyomi: ['なが'], strokes: 8, level: 'N5', category: '상태',
    examples: [{ word: '長い', reading: 'ながい', meaning: '길다' }, { word: '社長', reading: 'しゃちょう', meaning: '사장' }] },
  { id: 'k-shiro', kanji: '白', meaning: '하얗다', onyomi: ['ハク', 'ビャク'], kunyomi: ['しろ'], strokes: 5, level: 'N5', category: '상태',
    examples: [{ word: '白い', reading: 'しろい', meaning: '하얗다' }, { word: '面白い', reading: 'おもしろい', meaning: '재미있다' }] },

  // 장소·방향
  { id: 'k-kuni', kanji: '国', meaning: '나라', onyomi: ['コク'], kunyomi: ['くに'], strokes: 8, level: 'N5', category: '장소',
    examples: [{ word: '日本国', reading: 'にほんこく', meaning: '일본국' }, { word: '外国', reading: 'がいこく', meaning: '외국' }] },
  { id: 'k-hon', kanji: '本', meaning: '책, 근본', onyomi: ['ホン'], kunyomi: ['もと'], strokes: 5, level: 'N5', category: '장소',
    examples: [{ word: '本', reading: 'ほん', meaning: '책' }, { word: '日本', reading: 'にほん', meaning: '일본' }] },
  { id: 'k-uchi', kanji: '家', meaning: '집', onyomi: ['カ', 'ケ'], kunyomi: ['いえ', 'うち'], strokes: 10, level: 'N5', category: '장소',
    examples: [{ word: '家', reading: 'いえ', meaning: '집' }, { word: '家族', reading: 'かぞく', meaning: '가족' }] },
  { id: 'k-michi', kanji: '道', meaning: '길', onyomi: ['ドウ'], kunyomi: ['みち'], strokes: 12, level: 'N5', category: '장소',
    examples: [{ word: '道', reading: 'みち', meaning: '길' }, { word: '北海道', reading: 'ほっかいどう', meaning: '홋카이도' }] },
  { id: 'k-eki', kanji: '駅', meaning: '역', onyomi: ['エキ'], kunyomi: [], strokes: 14, level: 'N5', category: '장소',
    examples: [{ word: '駅', reading: 'えき', meaning: '역' }, { word: '東京駅', reading: 'とうきょうえき', meaning: '도쿄역' }] },
  { id: 'k-mise', kanji: '店', meaning: '가게', onyomi: ['テン'], kunyomi: ['みせ'], strokes: 8, level: 'N5', category: '장소',
    examples: [{ word: '店', reading: 'みせ', meaning: '가게' }, { word: '本店', reading: 'ほんてん', meaning: '본점' }] },
  { id: 'k-kuruma', kanji: '車', meaning: '차', onyomi: ['シャ'], kunyomi: ['くるま'], strokes: 7, level: 'N5', category: '사물',
    examples: [{ word: '車', reading: 'くるま', meaning: '차' }, { word: '電車', reading: 'でんしゃ', meaning: '전철' }] },
  { id: 'k-den', kanji: '電', meaning: '전기', onyomi: ['デン'], kunyomi: [], strokes: 13, level: 'N5', category: '사물',
    examples: [{ word: '電気', reading: 'でんき', meaning: '전기' }, { word: '電話', reading: 'でんわ', meaning: '전화' }] },
  { id: 'k-kawa-river', kanji: '気', meaning: '기운, 마음', onyomi: ['キ', 'ケ'], kunyomi: [], strokes: 6, level: 'N5', category: '상태',
    examples: [{ word: '元気', reading: 'げんき', meaning: '건강' }, { word: '天気', reading: 'てんき', meaning: '날씨' }] },

  // 방향
  { id: 'k-ue', kanji: '上', meaning: '위', onyomi: ['ジョウ'], kunyomi: ['うえ', 'あ', 'のぼ'], strokes: 3, level: 'N5', category: '방향',
    examples: [{ word: '上', reading: 'うえ', meaning: '위' }, { word: '上手', reading: 'じょうず', meaning: '잘함' }] },
  { id: 'k-shita', kanji: '下', meaning: '아래', onyomi: ['カ', 'ゲ'], kunyomi: ['した', 'さ', 'くだ'], strokes: 3, level: 'N5', category: '방향',
    examples: [{ word: '下', reading: 'した', meaning: '아래' }, { word: '下手', reading: 'へた', meaning: '서툼' }] },
  { id: 'k-hidari', kanji: '左', meaning: '왼쪽', onyomi: ['サ'], kunyomi: ['ひだり'], strokes: 5, level: 'N5', category: '방향',
    examples: [{ word: '左', reading: 'ひだり', meaning: '왼쪽' }, { word: '左手', reading: 'ひだりて', meaning: '왼손' }] },
  { id: 'k-migi', kanji: '右', meaning: '오른쪽', onyomi: ['ウ', 'ユウ'], kunyomi: ['みぎ'], strokes: 5, level: 'N5', category: '방향',
    examples: [{ word: '右', reading: 'みぎ', meaning: '오른쪽' }, { word: '右手', reading: 'みぎて', meaning: '오른손' }] },
  { id: 'k-higashi', kanji: '東', meaning: '동쪽', onyomi: ['トウ'], kunyomi: ['ひがし'], strokes: 8, level: 'N5', category: '방향',
    examples: [{ word: '東京', reading: 'とうきょう', meaning: '도쿄' }, { word: '東', reading: 'ひがし', meaning: '동쪽' }] },
  { id: 'k-nishi', kanji: '西', meaning: '서쪽', onyomi: ['セイ', 'サイ'], kunyomi: ['にし'], strokes: 6, level: 'N5', category: '방향',
    examples: [{ word: '西', reading: 'にし', meaning: '서쪽' }, { word: '関西', reading: 'かんさい', meaning: '간사이' }] },
  { id: 'k-kita', kanji: '北', meaning: '북쪽', onyomi: ['ホク'], kunyomi: ['きた'], strokes: 5, level: 'N5', category: '방향',
    examples: [{ word: '北', reading: 'きた', meaning: '북쪽' }, { word: '北海道', reading: 'ほっかいどう', meaning: '홋카이도' }] },
  { id: 'k-minami', kanji: '南', meaning: '남쪽', onyomi: ['ナン'], kunyomi: ['みなみ'], strokes: 9, level: 'N5', category: '방향',
    examples: [{ word: '南', reading: 'みなみ', meaning: '남쪽' }, { word: '南口', reading: 'みなみぐち', meaning: '남쪽 출구' }] },
  { id: 'k-soto', kanji: '外', meaning: '바깥', onyomi: ['ガイ', 'ゲ'], kunyomi: ['そと', 'はず'], strokes: 5, level: 'N5', category: '방향',
    examples: [{ word: '外', reading: 'そと', meaning: '바깥' }, { word: '外国', reading: 'がいこく', meaning: '외국' }] },
  { id: 'k-iri', kanji: '入', meaning: '들어가다', onyomi: ['ニュウ'], kunyomi: ['い', 'はい'], strokes: 2, level: 'N5', category: '동작',
    examples: [{ word: '入る', reading: 'はいる', meaning: '들어가다' }, { word: '入口', reading: 'いりぐち', meaning: '입구' }] },
  { id: 'k-de', kanji: '出', meaning: '나가다', onyomi: ['シュツ'], kunyomi: ['で', 'だ'], strokes: 5, level: 'N5', category: '동작',
    examples: [{ word: '出る', reading: 'でる', meaning: '나가다' }, { word: '出口', reading: 'でぐち', meaning: '출구' }] },

  // 신체
  { id: 'k-me', kanji: '目', meaning: '눈', onyomi: ['モク', 'ボク'], kunyomi: ['め'], strokes: 5, level: 'N5', category: '신체',
    examples: [{ word: '目', reading: 'め', meaning: '눈' }, { word: '一回目', reading: 'いっかいめ', meaning: '첫 번째' }] },
  { id: 'k-mimi', kanji: '耳', meaning: '귀', onyomi: ['ジ'], kunyomi: ['みみ'], strokes: 6, level: 'N5', category: '신체',
    examples: [{ word: '耳', reading: 'みみ', meaning: '귀' }] },
  { id: 'k-kuchi', kanji: '口', meaning: '입', onyomi: ['コウ'], kunyomi: ['くち'], strokes: 3, level: 'N5', category: '신체',
    examples: [{ word: '口', reading: 'くち', meaning: '입' }, { word: '人口', reading: 'じんこう', meaning: '인구' }] },
  { id: 'k-te', kanji: '手', meaning: '손', onyomi: ['シュ'], kunyomi: ['て'], strokes: 4, level: 'N5', category: '신체',
    examples: [{ word: '手', reading: 'て', meaning: '손' }, { word: '上手', reading: 'じょうず', meaning: '잘함' }] },
  { id: 'k-ashi', kanji: '足', meaning: '발', onyomi: ['ソク'], kunyomi: ['あし', 'た'], strokes: 7, level: 'N5', category: '신체',
    examples: [{ word: '足', reading: 'あし', meaning: '발' }, { word: '足りる', reading: 'たりる', meaning: '충분하다' }] },

  // 기타
  { id: 'k-nani', kanji: '何', meaning: '무엇', onyomi: ['カ'], kunyomi: ['なに', 'なん'], strokes: 7, level: 'N5', category: '기타',
    examples: [{ word: '何', reading: 'なに', meaning: '무엇' }, { word: '何時', reading: 'なんじ', meaning: '몇 시' }] },
  { id: 'k-na', kanji: '名', meaning: '이름', onyomi: ['メイ', 'ミョウ'], kunyomi: ['な'], strokes: 6, level: 'N5', category: '기타',
    examples: [{ word: '名前', reading: 'なまえ', meaning: '이름' }, { word: '有名', reading: 'ゆうめい', meaning: '유명' }] },
  { id: 'k-go-lang', kanji: '語', meaning: '말, 언어', onyomi: ['ゴ'], kunyomi: ['かた'], strokes: 14, level: 'N5', category: '기타',
    examples: [{ word: '日本語', reading: 'にほんご', meaning: '일본어' }, { word: '英語', reading: 'えいご', meaning: '영어' }] },
  { id: 'k-shi', kanji: '私', meaning: '나, 사', onyomi: ['シ'], kunyomi: ['わたし', 'わたくし'], strokes: 7, level: 'N5', category: '사람',
    examples: [{ word: '私', reading: 'わたし', meaning: '저' }] },
]

const allKanji: KanjiItem[] = [...n5]

export function getAllKanji(): KanjiItem[] { return allKanji }
export function getKanjiByLevel(level: JlptLevel): KanjiItem[] { return allKanji.filter(k => k.level === level) }
export function getKanjiCategories(level?: JlptLevel): string[] {
  const pool = level ? allKanji.filter(k => k.level === level) : allKanji
  return Array.from(new Set(pool.map(k => k.category)))
}
export function getKanjiByCategory(level: JlptLevel, category: string): KanjiItem[] {
  return allKanji.filter(k => k.level === level && k.category === category)
}
