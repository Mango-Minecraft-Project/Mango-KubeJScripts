ItemEvents.rightClicked("minecraft:item_frame", (event) => {
  const { item } = event;
  if (item.displayName.string == "[invisible]") {
    item.nbt.EntityTag = { Invisible: NBT.i(1) };
  }
});
