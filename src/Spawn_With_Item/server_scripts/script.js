const $MobId = "minecraft:creeper";
const $Item = Item.of("totem_of_undying", 64);

EntityEvents.spawned($MobId, (event) => {
  event.entity.setItemSlot(0, $Item);
});
