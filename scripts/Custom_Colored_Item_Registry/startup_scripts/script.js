StartupEvents.registry("item", (event) => {
  const textureBases = {
    "{}_ingot": "minecraft:iron_ingot",
    "{}_nugget": "minecraft:iron_nugget",
    "raw_{}": "minecraft:raw_iron",
    "{}_dust": "minecraft:gunpowder",
  };

  const idColorMap = {
    new: 0x1e6fff,
  };

  for (const [id, color] of Object.entries(idColorMap)) {
    for (const [baseId, texturePath] of Object.entries(textureBases)) {
      const { namespace, path } = texturePath;
      event
        .create(baseId.replace("{}", id))
        .texture(`${namespace}:item/${path}`)
        .color((_) => color);
    }
  }
});
