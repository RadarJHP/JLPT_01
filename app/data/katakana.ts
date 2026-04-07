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

// === 탁음 / 반탁음 / 요음 ===
const katakanaDakuten: KanaChar[] = [
  { kana: 'ガ', romaji: 'ga', korean: '가', mnemonic: 'カ + ゛ = 가', mnemonicImage: 'scissors', row: 'ガ행', order: 46 },
  { kana: 'ギ', romaji: 'gi', korean: '기', mnemonic: 'キ + ゛ = 기', mnemonicImage: 'keyboard', row: 'ガ행', order: 47 },
  { kana: 'グ', romaji: 'gu', korean: '구', mnemonic: 'ク + ゛ = 구', mnemonicImage: 'cookie-bite', row: 'ガ행', order: 48 },
  { kana: 'ゲ', romaji: 'ge', korean: '게', mnemonic: 'ケ + ゛ = 게', mnemonicImage: 'skating', row: 'ガ행', order: 49 },
  { kana: 'ゴ', romaji: 'go', korean: '고', mnemonic: 'コ + ゛ = 고', mnemonicImage: 'corner', row: 'ガ행', order: 50 },
  { kana: 'ザ', romaji: 'za', korean: '자', mnemonic: 'サ + ゛ = 자', mnemonicImage: 'ladder', row: 'ザ행', order: 51 },
  { kana: 'ジ', romaji: 'ji', korean: '지', mnemonic: 'シ + ゛ = 지', mnemonicImage: 'wink-face', row: 'ザ행', order: 52 },
  { kana: 'ズ', romaji: 'zu', korean: '즈', mnemonic: 'ス + ゛ = 즈', mnemonicImage: 'ski-jump', row: 'ザ행', order: 53 },
  { kana: 'ゼ', romaji: 'ze', korean: '제', mnemonic: 'セ + ゛ = 제', mnemonicImage: 'sail', row: 'ザ행', order: 54 },
  { kana: 'ゾ', romaji: 'zo', korean: '조', mnemonic: 'ソ + ゛ = 조', mnemonicImage: 'raindrops', row: 'ザ행', order: 55 },
  { kana: 'ダ', romaji: 'da', korean: '다', mnemonic: 'タ + ゛ = 다', mnemonicImage: 'ship', row: 'ダ행', order: 56 },
  { kana: 'ヂ', romaji: 'ji', korean: '지(드물게)', mnemonic: 'チ + ゛. ジ와 발음 같음', mnemonicImage: 'cheerleader', row: 'ダ행', order: 57 },
  { kana: 'ヅ', romaji: 'zu', korean: '즈(드물게)', mnemonic: 'ツ + ゛. ズ와 발음 같음', mnemonicImage: 'three-drops', row: 'ダ행', order: 58 },
  { kana: 'デ', romaji: 'de', korean: '데', mnemonic: 'テ + ゛ = 데', mnemonicImage: 'table', row: 'ダ행', order: 59 },
  { kana: 'ド', romaji: 'do', korean: '도', mnemonic: 'ト + ゛ = 도', mnemonicImage: 'totem', row: 'ダ행', order: 60 },
  { kana: 'バ', romaji: 'ba', korean: '바', mnemonic: 'ハ + ゛ = 바', mnemonicImage: 'open-mouth', row: 'バ행', order: 61 },
  { kana: 'ビ', romaji: 'bi', korean: '비', mnemonic: 'ヒ + ゛ = 비', mnemonicImage: 'heater', row: 'バ행', order: 62 },
  { kana: 'ブ', romaji: 'bu', korean: '부', mnemonic: 'フ + ゛ = 부', mnemonicImage: 'hood', row: 'バ행', order: 63 },
  { kana: 'ベ', romaji: 'be', korean: '베', mnemonic: 'ヘ + ゛ = 베', mnemonicImage: 'mountain-same', row: 'バ행', order: 64 },
  { kana: 'ボ', romaji: 'bo', korean: '보', mnemonic: 'ホ + ゛ = 보', mnemonicImage: 'cross', row: 'バ행', order: 65 },
]

const katakanaHandakuten: KanaChar[] = [
  { kana: 'パ', romaji: 'pa', korean: '파', mnemonic: 'ハ + ゜ = 파', mnemonicImage: 'open-mouth', row: 'パ행', order: 66 },
  { kana: 'ピ', romaji: 'pi', korean: '피', mnemonic: 'ヒ + ゜ = 피', mnemonicImage: 'heater', row: 'パ행', order: 67 },
  { kana: 'プ', romaji: 'pu', korean: '푸', mnemonic: 'フ + ゜ = 푸', mnemonicImage: 'hood', row: 'パ행', order: 68 },
  { kana: 'ペ', romaji: 'pe', korean: '페', mnemonic: 'ヘ + ゜ = 페', mnemonicImage: 'mountain-same', row: 'パ행', order: 69 },
  { kana: 'ポ', romaji: 'po', korean: '포', mnemonic: 'ホ + ゜ = 포', mnemonicImage: 'cross', row: 'パ행', order: 70 },
]

const katakanaYoon: KanaChar[] = [
  { kana: 'キャ', romaji: 'kya', korean: '캬', mnemonic: 'キ + ャ', mnemonicImage: 'keyboard', row: 'キャ행', order: 71 },
  { kana: 'キュ', romaji: 'kyu', korean: '큐', mnemonic: 'キ + ュ', mnemonicImage: 'keyboard', row: 'キャ행', order: 72 },
  { kana: 'キョ', romaji: 'kyo', korean: '쿄', mnemonic: 'キ + ョ', mnemonicImage: 'keyboard', row: 'キャ행', order: 73 },
  { kana: 'シャ', romaji: 'sha', korean: '샤', mnemonic: 'シ + ャ. シャツ(셔츠)', mnemonicImage: 'wink-face', row: 'シャ행', order: 74 },
  { kana: 'シュ', romaji: 'shu', korean: '슈', mnemonic: 'シ + ュ. シュー(슈)', mnemonicImage: 'wink-face', row: 'シャ행', order: 75 },
  { kana: 'ショ', romaji: 'sho', korean: '쇼', mnemonic: 'シ + ョ. ショー(쇼)', mnemonicImage: 'wink-face', row: 'シャ행', order: 76 },
  { kana: 'チャ', romaji: 'cha', korean: '챠', mnemonic: 'チ + ャ. チャイ(차이)', mnemonicImage: 'cheerleader', row: 'チャ행', order: 77 },
  { kana: 'チュ', romaji: 'chu', korean: '츄', mnemonic: 'チ + ュ', mnemonicImage: 'cheerleader', row: 'チャ행', order: 78 },
  { kana: 'チョ', romaji: 'cho', korean: '쵸', mnemonic: 'チ + ョ. チョコ(쵸코)', mnemonicImage: 'cheerleader', row: 'チャ행', order: 79 },
  { kana: 'ニャ', romaji: 'nya', korean: '냐', mnemonic: 'ニ + ャ', mnemonicImage: 'two-lines', row: 'ニャ행', order: 80 },
  { kana: 'ニュ', romaji: 'nyu', korean: '뉴', mnemonic: 'ニ + ュ. ニュース(뉴스)', mnemonicImage: 'two-lines', row: 'ニャ행', order: 81 },
  { kana: 'ニョ', romaji: 'nyo', korean: '뇨', mnemonic: 'ニ + ョ', mnemonicImage: 'two-lines', row: 'ニャ행', order: 82 },
  { kana: 'ヒャ', romaji: 'hya', korean: '햐', mnemonic: 'ヒ + ャ', mnemonicImage: 'heater', row: 'ヒャ행', order: 83 },
  { kana: 'ヒュ', romaji: 'hyu', korean: '휴', mnemonic: 'ヒ + ュ. ヒューズ(퓨즈)', mnemonicImage: 'heater', row: 'ヒャ행', order: 84 },
  { kana: 'ヒョ', romaji: 'hyo', korean: '효', mnemonic: 'ヒ + ョ', mnemonicImage: 'heater', row: 'ヒャ행', order: 85 },
  { kana: 'ミャ', romaji: 'mya', korean: '먀', mnemonic: 'ミ + ャ', mnemonicImage: 'three-lines', row: 'ミャ행', order: 86 },
  { kana: 'ミュ', romaji: 'myu', korean: '뮤', mnemonic: 'ミ + ュ. ミュージック(뮤직)', mnemonicImage: 'three-lines', row: 'ミャ행', order: 87 },
  { kana: 'ミョ', romaji: 'myo', korean: '묘', mnemonic: 'ミ + ョ', mnemonicImage: 'three-lines', row: 'ミャ행', order: 88 },
  { kana: 'リャ', romaji: 'rya', korean: '랴', mnemonic: 'リ + ャ', mnemonicImage: 'ribbon-straight', row: 'リャ행', order: 89 },
  { kana: 'リュ', romaji: 'ryu', korean: '류', mnemonic: 'リ + ュ. リュック(륙색)', mnemonicImage: 'ribbon-straight', row: 'リャ행', order: 90 },
  { kana: 'リョ', romaji: 'ryo', korean: '료', mnemonic: 'リ + ョ', mnemonicImage: 'ribbon-straight', row: 'リャ행', order: 91 },
  { kana: 'ギャ', romaji: 'gya', korean: '갸', mnemonic: 'ギ + ャ', mnemonicImage: 'keyboard', row: 'ギャ행', order: 92 },
  { kana: 'ギュ', romaji: 'gyu', korean: '규', mnemonic: 'ギ + ュ', mnemonicImage: 'keyboard', row: 'ギャ행', order: 93 },
  { kana: 'ギョ', romaji: 'gyo', korean: '교', mnemonic: 'ギ + ョ', mnemonicImage: 'keyboard', row: 'ギャ행', order: 94 },
  { kana: 'ジャ', romaji: 'ja', korean: '쟈', mnemonic: 'ジ + ャ. ジャズ(재즈)', mnemonicImage: 'wink-face', row: 'ジャ행', order: 95 },
  { kana: 'ジュ', romaji: 'ju', korean: '쥬', mnemonic: 'ジ + ュ. ジュース(주스)', mnemonicImage: 'wink-face', row: 'ジャ행', order: 96 },
  { kana: 'ジョ', romaji: 'jo', korean: '죠', mnemonic: 'ジ + ョ', mnemonicImage: 'wink-face', row: 'ジャ행', order: 97 },
  { kana: 'ビャ', romaji: 'bya', korean: '뱌', mnemonic: 'ビ + ャ', mnemonicImage: 'heater', row: 'ビャ행', order: 98 },
  { kana: 'ビュ', romaji: 'byu', korean: '뷰', mnemonic: 'ビ + ュ', mnemonicImage: 'heater', row: 'ビャ행', order: 99 },
  { kana: 'ビョ', romaji: 'byo', korean: '뵤', mnemonic: 'ビ + ョ', mnemonicImage: 'heater', row: 'ビャ행', order: 100 },
  { kana: 'ピャ', romaji: 'pya', korean: '퍄', mnemonic: 'ピ + ャ', mnemonicImage: 'heater', row: 'ピャ행', order: 101 },
  { kana: 'ピュ', romaji: 'pyu', korean: '퓨', mnemonic: 'ピ + ュ', mnemonicImage: 'heater', row: 'ピャ행', order: 102 },
  { kana: 'ピョ', romaji: 'pyo', korean: '표', mnemonic: 'ピ + ョ', mnemonicImage: 'heater', row: 'ピャ행', order: 103 },
]

const allKatakanaCombined = [...katakanaData, ...katakanaDakuten, ...katakanaHandakuten, ...katakanaYoon]

const katakanaRowNames: Record<string, string> = {
  'ア행': 'ア행 (모음)', 'カ행': 'カ행 (K)', 'サ행': 'サ행 (S)', 'タ행': 'タ행 (T)',
  'ナ행': 'ナ행 (N)', 'ハ행': 'ハ행 (H)', 'マ행': 'マ행 (M)', 'ヤ행': 'ヤ행 (Y)',
  'ラ행': 'ラ행 (R)', 'ワ행': 'ワ행 (W/N)',
  'ガ행': 'ガ행 (G·탁음)', 'ザ행': 'ザ행 (Z·탁음)', 'ダ행': 'ダ행 (D·탁음)', 'バ행': 'バ행 (B·탁음)',
  'パ행': 'パ행 (P·반탁음)',
  'キャ행': 'キャ행 (Ky)', 'シャ행': 'シャ행 (Sh)', 'チャ행': 'チャ행 (Ch)',
  'ニャ행': 'ニャ행 (Ny)', 'ヒャ행': 'ヒャ행 (Hy)', 'ミャ행': 'ミャ행 (My)',
  'リャ행': 'リャ행 (Ry)', 'ギャ행': 'ギャ행 (Gy)', 'ジャ행': 'ジャ행 (J)',
  'ビャ행': 'ビャ행 (By)', 'ピャ행': 'ピャ행 (Py)',
}

function buildKataRows(pool: KanaChar[]): KanaRow[] {
  const rowMap = new Map<string, KanaChar[]>()
  for (const char of pool) {
    if (!rowMap.has(char.row)) rowMap.set(char.row, [])
    rowMap.get(char.row)!.push(char)
  }
  return Array.from(rowMap.entries()).map(([key, chars]) => ({
    name: katakanaRowNames[key] || key,
    nameJp: key,
    chars: chars.sort((a, b) => a.order - b.order),
  }))
}

export function getKatakanaRows(): KanaRow[] {
  return buildKataRows(katakanaData)
}
export function getKatakanaDakutenRows(): KanaRow[] {
  return buildKataRows([...katakanaDakuten, ...katakanaHandakuten])
}
export function getKatakanaYoonRows(): KanaRow[] {
  return buildKataRows(katakanaYoon)
}
export function getAllKatakanaRows(): KanaRow[] {
  return buildKataRows(allKatakanaCombined)
}

export function getAllKatakana(): KanaChar[] {
  return [...katakanaData].sort((a, b) => a.order - b.order)
}
export function getAllKatakanaFull(): KanaChar[] {
  return [...allKatakanaCombined].sort((a, b) => a.order - b.order)
}
