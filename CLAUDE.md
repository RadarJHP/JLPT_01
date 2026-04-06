# CLAUDE.md — Nihongo Duel (일본어 학습 플랫폼)

## 1. Project Vision & Core Philosophy
Nihongo Duel — 게임처럼 재미있고, 체계적이며, 아름다운 일본어 학습 플랫폼.
- **디자인 우선**: 일본 미학(和) 기반 UI. 미니멀하되 따뜻하고, 학습 몰입을 돕는 비주얼.
- **학습 퍼스트**: 모든 UX 플로우의 목적은 학습 지속률 극대화. 발견→학습→복습→성취 사이클 최적화.
- **AI 네이티브**: AI 튜터가 대화형으로 문법 설명, 작문 피드백, 발음 가이드 제공.
- **퍼포먼스**: Core Web Vitals 100점 목표. SSR + ISR + Edge 최적화.
- **감성**: 와비사비(侘寂) — 완벽하지 않아도 아름다운 학습 여정. 실수를 두려워하지 않는 환경.

## 2. Technology Stack
- **Framework**: Nuxt 4 (Vue 3 기반) — SSR/ISR 최적화, i18n 내장
- **Styling**: UnoCSS + Radix Vue — 유틸리티 퍼스트 + 접근성
- **Animation**: GSAP + Lenis (smooth scroll) — 학습 전환, 카드 플립, 진행도 애니메이션
- **Database**: PostgreSQL + Drizzle ORM — 학습 데이터, 사용자 진행 상태
- **AI**: Claude API 직접 연동 — AI 튜터, 작문 피드백, 문맥 예문 생성
- **Audio**: Web Audio API + TTS — 발음 재생, 섀도잉 연습
- **Deployment**: Vercel Edge / Cloudflare Workers
- **State**: Pinia — 학습 세션 상태, SRS 큐 관리
- **Auth**: Nuxt Auth (OAuth + 이메일) — 학습 진도 동기화

## 3. Design System
- **Japanese Serenity Palette**: 와시(和紙) 크림 배경 + 남색(藍) 액센트 + 주홍(朱) CTA
- **Typography**: Pretendard (한국어) + Noto Sans JP (일본어) + Inter (영문) 트리플 폰트
- **Spacing**: 8px 기반 — 여백의 미(間) 강조
- **Components**: Headless UI + 커스텀 스타일 레이어
- **Dark/Light Mode**: 시스템 설정 연동 자동 전환 (다크 = 먹색 배경)

## 4. Agent Roles
| Agent | Role |
|-------|------|
| @TechnicalPM | 오케스트레이터 — 작업 분배, 품질 관리 |
| @ContentArchitect | 학습 콘텐츠 구조, DB 스키마, SRS 알고리즘 |
| @UXEngineer | 디자인 시스템, 학습 UI 컴포넌트, 애니메이션 |
| @FullStack | 라우팅, API, 상태관리, SSR, AI 연동 |
| @LanguageExpert | 일본어 교육 로직, JLPT 체계, 문법/어휘 검증 |

## 5. 핵심 학습 기능
### 5.1 히라가나/카타카나 마스터
- 획순 애니메이션 (SVG 기반)
- 필기 인식 연습 (Canvas API)
- 음성 재생 + 섀도잉
- 유사 문자 비교 학습

### 5.2 어휘 학습 (SRS 기반)
- SM-2 알고리즘 기반 간격 반복
- 단어 카드 (한자 → 읽기 → 뜻 → 예문)
- JLPT N5~N1 레벨별 분류
- 테마별 어휘 (일상, 비즈니스, 여행 등)

### 5.3 문법 학습
- 문법 포인트별 구조화된 설명
- 패턴 연습 (빈칸 채우기, 문장 조합)
- AI 튜터 대화형 문법 Q&A
- 레벨별 진행 (N5 → N1)

### 5.4 AI 튜터
- Claude API 기반 대화형 학습
- 작문 첨삭 (자연스러운 표현 제안)
- 문맥 기반 예문 생성
- 학습자 레벨 맞춤 난이도 조절

### 5.5 학습 통계 & 대시보드
- 일일/주간/월간 학습 시간
- SRS 복습 일정 시각화
- JLPT 레벨 달성도
- 연속 학습 스트릭

## 6. 콘텐츠 구조
### JLPT 레벨 체계
| Level | 한자 | 어휘 | 문법 포인트 |
|-------|------|------|-------------|
| N5 | ~100 | ~800 | ~80 |
| N4 | ~300 | ~1,500 | ~200 |
| N3 | ~650 | ~3,750 | ~350 |
| N2 | ~1,000 | ~6,000 | ~500 |
| N1 | ~2,000 | ~10,000 | ~700 |

## 7. Quality Standards
- Lighthouse 100/100/100/100
- FCP < 1.2s, LCP < 2.0s, CLS < 0.05
- WCAG 2.1 AA
- 모든 API 엔드포인트 Zod 검증
- E2E 테스트 커버리지 80%+
- 일본어 콘텐츠 정확성 검증 필수

## 8. 설계 원칙
- 처음부터 다국어 구조 설계 (i18n 키 기반 — ko/ja/en)
- 학습 데이터 오프라인 캐싱 (PWA)
- 모바일 퍼스트 (학습은 모바일에서 많이 이뤄짐)
- 테스트 코드 작성 (Vitest + Playwright)
- 접근성 — 스크린 리더, 키보드 네비게이션
- 학습 콘텐츠와 앱 로직 분리 (CMS적 구조)
