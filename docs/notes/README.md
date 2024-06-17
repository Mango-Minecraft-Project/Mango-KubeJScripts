# 筆記

## DamageSource 中 `immediate` 與 `actual` 的差異

`immediate` 回傳直接傷害者
`actual` 回傳傷害所有者

舉例來說，玩家拿弓箭射實體：
- `immediate` 回傳 `Arrow` (弓箭)
- `actual` 回傳 `Player` (玩家)

## `PlayerEvents.chat` 與 `PlayerEvents.decorateChat` 的差異

- `PlayerEvents.chat`：可以被取消，主要用途為取消事件。
- `PlayerEvents.decorateChat`：不能被取消，主要用途為修改訊息。

## `ItemStack.weakNBT()` 與 `ItemStack.strongNBT()` 的差異

以 `Item.of("diamond_sword", "{damage:50}")` 舉例

- `.weakNBT()`
  若物品的nbt包含 `{damage:50}` 則可以使用
  舉例：
  - :o: `{damage:50}`
  - :o: `{damage:50, display:"Sword"}`
  - :x: `{display:"Sword"}`
- `.strongNBT()`
  若物品的nbt **僅** 包含 `"{damage:50}"` 則可以使用
  舉例：
  - :o: `{damage:50}`
  - :x: `{damage:50, display:"Sword"}`
  - :x: `{display:"Sword"}`