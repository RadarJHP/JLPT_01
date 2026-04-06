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

export function getHiraganaRows(): KanaRow[] {
  const rowMap = new Map<string, KanaChar[]>()
  for (const char of hiraganaData) {
    if (!rowMap.has(char.row)) rowMap.set(char.row, [])
    rowMap.get(char.row)!.push(char)
  }

  const rowNames: Record<string, string> = {
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
  }

  return Array.from(rowMap.entries()).map(([key, chars]) => ({
    name: rowNames[key] || key,
    nameJp: key,
    chars: chars.sort((a, b) => a.order - b.order),
  }))
}

export function getAllHiragana(): KanaChar[] {
  return [...hiraganaData].sort((a, b) => a.order - b.order)
}
