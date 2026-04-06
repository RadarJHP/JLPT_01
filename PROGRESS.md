# Nihongo Duel — Progress Tracker

## 프로젝트 상태: 🔵 초기 세팅 단계

### 핵심 기능 목표
- **히라가나/카타카나**: 획순 애니메이션 + 필기 연습 + 음성
- **어휘 SRS**: SM-2 기반 간격 반복 학습 시스템
- **문법 학습**: JLPT 레벨별 구조화된 문법 포인트
- **AI 튜터**: Claude API 기반 대화형 학습 + 작문 첨삭
- **학습 대시보드**: 진행도, 스트릭, 복습 일정

### Tech Stack 선정
- **Framework**: Nuxt 4 (Vue 3) — SSR + i18n 네이티브 지원
- **Styling**: UnoCSS — 빠른 빌드, 유연한 커스텀
- **Animation**: GSAP + Lenis — 획순, 카드 플립, 스크롤 인터랙션
- **Audio**: Web Audio API + TTS — 발음 재생
- **DB**: PostgreSQL + Drizzle ORM — 학습 데이터
- **AI**: Claude API — 튜터, 피드백, 예문 생성
- **Auth**: Nuxt Auth — 학습 진도 동기화

### Phase Plan
1. **Phase 0**: 개발 환경 세팅 (Nuxt 4 + UnoCSS + DB 연결 + Auth)
2. **Phase 1**: 디자인 시스템 구축 (일본 미학 기반 컴포넌트)
3. **Phase 2**: 히라가나/카타카나 학습 모듈
4. **Phase 3**: 어휘 SRS 시스템 + JLPT N5 콘텐츠
5. **Phase 4**: 문법 학습 모듈 + AI 튜터
6. **Phase 5**: 학습 대시보드 + 통계
7. **Phase 6**: N4~N1 콘텐츠 확장 + 커뮤니티
8. **Phase 7**: PWA + 오프라인 + 배포 최적화

---
*마지막 업데이트: 2026-04-06*
