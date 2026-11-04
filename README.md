# 양승훈 포트폴리오

임베디드 AI · 영상처리 · 게임 개발. GitHub Pages로 배포하는 개인 포트폴리오 사이트입니다.

## 구조

```
content/    사이트 내용 (JSON) — 업데이트는 여기만 고치면 됩니다
assets/     이미지, 원본 GIF, 변환 MP4, 연구 자료 그림
src/        스타일(styles.css), 스크립트(main.js)
build.mjs   content → _site/ 정적 HTML 생성 (외부 패키지 없음)
DESIGN.md   색·글꼴·간격 등 디자인 기준
```

## 업데이트 방법

1. `content/` 안의 JSON을 고칩니다 ([content/README.md](content/README.md) 참고).
2. master에 푸시하면 GitHub Actions가 자동으로 빌드·배포합니다.

로컬에서 미리 보려면:

```
node build.mjs
cd _site && python3 -m http.server 8000   # http://localhost:8000
```

## 새 게임 영상 추가

원본 GIF를 `assets/video/<게임>/`에 넣고 같은 폴더에 MP4와 포스터를 만들면 사이트는 MP4로 재생합니다. 원본 GIF는 그대로 둡니다.

```
ffmpeg -i clip.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=-2:'min(720,ih)',scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 26 -an clip.mp4
ffmpeg -i clip.gif -vframes 1 -vf "scale=-2:'min(720,ih)'" clip.jpg
```

확인이 필요한 항목은 [content/REVIEW.md](content/REVIEW.md)에 있습니다. 이전 Vue 버전 사이트는 커밋 `dea0ef4` 기록에 남아 있습니다.
