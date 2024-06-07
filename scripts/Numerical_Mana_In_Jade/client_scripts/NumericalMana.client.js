let $Block = Java.loadClass("net.minecraft.world.level.block.Block");

ClientEvents.lang("en_us", (event) => {
  event.add("tooltip.kubejs.current_mana", "Current Mana: %s%s");
  event.add("config.jade.plugin_kubejs.numerical_mana", "Numerical Mana Block");
});

JadeEvents.onClientRegistration((event) => {
  event.block("kubejs:numerical_mana", $Block).tooltip((tooltip, accessor) => {
    const { serverData } = accessor;
    if (!serverData) return;

    let currentMana = serverData.get("currentMana") || serverData.get("mana");
    let maxMana = serverData.get("maxMana") || serverData.get("manaToGet");

    if (currentMana) {
      tooltip.add([
        Text.translate("tooltip.kubejs.current_mana", [currentMana, maxMana ? ` / ${maxMana}` : ""]).aqua(),
      ]);
    }
  });
});