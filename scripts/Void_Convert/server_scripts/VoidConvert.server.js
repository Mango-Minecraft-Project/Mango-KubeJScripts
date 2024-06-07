LevelEvents.tick((event) => {
  const { level } = event;

  level.entities.filterSelector("@e[type=item]").forEach((entity) => {
    if (
      entity.item.hasTag("flowers") &&
      entity.y < level.minBuildHeight &&
      entity.y - entity.deltaMovement.y() < -10 + level.minBuildHeight
    ) {
      let itemEntity = entity.block.createEntity("item");
      itemEntity.item = "botania:black_lotus";
      itemEntity.item.count = entity.item.count;
      itemEntity.fallDistance = entity.fallDistance;
      itemEntity.addTag("void_convert");
      itemEntity.spawn();
      entity.discard();
    }
  });
});

EntityEvents.spawned("item", (event) => {
  const { entity } = event;

  if (entity.item == "botania:black_lotus" && entity.tags.contains("void_convert")) {
    entity.setDeltaMovement(Vec3d(0, (entity.fallDistance + 3) / 50, 0));
    entity.setNoGravity(true);
    entity.setGlowing(true);
  }
});
