// requires: farmersdelight
// requires: tconstruct

ServerEvents.tags("item", (event) => {
  event.add("farmersdelight:tools/knives", ["tconstruct:dagger"]);

  event.add("c:knives", ["tconstruct:dagger"]);
  event.add("c:tools/knives", ["tconstruct:dagger"]);
  event.add("c:axes", [
    "tconstruct:hand_axe",
    "tconstruct:broad_axe",
    "tconstruct:mattock",
  ]);
  event.add("c:tools/axes", [
    "tconstruct:hand_axe",
    "tconstruct:broad_axe",
    "tconstruct:mattock",
  ]);
  event.add("c:pickaxes", ["tconstruct:pickaxe"]);
  event.add("c:tools/pickaxes", ["tconstruct:pickaxe"]);
  event.add("c:shovels", ["tconstruct:mattock", "tconstruct:excavator"]);
  event.add("c:tools/shovels", ["tconstruct:mattock", "tconstruct:excavator"]);

  event.add("c:cooked_bacon", ["tconstruct:bacon"]);
  event.add("c:cooked_porkchop", [
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
  const cooking = (input, output, xp, time) => {
    event
      .custom({
        type: "farmersdelight:cooking",
        ingredients: [{ item: input }],
        result: { item: output },
        experience: xp,
        cookingtime: time,
      })
      .id(`delightful_tinkers:cooking/${output.split(":")[1]}`);
  };
  const cakeSlice = (cakeItem, sliceItem) => {
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
  };

  // drops
  Object.entries({
    "tconstruct:blood_slime_ball": "delightful_tinkers:blood_drop",
    "minecraft:slime_ball": "delightful_tinkers:earth_drop",
    "tconstruct:ender_slime_ball": "delightful_tinkers:ender_drop",
    "minecraft:magma_cream": "delightful_tinkers:magma_drop",
    "tconstruct:sky_slime_ball": "delightful_tinkers:sky_drop",
  }).forEach(([input, output]) => {
    cooking(input, output, 0.1, 600);
  });

  // jerky
  Object.entries({
    "minecraft:beef": "delightful_tinkers:beef_jerky",
    "minecraft:chicken": "delightful_tinkers:chicken_jerky",
    "minecraft:tropical_fish": "delightful_tinkers:tropical_fish_jerky",
    "minecraft:cod": "delightful_tinkers:cod_jerky",
    "minecraft:mutton": "delightful_tinkers:mutton_jerky",
    "minecraft:porkchop": "delightful_tinkers:bacon_jerky",
    "minecraft:pufferfish": "delightful_tinkers:pufferfish_jerky",
    "minecraft:rabbit": "delightful_tinkers:rabbit_jerky",
    "minecraft:rotten_flesh": "delightful_tinkers:monster_jerky",
    "minecraft:salmon": "delightful_tinkers:salmon_jerky",
  }).forEach(([input, output]) => {
    cooking(input, output, 0.1, 600);
  });

  // slices
  Object.entries({
    "tconstruct:magma_cake": "delightful_tinkers:magma_cake_slice",
    "tconstruct:sky_cake": "delightful_tinkers:sky_cake_slice",
    "tconstruct:ender_cake": "delightful_tinkers:ender_cake_slice",
    "tconstruct:earth_cake": "delightful_tinkers:earth_cake_slice",
    "tconstruct:blood_cake": "delightful_tinkers:blood_cake_slice",
  }).forEach(([input, output]) => {
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

  kubejs.shapeless("delightful_tinkers:cooked_piglin_face", [
    "#c:crops/cabbage",
    "#delightful_tinkers:piglin_heads",
    "minecraft:bowl",
  ]);
});
