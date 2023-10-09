function arrayElementSameCheck(array1, array2) {
  return (
    JSON.stringify(Array.from(array1)) == JSON.stringify(Array.from(array2))
  );
}

PlayerEvents.tick((event) => {
  const { player } = event;
  const block = player.block.down;
  const blockPos = [block.x, block.y, block.z];

  if (
    block.id == "minecraft:emerald_block" &&
    !arrayElementSameCheck(
      player.persistentData.getIntArray("CheckPointBlockPos"),
      blockPos
    )
  ) {
    player.setStatusMessage([
      Text.gold("Set SpawnPoint to "),
      Text.green("[ " + blockPos.join(", ") + " ]"),
    ]);
    player.persistentData.putIntArray("CheckPointBlockPos", blockPos);
  }
});

ItemEvents.rightClicked("minecraft:name_tag", (event) => {
  const { player, server } = event;

  const CheckPointBlockPos =
    player.persistentData.getIntArray("CheckPointBlockPos");

  if (CheckPointBlockPos) {
    let [x, y, z] = Array.from(CheckPointBlockPos);
    server.runCommandSilent(
      `tp ${player.stringUuid} ${x + 0.5} ${y + 1} ${z + 0.5}`
    );
  }
});
