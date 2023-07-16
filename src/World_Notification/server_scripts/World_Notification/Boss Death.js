// priority: 0

/**
 * Generate Entity Death World Notification
 *
 * @param {Special.EntityType} entityId
 * @param {Special.Item} itemIcon
 * @param {Internal.Color} titleColor
 * @param {Internal.Color} backgroundColor
 * @param {Internal.Color} borderColor
 * @param {String} filterName
 */
function entityDeathNotify(
  entityId,
  itemIcon,
  titleColor,
  backgroundColor,
  borderColor,
  filterName
) {
  EntityEvents.death(entityId, (event) => {
    const {
      server: { players },
      entity: { customName, displayName },
      source: { player: $player },
    } = event;
    if (!$player) return;

    const entityName = (customName || displayName).string;
    if (entityName != filterName) return;

    for (const player of players) {
      playerNotify(player, {
        itemIcon: itemIcon,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        outlineColor: borderColor,
        text: [
          Text.of("！Global Notify - Boss Has Been Killed！\n")
            .color(titleColor)
            .bold(),
          Text.of(entityName).green(),
          Text.of(" has been killed by "),
          Text.of(player.displayName).gold(),
        ],
      });
    }
  });
}

entityDeathNotify(
  "minecraft:pig",
  "minecraft:dragon_head",
  "darkPurple",
  0xd9e4ac,
  0x5d1d96,
  "Ender Dragon"
);
entityDeathNotify(
  "minecraft:pig",
  "minecraft:wither_skeleton_skull",
  0xd81e3d,
  0x372027,
  0x1d1316,
  "Wither"
);
entityDeathNotify(
  "minecraft:pig",
  "minecraft:reinforced_deepslate",
  "darkAqua",
  0x525255,
  0x0c1116,
  "Warden"
);
entityDeathNotify(
  "minecraft:pig",
  "minecraft:sponge",
  "darkBlue",
  0x67ada8,
  0x243a34,
  "Guardian"
);
