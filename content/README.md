# content/ — 사이트 내용 데이터

사이트에 보이는 글과 링크는 전부 이 폴더의 JSON 파일에 있습니다.
화면 코드는 건드리지 않고 이 파일만 고치면 사이트가 바뀝니다.

| 파일 | 내용 | 사이트 섹션 |
|---|---|---|
| `profile.json` | 이름, 직함, 소개, 연락처, 키워드 | 상단 프로필 |
| `teaching.json` | 학기별 강의, 공개강의·발표, 교육 자료, 현재 프로젝트 | 강의 · 현재 프로젝트 |
| `research.json` | 연구 과제와 학생 프로젝트 | 연구 |
| `games.json` | 게임 개발 프로젝트 | 게임 |
| `career.json` | 경력 | 경력 |
| `education.json` | 학력 | 학력 |
| `activities.json` | 수상, 선정, 전시, 논문, 학회, 교육 이수 | 활동 |

## 규칙

- 날짜는 `"YYYY.MM"` 또는 `"YYYY.MM.DD"` 문자열. 진행 중이면 `"end": null`.
- 목록은 최신 항목이 위로 오게 둡니다.
- 아직 모르는 값은 `"TODO"`로 시작하게 적으면 화면에 '입력 필요'로 표시됩니다.
- 이미지·영상 경로는 저장소 루트 기준 (`assets/...`).
- `id`는 영문 소문자와 하이픈만. 다른 파일에서 참조할 때 씁니다 (예: `games.json`의 `awards`가 `activities.json`의 `id`를 가리킴).

## 자주 하는 업데이트

**새 학기 강의 추가** — `teaching.json`의 `terms` 맨 앞에 학기 블록 하나를 추가합니다.

**새 연구 과제 추가** — `research.json`에서 비슷한 항목 하나를 복사해 맨 위에 붙이고 값을 바꿉니다.
`category`는 `funded`(외부 지원 과제), `contract`(수탁 과제), `student`(학생 프로젝트) 중 하나입니다.

**수상·논문 추가** — `activities.json`에 항목을 추가합니다.
`type`은 `award`, `program`, `exhibition`, `publication`, `conference`, `contract`, `training` 중 하나입니다.

## 넣지 않는 정보

이 저장소는 공개 저장소이므로 연봉, 학점, 병역, 퇴사 사유 같은 개인 정보는 넣지 않습니다.
