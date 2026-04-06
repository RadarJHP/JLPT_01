import type { KanaChar, KanaRow } from './hiragana'

const katakanaData: KanaChar[] = [
  // ア행
  { kana: 'ア', romaji: 'a', korean: '아', mnemonic: '안테나가 세워진 모양. "아!" 신호를 잡았다!', mnemonicImage: 'antenna', row: 'ア행', order: 0 },
  { kana: 'イ', romaji: 'i', korean: '이', mnemonic: '이쑤시개 두 개. 한쪽이 기울어진 "이"쑤시개!', mnemonicImage: 'toothpick', row: 'ア행', order: 1 },
  { kana: 'ウ', romaji: 'u', korean: '우', mnemonic: '우산 꼭대기 모양. 점이 꼭지, 아래가 우산 뼈대.', mnemonicImage: 'umbrella-top', row: 'ア행', order: 2 },
  { kana: 'エ', romaji: 'e', korean: '에', mnemonic: '엘리베이터 문. 위아래 가로선이 문틀, 세로가 기둥.', mnemonicImage: 'elevator', row: 'ア행', order: 3 },
  { kana: 'オ', romaji: 'o', korean: '오', mnemonic: '오페라 가수가 지휘봉을 든 모습. 가로획이 봉.', mnemonicImage: 'opera', row: 'ア행', order: 4 },

  // カ행
  { kana: 'カ', romaji: 'ka', korean: '카', mnemonic: '카드를 자르는 가위. 날카로운 각도!', mnemonicImage: 'scissors', row: 'カ행', order: 5 },
  { kana: 'キ', romaji: 'ki', korean: '키', mnemonic: '키보드의 키(key). 가로 두 줄이 키캡.', mnemonicImage: 'keyboard', row: 'カ행', order: 6 },
  { kana: 'ク', romaji: 'ku', korean: '쿠', mnemonic: '쿠키를 한 입 베어 먹은 모양. 모서리가 없어짐!', mnemonicImage: 'cookie-bite', row: 'カ행', order: 7 },
  { kana: 'ケ', romaji: 'ke', korean: '케', mnemonic: '케이트가 스케이트 타는 자세. K자 다리 벌림.', mnemonicImage: 'skating', row: 'カ행', order: 8 },
  { kana: 'コ', romaji: 'ko', korean: '코', mnemonic: '코너(corner) 두 개. ㄷ자 모양의 코너.', mnemonicImage: 'corner', row: 'カ행', order: 9 },

  // サ행
  { kana: 'サ', romaji: 'sa', korean: '사', mnemonic: '사다리 모양. 가로 두 줄이 발판, 세로가 기둥.', mnemonicImage: 'ladder', row: 'サ행', order: 10 },
  { kana: 'シ', romaji: 'shi', korean: '시', mnemonic: '시원하게 웃는 윙크 얼굴. 점 두 개가 눈, 아래가 입꼬리. (ツ와 구별: シ는 세로 방향!)', mnemonicImage: 'wink-face', row: 'サ행', order: 11 },
  { kana: 'ス', romaji: 'su', korean: '스', mnemonic: '스키 점프대. 위에서 아래로 내려와 휙 올라가는 경사로.', mnemonicImage: 'ski-jump', row: 'サ행', order: 12 },
  { kana: 'セ', romaji: 'se', korean: '세', mnemonic: '세일(돛) 모양. 바람에 펄럭이는 돛.', mnemonicImage: 'sail', row: 'サ행', order: 13 },
  { kana: 'ソ', romaji: 'so', korean: '소', mnemonic: '소나기 빗방울 두 개가 비스듬히 떨어지는 모양. (ン과 구별: ソ는 오른쪽 아래로!)', mnemonicImage: 'raindrops', row: 'サ행', order: 14 },

  // タ행
  { kana: 'タ', romaji: 'ta', korean: '타', mnemonic: '타이타닉 배 옆모습. 가로가 수평선, 나머지가 배.', mnemonicImage: 'ship', row: 'タ행', order: 15 },
  { kana: 'チ', romaji: 'chi', korean: '치', mnemonic: '치어리더의 폼폼. 위 가로가 폼폼, 아래가 몸.', mnemonicImage: 'cheerleader', row: 'タ행', order: 16 },
  { kana: 'ツ', romaji: 'tsu', korean: '츠', mnemonic: '쓰리(three) 빗방울. 점 세 개가 가로 방향. (シ와 구별: ツ는 가로 방향!)', mnemonicImage: 'three-drops', row: 'タ행', order: 17 },
  { kana: 'テ', romaji: 'te', korean: '테', mnemonic: '테이블. 가로 두 줄이 상판, 짧은 획이 다리.', mnemonicImage: 'table', row: 'タ행', order: 18 },
  { kana: 'ト', romaji: 'to', korean: '토', mnemonic: '토템폴의 꼭대기. 세로 기둥에 가로 장식.', mnemonicImage: 'totem', row: 'タ행', order: 19 },

  // ナ행
  { kana: 'ナ', romaji: 'na', korean: '나', mnemonic: '나이프(칼). 가로가 칼날, 대각선이 손잡이.', mnemonicImage: 'knife', row: 'ナ행', order: 20 },
  { kana: 'ニ', romaji: 'ni', korean: '니', mnemonic: '니(2)를 뜻하는 가로줄 두 개. 한자 二와 같음!', mnemonicImage: 'two-lines', row: 'ナ행', order: 21 },
  { kana: 'ヌ', romaji: 'nu', korean: '누', mnemonic: '누들(면)을 젓가락으로 집는 모습.', mnemonicImage: 'chopstick-noodle', row: 'ナ행', order: 22 },
  { kana: 'ネ', romaji: 'ne', korean: '네', mnemonic: '네트워크 기호. 연결점이 있는 네트 모양.', mnemonicImage: 'network', row: 'ナ행', order: 23 },
  { kana: 'ノ', romaji: 'no', korean: '노', mnemonic: '노(no)! 대각선으로 지우는 한 획.', mnemonicImage: 'slash', row: 'ナ행', order: 24 },

  // ハ행
  { kana: 'ハ', romaji: 'ha', korean: '하', mnemonic: '"하하" 웃을 때 벌어진 입. 八 모양으로 벌어짐.', mnemonicImage: 'open-mouth', row: 'ハ행', order: 25 },
  { kana: 'ヒ', romaji: 'hi', korean: '히', mnemonic: '히터(heater) 모양. 열이 올라가는 모습.', mnemonicImage: 'heater', row: 'ハ행', order: 26 },
  { kana: 'フ', romaji: 'fu', korean: '후', mnemonic: '후드(hood) 쓴 사람 옆모습. 모자 끝이 뾰족.', mnemonicImage: 'hood', row: 'ハ행', order: 27 },
  { kana: 'ヘ', romaji: 'he', korean: '헤', mnemonic: '히라가나 へ와 똑같은 산 모양! 그대로 외우면 됨.', mnemonicImage: 'mountain-same', row: 'ハ행', order: 28 },
  { kana: 'ホ', romaji: 'ho', korean: '호', mnemonic: '홀리(holy) 십자가에 점이 추가된 모양.', mnemonicImage: 'cross', row: 'ハ행', order: 29 },

  // マ행
  { kana: 'マ', romaji: 'ma', korean: '마', mnemonic: '마스크 위의 눈. 가로가 마스크 윗선, 아래가 눈.', mnemonicImage: 'mask', row: 'マ행', order: 30 },
  { kana: 'ミ', romaji: 'mi', korean: '미', mnemonic: '미(3)를 뜻하는 가로줄 세 개. 三과 비슷!', mnemonicImage: 'three-lines', row: 'マ행', order: 31 },
  { kana: 'ム', romaji: 'mu', korean: '무', mnemonic: '무(소) 뿔 모양. 뾰족한 삼각형 뿔!', mnemonicImage: 'bull-horn', row: 'マ행', order: 32 },
  { kana: 'メ', romaji: 'me', korean: '메', mnemonic: '메일(X표) 삭제. X 모양의 가위표.', mnemonicImage: 'x-mark', row: 'マ행', order: 33 },
  { kana: 'モ', romaji: 'mo', korean: '모', mnemonic: '모니터 화면. 가로 두 줄이 화면, 세로가 받침대.', mnemonicImage: 'monitor', row: 'マ행', order: 34 },

  // ヤ행
  { kana: 'ヤ', romaji: 'ya', korean: '야', mnemonic: '야크(yak) 뿔. 갈라진 뿔 모양.', mnemonicImage: 'yak-horn', row: 'ヤ행', order: 35 },
  { kana: 'ユ', romaji: 'yu', korean: '유', mnemonic: '유리컵. 위가 열린 컵 옆모습.', mnemonicImage: 'cup', row: 'ヤ행', order: 36 },
  { kana: 'ヨ', romaji: 'yo', korean: '요', mnemonic: '요가 매트를 접은 모양. 가로 세 줄이 접힌 매트.', mnemonicImage: 'yoga-mat', row: 'ヤ행', order: 37 },

  // ラ행
  { kana: 'ラ', romaji: 'ra', korean: '라', mnemonic: '라디오 안테나. 위가 신호, 아래가 본체.', mnemonicImage: 'radio', row: 'ラ행', order: 38 },
  { kana: 'リ', romaji: 'ri', korean: '리', mnemonic: '리본 두 줄. 히라가나 り와 비슷하지만 더 직선적!', mnemonicImage: 'ribbon-straight', row: 'ラ행', order: 39 },
  { kana: 'ル', romaji: 'ru', korean: '루', mnemonic: '루트(root, √) 기호를 닮은 모양.', mnemonicImage: 'root-sign', row: 'ラ행', order: 40 },
  { kana: 'レ', romaji: 're', korean: '레', mnemonic: '레이저 빔. 한 획으로 쏘는 광선!', mnemonicImage: 'laser', row: 'ラ행', order: 41 },
  { kana: 'ロ', romaji: 'ro', korean: '로', mnemonic: '로봇 얼굴. 네모난 口(입) 모양.', mnemonicImage: 'robot-face', row: 'ラ행', order: 42 },

  // ワ행
  { kana: 'ワ', romaji: 'wa', korean: '와', mnemonic: '와인 잔. 위가 열린 잔 모양.', mnemonicImage: 'wine-glass', row: 'ワ행', order: 43 },
  { kana: 'ヲ', romaji: 'wo', korean: '오', mnemonic: '오리가 물에 떠 있는 모양. 위가 머리, 아래가 몸.', mnemonicImage: 'duck', row: 'ワ행', order: 44 },
  { kana: 'ン', romaji: 'n', korean: '응', mnemonic: '응~ 끄덕이는 사람. (ソ와 구별: ン은 왼쪽 아래에서 오른쪽 위로!)', mnemonicImage: 'nodding-person', row: 'ワ행', order: 45 },
]

export function getKatakanaRows(): KanaRow[] {
  const rowMap = new Map<string, KanaChar[]>()
  for (const char of katakanaData) {
    if (!rowMap.has(char.row)) rowMap.set(char.row, [])
    rowMap.get(char.row)!.push(char)
  }

  const rowNames: Record<string, string> = {
    'ア행': 'ア행 (모음)',
    'カ행': 'カ행 (K)',
    'サ행': 'サ행 (S)',
    'タ행': 'タ행 (T)',
    'ナ행': 'ナ행 (N)',
    'ハ행': 'ハ행 (H)',
    'マ행': 'マ행 (M)',
    'ヤ행': 'ヤ행 (Y)',
    'ラ행': 'ラ행 (R)',
    'ワ행': 'ワ행 (W/N)',
  }

  return Array.from(rowMap.entries()).map(([key, chars]) => ({
    name: rowNames[key] || key,
    nameJp: key,
    chars: chars.sort((a, b) => a.order - b.order),
  }))
}

export function getAllKatakana(): KanaChar[] {
  return [...katakanaData].sort((a, b) => a.order - b.order)
}
