ServerEvents.tick((event) => {
  const seconds = 10;

  const { server } = event;

  if (!(server.tickCount % (20 * seconds))) {
    const entities = server.entities.filter(
      (entity) => entity.type == "minecraft:item" && entity.onGround
    );
    server.runCommandSilent("kill @e[type=item, nbt={OnGround: 1b}]");
    server.tell(`[Server Cleaner] Kill ${entities.toArray().length} items`);
  }
});
