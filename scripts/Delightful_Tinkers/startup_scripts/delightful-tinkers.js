// priority: 0
// requires: farmersdelight
// requires: tconstruct

/**
 * @author MangoJellyPudding
 * @author 是Bob氩
 *
 * @link https://www.mcmod.cn/class/8213.html
 */

StartupEvents.registry("item", (event) => {
  const jerkies = {
    bacon_jerky: { hunger: 8, saturation: 5.5 },
    beef_jerky: { hunger: 8, saturation: 5.5 },
    chicken_jerky: { hunger: 8, saturation: 5.5 },
    tropical_fish_jerky: { hunger: 8, saturation: 5.5 },
    rabbit_jerky: { hunger: 8, saturation: 5.5 },
    mutton_jerky: { hunger: 8, saturation: 5.5 },

    cod_jerky: { hunger: 4, saturation: 1.5 },
    pufferfish_jerky: { hunger: 4, saturation: 1.5 },
    salmon_jerky: { hunger: 4, saturation: 1.5 },
    monster_jerky: { hunger: 4, saturation: 1.5 },
  };

  const slices = {
    blood_cake_slice: { hunger: 2, saturation: 0.5 },
    earth_cake_slice: { hunger: 2, saturation: 0.5 },
    ender_cake_slice: { hunger: 2, saturation: 0.5 },
    magma_cake_slice: { hunger: 2, saturation: 0.5 },
    sky_cake_slice: { hunger: 2, saturation: 0.5 },
  };

  const drops = {
    blood_drop: {
      hunger: 3,
      effects: [{ id: "regeneration", duration: 7 * 20, amplifier: 0 }],
    },
    earth_drop: {
      hunger: 3,
      effects: [{ id: "luck", duration: 15 * 20, amplifier: 0 }],
    },
    ender_drop: {
      hunger: 3,
      effects: [{ id: "levitation", duration: 10 * 20, amplifier: 0 }],
    },
    magma_drop: {
      hunger: 3,
      effects: [{ id: "fire_resistance", duration: 30 * 20, amplifier: 0 }],
    },
    sky_drop: {
      hunger: 3,
      effects: [{ id: "jump_boost", duration: 20 * 20, amplifier: 1 }],
    },
  };

  const broths = {
    blaze_bone_broth: { hunger: 0, saturation: 0 },
    blood_bone_broth: { hunger: 0, saturation: 0 },
    necrotic_bone_broth: { hunger: 0, saturation: 0 },
    wither_bone_broth: { hunger: 0, saturation: 0 },
  };

  const others = {
    dark_burger: { hunger: 22, saturation: 21 },
    darker_burger: { hunger: 20, saturation: 20 },
    cooked_piglin_face: { hunger: 12, saturation: 7.5 },
  };

  Object.entries(jerkies).forEach(([id, data]) => {
    event.create(`delightful_tinkers:${id}`).food((foodBuilder) => {
      foodBuilder
        .hunger(data.hunger)
        .saturation(data.hunger / data.saturation)
        .meat();
    });
  });

  Object.entries(slices).forEach(([id, data]) => {
    event.create(`delightful_tinkers:${id}`).food((foodBuilder) => {
      foodBuilder.hunger(data.hunger).saturation(data.hunger / data.saturation);
    });
  });

  Object.entries(drops).forEach(([id, data]) => {
    event.create(`delightful_tinkers:${id}`).food((foodBuilder) => {
      let builder = foodBuilder.hunger(data.hunger).saturation(0).fastToEat();
      data.effects.forEach((effectData) => {
        builder.effect(
          effectData.id,
          effectData.duration,
          effectData.amplifier,
          1
        );
      });
    });
  });

  Object.entries(broths).forEach(([id, data]) => {
    event.create(`delightful_tinkers:${id}`).food((foodBuilder) => {
      foodBuilder.hunger(data.hunger).saturation(data.hunger / data.saturation);
    });
  });

  Object.entries(others).forEach(([id, data]) => {
    event.create(`delightful_tinkers:${id}`).food((foodBuilder) => {
      foodBuilder.hunger(data.hunger).saturation(data.hunger / data.saturation);
    });
  });
});

StartupEvents.registry("creative_mode_tab", (event) => {
  event
    .create("delightful_tinkers")
    .content(() => Ingredient.of("@delightful_tinkers").itemIds)
    .icon(() => Item.of("delightful_tinkers:magma_cake_slice"));
});

StartupEvents.modifyCreativeTab("kubejs", (event) => {
  event.remove(() => Ingredient.of("@delightful_tinkers").itemIds);
});
