// requires: farmersdelight
// requires: tconstruct

(() => {
  ServerEvents.tags("item", (event) => {
    event.add("farmersdelight:tools/knives", ["tconstruct:dagger"]);

    event.add("forge:knives", ["tconstruct:dagger"]);
    event.add("forge:tools/knives", ["tconstruct:dagger"]);
    event.add("forge:tools/axes", [
      "tconstruct:hand_axe",
      "tconstruct:broad_axe",
      "tconstruct:mattock",
    ]);
    event.add("forge:tools/pickaxes", ["tconstruct:pickaxe"]);
    event.add("forge:tools/shovels", [
      "tconstruct:mattock",
      "tconstruct:excavator",
    ]);

    event.add("forge:cooked_bacon", ["tconstruct:bacon"]);
    event.add("forge:cooked_porkchop", [
      "tconstruct:cooked_porkchop",
      "tconstruct:bacon",
    ]);

    event.add("delightful_tinkers:piglin_heads", [
      "minecraft:piglin_head",
      "tconstruct:piglin_brute_head",
    ]);
  });

  ServerEvents.recipes((event) => {
    const { kubejs } = event.recipes;
    /**
     * @param {Special.Item} input
     * @param {Special.Item} output
     * @param {number} experience
     * @param {number} cooking_time
     * @returns {void}
     */
    function cooking(input, output, experience, cooking_time) {
      event
        .custom({
          type: "farmersdelight:cooking",
          ingredients: [{ item: input }],
          result: { item: output },
          experience: experience,
          cookingtime: cooking_time,
        })
        .id(`delightful_tinkers:cooking/${output.split(":")[1]}`);
    }

    /**
     * @param {Special.Item} cakeItem
     * @param {Special.Item} sliceItem
     * @returns {void}
     */
    function cakeSlice(cakeItem, sliceItem) {
      event
        .custom({
          type: "farmersdelight:cutting",
          ingredients: [{ item: cakeItem }],
          tool: { tag: "c:tools/knives" },
          result: [{ item: sliceItem, count: 7 }],
        })
        .id(`delightful_tinkers:cutting/${sliceItem.split(":")[1]}`);

      kubejs
        .shapeless(cakeItem, Array(7).fill(sliceItem))
        .id(`delightful_tinkers:${cakeItem.split(":")[1]}_from_slices`);
    }

    // drops
    [
      ["tconstruct:blood_slime_ball", "delightful_tinkers:blood_drop"],
      ["minecraft:slime_ball", "delightful_tinkers:earth_drop"],
      ["tconstruct:ender_slime_ball", "delightful_tinkers:ender_drop"],
      ["minecraft:magma_cream", "delightful_tinkers:magma_drop"],
      ["tconstruct:sky_slime_ball", "delightful_tinkers:sky_drop"],
    ].forEach(([input, output]) => {
      cooking(input, output, 0.1, 600);
    });

    // jerky
    [
      ["minecraft:beef", "delightful_tinkers:beef_jerky"],
      ["minecraft:chicken", "delightful_tinkers:chicken_jerky"],
      ["minecraft:tropical_fish", "delightful_tinkers:tropical_fish_jerky"],
      ["minecraft:cod", "delightful_tinkers:cod_jerky"],
      ["minecraft:mutton", "delightful_tinkers:mutton_jerky"],
      ["minecraft:porkchop", "delightful_tinkers:bacon_jerky"],
      ["minecraft:pufferfish", "delightful_tinkers:pufferfish_jerky"],
      ["minecraft:rabbit", "delightful_tinkers:rabbit_jerky"],
      ["minecraft:rotten_flesh", "delightful_tinkers:monster_jerky"],
      ["minecraft:salmon", "delightful_tinkers:salmon_jerky"],
    ].forEach(([input, output]) => {
      cooking(input, output, 0.1, 600);
    });

    // slices
    [
      ["tconstruct:magma_cake", "delightful_tinkers:magma_cake_slice"],
      ["tconstruct:sky_cake", "delightful_tinkers:sky_cake_slice"],
      ["tconstruct:ender_cake", "delightful_tinkers:ender_cake_slice"],
      ["tconstruct:earth_cake", "delightful_tinkers:earth_cake_slice"],
      ["tconstruct:blood_cake", "delightful_tinkers:blood_cake_slice"],
    ].forEach(([input, output]) => {
      cakeSlice(input, output);
    });

    // burgers
    event
      .custom({
        type: "tconstruct:casting_table",
        cast: {
          item: "farmersdelight:hamburger",
        },
        cast_consumed: true,
        fluid: {
          tag: "tconstruct:seared_stone",
          amount: 250 * FluidAmounts.MB,
        },
        result: "delightful_tinkers:dark_burger",
        cooling_time: 80,
      })
      .id("delightful_tinkers:casting/dark_burger");
    event
      .custom({
        type: "tconstruct:casting_table",
        cast: {
          item: "farmersdelight:hamburger",
        },
        cast_consumed: true,
        fluid: {
          tag: "tconstruct:scorched_stone",
          amount: 250 * FluidAmounts.MB,
        },
        result: "delightful_tinkers:darker_burger",
        cooling_time: 80,
      })
      .id("delightful_tinkers:casting/darker_burger");

    kubejs
      .shapeless("delightful_tinkers:cooked_piglin_face", [
        "#c:crops/cabbage",
        "#delightful_tinkers:piglin_heads",
        "minecraft:bowl",
      ])
      .id("delightful_tinkers:shapeless/cooked_piglin_face");
  });
})();
