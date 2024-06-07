// requires: create

(() => {
  const itemIds = [
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
    itemIds.forEach((id) => {
      const itemBuilder = event.create(`saros_create:${id}`).texture(`saros_create:item/${id}`);

      if (/\d/.test(id.slice(-1))) {
        itemBuilder.tooltip(`Level ${id.slice(-1)}`);
      }
    });
  });

  StartupEvents.registry("creative_mode_tab", (event) => {
    event
      .create("saros_create:tab")
      .icon(() => Item.of("dirty_netherite_final"))
      .content(() => Ingredient.of("@saras_create").itemIds);
  });

  StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
    event.remove(() => Ingredient.of("@saras_create"));
  })
})();
