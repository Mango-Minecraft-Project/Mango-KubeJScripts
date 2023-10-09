// ignored: true

ServerEvents.tags("item", (event) => {
  event.add("kubejs:infinity_mine", ["minecraft:golden_pickaxe"]);
});

BlockEvents.broken((event) => {
  const { player, block, server, level } = event;

  if (player.mainHandItem.hasTag("kubejs:infinity_mine")) {
    // let entityData = block.entityId != "minecraft:air" ? block.entityData : false
    // if (entityData) {
    //   event.success();
    // }

    player.tell(
      `[Infinity-Miner] ${
        Text.translate(`block.${block.id.split(":").join(".")}`).string
      }`
    );

    server.schedule(5 * 200, (_) => {
      block.set(block.id, block.properties);
      // if (entityData) {
      //   level.getBlock(block.x, block.y, block.z).mergeEntityData(entityData);
      //   player.tell(`block has entityData: ${entityData}`)
      // }
    });
  }
});
