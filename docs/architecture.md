# Night Market game architecture

This project is deployed as a static browser game. The production entry point is
`index.html`, which loads the decoration world runtime bundle first and then
starts the main game logic from `game.js`.

## Runtime modules

- `index.html` owns the static DOM shells for the game, decoration, shop, city,
  settlement, and pet-loot views.
- `assets/index-Dx8gev--.js` provides the decoration canvas runtime and asset
  catalog globals used by the main game:
  - `window.gameAssetCatalog`
  - `window.decorWorldRuntime`
  - `decor-world-ready`
- `game.js` owns gameplay state, rendering orchestration, save/load, city
  progression, shop/gacha, order resolution, minigames, and the bridge consumed
  by the decoration runtime:
  - `window.decorGameBridge`

## Main `game.js` responsibility map

- Constants, item data, i18n, and city data: top-level declarations.
- Save/load and ticket clocks: `saveProgress`, `loadProgress`,
  `startTicketClock`.
- Base match-3 game: board creation, drag/swaps, match resolution, order
  fulfillment.
- City minigames:
  - Chengdu: memory card matching.
  - Xi'an: six-grill heat control.
  - Guangzhou: order relay.
  - Harbin: sound sequence deduction.
- Decoration editor:
  - Inventory rendering and install/remove/sell controls.
  - Floor-grid placement validation and occupancy checks.
  - Fixed stall slots and passive item handling.
  - `window.decorGameBridge` snapshot/actions for the canvas runtime.

## Refactor direction

When the single-file game logic is split, keep browser behavior stable by moving
one responsibility at a time behind the same public interfaces. The safest first
cuts are:

1. Extract static data (`I18N`, item rows, city data, minigame recipes).
2. Extract storage migration and ticket clocks.
3. Extract minigames behind `makeActiveBoard`, `renderBoard`, and `useHint`.
4. Extract decoration placement helpers while preserving `window.decorGameBridge`
   until the runtime bundle is migrated too.
