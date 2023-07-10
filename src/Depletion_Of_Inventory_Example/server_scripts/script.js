BlockEvents.rightClicked("minecraft:diamond_block", (event) => {
  const { item, player } = event;

  if (item.id == "minecraft:diamond") {
    for (const itemStack of player.inventory.allItems) {
      if (itemStack.id == "minecraft:oak_planks") {
        itemStack.count--;
        break;
      }
    }
  }
});
