// requires: botania

(() => {
  /** @param {Internal.BlockRightClickedEventJS} event */
  const manaPoolCounterHandle = (event) => {
    if (event.hand != "MAIN_HAND") return;
    const {
      block: {
        id,
        entityData: { manaCap, mana },
      },
      player,
    } = event;

    const manaInfo =
      id === "botania:creative_pool"
        ? [Text.gold("∞")]
        : [Text.green(mana + ""), "/", Text.darkGreen(manaCap + "")];

    player.statusMessage = ["Mana: "].concat(manaInfo);
  };

  ["diluted", "mana", "fabulous", "creative"].forEach((type) => {
    BlockEvents.rightClicked(`botania:${type}_pool`, manaPoolCounterHandle);
  });
})();
