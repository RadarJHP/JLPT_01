# Nihongo Duel — Design System

## Palette: Japanese Serenity (和の静寂)

### Core Colors
| Token | Value | Role |
|-------|-------|------|
| `--bg` | #FAF8F5 | 메인 배경 (와시/和紙 크림) |
| `--bg-card` | #FFFFFF | 카드 배경 |
| `--bg-elevated` | #FFFFFF | 모달/드롭다운 |
| `--bg-inset` | #F5F0EB | 인풋/코드 블록 배경 |
| `--fg` | #2D2926 | 본문 텍스트 (먹색) |
| `--fg-strong` | #1A1714 | 제목 (진한 먹색) |
| `--fg-muted` | #8C8279 | 보조 텍스트 |
| `--fg-faint` | #B8AFA6 | 비활성/플레이스홀더 |
| `--ai` | #1B4D6E | 남색(藍) — 메인 액센트, AI 튜터 |
| `--ai-light` | #E8F0F7 | 남색 배경 |
| `--cta` | #D4513D | 주홍(朱) — CTA, 중요 액션 |
| `--cta-light` | #FDF0EE | 주홍 배경 |
| `--success` | #2D8659 | 정답, 완료 (松葉色) |
| `--success-light` | #EDF7F0 | 성공 배경 |
| `--warning` | #C4841D | 주의, 복습 필요 (山吹色) |
| `--warning-light` | #FFF8EB | 주의 배경 |
| `--error` | #C53030 | 오답, 에러 |
| `--error-light` | #FDF2F2 | 에러 배경 |
| `--n5` | #4A90D9 | JLPT N5 레벨 컬러 |
| `--n4` | #2D8659 | JLPT N4 레벨 컬러 |
| `--n3` | #C4841D | JLPT N3 레벨 컬러 |
| `--n2` | #D4513D | JLPT N2 레벨 컬러 |
| `--n1` | #7C3AED | JLPT N1 레벨 컬러 |

### Dark Mode (墨の世界)
| Token | Value | Role |
|-------|-------|------|
| `--bg` | #1A1714 | 먹색 배경 |
| `--bg-card` | #242019 | 카드 배경 |
| `--bg-elevated` | #2D2926 | 모달 |
| `--fg` | #E8E0D8 | 본문 텍스트 |
| `--fg-strong` | #FAF8F5 | 제목 |
| `--ai` | #5BA3D9 | 남색 밝은 변형 |
| `--cta` | #E8735F | 주홍 밝은 변형 |

### Typography
| Level | Font | Size | Weight | Tracking | 용도 |
|-------|------|------|--------|----------|------|
| Display | Pretendard | 48px | 800 | -0.02em | 히어로 타이틀 |
| H1 | Pretendard | 32px | 700 | -0.01em | 페이지 제목 |
| H2 | Pretendard | 24px | 700 | 0 | 섹션 제목 |
| H3 | Pretendard | 18px | 600 | 0 | 서브 섹션 |
| Body | Pretendard | 15px | 400 | 0.01em | 한국어 본문 |
| Body-JP | Noto Sans JP | 16px | 400 | 0.02em | 일본어 본문 (line-height: 1.8) |
| Kanji-XL | Noto Sans JP | 64px | 400 | 0 | 한자 대형 표시 |
| Kanji-LG | Noto Sans JP | 40px | 400 | 0 | 한자 카드 |
| Furigana | Noto Sans JP | 10px | 400 | 0.05em | 후리가나 (ruby text) |
| Caption | Pretendard | 13px | 500 | 0.02em | 설명, 메타 |
| Label | Inter | 12px | 600 | 0.05em | UI 라벨, 배지 |

### Spacing (8px base + 間の美)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 40px
- 2xl: 64px
- 3xl: 96px (섹션 간 여백 — 間)

### Radius
- sm: 8px (버튼, 인풋)
- md: 12px (카드)
- lg: 16px (패널, 학습 모듈)
- xl: 24px (히어로 섹션)
- full: 9999px (배지, 아바타, 레벨 인디케이터)

### Shadows (Warm, subtle)
- xs: 0 1px 2px rgba(45,41,38,0.06)
- sm: 0 2px 8px rgba(45,41,38,0.08)
- md: 0 4px 16px rgba(45,41,38,0.10)
- lg: 0 12px 32px rgba(45,41,38,0.12)
- glow-ai: 0 0 20px rgba(27,77,110,0.15)
- glow-cta: 0 0 20px rgba(212,81,61,0.15)
- glow-success: 0 0 16px rgba(45,134,89,0.20)

### Animation Principles
- Duration: 150ms (micro), 300ms (transition), 500ms (page), 800ms (획순)
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — 자연스러운 감속
- Stagger: 50ms between items
- Card flip: rotateY 180deg, 400ms, perspective 1000px
- Scroll reveal: fade-up 20px over 400ms
- Hover: scale 1.02, shadow increase, 150ms
- Press: scale 0.98, 100ms
- 정답: scale 1.05 → 1.0, border glow-success, 300ms
- 오답: shake horizontal 4px × 3, border error, 300ms
- 획순: stroke-dashoffset animation, 800ms per stroke

### Component Patterns
- **학습 카드**: bg-card + border + shadow-xs + flip animation + 후리가나 ruby
- **퀴즈 옵션**: radius-md + hover:bg-inset + 선택 시 border-ai + scale
- **진행 바**: rounded-full + gradient(ai → success) + 애니메이션 fill
- **스트릭 캘린더**: grid + 셀 색상 강도로 학습량 표현 (GitHub 잔디 스타일)
- **JLPT 배지**: inline-flex + radius-full + 레벨별 컬러 + font-semibold
- **AI 채팅 버블**: radius-lg + bg-ai-light(AI) / bg-card(사용자) + tail
- **한자 표시**: Kanji-XL + 획순 SVG 오버레이 + 음독/훈독 라벨
- Buttons: radius-sm + font-semibold + scale interaction
- Inputs: bg-inset + border + focus:ring-2(ai)
- Modals: backdrop-blur + shadow-lg + spring animation
