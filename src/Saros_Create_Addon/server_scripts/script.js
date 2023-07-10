if (checkConfigSwitch("saros-create-addon")) {
  let { toAmount } = global.functions.fluid;

  ServerEvents.recipes((event) => {
    let { minecraft, create } = event.recipes;

    create.crushing(
      [
        Item.of("kubejs:diamond_nugget").withChance(0.1),
        Item.of("minecraft:gravel").withChance(0.2),
      ],
      ["minecraft:iron_ingot"]
    );
    create.compacting(
      ["kubejs:raw_diamond"],
      ["3x kubejs:diamond_nugget", Fluid.of("minecraft:lava", toAmount(1000))]
    );
    create.splashing(
      [Item.of("minecraft:diamond").withChance(0.4)],
      ["kubejs:raw_diamond"]
    );

    let ids = {
      "kubejs:dirty_netherite_1": "minecraft:diamond",
      "kubejs:dirty_netherite_2": "kubejs:dirty_netherite_1",
      "kubejs:dirty_netherite_3": "kubejs:dirty_netherite_2",
      "kubejs:dirty_netherite_4": "kubejs:dirty_netherite_3",
      "kubejs:dirty_netherite_5": "kubejs:dirty_netherite_4",
      "kubejs:dirty_netherite_final": "kubejs:dirty_netherite_5",
    };
    for (let [output, input] of Object.entries(ids)) {
      create.pressing([Item.of(output).withChance(0.8)], [input]);
    }

    ids = {
      "kubejs:netherite_scrap_1": ["kubejs:dirty_netherite_final", "smelting"],
      "kubejs:netherite_scrap_2": ["kubejs:netherite_scrap_1", "smelting"],
      "kubejs:netherite_scrap_3": ["kubejs:netherite_scrap_2", "splashing"],
      "kubejs:netherite_scrap_4": ["kubejs:netherite_scrap_3", "smelting"],
      "kubejs:netherite_scrap_5": ["kubejs:netherite_scrap_4", "splashing"],
      "kubejs:netherite_scrap_final": ["kubejs:netherite_scrap_5", "splashing"],
      "minecraft:netherite_scrap": ["kubejs:netherite_scrap_final", "smelting"],
    };

    for (let [output, [input, recipeType]] of Object.entries(ids)) {
      switch (recipeType) {
        case "smelting":
          minecraft.smelting(output, input).cookingTime(500);
          break;
        case "splashing":
          create.splashing([output], [input]);
          break;
      }
    }
  });
}
