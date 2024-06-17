# 腳本範例

## KubeJS Create 所提供的 `CreateEvents`

## 蒸氣鍋爐熱量源 - `boilerHeatHandler`

```js
CreateEvents.boilerHeatHandler((event) => {
  //? 熱量等級說明：
  //? -1：此方塊不提供任何形式的熱量。
  //? 0 ：此方塊提供被動熱量。（例如未加燃料的烈焰燃燒器）
  //? 1 ：此方塊提供1單位的熱量（在狀態欄中顯示1個綠色條，例如加燃料的烈焰燃燒器）
  //? 2 ：此方塊提供2單位的熱量（例如烈焰蛋糕燃燒器）
  //? X ：此方塊提供X單位的熱量，狀態欄中顯示X個綠色條
  //?
  //? 注意，回調函數僅在鍋爐有更新信號時調用。
  //? 例如相鄰方塊的狀態變化、破壞或放置等。

  //? 添加單個方塊的加熱器。
  //? 回調函數的參數類型為 BlockContainerJS。
  event.add("minecraft:diamond_block", (block) => {
    return 2;
  });

  //? 添加方塊篩選器的加熱器。
  event.addAdvanced("#minecraft:logs", (block) => {
    if (block.id === "minecraft:oak_log") {
      return 1;
    } else {
      return 2;
    }
  });
});
```

## 管道流體效果 - `pipeFluidEffect`

```js
CreateEvents.pipeFluidEffect((event) => {
  //? 添加液體處理器，支援 FluidIngredient。

  event.add(
    Fluid.water(), // 流體
    (pipe, fluid) => {
      const { world } = pipe;
      if (world.server.tickCount % 5 != 0) return;

      world.getEntitiesWithin(pipe.AOE).forEach((entity) => {
        if (entity.living) {
          entity.heal(5);
        }
      });
    }
  );
});
```

## 注液器注液方塊 - `spoutHandler`

```js
CreateEvents.spoutHandler((event) => {
  //? 創建注液器處理器，需要提供 ID，因為這裡沒有辦法生成一個一致的 UUID。
  //?
  //? 注液器每個 tick 都會以 simulate = true 的方式調用處理器，如果返回值 > 0，則注液器將開始注液動畫，
  //? 動畫結束時，處理器將再次以 simulate = false 的方式調用。
  //?
  //? 返回的整數表示此操作應該消耗多少單位液體。
  //? 單位視模組載入器而不同，Forge = 1MB、Fabric = 1 unit
  //? 1 B（Bucket，桶） = 1000 MB（MiliBucket，千分之一桶） = 81000 unit（單位流體）

  event.add(
    "kubejs:obsidian", // ID
    "minecraft:lava", // 目標方塊
    (block, fluid, simulate) => {
    if (fluid.id === Fluid.water().id && fluid.amount >= 100) {
      if (!simulate) {
        block.set("minecraft:obsidian");
      }
      return 100;
    }
    return 0;
  });
});
```

## 替換多個物品配方

```js
ServerEvents.recipes((event) => {
  event.replaceInput(
    {
      output: [
        "minecraft:diamond_axe",
        "minecraft:diamond_hoe",
        "minecraft:diamond_pickaxe",
        "minecraft:diamond_shovel",
        "minecraft:diamond_sword",
      ],
    },
    "minecraft:diamond",
    "minecraft:emerald"
  );
});
```

## 玩家死亡後掉落玩家頭顱

```js
EntityEvents.death("player", (event) => {
  const { player } = event;

  player.block.popItem(Item.playerHead(player.username));
});
```

## 合成時消耗物品耐久

![damage ingredient recipe](https://hackmd.io/_uploads/H1KHEFIca.png)

```js
ServerEvents.recipes((event) => {
  const { kubejs } = event.recipes;

  kubejs
    .shapeless("stripped_oak_log", ["oak_log", "#minecraft:axes"])
    .damageIngredient("#minecraft:axes");
});
```

:::info
僅限 `kubejs:shaped` 和 `kubejs:shapeless` 配方可使用 `.damageIngredient`
:::

## 獲取精確的世界種子

```js
const seed = NBT.l(server.worldData.worldGenOptions().seed());
```

:::warning
只能儲存成 String 或 NBT，若存成 Number 則會因為 Java Double 浮點數精度誤差導致不精確
:::

## 在配方中使用

```js
ServerEvents.loaded((event) => {
  const { server } = event;

  const seed = server.worldData.worldGenOptions().seed();
  server.persistentData.putLong("seed", seed);

  server.scheduleInTicks(10, () => server.runCommandSilent("reload"));
});

ServerEvents.recipes((event) => {
  const { server } = Utils;

  if (!server) return;
  const seed = server.persistentData.getLong("seed");

  // do_something(seed);
});
```

## 根據材料修改合成產物

![圖片](https://hackmd.io/_uploads/HkN1lswqT.png)

```js
ServerEvents.recipes((event) => {
  const { kubejs } = event.recipes;

  kubejs
    .shapeless(Item.of("wooden_axe").withName([Text.red("斧頭只會被清除附魔，不會被替換成木斧")]), [
      Ingredient.of("#minecraft:axes").itemIds.map((id) =>
        Item.of(id).enchant("flame", 2).weakNBT()
      ),
      "sponge",
    ])
    .keepIngredient("sponge")
    .modifyResult((grid, result) => {
      const item = grid.find(Ingredient.of("#minecraft:axes"));
      item.nbt.remove("Enchantments");
      return item;
    });
});
```

:::info
僅限 `kubejs:shaped` 和 `kubejs:shapeless` 配方可使用 `.modifyResult`
:::

## 玩家在芒草蹲下後隱身

```js
PlayerEvents.tick((event) => {
  const { player } = event;

  if (player.shiftKeyDown && player.block.id === "minecraft:tall_grass") {
    if (!player.hasEffect("invisibility")) {
      player.potionEffects.add("invisibility", -1, 0, false, false);
    }
  } else {
    player.removeEffect("invisibility");
  }
});
```

## 玩家範圍聊天

```js
const $maxDistance = 10;
/**
 * @param {Internal.Player_} sender
 * @param {string} message
 * @param {Internal.MinecraftServer_} server
 * @returns {Internal.Component}
 */
const $textFactory = (sender, message, server) => [Text.green(`[${sender.username}] `), message];

PlayerEvents.chat((event) => {
  const { player: sender, message, server } = event;

  server.players.forEach((player) => {
    if (sender.distanceToEntity(player) < $maxDistance) {
      player.tell($textFactory(sender, message, server));
    }
  });
  event.cancel();
});
```

## 在草地上跳躍有機率將草地踩成泥土

```js
const inputBlock = "minecraft:grass_block";
const outputBlock = "minecraft:dirt";

PlayerEvents.tick((event) => {
  const { player } = event;

  if (player.fallDistance > 1 && player.block.down.id === inputBlock) {
    player.tell("You fell on grass block!");
    if (Math.random() < 0.25) {
      player.block.down.set(outputBlock);
      player.tell("　The grass turned into dirt!");
    }
  }
});
```

## 玩家每開啟10次村莊中的戰利品箱後觸發

```js
const dataKey = "villageChestsOpened";
const maxOpenTimes = 10;

BlockEvents.rightClicked("chest", (event) => {
  const { player, block } = event;

  if (block.entityData.getString("LootTable").includes("chests/village/")) {
    player.persistentData.putLong(dataKey, player.persistentData.getLong(dataKey) + 1);
    player.tell("You've opened a village chest!");

    if (player.persistentData.getLong(dataKey) >= maxOpenTimes) {
      player.tell("  You've opened 10 village chests!");
      player.persistentData.putLong(dataKey, 0);
    }
  }
});
```

## 隨機羊毛剪刀

### 啟動腳本

```js
StartupEvents.registry("item", (event) => {
  event.create("random_shear", "shears").texture(":item/shears").maxDamage(238);
});
```

### 伺服器腳本

```js
ItemEvents.entityInteracted("kubejs:random_shear", (event) => {
  const { entity, target, item, hand, server } = event;
  const colors = Object.keys(Color.DYE);

  function shear() {
    server.runCommandSilent(
      `playsound entity.sheep.shear master @a ${target.x} ${target.y} ${target.z} 1 1`
    );
    target.setSheared(true);
    let i = 1 + Utils.random.nextInt(3),
      j = 0,
      color;

    for (j; j < i; ++j) {
      color = colors[Utils.getRandom().nextInt(16)];
      target.block.popItem(`${color}_wool`);
    }
  }

  if (target.type === "minecraft:sheep" && target.readyForShearing()) {
    shear();
    item.hurtAndBreak(1, entity, (entityx) => entityx.broadcastBreakEvent(hand));
    event.cancel();
  }
});
```

## 隨機混凝土鎬

### 啟動腳本

```js
StartupEvents.registry("item", (event) => {
  event.create("random_concrete_pickaxe", "pickaxe").texture(":item/iron_pickaxe").maxDamage(250);
});
```

### 伺服器腳本

```js
BlockEvents.broken((event) => {
  const { entity, block } = event;

  if (entity.mainHandItem.id === "kubejs:random_concrete_pickaxe" && block.hasTag("forge:stone")) {
    let color = Object.keys(Color.DYE)[Utils.random.nextInt(16)];
    block.popItem(`${color}_concrete`);
    block.set("air");
    event.cancel();
  }
});
```

## 物品實體名稱高亮顯示

```js
ServerEvents.tick((event) => {
  const { server } = event;

  if (server.tickCount % 2) return;

  server.entities.filterSelector("@e[type=item]").forEach(
    /** @param {Internal.ItemEntity_} itemEntity */
    (itemEntity) => {
      /** @type {{Item: { Count: Internal.ByteTag_, id: string }, Age: Internal.ShortTag_}} nbt */
      const { Item: item, Age } = itemEntity.nbt;

      const { descriptionId, rarity } = Item.of(item.id);

      itemEntity.customName = [
        Text.gold(`${item.Count}x`),
        " ",
        Text.translate(descriptionId).color(rarity.color),
        " ",
        Text.gray(`(${Age == -32768 ? "∞" : ((6000 - Age) / 20).toFixed(1)}s left)`),
      ];
      itemEntity.customNameVisible = true;
    }
  );
});
```

## 獲取當前月相

```js
const moonPhaseList = ["滿", "虧凸", "下弦", "殘", "新", "峨嵋", "滿", "滿"];

LevelEvents.tick("overworld", (event) => {
  const { moonPhase, dayTime, server } = event;
  
  if (dayTime % 24000 === 1) {
    server.tell(`今天的月像是${moonPhaseList[moonPhase]}月`);
  }
});
```

## 禁止玩家使用特定指令

*==You Shall Not Pass!==*

```js
/**
 * @param {Internal.CommandEventJS_} event
 */
function youShallNotUsePainter(event) {
  const { input, parseResults } = event;

  if (input.split(" ")[1] === "painter") {
    parseResults.context.source.player.tell("You Shall Not Use Painter!");
    event.cancel();
  }
}

ServerEvents.command("kubejs", youShallNotUsePainter);
ServerEvents.command("kjs", youShallNotUsePainter);
```

## 修改物品的Builder

```js
ItemEvents.modification((event) => {
  const ItemBuilder = Java.loadClass(
    "dev.latvian.mods.kubejs.item.custom.BasicItemJS$Builder"
  );

  event.modify("...", (item) => {
    const builder = new ItemBuilder("...").glow(true);
    item.setItemBuilder(builder);
  });
});
```

## 套裝效果 + tooltip提示

使用nbt達成tooltip提示

### 伺服器腳本

```js
global.armorSets = {
  netherite: "Netherite Armor Set",
};

PlayerEvents.inventoryChanged((event) => {
  const { item, player, slot } = event;

  if (item.hasTag("forge:armors") && !item?.nbt?.armor_set) {
    item.setNbt({ armor_set: "" });
  }

  for (let key of Object.keys(global.armorSets)) {
    let setName = player.armorSlots.every((armor) => Utils.id(armor.id).path.startsWith(key))
      ? key
      : "";

    player.armorSlots.forEach((eachArmor) => {
      if (!eachArmor.empty) eachArmor.setNbt({ armor_set: setName });
    });
    player.inventory.getStackInSlot(slot).setNbt({ armor_set: setName });
    player.persistentData.putString("armor_set", setName);
  }
});
```

### 客戶端腳本

```js
ItemEvents.tooltip((event) => {
  event.addAdvancedToAll((item, isAdvanced, tooltip) => {
    if (item.hasTag("forge:armors") && item?.nbt?.armor_set !== undefined) {
      /** @type {{ armor_set: string }} */
      const { armor_set } = item.nbt;

      if (global.armorSets[armor_set] !== undefined) {
        tooltip.add(1, ["Active Armor Set: ", Text.green(global.armorSets[armor_set])]);
      } else {
        tooltip.add(1, ["Active Armor Set: ", Text.red("No Active")]);
      }
    }
  });
});
```

## 自訂訊息顯示

```js
PlayerEvents.chat((event) => {
  let { player, message, server } = event;
  server.tell([Text.yellow(player.displayName), " ", Text.gray("»"), " ", Text.white(message)]);
  event.cancel();
});
```

## 附魔描述

部分代碼來源自：KL_jiana

```js
ClientEvents.lang("zh_tw", (event) => {
  event.addAll("enchdesc", {
    "tooltip.enchdesc.hold_shift": "§6按住 §eShift §6查看附魔描述§r",
    "tooltip.enchdesc.embellish": " ◊ %s: %s",

    _comment: "Vanilla Enchantment Descriptions",
    "enchantment.minecraft.protection.desc": "減少大部分傷害。",
    "enchantment.minecraft.fire_protection.desc": "減少火焰傷害，並減少著火後的燃燒時間。",
    "enchantment.minecraft.feather_falling.desc": "減少摔落和使用終界珍珠傳送時的傷害。",
    "enchantment.minecraft.blast_protection.desc": "減少爆炸傷害和擊退效果。",
    "enchantment.minecraft.projectile_protection.desc": "減少投射物（如：箭矢、火焰彈）傷害。",
    "enchantment.minecraft.respiration.desc": "延長玩家於水中的活動時間，並強化於水中的視力。",
    "enchantment.minecraft.aqua_affinity.desc": "增加於水中的挖掘速度。",
    "enchantment.minecraft.thorns.desc": "對攻擊你的敵人造成傷害。",
    "enchantment.minecraft.sharpness.desc": "增加物品的傷害值。",
    "enchantment.minecraft.smite.desc": "增加攻擊不死生物（如：殭屍、骷髏）的傷害。",
    "enchantment.minecraft.bane_of_arthropods.desc": "增加攻擊節肢生物（如：蜘蛛、蠹魚）的傷害。",
    "enchantment.minecraft.knockback.desc": "增加武器的擊退強度。",
    "enchantment.minecraft.fire_aspect.desc": "對攻擊目標造成額外的火焰傷害。",
    "enchantment.minecraft.looting.desc": "擊殺生物時將獲得更多戰利品。",
    "enchantment.minecraft.efficiency.desc": "增加工具的挖掘速度。",
    "enchantment.minecraft.silk_touch.desc": "能取得易損方塊（如：玻璃）。",
    "enchantment.minecraft.unbreaking.desc": "使工具的損壞速度降低。",
    "enchantment.minecraft.fortune.desc": "額外增加某些方塊（如：煤礦、鑽石礦）的掉落物。",
    "enchantment.minecraft.power.desc": "增加弓的射擊傷害。",
    "enchantment.minecraft.punch.desc": "增加弓的擊退強度。",
    "enchantment.minecraft.flame.desc": "射出的箭矢將造成額外的火焰傷害。",
    "enchantment.minecraft.infinity.desc": "使弓能無限射出普通箭矢，必須擁有至少一支箭。",
    "enchantment.minecraft.luck_of_the_sea.desc": "增加釣魚獲得優良戰利品的機率。",
    "enchantment.minecraft.lure.desc": "減少等待魚上鉤的時間。",
    "enchantment.minecraft.depth_strider.desc": "增加於水中的移動速度。",
    "enchantment.minecraft.frost_walker.desc": "使玩家下方的水結冰。",
    "enchantment.minecraft.mending.desc": "以經驗回復盔甲和工具的耐久度。",
    "enchantment.minecraft.binding_curse.desc": "防止卸下盔甲欄中的詛咒物品。",
    "enchantment.minecraft.vanishing_curse.desc": "銷毀死亡時物品欄中的詛咒物品。",
    "enchantment.minecraft.sweeping.desc": "增加橫掃攻擊的傷害。",
    "enchantment.minecraft.loyalty.desc": "使三叉戟於射出後自動返回。",
    "enchantment.minecraft.impaling.desc": "增加攻擊玩家和水生生物的傷害。",
    "enchantment.minecraft.riptide.desc": "使玩家能使用三叉戟突進，僅於雨中或水中有效。",
    "enchantment.minecraft.channeling.desc": "使三叉戟能於暴風雨中召喚閃電電流。",
    "enchantment.minecraft.multishot.desc": "往相近方向射出額外箭矢。",
    "enchantment.minecraft.quick_charge.desc": "增加弩的裝填速度。",
    "enchantment.minecraft.piercing.desc": "使投射物能貫穿生物。",
    "enchantment.minecraft.soul_speed.desc": "增加於靈魂方塊上的移動速度。",
    "enchantment.minecraft.swift_sneak.desc": "增加於潛行時的移動速度。",
  });
});

ItemEvents.tooltip((event) => {
  const EMBELLISH_TEXT = (arg0, arg1) => Text.translate("tooltip.enchdesc.embellish", arg0, arg1);
  const HOLD_SHIFT_TEXT = Text.translate("tooltip.enchdesc.hold_shift");
  const ENCHANTED_BOOK = Ingredient.of("minecraft:enchanted_book");

  event.addAdvanced(Ingredient.all, (item, advanced, text) => {
    if (!ENCHANTED_BOOK.test(item) && !item.enchanted) return;
    const { enchantments } = item;

    if (event.shift) {
      enchantments.forEach((enchantment) => {
        let descriptionId = `enchantment.${enchantment.replace(":", ".")}`;
        text.add(EMBELLISH_TEXT(Text.translate(descriptionId), Text.translate(`${descriptionId}.desc`).darkGray()));
      });
    } else {
      text.add(HOLD_SHIFT_TEXT);
    }
  });
});
```