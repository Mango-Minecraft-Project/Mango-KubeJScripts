(() => {
  function isSameArray(a, b) {
    [a, b] = [a, b].map((arr) => Array.from(arr));
    return a.length == b.length && a.every((v, i) => v === b[i]);
  }

  /** @type {{block: Special.Block, item: Special.Item}} */
  const CONFIG = {
    block: "minecraft:emerald_block",
    item: "minecraft:name_tag",
  };

  PlayerEvents.tick((event) => {
    const {
      player,
      player: {
        block: { down: block },
      },
    } = event;
    const blockPos = [block.x, block.y, block.z];

    if (block.id === CONFIG.block && !isSameArray(player.persistentData.getIntArray("CheckPointBlockPos"), blockPos)) {
      player.setStatusMessage([Text.gold("Set SpawnPoint to "), Text.green(`${blockPos}`)]);
      player.persistentData.putIntArray("CheckPointBlockPos", blockPos);
    }
  });

  ItemEvents.rightClicked(CONFIG.item, (event) => {
    const { player, level } = event;

    const CheckPointBlockPos = player.persistentData.getIntArray("CheckPointBlockPos");

    if (CheckPointBlockPos) {
      let [x, y, z] = CheckPointBlockPos;
      if (level.getBlock(x, y, z).id === CONFIG.block) {
        player.teleportToWithTicket(x + 0.5, y + 1, z + 0.5);
      }
    }
  });
})();