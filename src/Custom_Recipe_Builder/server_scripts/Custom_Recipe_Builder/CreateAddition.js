// priority: 50

CustomRecipes.createAddition = {
  rolling: function (Output, Input) {
    return new this.$rolling(Output, Input);
  },
  $rolling: function (Output, Input) {
    this.recipe = {
      type: "createaddition:rolling",
      input: Input,
      result: Output,
    };
  },

  charging: function (Output, Input, Energy) {
    return new this.$charging(Output, Input, Energy);
  },
  $charging: function (Output, Input, Energy) {
    this.recipe = {
      type: "createaddition:charging",
      input: Input,
      result: Output,
      energy: Energy,
    };
  },
};

Object.assign(
  CustomRecipes.createAddition.$rolling.prototype,
  CustomRecipes.$base
);

Object.assign(
  CustomRecipes.createAddition.$charging.prototype,
  CustomRecipes.$base
);
