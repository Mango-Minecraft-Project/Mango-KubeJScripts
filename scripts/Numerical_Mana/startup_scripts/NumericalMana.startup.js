let $BlockEntity = Java.loadClass("net.minecraft.world.level.block.entity.BlockEntity");

JadeEvents.onCommonRegistration((event) => {
  const manaNbtKeys = ["currentMana", "maxMana", "mana", "manaToGet"];

  event.blockDataProvider("kubejs:numerical_mana", $BlockEntity).setCallback((tag, accessor) => {
    const { blockEntity } = accessor;

    manaNbtKeys.forEach((key) => {
      if (blockEntity[key] != null) {
        tag.putInt(key, blockEntity[key]);
      }
    });
  });
});