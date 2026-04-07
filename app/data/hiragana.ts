export interface KanaChar {
  kana: string
  romaji: string
  korean: string        // 한국어 발음
  mnemonic: string      // 연상 설명
  mnemonicImage: string  // SVG 연상 키워드
  row: string           // 행 이름
  order: number
}

export interface KanaRow {
  name: string
  nameJp: string
  chars: KanaChar[]
}

const hiraganaData: KanaChar[] = [
  // あ행
  { kana: 'あ', romaji: 'a', korean: '아', mnemonic: '"아!" 하고 놀라는 사람이 두 팔을 벌린 모양. 가운데 선이 몸통, 양쪽이 팔.', mnemonicImage: 'surprised-person', row: 'あ행', order: 0 },
  { kana: 'い', romaji: 'i', korean: '이', mnemonic: '두 사람이 나란히 서 있는 모습. "이" 사람, "이" 사람!', mnemonicImage: 'two-people', row: 'あ행', order: 1 },
  { kana: 'う', romaji: 'u', korean: '우', mnemonic: '"우" 하고 입을 내민 얼굴 옆모습. 위에 점이 눈, 아래가 내민 입.', mnemonicImage: 'pouting-face', row: 'あ행', order: 2 },
  { kana: 'え', romaji: 'e', korean: '에', mnemonic: '에버레스트 산봉우리처럼 뾰족한 모양. "에"베레스트!', mnemonicImage: 'mountain', row: 'あ행', order: 3 },
  { kana: 'お', romaji: 'o', korean: '오', mnemonic: '골프 선수가 스윙하는 모습. "오!" 멋진 샷!', mnemonicImage: 'golf-swing', row: 'あ행', order: 4 },

  // か행
  { kana: 'か', romaji: 'ka', korean: '카', mnemonic: '칼(刀)을 들고 서 있는 사무라이. "카"타나(刀)를 든 모습.', mnemonicImage: 'katana', row: 'か행', order: 5 },
  { kana: 'き', romaji: 'ki', korean: '키', mnemonic: '열쇠(key) 모양. 위 두 획이 열쇠 손잡이, 아래가 열쇠 몸통.', mnemonicImage: 'key', row: 'か행', order: 6 },
  { kana: 'く', romaji: 'ku', korean: '쿠', mnemonic: '새의 부리 모양. 뻐"꾸"기가 입을 벌린 모습.', mnemonicImage: 'bird-beak', row: 'か행', order: 7 },
  { kana: 'け', romaji: 'ke', korean: '케', mnemonic: '케이크를 자르는 칼. 세로선이 칼, 옆이 잘린 케이크 단면.', mnemonicImage: 'cake-cut', row: 'か행', order: 8 },
  { kana: 'こ', romaji: 'ko', korean: '코', mnemonic: '옆에서 본 코 두 개. 위아래 두 획이 콧구멍.', mnemonicImage: 'nose', row: 'か행', order: 9 },

  // さ행
  { kana: 'さ', romaji: 'sa', korean: '사', mnemonic: '사무라이가 칼을 꽂은 모습. 가로 획이 칼, 나머지가 사람.', mnemonicImage: 'samurai', row: 'さ행', order: 10 },
  { kana: 'し', romaji: 'shi', korean: '시', mnemonic: '낚시 바늘(hook) 모양. "시"원하게 낚시하자!', mnemonicImage: 'fish-hook', row: 'さ행', order: 11 },
  { kana: 'す', romaji: 'su', korean: '스', mnemonic: '스키 타는 사람. 세로선이 스키 폴, 아래 곡선이 스키 자세.', mnemonicImage: 'skiing', row: 'さ행', order: 12 },
  { kana: 'せ', romaji: 'se', korean: '세', mnemonic: '세일러(선원)가 노를 젓는 모습. 가로 획이 노.', mnemonicImage: 'sailor', row: 'さ행', order: 13 },
  { kana: 'そ', romaji: 'so', korean: '소', mnemonic: '소프트 아이스크림이 구불구불 올라간 모양.', mnemonicImage: 'soft-ice', row: 'さ행', order: 14 },

  // た행
  { kana: 'た', romaji: 'ta', korean: '타', mnemonic: '타이타닉 배의 돛대. "た"는 십자가 돛대에 깃발.', mnemonicImage: 'mast', row: 'た행', order: 15 },
  { kana: 'ち', romaji: 'chi', korean: '치', mnemonic: '숫자 5를 닮은 모양. 치킨 5조각!', mnemonicImage: 'five-chicken', row: 'た행', order: 16 },
  { kana: 'つ', romaji: 'tsu', korean: '츠', mnemonic: '쓰나미 파도가 밀려오는 모양. 큰 파도 하나!', mnemonicImage: 'tsunami', row: 'た행', order: 17 },
  { kana: 'て', romaji: 'te', korean: '테', mnemonic: '테이블 위에 손을 올린 모양. 가로가 테이블, 아래가 손.', mnemonicImage: 'hand-table', row: 'た행', order: 18 },
  { kana: 'と', romaji: 'to', korean: '토', mnemonic: '토네이도(회오리)가 도는 모습. 세로선에서 바람이 휘감김.', mnemonicImage: 'tornado', row: 'た행', order: 19 },

  // な행
  { kana: 'な', romaji: 'na', korean: '나', mnemonic: '나무에 매듭(knot)이 있는 모습. "나"무의 옹이.', mnemonicImage: 'knot', row: 'な행', order: 20 },
  { kana: 'に', romaji: 'ni', korean: '니', mnemonic: '니(무릎)를 꿇은 사람. 왼쪽이 몸, 오른쪽 두 획이 무릎.', mnemonicImage: 'kneeling', row: 'な행', order: 21 },
  { kana: 'ぬ', romaji: 'nu', korean: '누', mnemonic: '누들(국수)이 꼬인 모양. 면이 빙글빙글!', mnemonicImage: 'noodle', row: 'な행', order: 22 },
  { kana: 'ね', romaji: 'ne', korean: '네', mnemonic: '고양이(ねこ)가 웅크린 모양. "네"코는 고양이!', mnemonicImage: 'cat-curled', row: 'な행', order: 23 },
  { kana: 'の', romaji: 'no', korean: '노', mnemonic: 'NO! 금지 표시처럼 동그라미 안에 선. 영어 No와 발음 같음!', mnemonicImage: 'no-sign', row: 'な행', order: 24 },

  // は행
  { kana: 'は', romaji: 'ha', korean: '하', mnemonic: '"하하" 웃는 사람. 왼쪽이 몸, 오른쪽이 배를 잡고 웃는 모습.', mnemonicImage: 'laughing', row: 'は행', order: 25 },
  { kana: 'ひ', romaji: 'hi', korean: '히', mnemonic: '"히히" 웃는 입 모양. 입꼬리가 올라간 미소.', mnemonicImage: 'smile', row: 'は행', order: 26 },
  { kana: 'ふ', romaji: 'fu', korean: '후', mnemonic: '후지산(富士山) 꼭대기. 점이 정상, 아래가 산 능선.', mnemonicImage: 'fuji', row: 'は행', order: 27 },
  { kana: 'へ', romaji: 'he', korean: '헤', mnemonic: '산 봉우리 하나. へ 자체가 작은 산 모양!', mnemonicImage: 'hill', row: 'は행', order: 28 },
  { kana: 'ほ', romaji: 'ho', korean: '호', mnemonic: '호텔 건물. 왼쪽이 기둥, 오른쪽이 창문 달린 건물.', mnemonicImage: 'hotel', row: 'は행', order: 29 },

  // ま행
  { kana: 'ま', romaji: 'ma', korean: '마', mnemonic: '마(馬)가 달리는 모습. 가로획이 등, 아래가 다리.', mnemonicImage: 'horse', row: 'ま행', order: 30 },
  { kana: 'み', romaji: 'mi', korean: '미', mnemonic: '숫자 21을 닮은 모양. 미(美)인의 나이 21세!', mnemonicImage: 'twenty-one', row: 'ま행', order: 31 },
  { kana: 'む', romaji: 'mu', korean: '무', mnemonic: '무(소)가 울타리 앞에 서 있는 모습. "무~" 하고 울음.', mnemonicImage: 'cow', row: 'ま행', order: 32 },
  { kana: 'め', romaji: 'me', korean: '메', mnemonic: '눈(目)의 변형. 눈동자가 빙글 도는 "메"롱 표정.', mnemonicImage: 'eye', row: 'ま행', order: 33 },
  { kana: 'も', romaji: 'mo', korean: '모', mnemonic: '낚싯줄에 걸린 물고기. "모"리(미끼)에 걸렸다!', mnemonicImage: 'fish-hook-catch', row: 'ま행', order: 34 },

  // や행
  { kana: 'や', romaji: 'ya', korean: '야', mnemonic: '"야!" 하고 소리지르는 사람이 손을 흔드는 모양.', mnemonicImage: 'waving', row: 'や행', order: 35 },
  { kana: 'ゆ', romaji: 'yu', korean: '유', mnemonic: '유턴하는 길. 구불구불 돌아가는 도로.', mnemonicImage: 'u-turn', row: 'や행', order: 36 },
  { kana: 'よ', romaji: 'yo', korean: '요', mnemonic: '요요를 돌리는 모습. 세로선이 줄, 아래 곡선이 요요.', mnemonicImage: 'yoyo', row: 'や행', order: 37 },

  // ら행
  { kana: 'ら', romaji: 'ra', korean: '라', mnemonic: '라면 면발이 늘어지는 모습. 젓가락에서 면이 주르륵.', mnemonicImage: 'ramen', row: 'ら행', order: 38 },
  { kana: 'り', romaji: 'ri', korean: '리', mnemonic: '리본 두 줄이 나란히. 선물의 리본 장식.', mnemonicImage: 'ribbon', row: 'ら행', order: 39 },
  { kana: 'る', romaji: 'ru', korean: '루', mnemonic: '루프(loop) 모양. 아래쪽이 빙글 돌아가는 고리.', mnemonicImage: 'loop', row: 'ら행', order: 40 },
  { kana: 'れ', romaji: 're', korean: '레', mnemonic: '레이스(경주) 출발선에 선 사람. 왼쪽이 선, 오른쪽이 달리는 자세.', mnemonicImage: 'runner', row: 'ら행', order: 41 },
  { kana: 'ろ', romaji: 'ro', korean: '로', mnemonic: '로(길)가 구부러진 모습. 숫자 3을 닮은 도로.', mnemonicImage: 'road', row: 'ら행', order: 42 },

  // わ행
  { kana: 'わ', romaji: 'wa', korean: '와', mnemonic: '"와!" 감탄하며 입을 벌린 모습. 곡선이 열린 입.', mnemonicImage: 'wow', row: 'わ행', order: 43 },
  { kana: 'を', romaji: 'wo', korean: '오', mnemonic: '워터 슬라이드를 타는 사람. 구불구불 미끄러지는 모양.', mnemonicImage: 'water-slide', row: 'わ행', order: 44 },
  { kana: 'ん', romaji: 'n', korean: '응', mnemonic: '영어 "n"을 흘려 쓴 모양. 응~ 하고 끄덕이기.', mnemonicImage: 'nodding', row: 'わ행', order: 45 },
]

// ===== 탁음 (Dakuten) — か→が, さ→ざ, た→だ, は→ば =====
const hiraganaDakuten: KanaChar[] = [
  { kana: 'が', romaji: 'ga', korean: '가', mnemonic: 'か(카) + ゛(탁점) = 가. 칼에 점이 추가되면 "가"!', mnemonicImage: 'katana', row: 'が행', order: 46 },
  { kana: 'ぎ', romaji: 'gi', korean: '기', mnemonic: 'き + ゛ = 기. 열쇠에 탁점!', mnemonicImage: 'key', row: 'が행', order: 47 },
  { kana: 'ぐ', romaji: 'gu', korean: '구', mnemonic: 'く + ゛ = 구. 부리에 탁점!', mnemonicImage: 'bird-beak', row: 'が행', order: 48 },
  { kana: 'げ', romaji: 'ge', korean: '게', mnemonic: 'け + ゛ = 게. 케이크에 탁점!', mnemonicImage: 'cake-cut', row: 'が행', order: 49 },
  { kana: 'ご', romaji: 'go', korean: '고', mnemonic: 'こ + ゛ = 고. 코에 탁점!', mnemonicImage: 'nose', row: 'が행', order: 50 },

  { kana: 'ざ', romaji: 'za', korean: '자', mnemonic: 'さ(사) + ゛ = 자. 사무라이에 탁점!', mnemonicImage: 'samurai', row: 'ざ행', order: 51 },
  { kana: 'じ', romaji: 'ji', korean: '지', mnemonic: 'し(시) + ゛ = 지. 낚시바늘에 탁점!', mnemonicImage: 'fish-hook', row: 'ざ행', order: 52 },
  { kana: 'ず', romaji: 'zu', korean: '즈', mnemonic: 'す(스) + ゛ = 즈. 스키에 탁점!', mnemonicImage: 'skiing', row: 'ざ행', order: 53 },
  { kana: 'ぜ', romaji: 'ze', korean: '제', mnemonic: 'せ(세) + ゛ = 제. 세일러에 탁점!', mnemonicImage: 'sailor', row: 'ざ행', order: 54 },
  { kana: 'ぞ', romaji: 'zo', korean: '조', mnemonic: 'そ(소) + ゛ = 조. 소프트아이스에 탁점!', mnemonicImage: 'soft-ice', row: 'ざ행', order: 55 },

  { kana: 'だ', romaji: 'da', korean: '다', mnemonic: 'た(타) + ゛ = 다. 돛대에 탁점!', mnemonicImage: 'mast', row: 'だ행', order: 56 },
  { kana: 'ぢ', romaji: 'ji', korean: '지(드물게)', mnemonic: 'ち + ゛ = 지. じ와 발음 같음. 거의 안 쓰임.', mnemonicImage: 'five-chicken', row: 'だ행', order: 57 },
  { kana: 'づ', romaji: 'zu', korean: '즈(드물게)', mnemonic: 'つ + ゛ = 즈. ず와 발음 같음. 거의 안 쓰임.', mnemonicImage: 'tsunami', row: 'だ행', order: 58 },
  { kana: 'で', romaji: 'de', korean: '데', mnemonic: 'て(테) + ゛ = 데. 테이블에 탁점!', mnemonicImage: 'hand-table', row: 'だ행', order: 59 },
  { kana: 'ど', romaji: 'do', korean: '도', mnemonic: 'と(토) + ゛ = 도. 토네이도에 탁점!', mnemonicImage: 'tornado', row: 'だ행', order: 60 },

  { kana: 'ば', romaji: 'ba', korean: '바', mnemonic: 'は(하) + ゛ = 바. 웃는 사람에 탁점!', mnemonicImage: 'laughing', row: 'ば행', order: 61 },
  { kana: 'び', romaji: 'bi', korean: '비', mnemonic: 'ひ(히) + ゛ = 비. 미소에 탁점!', mnemonicImage: 'smile', row: 'ば행', order: 62 },
  { kana: 'ぶ', romaji: 'bu', korean: '부', mnemonic: 'ふ(후) + ゛ = 부. 후지산에 탁점!', mnemonicImage: 'fuji', row: 'ば행', order: 63 },
  { kana: 'べ', romaji: 'be', korean: '베', mnemonic: 'へ(헤) + ゛ = 베. 산에 탁점!', mnemonicImage: 'hill', row: 'ば행', order: 64 },
  { kana: 'ぼ', romaji: 'bo', korean: '보', mnemonic: 'ほ(호) + ゛ = 보. 호텔에 탁점!', mnemonicImage: 'hotel', row: 'ば행', order: 65 },
]

// ===== 반탁음 (Handakuten) — は→ぱ =====
const hiraganaHandakuten: KanaChar[] = [
  { kana: 'ぱ', romaji: 'pa', korean: '파', mnemonic: 'は(하) + ゜(반탁점) = 파. 동그라미가 붙으면 "파"!', mnemonicImage: 'laughing', row: 'ぱ행', order: 66 },
  { kana: 'ぴ', romaji: 'pi', korean: '피', mnemonic: 'ひ(히) + ゜ = 피. 미소에 동그라미!', mnemonicImage: 'smile', row: 'ぱ행', order: 67 },
  { kana: 'ぷ', romaji: 'pu', korean: '푸', mnemonic: 'ふ(후) + ゜ = 푸. 후지산에 동그라미!', mnemonicImage: 'fuji', row: 'ぱ행', order: 68 },
  { kana: 'ぺ', romaji: 'pe', korean: '페', mnemonic: 'へ(헤) + ゜ = 페. 산에 동그라미!', mnemonicImage: 'hill', row: 'ぱ행', order: 69 },
  { kana: 'ぽ', romaji: 'po', korean: '포', mnemonic: 'ほ(호) + ゜ = 포. 호텔에 동그라미!', mnemonicImage: 'hotel', row: 'ぱ행', order: 70 },
]

// ===== 요음 (Yōon) — き+ゃ → きゃ 등 =====
// 가장 자주 쓰이는 것들만 요음으로 묶음
const hiraganaYoon: KanaChar[] = [
  { kana: 'きゃ', romaji: 'kya', korean: '캬', mnemonic: 'き + 작은 ゃ = 캬. 자음 + ya 합성', mnemonicImage: 'key', row: 'きゃ행', order: 71 },
  { kana: 'きゅ', romaji: 'kyu', korean: '큐', mnemonic: 'き + 작은 ゅ = 큐.', mnemonicImage: 'key', row: 'きゃ행', order: 72 },
  { kana: 'きょ', romaji: 'kyo', korean: '쿄', mnemonic: 'き + 작은 ょ = 쿄. 도시 이름 京都(쿄토)!', mnemonicImage: 'key', row: 'きゃ행', order: 73 },
  { kana: 'しゃ', romaji: 'sha', korean: '샤', mnemonic: 'し + ゃ = 샤. 샤워의 "샤".', mnemonicImage: 'fish-hook', row: 'しゃ행', order: 74 },
  { kana: 'しゅ', romaji: 'shu', korean: '슈', mnemonic: 'し + ゅ = 슈.', mnemonicImage: 'fish-hook', row: 'しゃ행', order: 75 },
  { kana: 'しょ', romaji: 'sho', korean: '쇼', mnemonic: 'し + ょ = 쇼. 쇼핑의 "쇼"!', mnemonicImage: 'fish-hook', row: 'しゃ행', order: 76 },
  { kana: 'ちゃ', romaji: 'cha', korean: '챠', mnemonic: 'ち + ゃ = 챠. お茶(오챠 = 차)!', mnemonicImage: 'five-chicken', row: 'ちゃ행', order: 77 },
  { kana: 'ちゅ', romaji: 'chu', korean: '츄', mnemonic: 'ち + ゅ = 츄.', mnemonicImage: 'five-chicken', row: 'ちゃ행', order: 78 },
  { kana: 'ちょ', romaji: 'cho', korean: '쵸', mnemonic: 'ち + ょ = 쵸. 쵸코의 "쵸"!', mnemonicImage: 'five-chicken', row: 'ちゃ행', order: 79 },
  { kana: 'にゃ', romaji: 'nya', korean: '냐', mnemonic: 'に + ゃ = 냐. 고양이 울음 にゃ~!', mnemonicImage: 'kneeling', row: 'にゃ행', order: 80 },
  { kana: 'にゅ', romaji: 'nyu', korean: '뉴', mnemonic: 'に + ゅ = 뉴.', mnemonicImage: 'kneeling', row: 'にゃ행', order: 81 },
  { kana: 'にょ', romaji: 'nyo', korean: '뇨', mnemonic: 'に + ょ = 뇨.', mnemonicImage: 'kneeling', row: 'にゃ행', order: 82 },
  { kana: 'ひゃ', romaji: 'hya', korean: '햐', mnemonic: 'ひ + ゃ = 햐.', mnemonicImage: 'smile', row: 'ひゃ행', order: 83 },
  { kana: 'ひゅ', romaji: 'hyu', korean: '휴', mnemonic: 'ひ + ゅ = 휴.', mnemonicImage: 'smile', row: 'ひゃ행', order: 84 },
  { kana: 'ひょ', romaji: 'hyo', korean: '효', mnemonic: 'ひ + ょ = 효.', mnemonicImage: 'smile', row: 'ひゃ행', order: 85 },
  { kana: 'みゃ', romaji: 'mya', korean: '먀', mnemonic: 'み + ゃ = 먀.', mnemonicImage: 'twenty-one', row: 'みゃ행', order: 86 },
  { kana: 'みゅ', romaji: 'myu', korean: '뮤', mnemonic: 'み + ゅ = 뮤.', mnemonicImage: 'twenty-one', row: 'みゃ행', order: 87 },
  { kana: 'みょ', romaji: 'myo', korean: '묘', mnemonic: 'み + ょ = 묘.', mnemonicImage: 'twenty-one', row: 'みゃ행', order: 88 },
  { kana: 'りゃ', romaji: 'rya', korean: '랴', mnemonic: 'り + ゃ = 랴.', mnemonicImage: 'ribbon', row: 'りゃ행', order: 89 },
  { kana: 'りゅ', romaji: 'ryu', korean: '류', mnemonic: 'り + ゅ = 류.', mnemonicImage: 'ribbon', row: 'りゃ행', order: 90 },
  { kana: 'りょ', romaji: 'ryo', korean: '료', mnemonic: 'り + ょ = 료. 료칸(旅館)!', mnemonicImage: 'ribbon', row: 'りゃ행', order: 91 },
  // 탁음/반탁음 요음
  { kana: 'ぎゃ', romaji: 'gya', korean: '갸', mnemonic: 'ぎ + ゃ = 갸.', mnemonicImage: 'key', row: 'ぎゃ행', order: 92 },
  { kana: 'ぎゅ', romaji: 'gyu', korean: '규', mnemonic: 'ぎ + ゅ = 규.', mnemonicImage: 'key', row: 'ぎゃ행', order: 93 },
  { kana: 'ぎょ', romaji: 'gyo', korean: '교', mnemonic: 'ぎ + ょ = 교.', mnemonicImage: 'key', row: 'ぎゃ행', order: 94 },
  { kana: 'じゃ', romaji: 'ja', korean: '쟈', mnemonic: 'じ + ゃ = 쟈.', mnemonicImage: 'fish-hook', row: 'じゃ행', order: 95 },
  { kana: 'じゅ', romaji: 'ju', korean: '쥬', mnemonic: 'じ + ゅ = 쥬.', mnemonicImage: 'fish-hook', row: 'じゃ행', order: 96 },
  { kana: 'じょ', romaji: 'jo', korean: '죠', mnemonic: 'じ + ょ = 죠.', mnemonicImage: 'fish-hook', row: 'じゃ행', order: 97 },
  { kana: 'びゃ', romaji: 'bya', korean: '뱌', mnemonic: 'び + ゃ = 뱌.', mnemonicImage: 'smile', row: 'びゃ행', order: 98 },
  { kana: 'びゅ', romaji: 'byu', korean: '뷰', mnemonic: 'び + ゅ = 뷰.', mnemonicImage: 'smile', row: 'びゃ행', order: 99 },
  { kana: 'びょ', romaji: 'byo', korean: '뵤', mnemonic: 'び + ょ = 뵤.', mnemonicImage: 'smile', row: 'びゃ행', order: 100 },
  { kana: 'ぴゃ', romaji: 'pya', korean: '퍄', mnemonic: 'ぴ + ゃ = 퍄.', mnemonicImage: 'smile', row: 'ぴゃ행', order: 101 },
  { kana: 'ぴゅ', romaji: 'pyu', korean: '퓨', mnemonic: 'ぴ + ゅ = 퓨.', mnemonicImage: 'smile', row: 'ぴゃ행', order: 102 },
  { kana: 'ぴょ', romaji: 'pyo', korean: '표', mnemonic: 'ぴ + ょ = 표.', mnemonicImage: 'smile', row: 'ぴゃ행', order: 103 },
]

// === group helpers ===
const allHiraganaCombined = [...hiraganaData, ...hiraganaDakuten, ...hiraganaHandakuten, ...hiraganaYoon]

const hiraganaRowNames: Record<string, string> = {
  'あ행': 'あ행 (모음)',
  'か행': 'か행 (K)',
  'さ행': 'さ행 (S)',
  'た행': 'た행 (T)',
  'な행': 'な행 (N)',
  'は행': 'は행 (H)',
  'ま행': 'ま행 (M)',
  'や행': 'や행 (Y)',
  'ら행': 'ら행 (R)',
  'わ행': 'わ행 (W/N)',
  // 탁음
  'が행': 'が행 (G·탁음)',
  'ざ행': 'ざ행 (Z·탁음)',
  'だ행': 'だ행 (D·탁음)',
  'ば행': 'ば행 (B·탁음)',
  // 반탁음
  'ぱ행': 'ぱ행 (P·반탁음)',
  // 요음
  'きゃ행': 'きゃ행 (Ky)',
  'しゃ행': 'しゃ행 (Sh)',
  'ちゃ행': 'ちゃ행 (Ch)',
  'にゃ행': 'にゃ행 (Ny)',
  'ひゃ행': 'ひゃ행 (Hy)',
  'みゃ행': 'みゃ행 (My)',
  'りゃ행': 'りゃ행 (Ry)',
  'ぎゃ행': 'ぎゃ행 (Gy)',
  'じゃ행': 'じゃ행 (J)',
  'びゃ행': 'びゃ행 (By)',
  'ぴゃ행': 'ぴゃ행 (Py)',
}

function buildRows(pool: KanaChar[]): KanaRow[] {
  const rowMap = new Map<string, KanaChar[]>()
  for (const char of pool) {
    if (!rowMap.has(char.row)) rowMap.set(char.row, [])
    rowMap.get(char.row)!.push(char)
  }
  return Array.from(rowMap.entries()).map(([key, chars]) => ({
    name: hiraganaRowNames[key] || key,
    nameJp: key,
    chars: chars.sort((a, b) => a.order - b.order),
  }))
}

/** 청음만 (기본 46자) */
export function getHiraganaRows(): KanaRow[] {
  return buildRows(hiraganaData)
}

/** 탁음+반탁음 행들 */
export function getHiraganaDakutenRows(): KanaRow[] {
  return buildRows([...hiraganaDakuten, ...hiraganaHandakuten])
}

/** 요음 행들 */
export function getHiraganaYoonRows(): KanaRow[] {
  return buildRows(hiraganaYoon)
}

export function getAllHiraganaRows(): KanaRow[] {
  return buildRows(allHiraganaCombined)
}

/** 청음만 (기존 동작) */
export function getAllHiragana(): KanaChar[] {
  return [...hiraganaData].sort((a, b) => a.order - b.order)
}

/** 모든 히라가나 (청음 + 탁음 + 반탁음 + 요음) */
export function getAllHiraganaFull(): KanaChar[] {
  return [...allHiraganaCombined].sort((a, b) => a.order - b.order)
}
