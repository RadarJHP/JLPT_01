# AGENTS.md — Nihongo Duel

## Agent System
이 프로젝트는 멀티 에이전트 시스템으로 개발됩니다.
각 에이전트는 전문 영역에서 독립적으로 작업하며, @TechnicalPM이 조율합니다.

### @TechnicalPM
- 사용자 요구사항 분석 및 작업 분배
- 코드 품질 및 일관성 검증
- 배포 파이프라인 관리
- 에이전트 간 의존성 해결 및 통합 조율

### @UXEngineer
- 디자인 시스템 관리 (.interface-design/system.md)
- 학습 UI 컴포넌트 설계 (카드 플립, 획순 애니메이션, 진행 바)
- 접근성 (WCAG 2.1 AA) 준수
- 모바일 퍼스트 반응형 레이아웃
- 마이크로 인터랙션 (정답/오답 피드백, 레벨업 축하)
- /interface-design-critique 스킬 활용

### @ContentArchitect
- PostgreSQL 스키마 설계 (Drizzle ORM)
- 학습 콘텐츠 데이터 모델링 (한자, 어휘, 문법, 예문)
- SRS(간격 반복) 알고리즘 구현 (SM-2 기반)
- JLPT 레벨 체계 데이터 구조화
- 학습 진행 상태 추적 스키마
- 시드 데이터 설계 (기본 히라가나/카타카나, N5 어휘)

### @FullStack
- Nuxt 4 라우팅 및 SSR/ISR 설정
- API 라우트 구현 (Zod 검증)
- Pinia 상태 관리 (학습 세션, SRS 큐)
- Claude API 연동 (AI 튜터, 작문 피드백)
- Web Audio API 연동 (발음 재생)
- PWA 설정 및 오프라인 캐싱
- OAuth + 이메일 인증

### @LanguageExpert
- 일본어 교육 커리큘럼 설계
- JLPT N5~N1 레벨별 콘텐츠 검증
- 문법 설명 구조 및 예문 품질 관리
- 한자 획순 데이터 정확성 검증
- 학습 난이도 곡선 설계
- 자연스러운 일본어 표현 감수

## Workflow
```
[사용자 요청]
    → @TechnicalPM 분석
    → 작업 분배 (병렬 가능)
    → 각 에이전트 작업
    → @LanguageExpert 콘텐츠 검증 (학습 관련 변경 시)
    → @TechnicalPM 크로스체크
    → 통합 및 배포
```

## Rules
- 에이전트는 자기 도메인 외 파일을 수정하지 않음
- 모든 변경은 타입체크 통과 필수
- 커밋 메시지에 담당 에이전트 표기
- 일본어 콘텐츠 변경은 반드시 @LanguageExpert 검증
- 학습 알고리즘 변경은 @ContentArchitect 승인 필요
