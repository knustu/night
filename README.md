# 밤포리 · 포장마차 꾸미기

**개발 중인 브라우저 게임**

매치-3로 손님 주문을 해결하고 보상으로 포장마차를 꾸밉니다. 개발 프리뷰에서는 도시별 퀘스트, 장비 성장, 사냥 콘텐츠도 체험할 수 있습니다.

## 개발 프리뷰

[BETA 1.4.0 프리릴리스](https://github.com/knustu/night/releases/tag/preview-1.4.0-bundle)에서 `night-bampori-beta-1.4.0.zip`을 받아 압축을 풉니다. Node.js 20 이상에서 `npm run serve`를 실행하고 `http://127.0.0.1:8765/`를 엽니다.

ZIP에는 실행 코드, 에셋과 테스트가 있습니다. 프로젝트 구조 검사와 단위 테스트 28개를 확인했습니다. [개발본 파일 안내와 남은 작업](docs/DEVELOPMENT.md)

## 기본 버전

이 브랜치의 [index.html](index.html)과 [game.js](game.js)는 초기 브라우저 버전입니다. 저장소 루트에서 `python -m http.server 8000 --bind 127.0.0.1`을 실행해 `http://127.0.0.1:8000/`을 열 수 있습니다.
