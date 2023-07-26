# 帶有NBT的合成配方

以水瓶為例，
首要條件是你所使用的配方必須支援NBT，例如`event.shaped`所對應的`kubejs:shaped`（註：原版的`minecraft:crafting_shaped`是不支援NBT配方的）

```js
Item.of('minecraft:potion')
  .withNBT({Potion: "minecraft:water"}) // 指定藥水的內容物為水
  .weakNBT() // 確保只匹配指定的NBT
```