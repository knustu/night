# Codex용 아이소메트릭 게임 에셋 팩

웹 아이소메트릭 인테리어/꾸미기 게임에서 이모지 및 단색 플레이스홀더를 교체할 수 있도록 구성한 스타터 팩입니다.

## 구성
- 장식 아이템 118종
  - `assets/items/256`: 게임 월드용 256×256 투명 PNG
  - `assets/items/128`: 상점/인벤토리용 128×128 투명 PNG
- 가구 12종 × 2방향
  - `assets/furniture/512`
- 바닥 타일 3종, 벽 텍스처 3종
  - `assets/room`
- Phaser 아틀라스
  - `atlas/items_atlas.png`
  - `atlas/items_atlas.json`
- 데이터 정의
  - `manifest/items_manifest.json`
  - `manifest/items_manifest.ts`
- 미리보기
  - `preview_items.jpg`
  - `preview_furniture.jpg`
- Codex 지시문
  - `CODEX_PROMPT.txt`
- 사용자가 제공한 참고 이미지와 라이선스 자료
  - `references`
  - `licenses`

## Phaser 아틀라스 로드
```ts
this.load.atlas(
  'decor-items',
  '/game-assets/atlas/items_atlas.png',
  '/game-assets/atlas/items_atlas.json'
);

const sprite = this.add.image(x, y, 'decor-items', 'wood_chair');
sprite.setOrigin(0.5, 0.88);
```

## 개별 이미지 로드
```ts
import { ITEM_ASSETS } from './items_manifest';

for (const item of ITEM_ASSETS) {
  this.load.image(item.textureKey, `/game-assets/${item.file256}`);
}
```

## 적용 원칙
- 상점 카드에는 128px 파일을 사용합니다.
- 게임 월드에는 256px 파일 또는 아틀라스 프레임을 사용합니다.
- 배치 좌표는 픽셀이 아니라 격자 좌표로 저장합니다.
- 매니페스트의 `originX`, `originY`, `footprintWidth`, `footprintHeight`를 사용합니다.
- 가구 회전은 현재 2방향 파일을 제공합니다. 0/2 방향은 `_0`, 1/3 방향은 `_1`을 사용하도록 구성할 수 있습니다.

## 품질 및 라이선스 안내
- 본 팩은 프로토타입 및 초기 서비스 개발용 스타터 에셋입니다.
- 장식 아이템은 업로드된 3D 아이소메트릭 참고 자료의 따뜻한 조명, 바닥 그림자, 통일된 축척을 참고해 제작했습니다.
- 일부 기본 아이템은 의미 전달을 우선한 컬러 3D 아이콘 스타일입니다. 최종 상용 버전에서 더 정교한 4방향 렌더링으로 교체할 수 있습니다.
- Vecteezy 참고 파일의 서비스 사용 조건은 `licenses` 폴더와 사용자의 Vecteezy 계정 라이선스를 반드시 확인하세요.
