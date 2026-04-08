/**
 * Simple Japanese words with image (emoji) for in-quiz mixing.
 *
 * These are hiragana-only words a beginner can recognize purely from
 * the kana they're already learning. The "image" is an emoji so we
 * don't need network assets.
 *
 * Used by LearnQuiz to occasionally inject a word card alongside
 * single-kana cards, controlled by useMixSettings ratios.
 */

import type { KanaChar } from './hiragana'

export interface SimpleWord {
  id: string
  kana: string        // hiragana surface
  korean: string      // Korean meaning (used as the answer)
  romaji: string
  emoji: string       // image stand-in
  hint?: string       // brief hint
  /** which kana characters this word uses — used to match by row */
  uses: string[]
}

const data: SimpleWord[] = [
  // animals
  { id: 'sw-inu',  kana: 'いぬ',  korean: '개',     romaji: 'inu',  emoji: '🐶', hint: '강아지', uses: ['い', 'ぬ'] },
  { id: 'sw-neko', kana: 'ねこ',  korean: '고양이', romaji: 'neko', emoji: '🐱', hint: '냐옹', uses: ['ね', 'こ'] },
  { id: 'sw-uma',  kana: 'うま',  korean: '말',     romaji: 'uma',  emoji: '🐴', uses: ['う', 'ま'] },
  { id: 'sw-tori', kana: 'とり',  korean: '새',     romaji: 'tori', emoji: '🐦', uses: ['と', 'り'] },
  { id: 'sw-sakana', kana: 'さかな', korean: '물고기', romaji: 'sakana', emoji: '🐟', uses: ['さ', 'か', 'な'] },
  { id: 'sw-usagi', kana: 'うさぎ', korean: '토끼', romaji: 'usagi', emoji: '🐰', uses: ['う', 'さ', 'ぎ'] },
  { id: 'sw-kuma', kana: 'くま',  korean: '곰',     romaji: 'kuma', emoji: '🐻', uses: ['く', 'ま'] },
  { id: 'sw-zou',  kana: 'ぞう',  korean: '코끼리', romaji: 'zou',  emoji: '🐘', uses: ['ぞ', 'う'] },
  { id: 'sw-saru', kana: 'さる',  korean: '원숭이', romaji: 'saru', emoji: '🐵', uses: ['さ', 'る'] },
  { id: 'sw-kame', kana: 'かめ',  korean: '거북이', romaji: 'kame', emoji: '🐢', uses: ['か', 'め'] },

  // food
  { id: 'sw-ringo', kana: 'りんご', korean: '사과',   romaji: 'ringo', emoji: '🍎', uses: ['り', 'ん', 'ご'] },
  { id: 'sw-mikan', kana: 'みかん', korean: '귤',     romaji: 'mikan', emoji: '🍊', uses: ['み', 'か', 'ん'] },
  { id: 'sw-banana', kana: 'バナナ', korean: '바나나', romaji: 'banana', emoji: '🍌', uses: ['バ', 'ナ'] },
  { id: 'sw-pan', kana: 'パン',     korean: '빵',     romaji: 'pan',   emoji: '🍞', uses: ['パ', 'ン'] },
  { id: 'sw-mizu', kana: 'みず',    korean: '물',     romaji: 'mizu',  emoji: '💧', uses: ['み', 'ず'] },
  { id: 'sw-cha', kana: 'おちゃ',   korean: '차',     romaji: 'ocha',  emoji: '🍵', uses: ['お', 'ち', 'ゃ'] },
  { id: 'sw-tamago', kana: 'たまご', korean: '계란',   romaji: 'tamago', emoji: '🥚', uses: ['た', 'ま', 'ご'] },
  { id: 'sw-niku', kana: 'にく',    korean: '고기',   romaji: 'niku',  emoji: '🍖', uses: ['に', 'く'] },
  { id: 'sw-sushi', kana: 'すし',   korean: '초밥',   romaji: 'sushi', emoji: '🍣', uses: ['す', 'し'] },
  { id: 'sw-ramen', kana: 'ラーメン', korean: '라면', romaji: 'raamen', emoji: '🍜', uses: ['ラ', 'メ', 'ン'] },

  // nature / things
  { id: 'sw-hi',  kana: 'ひ',   korean: '불',     romaji: 'hi',   emoji: '🔥', uses: ['ひ'] },
  { id: 'sw-yama', kana: 'やま', korean: '산',     romaji: 'yama', emoji: '⛰️', uses: ['や', 'ま'] },
  { id: 'sw-umi',  kana: 'うみ', korean: '바다',   romaji: 'umi',  emoji: '🌊', uses: ['う', 'み'] },
  { id: 'sw-tsuki', kana: 'つき', korean: '달',    romaji: 'tsuki', emoji: '🌙', uses: ['つ', 'き'] },
  { id: 'sw-hoshi', kana: 'ほし', korean: '별',    romaji: 'hoshi', emoji: '⭐', uses: ['ほ', 'し'] },
  { id: 'sw-hana', kana: 'はな', korean: '꽃',     romaji: 'hana', emoji: '🌸', uses: ['は', 'な'] },
  { id: 'sw-ki',   kana: 'き',   korean: '나무',   romaji: 'ki',   emoji: '🌳', uses: ['き'] },
  { id: 'sw-ame', kana: 'あめ', korean: '비',     romaji: 'ame',  emoji: '🌧️', uses: ['あ', 'め'] },
  { id: 'sw-yuki', kana: 'ゆき', korean: '눈(눈송이)', romaji: 'yuki', emoji: '❄️', uses: ['ゆ', 'き'] },
  { id: 'sw-kuruma', kana: 'くるま', korean: '자동차', romaji: 'kuruma', emoji: '🚗', uses: ['く', 'る', 'ま'] },
  { id: 'sw-hon', kana: 'ほん', korean: '책',     romaji: 'hon', emoji: '📖', uses: ['ほ', 'ん'] },
  { id: 'sw-te',  kana: 'て',   korean: '손',     romaji: 'te', emoji: '✋', uses: ['て'] },
  { id: 'sw-me',  kana: 'め',   korean: '눈(eye)', romaji: 'me', emoji: '👁️', uses: ['め'] },
]

export function getAllSimpleWords(): SimpleWord[] {
  return data
}

/**
 * Convert a SimpleWord into a KanaChar-shaped object so LearnQuiz
 * can render it through the same code path. The `mnemonicImage`
 * field is repurposed to carry the emoji prefixed with `emoji:`,
 * which the quiz renderer will detect.
 */
export function simpleWordToKana(w: SimpleWord): KanaChar & { isWord?: boolean; emoji?: string } {
  return {
    kana: w.kana,
    romaji: w.romaji,
    korean: w.korean,
    mnemonic: w.hint || `${w.korean} (${w.romaji})`,
    mnemonicImage: `emoji:${w.emoji}`,
    row: 'simple-word',
    order: 0,
    isWord: true,
    emoji: w.emoji,
  }
}

/**
 * Pick simple words that only use kana characters from the given
 * pool — so we never quiz a word with letters the learner hasn't
 * met yet.
 */
export function getSimpleWordsForPool(pool: { kana: string }[]): SimpleWord[] {
  const known = new Set(pool.map(p => p.kana))
  return data.filter(w => w.uses.every(c => known.has(c)))
}
