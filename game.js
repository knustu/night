"use strict";

const SIZE = 6;
const BASE_DAY_SECONDS = 60;
const MEMORY_REVEAL_INTERVAL_SECONDS = 30;
const MEMORY_REVEAL_DURATION_MS = 2000;
const GRILL_TICK_MS = 250;
const GRILL_SLOT_COUNT = 6;
const GRILL_RESPAWN_MS = 850;
const RELAY_QUEUE_SIZE = 4;
const RELAY_FEEDBACK_MS = 650;
const SOUND_BASE_SEQUENCE_LENGTH = 3;
const SOUND_MAX_SEQUENCE_LENGTH = 6;
const SOUND_NOTE_GAP_MS = 620;
const DRAW_COST = 50;
const TEN_DRAW_COST = 450;
const RESALE_RATE = .5;
const SAVE_KEY = "nightMarketProgressV2";
const TICKET_REFILL_MS = 10 * 60 * 1000;
const DECOR_EDITOR_VERSION = 3;
const MAX_DECOR_CAPACITY_SCORE = 1000;

const I18N = {
  "zh-CN": {
    documentTitle: "夜市一口香",
    brandEyebrow: "今晚的夜市", gameTitle: "夜市一口香",
    dayReady: "准备好开张了吗？", ticketGuide: "每次营业消耗1张营业券", startBusiness: "开始营业", noTickets: "营业券不足，恢复后再开张吧。", ticketsFull: "营业券已满",
    languageTooltip: "切换语言", coinTooltip: "持有金币", timerTooltip: "剩余营业时间（秒）", earningsTooltip: "今日待结算收益", ticketTooltip: "剩余营业券 / 最大营业券",
    menuGame: "游戏", menuDecorate: "装扮", menuShop: "SHOP", menuCity: "城市",
    hungryGuests: "正在等餐的客人", ordersTitle: "已完成订单", matchTip: "连成3个以上", memoryTip: "找出相同的两张卡", grillTip: "掌控六口烤炉",
    shuffle: "重新洗牌", useHint: "使用提示", settleNow: "立即结算", dragHelp: "向相邻方向<b>拖动</b>食材，连成3个以上。", memoryHelp: "先记住食材位置，再依次选择两张相同的卡。", memoryBoardLabel: "36张食材记忆卡", memoryHiddenCard: "背面朝上的食材卡", memoryPreview: "记忆时间：还剩{seconds}秒", memoryGo: "记忆结束！找出相同的食材吧！", memoryMatch: "配对成功！+{coins}金币", memoryMismatch: "不是同一对，再试一次！", memoryBoardClear: "18对全部找到了！", memoryRevealAll: "提示时间！全部卡片公开2秒！", memoryRevealEnd: "卡片再次翻回去了！", grillHelp: "调节火力，至少翻面一次，并在绿色区间内出餐。", grillBoardLabel: "六口烤炉温度游戏", grillWelcome: "西安火炉开张！控制火力，别把食物烤焦。", grillHeat: "火力", grillFlip: "翻面", grillServe: "出餐", grillCooking: "加热中", grillReady: "最佳时机！", grillHot: "快焦了！", grillCooling: "更换食材中", grillNeedsFlip: "至少要翻面一次！", grillPerfect: "完美出餐！+{coins}金币 · {combo}连击", grillUndercooked: "还没熟！结算 -{coins}金币", grillOvercooked: "烤过头了！结算 -{coins}金币", grillBurned: "食物烤焦了！结算 -{coins}金币", grillHint: "安全火力启动！全部烤炉降为小火。", relayTip: "按顺序完成订单接力", relayHelp: "查看当前托盘，按从左到右的顺序点击食材。连续完成可提高连击奖励。", relayBoardLabel: "广州订单接力游戏", relayWelcome: "广州订单接力开始！按顺序装好每一份托盘。", relayCurrent: "当前托盘", relayNext: "下一批订单", relayProgress: "输入进度", relayPerfect: "接力成功！+{coins}金币 · {combo}连击", relayMiss: "顺序错了！本日结算 -{coins}金币", relayHint: "提示：下一项是{name}", soundTip: "听声音猜食材顺序", soundHelp: "先听完整段声音，再按相同顺序点击食材。可以免费重播。", soundBoardLabel: "哈尔滨声音推理游戏", soundWelcome: "哈尔滨声音推理开始！仔细听食材的声音。", soundPlay: "播放声音", soundReplay: "重新播放", soundListening: "正在播放…", soundChoose: "按听到的顺序选择", soundRound: "第{round}轮 · {count}个声音", soundPerfect: "声音推理成功！+{coins}金币 · {combo}连击", soundMiss: "声音顺序不对！本日结算 -{coins}金币", soundHint: "提示：下一项是{name}",
    decorateEyebrow: "我的收藏", decorateTitle: "装扮夜市摊位",
    reset: "重新开始", resetConfirm: "所有游戏进度和兑换码使用记录都将被清除。确定要重新开始吗？", resetLayout: "重置摆放", resetLayoutConfirm: "仅重置当前城市的家具、固定插槽和地板摆放。金币、背包、解锁和城市进度会保留。确定吗？", resetLayoutDone: "当前城市的摆放已重置，所有装饰已回到背包。", myBag: "我的装饰背包", bagHelp: "打开背包，选择要摆放的装饰",
    ownedItems: "已拥有的装饰", inventoryHelp: "选择背包中的家具，再点击上方地板格子进行摆放。",
    sortScore: "按装扮分数", sortRarity: "按稀有度", sortName: "按名称", sortPrice: "按价格", sortEffect: "按能力", sortAcquired: "按获得顺序", groupNone: "不分组", groupRarity: "按等级分组", filterAll: "全部等级",
    placementNone: "从背包选择家具后，点击地板格子进行摆放", placementHelp: "拖动空白处移动视角，滚轮或±按钮缩放", placementSelected: "正在摆放：{name}", placementMoving: "正在移动：{name}", cancelPlacement: "取消选择", slotOccupied: "这个位置已经有家具了。", chooseFloorCell: "请在上方地板选择摆放位置。", placementBlocked: "家具会超出地图或与其他家具重叠。", rotationBlocked: "这里没有足够空间进行旋转。", slotPlacementSelected: "正在更换固定装饰：{name}", slotPlacementHelp: "画布中只有发光的兼容插槽可以更换", slotBadge: "固定插槽", passiveBadge: "持有即生效", slotReplaced: "{name}已安装到{slot}。", slotRemoved: "{name}已从固定插槽收回。", slotStove: "料理台", slotCounterTop: "台面小物", slotMenuBoard: "菜单牌", slotTentLight: "灯光组", slotCatPet: "猫咪休息处", slotDogPet: "狗狗休息处", slotOutdoor: "摊位外装饰", slotIncompatible: "请选择发光的兼容插槽。",
    decorBack: "返回", furnitureMode: "家具模式", moveMode: "移动模式", deleteMode: "删除模式", tileMode: "地板编辑", rotateFurniture: "旋转", cameraReset: "重置视角", floorPalette: "地板样式", floorWood: "木地板", floorLight: "亮色瓷砖", floorDark: "深色瓷砖", moveModeHelp: "点击家具后，再点击新的地板位置进行移动。", deleteModeHelp: "点击要收回背包的家具。", floorModeHelp: "选择地板样式后点击要更换的格子。", deleteFurnitureConfirm: "要把{name}收回背包吗？", furnitureDeleted: "{name}已收回背包。",
    shopEyebrow: "夜市装饰商店", gachaTitle: "好运装饰机", gachaSubtitle: "抽取装饰，还有机会获得摊位扩建券！",
    readyToDraw: "好运正在等你", drawOnce: "抽取一次", drawTen: "抽取十次", drawTenResult: "十连抽完成：{summary}", drawProgress: "正在公开 {current}/10",
    commonOdds: "普通 70%", rareOdds: "稀有 20%", epicOdds: "史诗 5%", legendaryOdds: "传说 3%", expansionOdds: "扩建券 2%",
    catalogTitle: "装饰图鉴 · 119种", catalogHelp: "基础37种 · 装扮分数可解锁82种",
    closingEyebrow: "今晚的夜市", closingTitle: "本日结算完成！", completedOrders: "份订单已完成", nextDay: "开始下一天",
    matchIncome: "连线收入", orderIncome: "订单收入", petIncome: "宠物收入", overtimeIncome: "加时奖励", failedOrderPenalty: "超时订单罚款", passiveIncome: "持有被动奖励", settlementTotal: "本日结算",
    sceneWelcome: "为客人完成美味订单吧！", stallName: "一口小摊", stallNameLabel: "摊位名称", stallNamePlaceholder: "输入摊位名称", saveName: "保存名称", nameSaved: "摊位名称已保存！", nameWarning: "摊位名称首次设置后将无法免费修改。确定保存吗？", nameLocked: "名称已锁定，需要摊位改名券。", nameTicket: "摊位改名券", nameTicketHelp: "解除一次名称锁定", buyNameTicket: "购买", nameTicketBought: "已购买摊位改名券！", soundOn: "开启音效", soundOff: "关闭音效",
    cityIncomeEyebrow: "离线城市收益", cityIncomeRate: "现实时间每小时积累300元，最多3000元", cityWallet: "城市资金", claimIncome: "领取收益", citySelectEyebrow: "经营地图", citySelectTitle: "选择夜市城市", cityLocked: "{price}元 · 营业{used}/{required}次", cityUnlock: "解锁城市", cityEnter: "前往经营", cityActive: "正在经营", cityUnlocked: "{city}已解锁！", incomeClaimed: "领取了{amount}元城市收益。", cityTabUnlocked: "史诗图鉴完成，城市功能已开放！",
    common: "普通", rare: "稀有", epic: "史诗", legendary: "传说", expansion: "扩建券", buy: "购买 {price} 🪙",
    install: "摆放", remove: "收回", installed: "已摆放", sell: "出售 {price} 🪙", owned: "拥有 ×{count}",
    emptyBag: "背包还是空的。去 SHOP 抽取第一件装饰吧！",
    slotHint: "装扮分数再提高 {points}，可解锁第 {slot} 个摆放位。", allSlots: "所有摆放位已解锁。",
    slotUnlocked: "第 {slot} 个摆放位已解锁！", stoveSlots: "料理台 {count}格", stoveSlotUnlocked: "装扮分数达到{score}！新增1个料理台位置。", noSlot: "摆放位已满，提高装扮分数可解锁新位置。",
    capacityHint: "再提高 {points} 分：普通+5、稀有+3、史诗+2", capacityAll: "已完成1000分全部容量解锁。", capacityUnlocked: "达到{score}分！普通+5、稀有+3、史诗+2已解锁。", legendaryCapacity: "达到{score}分！传说摆放位+1。", expansionSlots: "扩建自由摆放位 +{slots}", expansionCustomers: "同时接待客人 {count}名", placedCount: "已摆放 ×{count}", legendaryLocked: "传说摆放位将在500分解锁。",
    itemUnlockHint: "再提高 {points} 分：解锁普通5件、稀有3件、史诗2件", allItemsUnlocked: "已解锁1000分以内的全部新装饰。", newItemsUnlocked: "达到{score}分！新的普通5件、稀有3件、史诗2件已开放！", newLegendaryUnlocked: "达到{score}分！新的传说装饰已开放！", lockedAt: "{score}分解锁",
    unlockProgress: "下一阶段 {current}/{target}分",
    match: "美味连线！+{coins} 🪙", chain: "{chain}连击！+{coins} 🪙", orderComplete: "订单完成！+{coins} 🪙",
    orderFailed: "客人等太久离开了！当日结算 −{coins} 🪙",
    lastCall: "最后10秒停止接收新订单！",
    invalidMove: "这里无法连线", autoShuffle: "没有可移动组合，自动洗牌！", paidShuffle: "食材重新洗牌！",
    notEnoughCoins: "金币不足", purchaseSuccess: "已购买 {name}！", itemInstalled: "已摆放 {name}", itemRemoved: "{name} 已收回背包", itemSold: "已出售 {name}，+{coins} 🪙",
    drawResult: "抽到了{rarity}装饰：{name}！", expansionResult: "抽到了摊位扩建券！摊位变大了。", expansionMax: "摊位已扩至最大，扩建券兑换为 100 🪙。",
    expansionStatus: "摊位等级 {level} / 4 · 订单收益 +{bonus}%", resetDone: "摊位收藏已重新开始。",
    effectIncome: "效果：订单收益 +20%", effectTime15: "效果：每日营业时间 +15秒", effectHint: "效果：每天可使用提示1次",
    effectCat: "效果：每20～60秒带回奖励 · 不占摆放位", effectDog: "效果：每20～60秒寻找奖励 · 不占摆放位", effectTime30: "效果：每日营业时间 +30秒", effectTicketCap: "效果：营业券上限从5提高到7",
    effectRareOrder: "效果：订单收益 +3%", effectRareMatch: "效果：连线收益 +10%", effectRareTime: "效果：每日营业时间 +3秒",
    effectEpicOrder: "效果：订单收益 +8%", effectEpicMatch: "效果：连线收益 +15%", effectEpicTime: "效果：每日营业时间 +10秒", effectEpicOvertime: "效果：加时收益 +25%",
    effectLegendaryOrder: "效果：订单收益 +25%", effectLegendaryMatch: "效果：连线收益 +30%", effectLegendaryTime: "效果：每日营业时间 +20秒", effectPassiveSettlement: "持有被动：最终结算收益 +5%", effectCatBowl: "持有被动：猫咪带回紫色宝箱的概率20%→35%，抓到老鼠10%→5%", effectDogBowl: "持有被动：狗狗带回金色宝箱的概率20%→30%，25金币概率10%→15%",
    scoreChestEyebrow: "装扮分数限定", scoreChestTitle: "阶段专属宝箱", scoreChestHelp: "每个宝箱只会抽出该分数阶段解锁的装饰", scoreChestName: "{score}分宝箱", scoreChestPool: "普通70% · 稀有20% · 史诗{epic}%{legendary}", scoreChestLegendaryOdds: " · 传说3%", scoreChestDraw: "抽取一次 · {price} 🪙", scoreChestEmpty: "达到300装扮分后，阶段专属宝箱会在这里开放。", scoreChestResult: "{score}分宝箱：获得{name}！",
    backgroundEyebrow: "豪华场景", backgroundTitle: "夜市背景商店", backgroundHelp: "用城市资金购买，背景可在每座城市分别装备", backgroundDefault: "经典夜市", backgroundWater: "水之都市", backgroundFire: "火之都市", backgroundOwned: "已拥有", backgroundEquip: "装备", backgroundEquipped: "使用中", backgroundBuy: "购买 · 10000元", backgroundBought: "已购买并装备{name}！", backgroundEquippedMessage: "已装备{name}。",
    expansionTicketShop: "摊位扩建券", expansionTicketPriceRule: "每次购买后，下次价格上涨3000元", expansionTicketBuy: "购买 · {price}元", expansionTicketMaxed: "已扩建至最大", expansionTicketBought: "扩建完成！下一张扩建券价格为{price}元。",
    couponTitle: "兑换码", couponHelp: "每个兑换码只能使用一次", couponPlaceholder: "输入兑换码", couponRedeem: "兑换", couponSuccess: "兑换成功！获得20000元城市资金。", couponCoinSuccess: "兑换成功！获得20000枚金币。", couponAdminSuccess: "管理员兑换码已启用！所有道具、背景和城市均已解锁。", couponUsed: "这个兑换码已经使用过了。", couponInvalid: "无效的兑换码。",
    boosterEpicName: "紫光概率宝箱", boosterEpicDesc: "下次抽取：普通-5%，史诗+5%", boosterLegendaryName: "金光概率宝箱", boosterLegendaryDesc: "下次抽取：普通-3%，传说+3%",
    boosterUse: "用于下次抽取", boosterNone: "未使用概率宝箱", boosterEpicActive: "紫光宝箱生效：史诗概率+5%", boosterLegendaryActive: "金光宝箱生效：传说概率+3%",
    petCatCoin: "寻宝猫带回了10枚待结算金币！", petCatChest: "寻宝猫带回了紫光概率宝箱！", petCatRat: "寻宝猫抓来一只老鼠……什么也没有。",
    petDogCoin: "幸运犬找到7枚待结算金币！", petDogChest: "幸运犬找到了金光概率宝箱！", petDogJackpot: "幸运犬找到了25枚待结算金币！",
    catLoot: "猫咪奖励", dogLoot: "狗狗奖励", catLootHelp: "一次领取寻宝猫带回的全部奖励", dogLootHelp: "一次领取幸运犬带回的全部奖励", petCatStored: "寻宝猫带回了新东西！去装扮页面领取吧。", petDogStored: "幸运犬带回了新东西！去装扮页面领取吧。", petLootEmpty: "还没有未领取的宠物奖励。", petCatLootTitle: "寻宝猫带回的奖励", petDogLootTitle: "幸运犬带回的奖励", petLootCollected: "一次领取了{count}个奖励。", petLootCoins: "金币 +{amount}", petLootEpicChest: "紫光概率宝箱", petLootLegendaryChest: "金光概率宝箱", petLootRat: "老鼠 · 没有奖励", petLootClose: "确认",
    ingredients: { skewer: "烤串", noodle: "面", dumpling: "饺子", fishcake: "鱼糕", tteok: "甜团", fruit: "草莓" },
    customers: { worker: "下班的小敏", skewerFan: "烤串达人", sweetGuest: "甜食小雨", lateGuest: "夜宵阿俊", walker: "散步的小苏", regular: "夜市常客" },
  },
  ko: {
    documentTitle: "야시장 한 입",
    brandEyebrow: "오늘의 야시장", gameTitle: "야시장 한 입",
    dayReady: "오늘 장사를 시작할까요?", ticketGuide: "장사를 시작할 때 장사권 1개 사용", startBusiness: "장사 시작", noTickets: "장사권이 부족해요. 충전 후 시작하세요.", ticketsFull: "장사권이 가득 찼어요",
    languageTooltip: "언어 변경", coinTooltip: "보유 코인", timerTooltip: "남은 장사 시간(초)", earningsTooltip: "오늘 정산 예정 수익", ticketTooltip: "남은 장사권 / 최대 장사권",
    menuGame: "게임", menuDecorate: "포차 꾸미기", menuShop: "SHOP", menuCity: "도시",
    hungryGuests: "지금 배고픈 손님", ordersTitle: "완성 주문", matchTip: "3개 이상 맞추기", memoryTip: "같은 카드 2장 찾기", grillTip: "6구 불판 온도 조절",
    shuffle: "판 섞기", useHint: "힌트 사용", settleNow: "지금 정산", dragHelp: "재료를 원하는 방향으로 <b>드래그</b>해 3개 이상 연결하세요.", memoryHelp: "식재료 위치를 기억한 뒤 같은 카드 두 장을 차례로 선택하세요.", memoryBoardLabel: "식재료 기억 카드 36장", memoryHiddenCard: "뒤집힌 식재료 카드", memoryPreview: "외우는 시간 {seconds}초", memoryGo: "이제 카드가 뒤집혔어요! 같은 식재료를 찾아보세요!", memoryMatch: "짝 맞추기 성공! +{coins}코인", memoryMismatch: "다른 카드예요. 다시 찾아보세요!", memoryBoardClear: "18쌍을 모두 찾았어요!", memoryRevealAll: "힌트 시간! 전체 카드를 2초 동안 공개합니다!", memoryRevealEnd: "카드가 다시 뒤집혔어요!", grillHelp: "화력을 조절하고 한 번 이상 뒤집은 뒤 초록색 구간에서 음식을 내세요.", grillBoardLabel: "6구 불판 온도 게임", grillWelcome: "시안 불판 영업 시작! 화력을 조절해 음식이 타기 전에 내세요.", grillHeat: "화력", grillFlip: "뒤집기", grillServe: "내기", grillCooking: "익는 중", grillReady: "지금이 완벽!", grillHot: "곧 타요!", grillCooling: "새 음식 준비 중", grillNeedsFlip: "먼저 한 번 뒤집어야 해요!", grillPerfect: "완벽 조리! +{coins}코인 · {combo}콤보", grillUndercooked: "아직 덜 익었어요! 정산 -{coins}코인", grillOvercooked: "너무 익었어요! 정산 -{coins}코인", grillBurned: "음식이 타버렸어요! 정산 -{coins}코인", grillHint: "안전 화력 발동! 모든 불판을 약불로 낮췄어요.", relayTip: "순서대로 주문 릴레이", relayHelp: "현재 쟁반을 보고 왼쪽부터 재료를 순서대로 누르세요. 연속 성공하면 콤보 보상이 커집니다.", relayBoardLabel: "광저우 주문 릴레이 게임", relayWelcome: "광저우 주문 릴레이 시작! 쟁반의 재료를 순서대로 담으세요.", relayCurrent: "현재 쟁반", relayNext: "다음 주문", relayProgress: "입력 진행", relayPerfect: "릴레이 성공! +{coins}코인 · {combo}콤보", relayMiss: "순서가 틀렸어요! 정산 -{coins}코인", relayHint: "힌트: 다음 재료는 {name}", soundTip: "소리를 듣고 재료 순서 추리", soundHelp: "전체 소리를 들은 뒤 같은 순서로 재료를 누르세요. 소리는 무료로 다시 들을 수 있습니다.", soundBoardLabel: "하얼빈 소리 추리 게임", soundWelcome: "하얼빈 소리 추리 시작! 식재료 소리를 잘 들어보세요.", soundPlay: "소리 재생", soundReplay: "다시 듣기", soundListening: "재생 중…", soundChoose: "들은 순서대로 선택", soundRound: "{round}라운드 · 소리 {count}개", soundPerfect: "소리 추리 성공! +{coins}코인 · {combo}콤보", soundMiss: "소리 순서가 틀렸어요! 정산 -{coins}코인", soundHint: "힌트: 다음 재료는 {name}",
    decorateEyebrow: "나의 컬렉션", decorateTitle: "야시장 포차 꾸미기",
    reset: "처음부터", resetConfirm: "모든 게임 진행 상황과 쿠폰 사용 기록이 초기화됩니다. 정말 처음부터 시작하시겠습니까?", resetLayout: "배치 초기화", resetLayoutConfirm: "현재 도시의 가구·고정 슬롯·바닥 배치만 초기화합니다. 코인·가방·해금·도시 진행은 유지됩니다. 초기화할까요?", resetLayoutDone: "현재 도시 배치를 초기화하고 모든 장식을 가방으로 돌려보냈어요.", myBag: "나의 장식 가방", bagHelp: "가방을 열고 배치할 장식을 골라보세요",
    ownedItems: "현재 가진 장식", inventoryHelp: "가방에서 가구를 고른 뒤 위쪽 바닥 칸을 눌러 배치하세요.",
    sortScore: "꾸밈 점수순", sortRarity: "등급순", sortName: "이름순", sortPrice: "가격순", sortEffect: "능력순", sortAcquired: "최근 획득순", groupNone: "그룹 없음", groupRarity: "등급별 묶기", filterAll: "전체 등급",
    placementNone: "가방에서 가구를 고른 뒤 바닥 칸을 눌러 배치하세요", placementHelp: "빈 바닥을 드래그해 이동하고 휠이나 ± 버튼으로 확대하세요", placementSelected: "배치할 가구: {name}", placementMoving: "이동할 가구: {name}", cancelPlacement: "선택 취소", slotOccupied: "이미 가구가 놓인 자리예요.", chooseFloorCell: "위쪽 바닥에서 배치할 칸을 골라주세요.", placementBlocked: "가구가 지도 밖으로 나가거나 다른 가구와 겹쳐요.", rotationBlocked: "이 자리에서는 회전할 공간이 부족해요.", slotPlacementSelected: "고정 장식 교체: {name}", slotPlacementHelp: "화면에서 빛나는 호환 슬롯만 눌러 교체할 수 있어요", slotBadge: "고정 슬롯", passiveBadge: "보유 즉시 적용", slotReplaced: "{slot}에 {name}을(를) 설치했어요.", slotRemoved: "{name}을(를) 고정 슬롯에서 회수했어요.", slotStove: "조리대", slotCounterTop: "카운터 소품", slotMenuBoard: "메뉴판", slotTentLight: "조명 세트", slotCatPet: "고양이 자리", slotDogPet: "강아지 자리", slotOutdoor: "포차 외부 장식", slotIncompatible: "빛나는 호환 슬롯을 선택해주세요.",
    decorBack: "뒤로", furnitureMode: "가구 모드", moveMode: "이동 모드", deleteMode: "삭제 모드", tileMode: "바닥 편집", rotateFurniture: "회전", cameraReset: "시점 초기화", floorPalette: "바닥 스타일", floorWood: "나무 바닥", floorLight: "밝은 타일", floorDark: "어두운 타일", moveModeHelp: "가구를 누른 뒤 새 바닥 위치를 누르면 이동합니다.", deleteModeHelp: "가방으로 회수할 가구를 눌러주세요.", floorModeHelp: "바닥 스타일을 고른 뒤 바꿀 칸을 눌러주세요.", deleteFurnitureConfirm: "{name}을(를) 가방으로 회수할까요?", furnitureDeleted: "{name}을(를) 가방으로 회수했어요.",
    shopEyebrow: "야시장 장식 상점", gachaTitle: "행운의 장식 뽑기", gachaSubtitle: "장식과 포차 확장권을 뽑아보세요!",
    readyToDraw: "행운이 기다리고 있어요", drawOnce: "1회 뽑기", drawTen: "10회 뽑기", drawTenResult: "10회 뽑기 완료: {summary}", drawProgress: "결과 공개 중 {current}/10",
    commonOdds: "일반 70%", rareOdds: "레어 20%", epicOdds: "에픽 5%", legendaryOdds: "레전더리 3%", expansionOdds: "확장권 2%",
    catalogTitle: "장식 도감 · 119종", catalogHelp: "기본37종 · 꾸밈 점수로 82종 추가 해금",
    closingEyebrow: "오늘 야시장은", closingTitle: "오늘의 정산 완료!", completedOrders: "개의 주문을 완성했어요", nextDay: "다음 날 장사 시작",
    matchIncome: "매치 수익", orderIncome: "주문 수익", petIncome: "펫 수익", overtimeIncome: "연장 보너스", failedOrderPenalty: "시간 초과 주문 벌금", passiveIncome: "보유 패시브 보너스", settlementTotal: "오늘의 총 정산",
    sceneWelcome: "손님들의 주문을 맛있게 채워주세요!", stallName: "한 입 포차", stallNameLabel: "포차 이름", stallNamePlaceholder: "포차 이름 입력", saveName: "이름 저장", nameSaved: "포차 이름을 저장했어요!", nameWarning: "포차 이름은 최초 설정 후 무료로 바꿀 수 없습니다. 저장할까요?", nameLocked: "이름이 잠겼어요. 포차 이름 변경권이 필요합니다.", nameTicket: "포차 이름 변경권", nameTicketHelp: "잠긴 이름을 한 번 변경", buyNameTicket: "구매", nameTicketBought: "포차 이름 변경권 구매 완료!", soundOn: "효과음 켜기", soundOff: "효과음 끄기",
    cityIncomeEyebrow: "오프라인 도시 수익", cityIncomeRate: "실제 시간당 300원, 최대 3000원 적립", cityWallet: "도시 자금", claimIncome: "수익 받기", citySelectEyebrow: "장사 지도", citySelectTitle: "야시장 도시 선택", cityLocked: "{price}원 · 장사 {used}/{required}회", cityUnlock: "도시 해금", cityEnter: "장사하러 가기", cityActive: "현재 장사 중", cityUnlocked: "{city} 해금 완료!", incomeClaimed: "도시 수익 {amount}원을 받았어요.", cityTabUnlocked: "에픽 도감 완성! 도시 기능이 열렸어요!",
    common: "일반", rare: "레어", epic: "에픽", legendary: "레전더리", expansion: "확장권", buy: "구매 {price} 🪙",
    install: "배치", remove: "회수", installed: "배치 중", sell: "판매 {price} 🪙", owned: "보유 ×{count}",
    emptyBag: "가방이 비어 있어요. SHOP에서 첫 장식을 뽑아보세요!",
    slotHint: "꾸밈 점수 {points}점을 더 올리면 {slot}번째 배치 칸이 열려요.", allSlots: "모든 배치 칸을 해금했어요.",
    slotUnlocked: "{slot}번째 장식 배치 칸 해금!", stoveSlots: "조리대 {count}칸", stoveSlotUnlocked: "꾸밈 점수 {score}점 달성! 조리대 자리가 1칸 늘었어요.", noSlot: "배치 칸이 가득 찼어요. 꾸밈 점수를 높여 새 칸을 해금하세요.",
    capacityHint: "{points}점 더 올리면 일반+5·레어+3·에픽+2", capacityAll: "1000점 배치 한도를 모두 해금했어요.", capacityUnlocked: "{score}점 달성! 일반+5·레어+3·에픽+2 해금!", legendaryCapacity: "{score}점 달성! 레전더리 배치 칸 +1!", expansionSlots: "확장 자유 배치 칸 +{slots}", expansionCustomers: "동시 손님 {count}명", placedCount: "배치 ×{count}", legendaryLocked: "레전더리 배치 칸은 500점에 해금돼요.",
    itemUnlockHint: "{points}점 더 올리면 신규 일반5·레어3·에픽2 해금", allItemsUnlocked: "1000점까지 모든 신규 장식을 해금했어요.", newItemsUnlocked: "{score}점 달성! 신규 일반5·레어3·에픽2 개방!", newLegendaryUnlocked: "{score}점 달성! 신규 레전더리 장식 개방!", lockedAt: "{score}점 해금",
    unlockProgress: "다음 단계 {current}/{target}점",
    match: "맛있는 매치! +{coins} 🪙", chain: "{chain} 연쇄! +{coins} 🪙", orderComplete: "주문 완성! +{coins} 🪙",
    orderFailed: "손님이 오래 기다리다 떠났어요! 당일 정산 −{coins} 🪙",
    lastCall: "마지막 10초! 이제 새로운 주문은 받지 않아요.",
    invalidMove: "여기서는 매치할 수 없어요", autoShuffle: "가능한 이동이 없어 자동으로 섞었어요!", paidShuffle: "새 재료로 판을 섞었어요!",
    notEnoughCoins: "코인이 부족해요", purchaseSuccess: "{name} 구매 완료!", itemInstalled: "{name} 배치 완료", itemRemoved: "{name}을(를) 가방에 넣었어요", itemSold: "{name} 판매 완료! +{coins} 🪙",
    drawResult: "{rarity} 장식 {name} 획득!", expansionResult: "포차 확장권 획득! 포차가 커졌어요.", expansionMax: "포차가 최대 크기라 확장권을 100 🪙로 바꿨어요.",
    expansionStatus: "포차 크기 {level} / 4 · 주문 수익 +{bonus}%", resetDone: "포차 컬렉션을 처음부터 시작했어요.",
    effectIncome: "효과: 주문 수익 +20%", effectTime15: "효과: 하루 장사 시간 +15초", effectHint: "효과: 하루 1회 힌트 사용",
    effectCat: "효과: 20~60초마다 보상 물어오기 · 배치 자리 미사용", effectDog: "효과: 20~60초마다 보상 찾아오기 · 배치 자리 미사용", effectTime30: "효과: 하루 장사 시간 +30초", effectTicketCap: "효과: 장사권 최대치를 5에서 7로 증가",
    effectRareOrder: "효과: 주문 수익 +3%", effectRareMatch: "효과: 매치 수익 +10%", effectRareTime: "효과: 하루 장사 시간 +3초",
    effectEpicOrder: "효과: 주문 수익 +8%", effectEpicMatch: "효과: 매치 수익 +15%", effectEpicTime: "효과: 하루 장사 시간 +10초", effectEpicOvertime: "효과: 연장 수익 +25%",
    effectLegendaryOrder: "효과: 주문 수익 +25%", effectLegendaryMatch: "효과: 매치 수익 +30%", effectLegendaryTime: "효과: 하루 장사 시간 +20초", effectPassiveSettlement: "보유 패시브: 최종 정산 수익 +5%", effectCatBowl: "보유 패시브: 고양이 보라 상자 20%→35% · 쥐 10%→5%", effectDogBowl: "보유 패시브: 강아지 황금 상자 20%→30% · 25코인 10%→15%",
    scoreChestEyebrow: "꾸밈 점수 한정", scoreChestTitle: "단계 전용 상자", scoreChestHelp: "각 상자에서는 해당 점수 단계에서 해금된 장식만 나옵니다", scoreChestName: "{score}점 상자", scoreChestPool: "일반70% · 레어20% · 에픽{epic}%{legendary}", scoreChestLegendaryOdds: " · 레전더리3%", scoreChestDraw: "1회 뽑기 · {price} 🪙", scoreChestEmpty: "꾸밈 점수 300점을 달성하면 단계 전용 상자가 열립니다.", scoreChestResult: "{score}점 상자에서 {name} 획득!",
    backgroundEyebrow: "화려한 장사 무대", backgroundTitle: "야시장 배경 상점", backgroundHelp: "도시 자금으로 구매하고 도시마다 따로 장착할 수 있어요", backgroundDefault: "클래식 야시장", backgroundWater: "물의 도시", backgroundFire: "불의 도시", backgroundOwned: "보유 중", backgroundEquip: "장착", backgroundEquipped: "사용 중", backgroundBuy: "구매 · 10000원", backgroundBought: "{name} 배경을 구매하고 장착했어요!", backgroundEquippedMessage: "{name} 배경을 장착했어요.",
    expansionTicketShop: "포차 확장권", expansionTicketPriceRule: "구매할 때마다 다음 가격이 3000원 올라가요", expansionTicketBuy: "구매 · {price}원", expansionTicketMaxed: "최대 확장 완료", expansionTicketBought: "확장 완료! 다음 확장권은 {price}원이에요.",
    couponTitle: "쿠폰", couponHelp: "쿠폰 코드는 한 번만 사용할 수 있어요", couponPlaceholder: "쿠폰 코드 입력", couponRedeem: "사용", couponSuccess: "쿠폰 사용 완료! 도시 자금 20000원을 받았어요.", couponCoinSuccess: "쿠폰 사용 완료! 보유 코인 20000개를 받았어요.", couponAdminSuccess: "관리자 쿠폰 적용 완료! 모든 아이템·배경·도시가 개방됐어요.", couponUsed: "이미 사용한 쿠폰 코드예요.", couponInvalid: "올바르지 않은 쿠폰 코드예요.",
    boosterEpicName: "보라 확률 상자", boosterEpicDesc: "다음 뽑기 일반 -5%, 에픽 +5%", boosterLegendaryName: "황금 확률 상자", boosterLegendaryDesc: "다음 뽑기 일반 -3%, 레전더리 +3%",
    boosterUse: "다음 뽑기에 사용", boosterNone: "사용 중인 확률 상자 없음", boosterEpicActive: "보라 상자 적용: 에픽 확률 +5%", boosterLegendaryActive: "황금 상자 적용: 레전더리 확률 +3%",
    petCatCoin: "보물 고양이가 정산 예정 10코인을 물어왔어요!", petCatChest: "보물 고양이가 보라 확률 상자를 물어왔어요!", petCatRat: "보물 고양이가 쥐를 물어왔어요… 꽝!",
    petDogCoin: "행운 강아지가 정산 예정 7코인을 찾았어요!", petDogChest: "행운 강아지가 황금 확률 상자를 찾았어요!", petDogJackpot: "행운 강아지가 정산 예정 25코인을 찾았어요!",
    catLoot: "고양이 보상", dogLoot: "강아지 보상", catLootHelp: "보물 고양이가 물어온 보상 모두 받기", dogLootHelp: "행운 강아지가 찾아온 보상 모두 받기", petCatStored: "고양이가 새 물건을 물어왔어요! 꾸미기에서 받아보세요.", petDogStored: "강아지가 새 물건을 찾아왔어요! 꾸미기에서 받아보세요.", petLootEmpty: "아직 받지 않은 펫 보상이 없어요.", petCatLootTitle: "고양이가 물어온 보상", petDogLootTitle: "강아지가 찾아온 보상", petLootCollected: "보상 {count}개를 한 번에 받았어요.", petLootCoins: "코인 +{amount}", petLootEpicChest: "보라 확률 상자", petLootLegendaryChest: "황금 확률 상자", petLootRat: "쥐 · 꽝", petLootClose: "확인",
    ingredients: { skewer: "꼬치", noodle: "면", dumpling: "만두", fishcake: "어묵", tteok: "떡", fruit: "딸기" },
    customers: { worker: "퇴근한 민지", skewerFan: "꼬치 마니아", sweetGuest: "달콤한 유나", lateGuest: "야식러 준호", walker: "산책 중 소라", regular: "시장 단골" },
  },
  en: {
    documentTitle: "Night Market Bites",
    brandEyebrow: "Tonight's market", gameTitle: "Night Market Bites",
    dayReady: "Ready to open the stall?", ticketGuide: "Starting a day uses 1 Business Ticket", startBusiness: "Start business", noTickets: "No Business Tickets. Wait for one to refill.", ticketsFull: "Business Tickets are full",
    languageTooltip: "Change language", coinTooltip: "Coins owned", timerTooltip: "Business time remaining (seconds)", earningsTooltip: "Today's pending settlement", ticketTooltip: "Business Tickets remaining / maximum",
    menuGame: "Game", menuDecorate: "Decorate", menuShop: "SHOP", menuCity: "Cities",
    hungryGuests: "Hungry guests", ordersTitle: "Orders served", matchTip: "Match 3 or more", memoryTip: "Find two matching cards", grillTip: "Control six grills",
    shuffle: "Shuffle board", useHint: "Use hint", settleNow: "Settle now", dragHelp: "<b>Drag</b> an ingredient toward a neighbor to match 3 or more.", memoryHelp: "Memorize the ingredients, then choose two matching cards.", memoryBoardLabel: "36 ingredient memory cards", memoryHiddenCard: "Face-down ingredient card", memoryPreview: "Memorize: {seconds}s remaining", memoryGo: "Cards are hidden—find the matching ingredients!", memoryMatch: "Pair matched! +{coins} coins", memoryMismatch: "Those cards differ. Try again!", memoryBoardClear: "All 18 pairs found!", memoryRevealAll: "Hint time! All cards are revealed for 2 seconds!", memoryRevealEnd: "The cards are face down again!", grillHelp: "Adjust the heat, flip each food at least once, and serve inside the green zone.", grillBoardLabel: "Six-grill temperature game", grillWelcome: "Xi’an grill service started! Control the heat and serve before food burns.", grillHeat: "Heat", grillFlip: "Flip", grillServe: "Serve", grillCooking: "Cooking", grillReady: "Perfect timing!", grillHot: "Almost burned!", grillCooling: "Preparing new food", grillNeedsFlip: "Flip it at least once first!", grillPerfect: "Perfect serve! +{coins} coins · {combo} combo", grillUndercooked: "Undercooked! Settlement -{coins} coins", grillOvercooked: "Overcooked! Settlement -{coins} coins", grillBurned: "The food burned! Settlement -{coins} coins", grillHint: "Safe heat activated! Every grill was lowered to low heat.", relayTip: "Complete the order relay", relayHelp: "Read the current tray and select its ingredients from left to right. Consecutive clears raise the combo reward.", relayBoardLabel: "Guangzhou order relay game", relayWelcome: "Guangzhou order relay started! Pack every tray in the shown order.", relayCurrent: "Current tray", relayNext: "Next orders", relayProgress: "Input progress", relayPerfect: "Relay clear! +{coins} coins · {combo} combo", relayMiss: "Wrong order! Settlement -{coins} coins", relayHint: "Hint: the next ingredient is {name}", soundTip: "Deduce the ingredient sound order", soundHelp: "Listen to the full sequence, then select ingredients in the same order. Replays are free.", soundBoardLabel: "Harbin sound deduction game", soundWelcome: "Harbin sound deduction started! Listen closely to each ingredient.", soundPlay: "Play sounds", soundReplay: "Replay", soundListening: "Playing…", soundChoose: "Select in the heard order", soundRound: "Round {round} · {count} sounds", soundPerfect: "Sound sequence clear! +{coins} coins · {combo} combo", soundMiss: "Wrong sound order! Settlement -{coins} coins", soundHint: "Hint: the next ingredient is {name}",
    decorateEyebrow: "My collection", decorateTitle: "Decorate the Stall",
    reset: "Reset progress", resetConfirm: "All game progress and coupon redemption history will be erased. Start over?", resetLayout: "Reset layout", resetLayoutConfirm: "Only furniture, fixed slots, and floor placement in the current city will reset. Coins, inventory, unlocks, and city progress stay. Continue?", resetLayoutDone: "The current city layout was reset and all decorations returned to the bag.", myBag: "My Decor Bag", bagHelp: "Open the bag and choose an item to place",
    ownedItems: "Owned decorations", inventoryHelp: "Choose furniture in the bag, then click a floor tile above to place it.",
    sortScore: "Decor score", sortRarity: "Rarity", sortName: "Name", sortPrice: "Price", sortEffect: "Ability", sortAcquired: "Newest acquired", groupNone: "No grouping", groupRarity: "Group by rarity", filterAll: "All rarities",
    placementNone: "Choose furniture in the bag, then click a floor tile to place it", placementHelp: "Drag empty floor to pan; use the wheel or ± buttons to zoom", placementSelected: "Placing: {name}", placementMoving: "Moving: {name}", cancelPlacement: "Cancel selection", slotOccupied: "Furniture already occupies that tile.", chooseFloorCell: "Choose a floor tile above for this furniture.", placementBlocked: "The furniture would leave the map or overlap another item.", rotationBlocked: "There is not enough room to rotate here.", slotPlacementSelected: "Replacing fixed decor: {name}", slotPlacementHelp: "Only glowing compatible slots in the canvas can be replaced", slotBadge: "Fixed slot", passiveBadge: "Active when owned", slotReplaced: "Installed {name} in {slot}.", slotRemoved: "Returned {name} from its fixed slot.", slotStove: "Cooking counter", slotCounterTop: "Counter accessory", slotMenuBoard: "Menu board", slotTentLight: "Lighting set", slotCatPet: "Cat spot", slotDogPet: "Dog spot", slotOutdoor: "Outdoor decor", slotIncompatible: "Choose a glowing compatible slot.",
    decorBack: "Back", furnitureMode: "Furniture", moveMode: "Move", deleteMode: "Delete", tileMode: "Floor edit", rotateFurniture: "Rotate", cameraReset: "Reset camera", floorPalette: "Floor style", floorWood: "Wood", floorLight: "Light tile", floorDark: "Dark tile", moveModeHelp: "Select furniture, then select its new floor position.", deleteModeHelp: "Select furniture to return it to the bag.", floorModeHelp: "Choose a floor style, then select tiles to repaint.", deleteFurnitureConfirm: "Return {name} to the bag?", furnitureDeleted: "Returned {name} to the bag.",
    shopEyebrow: "Night Market Decor Shop", gachaTitle: "Lucky Decor Machine", gachaSubtitle: "Draw decorations and stall expansion tickets!",
    readyToDraw: "Good luck is waiting", drawOnce: "Draw once", drawTen: "Draw 10", drawTenResult: "10 draws complete: {summary}", drawProgress: "Revealing {current}/10",
    commonOdds: "Common 70%", rareOdds: "Rare 20%", epicOdds: "Epic 5%", legendaryOdds: "Legendary 3%", expansionOdds: "Expansion 2%",
    catalogTitle: "Decor Catalog · 119", catalogHelp: "37 base items · 82 score-unlock items",
    closingEyebrow: "Tonight's market", closingTitle: "Daily settlement complete!", completedOrders: "orders completed", nextDay: "Start the next day",
    matchIncome: "Match income", orderIncome: "Order income", petIncome: "Pet income", overtimeIncome: "Overtime bonus", failedOrderPenalty: "Timed-out order penalties", passiveIncome: "Owned passive bonus", settlementTotal: "Daily settlement",
    sceneWelcome: "Fill the guests' delicious orders!", stallName: "One Bite Stall", stallNameLabel: "Stall name", stallNamePlaceholder: "Enter a stall name", saveName: "Save name", nameSaved: "Stall name saved!", nameWarning: "The stall name cannot be changed for free after this first save. Continue?", nameLocked: "The name is locked. A Stall Rename Ticket is required.", nameTicket: "Stall Rename Ticket", nameTicketHelp: "Unlock one name change", buyNameTicket: "Buy", nameTicketBought: "Stall Rename Ticket purchased!", soundOn: "Turn sound on", soundOff: "Turn sound off",
    cityIncomeEyebrow: "Offline city income", cityIncomeRate: "Earn 300 per real hour, up to 3000", cityWallet: "City funds", claimIncome: "Claim income", citySelectEyebrow: "Business map", citySelectTitle: "Choose a night market city", cityLocked: "{price} · Business {used}/{required}", cityUnlock: "Unlock city", cityEnter: "Run this city", cityActive: "Current city", cityUnlocked: "{city} unlocked!", incomeClaimed: "Claimed {amount} city funds.", cityTabUnlocked: "Epic collection complete! Cities unlocked!",
    common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary", expansion: "Expansion", buy: "Buy {price} 🪙",
    install: "Place", remove: "Store", installed: "Placed", sell: "Sell {price} 🪙", owned: "Owned ×{count}",
    emptyBag: "Your bag is empty. Draw your first decoration in the SHOP!",
    slotHint: "Earn {points} more decor score to unlock placement slot {slot}.", allSlots: "All placement slots are unlocked.",
    slotUnlocked: "Placement slot {slot} unlocked!", stoveSlots: "Cooking counters: {count}", stoveSlotUnlocked: "Reached {score} decor score! One cooking-counter slot was added.", noSlot: "All slots are full. Raise your decor score to unlock another.",
    capacityHint: "{points} more score: Common +5, Rare +3, Epic +2", capacityAll: "All capacity upgrades through 1000 score are unlocked.", capacityUnlocked: "Reached {score}! Common +5, Rare +3, Epic +2 unlocked.", legendaryCapacity: "Reached {score}! Legendary placement +1.", expansionSlots: "Expansion free slots +{slots}", expansionCustomers: "Simultaneous guests: {count}", placedCount: "Placed ×{count}", legendaryLocked: "Legendary placement unlocks at 500 score.",
    itemUnlockHint: "{points} more score unlocks 5 Common, 3 Rare, and 2 Epic items", allItemsUnlocked: "All new decorations through 1000 score are unlocked.", newItemsUnlocked: "Reached {score}! 5 Common, 3 Rare, and 2 Epic items unlocked!", newLegendaryUnlocked: "Reached {score}! A new Legendary decoration unlocked!", lockedAt: "Unlocks at {score} score",
    unlockProgress: "Next milestone {current}/{target}",
    match: "Tasty match! +{coins} 🪙", chain: "{chain}x chain! +{coins} 🪙", orderComplete: "Order served! +{coins} 🪙",
    orderFailed: "A guest left after waiting too long! Daily settlement −{coins} 🪙",
    lastCall: "Last 10 seconds! No new orders will be accepted.",
    invalidMove: "That move cannot make a match", autoShuffle: "No moves remained, so the board was shuffled!", paidShuffle: "Fresh ingredients shuffled in!",
    notEnoughCoins: "Not enough coins", purchaseSuccess: "Purchased {name}!", itemInstalled: "Placed {name}", itemRemoved: "Returned {name} to the bag", itemSold: "Sold {name}! +{coins} 🪙",
    drawResult: "You drew a {rarity} decoration: {name}!", expansionResult: "Stall expansion ticket! Your stall is now bigger.", expansionMax: "The stall is already max size. Ticket exchanged for 100 🪙.",
    expansionStatus: "Stall size {level} / 4 · Order income +{bonus}%", resetDone: "Stall collection reset.",
    effectIncome: "Effect: +20% order income", effectTime15: "Effect: +15 sec business time", effectHint: "Effect: one hint per day",
    effectCat: "Effect: brings a reward every 20–60 sec · uses no slot", effectDog: "Effect: finds a reward every 20–60 sec · uses no slot", effectTime30: "Effect: +30 sec business time", effectTicketCap: "Effect: raises max Business Tickets from 5 to 7",
    effectRareOrder: "Effect: Order income +3%", effectRareMatch: "Effect: Match income +10%", effectRareTime: "Effect: Daily business time +3 seconds",
    effectEpicOrder: "Effect: Order income +8%", effectEpicMatch: "Effect: Match income +15%", effectEpicTime: "Effect: Daily business time +10 seconds", effectEpicOvertime: "Effect: Overtime income +25%",
    effectLegendaryOrder: "Effect: Order income +25%", effectLegendaryMatch: "Effect: Match income +30%", effectLegendaryTime: "Effect: Daily business time +20 seconds", effectPassiveSettlement: "Owned passive: Final settlement income +5%", effectCatBowl: "Owned passive: Cat Purple Chest 20%→35% · rat 10%→5%", effectDogBowl: "Owned passive: Dog Golden Chest 20%→30% · 25 coins 10%→15%",
    scoreChestEyebrow: "Decor score limited", scoreChestTitle: "Milestone Chests", scoreChestHelp: "Each chest only contains decorations unlocked at that score milestone", scoreChestName: "{score}-Point Chest", scoreChestPool: "Common 70% · Rare 20% · Epic {epic}%{legendary}", scoreChestLegendaryOdds: " · Legendary 3%", scoreChestDraw: "Draw once · {price} 🪙", scoreChestEmpty: "Reach 300 decor score to unlock milestone chests.", scoreChestResult: "{score}-point chest: received {name}!",
    backgroundEyebrow: "Luxury scenes", backgroundTitle: "Night Market Backgrounds", backgroundHelp: "Buy with city funds and equip a background separately in each city", backgroundDefault: "Classic Night Market", backgroundWater: "City of Water", backgroundFire: "City of Fire", backgroundOwned: "Owned", backgroundEquip: "Equip", backgroundEquipped: "Equipped", backgroundBuy: "Buy · 10000", backgroundBought: "Purchased and equipped {name}!", backgroundEquippedMessage: "Equipped {name}.",
    expansionTicketShop: "Stall Expansion Ticket", expansionTicketPriceRule: "Each purchase raises the next price by 3000", expansionTicketBuy: "Buy · {price}", expansionTicketMaxed: "Maximum expansion reached", expansionTicketBought: "Expansion complete! The next ticket costs {price}.",
    couponTitle: "Coupon", couponHelp: "Each coupon code can only be used once", couponPlaceholder: "Enter coupon code", couponRedeem: "Redeem", couponSuccess: "Coupon redeemed! You received 20,000 city funds.", couponCoinSuccess: "Coupon redeemed! You received 20,000 coins.", couponAdminSuccess: "Admin coupon applied! All items, backgrounds, and cities are unlocked.", couponUsed: "That coupon code has already been used.", couponInvalid: "That coupon code is invalid.",
    boosterEpicName: "Purple Odds Chest", boosterEpicDesc: "Next draw: Common -5%, Epic +5%", boosterLegendaryName: "Golden Odds Chest", boosterLegendaryDesc: "Next draw: Common -3%, Legendary +3%",
    boosterUse: "Use on next draw", boosterNone: "No odds chest active", boosterEpicActive: "Purple chest active: Epic chance +5%", boosterLegendaryActive: "Golden chest active: Legendary chance +3%",
    petCatCoin: "Treasure Cat brought 10 pending coins!", petCatChest: "Treasure Cat brought a Purple Odds Chest!", petCatRat: "Treasure Cat brought a rat… no reward.",
    petDogCoin: "Lucky Dog found 7 pending coins!", petDogChest: "Lucky Dog found a Golden Odds Chest!", petDogJackpot: "Lucky Dog found 25 pending coins!",
    catLoot: "Cat rewards", dogLoot: "Dog rewards", catLootHelp: "Collect everything brought by the Treasure Cat", dogLootHelp: "Collect everything found by the Lucky Dog", petCatStored: "The cat brought something new! Collect it in Decorate.", petDogStored: "The dog found something new! Collect it in Decorate.", petLootEmpty: "There are no unclaimed pet rewards yet.", petCatLootTitle: "Treasure Cat rewards", petDogLootTitle: "Lucky Dog rewards", petLootCollected: "Collected {count} rewards at once.", petLootCoins: "Coins +{amount}", petLootEpicChest: "Purple Odds Chest", petLootLegendaryChest: "Golden Odds Chest", petLootRat: "Rat · No reward", petLootClose: "OK",
    ingredients: { skewer: "Skewer", noodle: "Noodles", dumpling: "Dumpling", fishcake: "Fish Cake", tteok: "Rice Cake", fruit: "Strawberry" },
    customers: { worker: "Mina After Work", skewerFan: "Skewer Fan", sweetGuest: "Sweet-Tooth Yuna", lateGuest: "Late-Night June", walker: "Sora on a Walk", regular: "Market Regular" },
  },
};

const INGREDIENTS = [
  { id: "skewer", emoji: "🍢" }, { id: "noodle", emoji: "🍜" },
  { id: "dumpling", emoji: "🥟" }, { id: "fishcake", emoji: "🍥" },
  { id: "tteok", emoji: "🍡" }, { id: "fruit", emoji: "🍓" },
];

const MEMORY_CARD_TYPES = [
  { id: "skewer", emoji: "🍢", orderIngredient: "skewer", names: { "zh-CN": "烤串", ko: "꼬치", en: "Skewer" } },
  { id: "bacon", emoji: "🥓", orderIngredient: "skewer", names: { "zh-CN": "培根", ko: "베이컨", en: "Bacon" } },
  { id: "chicken", emoji: "🍗", orderIngredient: "skewer", names: { "zh-CN": "鸡腿", ko: "닭다리", en: "Chicken" } },
  { id: "noodle", emoji: "🍜", orderIngredient: "noodle", names: { "zh-CN": "汤面", ko: "국수", en: "Noodles" } },
  { id: "pasta", emoji: "🍝", orderIngredient: "noodle", names: { "zh-CN": "意面", ko: "파스타", en: "Pasta" } },
  { id: "takeout", emoji: "🥡", orderIngredient: "noodle", names: { "zh-CN": "炒面", ko: "볶음면", en: "Chow Mein" } },
  { id: "dumpling", emoji: "🥟", orderIngredient: "dumpling", names: { "zh-CN": "饺子", ko: "만두", en: "Dumpling" } },
  { id: "fortune", emoji: "🥠", orderIngredient: "dumpling", names: { "zh-CN": "幸运饼", ko: "포춘 쿠키", en: "Fortune Cookie" } },
  { id: "mooncake", emoji: "🥮", orderIngredient: "dumpling", names: { "zh-CN": "月饼", ko: "월병", en: "Mooncake" } },
  { id: "fishcake", emoji: "🍥", orderIngredient: "fishcake", names: { "zh-CN": "鱼糕", ko: "어묵", en: "Fish Cake" } },
  { id: "fish", emoji: "🐟", orderIngredient: "fishcake", names: { "zh-CN": "鲜鱼", ko: "생선", en: "Fish" } },
  { id: "shrimp", emoji: "🦐", orderIngredient: "fishcake", names: { "zh-CN": "虾", ko: "새우", en: "Shrimp" } },
  { id: "tteok", emoji: "🍡", orderIngredient: "tteok", names: { "zh-CN": "甜团", ko: "떡꼬치", en: "Rice Cake" } },
  { id: "cracker", emoji: "🍘", orderIngredient: "tteok", names: { "zh-CN": "米饼", ko: "쌀과자", en: "Rice Cracker" } },
  { id: "riceball", emoji: "🍙", orderIngredient: "tteok", names: { "zh-CN": "饭团", ko: "주먹밥", en: "Rice Ball" } },
  { id: "strawberry", emoji: "🍓", orderIngredient: "fruit", names: { "zh-CN": "草莓", ko: "딸기", en: "Strawberry" } },
  { id: "apple", emoji: "🍎", orderIngredient: "fruit", names: { "zh-CN": "苹果", ko: "사과", en: "Apple" } },
  { id: "orange", emoji: "🍊", orderIngredient: "fruit", names: { "zh-CN": "橙子", ko: "귤", en: "Orange" } },
];


const GRILL_RECIPES = [
  { ingredient: "skewer", emoji: "🍢", rate: 8.2, idealMin: 44, idealMax: 61, burnAt: 78 },
  { ingredient: "noodle", emoji: "🍜", rate: 7.4, idealMin: 38, idealMax: 55, burnAt: 73 },
  { ingredient: "dumpling", emoji: "🥟", rate: 6.8, idealMin: 46, idealMax: 64, burnAt: 82 },
  { ingredient: "fishcake", emoji: "🍥", rate: 8.8, idealMin: 35, idealMax: 52, burnAt: 70 },
  { ingredient: "tteok", emoji: "🍡", rate: 7.8, idealMin: 41, idealMax: 58, burnAt: 76 },
  { ingredient: "fruit", emoji: "🍓", rate: 6.2, idealMin: 31, idealMax: 47, burnAt: 67 },
];

const GRILL_HEAT_MULTIPLIERS = [0, 0.62, 1, 1.42];

const ORDER_TEMPLATES = [
  { customer: "worker", items: ["noodle", "dumpling"], reward: 22 },
  { customer: "skewerFan", items: ["skewer", "fishcake"], reward: 20 },
  { customer: "sweetGuest", items: ["tteok", "fruit"], reward: 24 },
  { customer: "lateGuest", items: ["noodle", "skewer", "fishcake"], reward: 30 },
  { customer: "walker", items: ["dumpling", "tteok"], reward: 21 },
  { customer: "regular", items: ["fruit", "fishcake", "skewer"], reward: 29 },
];

const CUSTOMER_AVATARS = { worker: "👩‍💼", skewerFan: "🧔", sweetGuest: "👧", lateGuest: "🧑", walker: "👩", regular: "👨‍🦳" };
let nextOrderId = 1;
let memoryRevealTimeoutId = null;
let grillTimerId = null;
let soundPlaybackTimers = [];

const ITEM_ROWS = {
  common: [
    ["wood_stool", "🪑", "木凳", "나무 의자", "Wooden Stool"], ["small_plant", "🪴", "小盆栽", "작은 화분", "Small Plant"],
    ["menu_board", "📋", "菜单板", "메뉴판", "Menu Board"], ["paper_lantern", "🏮", "纸灯笼", "종이 등불", "Paper Lantern"],
    ["soup_pot", "🍲", "汤锅", "국물 냄비", "Soup Pot"], ["chopstick_cup", "🥢", "筷筒", "젓가락 통", "Chopstick Cup"],
    ["spice_jars", "🧂", "调料罐", "양념통", "Spice Jars"], ["table_cloth", "🧣", "花桌布", "꽃무늬 천", "Pattern Cloth"],
    ["wood_crate", "📦", "木箱", "나무 상자", "Wooden Crate"], ["small_fan", "🪭", "小风扇", "작은 부채", "Small Fan"],
    ["price_sign", "🏷️", "价目牌", "가격표", "Price Sign"], ["napkin_box", "🧻", "纸巾盒", "냅킨 상자", "Napkin Box"],
    ["tea_kettle", "🫖", "热水壶", "온수 주전자", "Hot Water Kettle"], ["lucky_coin", "🚰", "饮水机", "정수기", "Water Dispenser"],
    ["apron", "🚿", "备餐水槽", "준비용 싱크대", "Prep Sink"], ["umbrella", "⛱️", "户外遮阳伞", "야외 파라솔", "Patio Parasol"],
    ["neon_arrow", "🛎️", "取餐铃", "주문 호출벨", "Order Bell"], ["bowl_stack", "🍚", "餐具架", "식기 선반", "Dish Rack"],
    ["bamboo_basket", "🧺", "竹篮", "대나무 바구니", "Bamboo Basket"], ["welcome_mat", "🟫", "欢迎垫", "환영 매트", "Welcome Mat"],
  ],
  rare: [
    ["gold_lantern", "💡", "吊顶餐厅灯", "펜던트 식당 조명", "Pendant Dining Light"], ["lucky_cat", "🧾", "智能收银机", "스마트 계산대", "Smart Register"],
    ["neon_sign", "🪧", "店铺霓虹招牌", "가게 네온 간판", "Store Neon Sign"], ["red_canopy", "🎪", "全天候遮雨棚", "전천후 포차 천막", "All-Weather Canopy"],
    ["fish_tank", "🐠", "活鱼展示柜", "활어 진열 수조", "Live Seafood Display"], ["vintage_radio", "🎹", "夜市立式钢琴", "야시장 업라이트 피아노", "Night Market Upright Piano"],
    ["photo_wall", "🗄️", "壁挂储物柜", "벽걸이 수납장", "Wall Storage Cabinet"], ["flower_arch", "🚪", "木质入口隔断", "원목 입구 파티션", "Wood Entry Partition"],
    ["moon_lamp", "🕯️", "桌面氛围灯", "테이블 무드 조명", "Table Mood Lamp"], ["mascot_doll", "🛋️", "双人卡座", "2인용 부스 소파", "Two-Seat Booth"],
  ],
  epic: [
    ["dragon_sign", "♨️", "龙火大型烤台", "용화 대형 그릴", "Dragon-Flame Grill"], ["cat_pet", "🐈", "寻宝猫", "보물 고양이", "Treasure Cat"],
    ["fireworks", "🖥️", "厨房订单屏", "주방 주문 모니터", "Kitchen Order Display"], ["jade_counter", "🧊", "翡翠冷藏柜台", "비취 냉장 조리대", "Jade Refrigerated Counter"],
    ["dog_pet", "🐕", "幸运犬", "행운 강아지", "Lucky Dog"], ["prosperity_talisman", "📒", "生意账本", "장사 회계 장부", "Business Ledger"],
  ],
  legendary: [["gold_phoenix", "🍳", "黄金主厨灶台", "황금 마스터 주방", "Golden Master Kitchen"]],
};

const RARITY_CONFIG = {
  common: { value: 30, valueStep: 1, score: 8, scoreStep: 2 },
  rare: { value: 90, valueStep: 4, score: 30, scoreStep: 4 },
  epic: { value: 190, valueStep: 20, score: 70, scoreStep: 10 },
  legendary: { value: 600, valueStep: 0, score: 220, scoreStep: 0 },
};

const BASE_DECOR_ITEMS = Object.entries(ITEM_ROWS).flatMap(([rarity, rows]) => rows.map((row, index) => ({
  id: row[0], emoji: row[1], rarity,
  names: { "zh-CN": row[2], ko: row[3], en: row[4] },
  value: RARITY_CONFIG[rarity].value + index * RARITY_CONFIG[rarity].valueStep,
  score: RARITY_CONFIG[rarity].score + (index % 5) * RARITY_CONFIG[rarity].scoreStep,
  unlockScore: 0, cityId: "shanghai",
})));

const UNLOCK_THEMES = [
  [300, "怀旧", "레트로", "Retro", ["🪵", "🏮", "🧺", "🪴", "🪧"]],
  [400, "改良", "개량형", "Refined", ["🪑", "🟫", "🛒", "🌿", "💡"]],
  [500, "摩登", "모던", "Modern", ["🛋️", "🧊", "🧾", "🌳", "🪧"]],
  [600, "自动化", "자동화", "Automated", ["⚙️", "📟", "🛒", "🌱", "💡"]],
  [700, "智能", "스마트", "Smart", ["📱", "🔌", "🖥️", "🪴", "🪧"]],
  [800, "互联", "IoT", "Connected", ["📡", "🛜", "🤖", "🌿", "💡"]],
  [900, "人工智能", "AI", "AI", ["🦾", "🧠", "🖥️", "🌳", "🪧"]],
  [1000, "未来", "미래형", "Futuristic", ["🚀", "💠", "🤖", "🌌", "✨"]],
];

const RARITY_NAMES = {
  common: { "zh-CN": "小饰", ko: "소품", en: "Decor" },
  rare: { "zh-CN": "珍藏", ko: "진귀 장식", en: "Treasure" },
  epic: { "zh-CN": "奇观", ko: "기념 장식", en: "Wonder" },
};

const SCORE_FURNITURE_ROWS = {
  common: [
    { emoji: "🪑", names: ["餐椅", "식탁 의자", "Dining Chair"], furnitureKey: "chair", placementKind: "floor" },
    { emoji: "🟫", names: ["餐桌", "식탁", "Dining Table"], furnitureKey: "table", placementKind: "floor" },
    { emoji: "🛒", names: ["服务车", "서비스 카트", "Service Cart"], furnitureKey: "counter", placementKind: "floor" },
    { emoji: "🪴", names: ["街边花盆", "거리 화분", "Street Planter"], furnitureKey: "plant", placementKind: "slot", slotType: "outdoor" },
    { emoji: "🪧", names: ["户外引导牌", "야외 안내판", "Outdoor Guide Sign"], furnitureKey: "lamp", placementKind: "slot", slotType: "outdoor" },
  ],
  rare: [
    { emoji: "🛋️", names: ["靠墙卡座", "벽면 부스 소파", "Wall Booth"], furnitureKey: "sofa", placementKind: "floor" },
    { emoji: "🧊", names: ["展示冰柜", "진열 냉장고", "Display Fridge"], furnitureKey: "fridge", placementKind: "floor" },
    { emoji: "🖥️", names: ["菜单显示屏", "메뉴 디스플레이", "Menu Display"], furnitureKey: "counter", placementKind: "slot", slotType: "menu-board" },
  ],
  epic: [
    { emoji: "🍳", names: ["主厨料理岛台", "셰프 조리 아일랜드", "Chef Kitchen Island"], furnitureKey: "counter", placementKind: "floor" },
    { emoji: "♨️", names: ["多功能烤台", "다기능 그릴", "Multi Grill"], furnitureKey: "stove", placementKind: "slot", slotType: "stove" },
  ],
};

const PET_BOWL_ROWS = [
  { emoji: "🥣🐱", names: { "zh-CN": "寻宝猫营养碗", ko: "보물 고양이 영양 밥그릇", en: "Treasure Cat Nutrition Bowl" }, placementKind: "passive", assetAlias: "dessert_bowl" },
  { emoji: "🥣🐶", names: { "zh-CN": "幸运犬能量碗", ko: "행운 강아지 에너지 밥그릇", en: "Lucky Dog Energy Bowl" }, placementKind: "passive", assetAlias: "soup_pot" },
];

const BONUS_DECOR_ITEMS = UNLOCK_THEMES.flatMap(([score, zhTheme, koTheme, enTheme, icons]) => {
  const items = [];
  const counts = { common: 5, rare: 3, epic: 2 };
  for (const rarity of ["common", "rare", "epic"]) {
    for (let index = 0; index < counts[rarity]; index += 1) {
      const furniture = score === 300 && rarity === "epic" ? PET_BOWL_ROWS[index] : SCORE_FURNITURE_ROWS[rarity][index];
      items.push({
        id: `unlock_${score}_${rarity}_${index + 1}`,
        emoji: furniture.emoji, rarity, unlockScore: score,
        names: furniture.names && !Array.isArray(furniture.names) ? furniture.names : {
          "zh-CN": `${zhTheme}${furniture.names[0]}`,
          ko: `${koTheme} ${furniture.names[1]}`,
          en: `${enTheme} ${furniture.names[2]}`,
        },
        value: RARITY_CONFIG[rarity].value + Math.floor(score / 5) + index * RARITY_CONFIG[rarity].valueStep,
        score: RARITY_CONFIG[rarity].score + Math.floor(score / 25) + index * RARITY_CONFIG[rarity].scoreStep,
        cityId: "shanghai", placementKind: furniture.placementKind, slotType: furniture.slotType || null,
        furnitureKey: furniture.furnitureKey || null, assetAlias: furniture.assetAlias || null,
        designTier: 1 + Math.floor((score - 300) / 100),
      });
    }
  }
  if (score === 500 || score === 1000) {
    items.push({
      id: `unlock_${score}_legendary_1`, emoji: score === 500 ? "♨️" : "🍽️", rarity: "legendary", unlockScore: score,
      names: score === 500
        ? { "zh-CN": "黄金炭火窑炉", ko: "황금 숯불 화덕", en: "Golden Charcoal Oven" }
        : { "zh-CN": "天宫宴会料理台", ko: "천궁 연회 조리대", en: "Celestial Banquet Station" },
      value: score === 500 ? 800 : 1200, score: score === 500 ? 260 : 340, cityId: "shanghai",
    });
  }
  return items;
});

const CITIES = [
  { id: "shanghai", icon: "🌆", names: { "zh-CN": "上海", ko: "상하이", en: "Shanghai" }, cost: 0, requiredTicketUses: 0, theme: "shanghai" },
  { id: "chengdu", icon: "🐼", names: { "zh-CN": "成都", ko: "청두", en: "Chengdu" }, cost: 1000, requiredTicketUses: 15, theme: "chengdu" },
  { id: "xian", icon: "🏯", names: { "zh-CN": "西安", ko: "시안", en: "Xi'an" }, cost: 3000, requiredTicketUses: 20, theme: "xian" },
  { id: "guangzhou", icon: "🌴", names: { "zh-CN": "广州", ko: "광저우", en: "Guangzhou" }, cost: 4000, requiredTicketUses: 25, theme: "guangzhou" },
  { id: "harbin", icon: "❄️", names: { "zh-CN": "哈尔滨", ko: "하얼빈", en: "Harbin" }, cost: 5000, requiredTicketUses: 30, theme: "harbin" },
];

const BACKGROUNDS = [
  { id: "default", icon: "🏮", nameKey: "backgroundDefault", cost: 0 },
  { id: "water", icon: "🌊", nameKey: "backgroundWater", cost: 10000 },
  { id: "fire", icon: "🔥", nameKey: "backgroundFire", cost: 10000 },
];

const CITY_ICONS = {
  chengdu: ["🐼", "🌶️", "🎋", "🍵", "🀄", "🥢", "🏮", "🐲", "🌿", "🪭"],
  xian: ["🏯", "🐎", "🛡️", "⚔️", "🗿", "🥁", "🧱", "🏺", "🌙", "🦁"],
  guangzhou: ["🌴", "🦜", "🥭", "🛶", "🌊", "🍍", "🌺", "🐉", "⛵", "☀️"],
  harbin: ["❄️", "⛄", "🧊", "🦌", "🧣", "⛸️", "🌨️", "🏔️", "🐻‍❄️", "✨"],
};

const CITY_FURNITURE_ROWS = {
  common: [
    ["🪑", "餐椅", "식탁 의자", "Dining Chair"], ["🟫", "木餐桌", "원목 식탁", "Wood Dining Table"], ["🧺", "食材篮", "식재료 바구니", "Ingredient Basket"], ["🪴", "室内花盆", "실내 화분", "Indoor Planter"],
    ["🧂", "调味台", "양념대", "Seasoning Stand"], ["🍚", "餐具架", "식기 선반", "Dish Rack"], ["🫖", "饮水台", "음료 서비스대", "Drink Station"], ["🗑️", "分类垃圾桶", "분리수거함", "Waste Station"],
    ["💡", "壁灯", "벽 조명", "Wall Lamp"], ["🧻", "纸巾台", "냅킨 스테이션", "Napkin Station"],
  ],
  rare: [
    ["🛋️", "客用卡座", "손님 부스 좌석", "Guest Booth"], ["🧊", "立式冰柜", "스탠드 냉장고", "Standing Fridge"], ["🧾", "收银柜台", "계산 카운터", "Cash Counter"], ["🗄️", "厨房储物柜", "주방 수납장", "Kitchen Cabinet"], ["🔊", "店内音响", "매장 스피커", "Store Speaker"],
    ["☕", "咖啡机", "커피 머신", "Coffee Machine"], ["🍰", "甜点展示柜", "디저트 쇼케이스", "Dessert Display"], ["🍺", "饮料冷藏柜", "음료 냉장 쇼케이스", "Beverage Cooler"], ["🪟", "玻璃隔断", "유리 파티션", "Glass Partition"], ["🪧", "菜单灯箱", "메뉴 라이트박스", "Menu Lightbox"],
  ],
  epic: [
    ["🍳", "专业料理台", "전문 조리대", "Professional Cooking Station"], ["♨️", "大型烤炉", "대형 그릴", "Large Grill"], ["🧊", "步入式冷藏柜", "워크인 냉장고", "Walk-In Cooler"], ["🍽️", "开放式厨房岛", "오픈 키친 아일랜드", "Open Kitchen Island"], ["🖥️", "智能订单系统", "스마트 주문 시스템", "Smart Order System"],
  ],
  legendary: [["👨‍🍳", "大师主厨厨房", "마스터 셰프 주방", "Master Chef Kitchen"]],
};

function cityItemPlacement(emoji) {
  if (["🍳", "♨️"].includes(emoji)) return { placementKind: "slot", slotType: "stove" };
  if (emoji === "💡") return { placementKind: "slot", slotType: "tent-light" };
  if (["🪧", "🖥️"].includes(emoji)) return { placementKind: "slot", slotType: "menu-board" };
  if (["☕"].includes(emoji)) return { placementKind: "slot", slotType: "counter-top" };
  if (["🪴", "🗑️"].includes(emoji)) return { placementKind: "slot", slotType: "outdoor" };
  return { placementKind: "floor", slotType: null };
}

const CITY_DECOR_ITEMS = CITIES.slice(1).flatMap((city, cityIndex) => {
  const items = []; const counts = { common: 20, rare: 10, epic: 5, legendary: 1 };
  for (const rarity of ["common", "rare", "epic", "legendary"]) {
    for (let index = 0; index < counts[rarity]; index += 1) {
      const furniture = CITY_FURNITURE_ROWS[rarity][index % CITY_FURNITURE_ROWS[rarity].length];
      const variant = Math.floor(index / CITY_FURNITURE_ROWS[rarity].length) + 1;
      const placement = cityItemPlacement(furniture[0]);
      items.push({
        id: `${city.id}_${rarity}_${index + 1}`, emoji: furniture[0], rarity, unlockScore: 0, cityId: city.id,
        names: {
          "zh-CN": `${city.names["zh-CN"]}${furniture[1]}${variant > 1 ? variant : ""}`,
          ko: `${city.names.ko} ${furniture[2]}${variant > 1 ? ` ${variant}` : ""}`,
          en: `${city.names.en} ${furniture[3]}${variant > 1 ? ` ${variant}` : ""}`,
        },
        value: RARITY_CONFIG[rarity].value + cityIndex * 25 + index * RARITY_CONFIG[rarity].valueStep,
        score: RARITY_CONFIG[rarity].score + cityIndex * 5 + (index % 5) * RARITY_CONFIG[rarity].scoreStep,
        ...placement,
      });
    }
  }
  return items;
});

const DECOR_ITEMS = [...BASE_DECOR_ITEMS, ...BONUS_DECOR_ITEMS, ...CITY_DECOR_ITEMS];

const SLOT_ITEM_RULES = {
  soup_pot: { slotType: "stove" }, tea_kettle: { slotType: "stove" }, dragon_sign: { slotType: "stove" }, gold_phoenix: { slotType: "stove" },
  chopstick_cup: { slotType: "counter-top" }, spice_jars: { slotType: "counter-top" }, table_cloth: { slotType: "counter-top" }, small_fan: { slotType: "counter-top" }, napkin_box: { slotType: "counter-top" }, lucky_cat: { slotType: "counter-top" },
  menu_board: { slotType: "menu-board" }, price_sign: { slotType: "menu-board" }, neon_sign: { slotType: "menu-board" }, fireworks: { slotType: "menu-board" },
  paper_lantern: { slotType: "tent-light" }, gold_lantern: { slotType: "tent-light" }, moon_lamp: { slotType: "tent-light" },
  cat_pet: { slotType: "cat-pet" }, dog_pet: { slotType: "dog-pet" },
  small_plant: { slotType: "outdoor" }, umbrella: { slotType: "outdoor" }, flower_arch: { slotType: "outdoor" },
};

DECOR_ITEMS.forEach((item) => {
  const slotRule = SLOT_ITEM_RULES[item.id];
  if (slotRule) { item.placementKind = "slot"; item.slotType = slotRule.slotType; }
  else { item.placementKind ||= item.id === "prosperity_talisman" ? "passive" : "floor"; item.slotType ||= null; }
});

const STALL_SLOTS = [
  { id: "stove-left", type: "stove", worldX: 48, worldY: 244, depth: 4700, unlockAt: 0, labelKey: "slotStove" },
  { id: "stove-right", type: "stove", worldX: 126, worldY: 282, depth: 4710, unlockAt: 0, labelKey: "slotStove" },
  { id: "stove-300", type: "stove", worldX: 204, worldY: 320, depth: 4720, unlockAt: 300, labelKey: "slotStove" },
  { id: "stove-600", type: "stove", worldX: 282, worldY: 358, depth: 4730, unlockAt: 600, labelKey: "slotStove" },
  { id: "stove-900", type: "stove", worldX: 360, worldY: 396, depth: 4740, unlockAt: 900, labelKey: "slotStove" },
  { id: "counter-left", type: "counter-top", worldX: -188, worldY: 235, depth: 4740, labelKey: "slotCounterTop" },
  { id: "counter-center", type: "counter-top", worldX: -112, worldY: 270, depth: 4750, labelKey: "slotCounterTop" },
  { id: "counter-right", type: "counter-top", worldX: -36, worldY: 305, depth: 4760, labelKey: "slotCounterTop" },
  { id: "menu-main", type: "menu-board", worldX: -118, worldY: 82, depth: 6200, labelKey: "slotMenuBoard" },
  { id: "bulb-01", type: "tent-light", worldX: -148, worldY: 132, depth: 8500, groupId: "main-lights", labelKey: "slotTentLight" },
  { id: "bulb-02", type: "tent-light", worldX: -52, worldY: 92, depth: 8510, groupId: "main-lights", labelKey: "slotTentLight" },
  { id: "bulb-03", type: "tent-light", worldX: 52, worldY: 92, depth: 8520, groupId: "main-lights", labelKey: "slotTentLight" },
  { id: "bulb-04", type: "tent-light", worldX: 148, worldY: 132, depth: 8530, groupId: "main-lights", labelKey: "slotTentLight" },
  { id: "pet-cat", type: "cat-pet", worldX: -460, worldY: 430, depth: 5200, labelKey: "slotCatPet" },
  { id: "pet-dog", type: "dog-pet", worldX: 460, worldY: 430, depth: 5210, labelKey: "slotDogPet" },
  { id: "outdoor-left-back", type: "outdoor", worldX: -470, worldY: 300, depth: 3900, labelKey: "slotOutdoor" },
  { id: "outdoor-right-back", type: "outdoor", worldX: 470, worldY: 300, depth: 3910, labelKey: "slotOutdoor" },
  { id: "outdoor-left-front", type: "outdoor", worldX: -390, worldY: 535, depth: 5400, labelKey: "slotOutdoor" },
  { id: "outdoor-right-front", type: "outdoor", worldX: 390, worldY: 535, depth: 5410, labelKey: "slotOutdoor" },
];

function placementKind(item) { return ["slot", "passive"].includes(item?.placementKind) ? item.placementKind : "floor"; }
function stoveUnlockScore() { return Math.min(MAX_DECOR_CAPACITY_SCORE, state.decorMilestone || 0); }
function activeStallSlots() { const score = stoveUnlockScore(); return STALL_SLOTS.filter((slot) => slot.type !== "stove" || (slot.unlockAt || 0) <= score); }
function stoveSlotCount() { return activeStallSlots().filter((slot) => slot.type === "stove").length; }
function slotDefinition(slotId) { return activeStallSlots().find((slot) => slot.id === slotId) || null; }
function newPlacementUid() { return globalThis.crypto?.randomUUID?.() || `decor-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`; }

const ITEM_EFFECTS = {
  dragon_sign: "effectIncome",
  cat_pet: "effectCat",
  fireworks: "effectHint",
  jade_counter: "effectTime15",
  dog_pet: "effectDog",
  gold_phoenix: "effectTime30",
  unlock_500_legendary_1: "effectTicketCap",
  prosperity_talisman: "effectPassiveSettlement",
  unlock_300_epic_1: "effectCatBowl",
  unlock_300_epic_2: "effectDogBowl",
};

const EFFECT_ROTATIONS = {
  rare: ["effectRareOrder", "effectRareMatch", "effectRareTime"],
  epic: ["effectEpicOrder", "effectEpicMatch", "effectEpicTime", "effectEpicOvertime"],
  legendary: ["effectLegendaryOrder", "effectLegendaryMatch", "effectLegendaryTime"],
};

for (const rarity of ["rare", "epic", "legendary"]) {
  DECOR_ITEMS.filter((item) => item.rarity === rarity).forEach((item, index) => {
    if (!ITEM_EFFECTS[item.id]) ITEM_EFFECTS[item.id] = EFFECT_ROTATIONS[rarity][index % EFFECT_ROTATIONS[rarity].length];
  });
}

const SLOT_FREE_ITEMS = new Set(["cat_pet", "dog_pet"]);

const state = {
  board: [], drag: null, busy: false, drawing: false,
  memoryCards: [], memorySelected: [], memoryPreview: false, memoryPreviewSeconds: 0, memoryLock: false, memoryMatchedPairs: 0,
  memoryRevealAll: false, memoryNextRevealAt: MEMORY_REVEAL_INTERVAL_SECONDS,
  grillSlots: [], grillCombo: 0, grillServed: 0,
  relayQueue: [], relayInput: [], relayCombo: 0, relayCompleted: 0, relayLocked: false, relayHintIngredient: null,
  soundSequence: [], soundInput: [], soundRound: 1, soundCombo: 0, soundPlaying: false, soundHintIngredient: null,
  coins: 60, orders: [], orderCount: 0, timeLeft: BASE_DAY_SECONDS, timerId: null, started: false,
  dayDuration: BASE_DAY_SECONDS, elapsedSeconds: 0, settled: false, hintUsed: false, lastCallAnnounced: false,
  pendingMatchCoins: 0, pendingOrderCoins: 0, pendingPetCoins: 0, pendingPenalty: 0, failedOrders: 0,
  dayEffects: { orderMultiplier: 1, matchMultiplier: 1, overtimeMultiplier: 1, settlementMultiplier: 1, hint: false, cat: false, dog: false, extraSeconds: 0 }, petTimers: {}, petLoot: { cat: [], dog: [] },
  language: "zh-CN", soundEnabled: true, inventory: {}, installed: [], placements: [], slotItems: {}, selectedPlacement: null, showDecorGrid: false, decorEditMode: "furniture", selectedFloorStyle: "wood", floorTiles: {}, decorCamera: { x: 0, y: 0, zoom: 1 }, decorCameraDrag: null, suppressDecorClick: false, lastDecorActivation: null, decorMilestone: 0,
  expansionLevel: 1, expansionPurchaseCount: 0, stallCustomName: "", boosters: { epic: 0, legendary: 0 }, activeBooster: null,
  businessTickets: 5, businessTicketUses: 0, lastTicketAt: Date.now(), ticketTimerId: null,
  activeCityId: "shanghai", unlockedCities: new Set(["shanghai"]), cityTabUnlocked: false,
  ownedBackgrounds: new Set(["default"]), activeBackgrounds: { shanghai: "default" },
  bagSort: "score", bagRarity: "all", bagGroup: "flat", acquisitionOrder: {}, nextAcquisitionOrder: 1,
  cityInstalled: { shanghai: [] }, cityPlacements: { shanghai: [] }, citySlotItems: { shanghai: {} }, cityFloorTiles: { shanghai: {} }, cityExpansions: { shanghai: 1 }, cityExpansionPurchases: { shanghai: 0 }, cityMilestones: { shanghai: 0 }, cityNames: { shanghai: "" }, cityNameLocked: { shanghai: false }, cityTickets: { shanghai: { tickets: 5, lastTicketAt: Date.now() } },
  stallNameLocked: false, nameChangeTickets: 0, cityMoney: 0, cityStoredIncome: 0, lastCityIncomeAt: Date.now(), redeemedCoupons: new Set(),
  activeView: "gameView", lastDraw: null, decorEditorVersion: DECOR_EDITOR_VERSION,
};

const el = {
  board: document.querySelector("#board"), orders: document.querySelector("#orders"),
  gameTip: document.querySelector("#gameTip"), gameInstructions: document.querySelector("#gameInstructions"),
  coinCount: document.querySelector("#coinCount"), timer: document.querySelector("#timer"), todayEarnings: document.querySelector("#todayEarnings"), businessTickets: document.querySelector("#businessTickets"), orderProgress: document.querySelector("#orderProgress"),
  dayStartPanel: document.querySelector("#dayStartPanel"), startBusinessButton: document.querySelector("#startBusinessButton"), ticketRefillTime: document.querySelector("#ticketRefillTime"),
  cityNavButton: document.querySelector("#cityNavButton"), cityGrid: document.querySelector("#cityGrid"), cityStoredIncome: document.querySelector("#cityStoredIncome"), cityMoney: document.querySelector("#cityMoney"), claimCityIncome: document.querySelector("#claimCityIncome"),
  sceneCaption: document.querySelector("#sceneCaption"), customerStage: document.querySelector("#customerStage"), comboMessage: document.querySelector("#comboMessage"),
  toast: document.querySelector("#toast"),
  shuffleButton: document.querySelector("#shuffleButton"), hintButton: document.querySelector("#hintButton"), settleButton: document.querySelector("#settleButton"), resetLayoutButton: document.querySelector("#resetLayoutButton"), soundToggle: document.querySelector("#soundToggle"),
  languageSelect: document.querySelector("#languageSelect"), decorScore: document.querySelector("#decorScore"), slotCount: document.querySelector("#slotCount"),
  catLootButton: document.querySelector("#catLootButton"), dogLootButton: document.querySelector("#dogLootButton"), catLootCount: document.querySelector("#catLootCount"), dogLootCount: document.querySelector("#dogLootCount"),
  unlockHint: document.querySelector("#unlockHint"), unlockProgressBar: document.querySelector("#unlockProgressBar"), unlockProgressText: document.querySelector("#unlockProgressText"), expansionStatus: document.querySelector("#expansionStatus"),
  decorRoom: document.querySelector("#decorRoom"), decorGrid: document.querySelector("#decorCanvasHost"), placementSelection: document.querySelector("#placementSelection"), placementHelp: document.querySelector("#placementHelp"), cancelPlacement: document.querySelector("#cancelPlacement"), rotateFurniture: document.querySelector("#rotateFurniture"), zoomDecorOut: document.querySelector("#zoomDecorOut"), zoomDecorIn: document.querySelector("#zoomDecorIn"), resetDecorCamera: document.querySelector("#resetDecorCamera"), floorPalette: document.querySelector("#floorPalette"), decorBackButton: document.querySelector("#decorBackButton"), decorFurnitureMode: document.querySelector("#decorFurnitureMode"), decorMoveMode: document.querySelector("#decorMoveMode"), decorGridMode: document.querySelector("#decorGridMode"), decorDeleteMode: document.querySelector("#decorDeleteMode"), decorShopShortcut: document.querySelector("#decorShopShortcut"),
  stallNameInput: document.querySelector("#stallNameInput"), saveStallName: document.querySelector("#saveStallName"),
  bagButton: document.querySelector("#bagButton"), bagPanel: document.querySelector("#bagPanel"), bagCount: document.querySelector("#bagCount"), decorInventory: document.querySelector("#decorInventory"),
  bagSort: document.querySelector("#bagSort"), bagRarity: document.querySelector("#bagRarity"), bagGroup: document.querySelector("#bagGroup"),
  drawButton: document.querySelector("#drawButton"), drawTenButton: document.querySelector("#drawTenButton"), gachaMachine: document.querySelector("#gachaMachine"), gachaPreview: document.querySelector("#gachaPreview"), coinBurst: document.querySelector("#coinBurst"), gachaResult: document.querySelector("#gachaResult"), shopCatalog: document.querySelector("#shopCatalog"),
  catalogTitle: document.querySelector("#catalogTitle"), catalogHelp: document.querySelector("#catalogHelp"), scoreChestGrid: document.querySelector("#scoreChestGrid"), backgroundGrid: document.querySelector("#backgroundGrid"),
  buyNameTicket: document.querySelector("#buyNameTicket"), buyExpansionTicket: document.querySelector("#buyExpansionTicket"), expansionTicketHelp: document.querySelector("#expansionTicketHelp"), shopCityMoney: document.querySelector("#shopCityMoney"), couponInput: document.querySelector("#couponInput"), redeemCoupon: document.querySelector("#redeemCoupon"),
  commonOdds: document.querySelector("#commonOdds"), rareOdds: document.querySelector("#rareOdds"), epicOdds: document.querySelector("#epicOdds"), legendaryOdds: document.querySelector("#legendaryOdds"), expansionOdds: document.querySelector("#expansionOdds"), boosterStatus: document.querySelector("#boosterStatus"),
  gameOverModal: document.querySelector("#gameOverModal"), finalOrders: document.querySelector("#finalOrders"), restartButton: document.querySelector("#restartButton"),
  petLootModal: document.querySelector("#petLootModal"), petLootIcon: document.querySelector("#petLootIcon"), petLootTitle: document.querySelector("#petLootTitle"), petLootSummary: document.querySelector("#petLootSummary"), petLootGrid: document.querySelector("#petLootGrid"), closePetLootModal: document.querySelector("#closePetLootModal"),
  settlementMatch: document.querySelector("#settlementMatch"), settlementOrders: document.querySelector("#settlementOrders"), settlementPets: document.querySelector("#settlementPets"), settlementOvertime: document.querySelector("#settlementOvertime"), settlementPenalty: document.querySelector("#settlementPenalty"), settlementPassive: document.querySelector("#settlementPassive"), settlementTotal: document.querySelector("#settlementTotal"),
};

function t(key, variables = {}) {
  let value = key.split(".").reduce((part, segment) => part?.[segment], I18N[state.language]);
  if (typeof value !== "string") value = key;
  return value.replace(/\{(\w+)\}/g, (_, name) => String(variables[name] ?? `{${name}}`));
}

function itemName(item) { return item.names[state.language] || item.names["zh-CN"]; }
function ingredient(id) { return INGREDIENTS.find((item) => item.id === id); }
function decorItem(id) { return DECOR_ITEMS.find((item) => item.id === id); }
function furnitureVisualType(item) {
  if (["cat_pet", "dog_pet"].includes(item.id)) return "pet";
  if (["🪑", "🛋️"].includes(item.emoji)) return "seat";
  if (["🟫", "🍽️", "🛒"].includes(item.emoji)) return "table";
  if (["🍳", "♨️", "☕", "👨‍🍳"].includes(item.emoji)) return "kitchen";
  if (["🗄️", "🧊", "🍰", "🍺", "🚰"].includes(item.emoji)) return "storage";
  if (["💡", "🪧", "🖥️", "🕯️"].includes(item.emoji)) return "wall";
  return "small";
}
const LARGE_FURNITURE_OVERRIDES = {
  wood_stool: "chair", small_plant: "plant", vintage_radio: "piano", mascot_doll: "sofa",
  photo_wall: "bookshelf", jade_counter: "counter", moon_lamp: "lamp", dragon_sign: "stove", gold_phoenix: "stove",
};
function gameItemAsset(item) { return item ? window.gameAssetCatalog?.mappingFor(item.assetAlias || item.id) || null : null; }
function decorLargeFurnitureKey(item) {
  if (!item) return null;
  if (item.furnitureKey) return item.furnitureKey;
  if (LARGE_FURNITURE_OVERRIDES[item.id]) return LARGE_FURNITURE_OVERRIDES[item.id];
  if (item.cityId === "shanghai") return null;
  const text = `${item.id} ${item.names?.ko || ""} ${item.names?.en || ""}`.toLowerCase();
  if (/office|사무/.test(text)) return "office_chair";
  if (/chair|의자/.test(text)) return "chair";
  if (/booth|sofa|소파|좌석/.test(text)) return "sofa";
  if (/fridge|cooler|냉장|빙고/.test(text)) return "fridge";
  if (/sink|싱크/.test(text)) return "sink";
  if (/grill|oven|stove|그릴|화덕|조리/.test(text)) return "stove";
  if (/shelf|cabinet|storage|선반|수납|식기/.test(text)) return "bookshelf";
  if (/lamp|light|조명|등/.test(text)) return "lamp";
  if (/plant|화분/.test(text)) return "plant";
  if (/table|식탁/.test(text)) return "table";
  if (/counter|register|island|station|display|coffee|계산|카운터|진열|서비스|아일랜드/.test(text)) return "counter";
  const type = furnitureVisualType(item);
  return { seat: "chair", table: "table", kitchen: "stove", storage: "bookshelf", wall: "lamp" }[type] || "counter";
}
function decorAssetPath(item, rotation = 0) {
  const mapped = gameItemAsset(item); if (mapped) return mapped.shopImagePath;
  const furnitureKey = decorLargeFurnitureKey(item);
  return furnitureKey ? window.gameAssetCatalog?.furniturePath(furnitureKey, rotation) : window.gameAssetCatalog?.fallbackUrl;
}
function decorAssetMarkup(item, className = "decor-art-image", rotation = 0) {
  const path = decorAssetPath(item, rotation) || "./game-assets/assets/fallback/missing-item.svg";
  return `<img class="${className}" data-game-asset="${item?.id || "missing"}" src="${path}" alt="" draggable="false">`;
}
function bindAssetFallback(root) {
  root?.querySelectorAll?.("img[data-game-asset]").forEach((image) => image.addEventListener("error", () => {
    const fallback = window.gameAssetCatalog?.fallbackUrl || "./game-assets/assets/fallback/missing-item.svg";
    if (!image.src.endsWith("missing-item.svg")) { console.warn(`[assets] Missing image for ${image.dataset.gameAsset}: ${image.src}`); image.src = fallback; }
  }, { once: true }));
}
function cityName(city) { return city.names[state.language] || city.names["zh-CN"]; }
function activeCityItems() { return DECOR_ITEMS.filter((item) => item.cityId === state.activeCityId); }
function randomFrom(list) { return list[Math.floor(Math.random() * list.length)]; }
function delay(milliseconds) { return new Promise((resolve) => setTimeout(resolve, milliseconds)); }
function pendingCoins() { return state.pendingMatchCoins + state.pendingOrderCoins + state.pendingPetCoins; }
function pendingNetCoins() { return Math.max(0, pendingCoins() - state.pendingPenalty); }
function addInventoryItem(id, count = 1) {
  if (!state.acquisitionOrder[id]) state.acquisitionOrder[id] = state.nextAcquisitionOrder++;
  state.inventory[id] = (state.inventory[id] || 0) + count;
}
function itemEffectText(item) { return ITEM_EFFECTS[item.id] ? t(ITEM_EFFECTS[item.id]) : ""; }
function equippedSlotItemIds() {
  const seen = new Set(); const equipped = [];
  Object.entries(state.slotItems || {}).forEach(([slotId, itemId]) => {
    const slot = STALL_SLOTS.find((candidate) => candidate.id === slotId); const key = slot?.groupId ? `${slot.groupId}:${itemId}` : `${slotId}:${itemId}`;
    if (!seen.has(key)) { seen.add(key); equipped.push(itemId); }
  });
  return equipped;
}
function allInstalledItemIds() { return [...state.installed, ...equippedSlotItemIds()]; }
function installedCount(id) { return allInstalledItemIds().filter((installedId) => installedId === id).length; }
function hasInstalled(id) { return allInstalledItemIds().includes(id); }
function installedSlotCount() { return state.installed.filter((id) => !SLOT_FREE_ITEMS.has(id)).length; }
function installedEffectCount(effectKey) { return allInstalledItemIds().reduce((count, id) => count + (ITEM_EFFECTS[id] === effectKey ? 1 : 0), 0); }
const FLOOR_STYLES = new Set(["wood", "light", "dark"]);
const ISO_TILE_WIDTH = 96; const ISO_TILE_HEIGHT = 48; const ISO_ORIGIN_X = 0; const ISO_ORIGIN_Y = 180;
function decorGridSize() { return 10; }
function placementKey(x, y) { return `${x},${y}`; }
function gridToWorld(gridX, gridY) { return { x: ISO_ORIGIN_X + (gridX - gridY) * ISO_TILE_WIDTH / 2, y: ISO_ORIGIN_Y + (gridX + gridY) * ISO_TILE_HEIGHT / 2 }; }
function worldToGrid(worldX, worldY) { const localX = worldX - ISO_ORIGIN_X; const localY = worldY - ISO_ORIGIN_Y; return { x: Math.round(localY / ISO_TILE_HEIGHT + localX / ISO_TILE_WIDTH), y: Math.round(localY / ISO_TILE_HEIGHT - localX / ISO_TILE_WIDTH) }; }
function getTileCenter(gridX, gridY) { const world = gridToWorld(gridX, gridY); return { x: world.x, y: world.y + ISO_TILE_HEIGHT / 2 }; }
function isGridPositionValid(gridX, gridY) { const size = decorGridSize(); return Number.isInteger(gridX) && Number.isInteger(gridY) && gridX >= 0 && gridY >= 0 && gridX < size && gridY < size; }
function furnitureFootprint(item, rotation = 0) {
  const type = furnitureVisualType(item); const furniture = window.gameAssetCatalog?.furnitureFor(decorLargeFurnitureKey(item)); const mapped = gameItemAsset(item);
  let width = furniture?.footprintWidth || mapped?.footprintWidth || 1; let height = furniture?.footprintHeight || mapped?.footprintHeight || 1;
  if (!furniture && !mapped && (item?.emoji === "🛋️" || item?.emoji === "🎹")) width = height = 2;
  else if (!furniture && !mapped && ["table", "kitchen", "storage"].includes(type)) width = 2;
  if (Math.abs(rotation) % 2 === 1) [width, height] = [height, width];
  return { width, height };
}
function placementCells(item, x, y, rotation = 0) {
  const { width, height } = furnitureFootprint(item, rotation); const cells = [];
  for (let offsetY = 0; offsetY < height; offsetY += 1) for (let offsetX = 0; offsetX < width; offsetX += 1) cells.push({ x: x + offsetX, y: y + offsetY });
  return cells;
}
function placementFits(item, x, y, rotation, occupied) {
  const size = decorGridSize();
  return placementCells(item, x, y, rotation).every((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < size && cell.y < size && !occupied.has(placementKey(cell.x, cell.y)));
}
function occupancyMap(excludeIndex = -1) {
  const occupied = new Map();
  state.placements.forEach((placement, index) => {
    if (index === excludeIndex) return;
    const item = decorItem(state.installed[index] || placement.id);
    placementCells(item, placement.x, placement.y, placement.rotation || 0).forEach((cell) => occupied.set(placementKey(cell.x, cell.y), index));
  });
  return occupied;
}
function canPlaceFurniture(item, x, y, rotation = 0, excludeIndex = -1) {
  return placementFits(item, x, y, rotation, new Set(occupancyMap(excludeIndex).keys()));
}
function firstFreeDecorCell(item, rotation = 0, excludeIndex = -1) {
  const size = decorGridSize(); const occupied = new Set(occupancyMap(excludeIndex).keys());
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) if (placementFits(item, x, y, rotation, occupied)) return { x, y };
  return null;
}
function normalizeFloorTiles() {
  const size = decorGridSize(); const next = {};
  Object.entries(state.floorTiles || {}).forEach(([key, style]) => {
    const [x, y] = key.split(",").map(Number);
    if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < size && y < size && FLOOR_STYLES.has(style)) next[key] = style;
  });
  state.floorTiles = next;
}
function normalizeSlotItems() {
  const next = {};
  Object.entries(state.slotItems || {}).forEach(([slotId, itemId]) => {
    const slot = slotDefinition(slotId); const item = decorItem(itemId);
    if (!slot || !item || placementKind(item) !== "slot" || item.slotType !== slot.type) return;
    next[slotId] = itemId;
  });
  activeStallSlots().filter((slot) => slot.groupId).forEach((slot) => {
    const groupSlots = activeStallSlots().filter((candidate) => candidate.groupId === slot.groupId);
    const groupItem = groupSlots.map((candidate) => next[candidate.id]).find(Boolean);
    if (groupItem) groupSlots.forEach((candidate) => { next[candidate.id] = groupItem; });
  });
  state.slotItems = next;
}
function migrateItemsToPlacementKinds() {
  normalizeSlotItems();
  const floorInstalled = []; const floorPlacements = [];
  state.installed.forEach((id, index) => {
    const item = decorItem(id); const kind = placementKind(item);
    if (!item || kind === "passive") return;
    if (kind === "floor") { floorInstalled.push(id); floorPlacements.push(state.placements[index]); return; }
    if (equippedSlotItemIds().includes(id)) return;
    const candidates = activeStallSlots().filter((slot) => slot.type === item.slotType);
    const groupSlot = candidates.find((slot) => slot.groupId && activeStallSlots().filter((candidate) => candidate.groupId === slot.groupId).every((candidate) => !state.slotItems[candidate.id]));
    if (groupSlot?.groupId) activeStallSlots().filter((slot) => slot.groupId === groupSlot.groupId).forEach((slot) => { state.slotItems[slot.id] = id; });
    else {
      const emptySlot = candidates.find((slot) => !state.slotItems[slot.id]);
      if (emptySlot) state.slotItems[emptySlot.id] = id;
    }
  });
  state.installed = floorInstalled; state.placements = floorPlacements;
}
function normalizePlacements() {
  const size = decorGridSize(); const previous = Array.isArray(state.placements) ? state.placements : []; const next = []; const nextInstalled = []; const occupied = new Set(); const installedCounts = {};
  state.installed.forEach((id, index) => {
    const item = decorItem(id); const saved = previous[index]; const rotation = Number.isInteger(saved?.rotation) ? ((saved.rotation % 4) + 4) % 4 : 0;
    if (!item || placementKind(item) !== "floor") return;
    const owned = Math.max(0, Number(state.inventory[id]) || 0);
    if ((installedCounts[id] || 0) >= owned) return;
    let position = saved && Number.isInteger(saved.x) && Number.isInteger(saved.y) && placementFits(item, saved.x, saved.y, rotation, occupied) ? { x: saved.x, y: saved.y } : null;
    if (!position) {
      for (let y = 0; y < size && !position; y += 1) for (let x = 0; x < size; x += 1) if (placementFits(item, x, y, rotation, occupied)) { position = { x, y }; break; }
    }
    if (!position) return;
    placementCells(item, position.x, position.y, rotation).forEach((cell) => occupied.add(placementKey(cell.x, cell.y)));
    installedCounts[id] = (installedCounts[id] || 0) + 1; nextInstalled.push(id);
    next.push({ uid: typeof saved?.uid === "string" ? saved.uid : newPlacementUid(), id, ...position, rotation });
  });
  state.installed = nextInstalled; state.placements = next; trimExcessPlacements(); normalizeFloorTiles(); normalizeSlotItems();
}
function removeInstalledAt(index) { if (index < 0 || index >= state.installed.length) return; state.installed.splice(index, 1); state.placements.splice(index, 1); }
function removeOneInstalled(id) { const index = state.installed.indexOf(id); if (index >= 0) removeInstalledAt(index); }

function syncCurrentCityState() {
  normalizePlacements();
  state.cityInstalled[state.activeCityId] = state.installed;
  state.cityPlacements[state.activeCityId] = state.placements;
  state.citySlotItems[state.activeCityId] = state.slotItems;
  state.cityFloorTiles[state.activeCityId] = state.floorTiles;
  state.cityExpansions[state.activeCityId] = state.expansionLevel;
  state.cityExpansionPurchases[state.activeCityId] = state.expansionPurchaseCount;
  state.cityMilestones[state.activeCityId] = state.decorMilestone;
  state.cityNames[state.activeCityId] = state.stallCustomName;
  state.cityNameLocked[state.activeCityId] = state.stallNameLocked;
  state.cityTickets[state.activeCityId] = { tickets: state.businessTickets, lastTicketAt: state.lastTicketAt };
}

function loadCityState(cityId) {
  state.activeCityId = cityId;
  state.installed = state.cityInstalled[cityId] || (state.cityInstalled[cityId] = []);
  state.placements = state.cityPlacements[cityId] || (state.cityPlacements[cityId] = []);
  state.slotItems = state.citySlotItems[cityId] && typeof state.citySlotItems[cityId] === "object" ? state.citySlotItems[cityId] : (state.citySlotItems[cityId] = {});
  state.floorTiles = state.cityFloorTiles[cityId] && typeof state.cityFloorTiles[cityId] === "object" ? state.cityFloorTiles[cityId] : (state.cityFloorTiles[cityId] = {});
  state.expansionLevel = state.cityExpansions[cityId] || 1;
  state.expansionPurchaseCount = Math.max(0, state.cityExpansionPurchases[cityId] || 0);
  state.decorMilestone = state.cityMilestones[cityId] || 0;
  state.stallCustomName = state.cityNames[cityId] || "";
  state.stallNameLocked = Boolean(state.cityNameLocked[cityId]);
  const ticketData = state.cityTickets[cityId] || (state.cityTickets[cityId] = { tickets: 5, lastTicketAt: Date.now() });
  state.businessTickets = ticketData.tickets; state.lastTicketAt = ticketData.lastTicketAt;
  state.selectedPlacement = null; state.decorEditMode = "furniture"; state.decorCamera = { x: 0, y: 0, zoom: 1 }; migrateItemsToPlacementKinds(); normalizePlacements();
  state.cityInstalled[cityId] = state.installed; state.cityPlacements[cityId] = state.placements; state.citySlotItems[cityId] = state.slotItems;
}

function collectionTier() {
  const pool = DECOR_ITEMS.filter((item) => item.cityId === "shanghai");
  const complete = (rarity) => pool.filter((item) => item.rarity === rarity).every((item) => (state.inventory[item.id] || 0) > 0);
  if (!complete("common")) return 0;
  if (!complete("rare")) return 1;
  if (!complete("epic")) return 2;
  return 3;
}

function updateCityTabUnlock(announce = true) {
  if (state.cityTabUnlocked || collectionTier() < 3) return false;
  state.cityTabUnlocked = true; state.lastCityIncomeAt = Date.now();
  if (announce) { showMessage(t("cityTabUnlocked")); playSound("legendary"); }
  saveProgress(); return true;
}

function refreshCityIncome() {
  if (!state.cityTabUnlocked) return;
  const now = Date.now();
  if (state.cityStoredIncome >= 3000) { state.lastCityIncomeAt = now; return; }
  const gained = Math.floor(Math.max(0, now - state.lastCityIncomeAt) * 300 / 3600000);
  if (gained <= 0) return;
  state.cityStoredIncome = Math.min(3000, state.cityStoredIncome + gained);
  state.lastCityIncomeAt += gained * 12000;
  if (state.cityStoredIncome >= 3000) state.lastCityIncomeAt = now;
}
function ticketMax() { return hasInstalled("unlock_500_legendary_1") ? 7 : 5; }

function refreshTickets() {
  const now = Date.now(); const maximum = ticketMax(); let changed = false;
  if (state.businessTickets > maximum) { state.businessTickets = maximum; state.lastTicketAt = now; changed = true; }
  if (state.businessTickets < maximum) {
    const gained = Math.floor(Math.max(0, now - state.lastTicketAt) / TICKET_REFILL_MS);
    if (gained > 0) {
      state.businessTickets = Math.min(maximum, state.businessTickets + gained);
      state.lastTicketAt += gained * TICKET_REFILL_MS;
      if (state.businessTickets >= maximum) state.lastTicketAt = now;
      changed = true;
    }
  } else if (state.lastTicketAt !== now) {
    state.lastTicketAt = now;
  }
  if (changed) saveProgress();
}

function ticketCountdown() {
  const maximum = ticketMax();
  if (state.businessTickets >= maximum) return t("ticketsFull");
  const remaining = Math.max(0, TICKET_REFILL_MS - (Date.now() - state.lastTicketAt));
  const minutes = Math.floor(remaining / 60000); const seconds = Math.ceil((remaining % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function consumeBusinessTicket() {
  refreshTickets(); const maximum = ticketMax();
  if (state.businessTickets <= 0) return false;
  const wasFull = state.businessTickets >= maximum;
  state.businessTickets -= 1; state.businessTicketUses += 1;
  if (wasFull) state.lastTicketAt = Date.now();
  saveProgress(); return true;
}

function startTicketClock() {
  clearInterval(state.ticketTimerId);
  state.ticketTimerId = setInterval(() => { refreshTickets(); refreshCityIncome(); renderStats(); if (state.activeView === "cityView") renderCities(); }, 1000);
}

function calculateDayEffects() {
  const expansionBonus = (state.expansionLevel - 1) * .15;
  return {
    orderMultiplier: 1 + expansionBonus + (hasInstalled("dragon_sign") ? .20 : 0)
      + installedEffectCount("effectRareOrder") * .03 + installedEffectCount("effectEpicOrder") * .08 + installedEffectCount("effectLegendaryOrder") * .25,
    matchMultiplier: 1 + installedEffectCount("effectRareMatch") * .10 + installedEffectCount("effectEpicMatch") * .15 + installedEffectCount("effectLegendaryMatch") * .30,
    overtimeMultiplier: 1 + installedEffectCount("effectEpicOvertime") * .25,
    settlementMultiplier: (state.inventory.prosperity_talisman || 0) > 0 ? 1.05 : 1,
    hint: hasInstalled("fireworks"),
    cat: hasInstalled("cat_pet"),
    dog: hasInstalled("dog_pet"),
    extraSeconds: (hasInstalled("jade_counter") ? 15 : 0) + (hasInstalled("gold_phoenix") ? 30 : 0)
      + installedEffectCount("effectRareTime") * 3 + installedEffectCount("effectEpicTime") * 10 + installedEffectCount("effectLegendaryTime") * 20,
  };
}

function currentOdds(booster = state.activeBooster) {
  const odds = { common: 70, rare: 20, epic: 5, legendary: 3, expansion: 2 };
  const tier = collectionTier();
  if (tier >= 1) { odds.common -= 10; odds.rare += 8; odds.epic += 2; }
  if (tier >= 2) { odds.common -= 10; odds.rare += 7; odds.epic += 2; odds.legendary += 1; }
  if (tier >= 3) { odds.common -= 5; odds.rare -= 5; odds.epic += 5; odds.legendary += 3; odds.expansion += 2; }
  if (booster === "epic") { odds.common -= 5; odds.epic += 5; }
  if (booster === "legendary") { odds.common -= 3; odds.legendary += 3; }
  return odds;
}

let audioContext = null;
function getAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioClass) return null;
  if (!audioContext) audioContext = new AudioClass();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playSound(kind) {
  const context = getAudioContext();
  if (!context) return;
  const sounds = {
    pickup: [[440, .035, 0]], invalid: [[145, .11, 0]], match: [[520, .07, 0], [690, .08, .07]],
    chain: [[740, .07, 0], [988, .08, .07], [1318, .09, .15], [1568, .13, .24]], order: [[784, .08, 0], [1046, .09, .08], [1318, .13, .17]],
    coin: [[760, .045, 0], [930, .06, .05]], shuffle: [[270, .06, 0], [360, .06, .06], [470, .08, .12]],
    unlock: [[520, .08, 0], [780, .08, .09], [1040, .14, .18]], sell: [[520, .05, 0], [390, .1, .06]],
    legendary: [[440, .1, 0], [660, .1, .11], [880, .12, .22], [1320, .2, .35]], gameOver: [[660, .1, 0], [520, .16, .12]],
    gachaCommon: [[659, .07, 0], [784, .09, .08]],
    gachaRare: [[523, .07, 0], [784, .08, .08], [1046, .13, .17]],
    gachaEpic: [[523, .08, 0], [659, .08, .08], [784, .09, .16], [1046, .16, .26]],
    gachaLegendary: [[392, .1, 0], [523, .1, .11], [659, .1, .22], [784, .12, .33], [1175, .24, .48]],
    gachaExpansion: [[880, .04, 0], [1046, .04, .05], [1318, .05, .10], [1568, .06, .16], [1760, .14, .24]],
  };
  const sequence = sounds[kind] || sounds.pickup;
  sequence.forEach(([frequency, duration, offset]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = kind === "invalid" ? "sawtooth" : (kind === "chain" || kind === "order") ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + offset);
    gain.gain.setValueAtTime(.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(.08, context.currentTime + offset + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + offset + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + duration + .02);
  });
}

function saveProgress() {
  syncCurrentCityState();
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    coins: state.coins, language: state.language, soundEnabled: state.soundEnabled, decorEditorVersion: DECOR_EDITOR_VERSION,
    inventory: state.inventory, installed: state.installed, slotItems: state.slotItems, decorMilestone: state.decorMilestone, expansionLevel: state.expansionLevel,
    stallCustomName: state.stallCustomName, boosters: state.boosters, activeBooster: state.activeBooster,
    businessTickets: state.businessTickets, businessTicketUses: state.businessTicketUses, lastTicketAt: state.lastTicketAt,
    activeCityId: state.activeCityId, unlockedCities: [...state.unlockedCities], cityTabUnlocked: state.cityTabUnlocked,
    ownedBackgrounds: [...state.ownedBackgrounds], activeBackgrounds: state.activeBackgrounds,
    cityInstalled: state.cityInstalled, cityPlacements: state.cityPlacements, citySlotItems: state.citySlotItems, cityFloorTiles: state.cityFloorTiles, cityExpansions: state.cityExpansions, cityExpansionPurchases: state.cityExpansionPurchases, cityMilestones: state.cityMilestones, cityNames: state.cityNames, cityNameLocked: state.cityNameLocked, cityTickets: state.cityTickets,
    stallNameLocked: state.stallNameLocked, nameChangeTickets: state.nameChangeTickets,
    cityMoney: state.cityMoney, cityStoredIncome: state.cityStoredIncome, lastCityIncomeAt: state.lastCityIncomeAt, redeemedCoupons: [...state.redeemedCoupons],
    bagSort: state.bagSort, bagRarity: state.bagRarity, bagGroup: state.bagGroup, acquisitionOrder: state.acquisitionOrder, nextAcquisitionOrder: state.nextAcquisitionOrder,
  }));
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    if (saved) {
      state.coins = Number.isFinite(saved.coins) ? Math.max(0, saved.coins) : 60;
      state.language = I18N[saved.language] ? saved.language : "zh-CN";
      state.soundEnabled = saved.soundEnabled !== false;
      state.inventory = saved.inventory && typeof saved.inventory === "object" ? saved.inventory : {};
      if (state.inventory.panda_chef) { state.inventory.cat_pet = (state.inventory.cat_pet || 0) + state.inventory.panda_chef; delete state.inventory.panda_chef; }
      if (state.inventory.cloud_roof) { state.inventory.dog_pet = (state.inventory.dog_pet || 0) + state.inventory.cloud_roof; delete state.inventory.cloud_roof; }
      state.acquisitionOrder = saved.acquisitionOrder && typeof saved.acquisitionOrder === "object" ? saved.acquisitionOrder : {};
      state.nextAcquisitionOrder = Number.isFinite(saved.nextAcquisitionOrder) ? Math.max(1, Math.floor(saved.nextAcquisitionOrder)) : 1;
      Object.keys(state.inventory).forEach((id) => { if (!state.acquisitionOrder[id]) state.acquisitionOrder[id] = state.nextAcquisitionOrder++; });
      state.installed = (saved.installed || []).map((id) => id === "panda_chef" ? "cat_pet" : id === "cloud_roof" ? "dog_pet" : id).filter((id) => decorItem(id));
      state.slotItems = saved.slotItems && typeof saved.slotItems === "object" ? saved.slotItems : {};
      state.decorMilestone = Math.min(1000, Math.max(0, saved.decorMilestone || 0));
      state.expansionLevel = Math.min(4, Math.max(1, saved.expansionLevel || 1));
      state.stallCustomName = typeof saved.stallCustomName === "string" ? saved.stallCustomName.slice(0, 12) : "";
      state.boosters = { epic: Math.max(0, saved.boosters?.epic || 0), legendary: Math.max(0, saved.boosters?.legendary || 0) };
      state.activeBooster = ["epic", "legendary"].includes(saved.activeBooster) ? saved.activeBooster : null;
      state.businessTickets = Number.isFinite(saved.businessTickets) ? Math.max(0, saved.businessTickets) : 5;
      state.businessTicketUses = Number.isFinite(saved.businessTicketUses) ? Math.max(0, Math.floor(saved.businessTicketUses)) : 0;
      state.lastTicketAt = Number.isFinite(saved.lastTicketAt) ? saved.lastTicketAt : Date.now();
      state.activeCityId = CITIES.some((city) => city.id === saved.activeCityId) ? saved.activeCityId : "shanghai";
      state.unlockedCities = new Set((saved.unlockedCities || ["shanghai"]).filter((id) => CITIES.some((city) => city.id === id)));
      state.unlockedCities.add("shanghai"); state.cityTabUnlocked = Boolean(saved.cityTabUnlocked);
      state.ownedBackgrounds = new Set((saved.ownedBackgrounds || ["default"]).filter((id) => BACKGROUNDS.some((background) => background.id === id))); state.ownedBackgrounds.add("default");
      state.activeBackgrounds = saved.activeBackgrounds && typeof saved.activeBackgrounds === "object" ? saved.activeBackgrounds : { shanghai: "default" };
      state.cityInstalled = saved.cityInstalled || { shanghai: state.installed };
      state.cityPlacements = saved.cityPlacements || { shanghai: [] };
      state.citySlotItems = saved.citySlotItems && typeof saved.citySlotItems === "object" ? saved.citySlotItems : { shanghai: state.slotItems };
      state.cityFloorTiles = saved.cityFloorTiles && typeof saved.cityFloorTiles === "object" ? saved.cityFloorTiles : { shanghai: {} };
      state.cityExpansions = saved.cityExpansions || { shanghai: state.expansionLevel };
      state.cityExpansionPurchases = saved.cityExpansionPurchases || { shanghai: 0 };
      state.cityMilestones = saved.cityMilestones || { shanghai: state.decorMilestone };
      state.cityNames = saved.cityNames || { shanghai: state.stallCustomName };
      state.cityNameLocked = saved.cityNameLocked || { shanghai: Boolean(saved.stallNameLocked) };
      state.cityTickets = saved.cityTickets || { shanghai: { tickets: state.businessTickets, lastTicketAt: state.lastTicketAt } };
      state.nameChangeTickets = Math.max(0, saved.nameChangeTickets || 0);
      state.cityMoney = Math.max(0, saved.cityMoney || 0); state.cityStoredIncome = Math.min(3000, Math.max(0, saved.cityStoredIncome || 0));
      state.lastCityIncomeAt = Number.isFinite(saved.lastCityIncomeAt) ? saved.lastCityIncomeAt : Date.now();
      state.redeemedCoupons = new Set(Array.isArray(saved.redeemedCoupons) ? saved.redeemedCoupons.filter((code) => typeof code === "string") : []);
      state.bagSort = ["score", "rarity", "name", "price", "effect", "acquired"].includes(saved.bagSort) ? saved.bagSort : "score";
      state.bagRarity = ["all", "common", "rare", "epic", "legendary"].includes(saved.bagRarity) ? saved.bagRarity : "all";
      state.bagGroup = ["flat", "rarity"].includes(saved.bagGroup) ? saved.bagGroup : "flat";
      state.decorEditorVersion = Number.isFinite(saved.decorEditorVersion) ? saved.decorEditorVersion : 0;
      if (state.decorEditorVersion < DECOR_EDITOR_VERSION) {
        Object.keys(state.cityInstalled).forEach((cityId) => { state.cityInstalled[cityId] = []; });
        Object.keys(state.cityPlacements).forEach((cityId) => { state.cityPlacements[cityId] = []; });
        Object.keys(state.citySlotItems).forEach((cityId) => { state.citySlotItems[cityId] = {}; });
        state.installed = []; state.placements = []; state.slotItems = {}; state.decorEditorVersion = DECOR_EDITOR_VERSION;
      }
      loadCityState(state.activeCityId); saveProgress();
    }
    if (collectionTier() >= 3) state.cityTabUnlocked = true;
    refreshCityIncome();
    refreshTickets();
  } catch { localStorage.removeItem(SAVE_KEY); }
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => { node.innerHTML = t(node.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => { node.title = t(node.dataset.i18nTitle); });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => { node.setAttribute("aria-label", t(node.dataset.i18nAria)); });
  el.languageSelect.value = state.language;
  el.stallNameInput.placeholder = t("stallNamePlaceholder");
  el.couponInput.placeholder = t("couponPlaceholder");
  el.couponInput.setAttribute("aria-label", t("couponTitle"));
  renderSoundToggle();
  el.sceneCaption.textContent = isMemoryCity() && state.memoryPreview
    ? t("memoryPreview", { seconds: state.memoryPreviewSeconds })
    : isGrillCity() ? t("grillWelcome")
      : isRelayCity() ? t("relayWelcome")
        : isSoundCity() ? t("soundWelcome") : t("sceneWelcome");
  renderAll();
  saveProgress();
}

function renderSoundToggle() {
  el.soundToggle.textContent = state.soundEnabled ? "🔊" : "🔇";
  el.soundToggle.classList.toggle("is-muted", !state.soundEnabled);
  el.soundToggle.setAttribute("aria-label", state.soundEnabled ? t("soundOff") : t("soundOn"));
  el.soundToggle.title = state.soundEnabled ? t("soundOff") : t("soundOn");
}

function fillBoard() {
  state.board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      let candidate;
      do { candidate = randomFrom(INGREDIENTS).id; }
      while ((col > 1 && state.board[row][col - 1] === candidate && state.board[row][col - 2] === candidate)
        || (row > 1 && state.board[row - 1][col] === candidate && state.board[row - 2][col] === candidate));
      state.board[row][col] = candidate;
    }
  }
}

function makeBoard() {
  let attempts = 0;
  do { fillBoard(); attempts += 1; } while (!hasAvailableMove() && attempts < 100);
}

function isMemoryCity() { return state.activeCityId === "chengdu"; }
function isGrillCity() { return state.activeCityId === "xian"; }
function isRelayCity() { return state.activeCityId === "guangzhou"; }
function isSoundCity() { return state.activeCityId === "harbin"; }
function isAlternateGameCity() { return isMemoryCity() || isGrillCity() || isRelayCity() || isSoundCity(); }

function makeMemoryBoard(preview = false) {
  const cards = MEMORY_CARD_TYPES.flatMap((type) => [0, 1].map((copy) => ({
    uid: `${type.id}-${copy}`,
    pairId: type.id,
    emoji: type.emoji,
    orderIngredient: type.orderIngredient,
    names: type.names,
    matched: false,
  })));
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[target]] = [cards[target], cards[index]];
  }
  state.memoryCards = cards;
  state.memorySelected = [];
  state.memoryPreview = Boolean(preview);
  state.memoryPreviewSeconds = preview ? 5 : 0;
  state.memoryLock = false;
  state.memoryMatchedPairs = 0;
  state.memoryRevealAll = false;
  state.memoryNextRevealAt = MEMORY_REVEAL_INTERVAL_SECONDS;
}

function clearMemoryRevealTimeout() {
  if (memoryRevealTimeoutId !== null) {
    clearTimeout(memoryRevealTimeoutId);
    memoryRevealTimeoutId = null;
  }
}

function revealAllMemoryCards() {
  if (
    !state.started ||
    !isMemoryCity() ||
    state.settled ||
    state.memoryPreview ||
    state.memoryRevealAll ||
    state.memoryLock ||
    state.memorySelected.length > 0 ||
    state.timeLeft <= 0 ||
    state.memoryMatchedPairs >= MEMORY_CARD_TYPES.length
  ) return false;

  clearMemoryRevealTimeout();
  state.memoryRevealAll = true;
  state.memoryLock = true;
  showMessage(t("memoryRevealAll"));
  playSound("unlock");
  renderBoard();

  memoryRevealTimeoutId = setTimeout(() => {
    memoryRevealTimeoutId = null;
    state.memoryRevealAll = false;
    state.memoryLock = false;
    if (!state.started || !isMemoryCity() || state.settled) return;
    showMessage(t("memoryRevealEnd"));
    renderBoard();
    renderStats();
  }, MEMORY_REVEAL_DURATION_MS);

  return true;
}


function shuffledGrillRecipes() {
  const recipes = [...GRILL_RECIPES];
  for (let index = recipes.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [recipes[index], recipes[target]] = [recipes[target], recipes[index]];
  }
  return recipes;
}

function newGrillSlot(recipe, index = 0) {
  return {
    uid: `grill-${Date.now().toString(36)}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    recipeIngredient: recipe.ingredient,
    progress: Math.random() * 7,
    heat: 2,
    flips: 0,
    side: 0,
    cooldownUntil: 0,
  };
}

function grillRecipe(slot) {
  return GRILL_RECIPES.find((recipe) => recipe.ingredient === slot?.recipeIngredient) || GRILL_RECIPES[0];
}

function makeGrillBoard() {
  state.grillSlots = shuffledGrillRecipes().slice(0, GRILL_SLOT_COUNT).map((recipe, index) => newGrillSlot(recipe, index));
  state.grillCombo = 0;
  state.grillServed = 0;
}

function clearGrillTimer() {
  if (grillTimerId !== null) {
    clearInterval(grillTimerId);
    grillTimerId = null;
  }
}

function startGrillTimer() {
  clearGrillTimer();
  if (!state.started || !isGrillCity()) return;
  grillTimerId = setInterval(tickGrillGame, GRILL_TICK_MS);
}

function replaceGrillSlot(index) {
  const recipe = randomFrom(GRILL_RECIPES);
  state.grillSlots[index] = newGrillSlot(recipe, index);
}

function putGrillSlotOnCooldown(index) {
  const slot = state.grillSlots[index];
  if (!slot) return;
  slot.cooldownUntil = Date.now() + GRILL_RESPAWN_MS;
  slot.heat = 1;
}

function failGrillFood(index, messageKey, penalty) {
  const slot = state.grillSlots[index];
  if (!slot || slot.cooldownUntil) return;
  state.pendingPenalty += penalty;
  state.grillCombo = 0;
  putGrillSlotOnCooldown(index);
  showMessage(t(messageKey, { coins: penalty }));
  playSound("invalid");
  renderBoard();
  renderStats();
}

function tickGrillGame() {
  if (!state.started || state.settled || !isGrillCity()) {
    clearGrillTimer();
    return;
  }
  const now = Date.now();
  let needsRender = false;
  state.grillSlots.forEach((slot, index) => {
    if (!slot) return;
    if (slot.cooldownUntil) {
      if (now >= slot.cooldownUntil) {
        replaceGrillSlot(index);
        needsRender = true;
      }
      return;
    }
    const recipe = grillRecipe(slot);
    slot.progress = Math.min(100, slot.progress + recipe.rate * GRILL_HEAT_MULTIPLIERS[slot.heat] * (GRILL_TICK_MS / 1000));
    if (slot.progress >= recipe.burnAt) {
      failGrillFood(index, "grillBurned", 3);
      needsRender = false;
    } else needsRender = true;
  });
  if (needsRender) renderBoard();
}

function adjustGrillHeat(index, delta) {
  if (!state.started || !isGrillCity()) return;
  const slot = state.grillSlots[index];
  if (!slot || slot.cooldownUntil) return;
  slot.heat = Math.max(1, Math.min(3, slot.heat + delta));
  playSound("pickup");
  renderBoard();
}

function flipGrillFood(index) {
  if (!state.started || !isGrillCity()) return;
  const slot = state.grillSlots[index];
  if (!slot || slot.cooldownUntil) return;
  slot.flips += 1;
  slot.side = slot.side ? 0 : 1;
  slot.progress = Math.max(0, slot.progress - 1.5);
  playSound("pickup");
  renderBoard();
}

function serveGrillFood(index) {
  if (!state.started || !isGrillCity()) return;
  const slot = state.grillSlots[index];
  if (!slot || slot.cooldownUntil) return;
  const recipe = grillRecipe(slot);
  if (slot.flips < 1) {
    showMessage(t("grillNeedsFlip"));
    playSound("invalid");
    return;
  }
  if (slot.progress < recipe.idealMin) {
    failGrillFood(index, "grillUndercooked", 2);
    return;
  }
  if (slot.progress > recipe.idealMax) {
    failGrillFood(index, "grillOvercooked", 2);
    return;
  }
  state.grillCombo += 1;
  state.grillServed += 1;
  const baseCoins = 5 + Math.min(5, state.grillCombo - 1);
  const coinGain = Math.max(1, Math.round(baseCoins * state.dayEffects.matchMultiplier));
  state.pendingMatchCoins += coinGain;
  addIngredientsToOrders([recipe.ingredient, recipe.ingredient]);
  putGrillSlotOnCooldown(index);
  showMessage(t("grillPerfect", { coins: coinGain, combo: state.grillCombo }));
  playSound(state.grillCombo >= 3 ? "chain" : "match");
  renderOrders();
  renderBoard();
  renderStats();
}

function grillStatusKey(slot, recipe) {
  if (slot.cooldownUntil) return "grillCooling";
  if (slot.progress < recipe.idealMin) return "grillCooking";
  if (slot.progress <= recipe.idealMax) return "grillReady";
  return "grillHot";
}

function ensureGrillStyles() {
  if (document.querySelector("#grillGameStyles")) return;
  const style = document.createElement("style");
  style.id = "grillGameStyles";
  style.textContent = `
    #board.grill-board{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;gap:10px!important;min-height:430px!important;padding:10px!important;align-items:stretch!important}
    .grill-station{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:7px;min-width:0;padding:11px;border:2px solid rgba(112,53,22,.32);border-radius:18px;background:linear-gradient(160deg,rgba(255,250,230,.96),rgba(255,215,148,.92));box-shadow:inset 0 -8px 0 rgba(90,38,14,.08),0 6px 14px rgba(60,25,8,.12);overflow:hidden}
    .grill-station.is-ready{border-color:#42a85a;box-shadow:0 0 0 3px rgba(66,168,90,.18),0 6px 14px rgba(60,25,8,.12)}
    .grill-station.is-hot{border-color:#e84c32;animation:grillPulse .55s infinite alternate}
    .grill-station.is-cooling{opacity:.66;filter:saturate(.6)}
    .grill-station-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:800}
    .grill-food-wrap{display:flex;align-items:center;justify-content:center;min-height:68px;position:relative}
    .grill-food{display:inline-block;font-size:48px;line-height:1;filter:drop-shadow(0 6px 5px rgba(60,25,8,.18));transition:transform .18s ease}
    .grill-food.is-flipped{transform:rotateY(180deg) rotate(-4deg)}
    .grill-smoke{position:absolute;top:-9px;font-size:21px;opacity:.75;animation:grillSmoke 1.1s infinite ease-in-out}
    .grill-meter{position:relative;height:15px;border-radius:999px;background:#492919;overflow:hidden;border:2px solid rgba(255,255,255,.7)}
    .grill-meter-fill{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#ffd34e,#ff8c27,#e83c27);transition:width .2s linear}
    .grill-meter-target{position:absolute;top:0;bottom:0;background:rgba(59,204,85,.72);border-left:2px solid rgba(20,110,39,.8);border-right:2px solid rgba(20,110,39,.8);z-index:2}
    .grill-progress-text{text-align:center;font-size:11px;font-weight:900;color:#63351f}
    .grill-heat-row{display:grid;grid-template-columns:34px 1fr 34px;gap:5px;align-items:center}
    .grill-heat-row button,.grill-action-row button{border:0;border-radius:10px;padding:7px 6px;font-weight:900;cursor:pointer;background:rgba(255,255,255,.88);box-shadow:0 2px 5px rgba(55,25,10,.12)}
    .grill-heat-row button:disabled,.grill-action-row button:disabled{opacity:.45;cursor:not-allowed}
    .grill-flames{text-align:center;font-size:15px;letter-spacing:1px;white-space:nowrap}
    .grill-action-row{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .grill-action-row .serve{background:#7b311a;color:#fff}
    @keyframes grillPulse{from{transform:translateY(0)}to{transform:translateY(-2px)}}
    @keyframes grillSmoke{0%,100%{transform:translateY(3px);opacity:.35}50%{transform:translateY(-5px);opacity:.8}}
    @media(max-width:760px){#board.grill-board{grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-template-rows:repeat(3,minmax(0,1fr))!important;min-height:610px!important}.grill-food{font-size:41px}.grill-station{padding:8px}}
  `;
  document.head.append(style);
}

function renderGrillBoard() {
  ensureGrillStyles();
  if (!state.grillSlots.length) makeGrillBoard();
  state.grillSlots.forEach((slot, index) => {
    const recipe = grillRecipe(slot);
    const statusKey = grillStatusKey(slot, recipe);
    const ready = !slot.cooldownUntil && slot.progress >= recipe.idealMin && slot.progress <= recipe.idealMax;
    const hot = !slot.cooldownUntil && slot.progress > recipe.idealMax;
    const station = document.createElement("article");
    station.className = `grill-station${ready ? " is-ready" : ""}${hot ? " is-hot" : ""}${slot.cooldownUntil ? " is-cooling" : ""}`;
    station.setAttribute("role", "gridcell");
    const progress = Math.max(0, Math.min(100, slot.progress));
    const disabled = !state.started || Boolean(slot.cooldownUntil);
    const smoke = hot ? '<span class="grill-smoke" aria-hidden="true">💨</span>' : '';
    station.innerHTML = `
      <div class="grill-station-head"><strong>${t(`ingredients.${recipe.ingredient}`)}</strong><span>${t(statusKey)}</span></div>
      <div class="grill-food-wrap">${smoke}<span class="grill-food${slot.side ? " is-flipped" : ""}" aria-hidden="true">${recipe.emoji}</span></div>
      <div class="grill-meter" aria-label="${Math.round(progress)}%">
        <span class="grill-meter-fill" style="width:${progress}%"></span>
        <span class="grill-meter-target" style="left:${recipe.idealMin}%;width:${recipe.idealMax - recipe.idealMin}%"></span>
      </div>
      <div class="grill-progress-text">${Math.round(progress)}% · ${t("grillHeat")}</div>
      <div class="grill-heat-row">
        <button type="button" class="heat-down" ${disabled || slot.heat <= 1 ? "disabled" : ""} aria-label="-">−</button>
        <span class="grill-flames">${"🔥".repeat(slot.heat)}${"▫️".repeat(3 - slot.heat)}</span>
        <button type="button" class="heat-up" ${disabled || slot.heat >= 3 ? "disabled" : ""} aria-label="+">＋</button>
      </div>
      <div class="grill-action-row">
        <button type="button" class="flip" ${disabled ? "disabled" : ""}>${t("grillFlip")} ${slot.flips ? `×${slot.flips}` : ""}</button>
        <button type="button" class="serve" ${disabled ? "disabled" : ""}>${t("grillServe")}</button>
      </div>`;
    station.querySelector(".heat-down").addEventListener("click", () => adjustGrillHeat(index, -1));
    station.querySelector(".heat-up").addEventListener("click", () => adjustGrillHeat(index, 1));
    station.querySelector(".flip").addEventListener("click", () => flipGrillFood(index));
    station.querySelector(".serve").addEventListener("click", () => serveGrillFood(index));
    el.board.append(station);
  });
}


function makeRelayTicket() {
  const template = randomFrom(ORDER_TEMPLATES);
  const length = Math.min(4, 2 + Math.floor(state.relayCompleted / 4));
  const sequence = [...template.items];
  while (sequence.length < length) {
    const candidate = randomFrom(INGREDIENTS).id;
    if (candidate !== sequence[sequence.length - 1]) sequence.push(candidate);
  }
  return {
    uid: `relay-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    customer: template.customer,
    sequence: sequence.slice(0, length),
  };
}

function makeRelayBoard() {
  state.relayQueue = Array.from({ length: RELAY_QUEUE_SIZE }, makeRelayTicket);
  state.relayInput = [];
  state.relayCombo = 0;
  state.relayCompleted = 0;
  state.relayLocked = false;
  state.relayHintIngredient = null;
}

function currentRelayTicket() { return state.relayQueue[0] || null; }

function selectRelayIngredient(ingredientId) {
  if (!state.started || !isRelayCity() || state.relayLocked) return;
  const ticket = currentRelayTicket();
  if (!ticket) return;
  const expected = ticket.sequence[state.relayInput.length];
  if (ingredientId !== expected) {
    state.pendingPenalty += 1;
    state.relayCombo = 0;
    state.relayInput = [];
    state.relayHintIngredient = null;
    state.relayLocked = true;
    showMessage(t("relayMiss", { coins: 1 }));
    playSound("invalid");
    renderBoard();
    renderStats();
    setTimeout(() => {
      state.relayLocked = false;
      if (state.started && isRelayCity()) renderBoard();
    }, RELAY_FEEDBACK_MS);
    return;
  }

  state.relayInput.push(ingredientId);
  state.relayHintIngredient = null;
  playSound("pickup");
  if (state.relayInput.length < ticket.sequence.length) {
    renderBoard();
    return;
  }

  state.relayLocked = true;
  state.relayCombo += 1;
  state.relayCompleted += 1;
  const baseCoins = 5 + Math.min(7, state.relayCombo);
  const coinGain = Math.max(1, Math.round(baseCoins * state.dayEffects.matchMultiplier));
  state.pendingMatchCoins += coinGain;
  const delivered = ticket.sequence.flatMap((item) => [item, item]);
  addIngredientsToOrders(delivered);
  state.relayQueue.shift();
  state.relayQueue.push(makeRelayTicket());
  showMessage(t("relayPerfect", { coins: coinGain, combo: state.relayCombo }));
  playSound(state.relayCombo >= 3 ? "chain" : "match");
  renderOrders();
  renderStats();
  renderBoard();
  setTimeout(() => {
    state.relayInput = [];
    state.relayLocked = false;
    if (state.started && isRelayCity()) renderBoard();
  }, RELAY_FEEDBACK_MS);
}

function ensureRelayStyles() {
  if (document.querySelector("#relayGameStyles")) return;
  const style = document.createElement("style");
  style.id = "relayGameStyles";
  style.textContent = `
    #board.relay-board{display:flex!important;flex-direction:column!important;gap:12px!important;min-height:430px!important;padding:12px!important;background:linear-gradient(150deg,rgba(255,250,231,.98),rgba(255,220,150,.94))!important}
    .relay-current{padding:14px;border-radius:18px;background:rgba(255,255,255,.92);box-shadow:0 7px 18px rgba(64,36,12,.13);text-align:center}
    .relay-current-head{display:flex;justify-content:space-between;align-items:center;gap:10px;font-weight:900;color:#6d361a}
    .relay-sequence{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;margin:15px 0}
    .relay-step{display:grid;place-items:center;width:58px;height:58px;border-radius:16px;background:#fff3cf;border:2px solid rgba(130,74,28,.2);font-size:32px;position:relative}
    .relay-step.is-done{background:#dff5d8;border-color:#53a85c;transform:translateY(-2px)}
    .relay-step.is-next{box-shadow:0 0 0 4px rgba(255,171,35,.25);animation:relayBounce .65s infinite alternate}
    .relay-step.is-hint{box-shadow:0 0 0 5px rgba(65,145,255,.3)}
    .relay-arrow{font-size:18px;color:#b16c2f;font-weight:900}
    .relay-next-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
    .relay-next-card{padding:9px;border-radius:13px;background:rgba(255,255,255,.66);text-align:center;font-size:21px;white-space:nowrap;overflow:hidden}
    .relay-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:auto}
    .relay-ingredient{border:0;border-radius:15px;padding:11px 6px;background:#fff;box-shadow:0 4px 10px rgba(70,33,10,.15);font-weight:900;cursor:pointer;color:#4b2a18}
    .relay-ingredient span{display:block;font-size:29px;margin-bottom:3px}.relay-ingredient:disabled{opacity:.48;cursor:not-allowed}.relay-ingredient.is-hint{animation:relayHint .55s infinite alternate;box-shadow:0 0 0 4px rgba(65,145,255,.25)}
    @keyframes relayBounce{from{transform:translateY(0)}to{transform:translateY(-4px)}}
    @keyframes relayHint{from{transform:scale(1)}to{transform:scale(1.05)}}
    @media(max-width:650px){.relay-step{width:48px;height:48px;font-size:27px}.relay-next-list{grid-template-columns:1fr}.relay-controls{grid-template-columns:repeat(2,minmax(0,1fr))}}
  `;
  document.head.append(style);
}

function renderRelayBoard() {
  ensureRelayStyles();
  if (!state.relayQueue.length) makeRelayBoard();
  const ticket = currentRelayTicket();
  if (!ticket) return;
  const sequenceMarkup = ticket.sequence.map((item, index) => {
    const done = index < state.relayInput.length;
    const next = index === state.relayInput.length;
    const hinted = next && state.relayHintIngredient === item;
    return `${index ? '<span class="relay-arrow">›</span>' : ''}<span class="relay-step${done ? ' is-done' : ''}${next ? ' is-next' : ''}${hinted ? ' is-hint' : ''}" title="${t(`ingredients.${item}`)}">${ingredient(item).emoji}</span>`;
  }).join("");
  const nextMarkup = state.relayQueue.slice(1).map((nextTicket) => `<div class="relay-next-card">${nextTicket.sequence.map((item) => ingredient(item).emoji).join(" › ")}</div>`).join("");
  el.board.innerHTML = `
    <section class="relay-current">
      <div class="relay-current-head"><span>${CUSTOMER_AVATARS[ticket.customer] || "🧑"} ${t("relayCurrent")}</span><span>${t("relayProgress")} ${state.relayInput.length}/${ticket.sequence.length}</span></div>
      <div class="relay-sequence">${sequenceMarkup}</div>
      <div class="relay-next-list" aria-label="${t("relayNext")}">${nextMarkup}</div>
    </section>
    <section class="relay-controls"></section>`;
  const controls = el.board.querySelector(".relay-controls");
  INGREDIENTS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `relay-ingredient${state.relayHintIngredient === item.id ? " is-hint" : ""}`;
    button.disabled = !state.started || state.relayLocked;
    button.innerHTML = `<span aria-hidden="true">${item.emoji}</span>${t(`ingredients.${item.id}`)}`;
    button.addEventListener("click", () => selectRelayIngredient(item.id));
    controls.append(button);
  });
}

const SOUND_CUE_PATTERNS = {
  skewer: { type: "triangle", notes: [[659, .08, 0], [880, .10, .12]] },
  noodle: { type: "sine", notes: [[330, .11, 0], [392, .11, .13], [494, .15, .27]] },
  dumpling: { type: "square", notes: [[220, .07, 0], [220, .07, .11], [440, .11, .23]] },
  fishcake: { type: "sine", notes: [[523, .05, 0], [659, .05, .07], [523, .05, .14], [784, .10, .22]] },
  tteok: { type: "triangle", notes: [[294, .07, 0], [294, .07, .10], [294, .09, .20]] },
  fruit: { type: "sine", notes: [[784, .07, 0], [988, .07, .09], [1175, .12, .18]] },
};

function clearSoundPlayback() {
  soundPlaybackTimers.forEach((timer) => clearTimeout(timer));
  soundPlaybackTimers = [];
  state.soundPlaying = false;
}

function playIngredientCue(ingredientId) {
  const context = getAudioContext();
  const pattern = SOUND_CUE_PATTERNS[ingredientId];
  if (!context || !pattern) return;
  pattern.notes.forEach(([frequency, duration, offset]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = pattern.type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + offset);
    gain.gain.setValueAtTime(.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(.075, context.currentTime + offset + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + offset + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + duration + .03);
  });
}

function makeSoundSequence() {
  const length = Math.min(SOUND_MAX_SEQUENCE_LENGTH, SOUND_BASE_SEQUENCE_LENGTH + Math.floor((state.soundRound - 1) / 2));
  const sequence = [];
  while (sequence.length < length) {
    const candidate = randomFrom(INGREDIENTS).id;
    if (candidate !== sequence[sequence.length - 1]) sequence.push(candidate);
  }
  state.soundSequence = sequence;
  state.soundInput = [];
  state.soundHintIngredient = null;
}

function makeSoundBoard() {
  state.soundRound = 1;
  state.soundCombo = 0;
  state.soundPlaying = false;
  state.soundHintIngredient = null;
  makeSoundSequence();
}

function playCurrentSoundSequence(slow = false) {
  if (!state.started || !isSoundCity() || state.soundPlaying || !state.soundSequence.length) return;
  clearSoundPlayback();
  state.soundPlaying = true;
  const gap = slow ? Math.round(SOUND_NOTE_GAP_MS * 1.45) : SOUND_NOTE_GAP_MS;
  renderBoard();
  state.soundSequence.forEach((ingredientId, index) => {
    soundPlaybackTimers.push(setTimeout(() => playIngredientCue(ingredientId), index * gap));
  });
  soundPlaybackTimers.push(setTimeout(() => {
    soundPlaybackTimers = [];
    state.soundPlaying = false;
    if (state.started && isSoundCity()) renderBoard();
  }, state.soundSequence.length * gap + 380));
}

function selectSoundIngredient(ingredientId) {
  if (!state.started || !isSoundCity() || state.soundPlaying) return;
  const expected = state.soundSequence[state.soundInput.length];
  playIngredientCue(ingredientId);
  if (ingredientId !== expected) {
    state.pendingPenalty += 1;
    state.soundCombo = 0;
    state.soundInput = [];
    state.soundHintIngredient = null;
    showMessage(t("soundMiss", { coins: 1 }));
    playSound("invalid");
    renderBoard();
    renderStats();
    return;
  }

  state.soundInput.push(ingredientId);
  state.soundHintIngredient = null;
  if (state.soundInput.length < state.soundSequence.length) {
    renderBoard();
    return;
  }

  state.soundCombo += 1;
  const baseCoins = 5 + state.soundSequence.length + Math.min(5, state.soundCombo);
  const coinGain = Math.max(1, Math.round(baseCoins * state.dayEffects.matchMultiplier));
  state.pendingMatchCoins += coinGain;
  addIngredientsToOrders(state.soundSequence.flatMap((item) => [item, item]));
  showMessage(t("soundPerfect", { coins: coinGain, combo: state.soundCombo }));
  playSound(state.soundCombo >= 3 ? "chain" : "match");
  state.soundPlaying = true;
  renderOrders();
  renderStats();
  renderBoard();
  soundPlaybackTimers.push(setTimeout(() => {
    soundPlaybackTimers = [];
    state.soundRound += 1;
    state.soundPlaying = false;
    makeSoundSequence();
    if (state.started && isSoundCity()) {
      renderBoard();
      setTimeout(() => playCurrentSoundSequence(false), 350);
    }
  }, 720));
}

function ensureSoundStyles() {
  if (document.querySelector("#soundGameStyles")) return;
  const style = document.createElement("style");
  style.id = "soundGameStyles";
  style.textContent = `
    #board.sound-board{display:flex!important;flex-direction:column!important;gap:14px!important;min-height:430px!important;padding:14px!important;background:radial-gradient(circle at top,#edf9ff,#cceaff 55%,#b9daf3)!important}
    .sound-console{padding:16px;border-radius:22px;background:rgba(255,255,255,.9);box-shadow:0 8px 22px rgba(22,72,110,.16);text-align:center}
    .sound-console-head{display:flex;justify-content:space-between;gap:10px;align-items:center;font-weight:900;color:#244e6b}
    .sound-wave{font-size:38px;letter-spacing:8px;margin:18px 0 12px;min-height:47px;color:#3d7da9}.sound-wave.is-playing{animation:soundWave .5s infinite alternate}
    .sound-progress{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:12px 0}
    .sound-slot{display:grid;place-items:center;width:50px;height:50px;border-radius:50%;background:#e9f4fb;border:2px solid rgba(41,104,146,.2);font-size:27px}.sound-slot.is-filled{background:#d9f4d9;border-color:#55a663}.sound-slot.is-hint{box-shadow:0 0 0 5px rgba(56,139,208,.24)}
    .sound-play-button{border:0;border-radius:999px;padding:10px 18px;background:#245f88;color:white;font-weight:900;cursor:pointer}.sound-play-button:disabled{opacity:.5;cursor:not-allowed}
    .sound-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:auto}
    .sound-ingredient{border:0;border-radius:17px;padding:12px 6px;background:rgba(255,255,255,.94);box-shadow:0 5px 12px rgba(22,72,110,.14);font-weight:900;color:#244e6b;cursor:pointer}.sound-ingredient span{display:block;font-size:31px;margin-bottom:4px}.sound-ingredient:disabled{opacity:.48;cursor:not-allowed}.sound-ingredient.is-hint{animation:soundHint .55s infinite alternate;box-shadow:0 0 0 4px rgba(56,139,208,.25)}
    @keyframes soundWave{from{transform:scaleY(.78);opacity:.6}to{transform:scaleY(1.13);opacity:1}}@keyframes soundHint{from{transform:scale(1)}to{transform:scale(1.05)}}
    @media(max-width:650px){.sound-controls{grid-template-columns:repeat(2,minmax(0,1fr))}.sound-console-head{align-items:flex-start;flex-direction:column}.sound-wave{font-size:31px}}
  `;
  document.head.append(style);
}

function renderSoundBoard() {
  ensureSoundStyles();
  if (!state.soundSequence.length) makeSoundBoard();
  const progress = state.soundSequence.map((item, index) => {
    const chosen = state.soundInput[index];
    const hinted = !chosen && index === state.soundInput.length && state.soundHintIngredient === item;
    return `<span class="sound-slot${chosen ? ' is-filled' : ''}${hinted ? ' is-hint' : ''}">${chosen ? ingredient(chosen).emoji : '♪'}</span>`;
  }).join("");
  el.board.innerHTML = `
    <section class="sound-console">
      <div class="sound-console-head"><span>${t("soundRound", { round: state.soundRound, count: state.soundSequence.length })}</span><span>${t("soundChoose")}</span></div>
      <div class="sound-wave${state.soundPlaying ? ' is-playing' : ''}" aria-hidden="true">${state.soundPlaying ? '▂▆█▃▇' : '♪ ♫ ♪'}</div>
      <button type="button" class="sound-play-button" ${state.soundPlaying || !state.started ? 'disabled' : ''}>${state.soundPlaying ? t("soundListening") : state.soundInput.length ? t("soundReplay") : t("soundPlay")}</button>
      <div class="sound-progress">${progress}</div>
    </section>
    <section class="sound-controls"></section>`;
  el.board.querySelector(".sound-play-button").addEventListener("click", () => playCurrentSoundSequence(false));
  const controls = el.board.querySelector(".sound-controls");
  INGREDIENTS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `sound-ingredient${state.soundHintIngredient === item.id ? " is-hint" : ""}`;
    button.disabled = !state.started || state.soundPlaying;
    button.innerHTML = `<span aria-hidden="true">${item.emoji} 🔊</span>${t(`ingredients.${item.id}`)}`;
    button.addEventListener("click", () => selectSoundIngredient(item.id));
    controls.append(button);
  });
}

function makeActiveBoard(preview = false) {
  if (isMemoryCity()) makeMemoryBoard(preview);
  else if (isGrillCity()) makeGrillBoard();
  else if (isRelayCity()) makeRelayBoard();
  else if (isSoundCity()) makeSoundBoard();
  else makeBoard();
}

function memoryIngredientName(card) { return card?.names?.[state.language] || card?.names?.["zh-CN"] || ""; }

function isMatchAt(row, col) {
  const value = state.board[row]?.[col];
  if (!value) return false;
  let horizontal = 1;
  for (let x = col - 1; x >= 0 && state.board[row][x] === value; x -= 1) horizontal += 1;
  for (let x = col + 1; x < SIZE && state.board[row][x] === value; x += 1) horizontal += 1;
  let vertical = 1;
  for (let y = row - 1; y >= 0 && state.board[y][col] === value; y -= 1) vertical += 1;
  for (let y = row + 1; y < SIZE && state.board[y][col] === value; y += 1) vertical += 1;
  return horizontal >= 3 || vertical >= 3;
}

function swap(first, second) {
  const temporary = state.board[first.row][first.col];
  state.board[first.row][first.col] = state.board[second.row][second.col];
  state.board[second.row][second.col] = temporary;
}

function findAvailableMove() {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      for (const [rowOffset, colOffset] of [[0, 1], [1, 0]]) {
        const next = { row: row + rowOffset, col: col + colOffset };
        if (next.row >= SIZE || next.col >= SIZE) continue;
        const current = { row, col };
        swap(current, next);
        const playable = isMatchAt(current.row, current.col) || isMatchAt(next.row, next.col);
        swap(current, next);
        if (playable) return { first: current, second: next };
      }
    }
  }
  return null;
}

function hasAvailableMove() { return Boolean(findAvailableMove()); }

function findMatches() {
  const matched = new Set();
  for (let row = 0; row < SIZE; row += 1) {
    let runStart = 0;
    for (let col = 1; col <= SIZE; col += 1) {
      if (col < SIZE && state.board[row][col] === state.board[row][runStart]) continue;
      if (col - runStart >= 3) for (let index = runStart; index < col; index += 1) matched.add(`${row},${index}`);
      runStart = col;
    }
  }
  for (let col = 0; col < SIZE; col += 1) {
    let runStart = 0;
    for (let row = 1; row <= SIZE; row += 1) {
      if (row < SIZE && state.board[row][col] === state.board[runStart][col]) continue;
      if (row - runStart >= 3) for (let index = runStart; index < row; index += 1) matched.add(`${index},${col}`);
      runStart = row;
    }
  }
  return matched;
}

function shuffleBoardContents() {
  const tiles = state.board.flat();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    for (let index = tiles.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [tiles[index], tiles[target]] = [tiles[target], tiles[index]];
    }
    state.board = Array.from({ length: SIZE }, (_, row) => tiles.slice(row * SIZE, (row + 1) * SIZE));
    if (!findMatches().size && hasAvailableMove()) return;
  }
  makeBoard();
}

function makeOrder(templateIndex = Math.floor(Math.random() * ORDER_TEMPLATES.length)) {
  const template = ORDER_TEMPLATES[templateIndex];
  const patienceMax = Math.max(24, 44 - (state.expansionLevel - 1) * 3 + Math.floor(Math.random() * 7));
  const recipeDifficulty = Math.min(3, Math.floor(state.orderCount / 5));
  return { id: nextOrderId++, customer: template.customer, reward: template.reward, complete: false, failed: false, penaltyApplied: false, patience: patienceMax, patienceMax, phase: "entering", arrivalSide: Math.random() < .5 ? "left" : "right", exitSide: null,
    items: template.items.map((id, index) => ({ id, need: Math.min(6, 3 + recipeDifficulty + ((state.orderCount + index) % 2)), have: 0 })) };
}

function orderSlotCount() { return 3 + (state.expansionLevel - 1); }
function makeStartingOrders() { return Array.from({ length: orderSlotCount() }, (_, index) => makeOrder(index % ORDER_TEMPLATES.length)); }
function canAcceptNewOrders() { return state.started && state.timeLeft > 10; }
function ensureOrderCapacity() {
  if (!canAcceptNewOrders()) return;
  while (state.orders.length < orderSlotCount()) state.orders.push(makeOrder());
  renderOrders(); renderCustomerStage();
}

function renderBoard() {
  el.board.innerHTML = "";
  const memoryMode = isMemoryCity();
  const grillMode = isGrillCity();
  const relayMode = isRelayCity();
  const soundMode = isSoundCity();
  el.board.classList.toggle("memory-board", memoryMode);
  el.board.classList.toggle("memory-preview", memoryMode && state.memoryPreview);
  el.board.classList.toggle("grill-board", grillMode);
  el.board.classList.toggle("relay-board", relayMode);
  el.board.classList.toggle("sound-board", soundMode);
  const boardLabelKey = memoryMode ? "memoryBoardLabel" : grillMode ? "grillBoardLabel" : relayMode ? "relayBoardLabel" : soundMode ? "soundBoardLabel" : "dragHelp";
  el.board.setAttribute("aria-label", t(boardLabelKey).replace(/<[^>]+>/g, ""));
  el.gameTip.textContent = t(memoryMode ? "memoryTip" : grillMode ? "grillTip" : relayMode ? "relayTip" : soundMode ? "soundTip" : "matchTip");
  el.gameInstructions.innerHTML = t(memoryMode ? "memoryHelp" : grillMode ? "grillHelp" : relayMode ? "relayHelp" : soundMode ? "soundHelp" : "dragHelp");
  if (memoryMode) {
    el.board.dataset.previewLabel = state.memoryPreview ? t("memoryPreview", { seconds: state.memoryPreviewSeconds }) : "";
    const selected = new Set(state.memorySelected);
    state.memoryCards.forEach((card, index) => {
      const revealed = state.memoryPreview || state.memoryRevealAll || card.matched || selected.has(index);
      const button = document.createElement("button");
      button.className = `tile memory-card tile-${card.orderIngredient}${revealed ? " is-revealed" : ""}${card.matched ? " is-matched" : ""}`;
      button.type = "button"; button.dataset.memoryIndex = String(index); button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", revealed ? memoryIngredientName(card) : t("memoryHiddenCard"));
      button.disabled = !state.started || state.memoryPreview || state.memoryRevealAll || state.memoryLock || card.matched;
      button.innerHTML = `<span class="memory-card-inner"><span class="memory-card-cover" aria-hidden="true">✦</span><span class="memory-card-ingredient" aria-hidden="true">${card.emoji}</span></span>`;
      button.addEventListener("click", () => selectMemoryCard(index));
      el.board.append(button);
    });
    return;
  }
  delete el.board.dataset.previewLabel;
  if (grillMode) {
    renderGrillBoard();
    return;
  }
  if (relayMode) {
    renderRelayBoard();
    return;
  }
  if (soundMode) {
    renderSoundBoard();
    return;
  }
  state.board.forEach((row, rowIndex) => row.forEach((tileId, colIndex) => {
    const data = ingredient(tileId);
    const button = document.createElement("button");
    button.className = `tile tile-${tileId}`; button.type = "button"; button.dataset.row = String(rowIndex); button.dataset.col = String(colIndex);
    button.setAttribute("role", "gridcell"); button.setAttribute("aria-label", t(`ingredients.${data.id}`)); button.textContent = data.emoji;
    button.addEventListener("pointerdown", (event) => startDrag(event, rowIndex, colIndex));
    button.addEventListener("pointermove", moveDrag);
    button.addEventListener("pointerup", endDrag);
    button.addEventListener("pointercancel", endDrag);
    el.board.append(button);
  }));
}

function renderOrders() {
  el.orders.innerHTML = "";
  el.orders.dataset.count = String(state.orders.length);
  state.orders.forEach((order) => {
    const card = document.createElement("article");
    card.className = `order-card${order.complete ? " is-complete" : ""}${order.failed ? " is-failed" : ""}${!order.complete && !order.failed && order.patience <= 10 ? " is-urgent" : ""}`;
    const items = order.items.map((item) => {
      const data = ingredient(item.id); const done = item.have >= item.need;
      return `<span class="order-item${done ? " done" : ""}" title="${t(`ingredients.${item.id}`)}">${data.emoji} <b>${Math.min(item.have, item.need)}/${item.need}</b></span>`;
    }).join("");
    const displayedReward = Math.round(order.reward * state.dayEffects.orderMultiplier);
    const patiencePercent = Math.max(0, Math.round(order.patience / order.patienceMax * 100));
    card.innerHTML = `<div class="order-top"><span class="customer">${t(`customers.${order.customer}`)}</span><span class="reward">+${displayedReward} 🪙</span></div><div class="order-patience"><span style="width:${patiencePercent}%"></span><b>${Math.max(0, order.patience)}s</b></div><div class="order-items">${items}</div>`;
    el.orders.append(card);
  });
  el.orderProgress.textContent = String(state.orderCount);
}

function renderCustomerStage() {
  if (!el.customerStage) return;
  el.customerStage.innerHTML = "";
  if (!state.started) return;
  const seats = orderSlotCount(); el.customerStage.style.setProperty("--seat-count", String(seats));
  for (let index = 0; index < seats; index += 1) {
    const order = state.orders[index]; const slot = document.createElement("div"); slot.className = "guest-slot"; slot.style.setProperty("--seat-left", `${((index + 1) / (seats + 1)) * 100}%`);
    const chair = document.createElement("span"); chair.className = "guest-chair"; chair.textContent = "🪑"; slot.append(chair);
    if (order) {
      const guest = document.createElement("span"); const side = order.phase === "leaving" ? order.exitSide : order.arrivalSide;
      guest.className = `market-guest guest-${order.phase || "entering"} guest-${side || "left"}`;
      const food = order.phase === "leaving" && !order.failed ? ingredient(order.items[0].id)?.emoji || "🥡" : "";
      guest.innerHTML = `<b>${CUSTOMER_AVATARS[order.customer] || "🧑"}</b>${food ? `<i>${food}</i>` : order.failed ? `<i>💢</i>` : ""}`; guest.title = t(`customers.${order.customer}`); slot.append(guest);
    }
    el.customerStage.append(slot);
  }
}

function orderPenalty(order) { return Math.max(1, Math.round(order.reward * state.dayEffects.orderMultiplier * .5)); }
function failOrder(orderIndex, replace = true) {
  const order = state.orders[orderIndex];
  if (!order || order.complete || order.failed || order.penaltyApplied) return 0;
  const penalty = orderPenalty(order); order.failed = true; order.penaltyApplied = true; order.phase = "leaving"; order.exitSide = Math.random() < .5 ? "left" : "right";
  state.pendingPenalty += penalty; state.failedOrders += 1; showMessage(t("orderFailed", { coins: penalty })); playSound("invalid"); renderOrders(); renderCustomerStage(); renderStats();
  if (replace) setTimeout(() => {
    if (state.orders[orderIndex] === order && canAcceptNewOrders()) state.orders[orderIndex] = makeOrder();
    renderOrders(); renderCustomerStage(); renderStats();
  }, 950);
  return penalty;
}
function tickOrderPatience() {
  if (!state.started) return;
  const expired = [];
  state.orders.forEach((order, index) => { if (!order.complete && !order.failed) { order.patience -= 1; if (order.patience <= 0) expired.push(index); } });
  expired.forEach((index) => failOrder(index, true));
  if (!expired.length) renderOrders();
}
function assessClosingPenalties() {
  state.orders.forEach((order) => {
    if (order.complete || order.failed || order.penaltyApplied) return;
    order.failed = true; order.penaltyApplied = true; order.phase = "leaving"; order.exitSide = Math.random() < .5 ? "left" : "right";
    state.pendingPenalty += orderPenalty(order); state.failedOrders += 1;
  });
}

function decorScore() {
  return allInstalledItemIds().reduce((sum, id) => sum + (decorItem(id)?.score || 0), 0);
}

function placementLimit() { return 3 + (state.expansionLevel - 1) * 2 + Math.floor(Math.min(MAX_DECOR_CAPACITY_SCORE, decorScore()) / 150); }
function trimExcessPlacements() {
  let removed = 0;
  while (installedSlotCount() > placementLimit() && state.installed.length) {
    state.installed.pop(); state.placements.pop(); removed += 1;
  }
  if (removed && state.selectedPlacement?.mode === "move" && state.selectedPlacement.index >= state.installed.length) state.selectedPlacement = null;
  return removed;
}
function isItemUnlocked(item) { return (item.unlockScore || 0) <= state.decorMilestone; }

function checkDecorMilestones(announce = true) {
  if (state.activeCityId !== "shanghai") return false;
  const score = decorScore();
  const target = score < 300 ? 0 : Math.min(1000, 300 + Math.floor((score - 300) / 100) * 100);
  let unlocked = false;
  while (state.decorMilestone < target) {
    state.decorMilestone = state.decorMilestone < 300 ? 300 : state.decorMilestone + 100;
    unlocked = true;
    if (announce) showMessage(t("newItemsUnlocked", { score: state.decorMilestone }));
    if (announce && state.decorMilestone % 500 === 0) setTimeout(() => showMessage(t("newLegendaryUnlocked", { score: state.decorMilestone })), 500);
    if (announce && state.decorMilestone % 300 === 0) setTimeout(() => showMessage(t("stoveSlotUnlocked", { score: state.decorMilestone })), 850);
  }
  if (unlocked) { playSound("unlock"); saveProgress(); }
  return unlocked;
}

function renderPetLootButtons() {
  const catCount = state.petLoot.cat.length; const dogCount = state.petLoot.dog.length;
  el.catLootCount.textContent = String(catCount); el.dogLootCount.textContent = String(dogCount);
  el.catLootButton.classList.toggle("has-loot", catCount > 0); el.dogLootButton.classList.toggle("has-loot", dogCount > 0);
  el.catLootButton.title = `${t("catLootHelp")} · ${catCount}`; el.dogLootButton.title = `${t("dogLootHelp")} · ${dogCount}`;
}

function renderDecorMenu() {
  renderPetLootButtons();
  checkDecorMilestones(false);
  const score = decorScore();
  const totalCapacity = placementLimit();
  el.decorScore.textContent = String(score); el.slotCount.textContent = `${installedSlotCount()}/${totalCapacity}`;
  el.expansionStatus.textContent = `${t("expansionStatus", { level: state.expansionLevel, bonus: (state.expansionLevel - 1) * 15 })} · ${decorGridSize()}×${decorGridSize()} · ${t("expansionSlots", { slots: (state.expansionLevel - 1) * 2 })} · ${t("stoveSlots", { count: stoveSlotCount() })} · ${t("expansionCustomers", { count: orderSlotCount() })}`;
  if (document.activeElement !== el.stallNameInput) el.stallNameInput.value = state.stallCustomName;
  const canRename = !state.stallNameLocked || state.nameChangeTickets > 0;
  el.stallNameInput.disabled = !canRename; el.saveStallName.disabled = !canRename;
  if (state.decorMilestone >= 1000) el.unlockHint.textContent = t("allItemsUnlocked");
  else {
    const next = state.decorMilestone < 300 ? 300 : state.decorMilestone + 100;
    el.unlockHint.textContent = t("itemUnlockHint", { points: Math.max(0, next - score) });
  }
  const nextTarget = state.decorMilestone >= 1000 ? 1000 : state.decorMilestone < 300 ? 300 : state.decorMilestone + 100;
  el.unlockProgressBar.style.width = `${Math.min(100, score / nextTarget * 100)}%`;
  el.unlockProgressText.textContent = t("unlockProgress", { current: Math.min(score, nextTarget), target: nextTarget });
  const totalItems = Object.values(state.inventory).reduce((sum, count) => sum + count, 0) + state.boosters.epic + state.boosters.legendary;
  el.bagCount.textContent = String(totalItems);
  el.decorInventory.innerHTML = "";
  el.bagSort.value = state.bagSort;
  el.bagRarity.value = state.bagRarity;
  el.bagGroup.value = state.bagGroup;
  const rarityRank = { legendary: 4, epic: 3, rare: 2, common: 1 };
  const itemNameCompare = (a, b) => itemName(a).localeCompare(itemName(b), state.language);
  const selectedComparator = (a, b) => {
    if (state.bagSort === "name") return itemNameCompare(a, b);
    if (state.bagSort === "price") return b.value - a.value || b.score - a.score || itemNameCompare(a, b);
    if (state.bagSort === "effect") return Number(Boolean(ITEM_EFFECTS[b.id])) - Number(Boolean(ITEM_EFFECTS[a.id])) || itemEffectText(a).localeCompare(itemEffectText(b), state.language) || b.score - a.score;
    if (state.bagSort === "acquired") return (state.acquisitionOrder[b.id] || 0) - (state.acquisitionOrder[a.id] || 0) || itemNameCompare(a, b);
    if (state.bagSort === "rarity") return rarityRank[a.rarity] - rarityRank[b.rarity] || b.score - a.score || itemNameCompare(a, b);
    return b.score - a.score || rarityRank[b.rarity] - rarityRank[a.rarity] || itemNameCompare(a, b);
  };
  const ownedItems = activeCityItems()
    .filter((item) => (state.inventory[item.id] || 0) > 0)
    .filter((item) => state.bagRarity === "all" || item.rarity === state.bagRarity)
    .sort((a, b) => state.bagGroup === "rarity" ? rarityRank[a.rarity] - rarityRank[b.rarity] || selectedComparator(a, b) : selectedComparator(a, b));
  const showBoosters = state.bagRarity === "all";
  for (const type of showBoosters ? ["epic", "legendary"] : []) {
    const count = state.boosters[type];
    if (!count) continue;
    const card = document.createElement("article");
    card.className = `decor-card inventory-card booster-card rarity-${type}`;
    card.innerHTML = `<span class="item-count">×${count}</span><span class="decor-art">${type === "epic" ? "🟣" : "🟡"}🎁</span><span class="decor-name">${t(type === "epic" ? "boosterEpicName" : "boosterLegendaryName")}</span><span class="item-effect">${t(type === "epic" ? "boosterEpicDesc" : "boosterLegendaryDesc")}</span><div class="inventory-actions"><button class="place-button" type="button">${t("boosterUse")}</button></div>`;
    card.addEventListener("pointerdown", (event) => event.stopPropagation());
    card.querySelector("button").addEventListener("click", () => useBooster(type));
    el.decorInventory.append(card);
  }
  if (!ownedItems.length && (!showBoosters || (!state.boosters.epic && !state.boosters.legendary))) {
    const empty = document.createElement("p"); empty.className = "empty-bag"; empty.textContent = t("emptyBag"); el.decorInventory.append(empty); return;
  }
  let renderedRarity = null;
  ownedItems.forEach((item) => {
    if (state.bagGroup === "rarity" && item.rarity !== renderedRarity) {
      renderedRarity = item.rarity; const heading = document.createElement("h3"); heading.className = `inventory-rarity-heading rarity-${item.rarity}`;
      heading.textContent = `${t(item.rarity)} · ${ownedItems.filter((ownedItem) => ownedItem.rarity === item.rarity).length}`; el.decorInventory.append(heading);
    }
    const placed = installedCount(item.id); const count = state.inventory[item.id]; const kind = placementKind(item); const canAddCopy = kind !== "passive" && count > placed;
    const card = document.createElement("article");
    const selected = state.selectedPlacement?.itemId === item.id;
    card.className = `decor-card inventory-card rarity-${item.rarity}${placed ? " is-installed" : ""}${selected ? " is-selected-for-placement" : ""}`;
    card.dataset.placementKind = kind;
    if (item.designTier) card.dataset.designTier = String(item.designTier);
    card.tabIndex = 0;
    const effect = itemEffectText(item);
    card.innerHTML = `<span class="item-count">×${count}</span>${decorAssetMarkup(item)}<span class="decor-name">${itemName(item)}</span><span class="rarity-label rarity-${item.rarity}">${t(item.rarity)} · +${item.score}⭐</span>${kind === "slot" ? `<span class="placement-kind-badge">📌 ${t("slotBadge")}</span>` : kind === "passive" ? `<span class="placement-kind-badge passive-kind-badge">⚡ ${t("passiveBadge")}</span>` : ""}${effect ? `<span class="item-effect">${effect}</span>` : ""}<span class="decor-description">${placed ? t("placedCount", { count: placed }) : t("owned", { count })}</span><div class="inventory-actions">${canAddCopy ? `<button class="place-button" type="button">${t("install")}</button>` : ""}${placed ? `<button class="remove-button" type="button">${t("remove")}</button>` : ""}<button class="sell-button" type="button">${t("sell", { price: Math.floor(item.value * RESALE_RATE) })}</button></div>`;
    bindAssetFallback(card);
    const toggle = () => canAddCopy ? installItem(item) : kind === "floor" ? selectPlacedDecoration(state.installed.indexOf(item.id)) : showMessage(kind === "passive" ? itemEffectText(item) : t("slotPlacementHelp"));
    card.addEventListener("pointerdown", (event) => event.stopPropagation());
    card.addEventListener("click", (event) => { if (!event.target.closest(".sell-button, .remove-button")) toggle(); });
    card.addEventListener("keydown", (event) => { if ((event.key === "Enter" || event.key === " ") && !event.target.closest(".sell-button, .remove-button")) { event.preventDefault(); toggle(); } });
    card.querySelector(".place-button")?.addEventListener("click", (event) => { event.stopPropagation(); installItem(item); });
    card.querySelector(".remove-button")?.addEventListener("click", (event) => { event.stopPropagation(); removeItemPlacement(item); });
    card.querySelector(".sell-button").addEventListener("click", (event) => { event.stopPropagation(); sellItem(item); });
    el.decorInventory.append(card);
  });
}

function renderStalls() {
  document.querySelectorAll(".stall").forEach((stall) => {
    stall.classList.remove("expansion-2", "expansion-3", "expansion-4");
    if (state.expansionLevel > 1) stall.classList.add(`expansion-${state.expansionLevel}`);
    const sign = stall.querySelector(".stall-sign"); if (sign) sign.textContent = state.stallCustomName || t("stallName");
    const layer = stall.querySelector(".installed-decor-layer"); if (!layer) return;
    layer.innerHTML = "";
    const visibleInstalled = allInstalledItemIds();
    visibleInstalled.slice(0, 12).forEach((id) => {
      const item = decorItem(id); if (!item) return;
      const decoration = document.createElement("img"); decoration.className = "installed-decor"; decoration.src = decorAssetPath(item) || window.gameAssetCatalog?.fallbackUrl; decoration.alt = ""; decoration.dataset.gameAsset = item.id; decoration.title = itemName(item); layer.append(decoration); bindAssetFallback(layer);
    });
    if (visibleInstalled.length > 12) {
      const overflow = document.createElement("span"); overflow.className = "decor-overflow-badge"; overflow.textContent = `+${visibleInstalled.length - 12}`; layer.append(overflow);
    }
  });
  renderDecorRoom();
}

function updatePlacementToolbar() {
  const selection = state.selectedPlacement;
  const helpKeys = { furniture: "placementHelp", move: "moveModeHelp", floor: "floorModeHelp", delete: "deleteModeHelp" };
  el.placementHelp.textContent = selection?.mode === "slot" ? t("slotPlacementHelp") : t(helpKeys[state.decorEditMode] || "placementHelp");
  if (!selection) el.placementSelection.textContent = t(state.decorEditMode === "floor" ? "floorPalette" : state.decorEditMode === "move" ? "moveMode" : state.decorEditMode === "delete" ? "deleteMode" : "placementNone");
  else {
    const item = decorItem(selection.itemId);
    if (selection.mode === "slot") el.placementSelection.textContent = t("slotPlacementSelected", { name: item ? itemName(item) : "" });
    else {
      const footprint = furnitureFootprint(item, selection.rotation || 0);
      el.placementSelection.textContent = `${t(selection.mode === "move" ? "placementMoving" : "placementSelected", { name: item ? itemName(item) : "" })} · ${footprint.width}×${footprint.height} · ${((selection.rotation || 0) * 90)}°`;
    }
  }
  el.cancelPlacement.disabled = !selection; el.rotateFurniture.disabled = !selection || selection.mode === "slot";
  el.floorPalette.classList.toggle("hidden", state.decorEditMode !== "floor");
  el.floorPalette.querySelectorAll("[data-floor]").forEach((button) => button.classList.toggle("is-active", button.dataset.floor === state.selectedFloorStyle));
  el.decorFurnitureMode.classList.toggle("is-active", state.decorEditMode === "furniture");
  el.decorMoveMode.classList.toggle("is-active", state.decorEditMode === "move");
  el.decorGridMode.classList.toggle("is-active", state.decorEditMode === "floor");
  el.decorDeleteMode.classList.toggle("is-active", state.decorEditMode === "delete");
}

function setDecorMode(mode) {
  state.decorEditMode = ["furniture", "move", "floor", "delete"].includes(mode) ? mode : "furniture";
  state.selectedPlacement = null; state.showDecorGrid = state.decorEditMode !== "furniture";
  updatePlacementToolbar(); renderDecorRoom(); playSound("pickup");
}

function selectPlacedDecoration(index) {
  if (index < 0 || index >= state.installed.length) return;
  if (state.decorEditMode === "floor") return;
  if (state.decorEditMode === "delete") { deletePlacedDecoration(index); return; }
  const placement = state.placements[index]; state.decorEditMode = "move";
  state.selectedPlacement = { mode: "move", index, itemId: state.installed[index], rotation: placement?.rotation || 0 };
  updatePlacementToolbar(); renderDecorRoom(); playSound("pickup");
}

function cancelPlacementSelection() {
  state.selectedPlacement = null; updatePlacementToolbar(); renderDecorMenu(); renderDecorRoom();
}

function deletePlacedDecoration(index) {
  const item = decorItem(state.installed[index]); if (!item || !window.confirm(t("deleteFurnitureConfirm", { name: itemName(item) }))) return;
  removeInstalledAt(index); state.selectedPlacement = null; saveProgress(); renderAll(); showMessage(t("furnitureDeleted", { name: itemName(item) })); playSound("sell");
}

function rotateSelectedFurniture() {
  const selection = state.selectedPlacement; if (!selection) { playSound("invalid"); return; }
  const item = decorItem(selection.itemId); const rotation = ((selection.rotation || 0) + 1) % 4;
  if (selection.mode === "move") {
    const placement = state.placements[selection.index];
    if (!placement || !canPlaceFurniture(item, placement.x, placement.y, rotation, selection.index)) { showMessage(t("rotationBlocked")); playSound("invalid"); return; }
  }
  selection.rotation = rotation; updatePlacementToolbar(); renderDecorRoom(); playSound("pickup");
}

function paintFloorAt(x, y) {
  if (state.decorEditMode !== "floor" || !FLOOR_STYLES.has(state.selectedFloorStyle)) return;
  state.floorTiles[placementKey(x, y)] = state.selectedFloorStyle; saveProgress(); renderDecorRoom(); playSound("pickup");
}

function applyDecorCamera() {
  window.decorWorldRuntime?.setCamera(state.decorCamera);
}

function adjustDecorZoom(delta) {
  state.decorCamera.zoom = Math.max(.7, Math.min(2.2, Math.round((state.decorCamera.zoom + delta) * 10) / 10)); applyDecorCamera(); saveProgress();
}

function resetDecorCameraView() {
  state.decorCamera = { x: 0, y: 0, zoom: 1 }; applyDecorCamera(); saveProgress(); playSound("pickup");
}

function activateDecorTile(x, y, occupiedIndex = -1, source = "click") {
  if (!Number.isInteger(x) || !Number.isInteger(y) || state.suppressDecorClick) return false;
  const now = Date.now(); const previous = state.lastDecorActivation;
  if (previous && previous.x === x && previous.y === y && now - previous.at < 450) return false;
  state.lastDecorActivation = { x, y, at: now, source };
  if (state.decorEditMode === "floor") { paintFloorAt(x, y); return true; }
  if (state.selectedPlacement) { placeSelectedAt(x, y); return true; }
  if (occupiedIndex >= 0) { selectPlacedDecoration(occupiedIndex); return true; }
  return false;
}

function placeSelectedAt(x, y) {
  const selection = state.selectedPlacement; if (!selection) return;
  if (selection.mode === "slot") { showMessage(t("slotIncompatible")); playSound("invalid"); return; }
  normalizePlacements();
  const item = decorItem(selection.itemId); if (!item) return;
  const rotation = selection.rotation || 0; const excludeIndex = selection.mode === "move" ? selection.index : -1;
  if (!canPlaceFurniture(item, x, y, rotation, excludeIndex)) { showMessage(t("placementBlocked")); playSound("invalid"); window.decorWorldRuntime?.sync(); return; }
  if (selection.mode === "move") {
    if (!state.placements[selection.index]) return;
    state.placements[selection.index] = { uid: state.placements[selection.index].uid || newPlacementUid(), id: item.id, x, y, rotation };
  } else {
    if ((state.inventory[item.id] || 0) <= installedCount(item.id)) return;
    if (!SLOT_FREE_ITEMS.has(item.id) && installedSlotCount() >= placementLimit()) { showMessage(t("noSlot")); playSound("invalid"); return; }
    state.installed.push(item.id); state.placements.push({ uid: newPlacementUid(), id: item.id, x, y, rotation });
    showMessage(t("itemInstalled", { name: itemName(item) })); playSound("coin"); checkDecorMilestones(true);
  }
  state.selectedPlacement = null; saveProgress(); renderDecorMenu(); renderStalls(); renderShop(); renderStats();
}

function renderDecorRoom() {
  if (!el.decorGrid) return;
  normalizePlacements(); updatePlacementToolbar();
  el.decorRoom.dataset.size = String(decorGridSize()); el.decorGrid.dataset.mode = state.decorEditMode;
  window.decorWorldRuntime?.sync();
}

function scoreChestItems(score) { return BONUS_DECOR_ITEMS.filter((item) => item.unlockScore === score); }
function scoreChestPrice(score) {
  const common = scoreChestItems(score).find((item) => item.rarity === "common");
  return common ? Math.max(0, Math.floor(common.value * RESALE_RATE) * 7 - 100) : 0;
}
function scoreChestOdds(score) { return scoreChestItems(score).some((item) => item.rarity === "legendary") ? { common: 70, rare: 20, epic: 7, legendary: 3 } : { common: 70, rare: 20, epic: 10, legendary: 0 }; }
function rollScoreChestItem(score) {
  const pool = scoreChestItems(score); const odds = scoreChestOdds(score); const roll = Math.random() * 100;
  const rarity = roll < odds.common ? "common" : roll < odds.common + odds.rare ? "rare" : roll < odds.common + odds.rare + odds.epic ? "epic" : "legendary";
  return randomFrom(pool.filter((item) => item.rarity === rarity));
}

function renderScoreChests() {
  el.scoreChestGrid.innerHTML = "";
  const scores = state.activeCityId === "shanghai" ? UNLOCK_THEMES.map(([score]) => score).filter((score) => score <= state.decorMilestone) : [];
  if (!scores.length) { const empty = document.createElement("p"); empty.className = "score-chest-empty"; empty.textContent = t("scoreChestEmpty"); el.scoreChestGrid.append(empty); return; }
  scores.forEach((score) => {
    const price = scoreChestPrice(score); const odds = scoreChestOdds(score); const latest = score === scores[scores.length - 1];
    const card = document.createElement("article"); card.className = `score-chest-card${latest ? " is-latest" : ""}`;
    card.innerHTML = `<span class="score-chest-glow">${score >= 900 ? "🌟" : score >= 600 ? "💜" : "🎁"}</span><div><small>${score} ⭐</small><strong>${t("scoreChestName", { score })}</strong><p>${t("scoreChestPool", { epic: odds.epic, legendary: odds.legendary ? t("scoreChestLegendaryOdds") : "" })}</p></div><button type="button">${t("scoreChestDraw", { price })}</button>`;
    const button = card.querySelector("button"); button.disabled = state.drawing || state.coins < price; button.addEventListener("click", () => drawScoreChest(score)); el.scoreChestGrid.append(card);
  });
}

async function drawScoreChest(score) {
  const price = scoreChestPrice(score);
  if (state.activeCityId !== "shanghai" || score > state.decorMilestone || state.drawing || state.coins < price) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
  const item = rollScoreChestItem(score); state.coins -= price; state.drawing = true; state.lastDraw = null; getAudioContext();
  clearGachaEffects(); el.gachaPreview.textContent = "🎁"; el.gachaMachine.classList.add("is-drawing"); saveProgress(); renderStats(); renderScoreChests();
  for (let index = 0; index < 6; index += 1) { playSound("pickup"); await delay(65 + index * 10); }
  el.gachaMachine.classList.remove("is-drawing"); el.gachaMachine.classList.add(`reveal-${item.rarity}`);
  await delay({ common: 420, rare: 600, epic: 900, legendary: 1250 }[item.rarity]);
  addInventoryItem(item.id); state.lastDraw = { type: "item", itemId: item.id }; el.gachaPreview.innerHTML = decorAssetMarkup(item, "gacha-preview-image"); bindAssetFallback(el.gachaPreview);
  playSound(`gacha${item.rarity[0].toUpperCase()}${item.rarity.slice(1)}`); showMessage(t("scoreChestResult", { score, name: itemName(item) })); updateCityTabUnlock(true);
  state.drawing = false; saveProgress(); renderAll(); setTimeout(clearGachaEffects, 900);
}

function activeBackgroundId() {
  const id = state.activeBackgrounds[state.activeCityId] || "default";
  return state.ownedBackgrounds.has(id) && BACKGROUNDS.some((background) => background.id === id) ? id : "default";
}

function renderBackgroundShop() {
  el.backgroundGrid.innerHTML = ""; const activeId = activeBackgroundId();
  BACKGROUNDS.forEach((background) => {
    const owned = state.ownedBackgrounds.has(background.id); const active = activeId === background.id;
    const card = document.createElement("article"); card.className = `background-card background-preview-${background.id}${active ? " is-active" : ""}`;
    card.innerHTML = `<span>${background.icon}</span><div><strong>${t(background.nameKey)}</strong><small>${owned ? t("backgroundOwned") : `${background.cost}元`}</small></div><button type="button">${active ? t("backgroundEquipped") : owned ? t("backgroundEquip") : t("backgroundBuy")}</button>`;
    const button = card.querySelector("button"); button.disabled = active || (!owned && state.cityMoney < background.cost); button.addEventListener("click", () => buyOrEquipBackground(background)); el.backgroundGrid.append(card);
  });
}

function buyOrEquipBackground(background) {
  const owned = state.ownedBackgrounds.has(background.id);
  if (!owned) {
    if (state.cityMoney < background.cost) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
    state.cityMoney -= background.cost; state.ownedBackgrounds.add(background.id); showMessage(t("backgroundBought", { name: t(background.nameKey) })); playSound("legendary");
  } else { showMessage(t("backgroundEquippedMessage", { name: t(background.nameKey) })); playSound("unlock"); }
  state.activeBackgrounds[state.activeCityId] = background.id; applyCityTheme(); saveProgress(); renderAll();
}

function renderShop() {
  updateCityTabUnlock(false);
  el.drawButton.disabled = state.drawing || state.coins < DRAW_COST;
  el.drawTenButton.disabled = state.drawing || state.coins < TEN_DRAW_COST;
  el.shopCityMoney.textContent = String(state.cityMoney);
  el.buyNameTicket.disabled = state.cityMoney < 1500;
  const expansionPrice = expansionTicketPrice(); el.expansionTicketHelp.textContent = t("expansionTicketPriceRule");
  el.buyExpansionTicket.textContent = state.expansionLevel >= 4 ? t("expansionTicketMaxed") : t("expansionTicketBuy", { price: expansionPrice });
  el.buyExpansionTicket.disabled = state.expansionLevel >= 4 || state.cityMoney < expansionPrice;
  if (state.activeCityId === "shanghai") { el.catalogTitle.textContent = t("catalogTitle"); el.catalogHelp.textContent = t("catalogHelp"); }
  else {
    const city = CITIES.find((item) => item.id === state.activeCityId);
    el.catalogTitle.textContent = `${cityName(city)} · 36`;
    el.catalogHelp.textContent = `${t("common")}20 · ${t("rare")}10 · ${t("epic")}5 · ${t("legendary")}1`;
  }
  el.shopCatalog.innerHTML = "";
  activeCityItems().forEach((item) => {
    const owned = (state.inventory[item.id] || 0) > 0;
    const unlocked = isItemUnlocked(item);
    const card = document.createElement("article");
    card.className = `catalog-card rarity-${item.rarity}${owned ? " is-owned" : ""}${unlocked ? "" : " is-locked"}`;
    const effect = itemEffectText(item);
    card.title = `${itemName(item)} · ${t(item.rarity)}${effect ? ` · ${effect}` : ""}`;
    card.innerHTML = `<i class="rarity-dot"></i>${decorAssetMarkup(item, `catalog-item-image${unlocked ? "" : " is-locked"}`)}<strong>${unlocked ? itemName(item) : "???"}</strong>${effect && unlocked ? `<em>${effect}</em>` : ""}${owned ? `<small>×${state.inventory[item.id]}</small>` : ""}<button type="button"${unlocked ? "" : " disabled"}>${unlocked ? t("buy", { price: item.value }) : t("lockedAt", { score: item.unlockScore })}</button>`;
    bindAssetFallback(card);
    if (unlocked) card.querySelector("button").addEventListener("click", () => buyItem(item));
    el.shopCatalog.append(card);
  });
  renderScoreChests();
  renderBackgroundShop();
  renderOdds();
  renderGachaResult();
}

function renderCities() {
  refreshCityIncome();
  el.cityNavButton.classList.toggle("hidden", !state.cityTabUnlocked);
  el.cityStoredIncome.textContent = String(state.cityStoredIncome);
  el.cityMoney.textContent = String(state.cityMoney);
  el.claimCityIncome.disabled = !state.cityTabUnlocked || state.cityStoredIncome <= 0;
  el.cityGrid.innerHTML = "";
  CITIES.forEach((city) => {
    const unlocked = state.unlockedCities.has(city.id); const active = state.activeCityId === city.id;
    const meetsTicketRequirement = state.businessTicketUses >= city.requiredTicketUses;
    const canUnlock = meetsTicketRequirement && state.cityMoney >= city.cost;
    const card = document.createElement("article");
    card.className = `city-card city-theme-${city.theme}${active ? " is-active" : ""}${unlocked ? "" : " is-locked"}`;
    card.innerHTML = `<span class="city-icon">${city.icon}</span><div><h3>${cityName(city)}</h3><p>${active ? t("cityActive") : unlocked ? t("cityEnter") : t("cityLocked", { price: city.cost, used: Math.min(state.businessTicketUses, city.requiredTicketUses), required: city.requiredTicketUses })}</p></div><button type="button">${active ? "✓" : unlocked ? t("cityEnter") : t("cityUnlock")}</button>`;
    card.querySelector("button").disabled = active || (!unlocked && !canUnlock);
    card.querySelector("button").addEventListener("click", () => unlocked ? switchCity(city.id) : unlockCity(city));
    el.cityGrid.append(card);
  });
}

function applyCityTheme() {
  const gameCard = document.querySelector(".game-card");
  CITIES.forEach((city) => gameCard.classList.remove(`city-${city.theme}`));
  BACKGROUNDS.forEach((background) => gameCard.classList.remove(`background-${background.id}`));
  const city = CITIES.find((item) => item.id === state.activeCityId) || CITIES[0];
  gameCard.classList.add(`city-${city.theme}`, `background-${activeBackgroundId()}`);
}

function unlockCity(city) {
  if (!state.cityTabUnlocked || state.unlockedCities.has(city.id) || state.cityMoney < city.cost || state.businessTicketUses < city.requiredTicketUses) { playSound("invalid"); return; }
  state.cityMoney -= city.cost; state.unlockedCities.add(city.id);
  state.cityInstalled[city.id] = []; state.cityPlacements[city.id] = []; state.citySlotItems[city.id] = {}; state.cityExpansions[city.id] = 1; state.cityExpansionPurchases[city.id] = 0; state.cityMilestones[city.id] = 0; state.cityNames[city.id] = ""; state.cityNameLocked[city.id] = false; state.activeBackgrounds[city.id] = "default";
  state.cityTickets[city.id] = { tickets: 5, lastTicketAt: Date.now() };
  saveProgress(); showMessage(t("cityUnlocked", { city: cityName(city) })); playSound("legendary"); renderCities();
}

function switchCity(cityId) {
  if (state.started || !state.unlockedCities.has(cityId) || state.activeCityId === cityId) { if (state.started) playSound("invalid"); return; }
  syncCurrentCityState(); loadCityState(cityId); applyCityTheme(); saveProgress(); prepareNextDay(); renderAll(); switchView("gameView");
}

function claimCityIncome() {
  refreshCityIncome(); const amount = state.cityStoredIncome;
  if (!amount) return;
  state.cityStoredIncome = 0; state.cityMoney += amount; state.lastCityIncomeAt = Date.now();
  saveProgress(); showMessage(t("incomeClaimed", { amount })); playSound("coin"); renderCities();
}

function renderOdds() {
  const odds = currentOdds();
  el.commonOdds.textContent = `${t("common")} ${odds.common}%`;
  el.rareOdds.textContent = `${t("rare")} ${odds.rare}%`;
  el.epicOdds.textContent = `${t("epic")} ${odds.epic}%`;
  el.legendaryOdds.textContent = `${t("legendary")} ${odds.legendary}%`;
  el.expansionOdds.textContent = `${t("expansion")} ${odds.expansion}%`;
  el.boosterStatus.textContent = state.activeBooster === "epic" ? t("boosterEpicActive") : state.activeBooster === "legendary" ? t("boosterLegendaryActive") : t("boosterNone");
  el.boosterStatus.className = `booster-status${state.activeBooster ? ` rarity-${state.activeBooster}` : ""}`;
}

function renderGachaResult() {
  el.gachaResult.className = "gacha-result";
  if (!state.lastDraw) { el.gachaResult.innerHTML = `<span>✨</span><strong>${t("readyToDraw")}</strong>`; return; }
  if (state.lastDraw.type === "batch") {
    renderBatchReveal(state.lastDraw.results, 10);
    return;
  }
  if (state.lastDraw.type === "expansion") {
    el.gachaResult.classList.add("rarity-expansion");
    el.gachaResult.innerHTML = `<span>🎟️</span><strong>${t(state.lastDraw.maxed ? "expansionMax" : "expansionResult")}</strong>`;
    return;
  }
  const item = decorItem(state.lastDraw.itemId); if (!item) return;
  el.gachaResult.classList.add(`rarity-${item.rarity}`);
  el.gachaResult.innerHTML = `${decorAssetMarkup(item, "gacha-result-image")}<strong>${t("drawResult", { rarity: t(item.rarity), name: itemName(item) })}</strong>`; bindAssetFallback(el.gachaResult);
}

function renderBatchReveal(results, total = 10) {
  const counts = results.reduce((result, draw) => {
    const type = draw.type === "expansion" ? "expansion" : decorItem(draw.itemId)?.rarity;
    if (type) result[type] = (result[type] || 0) + 1;
    return result;
  }, {});
  const summary = ["legendary", "epic", "rare", "common", "expansion"].filter((type) => counts[type]).map((type) => `${t(type)}×${counts[type]}`).join(" · ");
  const cards = Array.from({ length: total }, (_, index) => {
    const draw = results[index];
    if (!draw) return `<span class="batch-result-card is-pending"><b>🎁</b><small>${index + 1}</small></span>`;
    if (draw.type === "expansion") return `<span class="batch-result-card rarity-expansion is-revealed"><b>🎟️</b><small>${t("expansion")}</small></span>`;
    const item = decorItem(draw.itemId); return `<span class="batch-result-card rarity-${item.rarity} is-revealed">${decorAssetMarkup(item, "batch-item-image")}<small>${t(item.rarity)}</small></span>`;
  }).join("");
  el.gachaResult.className = "gacha-result batch-results";
  el.gachaResult.innerHTML = `<div class="batch-reveal-grid">${cards}</div><strong class="batch-result-summary">${results.length === total ? t("drawTenResult", { summary }) : t("drawProgress", { current: results.length })}</strong>`;
  bindAssetFallback(el.gachaResult);
}

function renderStats() {
  refreshTickets();
  el.coinCount.textContent = String(state.coins); el.timer.textContent = String(state.timeLeft);
  el.todayEarnings.textContent = String(pendingNetCoins());
  el.businessTickets.textContent = `${state.businessTickets}/${ticketMax()}`;
  el.ticketRefillTime.textContent = ticketCountdown();
  el.startBusinessButton.disabled = state.businessTickets <= 0 || state.started;
  const noShuffleMode = isAlternateGameCity();
  el.shuffleButton.classList.toggle("hidden", noShuffleMode);
  el.shuffleButton.disabled = noShuffleMode || state.coins < 8 || state.busy || !state.started;
  el.hintButton.classList.toggle("hidden", !state.dayEffects.hint || !state.started);
  el.hintButton.disabled = state.hintUsed || state.busy || !state.started;
  const canSettle = state.started && state.dayDuration > BASE_DAY_SECONDS && state.elapsedSeconds >= BASE_DAY_SECONDS;
  el.settleButton.classList.toggle("hidden", !canSettle);
  el.drawButton.disabled = state.coins < DRAW_COST || state.drawing;
  el.drawTenButton.disabled = state.coins < TEN_DRAW_COST || state.drawing;
}

function renderAll() {
  renderBoard(); renderOrders(); renderStats(); renderDecorMenu(); renderStalls(); renderShop(); renderCities(); applyCityTheme();
}

async function selectMemoryCard(index) {
  if (!isMemoryCity() || !state.started || state.memoryPreview || state.memoryRevealAll || state.memoryLock) return;
  const card = state.memoryCards[index];
  if (!card || card.matched || state.memorySelected.includes(index)) return;
  getAudioContext(); playSound("pickup"); state.memorySelected.push(index); renderBoard();
  if (state.memorySelected.length < 2) return;
  state.memoryLock = true; renderBoard();
  const [firstIndex, secondIndex] = state.memorySelected;
  const first = state.memoryCards[firstIndex]; const second = state.memoryCards[secondIndex];
  const matched = Boolean(first && second && first.pairId === second.pairId);
  await delay(matched ? 420 : 680);
  if (!state.started || !isMemoryCity()) { state.memorySelected = []; state.memoryLock = false; renderBoard(); return; }
  if (matched) {
    first.matched = true; second.matched = true; state.memoryMatchedPairs += 1;
    addIngredientsToOrders([first.orderIngredient, second.orderIngredient]);
    const coinGain = Math.max(1, Math.round(3 * state.dayEffects.matchMultiplier));
    state.pendingMatchCoins += coinGain; showMessage(t("memoryMatch", { coins: coinGain })); playSound("match"); renderOrders(); renderStats();
  } else { showMessage(t("memoryMismatch")); playSound("invalid"); }
  state.memorySelected = []; state.memoryLock = false; renderBoard();
  if (state.memoryMatchedPairs === MEMORY_CARD_TYPES.length) { showMessage(t("memoryBoardClear")); playSound("chain"); }
}

function startDrag(event, row, col) {
  if (isAlternateGameCity() || state.busy || !state.started || state.activeView !== "gameView") return;
  event.preventDefault(); getAudioContext(); playSound("pickup");
  state.drag = { pointerId: event.pointerId, row, col, startX: event.clientX, startY: event.clientY, moved: false, element: event.currentTarget };
  event.currentTarget.classList.add("selected");
  try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* pointer capture is optional */ }
}

function moveDrag(event) {
  const drag = state.drag;
  if (!drag || drag.pointerId !== event.pointerId || drag.moved || state.busy) return;
  const dx = event.clientX - drag.startX; const dy = event.clientY - drag.startY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) return;
  drag.moved = true;
  const target = { row: drag.row, col: drag.col };
  if (Math.abs(dx) > Math.abs(dy)) target.col += dx > 0 ? 1 : -1;
  else target.row += dy > 0 ? 1 : -1;
  const first = { row: drag.row, col: drag.col };
  clearDrag();
  if (target.row < 0 || target.row >= SIZE || target.col < 0 || target.col >= SIZE) {
    playSound("invalid"); animateTiles([first], "shake"); return;
  }
  trySwap(first, target);
}

function endDrag(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  clearDrag();
}

function clearDrag() {
  if (!state.drag) return;
  state.drag.element?.classList.remove("selected");
  try { state.drag.element?.releasePointerCapture(state.drag.pointerId); } catch { /* element may already be replaced */ }
  state.drag = null;
}

async function trySwap(first, second) {
  if (state.busy || !state.started) return;
  state.busy = true; swap(first, second); renderBoard(); await delay(100);
  const matches = findMatches();
  if (!matches.size) {
    swap(first, second); renderBoard(); animateTiles([first, second], "shake"); showMessage(t("invalidMove")); playSound("invalid"); state.busy = false; renderStats(); return;
  }
  await resolveMatches(matches); await ensurePlayableBoard();
  state.busy = false; renderStats();
}

async function resolveMatches(matches, chain = 1) {
  const cleared = [];
  matches.forEach((key) => { const [row, col] = key.split(",").map(Number); cleared.push(state.board[row][col]); });
  animateTiles([...matches].map((key) => { const [row, col] = key.split(",").map(Number); return { row, col }; }), "pop");
  addIngredientsToOrders(cleared);
  const baseCoinGain = Math.ceil(cleared.length / 2) + (chain - 1) * 2;
  const coinGain = Math.max(1, Math.round(baseCoinGain * state.dayEffects.matchMultiplier));
  state.pendingMatchCoins += coinGain;
  if (chain > 1) {
    el.board.classList.remove("chain-burst"); void el.board.offsetWidth; el.board.classList.add("chain-burst");
    setTimeout(() => el.board.classList.remove("chain-burst"), 520);
  }
  showMessage(t(chain > 1 ? "chain" : "match", { chain, coins: coinGain })); playSound(chain > 1 ? "chain" : "match");
  renderOrders(); renderStats(); await delay(270);
  matches.forEach((key) => { const [row, col] = key.split(",").map(Number); state.board[row][col] = null; });
  dropTiles(); renderBoard(); await delay(175);
  const nextMatches = findMatches(); if (nextMatches.size) await resolveMatches(nextMatches, chain + 1);
}

function dropTiles() {
  for (let col = 0; col < SIZE; col += 1) {
    const available = [];
    for (let row = SIZE - 1; row >= 0; row -= 1) if (state.board[row][col]) available.push(state.board[row][col]);
    for (let row = SIZE - 1; row >= 0; row -= 1) state.board[row][col] = available.shift() || randomFrom(INGREDIENTS).id;
  }
}

function addIngredientsToOrders(cleared) {
  const tally = cleared.reduce((result, item) => ({ ...result, [item]: (result[item] || 0) + 1 }), {});
  state.orders.forEach((order, orderIndex) => {
    if (order.complete || order.failed) return;
    order.items.forEach((item) => { item.have += tally[item.id] || 0; });
    if (order.items.every((item) => item.have >= item.need)) {
      const earned = Math.round(order.reward * state.dayEffects.orderMultiplier);
      order.complete = true; order.phase = "leaving"; order.exitSide = Math.random() < .5 ? "left" : "right"; state.pendingOrderCoins += earned; state.orderCount += 1;
      showMessage(t("orderComplete", { coins: earned })); playSound("order");
      renderCustomerStage();
      setTimeout(() => {
        if (state.orders[orderIndex] === order && canAcceptNewOrders()) state.orders[orderIndex] = makeOrder();
        renderOrders(); renderCustomerStage(); renderStats();
      }, 1050);
    }
  });
}

async function ensurePlayableBoard() {
  if (hasAvailableMove()) return;
  showMessage(t("autoShuffle")); playSound("shuffle"); await delay(650); shuffleBoardContents(); renderBoard(); await delay(180);
}

function shuffleBoard() {
  if (isAlternateGameCity() || state.busy || !state.started || state.coins < 8) return;
  state.coins -= 8; shuffleBoardContents(); saveProgress(); renderBoard(); renderStats(); showMessage(t("paidShuffle")); playSound("shuffle");
}

function animateTiles(positions, animationName) {
  positions.forEach(({ row, col }) => el.board.querySelector(`[data-row="${row}"][data-col="${col}"]`)?.classList.add(animationName));
}

function showMessage(message) {
  el.comboMessage.textContent = message; el.comboMessage.classList.remove("show"); void el.comboMessage.offsetWidth; el.comboMessage.classList.add("show");
  el.toast.textContent = message; el.toast.classList.remove("show"); void el.toast.offsetWidth; el.toast.classList.add("show");
}

function replaceSelectedSlotItem(slotId) {
  const selection = state.selectedPlacement; const slot = slotDefinition(slotId);
  if (!selection || selection.mode !== "slot" || !slot) return false;
  const item = decorItem(selection.itemId);
  if (!item || placementKind(item) !== "slot" || item.slotType !== slot.type) { showMessage(t("slotIncompatible")); playSound("invalid"); return false; }
  if ((state.inventory[item.id] || 0) <= installedCount(item.id)) { showMessage(t("slotIncompatible")); playSound("invalid"); return false; }
  if (slot.groupId) {
    activeStallSlots().filter((candidate) => candidate.groupId === slot.groupId).forEach((candidate) => { state.slotItems[candidate.id] = item.id; });
  } else state.slotItems[slot.id] = item.id;
  state.selectedPlacement = null; normalizeSlotItems(); saveProgress(); renderDecorMenu(); renderStalls(); renderStats();
  showMessage(t("slotReplaced", { name: itemName(item), slot: t(slot.labelKey) })); playSound("coin"); checkDecorMilestones(true); return true;
}

function removeOneSlotItem(itemId) {
  const slotId = Object.keys(state.slotItems || {}).find((id) => state.slotItems[id] === itemId);
  if (!slotId) return false;
  const slot = slotDefinition(slotId);
  if (slot?.groupId) activeStallSlots().filter((candidate) => candidate.groupId === slot.groupId).forEach((candidate) => { if (state.slotItems[candidate.id] === itemId) delete state.slotItems[candidate.id]; });
  else delete state.slotItems[slotId];
  return true;
}

function installItem(item) {
  getAudioContext();
  if (placementKind(item) === "passive") { showMessage(itemEffectText(item)); playSound("unlock"); return; }
  if ((state.inventory[item.id] || 0) <= installedCount(item.id)) return;
  if (placementKind(item) === "slot") {
    state.decorEditMode = "furniture"; state.selectedPlacement = { mode: "slot", itemId: item.id, rotation: 0 };
    showMessage(t("slotPlacementHelp")); playSound("pickup"); renderDecorMenu(); renderDecorRoom(); return;
  }
  if (!SLOT_FREE_ITEMS.has(item.id) && installedSlotCount() >= placementLimit()) { showMessage(t("noSlot")); playSound("invalid"); return; }
  if (!firstFreeDecorCell(item, 0)) { showMessage(t("noSlot")); playSound("invalid"); return; }
  state.decorEditMode = "furniture"; state.selectedPlacement = { mode: "new", itemId: item.id, rotation: 0 }; showMessage(t("chooseFloorCell")); playSound("pickup");
  renderDecorMenu(); renderDecorRoom();
}

function removeItemPlacement(item) {
  if (!installedCount(item.id)) return;
  if (placementKind(item) === "slot") removeOneSlotItem(item.id); else removeOneInstalled(item.id);
  state.selectedPlacement = null; showMessage(t(placementKind(item) === "slot" ? "slotRemoved" : "itemRemoved", { name: itemName(item) })); playSound("pickup");
  saveProgress(); renderDecorMenu(); renderStalls(); renderStats();
}

function sellItem(item) {
  const count = state.inventory[item.id] || 0; if (!count) return;
  if (installedCount(item.id) >= count) placementKind(item) === "slot" ? removeOneSlotItem(item.id) : removeOneInstalled(item.id);
  state.selectedPlacement = null;
  if (count === 1) { delete state.inventory[item.id]; delete state.acquisitionOrder[item.id]; } else state.inventory[item.id] = count - 1;
  const refund = Math.floor(item.value * RESALE_RATE); state.coins += refund;
  saveProgress(); showMessage(t("itemSold", { name: itemName(item), coins: refund })); playSound("sell"); renderAll();
}

function buyItem(item) {
  getAudioContext();
  if (state.coins < item.value) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
  state.coins -= item.value; addInventoryItem(item.id);
  updateCityTabUnlock(true); saveProgress(); showMessage(t("purchaseSuccess", { name: itemName(item) })); playSound(item.rarity === "legendary" ? "legendary" : "coin"); renderAll();
}

function useBooster(type) {
  if (!state.boosters[type]) return;
  if (state.activeBooster) state.boosters[state.activeBooster] += 1;
  state.boosters[type] -= 1; state.activeBooster = type;
  saveProgress(); showMessage(t(type === "epic" ? "boosterEpicActive" : "boosterLegendaryActive")); playSound("unlock"); renderAll(); switchView("shopView", false);
}

function saveStallName() {
  const nextName = el.stallNameInput.value.trim().slice(0, 12);
  if (!nextName) return;
  if (state.stallNameLocked && state.nameChangeTickets <= 0) { showMessage(t("nameLocked")); playSound("invalid"); return; }
  if (!window.confirm(t("nameWarning"))) return;
  if (state.stallNameLocked) state.nameChangeTickets -= 1;
  state.stallCustomName = nextName; state.stallNameLocked = true;
  el.stallNameInput.value = state.stallCustomName;
  saveProgress(); renderStalls(); renderDecorMenu(); showMessage(t("nameSaved")); playSound("coin");
}

function buyNameChangeTicket() {
  if (state.cityMoney < 1500) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
  state.cityMoney -= 1500; state.nameChangeTickets += 1; saveProgress(); showMessage(t("nameTicketBought")); playSound("coin"); renderAll();
}

function expansionTicketPrice() { return 5000 + state.expansionPurchaseCount * 3000; }
function buyExpansionTicket() {
  const price = expansionTicketPrice();
  if (state.expansionLevel >= 4 || state.cityMoney < price) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
  state.cityMoney -= price; state.expansionPurchaseCount += 1; state.expansionLevel += 1; normalizePlacements(); ensureOrderCapacity();
  const nextPrice = expansionTicketPrice(); saveProgress(); showMessage(t("expansionTicketBought", { price: nextPrice })); playSound("gachaExpansion"); renderAll();
}

const ADMIN_UNLOCK_COUPON = "admin0909@#!!";

function unlockAllAdminContent() {
  syncCurrentCityState();
  const now = Date.now();
  state.cityTabUnlocked = true;
  state.unlockedCities = new Set(CITIES.map((city) => city.id));
  state.ownedBackgrounds = new Set(BACKGROUNDS.map((background) => background.id));
  CITIES.forEach((city) => {
    state.cityInstalled[city.id] ||= [];
    state.cityPlacements[city.id] ||= [];
    state.citySlotItems[city.id] ||= {};
    state.cityFloorTiles[city.id] ||= {};
    state.cityExpansions[city.id] ||= 1;
    state.cityExpansionPurchases[city.id] ||= 0;
    state.cityMilestones[city.id] = MAX_DECOR_CAPACITY_SCORE;
    state.cityNames[city.id] ||= "";
    state.cityNameLocked[city.id] ||= false;
    state.cityTickets[city.id] ||= { tickets: 5, lastTicketAt: now };
    state.activeBackgrounds[city.id] ||= "default";
  });
  state.decorMilestone = MAX_DECOR_CAPACITY_SCORE;
  DECOR_ITEMS.forEach((item) => {
    if ((state.inventory[item.id] || 0) < 1) addInventoryItem(item.id, 1);
  });
}

function redeemCouponCode() {
  const code = el.couponInput.value.trim();
  if (state.redeemedCoupons.has(code)) { showMessage(t("couponUsed")); playSound("invalid"); return; }
  if (code !== "200589" && code !== "20058989" && code !== ADMIN_UNLOCK_COUPON) { showMessage(t("couponInvalid")); playSound("invalid"); return; }
  state.redeemedCoupons.add(code);
  if (code === ADMIN_UNLOCK_COUPON) unlockAllAdminContent();
  else if (code === "20058989") state.coins += 20000;
  else state.cityMoney += 20000;
  el.couponInput.value = ""; saveProgress(); renderAll();
  const successKey = code === ADMIN_UNLOCK_COUPON ? "couponAdminSuccess" : code === "20058989" ? "couponCoinSuccess" : "couponSuccess";
  showMessage(t(successKey)); playSound("legendary");
}

function rollReward(booster = state.activeBooster) {
  const odds = currentOdds(booster);
  const roll = Math.random() * 100;
  if (roll < odds.common) return { type: "item", rarity: "common" };
  if (roll < odds.common + odds.rare) return { type: "item", rarity: "rare" };
  if (roll < odds.common + odds.rare + odds.epic) return { type: "item", rarity: "epic" };
  if (roll < odds.common + odds.rare + odds.epic + odds.legendary) return { type: "item", rarity: "legendary" };
  return { type: "expansion" };
}

function clearGachaEffects() {
  el.gachaMachine.classList.remove("is-drawing", "reveal-common", "reveal-rare", "reveal-epic", "reveal-legendary", "reveal-expansion");
  el.coinBurst.innerHTML = "";
}

function makeCoinBurst() {
  el.coinBurst.innerHTML = "";
  for (let index = 0; index < 22; index += 1) {
    const coin = document.createElement("span");
    coin.textContent = "🪙";
    coin.style.setProperty("--x", `${Math.round((Math.random() - .5) * 190)}px`);
    coin.style.setProperty("--y", `${Math.round(-70 - Math.random() * 100)}px`);
    coin.style.setProperty("--delay", `${Math.random() * .35}s`);
    el.coinBurst.append(coin);
  }
}

async function drawGacha() {
  return drawGachaCount(1);
}

function prepareDrawResult(booster = null) {
  const reward = rollReward(booster);
  if (reward.type === "expansion") return reward;
  const pool = activeCityItems().filter((item) => item.rarity === reward.rarity && isItemUnlocked(item));
  return { type: "item", itemId: randomFrom(pool).id, rarity: reward.rarity };
}

function applyDrawResult(result) {
  if (result.type === "expansion") {
    const maxed = state.expansionLevel >= 4;
    if (maxed) state.coins += 100; else state.expansionLevel += 1;
    return { type: "expansion", maxed };
  }
  addInventoryItem(result.itemId);
  return { type: "item", itemId: result.itemId };
}

function drawResultRarity(result) { return result.type === "expansion" ? "expansion" : result.rarity || decorItem(result.itemId)?.rarity || "common"; }

async function drawGachaCount(count) {
  const cost = count === 10 ? TEN_DRAW_COST : DRAW_COST;
  if (state.drawing || state.coins < cost) { showMessage(t("notEnoughCoins")); playSound("invalid"); return; }
  getAudioContext();
  const usedBooster = state.activeBooster;
  const results = Array.from({ length: count }, (_, index) => prepareDrawResult(index === 0 ? usedBooster : null));
  state.activeBooster = null; state.coins -= cost; state.drawing = true; state.lastDraw = null;
  clearGachaEffects(); el.gachaPreview.textContent = "🎁"; el.gachaMachine.classList.add("is-drawing");
  if (count === 10) renderBatchReveal([], 10); else renderGachaResult();
  saveProgress(); renderStats(); renderOdds();
  for (let index = 0; index < 8; index += 1) { playSound("pickup"); await delay(70 + index * 8); }
  el.gachaMachine.classList.remove("is-drawing");

  if (count === 10) {
    const appliedResults = [];
    const revealDelay = { common: 260, rare: 340, epic: 520, legendary: 760, expansion: 600 };
    for (const result of results) {
      clearGachaEffects();
      const revealType = drawResultRarity(result);
      el.gachaPreview.textContent = "🎁";
      el.gachaMachine.classList.add(`reveal-${revealType}`);
      if (result.type === "expansion") makeCoinBurst();
      await delay(revealDelay[revealType]);

      const applied = applyDrawResult(result);
      appliedResults.push(applied);
      state.lastDraw = { type: "batch", results: [...appliedResults] };
      el.gachaPreview.textContent = result.type === "item" ? decorItem(result.itemId).emoji : "🎟️";
      renderBatchReveal(appliedResults, 10);
      renderStats();
      playSound(`gacha${revealType[0].toUpperCase()}${revealType.slice(1)}`);
      await delay(revealType === "legendary" ? 420 : 240);
    }

    if (results.some((result) => result.type === "expansion")) ensureOrderCapacity();
    updateCityTabUnlock(true);
    el.gachaPreview.textContent = "🎊";
    state.drawing = false; saveProgress(); renderAll();
    setTimeout(clearGachaEffects, 900);
    return;
  }

  const revealPriority = { common: 1, rare: 2, epic: 3, expansion: 4, legendary: 5 };
  const revealType = results.map(drawResultRarity).sort((a, b) => revealPriority[b] - revealPriority[a])[0];
  el.gachaMachine.classList.add(`reveal-${revealType}`);
  if (results.some((result) => result.type === "expansion")) makeCoinBurst();
  const revealDelay = { common: 420, rare: 600, epic: 900, legendary: 1250, expansion: 1050 }[revealType];
  await delay(revealDelay);
  const appliedResults = results.map(applyDrawResult);
  if (results.some((result) => result.type === "expansion")) ensureOrderCapacity();
  state.lastDraw = count === 10 ? { type: "batch", results: appliedResults } : appliedResults[0];
  const previewItem = results.find((result) => drawResultRarity(result) === revealType && result.type === "item");
  el.gachaPreview.textContent = count === 10 ? "🎊" : previewItem ? decorItem(previewItem.itemId).emoji : "🎟️";
  updateCityTabUnlock(true);
  playSound(`gacha${revealType[0].toUpperCase()}${revealType.slice(1)}`);
  await delay(revealType === "legendary" ? 650 : 400);
  state.drawing = false; saveProgress(); renderAll();
  setTimeout(clearGachaEffects, 900);
}

function switchView(viewId, withSound = true) {
  state.activeView = viewId;
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("hidden", view.id !== viewId));
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewId));
  if (withSound) playSound("pickup");
  if (viewId === "decorateView") { renderDecorMenu(); renderStalls(); }
  if (viewId === "shopView") renderShop();
  if (viewId === "cityView") renderCities();
}

function useHint() {
  if (!state.started || !state.dayEffects.hint || state.hintUsed || state.busy) return;
  if (isMemoryCity()) {
    if (state.memoryPreview || state.memoryLock) return;
    const target = MEMORY_CARD_TYPES.map((type) => state.memoryCards
      .map((card, index) => ({ card, index }))
      .filter((entry) => entry.card.pairId === type.id && !entry.card.matched))
      .find((pair) => pair.length === 2);
    if (!target) return;
    state.hintUsed = true; state.memoryLock = true; state.memorySelected = target.map((entry) => entry.index); renderBoard(); playSound("unlock"); renderStats();
    setTimeout(() => { state.memorySelected = []; state.memoryLock = false; renderBoard(); renderStats(); }, 1500);
    return;
  }
  if (isGrillCity()) {
    state.hintUsed = true;
    state.grillSlots.forEach((slot) => {
      if (!slot.cooldownUntil) { slot.heat = 1; slot.progress = Math.max(0, slot.progress - 4); }
    });
    showMessage(t("grillHint")); playSound("unlock"); renderBoard(); renderStats();
    return;
  }
  if (isRelayCity()) {
    const ticket = currentRelayTicket();
    const expected = ticket?.sequence?.[state.relayInput.length];
    if (!expected) return;
    state.hintUsed = true; state.relayHintIngredient = expected;
    showMessage(t("relayHint", { name: t(`ingredients.${expected}`) })); playSound("unlock"); renderBoard(); renderStats();
    setTimeout(() => { state.relayHintIngredient = null; if (state.started && isRelayCity()) renderBoard(); }, 1800);
    return;
  }
  if (isSoundCity()) {
    const expected = state.soundSequence[state.soundInput.length];
    if (!expected) return;
    state.hintUsed = true; state.soundHintIngredient = expected;
    showMessage(t("soundHint", { name: t(`ingredients.${expected}`) })); playSound("unlock"); renderBoard(); renderStats();
    playCurrentSoundSequence(true);
    setTimeout(() => { state.soundHintIngredient = null; if (state.started && isSoundCity()) renderBoard(); }, 2400);
    return;
  }
  const move = findAvailableMove();
  if (!move) { ensurePlayableBoard(); return; }
  state.hintUsed = true;
  animateTiles([move.first, move.second], "hint");
  playSound("unlock"); renderStats();
  setTimeout(() => animateTiles([move.first, move.second], "hint-clear"), 1500);
}

function clearPetTimers() {
  Object.values(state.petTimers).forEach((timer) => clearTimeout(timer));
  state.petTimers = {};
}

function schedulePet(pet) {
  const enabled = pet === "cat" ? state.dayEffects.cat : state.dayEffects.dog;
  if (!state.started || !enabled) return;
  const wait = 20000 + Math.floor(Math.random() * 40001);
  state.petTimers[pet] = setTimeout(() => {
    if (!state.started) return;
    triggerPetReward(pet);
    schedulePet(pet);
  }, wait);
}

function petRewardOdds(pet) {
  if (pet === "cat") return (state.inventory.unlock_300_epic_1 || 0) > 0
    ? { basic: .60, premium: .35, jackpot: .05 }
    : { basic: .70, premium: .20, jackpot: .10 };
  return (state.inventory.unlock_300_epic_2 || 0) > 0
    ? { basic: .55, premium: .30, jackpot: .15 }
    : { basic: .70, premium: .20, jackpot: .10 };
}

function triggerPetReward(pet) {
  const roll = Math.random(); const odds = petRewardOdds(pet);
  let reward;
  if (pet === "cat") reward = roll < odds.basic ? { type: "coins", amount: 10 } : roll < odds.basic + odds.premium ? { type: "booster", booster: "epic" } : { type: "rat" };
  else reward = roll < odds.basic ? { type: "coins", amount: 7 } : roll < odds.basic + odds.premium ? { type: "booster", booster: "legendary" } : { type: "coins", amount: 25 };
  state.petLoot[pet].push(reward);
  renderPetLootButtons(); showMessage(t(pet === "cat" ? "petCatStored" : "petDogStored")); playSound("pickup");
}

function petLootPresentation(reward) {
  if (reward.type === "coins") return { emoji: "🪙", label: t("petLootCoins", { amount: reward.amount }), rarity: "common" };
  if (reward.type === "rat") return { emoji: "🐭", label: t("petLootRat"), rarity: "common" };
  if (reward.booster === "epic") return { emoji: "🟣🎁", label: t("petLootEpicChest"), rarity: "epic" };
  return { emoji: "🟡🎁", label: t("petLootLegendaryChest"), rarity: "legendary" };
}

function claimPetLoot(pet) {
  const rewards = state.petLoot[pet];
  if (!rewards.length) { showMessage(t("petLootEmpty")); playSound("invalid"); return; }
  state.petLoot[pet] = [];
  rewards.forEach((reward) => {
    if (reward.type === "coins") {
      if (state.started && !state.settled) state.pendingPetCoins += reward.amount; else state.coins += reward.amount;
    } else if (reward.type === "booster") state.boosters[reward.booster] += 1;
  });
  el.petLootIcon.textContent = pet === "cat" ? "🐱" : "🐶";
  el.petLootTitle.textContent = t(pet === "cat" ? "petCatLootTitle" : "petDogLootTitle");
  el.petLootSummary.textContent = t("petLootCollected", { count: rewards.length });
  el.petLootGrid.innerHTML = rewards.map((reward) => {
    const display = petLootPresentation(reward);
    return `<article class="pet-loot-card rarity-${display.rarity}"><span>${display.emoji}</span><strong>${display.label}</strong></article>`;
  }).join("");
  saveProgress(); renderAll(); el.petLootModal.classList.remove("hidden");
  playSound(rewards.some((reward) => reward.booster === "legendary") ? "legendary" : "unlock");
}

function settleDay(manual = false) {
  if (!state.started || state.settled) return;
  if (manual && state.elapsedSeconds < BASE_DAY_SECONDS) return;
  assessClosingPenalties();
  clearInterval(state.timerId); clearPetTimers(); clearMemoryRevealTimeout(); clearGrillTimer(); clearSoundPlayback(); clearDrag();
  state.started = false; state.settled = true; state.memoryPreview = false; state.memoryRevealAll = false; state.memorySelected = []; state.memoryLock = false; state.grillCombo = 0; state.relayLocked = false; state.soundPlaying = false;
  renderCustomerStage();
  const overtime = Math.round(Math.max(0, state.elapsedSeconds - BASE_DAY_SECONDS) * state.dayEffects.overtimeMultiplier);
  const subtotal = pendingCoins() + overtime;
  const afterPenalty = Math.max(0, subtotal - state.pendingPenalty);
  const passiveBonus = Math.round(afterPenalty * (state.dayEffects.settlementMultiplier - 1));
  const total = afterPenalty + passiveBonus;
  state.coins += total;
  el.finalOrders.textContent = String(state.orderCount);
  el.settlementMatch.textContent = `${state.pendingMatchCoins} 🪙`;
  el.settlementOrders.textContent = `${state.pendingOrderCoins} 🪙`;
  el.settlementPets.textContent = `${state.pendingPetCoins} 🪙`;
  el.settlementOvertime.textContent = `${overtime} 🪙`;
  el.settlementPenalty.textContent = `−${state.pendingPenalty} 🪙`;
  el.settlementPassive.textContent = `${passiveBonus} 🪙`;
  el.settlementTotal.textContent = `${total} 🪙`;
  saveProgress(); renderStats(); el.gameOverModal.classList.remove("hidden"); playSound("gameOver");
}

function startGame() {
  if (!consumeBusinessTicket()) { showMessage(t("noTickets")); playSound("invalid"); renderStats(); return; }
  clearInterval(state.timerId); clearPetTimers(); clearMemoryRevealTimeout(); clearGrillTimer(); clearSoundPlayback();
  state.drag = null; state.busy = false; state.orders = []; state.orderCount = 0; state.elapsedSeconds = 0; state.settled = false; state.hintUsed = false; state.lastCallAnnounced = false;
  state.memorySelected = []; state.memoryPreview = false; state.memoryPreviewSeconds = 0; state.memoryLock = false; state.memoryMatchedPairs = 0; state.memoryRevealAll = false; state.memoryNextRevealAt = MEMORY_REVEAL_INTERVAL_SECONDS;
  state.grillSlots = []; state.grillCombo = 0; state.grillServed = 0;
  state.relayQueue = []; state.relayInput = []; state.relayCombo = 0; state.relayCompleted = 0; state.relayLocked = false; state.relayHintIngredient = null;
  state.soundSequence = []; state.soundInput = []; state.soundRound = 1; state.soundCombo = 0; state.soundPlaying = false; state.soundHintIngredient = null;
  state.pendingMatchCoins = 0; state.pendingOrderCoins = 0; state.pendingPetCoins = 0; state.pendingPenalty = 0; state.failedOrders = 0;
  state.dayEffects = calculateDayEffects(); state.dayDuration = BASE_DAY_SECONDS + state.dayEffects.extraSeconds; state.timeLeft = state.dayDuration; state.started = true;
  if (isSoundCity() && !state.soundEnabled) { state.soundEnabled = true; renderSoundToggle(); }
  el.dayStartPanel.classList.add("hidden");
  makeActiveBoard(isMemoryCity()); state.orders = makeStartingOrders();
  el.sceneCaption.textContent = state.memoryPreview
    ? t("memoryPreview", { seconds: state.memoryPreviewSeconds })
    : isGrillCity() ? t("grillWelcome")
      : isRelayCity() ? t("relayWelcome")
        : isSoundCity() ? t("soundWelcome") : t("sceneWelcome"); renderAll(); renderCustomerStage();
  if (isGrillCity()) startGrillTimer();
  if (isSoundCity()) setTimeout(() => playCurrentSoundSequence(false), 450);
  if (state.dayEffects.cat) schedulePet("cat");
  if (state.dayEffects.dog) schedulePet("dog");
  state.timerId = setInterval(() => {
    if (isMemoryCity() && state.memoryPreview) {
      state.memoryPreviewSeconds = Math.max(0, state.memoryPreviewSeconds - 1);
      if (state.memoryPreviewSeconds <= 0) {
        state.memoryPreview = false; el.sceneCaption.textContent = t("memoryGo"); showMessage(t("memoryGo")); playSound("unlock");
      } else el.sceneCaption.textContent = t("memoryPreview", { seconds: state.memoryPreviewSeconds });
      renderBoard(); renderStats(); return;
    }
    state.elapsedSeconds += 1; state.timeLeft = Math.max(0, state.dayDuration - state.elapsedSeconds);
    if (
      isMemoryCity() &&
      state.timeLeft > 0 &&
      state.elapsedSeconds >= state.memoryNextRevealAt
    ) {
      const revealStarted = revealAllMemoryCards();
      if (revealStarted) state.memoryNextRevealAt += MEMORY_REVEAL_INTERVAL_SECONDS;
    }
    if (state.timeLeft === 10 && !state.lastCallAnnounced) { state.lastCallAnnounced = true; el.sceneCaption.textContent = t("lastCall"); showMessage(t("lastCall")); playSound("invalid"); }
    tickOrderPatience(); renderStats();
    if (state.timeLeft <= 0) settleDay(false);
  }, 1000);
}

function prepareNextDay() {
  clearInterval(state.timerId); clearPetTimers(); clearMemoryRevealTimeout(); clearGrillTimer(); clearSoundPlayback(); state.started = false; state.settled = false;
  state.orderCount = 0; state.elapsedSeconds = 0; state.hintUsed = false; state.lastCallAnnounced = false;
  state.memorySelected = []; state.memoryPreview = false; state.memoryPreviewSeconds = 0; state.memoryLock = false; state.memoryMatchedPairs = 0; state.memoryRevealAll = false; state.memoryNextRevealAt = MEMORY_REVEAL_INTERVAL_SECONDS;
  state.grillSlots = []; state.grillCombo = 0; state.grillServed = 0;
  state.relayQueue = []; state.relayInput = []; state.relayCombo = 0; state.relayCompleted = 0; state.relayLocked = false; state.relayHintIngredient = null;
  state.soundSequence = []; state.soundInput = []; state.soundRound = 1; state.soundCombo = 0; state.soundPlaying = false; state.soundHintIngredient = null;
  state.dayEffects = calculateDayEffects(); state.dayDuration = BASE_DAY_SECONDS + state.dayEffects.extraSeconds; state.timeLeft = state.dayDuration;
  state.pendingMatchCoins = 0; state.pendingOrderCoins = 0; state.pendingPetCoins = 0; state.pendingPenalty = 0; state.failedOrders = 0;
  el.dayStartPanel.classList.remove("hidden");
  makeActiveBoard(false); state.orders = makeStartingOrders(); renderAll(); renderCustomerStage();
}

function resetProgress() {
  if (!window.confirm(t("resetConfirm"))) return;
  const language = state.language; const soundEnabled = state.soundEnabled;
  const now = Date.now();
  state.coins = 60; state.inventory = {}; state.acquisitionOrder = {}; state.nextAcquisitionOrder = 1; state.installed = []; state.slotItems = {}; state.decorMilestone = 0; state.expansionLevel = 1; state.lastDraw = null; state.petLoot = { cat: [], dog: [] }; state.decorEditorVersion = DECOR_EDITOR_VERSION;
  state.stallCustomName = ""; state.boosters = { epic: 0, legendary: 0 }; state.activeBooster = null;
  state.businessTickets = 5; state.businessTicketUses = 0; state.lastTicketAt = now;
  state.activeCityId = "shanghai"; state.unlockedCities = new Set(["shanghai"]); state.cityTabUnlocked = false;
  state.ownedBackgrounds = new Set(["default"]); state.activeBackgrounds = { shanghai: "default" };
  state.placements = []; state.selectedPlacement = null; state.floorTiles = {}; state.decorEditMode = "furniture"; state.selectedFloorStyle = "wood"; state.decorCamera = { x: 0, y: 0, zoom: 1 }; state.expansionPurchaseCount = 0;
  state.cityInstalled = { shanghai: [] }; state.cityPlacements = { shanghai: [] }; state.citySlotItems = { shanghai: {} }; state.cityFloorTiles = { shanghai: {} }; state.cityExpansions = { shanghai: 1 }; state.cityExpansionPurchases = { shanghai: 0 }; state.cityMilestones = { shanghai: 0 }; state.cityNames = { shanghai: "" }; state.cityNameLocked = { shanghai: false }; state.cityTickets = { shanghai: { tickets: 5, lastTicketAt: now } };
  state.stallNameLocked = false; state.nameChangeTickets = 0; state.cityMoney = 0; state.cityStoredIncome = 0; state.lastCityIncomeAt = now; state.redeemedCoupons = new Set();
  state.language = language; state.soundEnabled = soundEnabled; saveProgress(); prepareNextDay(); el.sceneCaption.textContent = t("resetDone"); showMessage(t("resetDone"));
}

function resetDecorLayout() {
  if (!window.confirm(t("resetLayoutConfirm"))) return false;
  state.installed = []; state.placements = []; state.slotItems = {}; state.floorTiles = {};
  state.selectedPlacement = null; state.decorEditMode = "furniture"; state.selectedFloorStyle = "wood"; state.decorCamera = { x: 0, y: 0, zoom: 1 };
  state.cityInstalled[state.activeCityId] = state.installed; state.cityPlacements[state.activeCityId] = state.placements; state.citySlotItems[state.activeCityId] = state.slotItems; state.cityFloorTiles[state.activeCityId] = state.floorTiles;
  saveProgress(); renderAll(); showMessage(t("resetLayoutDone")); playSound("pickup"); return true;
}

function setupDecorCameraControls() {
  el.decorRoom.addEventListener("contextmenu", (event) => { event.preventDefault(); cancelPlacementSelection(); });
  document.addEventListener("keydown", (event) => {
    if (state.activeView !== "decorateView") return;
    if (event.key === "Escape") cancelPlacementSelection();
    if (event.key.toLowerCase() === "r") { event.preventDefault(); rotateSelectedFurniture(); }
  });
  window.addEventListener?.("decor-world-ready", renderDecorRoom);
}

function decorFurnitureKind(item) {
  if (item.id === "mascot_doll" || item.emoji === "🛋️") return "sofa";
  if (item.id === "vintage_radio" || item.emoji === "🎹") return "piano";
  if (["small_plant", "🪴"].includes(item.id) || item.emoji === "🪴") return "plant";
  return furnitureVisualType(item);
}

function decorFurnitureView(item, rotation = 0) {
  const footprint = furnitureFootprint(item, rotation); const mapped = gameItemAsset(item); const furnitureKey = decorLargeFurnitureKey(item); const furniture = window.gameAssetCatalog?.furnitureFor(furnitureKey);
  return {
    id: item.id, name: itemName(item), kind: decorFurnitureKind(item), rarity: item.rarity,
    placementKind: placementKind(item), slotType: item.slotType || null,
    designTier: Number(item.designTier) || 0,
    footprintWidth: footprint.width, footprintHeight: footprint.height, rotation,
    assetId: mapped?.assetId || "fallback", textureKey: mapped?.textureKey || "asset-fallback",
    originX: furniture?.originX ?? mapped?.originX ?? .5, originY: furniture?.originY ?? mapped?.originY ?? .88,
    recommendedDisplaySize: mapped?.recommendedDisplaySize || 256, furnitureKey: furnitureKey || null,
    worldImagePath: mapped?.worldImagePath || window.gameAssetCatalog?.fallbackUrl || "./game-assets/assets/fallback/missing-item.svg",
    missingAsset: !mapped && !furnitureKey,
  };
}

let decorCameraSaveTimer = null;
window.decorGameBridge = {
  getSnapshot() {
    normalizePlacements();
    const selectedItem = state.selectedPlacement ? decorItem(state.selectedPlacement.itemId) : null;
    return {
      size: decorGridSize(), mode: state.decorEditMode, floorTiles: { ...state.floorTiles }, camera: { ...state.decorCamera },
      selected: selectedItem ? decorFurnitureView(selectedItem, state.selectedPlacement.rotation || 0) : null,
      selectedPlacementIndex: state.selectedPlacement?.mode === "move" ? state.selectedPlacement.index : -1,
      slots: activeStallSlots().map((slot) => ({ ...slot, label: t(slot.labelKey), item: state.slotItems[slot.id] ? decorFurnitureView(decorItem(state.slotItems[slot.id]), 0) : null })),
      placements: state.placements.map((placement, index) => {
        const item = decorItem(state.installed[index]); const rotation = placement.rotation || 0;
        return { index, uid: placement.uid, gridX: placement.x, gridY: placement.y, ...decorFurnitureView(item, rotation) };
      }),
    };
  },
  activateTile(x, y) {
    const occupiedIndex = occupancyMap().get(placementKey(x, y)) ?? -1;
    return activateDecorTile(x, y, occupiedIndex, "phaser");
  },
  checkPlacement(x, y) {
    const selection = state.selectedPlacement; if (!selection) return { valid: false, cells: [] };
    const item = decorItem(selection.itemId); const rotation = selection.rotation || 0; const excludeIndex = selection.mode === "move" ? selection.index : -1;
    return { valid: canPlaceFurniture(item, x, y, rotation, excludeIndex), cells: placementCells(item, x, y, rotation) };
  },
  activateSlot(slotId) { return replaceSelectedSlotItem(slotId); },
  updateCamera(camera) {
    state.decorCamera = { x: Number(camera.x) || 0, y: Number(camera.y) || 0, zoom: Math.max(.7, Math.min(2.2, Number(camera.zoom) || 1)) };
    if (decorCameraSaveTimer) clearTimeout(decorCameraSaveTimer);
    decorCameraSaveTimer = setTimeout(() => { decorCameraSaveTimer = null; saveProgress(); }, 250);
  },
};

el.shuffleButton.addEventListener("click", shuffleBoard);
el.startBusinessButton.addEventListener("click", startGame);
el.hintButton.addEventListener("click", useHint);
el.settleButton.addEventListener("click", () => settleDay(true));
el.drawButton.addEventListener("click", drawGacha);
el.drawTenButton.addEventListener("click", () => drawGachaCount(10));
el.buyNameTicket.addEventListener("click", buyNameChangeTicket);
el.buyExpansionTicket.addEventListener("click", buyExpansionTicket);
el.redeemCoupon.addEventListener("click", redeemCouponCode);
el.couponInput.addEventListener("keydown", (event) => { if (event.key === "Enter") redeemCouponCode(); });
el.claimCityIncome.addEventListener("click", claimCityIncome);
el.saveStallName.addEventListener("click", saveStallName);
el.cancelPlacement.addEventListener("click", cancelPlacementSelection);
el.catLootButton.addEventListener("click", () => claimPetLoot("cat"));
el.dogLootButton.addEventListener("click", () => claimPetLoot("dog"));
el.closePetLootModal.addEventListener("click", () => el.petLootModal.classList.add("hidden"));
el.decorBackButton.addEventListener("click", () => switchView("gameView"));
el.decorFurnitureMode.addEventListener("click", () => { setDecorMode("furniture"); el.bagPanel.classList.remove("hidden"); });
el.decorMoveMode.addEventListener("click", () => setDecorMode("move"));
el.decorGridMode.addEventListener("click", () => setDecorMode("floor"));
el.decorDeleteMode.addEventListener("click", () => setDecorMode("delete"));
el.rotateFurniture.addEventListener("click", rotateSelectedFurniture);
el.zoomDecorOut.addEventListener("click", () => adjustDecorZoom(-.1));
el.zoomDecorIn.addEventListener("click", () => adjustDecorZoom(.1));
el.resetDecorCamera.addEventListener("click", resetDecorCameraView);
el.floorPalette.querySelectorAll("[data-floor]").forEach((button) => button.addEventListener("click", () => {
  state.selectedFloorStyle = FLOOR_STYLES.has(button.dataset.floor) ? button.dataset.floor : "wood";
  el.floorPalette.querySelectorAll("[data-floor]").forEach((floorButton) => floorButton.classList.toggle("is-active", floorButton.dataset.floor === state.selectedFloorStyle)); playSound("pickup");
}));
el.decorShopShortcut.addEventListener("click", () => switchView("shopView"));
el.stallNameInput.addEventListener("keydown", (event) => { if (event.key === "Enter") saveStallName(); });
el.resetLayoutButton.addEventListener("click", resetDecorLayout);
el.bagButton.addEventListener("click", () => { el.bagPanel.classList.toggle("hidden"); playSound("pickup"); });
el.bagSort.addEventListener("change", (event) => { state.bagSort = ["score", "rarity", "name", "price", "effect", "acquired"].includes(event.target.value) ? event.target.value : "score"; saveProgress(); renderDecorMenu(); });
el.bagRarity.addEventListener("change", (event) => { state.bagRarity = ["all", "common", "rare", "epic", "legendary"].includes(event.target.value) ? event.target.value : "all"; saveProgress(); renderDecorMenu(); });
el.bagGroup.addEventListener("change", (event) => { state.bagGroup = ["flat", "rarity"].includes(event.target.value) ? event.target.value : "flat"; saveProgress(); renderDecorMenu(); });
el.soundToggle.addEventListener("click", () => { state.soundEnabled = !state.soundEnabled; renderSoundToggle(); saveProgress(); if (state.soundEnabled) playSound("coin"); });
el.languageSelect.addEventListener("change", (event) => { state.language = I18N[event.target.value] ? event.target.value : "zh-CN"; applyLanguage(); });
el.restartButton.addEventListener("click", () => { el.gameOverModal.classList.add("hidden"); prepareNextDay(); });
document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelectorAll(".placement-toolbar button, .decor-mode-dock button, .inventory-card button").forEach((control) => control.addEventListener("pointerdown", (event) => event.stopPropagation()));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.selectedPlacement) cancelPlacementSelection(); });
el.decorGrid?.addEventListener("contextmenu", (event) => { event.preventDefault(); if (state.selectedPlacement) cancelPlacementSelection(); });

setupDecorCameraControls(); loadProgress(); applyLanguage(); prepareNextDay(); startTicketClock(); switchView("gameView", false);
