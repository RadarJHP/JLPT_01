---
description: SSR, SEO, 데이터 무결성, 학습 데이터 보호.
effort: small
---
# System Integrity

## SEO
- SSR 필수: `/learn`, `/grammar`, `/vocabulary`, `/kanji` 등 학습 콘텐츠 페이지
- Schema.org JSON-LD: EducationalOrganization, Course, LearningResource
- 학습 콘텐츠 페이지 메타 태그 자동 생성 (JLPT 레벨, 카테고리)

## DB Rules
- 사용자별 SRS 데이터 격리 (user_id FK 필수)
- 학습 진행 데이터 atomic 업데이트 (트랜잭션)
- 콘텐츠 수정 시 기존 학습 진행 데이터 보존
- 일일 학습 통계 집계 (cron 또는 트리거 기반)

## Auth & 데이터 보호
- 학습 진행 데이터는 인증된 사용자만 접근
- 게스트 모드: 로컬 스토리지 기반 임시 진행 (회원가입 시 마이그레이션)
- Rate limiting: AI 튜터 API 호출 제한

## Portability
- 모든 경로와 시크릿은 `.env` 또는 중앙 설정에서 관리
- 학습 콘텐츠 데이터는 JSON 시드 파일로 버전 관리
- i18n 키는 ko/ja/en 3개 언어 지원
