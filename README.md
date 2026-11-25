# 밤포리 · 夜市一口香

재료를 세 개 이상 맞춰 손님의 주문을 완성하고, 영업으로 얻은 보상으로 포장마차를 꾸미는 브라우저 게임입니다. 한국어, 중국어 간체, 영어를 지원합니다.

## 로컬 실행

저장소 루트에서 Python 3의 정적 파일 서버를 실행하세요.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:8000/`을 엽니다. 인접한 재료를 움직여 매치를 만들고 손님 주문을 채웁니다. 꾸미기 화면에서는 획득한 아이템을 확인하고 배치할 수 있습니다.

## 파일 구성

| 경로 | 역할 |
| --- | --- |
| [`index.html`](index.html) | 언어 선택, 영업, 주문, 꾸미기 화면의 진입점 |
| [`game.js`](game.js) | 보드, 주문, 게임 상태, UI 동작 |
| [`styles.css`](styles.css) | 레이아웃과 화면 스타일 |
| [`assets/`](assets/) | 배포용 런타임 번들 |
| [`game-assets/`](game-assets/) | 가구·장식 아이템 이미지와 에셋 목록 |
| [`night-market-mobile-test.html`](night-market-mobile-test.html) | 모바일 화면 확인용 페이지 |

추가 자료는 [에셋 팩 문서](game-assets/README.md)와 [기존 게임 구조 분석](https://github.com/knustu/night/blob/d22ede9a496d1d78b6e5b6ba866f92fde46fbcc5/docs/architecture.md)에 있습니다.
