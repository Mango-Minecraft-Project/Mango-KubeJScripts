(() => {
  ServerEvents.recipes((event) => {
    const { minecraft, create } = event.recipes;

    create.crushing(
      [Item.of("saros_create:diamond_nugget").withChance(0.1), Item.of("minecraft:gravel").withChance(0.2)],
      ["minecraft:iron_ingot"]
    );
    create.compacting(["saros_create:raw_diamond"], ["3x saros_create:diamond_nugget", Fluid.lava(FluidAmounts.B)]);
    create.splashing([Item.of("minecraft:diamond").withChance(0.4)], ["saros_create:raw_diamond"]);

    let ids;
    ids = [
      ["saros_create:dirty_netherite_1", "minecraft:diamond"],
      ["saros_create:dirty_netherite_2", "saros_create:dirty_netherite_1"],
      ["saros_create:dirty_netherite_3", "saros_create:dirty_netherite_2"],
      ["saros_create:dirty_netherite_4", "saros_create:dirty_netherite_3"],
      ["saros_create:dirty_netherite_5", "saros_create:dirty_netherite_4"],
      ["saros_create:dirty_netherite_final", "saros_create:dirty_netherite_5"],
    ];
    ids.forEach(([output, input]) => {
      create.pressing([Item.of(output).withChance(0.8)], [input]);
    });

    ids = [
      ["saros_create:netherite_scrap_1", ["saros_create:dirty_netherite_final", "smelting"]],
      ["saros_create:netherite_scrap_2", ["saros_create:netherite_scrap_1", "smelting"]],
      ["saros_create:netherite_scrap_3", ["saros_create:netherite_scrap_2", "splashing"]],
      ["saros_create:netherite_scrap_4", ["saros_create:netherite_scrap_3", "smelting"]],
      ["saros_create:netherite_scrap_5", ["saros_create:netherite_scrap_4", "splashing"]],
      ["saros_create:netherite_scrap_final", ["saros_create:netherite_scrap_5", "splashing"]],
      ["minecraft:netherite_scrap", ["saros_create:netherite_scrap_final", "smelting"]],
    ];

    ids.forEach(([output, [input, recipeType]]) => {
      switch (recipeType) {
        case "smelting":
          minecraft.smelting(output, input).cookingTime(500);
          break;
        case "splashing":
          create.splashing([output], [input]);
          break;
      }
    });
  });
})();
