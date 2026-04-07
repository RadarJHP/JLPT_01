<script setup lang="ts">
import type { KanaChar } from '~/data/hiragana'
import type { ReviewQuality } from '~/composables/useSrs'

const props = defineProps<{
  chars: KanaChar[]
  accentColor?: string
  deck?: string  // 'hiragana' | 'katakana' | 'mixed'
  /** parent has a next row teed up — show the "다음 행" button when finished */
  hasNext?: boolean
  /** label for the next-row button (e.g. "か행 →") */
  nextLabel?: string
}>()

const emit = defineEmits<{
  complete: [score: number, total: number]
  next: []
}>()

const color = computed(() => props.accentColor || 'ai')
const deckName = computed(() => props.deck || 'kana')

const srs = useSrs()
const tts = useTts()
onMounted(() => srs.load())

function speak(text: string) {
  tts.speak(text, { rate: 0.85 })
}

// ===== State machine: 'show' → 'mnemonic' → 'quiz' → 'result' → next =====
type Phase = 'show' | 'mnemonic' | 'quiz' | 'result'

const phase = ref<Phase>('show')
const queue = ref<KanaChar[]>([])
const current = ref<KanaChar | null>(null)
const options = ref<string[]>([])
const selected = ref<string | null>(null)
const isCorrect = ref<boolean | null>(null)
const totalAnswered = ref(0)
const correctCount = ref(0)
const wrongSet = ref<Set<string>>(new Set())
const learnedInSession = ref<Set<string>>(new Set())
const finished = ref(false)
const round = ref(1)
const flipped = ref(false)
const phaseKey = ref(0) // for re-triggering animations

// SVG mnemonics (same as before, kept compact)
const mnemonicSvgs: Record<string, string> = {
  'surprised-person': `<circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="37" x2="50" y2="70" stroke="currentColor" stroke-width="2"/><line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/><line x1="40" y1="70" x2="50" y2="85" stroke="currentColor" stroke-width="2.5"/>`,
  'two-people': `<line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="25" x2="60" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'pouting-face': `<circle cx="45" cy="30" r="3" fill="currentColor"/><path d="M 35 55 Q 55 45 55 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'mountain': `<path d="M 15 75 L 45 25 L 55 45 L 70 20 L 85 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'golf-swing': `<circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 50 30 L 50 60 Q 50 75 35 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'katana': `<line x1="30" y1="15" x2="30" y2="85" stroke="currentColor" stroke-width="2"/><line x1="30" y1="40" x2="70" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'key': `<circle cx="50" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" stroke-width="2"/><line x1="50" y1="60" x2="62" y2="60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="72" x2="62" y2="72" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'bird-beak': `<path d="M 70 30 L 25 55 L 70 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'cake-cut': `<line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" stroke-width="2"/><path d="M 25 35 L 75 35 L 75 75 L 25 75 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
  'nose': `<path d="M 30 30 Q 50 25 60 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 30 55 Q 50 50 60 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'samurai': `<line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 50 20 L 50 40 Q 50 70 35 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'fish-hook': `<path d="M 50 15 Q 50 70 30 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'skiing': `<line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" stroke-width="2"/><path d="M 50 55 Q 40 70 45 85" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'sailor': `<line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="2.5"/><line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><path d="M 55 50 L 75 65" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'soft-ice': `<path d="M 40 80 Q 50 20 60 50 Q 50 30 55 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'mast': `<line x1="35" y1="15" x2="35" y2="85" stroke="currentColor" stroke-width="2"/><line x1="20" y1="35" x2="70" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 55 35 Q 65 55 55 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'five-chicken': `<path d="M 25 25 L 65 25 L 55 50 Q 30 75 55 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'tsunami': `<path d="M 20 55 Q 50 20 80 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'hand-table': `<line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 55 30 Q 55 55 40 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'tornado': `<line x1="40" y1="15" x2="40" y2="85" stroke="currentColor" stroke-width="2"/><path d="M 40 35 Q 65 45 55 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'knot': `<line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="2.5"/><path d="M 45 15 L 45 35 Q 45 60 60 70 Q 45 80 40 65" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'kneeling': `<line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><line x1="60" y1="30" x2="60" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="55" x2="60" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'noodle': `<path d="M 35 20 Q 65 35 35 50 Q 65 65 40 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'cat-curled': `<path d="M 30 30 Q 30 75 55 75 Q 75 60 50 45" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'no-sign': `<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M 40 30 Q 55 50 45 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'laughing': `<circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 42 22 Q 50 30 58 22" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="37" x2="50" y2="65" stroke="currentColor" stroke-width="2"/>`,
  'smile': `<path d="M 25 40 Q 50 70 75 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'fuji': `<circle cx="50" cy="22" r="3" fill="currentColor"/><path d="M 20 75 Q 35 50 50 35 Q 65 50 80 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'hill': `<path d="M 20 60 L 50 30 L 80 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  'hotel': `<line x1="30" y1="15" x2="30" y2="85" stroke="currentColor" stroke-width="2"/><path d="M 30 30 L 65 30 L 65 85" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" stroke-width="1.5"/>`,
  'horse': `<line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="2.5"/><path d="M 45 15 L 45 35 Q 45 65 35 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'twenty-one': `<path d="M 35 20 Q 45 20 45 40 L 45 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 55 20 Q 65 50 55 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'cow': `<path d="M 40 25 L 40 55 Q 40 75 55 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="55" cy="75" r="4" fill="currentColor"/>`,
  'eye': `<path d="M 20 50 Q 50 25 80 50 Q 50 75 20 50" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="50" r="6" fill="currentColor"/>`,
  'fish-hook-catch': `<line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" stroke-width="2"/><line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" stroke-width="2.5"/><path d="M 50 55 Q 40 70 50 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'waving': `<circle cx="50" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="32" x2="50" y2="60" stroke="currentColor" stroke-width="2"/><path d="M 50 42 L 72 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'u-turn': `<path d="M 35 20 L 35 55 Q 35 75 55 75 Q 75 75 75 55 L 75 45" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'yoyo': `<line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
  'ramen': `<line x1="40" y1="15" x2="55" y2="40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 55 40 Q 45 55 55 70 Q 65 85 50 90" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'ribbon': `<line x1="40" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="20" x2="55" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'loop': `<path d="M 40 20 L 40 60 Q 40 80 55 75 Q 70 70 55 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'runner': `<line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><path d="M 30 40 Q 60 35 65 60 Q 55 80 60 85" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'road': `<path d="M 35 20 Q 65 40 35 60 Q 65 80 35 85" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'wow': `<path d="M 30 30 Q 30 75 55 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M 55 30 Q 70 50 55 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'water-slide': `<path d="M 25 20 L 50 30 Q 70 50 40 60 Q 20 70 50 85" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'nodding': `<path d="M 35 25 Q 65 80 75 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'antenna': `<line x1="30" y1="25" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="25" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="50" x2="55" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'toothpick': `<line x1="55" y1="20" x2="35" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="35" x2="60" y2="75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'umbrella-top': `<circle cx="50" cy="25" r="3" fill="currentColor"/><line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="45" x2="50" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'elevator': `<line x1="25" y1="25" x2="75" y2="25" stroke="currentColor" stroke-width="2.5"/><line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="2"/><line x1="25" y1="75" x2="75" y2="75" stroke="currentColor" stroke-width="2.5"/>`,
  'opera': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5"/><line x1="45" y1="15" x2="45" y2="80" stroke="currentColor" stroke-width="2"/><path d="M 45 55 Q 65 50 60 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'scissors': `<line x1="30" y1="20" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><line x1="30" y1="35" x2="70" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="55" x2="65" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'keyboard': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" stroke-width="2.5"/><line x1="50" y1="20" x2="50" y2="75" stroke="currentColor" stroke-width="2"/>`,
  'cookie-bite': `<path d="M 70 25 L 30 45 L 70 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'skating': `<line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><line x1="30" y1="25" x2="70" y2="15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="50" x2="65" y2="75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'corner': `<path d="M 30 25 L 65 25 L 65 75 L 30 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'ladder': `<line x1="25" y1="30" x2="75" y2="30" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" stroke-width="2.5"/><line x1="55" y1="15" x2="40" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'wink-face': `<circle cx="35" cy="30" r="3" fill="currentColor"/><circle cx="55" cy="35" r="3" fill="currentColor"/><path d="M 60 55 Q 45 75 30 65" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'ski-jump': `<path d="M 25 25 L 55 65 Q 65 80 75 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'sail': `<line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><path d="M 30 20 Q 70 35 30 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'raindrops': `<circle cx="40" cy="30" r="3" fill="currentColor"/><circle cx="60" cy="40" r="3" fill="currentColor"/><path d="M 65 55 Q 45 60 50 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'ship': `<line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="2.5"/><path d="M 55 15 L 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 40 40 L 60 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'cheerleader': `<line x1="20" y1="25" x2="80" y2="25" stroke="currentColor" stroke-width="2.5"/><path d="M 50 25 L 50 50 Q 30 65 45 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'three-drops': `<circle cx="25" cy="30" r="3" fill="currentColor"/><circle cx="50" cy="25" r="3" fill="currentColor"/><circle cx="70" cy="30" r="3" fill="currentColor"/><path d="M 60 50 Q 45 70 30 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'table': `<line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" stroke-width="2.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="currentColor" stroke-width="2.5"/><line x1="65" y1="55" x2="65" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'totem': `<line x1="40" y1="15" x2="40" y2="85" stroke="currentColor" stroke-width="2.5"/><line x1="40" y1="30" x2="65" y2="45" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'knife': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5"/><line x1="55" y1="20" x2="40" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'two-lines': `<line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" stroke-width="2.5"/>`,
  'chopstick-noodle': `<line x1="30" y1="15" x2="55" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 55 50 Q 45 65 55 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="65" y1="20" x2="55" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'network': `<line x1="30" y1="15" x2="30" y2="80" stroke="currentColor" stroke-width="2"/><line x1="30" y1="30" x2="65" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 30 55 Q 60 50 55 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'slash': `<line x1="65" y1="15" x2="35" y2="85" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'open-mouth': `<line x1="30" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'heater': `<path d="M 55 20 Q 55 50 40 50 L 40 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'hood': `<path d="M 30 25 L 65 40 Q 50 55 55 75" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'mountain-same': `<path d="M 20 60 L 50 30 L 80 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  'cross': `<line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" stroke-width="2"/><line x1="25" y1="40" x2="75" y2="40" stroke="currentColor" stroke-width="2.5"/><circle cx="35" cy="28" r="2.5" fill="currentColor"/><circle cx="65" cy="28" r="2.5" fill="currentColor"/>`,
  'mask': `<line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="2.5"/><path d="M 55 35 L 35 70" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'three-lines': `<line x1="30" y1="25" x2="65" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="25" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="72" x2="65" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'bull-horn': `<path d="M 25 75 L 55 25 L 70 55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'x-mark': `<line x1="30" y1="25" x2="70" y2="75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="30" x2="35" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'monitor': `<line x1="25" y1="25" x2="75" y2="25" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="2.5"/><line x1="50" y1="25" x2="50" y2="80" stroke="currentColor" stroke-width="2"/>`,
  'yak-horn': `<line x1="30" y1="20" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="20" x2="55" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="50" x2="45" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'cup': `<path d="M 30 25 L 30 70 Q 30 80 50 80 Q 70 80 70 70 L 70 25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'yoga-mat': `<line x1="25" y1="25" x2="75" y2="25" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="75" x2="75" y2="75" stroke="currentColor" stroke-width="2.5"/>`,
  'radio': `<line x1="25" y1="30" x2="75" y2="30" stroke="currentColor" stroke-width="2.5"/><line x1="55" y1="15" x2="40" y2="30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M 40 30 L 40 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'ribbon-straight': `<line x1="40" y1="20" x2="40" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="25" x2="55" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'root-sign': `<path d="M 25 60 L 40 75 L 60 25 L 75 25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'laser': `<path d="M 30 70 L 70 30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'robot-face': `<rect x="25" y="25" width="50" height="50" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
  'wine-glass': `<path d="M 30 25 Q 30 60 50 70 Q 70 60 70 25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="70" x2="50" y2="85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'duck': `<line x1="20" y1="25" x2="80" y2="25" stroke="currentColor" stroke-width="2.5"/><path d="M 50 25 L 50 50 Q 30 65 45 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'nodding-person': `<circle cx="35" cy="30" r="3" fill="currentColor"/><circle cx="50" cy="40" r="3" fill="currentColor"/><path d="M 55 55 Q 45 75 65 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
}

function getSvgContent(key: string): string {
  return mnemonicSvgs[key] || `<text x="50" y="55" text-anchor="middle" fill="currentColor" font-size="40">💡</text>`
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function srsId(c: KanaChar): string {
  return `${deckName.value}:${c.kana}`
}

function init() {
  // Build a session that prioritizes due cards from SRS, then mixes in
  // the rest of the row so the user can keep practicing.
  const pool = props.chars.map(c => ({ ...c, id: srsId(c) }))
  const session = srs.buildSession(pool, deckName.value, { maxDue: 30, newPerSession: pool.length })
  // Fall back to the full row if SRS returned nothing (first run, no state).
  const final = session.length > 0 ? session : pool
  queue.value = shuffle(final.map(({ id, ...rest }) => rest as KanaChar))
  correctCount.value = 0
  totalAnswered.value = 0
  wrongSet.value = new Set()
  learnedInSession.value = new Set()
  finished.value = false
  round.value = 1
  loadNext()
}

function loadNext() {
  if (queue.value.length === 0) {
    const wrongChars = props.chars.filter(c => wrongSet.value.has(c.kana))
    if (wrongChars.length > 0) {
      queue.value = shuffle(wrongChars)
      wrongSet.value = new Set()
      round.value++
      loadNext()
      return
    }
    finished.value = true
    emit('complete', correctCount.value, totalAnswered.value)
    return
  }

  current.value = queue.value.shift()!
  phase.value = 'show'
  flipped.value = false
  selected.value = null
  isCorrect.value = null
  phaseKey.value++

  // Prepare quiz options
  const correct = current.value.korean
  const allKorean = props.chars.filter(c => c.kana !== current.value!.kana).map(c => c.korean)
  const unique = [...new Set(allKorean)]
  const wrongs = shuffle(unique).slice(0, 3)
  options.value = shuffle([correct, ...wrongs])
}

function flipCard() {
  flipped.value = true
  // After flip animation, go to mnemonic phase
  setTimeout(() => {
    phase.value = 'mnemonic'
  }, 400)
}

function goToQuiz() {
  flipped.value = false
  setTimeout(() => {
    phase.value = 'quiz'
    phaseKey.value++
  }, 400)
}

function pick(answer: string) {
  if (selected.value !== null) return

  selected.value = answer
  totalAnswered.value++

  const correct = answer === current.value!.korean

  if (correct) {
    isCorrect.value = true
    correctCount.value++
    learnedInSession.value.add(current.value!.kana)
    // gentle pronunciation cue
    speak(current.value!.kana)
  } else {
    isCorrect.value = false
    wrongSet.value.add(current.value!.kana)
  }

  phase.value = 'result'
  phaseKey.value++
}

function rate(quality: ReviewQuality) {
  if (!current.value) return
  srs.reviewQuality(srsId(current.value), deckName.value, quality)
  if (quality === 'again') {
    wrongSet.value.add(current.value.kana)
    learnedInSession.value.delete(current.value.kana)
  }
  loadNext()
}

function restart() {
  init()
}

const progressCount = computed(() => learnedInSession.value.size)
const progressTotal = computed(() => props.chars.length)

onMounted(() => init())
</script>

<template>
  <div v-if="!finished && current">
    <!-- Progress bar -->
    <div class="flex items-center gap-3 mb-8">
      <div class="flex-1 h-1 bg-fg-faint/15 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out"
          :class="color === 'cta' ? 'bg-cta' : 'bg-ai'"
          :style="{ width: (progressCount / progressTotal * 100) + '%' }"
        />
      </div>
      <span class="text-xs text-fg-faint font-en tabular-nums">{{ progressCount }}/{{ progressTotal }}</span>
    </div>

    <!-- Round badge -->
    <div v-if="round > 1" class="text-center mb-6 animate-fade-in">
      <span class="badge text-xs" :class="color === 'cta' ? 'bg-cta-light text-cta' : 'bg-ai-light text-ai'">
        복습 {{ round - 1 }}회차
      </span>
    </div>

    <!-- ==================== PHASE: SHOW (character + flip to mnemonic) ==================== -->
    <div v-if="phase === 'show' || phase === 'mnemonic'" :key="'card-' + phaseKey" class="animate-fade-in-up">
      <div class="flip-card w-full max-w-xs mx-auto aspect-[3/4] cursor-pointer" :class="{ flipped }" @click="!flipped && flipCard()">
        <div class="flip-card-inner">
          <!-- Front: The character -->
          <div class="flip-card-front bg-card border border-fg-faint/15 p-6 relative">
            <button
              v-if="tts.supported.value"
              class="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg-inset hover:bg-bg-elevated flex items-center justify-center text-fg-muted hover:text-fg transition-all"
              :aria-label="'발음 듣기'"
              @click.stop="speak(current.kana)"
            >
              🔊
            </button>
            <span class="kana-display text-8xl md:text-9xl text-fg-strong mb-4">{{ current.kana }}</span>
            <p class="text-sm text-fg-faint">탭해서 연상법 보기</p>
          </div>

          <!-- Back: Mnemonic -->
          <div class="flip-card-back bg-elevated border border-fg-faint/20 p-5">
            <svg viewBox="0 0 100 100" class="w-24 h-24 mb-3" :class="color === 'cta' ? 'text-cta' : 'text-ai'" v-html="getSvgContent(current.mnemonicImage)" />
            <div class="kana-display text-4xl text-fg-strong mb-1">{{ current.kana }}</div>
            <div class="text-lg font-600 text-fg mb-2">{{ current.korean }} <span class="text-fg-muted font-en text-sm">({{ current.romaji }})</span></div>
            <p class="text-sm text-fg-muted leading-relaxed text-center px-2 mb-4">{{ current.mnemonic }}</p>
            <button
              class="btn text-sm w-full py-2.5 font-600"
              :class="color === 'cta' ? 'bg-cta text-bg-DEFAULT' : 'bg-ai text-bg-DEFAULT'"
              @click.stop="goToQuiz"
            >
              기억했어요, 퀴즈 →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== PHASE: QUIZ ==================== -->
    <div v-if="phase === 'quiz'" :key="'quiz-' + phaseKey" class="animate-fade-in-up">
      <div class="text-center mb-8">
        <div class="kana-display text-8xl md:text-9xl text-fg-strong mb-3">{{ current.kana }}</div>
        <button
          v-if="tts.supported.value"
          class="text-xs text-fg-faint hover:text-fg inline-flex items-center gap-1 mb-1"
          @click="speak(current.kana)"
        >
          🔊 발음 듣기
        </button>
        <p class="text-sm text-fg-faint">이 글자의 발음은?</p>
      </div>

      <div class="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        <button
          v-for="opt in options"
          :key="opt"
          class="option-btn py-4 px-3 rounded-md border-2 text-center text-xl font-600 cursor-pointer"
          :class="[
            selected === null
              ? 'border-fg-faint/15 bg-card'
              : opt === current.korean
                ? 'border-success bg-success-light text-success'
                : opt === selected
                  ? 'border-error bg-error-light text-error'
                  : 'border-fg-faint/8 bg-card opacity-30',
          ]"
          :disabled="selected !== null"
          @click="pick(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <!-- ==================== PHASE: RESULT ==================== -->
    <div v-if="phase === 'result'" :key="'result-' + phaseKey" class="animate-fade-in-up">
      <!-- Correct -->
      <div v-if="isCorrect" class="text-center mb-5">
        <div class="animate-pop">
          <div class="kana-display text-7xl text-success mb-3">{{ current.kana }}</div>
        </div>
        <p class="text-success text-xl font-700 mb-1">정답!</p>
        <p class="text-fg-muted text-sm">
          {{ current.kana }} = {{ current.korean }} ({{ current.romaji }})
        </p>
      </div>

      <!-- Incorrect -->
      <div v-else class="mb-5">
        <div class="text-center animate-shake">
          <div class="kana-display text-7xl text-error mb-3">{{ current.kana }}</div>
        </div>
        <p class="text-center text-error text-lg font-700 mb-4">틀렸어요!</p>

        <div class="bg-card rounded-lg border border-fg-faint/15 p-5 max-w-sm mx-auto">
          <div class="flex items-center justify-center gap-4 mb-4">
            <span class="kana-display text-5xl text-fg-strong">{{ current.kana }}</span>
            <span class="text-fg-faint text-2xl">=</span>
            <div>
              <div class="text-2xl font-700 text-fg-strong">{{ current.korean }}</div>
              <div class="text-sm text-fg-muted font-en">{{ current.romaji }}</div>
            </div>
          </div>
          <div class="bg-bg rounded-sm p-3 border border-fg-faint/8">
            <div class="flex items-start gap-3">
              <svg viewBox="0 0 100 100" class="w-12 h-12 shrink-0" :class="color === 'cta' ? 'text-cta' : 'text-ai'" v-html="getSvgContent(current.mnemonicImage)" />
              <p class="text-sm text-fg leading-relaxed">{{ current.mnemonic }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Anki ratings -->
      <div class="max-w-sm mx-auto">
        <p class="text-center text-xs text-fg-faint mb-2">기억의 강도를 선택하세요</p>
        <div class="grid grid-cols-4 gap-2">
          <button class="rating-btn rating-again" @click="rate('again')">
            <span class="text-sm font-700">Again</span><span class="text-[10px] opacity-80">&lt;1m</span>
          </button>
          <button class="rating-btn rating-hard" @click="rate('hard')">
            <span class="text-sm font-700">Hard</span><span class="text-[10px] opacity-80">~1d</span>
          </button>
          <button class="rating-btn rating-good" @click="rate('good')">
            <span class="text-sm font-700">Good</span><span class="text-[10px] opacity-80">~3d</span>
          </button>
          <button class="rating-btn rating-easy" @click="rate('easy')">
            <span class="text-sm font-700">Easy</span><span class="text-[10px] opacity-80">~1w</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== FINISHED ==================== -->
  <div v-if="finished" class="text-center py-10 animate-fade-in-up">
    <div class="text-6xl mb-5">🎉</div>
    <h2 class="text-2xl font-700 text-fg-strong mb-2">학습 완료!</h2>
    <p class="text-fg-muted mb-1">{{ progressTotal }}글자를 모두 배웠어요</p>
    <p class="text-sm text-fg-faint mb-8">
      총 {{ totalAnswered }}문제 · {{ correctCount }}개 정답
      <span v-if="round > 1"> · 복습 {{ round - 1 }}회</span>
    </p>

    <div class="flex flex-wrap justify-center gap-2 mb-8 max-w-sm mx-auto">
      <div
        v-for="char in props.chars"
        :key="char.kana"
        class="w-11 h-11 flex items-center justify-center rounded-sm bg-card border border-fg-faint/15"
      >
        <span class="kana-display text-lg text-fg-strong">{{ char.kana }}</span>
      </div>
    </div>

    <p class="text-sm text-fg-muted mb-4">이 행을 어떻게 할까요?</p>
    <div class="flex flex-wrap justify-center gap-2">
      <button
        class="btn text-sm py-2.5 px-5 font-600 border border-fg-faint/20 bg-card text-fg"
        @click="restart"
      >
        🔁 한 번 더
      </button>
      <button
        v-if="hasNext"
        class="btn text-sm py-2.5 px-5 font-700"
        :class="color === 'cta' ? 'bg-cta text-bg-DEFAULT' : 'bg-ai text-bg-DEFAULT'"
        @click="emit('next')"
      >
        {{ nextLabel || '다음 행' }} →
      </button>
    </div>
  </div>
</template>
