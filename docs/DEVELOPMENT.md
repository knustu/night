# 개발 프리뷰 안내

프리릴리스에 첨부된 `night-bampori-beta-1.4.0.zip`을 기준으로 합니다.

| 파일 | 역할 |
| --- | --- |
| `index.html`, `game.js` | 브라우저 진입점, 영업과 매치-3, 진행 상태 저장 |
| `decor-runtime.js`, `decor-dom-runtime.js` | 꾸미기와 물건 배치 |
| `story-runtime.js`, `reward-runtime.js` | 도시별 이야기, 퀘스트, 보상 |
| `hunt-runtime.js`, `equipment-runtime.js` | 사냥, 장비 옵션과 보상 |
| `game-assets/` | 이미지, 이미지 목록, 런타임 에셋 |
| `scripts/validate-project.mjs`, `test/` | 파일 구조 점검과 회귀 테스트 |

영업과 꾸미기, 도시 진행, 장비와 사냥의 구현을 살펴볼 수 있습니다. 모바일 조작, 저장 데이터 이전, 사냥과 보상 밸런스는 개발 중입니다. 플레이 진행은 브라우저 로컬 저장소에 저장됩니다.

로컬 실행은 `npm run serve`, 확인은 `npm run build`입니다. 검증 환경에서 하위 프로세스 실행이 제한될 경우 `npm run check`와 `node --test --test-isolation=none`으로 각각 확인할 수 있습니다. 후자의 옵션은 설치한 Node.js에서 지원 여부를 확인하세요.
