global.InteractioJS = {
  $item_fluid_transform: function (inputs, fluid, output) {
    this.data = {
      inputs: inputs,
      fluid: fluid,
      outputs: output,
    };
  },

  $fluid_fluid_transform: function (items, input, output) {
    this.data = {
      items: items,
      inputs: input,
      output: output,
    };
  },

  $item_explode: function (inputs, output) {
    this.data = {
      inputs: inputs,
      outputs: output,
    };
  },

  $block_explode: function (input, output) {
    this.data = {
      inputs: input,
      outputs: output,
    };
  },

  $item_lightning: function (inputs, output) {
    this.data = {
      inputs: inputs,
      outputs: output,
    };
  },

  $item_anvil_smashing: function (inputs, outputs) {
    this.data = {
      inputs: inputs,
      outputs: outputs,
    };
  },
};

Object.assign(global.InteractioJS, {
  /**
   * Toss a set of items into a fluid and turn them into something else (Think AE2 Fluix Crystals, for example). Can also be set to consume the fluid catalyst at a certain chance.
   *
   * @param {Special.Item[] | InputItem_[]} inputs
   * @param {Special.Fluid} fluid
   * @param {Special.Item[] | OutputItem_[]} output
   * @returns {InteractioJS.$item_fluid_transform}
   */
  item_fluid_transform: (inputs, fluid, output) =>
    new InteractioJS.$item_fluid_transform(inputs, fluid, output),

  /**
   * Transform a fluid into another one by throwing items into it. Can be set to consume or not consume item catalysts.
   *
   * @param {Special.Item[] | InputItem_[]} items
   * @param {Special.Fluid} input
   * @param {Special.Item[] | OutputItem_} output
   * @returns {InteractioJS.$fluid_fluid_transform}
   */
  fluid_fluid_transform: (items, inputs, output) =>
    new InteractioJS.$fluid_fluid_transform(items, inputs, output),

  /**
   * Blow up a set of items and receive something else in return!  Can be set to have a certain chance of success so that it doesn't always produce an output.
   *
   * @param {Special.Item[] | InputItem_[]} inputs
   * @param {Special.Item[] | OutputItem_[]} output
   * @returns {InteractioJS.$item_explode}
   */
  item_explode: (inputs, output) =>
    new InteractioJS.$item_explode(inputs, output),

  /**
   * Transform a block in the world into another one by blowing it up! May have a success chance attached to it as well.
   *
   * @param {Special.Block} input
   * @param {{block: Special.Block} | {item: OutputItem_[]}} output
   * @returns {InteractioJS.$block_explode}
   */
  block_explode: (input, output) =>
    new InteractioJS.$block_explode(input, output),

  /**
   * Channel the raw power of 1.21 gigawatts into a set of items and watch them turn into something else!
   *
   * @param {Special.Item[] | InputItem_[]} inputs
   * @param {Special.Item[] | OutputItem_[]} output
   * @returns {InteractioJS.$item_lightning}
   */
  item_lightning: (inputs, output) =>
    new InteractioJS.$item_lightning(inputs, output),

  /**
   * Slam an anvil onto a set of items ACME-style and compress them into something else!
   *
   * @param {Special.Item[] | InputItem_[]} inputs
   * @param {Special.Item[] | OutputItem_[]} output
   * @returns {InteractioJS.$item_anvil_smashing}
   */
  item_anvil_smashing: (inputs, output) =>
    new InteractioJS.$item_anvil_smashing(inputs, output),
});