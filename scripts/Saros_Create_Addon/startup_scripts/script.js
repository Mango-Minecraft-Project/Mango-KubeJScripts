if (checkConfigSwitch("saros-create-addon")) {
  const { createCreativeTab } = global.functions.dev;
  createCreativeTab(
    "kubejs",
    "saros_create_addon",
    "minecraft:netherite_scrap"
  );

  global.addon.SarosCreate = {};
  const { SarosCreate } = global.addon;

  SarosCreate.itemIds = [
    "diamond_nugget",
    "raw_diamond",

    "dirty_netherite_1",
    "dirty_netherite_2",
    "dirty_netherite_3",
    "dirty_netherite_4",
    "dirty_netherite_5",
    "dirty_netherite_final",

    "netherite_scrap_1",
    "netherite_scrap_2",
    "netherite_scrap_3",
    "netherite_scrap_4",
    "netherite_scrap_5",
    "netherite_scrap_final",
  ];

  StartupEvents.registry("item", (event) => {
    for (const id of SarosCreate.itemIds) {
      const itemObject = event
        .create(id)
        .texture(`saros_create_addon:item/${id}`)
        .group("kubejs.saros_create_addon")
        .tag("kubejs:saros_create_addon");

      if (/\d/.test(id.slice(-1))) {
        itemObject.tooltip(`Level ${id.slice(-1)}`);
      }
    }
  });
}
